// @ts-nocheck
import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { Default as ResultsStory } from "../components/search/ResultsTable.stories";
import { Default as FacetsStory } from "../components/search/facets/FacetSidebar.stories";
import StoryRouter from "storybook-react-router";
import { SearchPage } from "./SearchPage";
import fetchMock from "fetch-mock";
import { options } from "../mock/SearchOptions";
import { useQuery } from "react-query";
import { QueryClient, QueryClientProvider } from "react-query";

export default {
  title: "Pages/Search page",
  component: SearchPage,
  argTypes: { onSearchChange: { action: "change" } },
  decorators: [StoryRouter(undefined, { initialEntries: ["/search"] })],
} as Meta;

const queryClient = new QueryClient();

const Template: Story = (args) => {
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
        <SearchPage {...args} />
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
  options: options,
  facets: FacetsStory.args?.facetSections,
};

export const SmallOptionSet = Template.bind({});
SmallOptionSet.args = {
  allowMultipleSearchTerms: true,
  resultsTableDisplayColumns: ResultsStory.args?.displayColumns,
  options: ["Test 1", "Test 2"],
};
