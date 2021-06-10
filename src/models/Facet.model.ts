export interface Facet {
  name: string;
  type: string;
  options: Array<string>;
}

export interface FacetSection {
  name: string;
  facets: Array<Facet>;
}
