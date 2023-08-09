import React from 'react';

const baseUrl = 'https://localhost:7041/api/relationshipstatus';

export const getAllRelationshipStatus = () => {
  return fetch(`${baseUrl}`)
  .then((response) => response.json())
};