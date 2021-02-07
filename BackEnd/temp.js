const express = require("express");
const { v4: uuidv4 } = require("uuid");
const users = require("./db/users.json");
const fs = require("fs");

const app = express();
// write logic in app.js/api/backend

// to see data came in req.body
app.use(express.json());

app.listen(3000, function () {
    console.log("Hello");
})

app.get("/", function (req, res) {
    res.send("Landed on page");
})


// https://www.w3schools.com/tags/ref_httpmethods.asp
// to request data from a specified resource
app.get("/home", function (req, res) {
    res.send("You visited Home Page");
});

//send data
app.post("/user", function (req, res) {
    //work on db
    let uid = uuidv4();
    let newUser = req.body;
    console.log(newUser);
    console.log(req.body);
    newUser.uid = uid;
    users.push(newUser);
    fs.writeFileSync("./db/users.json", JSON.stringify(users));

    // send a response
    res.json({
        message: "Added a user successfully",
        user: newUser
    });
})

// get all users
app.get("/user", function (req, res) {
    if (users.length == 0) {
        res.json({
            "message": "Users not found!",
        })
    } else {
        res.json({
            "message": "all users got successfully",
            "data": users
        })
    }
})

//get user by id

// all between this and next slash recieved in uid and received in req.params
app.get("/user/:uid", function (req, res) {
    let uid = req.params.uid;
    let userNeeded = users.filter(function (ele) {
        return ele.uid == uid;
    })

    if (userNeeded.length == 0) {
        res.json({
            "message": "User not found"
        })
    } else {
        res.json({
            message: "got a user",
            user: userNeeded[0]
        })
    }
})

// update by id - update those details send in form of json
app.patch("/user/:uid", function (req, res) {
    let uid = req.params.uid;
    let userUpdate = req.body;

    let UserToBeUpdated = users.filter(function (ele) {
        return ele.uid == uid;
    })[0];

    for (key in userUpdate) {
        UserToBeUpdated[key] = userUpdate[key];
    }
    fs.writeFileSync("./db/users.json", JSON.stringify(users));
    res.json({
        "message": "User update successful",
        "data": UserToBeUpdated
    });
})

// delete by id
app.delete("/user/:uid", function (req, res) {
    let uid = req.params.uid;
    let userToBeDeleted = users.filter(function (ele) {
        return ele.uid == uid;
    })

    let filteredUsers = users.filter(function (ele) {
        return ele.uid != uid;
    })

    if (filteredUsers.length == users.length) {
        res.json({
            "message": "User not found"
        })
    } else {
        fs.writeFileSync("./db/users.json", JSON.stringify(filteredUsers));
        res.json({
            "message": "User deleted Successfully",
            "data": userToBeDeleted[0],
            "d": "1234"
        })
    }
})