export interface PDCModel {
  pdcmId: string;
  datasource: string;
  sourceId: string;
  ncitTerm: string;
  originTissue: string;
  sampleSite: string;
  sampleExtractionMethod: string;
  classification: string;
  tumorType: string;
  cancerSystems: string;
  availableData: Array<string>;
  mutations?: Array<string>;
  drugs?: Array<string>;
  responses?: Array<string>;
  patient: Patient;
}

export interface Patient {
  ageRange?: string;
  gender: string;
  ethnicity?: string;
  treatmentHistory?: string;
  originalDiagnosis: string;
}
