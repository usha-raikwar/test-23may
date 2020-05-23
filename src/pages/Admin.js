import React from "react";
import { Button } from "@material-ui/core";
// import { Redirect } from "react-router-dom";

const Admin = (props) => {
  const logout = () => {
    localStorage.removeItem("x-access-token");
    // <Redirect to="/" />;
  };
  return (
    <>
      <div>Admin Page</div>
      <Button onClick={logout}>Log out</Button>
    </>
  );
};

export default Admin;
