export interface FacetSection {
  key: string;
  name: string;
  facets?: Array<Facet>;
}

export interface Facet {
  key: string;
  name: string;
  type: string;
  options: Array<Option>;
}

export interface Option {
  key: string;
  name: string;
}
