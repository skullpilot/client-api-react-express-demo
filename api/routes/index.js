var express = require("express");
var router = express.Router();
var fs = require("fs");

/* GET home page. */
router.get("/getUsers", async function (req, res, next) {
  fs.readFile("./data/users.json", function (err, data) {
    var dataStr = data.toString();
    let dataObj = JSON.parse(dataStr);
    res.json(dataObj);
  });
});

router.post("/add", async function (req, res, next) {
  fs.readFile("./data/users.json", function (err, data) {
    var dataStr = data.toString();
    let dataObj = JSON.parse(dataStr);
    dataObj.users.push(req.body);
    var newDataJSON = JSON.stringify(dataObj);
    fs.writeFile("./data/users.json", newDataJSON, function (err) {
      res.json(dataObj);
      console.log("add success");
    });
  });
});

router.post("/update", async function (req, res, next) {
  //console.log(req.body.id);
  fs.readFile("./data/users.json", function (err, data) {
    var dataStr = data.toString();
    let dataObj = JSON.parse(dataStr);
    //console.log(dataObj);
    for (let user of dataObj.users) {
      //console.log(obj.id);
      if (user.id === req.body.id) {
        console.log(user);
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.emailAdd = req.body.emailAdd;
      }
    }
    //console.log(dataObj);
    var newDataJSON = JSON.stringify(dataObj);
    fs.writeFile("./data/users.json", newDataJSON, function (err) {
      res.json(dataObj);
      console.log("update success");
    });
  });
});

router.post("/delete", async function (req, res, next) {
  fs.readFile("./data/users.json", function (err, data) {
    var dataStr = data.toString();
    let dataObj = JSON.parse(dataStr);
    console.log(req.body.id);
    //dataObj.users.push(req.body);
    for (let i = 0; i < dataObj.users.length; i++) {
      if (dataObj.users[i].id === req.body.id) {
        dataObj.users.splice(i, 1);
      }
    }
    var newDataJSON = JSON.stringify(dataObj);
    fs.writeFile("./data/users.json", newDataJSON, function (err) {
      res.json(dataObj);
      console.log("delete success");
    });
  });
});

module.exports = router;
