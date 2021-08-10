import { FunctionComponent, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Facets } from "../components/search/Facets";
import { SearchBar } from "../components/search/SearchBar";
import { ResultsTable } from "../components/search/ResultsTable";
import { GeneralTemplate } from "../templates/GeneralTemplate";
import "./SearchPage.scss";
import { useHistory, useLocation } from "react-router-dom";
import { getSearchFacets, getSearchOptions } from "../apis/Search.api";

const resultTableColumns = [
  { displayName: "Model", key: "model" },
  { displayName: "Histology", key: "datasource" },
  { displayName: "Primary", key: "sourceId" },
  { displayName: "Collection", key: "patient.age" },
  { displayName: "Type", key: "patient.gender" },
  { displayName: "Data available", key: "patient.ethnicity" },
];

export const SearchPage: FunctionComponent = () => {
  let [urlSearchValues, urlFacetSelection] = useQuery();
  let history = useHistory();
  let [searchOptions, setSearchOptions] = useState([]);
  let [searchFacets, setSearchFacets] = useState([]);
  let [searchValues, setSearchValues] = useState(urlSearchValues);
  let [facetSelection, setFacetSelection] = useState(urlFacetSelection);

  useEffect(() => {
    getSearchOptions().then((d) => setSearchOptions(d));
    getSearchFacets().then((d) => setSearchFacets(d));
  }, []);

  const updateSearchParams = (
    searchValues: Array<string>,
    facetSelection: any
  ) => {
    let search = "";
    if (searchValues.length > 0) {
      search += "?q=" + searchValues.join(",");
    }

    Object.keys(facetSelection).forEach((k) => {
      search += search === "" ? "?" : "&";
      search += `${k}=${facetSelection[k]}`;
    });

    history.push({
      pathname: "/search",
      search: search,
    });
  };

  return (
    <GeneralTemplate>
      <Container fluid className="h-100">
        <Row className="flex-xl-nowrap h-100 px-0">
          <Col
            xs={12}
            md={4}
            xl={3}
            className="shadow-sm h-100 py-3 py-sm-5 mt-3 mt-sm-0"
            id="sidebar-wrapper"
          >
            <Facets
              facetSections={searchFacets}
              facetSelection={facetSelection}
              onChange={(e) => {
                setFacetSelection(e);
                updateSearchParams(searchValues, e);
              }}
            />
          </Col>
          <Col
            xs={12}
            md={8}
            xl={9}
            id="page-content-wrapper"
            className="py-5 px-md-3 px-lg-5 px-0"
          >
            <div className="mx-auto">
              <SearchBar
                searchValues={searchValues}
                searchOptions={searchOptions}
                searchAllowMultipleTerms={true}
                onSearchChange={(values) => {
                  setSearchValues(values);
                  updateSearchParams(values, facetSelection);
                }}
              ></SearchBar>
            </div>
            <div>
              <ResultsTable
                results={[]}
                displayColumns={resultTableColumns}
              ></ResultsTable>
            </div>
          </Col>
        </Row>
      </Container>
    </GeneralTemplate>
  );
};

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  const search = new URLSearchParams(useLocation().search);
  let searchValues: Array<string> = [];
  const queryParam = search.get("q");
  if (queryParam !== null) {
    searchValues = queryParam.split(",");
  }
  let facetSelection: any = {};
  search.forEach((value, key) => {
    if (key === "q") return;
    facetSelection[key] = value;
  });
  return [searchValues, facetSelection];
}
