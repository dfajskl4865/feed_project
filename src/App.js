import React from "react";
import "./App.css";

import Login from "./pages/Login";
import Join from "./pages/Join";
import Main from "./pages/Main";
import Dogdry from "./pages/Dogdry";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true;

export const StoreContext = React.createContext({});

function App() {
  const [loginUser, setLoginUser] = React.useState({});
  return (
    <StoreContext.Provider
      value={{
        loginUser: loginUser,
      }}
    >
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/join" element={<Join />} />
        <Route exact path="/main" element={<Main />} />
        <Route exact path="/dogdry" element={<Dogdry />} />
      </Routes>
    </StoreContext.Provider>
  );
}

export default App;
