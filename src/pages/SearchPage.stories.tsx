import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { ISearchPageProps, SearchPage } from "./SearchPage";
import { Default as ResultsStory } from "../components/search/ResultsTable.stories";
import { Default as SearchBarStory } from "../components/search/SearchBar.stories";
import { Default as FacetsStory } from "../components/search/Facets.stories";

export default {
  title: "Pages/Search page",
  component: SearchPage,
  argTypes: { onSearchChange: { action: "change" } },
} as Meta;

const Template: Story<ISearchPageProps> = (args) => (
  <div style={{ width: "100%", backgroundColor: "#fff" }} className="h-100">
    <SearchPage {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  searchValues: SearchBarStory.args?.values,
  searchOptions: SearchBarStory.args?.options,
  searchMultiple: SearchBarStory.args?.multiple,
  searchResults: ResultsStory.args?.results,
  displayColumns: ResultsStory.args?.displayColumns,
  facetsSections: FacetsStory.args?.facetSections,
};

export const MultipleTermSearch = Template.bind({});
MultipleTermSearch.args = {
  searchValues: SearchBarStory.args?.values,
  searchOptions: SearchBarStory.args?.options,
  searchMultiple: true,
  searchResults: ResultsStory.args?.results,
  displayColumns: ResultsStory.args?.displayColumns,
  facetsSections: FacetsStory.args?.facetSections,
};

export const NoResults = Template.bind({});
NoResults.args = {
  searchValues: SearchBarStory.args?.values,
  searchOptions: SearchBarStory.args?.options,
  searchMultiple: false,
  searchResults: [],
  displayColumns: ResultsStory.args?.displayColumns,
  facetsSections: FacetsStory.args?.facetSections,
};
