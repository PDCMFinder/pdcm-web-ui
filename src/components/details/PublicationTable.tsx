import React, { FunctionComponent } from "react";
import { Card, ListGroup, ListGroupItem, Table } from "react-bootstrap";
import { Publication, Treatment } from "../../models/PDCModel.model";

export interface IPublicationsTableProps {
  publications: Array<Publication>;
}

export const PublicationTable: FunctionComponent<IPublicationsTableProps> = ({
  publications,
}) => {
  return (
    <>
      {publications.map((publication: Publication) => (
        <Card className="my-4">
          <Card.Body>
            <Card.Title>{publication.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {publication.authorString}
            </Card.Subtitle>
            <Card.Text>
              {publication.journalTitle} - {publication.pubYear}
            </Card.Text>
            <Card.Link
              href={`https://europepmc.org/article/MED/${publication.pmid}`}
              target="_blank"
              rel="noreferrer"
            >
              View at EuropePMC
            </Card.Link>
            <Card.Link
              href={`https://doi.org/${publication.doi}`}
              target="_blank"
              rel="noreferrer"
            >
              DOI:{publication.doi}
            </Card.Link>
          </Card.Body>
        </Card>
      ))}
    </>
  );
};
