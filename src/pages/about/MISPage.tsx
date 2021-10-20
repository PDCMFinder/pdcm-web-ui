import React, { FunctionComponent } from "react";
import { Container } from "react-bootstrap";
import { GeneralTemplate } from "../../templates/GeneralTemplate";

export const MISPage: FunctionComponent = () => {
  document.title = "PDCM Finder - Minimum Information Standard";
  return (
    <GeneralTemplate>
      <Container className="mt-5">
        <h1 className="mb-5">PDX Minimum Information Standard</h1>
        <p>
          The PDX Minimal Information document represents the results of a broad
          community effort to develop a standard regarding the essential
          information needed to describe a PDX model. This work was published in
          the dedicated informatics issue of Cancer Research (Nov. 2017) and is
          serving as the basis for the PDX Finder&rsquo;s comprehensive search
          and attribute filtering options (e.g., tumor histology, molecular
          variant, drug response). The minimal information standard will be an
          evolving resource based on community feedback.
        </p>
        <p>
          Comments about the standards are welcome and can be sent to&nbsp;
          <a
            href="http://www.informatics.jax.org/mgihome/support/mgi_inbox.shtml"
            target="_blank"
            rel="noreferrer"
          >
            MGI User Support&nbsp;
          </a>
          Be sure to include &ldquo;PDX MI&rdquo; as the Subject.
        </p>
        <p>
          <a
            href="https://www.ncbi.nlm.nih.gov/pubmed/29092942"
            target="_blank"
            rel="noreferrer"
          >
            PDX-MI: Minimal Information for Patient-Derived Tumor Xenograft
            Models&nbsp;
          </a>
        </p>
        <h5>Authors</h5>
        <p>
          Terrence F. Meehan<sup>1*</sup>, Nathalie Conte<sup>1*</sup>, Theodore
          C. Goldstein<sup>2</sup>, Giorgio Inghirami<sup>3</sup>, Mark A.
          Murakami<sup>4</sup>, Sebastian Brabetz<sup>5,6</sup>, Zhiping Gu
          <sup>7</sup>, Jeffrey A. Wiser<sup>7</sup>, Patrick Dunn<sup>7</sup>,
          Dale A. Begley<sup>8</sup>, Debra M. Krupke<sup>8</sup>, Andrea
          Bertotti<sup>9</sup>, Alejandra Bruna<sup>10</sup>, Matthew Brush
          <sup>11</sup>, Annette T. Byrne<sup>12</sup>, Carlos Caldas
          <sup>10</sup>, Amanda L. Christie<sup>4</sup>, Dominic Clark
          <sup>1</sup>, Heidi Dowst<sup>13</sup>, Jonathan R. Dry<sup>14</sup>,
          James Doroshow<sup>15</sup>, Olivier Duchamp<sup>16</sup>, Yvonne A.
          Evrard<sup>17</sup>, Stephane Ferretti<sup>18</sup>, Kristopher K.
          Frese<sup>19</sup>, Neal C. Goodwin<sup>20</sup>, Danielle M.
          Greenawalt<sup>21</sup>, Melissa A. Haendel<sup>11</sup>, Els Hermans
          <sup>22</sup>, Peter J. Houghton<sup>23</sup>, Jos Jonkers
          <sup>24</sup>, Kristel Kemper<sup>24</sup>, Tin O. Khor<sup>25</sup>,
          Michael T. Lewis<sup>26</sup>, KC Kent Lloyd<sup>27</sup>, Jeremy C.
          Mason<sup>1</sup>, Enzo Medico<sup>9</sup>, Steven B. Neuhauser
          <sup>8</sup>, Jim M. Olson<sup>28</sup>, Daniel S. Peeper<sup>24</sup>
          , Oscar M. Rueda<sup>10</sup>, Je Kyung Seong<sup>29</sup>, Livio
          Trusolino<sup>9</sup>, Emilie Vinolo<sup>30</sup>, Robert J.
          Wechsler-Reya<sup>31</sup>, David M. Weinstock<sup>4</sup>, Alana Welm
          <sup>32</sup>, Saravut J. Weroha<sup>33</sup>, Fr&eacute;d&eacute;ric
          Amant<sup>24,34</sup>, Stefan M Pfister&nbsp;<sup>5,6,35</sup>, Marcel
          Kool<sup>5</sup>, Helen Parkinson<sup>1</sup>, Atul J. Butte
          <sup>2</sup>, Carol J. Bult<sup>8</sup>
        </p>
        <p>
          <sup>*</sup>&nbsp;= These authors contributed equally to the
          manuscript
        </p>
        <h5>Institutes</h5>
        <p>
          <sup>1</sup>European Molecular Biology Laboratory-European
          Bioinformatics Institute, Hinxton, UK.&nbsp;<sup>2</sup>Institute for
          Computational Health Sciences, University of California, San
          Francisco, USA.&nbsp;<sup>3</sup>Department of Pathology and
          Laboratory Medicine, Weill Cornell Medical College, New York,
          USA.&nbsp;<sup>4</sup>Dana-Farber Cancer Institute and Harvard Medical
          School, Boston, USA.&nbsp;<sup>5</sup>Division of Pediatric
          Neuro-oncology, German Cancer Research Center (DKFZ), Heidelberg,
          Germany.&nbsp;<sup>6</sup>German Cancer Consortium (DKTK), German
          Cancer Research Center (DKFZ), Heidelberg, Germany.&nbsp;<sup>7</sup>
          Northrop Grumman Information Systems Health IT, Rockville, USA.&nbsp;
          <sup>8</sup>The Jackson Laboratory, Bar Harbor, USA.&nbsp;<sup>9</sup>
          Candiolo Cancer Institute IRCCS and Department of Oncology, University
          of Torino, Torino, Italy.&nbsp;<sup>10</sup>Cancer Research UK
          Cambridge Institute, Cambridge Cancer Centre, University of Cambridge,
          United Kingdom.&nbsp;<sup>11</sup>Department of Medical Informatics
          and Clinical Epidemiology and OHSU Library, Oregon Health &amp;
          Science University, Portland, USA.&nbsp;<sup>12</sup>Royal College of
          Surgeons in Ireland, Ireland.&nbsp;<sup>13</sup>Dan L. Duncan Cancer
          Center, Baylor College of Medicine, Houston, USA.&nbsp;<sup>14</sup>
          Oncology Innovative Medicines and Early Development, AstraZeneca
          R&amp;D Boston, Waltham, MA, USA.&nbsp;<sup>15</sup>Center for Cancer
          Research, National Cancer Institute, USA.&nbsp;<sup>16</sup>Oncodesign
          Biotechnology, and IMODI consortium, France.&nbsp;<sup>17</sup>Leidos
          Biomedical Research, Inc, Frederick National Laboratory for Cancer
          Research, Frederick, USA.&nbsp;<sup>18</sup>Oncology Disease Area,
          Novartis Institutes for Biomedical Research, Switzerland.&nbsp;
          <sup>19</sup>Cancer Research UK Manchester Institute, The University
          of Manchester, United Kingdom.&nbsp;<sup>20</sup>Champions Oncology,
          Baltimore, USA.&nbsp;<sup>21</sup>&nbsp;Translational Bioinformatics
          Bristol-Myers Squibb, Pennington, New Jersey USA.&nbsp;<sup>22</sup>
          Katholieke Universiteit Leuven, Leuven, Belgium.&nbsp;<sup>23</sup>
          Greehey Children&rsquo;s Cancer Research Institute, University of
          Texas Health Science Center at San Antonio, San Antonio, USA.&nbsp;
          <sup>24</sup>The Netherlands Cancer Institute, Amsterdam,
          Netherlands.&nbsp;<sup>25</sup>MD Anderson Cancer Center, USA.&nbsp;
          <sup>26</sup>The Lester and Sue Smith Breast Center, Departments of
          Molecular and Cellular Biology and Radiology, Baylor College of
          Medicine, USA.&nbsp;<sup>27</sup>Department of Surgery, School of
          Medicine, and Mouse Biology Program, University of California Davis,
          Davis, USA.&nbsp;<sup>28</sup>Fred Hutchinson Cancer Research Center,
          Seattle Children&rsquo;s Hospital, USA.&nbsp;<sup>29</sup>Research
          Institute for Veterinary Science and Korea Mouse Phenotyping Center,
          Seoul , Republic of Korea.&nbsp;<sup>30</sup>Seeding Science SAS,
          Paris, France.&nbsp;<sup>31</sup>Tumor Initiation and Maintenance
          Program, NCI-Designated Cancer Center, La Jolla, USA.&nbsp;
          <sup>32</sup>Huntsman Cancer Institute, University of Utah, Salt Lake
          City, USA.&nbsp;<sup>33</sup>Department of Oncology, Mayo Clinic
          College of Medicine, Rochester, USA.&nbsp;<sup>34</sup>University of
          Leuven, Leuven, Belgium.&nbsp;<sup>35</sup>Department of Pediatric
          Oncology, Hematology and Immunology, Heidelberg University Hospital,
          Heidelberg, Germany.
        </p>
      </Container>
    </GeneralTemplate>
  );
};
