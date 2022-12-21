import React from "react";
import "./App.css";

import Login from "./pages/Login";
import Join from "./pages/Join";
import Main from "./pages/Main";
import Write from "./pages/Write";
import Sharingarticle from "./pages/Sharing_article";
import Articlereply from "./pages/Article_reply";
import Dogdry from "./pages/Dogdry";
import Dogmoist from "./pages/Dogmoist";
import Catdry from "./pages/Catdry";
import Catmoist from "./pages/Catmoist";
import Catmoistdata from "./pages/Catmoist_data";
import Catdrydata from "./pages/Catdry_data";
import Dogdrydetail from "./pages/Dogdry_detail";
import Dogdrydata from "./pages/Dogdry_data";
import Dogmoistdata from "./pages/Dogmoist_data";
import Dogmoistdtail from "./pages/Dogmoist_detail";
import Catdrydetail from "./pages/Catdry_detail";
import Catmoistdetail from "./pages/Catmoist_detail";
import Kakaologin from "./pages/Kakaologin";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

export const StoreContext = React.createContext({});

function App() {
  const [loginUser, setLoginUser] = React.useState({});
  let [dogdry, setDogdry] = useState(Dogdrydata);
  let [dogmoist, setDogmoist] = useState(Dogmoistdata);
  let [catdry, setCatdry] = useState(Catdrydata);
  let [catmoist, setCatmoist] = useState(Catmoistdata);

  const session = async () => {
    await axios({
      url: "http://localhost:4000/user",
    }).then((res) => {
      setLoginUser(res.data);
    });
  };

  React.useEffect(() => {
    session();
  }, []);

  return (
    <StoreContext.Provider
      value={{
        loginUser: loginUser,
      }}
    >
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/join" element={<Join />} />
        <Route exact path="/" element={<Main />} />
        <Route exact path="/write" element={<Write />} />
        <Route exact path="/article/:seq" element={<Articlereply />} />
        <Route exact path="/sharing_article" element={<Sharingarticle />} />
        <Route
          exact
          path="http://localhost:3000/oauth/callback/kakao"
          element={<Kakaologin />}
        />
        <Route exact path="/dogdry" element={<Dogdry />} />
        <Route exact path="/dogmoist" element={<Dogmoist />} />
        <Route
          exact
          path="/dogdrydetail/:id"
          element={<Dogdrydetail dogdry={dogdry} />}
        />
        <Route
          exact
          path="/dogmoistdetail/:id"
          element={<Dogmoistdtail dogmoist={dogmoist} />}
        />
        <Route exact path="/catdry" element={<Catdry />} />
        <Route exact path="/catmoist" element={<Catmoist />} />

        <Route
          exact
          path="/catdrydetail/:id"
          element={<Catdrydetail catdry={catdry} />}
        />
        <Route
          exact
          path="/catmoistdetail/:id"
          element={<Catmoistdetail catmoist={catmoist} />}
        />
      </Routes>
    </StoreContext.Provider>
  );
}

export default App;
