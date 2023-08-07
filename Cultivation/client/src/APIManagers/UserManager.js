import React from 'react';

const baseUrl = 'https://localhost:7041/api/user';

export const login = (user) => {
  return fetch(`${baseUrl}/api/user/getbyemail?email=${user.email}`)
    .then((r) => r.json())
    .then((user) => {
      if (user && user.id) {
        localStorage.setItem("userProfile", JSON.stringify(user));
        return user;
      } else {
        throw new Error("Invalid email");
      }
    })
    .catch((error) => {
      throw new Error("Invalid email");
    });
};

export const logout = () => {
      localStorage.clear()
};

export const register = (user, password) => {
  return  fetch(`${baseUrl}/api/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
  .then((response) => response.json())
    .then((savedUser) => {
      localStorage.setItem("user", JSON.stringify(savedUser))
    });
};

export const getAllUsers = () => {
  return fetch(`${baseUrl}/api/user`)
  .then((response) => response.json())
};

export const getUserById = (id) => {
  return fetch(`${baseUrl}/api/user/${id}`)
  .then((response) => response.json())
};

export const editUser = (user) => {
  //make sure your parameter matches the one you are sending to the API
  return fetch(`${baseUrl}/api/UserProfile/${user.Id}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
  })
}