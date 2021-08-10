import React, { FunctionComponent } from "react";
import { Jumbotron, Button } from "react-bootstrap";
import { GeneralTemplate } from "../templates/GeneralTemplate";

export const HomePage: FunctionComponent = () => {
  return (
    <GeneralTemplate>
      <Jumbotron>
        <h1>Hello, world!</h1>
        <p>
          This is a simple hero unit, a simple jumbotron-style component for
          calling extra attention to featured content or information.
        </p>
        <p>
          <Button variant="primary">Learn more</Button>
        </p>
      </Jumbotron>
    </GeneralTemplate>
  );
};
