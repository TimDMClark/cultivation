import React from 'react';

const baseUrl = 'https://localhost:7041/api/user';

export const login = (inputUser) => {
  return fetch(`${baseUrl}/GetByEmail?email=${inputUser.email}`)
    .then((r) => r.json())
    .then((userFromServer) => {
      if (userFromServer && userFromServer.id) {
        if (userFromServer.password === inputUser.password) {
          localStorage.setItem("user", JSON.stringify(userFromServer));
          return userFromServer;
        } else {
          throw new Error("Invalid password");
        }
      } else {
        throw new Error("Invalid email");
      }
    })
    .catch((error) => {
      throw error;
    });
};

export const logout = () => {
  localStorage.clear()
};

export const register = (user) => {
  return  fetch(`${baseUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
  .then((response) => response.json())
  .then((savedUser) => {
    localStorage.setItem("user", JSON.stringify(savedUser));
    return savedUser;
  })
  .catch((error) => {
    throw new Error("Registration failed");
  });
};


export const getAllUsers = () => {
  return fetch(`${baseUrl}/api/user`)
  .then((response) => response.json())
};

export const getUserById = (id) => {
  return fetch(`${baseUrl}/${id}`)
  .then((response) => response.json())
  .then(user => {
    console.log("Fetched user:", user);
    return user;
  })
};

export const editUser = (user) => {
  //make sure your parameter matches the one you are sending to the API
  return fetch(`${baseUrl}/${user.id}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
  })
}
