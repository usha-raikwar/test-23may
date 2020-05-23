import React, { useState } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import AuthRoute from "./AuthRoute";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import { AuthContext } from "./context/auth";

function App(props) {
  debugger;
  const existingTokens = localStorage.getItem("tokens");
  const [authTokens, setAuthTokens] = useState(existingTokens);

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  };

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router>
        <div>
          <ul>...</ul>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />

          <AuthRoute path="/admin" component={Admin} />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
