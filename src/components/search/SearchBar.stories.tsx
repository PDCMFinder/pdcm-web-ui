import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { ISearchBarProps, SearchBar } from "./SearchBar";

export default {
  title: "Components/Search/Search bar",
  component: SearchBar,
} as Meta;

const Template: Story<ISearchBarProps> = (args) => (
  <div style={{ width: "100%", backgroundColor: "#fff" }} className="h-100">
    <SearchBar {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  value: "",
  onChange: (value) => console.log(value),
};
