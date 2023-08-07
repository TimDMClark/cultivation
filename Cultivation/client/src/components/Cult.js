import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";


export const Cult = ({ cult }) => {
  return (
    <Card className="m-4">
      {/* <p className="text-left px-2">Posted by: {cult.userProfile.name}</p> */}
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