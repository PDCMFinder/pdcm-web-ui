export function parseArticleMetadata(article: any) {
  const metadata = article.match(/^---\n(.*?)\n---/s);
  if (!metadata) {
    return {};
  }
  const metadataLines = metadata[1].split("\n");
  const result: any = {};
  metadataLines.forEach((line: string) => {
    const parts = line.split(":");
    result[parts[0].trim()] = parts[1].trim();
  });
  return result;
}

export function parseArticleContent(article: any) {
  return article.replace(/^---\n(.*?)\n---/s, "");
}
