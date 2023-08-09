import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";


export const Cult = ({ cult }) => {
  return (
    <Card className="m-4">
      <CardBody>
        <p>
          <Link to={`/cults/${cult.id}`}>
          <strong>{cult.name}</strong>
          </Link>
        </p>
        <p>{cult.description}</p>
      </CardBody>
    </Card>
  );
};