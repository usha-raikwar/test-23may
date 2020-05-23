const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");
const data = require("./data");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.post("/api/auth", (req, res) => {
  debugger;
  let user = data.filter((user) => {
    return user.name == req.body.name && user.password == req.body.password;
  });
  if (user.length) {
    let token_payload = {
      name: user[0].name,
      password: user[0].password,
    };
    // create a token using user name and password vaild for 2 hours
    let token = jwt.sign(token_payload, "jwt_secret_password", {
      expiresIn: "2h",
    });
    let response = {
      message: "Token Created, Authentication Successful!",
      token: token,
    };

    // return the information including token as JSON
    return res.status(200).json(response);
  } else {
    return res.status("409").json("Authentication failed. admin not found.");
  }
});
let port = 3001;
app.listen(port);
console.log("api runnging on port " + port + ": ");
