import React from 'react';

const baseUrl = 'https://localhost:7041/api/cultmember';

export const getAllCultMembers = () => {
    return fetch(baseUrl)
    .then((response) => response.json());
};

export const getCultMembersByUserId = (userId) => {
    return fetch(`${baseUrl}/byuser/${userId}`)
    .then((response) => response.json());
};

export const getCultMembersByCultId = (cultId) => {
    return fetch(`${baseUrl}/bycult/${cultId}`)
    .then((response) => response.json());
};

export const addCultMember = (cultMember) => {
    return fetch(baseUrl,  {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(cultMember)
        })
    .then((response) => response.json());
};

export const deleteCultMember = (id) => {
    return fetch(`${baseUrl}/${id}`, {
        method: 'DELETE',
    });
};
