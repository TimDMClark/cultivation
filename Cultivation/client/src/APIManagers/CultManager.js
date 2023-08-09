import React from 'react';

const baseUrl = 'https://localhost:7041/api/cult';

export const getAllCults = () => {
    return fetch(baseUrl)
    .then((response) => response.json());
};

export const getCultById = (id) => {
    return fetch(`${baseUrl}/${id}`)
    .then((response) => response.json());
};

export const addCult = (newCult) => {
    return fetch(baseUrl,  {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newCult)
        })
};

export const updateCult = (cult) => {
    return fetch(`${baseUrl}/${cult.Id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cult),
    });
};

export const deleteCult = (cultId) => {
    return fetch(`${baseUrl}/${cultId}`, {
        method: 'DELETE',
    });
};
