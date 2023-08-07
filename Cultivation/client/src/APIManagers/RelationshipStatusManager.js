import React from 'react';

const baseUrl = 'https://localhost:7041/api/user';

export const getAllRelationshipStatus = () => {
  return fetch(`${baseUrl}/api/user`)
  .then((response) => response.json())
};