import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter } from 'react-router-dom'
import Authorize from "./components/Views/Authorize";
import ApplicationViews from "./components/Views/ApplicationViews";
import Header from "./components/Header";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(true);


  useEffect(() => {
    if (!localStorage.getItem("user")) {
      setIsLoggedIn(false)

    }
  }, [isLoggedIn])

  return (
    <BrowserRouter>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      {isLoggedIn ?
        <ApplicationViews />
        :
        <Authorize setIsLoggedIn={setIsLoggedIn} />
      }
    </BrowserRouter>
  )
}

export default App;