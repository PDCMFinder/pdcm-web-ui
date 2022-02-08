import React from "react";

export const NewsFeed: React.FC = () => {
  return (
    <div>
      <h1>News Feed</h1>
      {require
        .context("../../../public/static/content/", true, /\.md$/)
        .keys()
        .map((k) => (
          <div id={k}>{k}</div>
        ))}
    </div>
  );
};
