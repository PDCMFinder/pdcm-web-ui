export async function getModelDetails() {
  let response = await fetch(
    `${process.env.PUBLIC_URL}/data/search-options.json`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json().then((d) => d);
}
