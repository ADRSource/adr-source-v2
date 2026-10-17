import {
  createComponentChainLink,
  createPreviewAttributes,
  type ElementAttributes,
} from '@hygraph/preview-sdk/core';

export type PreviewTag = (fieldApiId: string) => Partial<ElementAttributes>;

// Click to Edit attributes for an entry's field; empty outside draft mode so public HTML has no entry IDs.
export function previewTag(
  enabled: boolean,
  entryId: string,
  component?: { fieldApiId: string; instanceId: string },
): PreviewTag {
  return (fieldApiId) =>
    enabled
      ? createPreviewAttributes({
          entryId,
          fieldApiId,
          componentChain: component && [
            createComponentChainLink(component.fieldApiId, component.instanceId),
          ],
        })
      : {};
}
