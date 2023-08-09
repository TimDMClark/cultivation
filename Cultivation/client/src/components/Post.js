import React from "react";
import { Card, CardBody } from "reactstrap";


export const Post = ({ post }) => {
  return (
    <Card className="m-4">
      <CardBody>
        <p>
          <strong>{post.description}</strong>
        </p>
        <p>{post.date}</p>
      </CardBody>
    </Card>
  );
};