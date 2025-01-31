export function makeCmsAssetUrl(id: string) {
  return `https://us-east-1-shared-usea1-02.graphassets.com/${process.env.NEXT_CMS_ASSET_ENV_ID ?? ''}/${id}` as const;
}
