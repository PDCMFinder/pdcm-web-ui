export interface SearchResult {
  pdcmId: string;
  sourceId: string;
  datasource: string;
  histology: string;
  primary: string;
  collection: string;
  type: string;
  dataAvailable: Array<string>;
}

export interface ResultCol {
  displayName: string;
  key: string;
}
