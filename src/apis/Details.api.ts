export interface IModelExtLinks {
  contactLink?: string;
  sourceDatabaseUrl?: string;
}

export async function getModelDetails(
  modelId: string,
  providerId: string
): Promise<any> {
  let response = await fetch(
    `${process.env.REACT_APP_API_URL}/search_index?external_model_id=eq.${modelId}&data_source=eq.${providerId}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json().then((d) => camelCase(d[0]));
}

export async function getModelExtLinks(
  pdcmModelId: string,
  modelId: string
): Promise<IModelExtLinks> {
  if (!pdcmModelId) {
    return {};
  }
  let response = await fetch(
    `${process.env.REACT_APP_API_URL}/model?id=eq.${pdcmModelId}&select=id,contact_people(name_list,email_list),contact_form(form_url),source_database(database_url)`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json().then((d) => {
    let extLinks = camelCase(d[0]);
    for (let d in extLinks) {
      extLinks[d] = camelCase(extLinks[d]);
    }
    let modelExtLinks: IModelExtLinks = {
      contactLink: extLinks.contactForm.formUrl
        ? extLinks.contactForm.formUrl
        : createMailToLink(extLinks.contactPeople.emailList, modelId),
      sourceDatabaseUrl: extLinks.sourceDatabase.databaseUrl,
    };
    return modelExtLinks;
  });
}

function camelCase(obj: any) {
  var newObj: any = {};
  for (let d in obj) {
    if (obj.hasOwnProperty(d)) {
      newObj[
        d.replace(/(\_\w)/g, function (k) {
          return k[1].toUpperCase();
        })
      ] = obj[d];
    }
  }
  return newObj;
}

function createMailToLink(emails: string, externalModelId: string) {
  const subject = `Information about ${externalModelId}`;
  return `mailto:${emails}?subject=${encodeURIComponent(subject)}`;
}
