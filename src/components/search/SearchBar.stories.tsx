import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { ISearchBarProps, SearchBar } from "./SearchBar";
import { options } from "../../mock/SearchOptions";

export default {
  title: "Components/Search/Search bar",
  component: SearchBar,
} as Meta;

const Template: Story<ISearchBarProps> = (args) => (
  <div
    style={{ width: "100%", backgroundColor: "#fff" }}
    className="h-100 w-50"
  >
    <SearchBar {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  values: [],
  options: options,
  multiple: false,
  onChange: (value) => console.log(value),
};

export const Multiple = Template.bind({});
Multiple.args = {
  values: [],
  options: options,
  multiple: true,
  onChange: (value) => console.log(value),
};
