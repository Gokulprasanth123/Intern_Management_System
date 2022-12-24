const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const PORT = 8000;
const adminEmail = "adminSoliton@gmail.com";
const adminPassword = "adminSoliton@123";
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/", express.static(__dirname));
app.post("/login", (req, res) => {
  var userData = fs.readFileSync("./scripts/userDetails.json");
  var objectFromJsonFile = JSON.parse(userData);
  if (req.body.email in objectFromJsonFile) {
    if (req.body.password === objectFromJsonFile[req.body.email].password) {
      res.json("welcome user");
    } else {
      res.json("wrong password");
    }
  } else if (req.body.email === adminEmail) {
    if (req.body.password === adminPassword) {
      res.json("welcome admin");
    } else {
      res.json("wrong password");
    }
  } else {
    res.json("email is incorrect");
  }
});

app.post("/signup", (req, res) => {
  var credentials = req.body;
  var userData = fs.readFileSync("./scripts/userDetails.json");
  var objectFromJsonFile = JSON.parse(userData);
  if (req.body.email in objectFromJsonFile) {
    res.json("email already exists");
  } else if (req.body.password !== req.body.confirmPassword) {
    res.json("password and confirm password didn't match");
  } else {
    objectFromJsonFile[req.body.email] = credentials;
    fs.writeFile(
      "./scripts/userDetails.json",
      JSON.stringify(objectFromJsonFile),
      (err) => {
        if (err) {
          res.json("error");
        } else {
          res.json("success");
        }
      }
    );
  }
});

app.post("/getTasks", (req, res) => {
  var userData1 = fs.readFileSync("./scripts/userDetails.json");
  // fs.readFile
  var objectFromJsonFile = JSON.parse(userData1);
  res.json(objectFromJsonFile);
});

app.post("/updateCompletionTime", (req, res) => {
  var credentials = req.body;
  var userData = fs.readFileSync("./scripts/userDetails.json");
  var objectFromJsonFile = JSON.parse(userData);
  objectFromJsonFile[req.body.email].tasks[req.body.taskId].completionTime =
    req.body.time;
  fs.writeFile(
    "./scripts/userDetails.json",
    JSON.stringify(objectFromJsonFile),
    (err) => {
      if (err) {
        res.json("error");
      } else {
        res.json("success");
      }
    }
  );
});
app.post("/addTask", (req, res) => {
  var credentials = req.body;
  var userData = fs.readFileSync("./scripts/userDetails.json");
  var objectFromJsonFile = JSON.parse(userData);
  if (objectFromJsonFile[credentials.email].tasks) {
    objectFromJsonFile[credentials.email].tasks[
      objectFromJsonFile[credentials.email].tasks.length
    ] = credentials;
  } else {
    objectFromJsonFile[credentials.email].tasks = [];
    objectFromJsonFile[credentials.email].tasks[0] = credentials;
  }
  fs.writeFile(
    "./scripts/userDetails.json",
    JSON.stringify(objectFromJsonFile),
    (err) => {
      if (err) {
        res.json("error");
      } else {
        res.json("success");
      }
    }
  );
});

app.post("/updateStatus", (req, res) => {
  var credentials = req.body;
  var userData = fs.readFileSync("./scripts/userDetails.json");
  var objectFromJsonFile = JSON.parse(userData);
  objectFromJsonFile[credentials.email].tasks[credentials.taskId].status =
    req.body.status;
  fs.writeFile(
    "./scripts/userDetails.json",
    JSON.stringify(objectFromJsonFile),
    (err) => {
      if (err) {
        res.json("error");
      }
    }
  );
  res.json("success");
});

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log("the server is running in port" + PORT);
});
