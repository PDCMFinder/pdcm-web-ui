export async function getSearchOptions() {
  let options = await fetch(
    `${process.env.PUBLIC_URL}/data/search-options.json`
  );
  return options.json().then((d) => d);
}

export async function getSearchFacets() {
  let options = await fetch(
    `${process.env.PUBLIC_URL}/data/search-facets.json`
  );
  return options.json().then((d) => d);
}
