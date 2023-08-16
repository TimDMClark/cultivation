import React from "react";
import { Route, Routes } from "react-router-dom";
import CultList from "../List/CultList";
import Login from "../Authorization/Login";
import PostList from "../List/PostList";
import Home from "../Home";
import CultDetails from "../Details/CultDetails";
import Profile from "../Profile";



export default function ApplicationViews() {

 return(
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cults" element={<CultList />} />
        <Route path="/cults/:cultId" element={<CultDetails />} />
        <Route path="/posts" element={<PostList />} />
      </Routes>
   );
};