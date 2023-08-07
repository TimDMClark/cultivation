import React from "react";
import { Route, Routes } from "react-router-dom";
import CultList from "./CultList";
import Login from "./Login";



export default function ApplicationViews() {

 return(
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="cults" element={<CultList />} />
      </Routes>
   );
};