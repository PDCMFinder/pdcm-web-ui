import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { NewsFeed } from "./NewsFeed";

export default {
  title: "Components/Common/NewsFeed",
  component: NewsFeed,
} as Meta;

const Template: Story = (args) => (
  <div style={{ width: "30%", backgroundColor: "#fff", marginTop: "20px" }}>
    <NewsFeed {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {};
