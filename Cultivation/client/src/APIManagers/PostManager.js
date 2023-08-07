import React from 'react';

const baseUrl = 'https://localhost:7041/api/user';

export const getAllPosts = () => {
    return fetch(baseUrl)
    .then((response) => response.json());
};

export const getPostById = (postId) => {
    return fetch(`${baseUrl}/${postId}`)
    .then((response) => response.json);
};

export const addPost = (newPost) => {
    return fetch(baseUrl,  {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newPost)
        })
};

export const updatePost = (post) => {
    return fetch(`${baseUrl}/${post.Id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
    });
};

export const deletePost = (postId) => {
    return fetch(`${baseUrl}/${postId}`, {
        method: 'DELETE',
    });
};