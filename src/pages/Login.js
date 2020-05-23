import React, { useState } from "react";
import fetch from "isomorphic-unfetch";
import { Link, Redirect } from "react-router-dom";
import { useAuth } from "../context/auth";
import {
  createStyles,
  makeStyles,
  Theme as theme,
} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import { FormHelperText } from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    "login-div": {
      backgroundColor: "azure",
      marginLeft: "30%",
      maxWidth: "600px",
      padding: "10px",
      border: "1px solid aquamarine",
      "& .login-form": {
        display: "flex",
        flexDirection: "column",
        maxWidth: "500px",
        padding: "100px",
        "& .MuiButton-root": {
          marginTop: "20px",
        },
      },
    },
    ".MuiFormControl-root": {
      margin: "10px",
    },

    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
  })
);

const Login = () => {
  debugger;
  const classes = useStyles();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthTokens } = useAuth();

  const postLogin = (name, password) => {
    debugger;
    if (name && password) {
      fetch("http://localhost:3001/api/auth", {
        method: "post",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name, password: password }),
        // body: { name: name, password: password },
      })
        .then((result) => {
          if (result.status === 200) {
            setAuthTokens(result.data);
            setLoggedIn(true);
          } else {
            setIsError(true);
          }
        })
        .catch((e) => {
          setIsError(true);
        });
    }
  };

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  const onSubmit = (userName, password) => {
    debugger;
    if (userName && password) {
      postLogin(userName, password);
    }
  };
  return (
    <>
      <div className={classes["login-div"]}>
        <Typography variant="h4" align="center">
          Login Form
        </Typography>
        <div className={"login-form"}>
          <TextField
            name={"name"}
            type={"text"}
            label={"Name"}
            value={userName}
            onCh
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          ></TextField>
          <TextField
            name={"password"}
            type={"password"}
            label={"Password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></TextField>
          {isError && (
            <FormHelperText>
              The username or password provided were incorrect!
            </FormHelperText>
          )}
          <Button
            variant="contained"
            onClick={() => {
              onSubmit(userName, password);
            }}
          >
            Submit
          </Button>
        </div>
      </div>
    </>
  );
};

export default Login;
