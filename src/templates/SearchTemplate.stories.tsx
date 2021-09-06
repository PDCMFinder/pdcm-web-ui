// @ts-nocheck
import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { Default as ResultsStory } from "../components/search/ResultsTable.stories";
import { Default as FacetsStory } from "../components/search/facets/FacetSidebar.stories";
import {
  ISearchTemplateProps,
  SearchTemplate,
} from "../templates/SearchTemplate";
import fetchMock from "fetch-mock";
import { options } from "../mock/SearchOptions";
import { QueryClient, QueryClientProvider } from "react-query";
import StoryRouter from "storybook-react-router";

export default {
  title: "Templates/Search template",
  component: SearchTemplate,
  argTypes: { onSearchChange: { action: "change" } },
  decorators: [StoryRouter(null, { initialEntries: ["/data/search"] })],
} as Meta;

const queryClient = new QueryClient();

const Template: Story<ISearchTemplateProps> = (args) => {
  fetchMock.get(
    `${process.env.PUBLIC_URL}/data/search-options.json`,
    args.options || [],
    { overwriteRoutes: true }
  );
  fetchMock.get(
    `${process.env.PUBLIC_URL}/data/search-facets.json`,
    args.facets || [],
    { overwriteRoutes: false }
  );
  return (
    <div style={{ width: "100%", backgroundColor: "#fff" }} className="h-100">
      <QueryClientProvider client={queryClient}>
        <SearchTemplate {...args} />
      </QueryClientProvider>
    </div>
  );
};
/*
 `${process.env.PUBLIC_URL}/data/search-options.json`
 `${process.env.PUBLIC_URL}/data/search-facets.json`
 */

export const Default = Template.bind({});
Default.args = {
  allowMultipleSearchTerms: true,
  resultsTableDisplayColumns: ResultsStory.args?.displayColumns,
  searchOptions: options,
  searchValues: [],
  facetSections: FacetsStory.args?.facetSections,
  facetSelection: {},
  onSearchChange: (searchTerm) => {},
};

export const SmallOptionSet = Template.bind({});
SmallOptionSet.args = {
  allowMultipleSearchTerms: true,
  resultsTableDisplayColumns: ResultsStory.args?.displayColumns,
  options: ["Test 1", "Test 2"],
};
