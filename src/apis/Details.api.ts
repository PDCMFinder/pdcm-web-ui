import { IEngraftment } from "../components/details/ModelEngraftmentTable";
import { IMolecularCharacterization } from "../components/details/MolecularDataTable";
import { Treatment } from "../models/PDCModel.model";
import { camelCase } from "./Utils.api";

export interface IModelExtLinks {
  contactLink?: string;
  sourceDatabaseUrl?: string;
}

export async function getModelDetailsMetadata(
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
    `${process.env.REACT_APP_API_URL}/model_information?id=eq.${pdcmModelId}&select=id,contact_people(name_list,email_list),contact_form(form_url),source_database(database_url)`
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

export async function getModelQualityData(pdcmModelId: string) {
  if (!pdcmModelId) {
    return [];
  }
  let response = await fetch(
    `${process.env.REACT_APP_API_URL}/quality_assurance?model_id=eq.${pdcmModelId}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json().then((d) => {
    return d.map((item: any) => camelCase(item));
  });
}

export async function getModelMolecularData(pdcmModelId: string) {
  if (!pdcmModelId) {
    return [];
  }
  let response = await fetch(
    `${process.env.REACT_APP_API_URL}/details_molecular_data?or=(patient_model_id.eq.${pdcmModelId},xenograft_model_id.eq.${pdcmModelId})`,
    { headers: { Prefer: "count=exact" } }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json().then((d) => {
    return d.map((item: any) => camelCase(item));
  });
}

export async function getModelMolecularDataColumns(
  molecularCharacterizationId: number,
  dataType: string
) {
  if (!molecularCharacterizationId || dataType === "cytogenetics") {
    return [];
  }
  const typeEndpointMap: any = {
    mutation: "mutation_data_table_columns",
    expression: "expression_data_table_columns",
    "copy number alteration": "cna_data_table_columns",
    cytogenetics: "cytogenetics_data_table_columns",
  };
  const endpoint = typeEndpointMap[dataType];
  let response = await fetch(
    `${process.env.REACT_APP_API_URL}/${endpoint}?molecular_characterization_id=eq.${molecularCharacterizationId}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json().then((d) => {
    return d[0].not_empty_cols;
  });
}

export async function getModelMolecularDataDetails(
  molecularCharacterizationId: number,
  dataType: string,
  columns: string[],
  filter: string,
  page: number,
  pageSize: number,
  sortColumn: string,
  sortDirection: string
) {
  if (!molecularCharacterizationId) {
    return [];
  }
  const typeEndpointMap: any = {
    mutation: "mutation_data_table",
    expression: "expression_data_table",
    "copy number alteration": "cna_data_table",
    cytogenetics: "cytogenetics_data_table",
  };
  const endpoint = typeEndpointMap[dataType];
  let request = `${process.env.REACT_APP_API_URL}/${endpoint}?molecular_characterization_id=eq.${molecularCharacterizationId}`;
  if (filter) {
    request += `&text=ilike.*${filter}*`;
  }
  request += `&limit=${pageSize}&offset=${(page - 1) * pageSize}`;
  if (sortColumn) {
    request += `&order=${sortColumn}`;
    if (sortDirection) {
      request += `.${sortDirection}`;
    }
  }
  let response = await fetch(request, { headers: { Prefer: "count=exact" } });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json().then((d) => {
    return [
      parseInt(response.headers.get("Content-Range")?.split("/")[1] || "0"),
      d.map((item: any) => {
        delete item.molecular_characterization_id;
        delete item.text;
        return item;
      }),
    ];
  });
}

export async function getMolecularDataDownload(
  molecularCharacterization: IMolecularCharacterization,
  dataType: string
) {
  if (!molecularCharacterization.id) {
    return [];
  }
  const typeEndpointMap: any = {
    mutation: "mutation_data_table",
    expression: "expression_data_table",
    "copy number alteration": "cna_data_table",
    cytogenetics: "cytogenetics_data_table",
  };
  const endpoint = typeEndpointMap[dataType];
  let request = `${process.env.REACT_APP_API_URL}/${endpoint}?molecular_characterization_id=eq.${molecularCharacterization.id}`;
  let response = await fetch(request, { headers: { Prefer: "count=exact" } });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json().then((d) => {
    return d.map((item: any) => {
      delete item.molecular_characterization_id;
      delete item.text;
      item["sampleID"] =
        molecularCharacterization.patientSampleId ||
        molecularCharacterization.xenograftSampleId;
      return item;
    });
  });
}

export async function getModelEngraftments(
  pdcmModelId: string,
  modelType: string
): Promise<Array<IEngraftment>> {
  if (!pdcmModelId || modelType !== "xenograft model") {
    return [];
  }
  let response = await fetch(
    `${process.env.REACT_APP_API_URL}/xenograft_model_specimen?model_id=eq.${pdcmModelId}&select=host_strain(name, nomenclature),engraftment_site(name),engraftment_type(name),engraftment_sample_type(name),engraftment_sample_state(name),passage_number`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json().then((d) => {
    return d.map((item: any) => {
      const engraftment: IEngraftment = camelCase(item);
      const itemCamelCase: any = camelCase(item);
      engraftment.hostStrain = itemCamelCase.hostStrain.name;
      engraftment.hostStrainNomenclature =
        itemCamelCase.hostStrain.nomenclature;
      engraftment.engraftmentSite = itemCamelCase.engraftmentSite.name;
      engraftment.engraftmentType = itemCamelCase.engraftmentType.name;
      engraftment.engraftmentSampleType =
        itemCamelCase.engraftmentSampleType.name;
      engraftment.engraftmentSampleState =
        itemCamelCase.engraftmentSampleState?.name;
      return engraftment;
    });
  });
}

export async function getPatientTreatment(
  pdcmModelId: string,
  modelType: string
): Promise<Array<Treatment>> {
  if (!pdcmModelId || modelType !== "xenograft") {
    return [];
  }
  let response = await fetch(
    `${process.env.REACT_APP_API_URL}/patient_treatment?model_id=eq.${pdcmModelId}&select=*`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json().then((d) => {
    return d.flatMap((item: any) => {
      const itemCamelCase: any = camelCase(item);

      return itemCamelCase.treatment.split(" And ").map((name: string) => {
        return {
          treatmentName: name,
          treatmentDose: itemCamelCase.dose,
          treatmentResponse: itemCamelCase.response,
        };
      });
    });
  });
}

export async function getModelDrugDosing(
  pdcmModelId: string,
  modelType: string
): Promise<Array<Treatment>> {
  if (!pdcmModelId || modelType !== "xenograft") {
    return [];
  }
  let response = await fetch(
    `${process.env.REACT_APP_API_URL}/dosing_studies?model_id=eq.${pdcmModelId}&select=*`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json().then((d) => {
    return d.map((item: any) => {
      const itemCamelCase: any = camelCase(item);
      let treatment: Treatment = {
        treatmentName: itemCamelCase.treatment,
        treatmentDose: itemCamelCase.dose,
        treatmentResponse: itemCamelCase.response,
      };
      return treatment;
    });
  });
}

export async function getExpressionHeatmap(
  molecularCharacterizationId: number,
  dataType: string
): Promise<Array<any>> {
  if (!molecularCharacterizationId || dataType !== "expression") {
    return [];
  }
  let response = await fetch(
    `${process.env.PUBLIC_URL}/static/expression_heatmap.json`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json().then((d) => {
    return d.map((item: any) => camelCase(item));
  });
}

function createMailToLink(emails: string, externalModelId: string) {
  const subject = `Information about ${externalModelId}`;
  return `mailto:${emails}?subject=${encodeURIComponent(subject)}`;
}
