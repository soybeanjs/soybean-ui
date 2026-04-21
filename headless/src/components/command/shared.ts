import type { FuseResult, FuseResultMatch } from 'fuse.js';
import type {
  CommandGroupOptionData,
  CommandHighlightSearchOptionData,
  CommandOptionData,
  CommandSearchOptionData,
  CommandSingleOptionData
} from './types';

export function isGroupOption<T extends CommandSingleOptionData = CommandSingleOptionData>(
  item: CommandOptionData<T>
): item is CommandGroupOptionData<T> {
  return 'items' in item;
}

export function getCommandSearchOptions<T extends CommandSingleOptionData = CommandSingleOptionData>(items: CommandOptionData<T>[]) {
  return items.flatMap(item => {
    if (!isGroupOption(item)) {
      return [item as CommandSearchOptionData<T>];
    }

    return item.items.map(groupItem => ({
      groupValue: item.value,
      groupLabel: item.label,
      groupSeparator: item.separator,
      ...groupItem
    }));
  });
}

export function getCommandHighlightSearchOption<T extends CommandSingleOptionData = CommandSingleOptionData>(
  item: CommandSearchOptionData<T>,
  searchTerm: string
) {
  const searchOption: CommandHighlightSearchOptionData<T> = {
    ...item,
    labelHtml: highlightCommandOption(item, searchTerm, 'label')
  };

  return searchOption;
}

export function getCommandItemOptions<T extends CommandSingleOptionData = CommandSingleOptionData>(
  options: CommandHighlightSearchOptionData<T>[]
) {
  type HighlightGroup = CommandGroupOptionData<CommandHighlightSearchOptionData<T>>;
  type HighlightOption = CommandHighlightSearchOptionData<T> | HighlightGroup;

  const itemsByGroup = options.reduce(
    (acc, item) => {
      const { groupValue, groupLabel, groupSeparator, ...rest } = item;

      if (groupValue) {
        if (!acc[groupValue]) {
          acc[groupValue] = {
            value: groupValue,
            label: groupLabel ?? groupValue,
            separator: groupSeparator,
            items: []
          } satisfies HighlightGroup;
        }

        (acc[groupValue] as HighlightGroup).items.push(rest as CommandHighlightSearchOptionData<T>);
      } else {
        acc[`item-${item.value}`] = rest as CommandHighlightSearchOptionData<T>;
      }

      return acc;
    },
    {} as Record<string, HighlightOption>
  );

  return Object.values(itemsByGroup);
}

function truncateHTMLFromStart(html: string, maxLength: number) {
  let truncated = '';
  let totalLength = 0;
  let insideTag = false;

  for (let index = html.length - 1; index >= 0; index -= 1) {
    if (html[index] === '>') {
      insideTag = true;
    } else if (html[index] === '<') {
      insideTag = false;
      truncated = html[index] + truncated;
      continue;
    }

    if (!insideTag) {
      totalLength += 1;
    }

    if (totalLength <= maxLength) {
      truncated = html[index] + truncated;
    } else {
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
    let content = '';
    let nextUnHighlightedRegionStartingIndex = 0;

    value ||= '';

    indices.forEach(region => {
      if (region.length === 2 && region[0] === region[1]) {
        return;
      }

      const lastIndicNextIndex = region[1] + 1;
      const isMatched = lastIndicNextIndex - region[0] >= searchTerm.length;

      content += [
        value.substring(nextUnHighlightedRegionStartingIndex, region[0]),
        isMatched && '<mark>',
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
