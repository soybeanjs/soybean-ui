import type { FuseResult, FuseResultMatch } from 'fuse.js';
import type { AcceptableValue } from '@soybean-ui/primitives';
import type {
  CommandItemGroupOption,
  CommandItemHighlightSearchOption,
  CommandItemOption,
  CommandItemSearchOption
} from './types';

export function isCommandGroupOption<A extends AcceptableValue>(
  option: CommandItemOption<A>
): option is CommandItemGroupOption<A> {
  return Boolean((option as CommandItemGroupOption<A>).items);
}

export function getSearchOptions<T extends AcceptableValue, S extends CommandItemOption<T>>(items: S[]) {
  const searchOptions = items.flatMap(item => {
    if (!isCommandGroupOption(item)) {
      const searchOption: CommandItemSearchOption<T> = {
        groupId: `group-${item.value}`,
        ...item
      };

      return [searchOption];
    }

    return item.items.map(groupItem => {
      const searchOption: CommandItemSearchOption<T> = {
        isGroup: true,
        groupId: item.groupId,
        groupLabel: item.label,
        groupSeparator: item.separator,
        ...groupItem
      };

      return searchOption;
    });
  });

  return searchOptions;
}

export function getHighlightSearchOption<T extends AcceptableValue>(
  item: CommandItemSearchOption<T>,
  searchTerm: string
) {
  const searchOption: CommandItemHighlightSearchOption<T> = {
    ...item,
    labelHtml: highlight(item, searchTerm, 'label')
  };

  return searchOption;
}

export function getItemOptions<T extends AcceptableValue>(options: CommandItemHighlightSearchOption<T>[]) {
  const itemsByGroup = options.reduce(
    (acc, item) => {
      const { isGroup, groupId, groupLabel, groupSeparator, ...rest } = item;

      if (isGroup) {
        if (!acc[item.groupId]) {
          acc[item.groupId] = {
            groupId,
            label: groupLabel!,
            separator: groupSeparator,
            items: []
          };
        }

        (acc[item.groupId] as CommandItemGroupOption).items.push(rest);
      } else {
        acc[groupId] = rest;
      }

      return acc;
    },
    {} as Record<string, CommandItemOption<T>>
  );

  return Object.values(itemsByGroup);
}

function truncateHTMLFromStart(html: string, maxLength: number) {
  let truncated = '';
  let totalLength = 0;
  let insideTag = false;

  // Iterate through the HTML string in reverse order
  for (let i = html.length - 1; i >= 0; i--) {
    if (html[i] === '>') {
      insideTag = true;
    } else if (html[i] === '<') {
      insideTag = false;
      truncated = html[i] + truncated;
      // eslint-disable-next-line no-continue
      continue;
    }

    if (!insideTag) {
      totalLength++;
    }

    if (totalLength <= maxLength) {
      truncated = html[i] + truncated;
    } else {
      // If we've reached the max length, we break out of the loop
      // to prevent further processing of the string
      truncated = `...${truncated}`;
      break;
    }
  }

  return truncated;
}

export function highlight<T>(
  item: T & { matches?: FuseResult<T>['matches'] },
  searchTerm: string,
  forceKey?: string,
  omitKeys?: string[]
) {
  function generateHighlightedText(value: FuseResultMatch['value'], indices: FuseResultMatch['indices'] = []) {
    // eslint-disable-next-line no-param-reassign
    value ||= '';
    let content = '';
    let nextUnhighlightedRegionStartingIndex = 0;

    indices.forEach(region => {
      // skip if region is a single character
      if (region.length === 2 && region[0] === region[1]) {
        return;
      }

      const lastIndiceNextIndex = region[1] + 1;
      const isMatched = lastIndiceNextIndex - region[0] >= searchTerm.length;

      content += [
        value.substring(nextUnhighlightedRegionStartingIndex, region[0]),
        isMatched && `<mark>`,
        value.substring(region[0], lastIndiceNextIndex),
        isMatched && '</mark>'
      ]
        .filter(Boolean)
        .join('');

      nextUnhighlightedRegionStartingIndex = lastIndiceNextIndex;
    });

    content += value.substring(nextUnhighlightedRegionStartingIndex);

    const markIndex = content.indexOf('<mark>');
    if (markIndex !== -1) {
      content = truncateHTMLFromStart(content, content.length - markIndex);
    }

    return content;
  }

  if (!item.matches?.length) {
    return;
  }

  for (const match of item.matches) {
    if (forceKey && match.key !== forceKey) {
      // eslint-disable-next-line no-continue
      continue;
    }
    if (omitKeys?.includes(match.key!)) {
      // eslint-disable-next-line no-continue
      continue;
    }

    return generateHighlightedText(match.value, match.indices);
  }
}
