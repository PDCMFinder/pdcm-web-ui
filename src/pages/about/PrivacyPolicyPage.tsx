import React, { FunctionComponent } from "react";
import { Container } from "react-bootstrap";
import { GeneralTemplate } from "../../templates/GeneralTemplate";

const PRIVACY_POLICY_LINKS = [
  {
    title: "PDCM Finder website",
    description: "applies to usage of the PDCM Finder website",
    link: "https://www.ebi.ac.uk/data-protection/privacy-notice/pdx-finder",
  },
  {
    title: "PDCM Finder Analytics",
    description:
      "applies to usage of anonymous usage statistics the PDCM Finder portal gathers",
    link:
      "http://www.ebi.ac.uk/data-protection/privacy-notice/pdx-finder-analytics",
  },
  {
    title: "PDCM Finder Submissions",
    description:
      "applies to the data submitted to the PDCM Finder resource (e.g,. PDCM model metadata). This also applies to any personal data acquired from publications, or from communication with authors (including author names, e-mails and addresses) that the PDCM Finder uses to provide contact information for providers and to make publication information available as part of the PDCM Finder resource",
    link:
      "http://www.ebi.ac.uk/data-protection/privacy-notice/pdx-finder-submissionservices",
  },
  {
    title: "PDCM Finder Mail Services",
    description:
      "applies to email contact such as our public e-mail lists (e.g., pdxfinder-announce@ebi.ac.uk) and helpdesk helpdesk@pdxfinder.org",
    link:
      "http://www.ebi.ac.uk/data-protection/privacy-notice/pdx-finder-mailservices",
  },
];

export const PrivacyPolicyPage: FunctionComponent = ({}) => {
  document.title = "PDCM Finder - Privacy Policy";
  return (
    <GeneralTemplate>
      <Container className="mt-5">
        <h1>Privacy Policy</h1>
        <p>
          The General Data Protection Regulation (GDPR) will apply in the UK
          from 25 May 2018. It will replace the 1998 Data Protection Act and
          introduce new rules on privacy notices, as well as processing and
          safeguarding personal data.
        </p>
        <p>
          More details about our privacy policy can be found by following the
          links below:
        </p>
        <ul>
          {PRIVACY_POLICY_LINKS.map((link) => (
            <li>
              <a href={link.link}>{link.title}</a>: {link.description}
            </li>
          ))}
        </ul>
      </Container>
    </GeneralTemplate>
  );
};
