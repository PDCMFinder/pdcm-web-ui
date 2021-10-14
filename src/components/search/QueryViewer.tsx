import React, { FunctionComponent } from "react";
import { Token } from "react-bootstrap-typeahead";
import {
  IFacetSidebarOperators,
  IFacetSidebarSelection,
  IOptionProps,
} from "../../models/Facet.model";

export interface IQueryViewerProps {
  searchTerms: Array<IOptionProps>;
  facetSelection: IFacetSidebarSelection;
  facetOperators: IFacetSidebarOperators;
  facetNames: { [sectionFacetKey: string]: string };
  onRemoveSearchTerm(searchTerm: string): void;
  onRemoveFacet(sectionKey: string, facetKey: string, optionKey: string): void;
}

export interface IQueryViewerSelection {
  sectionKey: string;
  facetKey: string;
  name: string;
  options: Array<IOptionProps>;
  operator?: string;
}

export const QueryViewer: FunctionComponent<IQueryViewerProps> = ({
  searchTerms,
  facetSelection,
  facetOperators,
  facetNames,
  onRemoveFacet,
  onRemoveSearchTerm,
}) => {
  const selection: any = parseSelection(
    facetSelection,
    facetNames,
    facetOperators
  );

  return (
    <div className="form-control-sm" style={{ height: "inherit" }}>
      {searchTerms.length > 0 ? (
        <QuerySection
          name="Diagnosis term"
          options={searchTerms}
          operator="IN"
          onRemove={onRemoveSearchTerm}
        ></QuerySection>
      ) : null}
      {selection.length > 0 && searchTerms.length > 0 ? <b> AND </b> : null}
      {selection.map(
        (
          {
            sectionKey,
            facetKey,
            name,
            options,
            operator,
          }: IQueryViewerSelection,
          index: number
        ) => (
          <span key={index}>
            <QuerySection
              name={name}
              options={options}
              operator={
                !operator
                  ? "IN"
                  : operator === "any"
                  ? "CONTAINS ANY"
                  : "CONTAINS ALL"
              }
              onRemove={(optionKey) => {
                onRemoveFacet(sectionKey, facetKey, optionKey);
              }}
            ></QuerySection>
            {index < selection.length - 1 ? <b> AND </b> : null}
          </span>
        )
      )}
    </div>
  );
};

/* Parse the facetSelection object and adds the Section names from the full facetSections list*/
function parseSelection(
  facetSelection: any,
  facetNames: any,
  facetOperators: any
): Array<{ name: string; options: Array<IOptionProps> }> {
  const selection: Array<any> = [];
  Object.keys(facetSelection).forEach((sectionKey) => {
    const facetKeys = Object.keys(facetSelection[sectionKey]);
    facetKeys.forEach((facetKey) => {
      const options = facetSelection[sectionKey][facetKey];
      const name = facetNames[`${sectionKey}.${facetKey}`];
      const operator =
        facetOperators[sectionKey] && facetOperators[sectionKey][facetKey]
          ? facetOperators[sectionKey][facetKey]
          : undefined;
      selection.push({ sectionKey, facetKey, name, options, operator });
    });
  });
  return selection;
}

const QuerySection: FunctionComponent<{
  name: string;
  options: Array<any>;
  operator?: string;
  onRemove(value: string): void;
}> = ({ name, options, operator, onRemove }) => {
  return (
    <>
      <span style={{ textDecoration: "underline" }}>{name}</span>{" "}
      <b>{operator}</b> ({" "}
      {options.map((option) => (
        <Token
          key={option?.key}
          option={option}
          readOnly={false}
          onRemove={() => onRemove(option.key)}
        >
          {option?.name}
        </Token>
      ))}
      )
    </>
  );
};
