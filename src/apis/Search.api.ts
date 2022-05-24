import { useLocation } from "react-router-dom";
import {
  IFacetProps,
  IFacetSectionProps,
  IFacetSidebarOperators,
  IFacetSidebarSelection,
  IOptionProps,
} from "../models/Facet.model";
import { SearchResult } from "../models/Search.model";

const API_URL = process.env.REACT_APP_API_URL;

export async function getSearchOptions() {
  let response = await fetch(`${API_URL}/search_facet?facet_section=eq.search`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json().then((d: any) => {
    return d[0].facet_options
      .filter((option: any) => option !== "")
      .sort((a: String, b: String) =>
        a.toLocaleLowerCase().trim() > b.toLocaleLowerCase().trim() ? 1 : -1
      )
      .map((option: any) => {
        return {
          key: option.replace(/[\W_]+/g, "_").toLowerCase(),
          name: option.trim(),
        };
      });
  });
}

export async function getSearchFacets(
  noOptions = false
): Promise<Array<IFacetSectionProps>> {
  let response = await fetch(
    `${API_URL}/search_facet?facet_section=neq.search&${"&select=facet_section,facet_column,facet_name"}`
  );

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
    treatment_drug_dosing: {
      key: "treatment_drug_dosing",
      name: "Treatment / Drug dosing",
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

export async function getFacetOptions(facetColumn: string) {
  let response = await fetch(
    `${API_URL}/search_facet?facet_column=eq.${facetColumn}`
  );
  return response.json().then((d: Array<any>) => {
    const mappedFacet = mapApiFacet(d[0]);
    return mappedFacet.options;
  });
}

export async function getSearchResults(
  searchValues: Array<IOptionProps> = [],
  facetSelections: any,
  facetOperators: any,
  page: number,
  pageSize: number = 10
): Promise<[number, Array<SearchResult>]> {
  let query =
    searchValues.length > 0
      ? `search_terms=ov.{${searchValues
          .map((d: IOptionProps) => '"' + d.name + '"')
          .join(",")}}`
      : "";

  if (facetSelections) {
    for (let key in facetSelections) {
      let facet = facetSelections[key] || {};

      for (let facetColumn in facet) {
        const options = facetSelections[key][facetColumn]
          ? facetSelections[key][facetColumn].map(
              (d: IOptionProps) => '"' + d.name + '"'
            )
          : [];
        let apiOperator = "in";
        const hasOperator =
          facetOperators &&
          facetOperators[key] &&
          facetOperators[key][facetColumn];

        if (
          (hasOperator &&
            facetOperators[key][facetColumn] &&
            facetOperators[key][facetColumn] === "any") ||
          ["dataset_available", "breast_cancer_biomarkers"].includes(
            facetColumn
          )
        )
          apiOperator = "ov";
        if (
          hasOperator &&
          facetOperators[key][facetColumn] &&
          facetOperators[key][facetColumn] === "all"
        )
          apiOperator = "cs";

        let optionsQuery =
          apiOperator === "in"
            ? `(${options.join(",")})`
            : `{${options.join(",")}}`;
        query += `&${facetColumn}=${apiOperator}.${optionsQuery}`;
      }
    }
  }
  let response = await fetch(
    `${API_URL}/search_index?${query}&limit=${pageSize}&offset=${
      (page - 1) * pageSize
    }&select=patient_age,patient_sex,external_model_id,model_type,data_source,histology,primary_site,collection_site,tumour_type,dataset_available&order=external_model_id.asc`,
    { headers: { Prefer: "count=exact" } }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json().then((d: any) => {
    return [
      parseInt(response.headers.get("Content-Range")?.split("/")[1] || "0"),
      d.map((result: any) => {
        return {
          pdcmId: result.external_model_id,
          sourceId: result.data_source,
          datasource: "",
          histology: result.histology,
          primarySite: result.primary_site,
          collectionsite: result.collection_site,
          tumourType: result.tumour_type,
          dataAvailable: result.dataset_available,
          modelType: result.model_type,
          patientAge: result.patient_age,
          patientSex: result.patient_sex,
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
    "treatment_list",
    "model_treatment_list",
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
      ? apiFacet.facet_options
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
          })
      : [],
  };
}

export function getSearchParams(
  searchValues: Array<IOptionProps>,
  facetSelection: any,
  facetOperators: any
) {
  let search = "";
  if (searchValues.length > 0) {
    search += "?q=" + searchValues.map((o) => o.key).join(",");
  }
  let facetString = "";
  Object.keys(facetSelection).forEach((facetSectionKey) => {
    Object.keys(facetSelection[facetSectionKey]).forEach((facetKey) => {
      if (facetSelection[facetSectionKey][facetKey].length === 0) return;
      facetString += `${
        facetString === "" ? "" : " AND "
      }${facetSectionKey}.${facetKey}:${facetSelection[facetSectionKey][
        facetKey
      ].map((o: IOptionProps) => o.key)}`;
    });
  });
  if (facetString !== "")
    search += `${search === "" ? "?" : "&"}facets=${facetString}`;

  let facetOperatorString = "";
  Object.keys(facetOperators).forEach((facetSectionKey) => {
    Object.keys(facetOperators[facetSectionKey]).forEach((facetKey) => {
      if (
        facetOperators[facetSectionKey][facetKey]?.length === 0 ||
        facetOperators[facetSectionKey][facetKey] === undefined
      )
        return;
      facetOperatorString += `${
        facetOperatorString === "" ? "" : " AND "
      }${facetSectionKey}.${facetKey}:${
        facetOperators[facetSectionKey][facetKey]
      }`;
    });
  });
  if (facetOperatorString !== "")
    search += `${
      search === "" ? "?" : "&"
    }facet.operators=${facetOperatorString}`;
  return search;
}

// A custom hook that builds on useLocation to parse
// the query string for you.
export function useQueryParams() {
  const search = new URLSearchParams(useLocation().search);
  let searchTermKeys: Array<string> = [];
  const queryParam = search.get("q");
  if (queryParam !== null) {
    searchTermKeys = queryParam.split(",");
  }
  let facetSelection: any = {};
  const facets = search.get("facets")?.split(" AND ") || [];
  facets.forEach((facetString) => {
    const [key, values] = facetString.split(":");
    facetSelection[key] = values.split(",");
  });
  let facetOperators: any = {};
  const facetOperatorParam =
    search.get("facet.operators")?.split(" AND ") || [];
  facetOperatorParam.forEach((facetString) => {
    const [key, value] = facetString.split(":");
    facetOperators[key] = value;
  });
  return [searchTermKeys, facetSelection, facetOperators];
}

export function parseSelectedFacetFromUrl(
  facetSections: Array<IFacetSectionProps>,
  facetsByKey: any
): IFacetSidebarSelection {
  const facetSidebarSelection: IFacetSidebarSelection = {};
  Object.keys(facetsByKey).forEach((compoundKey: string) => {
    const [sectionKey, facetKey] = compoundKey.split(".");
    const urlFacetSelection = facetsByKey[compoundKey];
    const facetSection = facetSections?.find(({ key }) => sectionKey === key);
    const facet = facetSection?.facets?.find(({ key }) => facetKey === key);
    if (!facetSidebarSelection[sectionKey]) {
      facetSidebarSelection[sectionKey] = {};
    }
    facetSidebarSelection[sectionKey][facetKey] =
      facet?.options.filter((option) =>
        urlFacetSelection.includes(option.key)
      ) || [];
  });
  return facetSidebarSelection;
}

export function parseOperatorsFromUrl(
  operatorsByKey: any
): IFacetSidebarOperators {
  const facetSidebarSelection: IFacetSidebarOperators = {};
  Object.keys(operatorsByKey).forEach((compoundKey: string) => {
    const [sectionKey, facetKey] = compoundKey.split(".");
    const urlOperator = operatorsByKey[compoundKey];
    if (!facetSidebarSelection[sectionKey]) {
      facetSidebarSelection[sectionKey] = {};
    }
    facetSidebarSelection[sectionKey][facetKey] = urlOperator;
  });
  return facetSidebarSelection;
}
