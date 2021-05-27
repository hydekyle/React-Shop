import React, { useState, useEffect } from "react";
import { Button, Collapse, CardBody, Card } from "reactstrap";
import "./styles.css";
export default () => {
  const [IsOpen, SetIsOpen] = useState(true);

  const AboutMeClicked = () => {
    SetIsOpen(!IsOpen);
    console.log(IsOpen);
  };

  return (
    <div className="container">
      <Button className="banner-button" onClick={() => AboutMeClicked()}>
        <h2>Sobre mí</h2>
      </Button>
      <Collapse isOpen={IsOpen}>
        <Card>
          <CardBody>
            <p>¡Hola! Soy Hydekyle, un desarrollador independiente.</p>
            <p>
              Aquí verás tanto mis creaciones personales como algunos trabajos
              desarrollados como Freelancer.{" "}
            </p>
            <p>¡Haz click en el icono del juego para probarlo!</p>
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );
};
