/* @flow */

import { getBlockMarkup } from './block';
import { isList, getListMarkup } from './list';

/**
* The function will generate html markup for given draftjs editorContent.
*/
export default function draftToHtml(
  editorContent: ContentState,
  hashtagConfig: Object,
  directional: boolean,
  customEntityTransform: Function
): string {
  const html = [];
  if (editorContent) {
    const { entityMap } = editorContent;
    const blocks = editorContent.getBlocksAsArray();
    if (blocks && blocks.length > 0) {
      let listBlocks = [];
      blocks.forEach((block) => {
        if (isList(block.type)) {
          listBlocks.push(block);
        } else {
          if (listBlocks.length > 0) {
            const listHtml = getListMarkup(listBlocks, entityMap, hashtagConfig, customEntityTransform);
            html.push(listHtml);
            listBlocks = [];
          }
          const blockHtml = getBlockMarkup(
            block,
            entityMap,
            hashtagConfig,
            directional,
            customEntityTransform,
          );
          html.push(blockHtml);
        }
      });
      if (listBlocks.length > 0) {
        const listHtml = getListMarkup(listBlocks, entityMap, hashtagConfig,directional, customEntityTransform);
        html.push(listHtml);
        listBlocks = [];
      }
    }
  }
  return html.join('');
}
