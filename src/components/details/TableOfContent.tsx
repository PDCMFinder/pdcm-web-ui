import {
  faEnvelope,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { Button } from "react-bootstrap";
import { IDetailsTemplateProps } from "../../templates/DetailsTemplate";

export const TableOfContent: FC<IDetailsTemplateProps> = ({
  modelType,
  engraftments,
  qualityChecks,
  molecularCharacterizations,
  dosingStudies,
  patientTreatments,
  contactLink,
  sourceDatabaseUrl,
  providerId,
}) => {
  return (
    <>
      <h6 className="text-muted my-4">Data available</h6>
      <ul className="list-unstyled">
        {modelType === "xenograft" ? (
          <li className="py-3">
            <a
              href="#quality-control"
              className={
                engraftments.length > 0
                  ? ""
                  : "disabled text-muted text-decoration-none"
              }
            >
              PDX model engraftment
            </a>
          </li>
        ) : null}
        <li className="py-3">
          <a
            href="#quality-control"
            className={
              qualityChecks.length > 0
                ? ""
                : "disabled text-muted text-decoration-none"
            }
          >
            Quality control
          </a>
        </li>
        <li className="py-3">
          <a
            href="#molecular-data"
            className={
              molecularCharacterizations.length > 0
                ? ""
                : "disabled text-muted text-decoration-none"
            }
          >
            Molecular data
          </a>
        </li>
        <li className="py-3">
          <a
            href="#dosing-studies"
            className={
              dosingStudies.length > 0
                ? ""
                : "disabled text-muted text-decoration-none"
            }
          >
            Dosing studies
          </a>
        </li>
        <li className="py-3">
          <a
            href="#patient-treatment"
            className={
              patientTreatments.length > 0
                ? ""
                : "disabled text-muted text-decoration-none"
            }
          >
            Patient treatment
          </a>
        </li>
        {/* <li className="py-3"><a href="#publications" className={qualityChecks.length > 0 ? "" : "disabled text-muted text-decoration-none"}>Publications</a></li> */}
        <li className="py-3">
          <Button
            variant="outline-primary"
            href={contactLink}
            target="_blank"
            className="w-100"
          >
            <FontAwesomeIcon icon={faEnvelope} />
            &nbsp; Contact provider
          </Button>
        </li>

        {sourceDatabaseUrl && (
          <li className="py-3">
            <Button
              variant="outline-primary"
              href={sourceDatabaseUrl}
              target="_blank"
              className="w-100"
            >
              <FontAwesomeIcon icon={faExternalLinkAlt} />
              &nbsp; View data at {providerId}
            </Button>
          </li>
        )}
      </ul>
    </>
  );
};
