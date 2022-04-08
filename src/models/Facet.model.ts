export interface IFacetSidebarProps {
  facetSections?: Array<IFacetSectionProps>;
  sidebarSelection?: IFacetSidebarSelection;
  sidebarOperators?: IFacetSidebarOperators;
  loading?: boolean;
  onSelectionChange(
    sectionKey: string,
    facetKey: string,
    selection: Array<IOptionProps>,
    operators: string
  ): any;
  onReset(): void;
}

export interface IFacetSidebarOperators {
  [section: string]: { [facet: string]: string };
}

export interface IFacetSidebarSelection {
  [sectionKey: string]: IFacetSectionSelection;
}

export interface IFacetSectionSelection {
  [facetKey: string]: Array<IOptionProps>;
}

export interface IFacetSectionProps {
  key: string;
  name: string;
  facets?: Array<IFacetProps>;
  sectionSelection?: IFacetSectionSelection;
  sectionOperators?: { [facet: string]: string };
  onSelectionChange?(
    facetKey: string,
    selection: Array<IOptionProps>,
    operator: string
  ): void;
}

export interface IFacetProps {
  key: string;
  name: string;
  type: string;
  options: Array<IOptionProps>;
  selection?: Array<IOptionProps>;
  operator?: string;
  loading?: boolean;
  displayOperators?: boolean;
  onSelectionChange?(selection: Array<IOptionProps>, operator: string): void;
}

export interface IOptionProps {
  key: string;
  name: string;
}
