import {
  IFacetProps,
  IFacetSectionProps,
  IOptionProps,
} from "../models/Facet.model";
import { SearchResult } from "../models/Search.model";

export async function getSearchOptions() {
  let response = await fetch(
    `http://localhost:8085/search_facet?facet_section=eq.search`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json().then((d: any) => {
    return d[0].facet_options
      .sort((a: String, b: String) =>
        a.toLocaleLowerCase().trim() > b.toLocaleLowerCase().trim() ? 1 : -1
      )
      .map((option: any) => {
        return {
          key: option.replace(/[\W_]+/g, "_").toLowerCase(),
          name: option,
        };
      });
  });
}

export async function getSearchFacets(): Promise<Array<IFacetSectionProps>> {
  let response = await fetch(`http://localhost:8085/search_facet`);

  const sections: any = {
    model: { key: "model", name: "Model", facets: [] },
    molecular_data: {
      key: "molecular_data",
      name: "Molecular Data",
      facets: [],
    },
    patient_tumour: {
      key: "patient_tumour",
      name: "Patient / Tumor",
      facets: [],
    },
  };

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json().then((d: Array<any>) => {
    d.forEach((element) => {
      const section = sections[element.facet_section];
      if (section) section.facets.push(mapApiFacet(element));
    });
    return Object.values(sections);
  });
}

export async function getSearchResults(
  searchValues: Array<IOptionProps>,
  page: number,
  pageSize: number = 10
): Promise<[number, Array<SearchResult>]> {
  let query =
    searchValues.length > 0
      ? `histology=in.(${searchValues
          .map((d: IOptionProps) => '"' + d.name + '"')
          .join(",")})`
      : "";
  let response = await fetch(
    `http://localhost:8085/search_index?${query}&limit=${pageSize}&offset=${
      (page - 1) * pageSize
    }&order=external_model_id.asc`,
    { headers: { Prefer: "count=exact" } }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  console.log();
  return response.json().then((d: any) => {
    return [
      parseInt(response.headers.get("Content-Range")?.split("/")[1] || "0"),
      d.map((result: any) => {
        return {
          pdcmId: result.external_model_id,
          sourceId: result.data_source,
          datasource: "",
          histology: result.histology,
          primary: result.primary_site,
          collection: result.collection_site,
          type: result.tumour_type,
          dataAvailable: result.data_available,
        };
      }),
    ];
  });
}

function mapApiFacet(apiFacet: any): IFacetProps {
  const autocompleteFacets = ["external_model_id"];
  const multiValuedFacets = [
    "makers_with_mutation_data",
    "makers_with_cna_data",
    "makers_with_expression_data",
    "makers_with_cytogenetics_data",
  ];
  let facetType = "check";

  if (autocompleteFacets.includes(apiFacet.facet_column))
    facetType = "autocomplete";

  if (multiValuedFacets.includes(apiFacet.facet_column))
    facetType = "multivalued";

  return {
    key: apiFacet.facet_column,
    name: apiFacet.facet_name,
    type: facetType,
    options: apiFacet.facet_options
      .sort((a: String, b: String) => {
        if (apiFacet.facet_column !== "patient_age")
          return a.toLocaleLowerCase().trim() > b.toLocaleLowerCase().trim()
            ? 1
            : -1;
        else {
          if (a.includes("months")) return -1;
          if (b.includes("specified")) return -1;
          let aa = a.split(" - ");
          let bb = b.split(" - ");
          if (+aa[0] > +bb[0]) return 1;
          else if (+aa[0] < +bb[0]) return -1;
          else return 0;
        }
      })
      .map((option: String) => {
        return {
          key: option.replace(/[\W_]+/g, "_").toLowerCase(),
          name: option,
        };
      }),
  };
}
