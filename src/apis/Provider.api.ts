import { IProviderTemplateProps } from "../templates/ProviderTemplate";
import { camelCase } from "./Utils.api";

export async function getProviderMetadata(
  providerId: string
): Promise<IProviderTemplateProps> {
  let response = await fetch(
    `${process.env.REACT_APP_API_URL}/provider_group?abbreviation=eq.${providerId}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json().then((d) => {
    let provider = camelCase(d[0]);
    return {
      providerId: provider.abbreviation,
      providerName: provider.name,
      providerLogo: provider.logo,
      providerDescription: provider.description.replace(/\\n/gm, "\n"),
      providerModelsBySystem: [],
      providerModelsByDataAvailability: [],
    };
  });
}
