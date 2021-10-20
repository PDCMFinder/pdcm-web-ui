import React, { FunctionComponent } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { GeneralTemplate } from "../../templates/GeneralTemplate";

export const DataFlowPage: FunctionComponent = () => {
  document.title = "PDCM Finder - Data flow";
  return (
    <GeneralTemplate>
      <Container className="mt-5">
        <Row>
          <h1 className="mb-5">PDCM Finder Data Flow</h1>
        </Row>
        <Row>
          <Col>
            <h5 className="mb-3">PDX data submission</h5>
            <p>
              Many academic and commercial sources of PDX models have emerged in
              recent years and the size of the resources and the processes for
              creating and characterizing PDX models and their related data is
              variable (e.g.: custom database or individual files/tables
              collection). To account for this variability, multiple source data
              submission is achieved using bespoke automatic ingest pipelines.
              PDX data can be submitted by PDX providers via direct upload of
              files collection or via data access end-points (APIs). An
              interface for submitting PDX model metadata, as well as
              experimental data will be implemented in the future. A PDX
              provider can contact the PDX Finder via email to submit their data
              into the resource using&nbsp;
              <a href="mailto:helpdesk@pdxfinder.org?cc=helpdesk2@pdxfinder.org&amp;subject=PDX%20PRODUCER:%20DATA%20SUBMISSION%20REQUEST&amp;body=Body-goes-here">
                helpdesk.
              </a>
            </p>
            <h5 className="mb-3">PDX data standardization and harmonization</h5>
            <p>
              PDX data is stored in a secure Neo4j graph database which provides
              a powerful framework for storage, querying, and envisioning of
              biological data. Following data submission, data standardization
              (adherence to PDX-Minimum information standard) and harmonization
              is necessary to ensure cross-source data integration. More
              specifically, PDX model metadata includes clinical, chemical and
              experimental factors that can be described in a number of ways.
              Most producers of PDX models adhere to an internal vocabulary
              partially based on community-developed standards. For example, a
              cancer diagnosis is represented at different resources with&nbsp;
              <a
                href="https://ncit.nci.nih.gov/ncitbrowser"
                target="_blank"
                rel="noopener noreferrer"
              >
                NCI-Thesaurus
              </a>
              ,&nbsp;
              <a
                href="https://www.nlm.nih.gov/mesh/meshhome.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                MeSH
              </a>
              , and the&nbsp;
              <a
                href="http://disease-ontology.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Disease Ontology
              </a>
              . Other descriptors use free text or a mix of generic, commercial,
              and chemical labels (e.g. drugs). Expert knowledge is necessary to
              map between differing standards in order to achieve data
              harmonization. As this is a major issue across bioinformatics,
              ontology resources tools like&nbsp;
              <a
                href="http://www.ebi.ac.uk/spot/zooma"
                target="_blank"
                rel="noopener noreferrer"
              >
                ZOOMA&nbsp;
              </a>
              &nbsp;have been developed to semi-automate mapping of standards
              that produce unified indexes that facilitate data query and
              discovery. Following database deposition, multiple source PDX data
              is standardized and harmonized in a two-step process using both
              Automated mappings of ontology terms with ZOOMA and manual
              curation of remaining anomalous events. The automated
              standardization process will also check data compliance with the
              PDX Minimal Information standard and skip/report records that do
              not conform. The standardized and harmonized records will be then
              integrated into a cohesive ontological data model that supports
              consistent searching across sources. The ontological annotation
              will assist users in their search providing representation of the
              data and its relationship. For example, searching for
              &lsquo;Breast Cancer&rsquo; related PDX models will allow users to
              uncover all subclasses of breast cancer models in a single query,
              without having to look for each subtype individually. Rather than
              impose a limited set of terms to describe a given minimal
              information attribute, we will accept a source&rsquo;s internal
              standards and generate unified semantic indexes to describe the
              models. We will work with the PDX sources and local experts to
              will ensure the quality of the generated mappings and provide
              feedback to the developers of ontology tools.
            </p>
            <h5 className="mb-3">PDX data distribution</h5>
            <p>
              PDX data will be served through the PDX Finder interface allowing
              users to query PDX models based on their research needs. To
              facilitate flexibility for users, multiple search attributes will
              be supported allowing various points of entry into the data (e.g:
              tumour type, diagnosis, molecular markers). Search results will be
              displayed in a table to allow easy visualization and further
              filtering and selection. Clickable links will allow users to drill
              down in their selected PDX model data to discover additional
              patient/tumor/model attributes and associated studies (e.g
              dose-response studies, &lsquo;OMIC&rsquo; datasets). Furthermore,
              links to the data sources the model originates from will be
              provided to allow users to contact the relevant institution for
              further collaboration/model acquisition.
            </p>
          </Col>
          <Col>
            <div className="text-center">
              <img
                src={process.env.PUBLIC_URL + "data_flow_figure.png"}
                alt="Flow diagram for PDCM data submission process"
                style={{ width: "100%" }}
              />
            </div>
            <p>A summary of the PDX Finder data flow.</p>
            <h5 className="mb-3">(1) Submission</h5>
            <ul>
              <li>
                PDX data is submitted by PDX producers via data access
                end-points (APIs) or direct upload of files collection.
              </li>
              <li>
                PDX producers can contact the PDX finder via email to submit
                data using&nbsp;
                <a href="mailto:helpdesk@pdxfinder.org?cc=helpdesk2@pdxfinder.org&amp;subject=PDX%20PRODUCER:%20DATA%20SUBMISSION%20REQUEST&amp;body=Body-goes-here">
                  helpdesk&nbsp;
                </a>
              </li>
            </ul>
            <h5 className="mb-3">(2) Standardization and harmonization</h5>
            <ul>
              <li>PDX data is stored in a secure Neo4j graph database.</li>
              <li>
                Automated integration processes periodically consume data
                sources and ensure standardization/adherence to
                <br />
                <a
                  href="https://www.pdxfinder.org/pdx-data-submission-integration-and-distribution/#"
                  data-toggle="modal"
                  data-target="#mi-modal"
                >
                  PDX-MI
                </a>
                &nbsp;and across center data harmonization.
              </li>
            </ul>
            <h5>(3) Data Distribution</h5>
            <ul>
              <li>
                PDX Finder supports multiple search attributes thereby allowing
                various points of entry into the data (e.g: tumor
                <br />
                type, diagnosis, molecular markers).
              </li>
              <li>
                Search results are displayed in a table to allow easy
                visualization, further filtering, and selection.
              </li>
              <li>
                Links allow users to drill down in selected PDX model data to
                discover additional patient, tumour, model attributes
                <br />
                and associated studies (e.g. dose-response studies,
                &lsquo;OMIC&rsquo; studies).
              </li>
              <li>
                Links to the data sources the model originate from are provided
                (5).
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </GeneralTemplate>
  );
};
