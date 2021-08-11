import { IFacetSectionProps } from "../models/Facet.model";

export async function getSearchOptions() {
  let response = await fetch(
    `${process.env.PUBLIC_URL}/data/search-options.json`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json().then((d) => d);
}

export async function getSearchFacets(): Promise<Array<IFacetSectionProps>> {
  let response = await fetch(
    `${process.env.PUBLIC_URL}/data/search-facets.json`
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json().then((d) => d);
}
