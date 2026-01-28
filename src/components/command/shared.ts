import type { FuseResult, FuseResultMatch } from 'fuse.js';
import type { CommandHighlightSearchOptionData, CommandOptionData, CommandSearchOptionData } from './types';

export function getCommandSearchOptions(items: CommandOptionData[]) {
  const searchOptions = items.flatMap(item => {
    if (!item.items) {
      return [item as CommandSearchOptionData];
    }

    return item.items.map(gItem => {
      const searchOption: CommandSearchOptionData = {
        ...gItem,
        isGroup: true
      };

      return searchOption;
    });
  });

  return searchOptions;
}

export function getCommandHighlightSearchOption(item: CommandSearchOptionData, searchTerm: string) {
  const searchOption: CommandHighlightSearchOptionData = {
    ...item,
    labelHtml: highlightCommandOption(item, searchTerm, 'label')
  };

  return searchOption;
}

export function getCommandItemOptions(options: CommandHighlightSearchOptionData[]) {
  const itemsByGroup = options.reduce(
    (acc, item) => {
      const { isGroup, ...rest } = item;

      if (isGroup) {
        const { value, label, separator } = rest;

        if (!acc[value]) {
          acc[value] = {
            value,
            label,
            separator
          };
        }

        if (!acc[value].items) {
          acc[value].items = [];
        }

        acc[value].items.push(rest);
      } else {
        acc[item.label] = rest;
      }

      return acc;
    },
    {} as Record<string, CommandOptionData>
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

export function highlightCommandOption<T>(
  item: T & { matches?: FuseResult<T>['matches'] },
  searchTerm: string,
  forceKey?: string,
  omitKeys?: string[]
) {
  function generateHighlightedText(value: FuseResultMatch['value'], indices: FuseResultMatch['indices'] = []) {
    // eslint-disable-next-line no-param-reassign
    value ||= '';
    let content = '';
    let nextUnHighlightedRegionStartingIndex = 0;

    indices.forEach(region => {
      // skip if region is a single character
      if (region.length === 2 && region[0] === region[1]) {
        return;
      }

      const lastIndicNextIndex = region[1] + 1;
      const isMatched = lastIndicNextIndex - region[0] >= searchTerm.length;

      content += [
        value.substring(nextUnHighlightedRegionStartingIndex, region[0]),
        isMatched && `<mark>`,
        value.substring(region[0], lastIndicNextIndex),
        isMatched && '</mark>'
      ]
        .filter(Boolean)
        .join('');

      nextUnHighlightedRegionStartingIndex = lastIndicNextIndex;
    });

    content += value.substring(nextUnHighlightedRegionStartingIndex);

    const markIndex = content.indexOf('<mark>');
    if (markIndex !== -1) {
      content = truncateHTMLFromStart(content, content.length - markIndex);
    }

    return content;
  }

  const validMatch = item?.matches?.find(
    match => (!forceKey || match.key === forceKey) && !omitKeys?.includes(match.key!)
  );

  if (validMatch) {
    return generateHighlightedText(validMatch.value, validMatch.indices);
  }

  return undefined;
}
