const express = require("express");
const { v4: uuidv4 } = require("uuid");
const connection = require("./db/connection");
const cors = require("cors");

//everything imported will run on running the app.js
// rmemeber to import and export the connection.js
// .json no need to export just import

const app = express();
// write logic in app.js/api/backend

// to see what comes in req.file/req.files otherwise undefined is printed
const multer = require("multer");
// to see data came in req.body
app.use(express.json());

// to allow cross origin request to the port where server is listening
app.use(cors());

app.listen(3000, function () {
  console.log("Hello");
});

app.get("/", function (req, res) {
  res.send("Landed on page");
});

// https://www.w3schools.com/tags/ref_httpmethods.asp
// to request data from a specified resource
app.get("/home", function (req, res) {
  res.send("You visited Home Page");
});

/* SQL is just a query language; it is not a database. To perform SQL queries, you need to install any database, for example, Oracle, MySQL, MongoDB, PostGre SQL, SQL Server, DB2, etc. */

/* CREATE TABLE user_table(
    uid varchar(255) PRIMARY KEY,
    name varchar(255) NOT NULL,
    handle varchar(255) not null unique,
    email varchar(255) not null unique,
    bio varchar(255),
    phone varchar(255) not null unique,
    is_public boolean default true,
    is_verified boolean default false
); 
*/

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/user");
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}.jpg`);
  },
});

function fileFilter(req, file, cb) {
  // The function should call `cb` with a boolean
  // to indicate if the file should be accepted

  // To accept the file pass `true`, like so:
  if (file.mimeType.includes("image")) {
    cb(null, true)
  }
  // To reject this file pass `false`, like so:
  else {
    cb(new Error('Invalid image type'), false)
  }

}

const upload = multer({ storage: storage, fileFilter: fileFilter });

function createUser(newUser) {
  return new Promise((resolve, reject) => {
    // console.log(newUser);
    let uid = newUser.uid;
    let name = newUser.name;
    let handle = newUser.handle;
    let email = newUser.email;
    let bio = newUser.bio;
    let phone = newUser.phone;
    let is_public = newUser.is_public;
    let pImage = `/user/${newUser.pImage}`;
    // console.log(uid, name, email, handle, bio, phone, is_public);

    let sql = `INSERT INTO user_table(uid,name,handle,email,bio,phone,is_public,pImage) VALUES ("${uid}","${name}","${handle}","${email}","${bio}","${phone}",${is_public},"${pImage}")`;
    // every thing in string as used varchar, boolean as it is
    // boolean got converted to tinytext(binary) i.e 1/0 thus pass it with no brackets
    // console.log(sql);

    connection.query(sql, function (error, data) {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

//send data
app.post("/user", upload.single("pImage"), async function (req, res) {
  try {
    let uid = uuidv4();
    let newUser = req.body; //text sent from the body received here
    newUser.uid = uid;
    // console.log(req.file); //file appear here
    newUser.pImage = req.file.filename; //print re.file to the the path

    let data = await createUser(newUser);
    // async function due to sql thus use await and async

    res.json({
      message: "Added a user successfully",
      data: data,
    });
  } catch (err) {
    res.json({
      message: "User not created",
      error: err,
    });
  }
});

function getAllUsers() {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM user_table`;
    // * for all details of that row where uid == "1327529f-fc1e-4f3f-b200-a2c9df65bbee"
    connection.query(sql, function (error, data) {
      if (error) reject(error);
      else resolve(data);
    });
  });
}

// get all users
app.get("/user", async function (req, res) {
  try {
    let data = await getAllUsers();
    // console.log(data);
    //got via sql in form of row Data Packets
    res.json({
      message: "Got All Users Successfully",
      data: data,
    });
  } catch (error) {
    res.json({
      message: "All users get failed",
      error: error,
    });
  }
});

//get user by id
function getUserById(uid) {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM user_table where uid = "${uid}"`;
    // * for all details of that row where uid == "1327529f-fc1e-4f3f-b200-a2c9df65bbee"
    connection.query(sql, function (error, data) {
      if (error) reject(error);
      else resolve(data[0]);
    });
  });
}

// all between this and next slash recieved in uid and received in req.params
app.get("/user/:uid", async function (req, res) {
  try {
    let uid = req.params.uid;
    // async function due to networking work thus use async and await
    let data = await getUserById(uid);
    // if id not present it returns the data empty form

    //data has array as it select all occurences
    // console.log(data);
    res.json({
      message: "Get by id successfull",
      data: data,
    });
  } catch (error) {
    res.json({
      message: "Get by Id unsuccessful",
      error: error,
    });
  }
});

// update by id - update those details send in form of json

function updateById(uid, newDetails) {
  return new Promise((resolve, reject) => {
    let appendString = "";
    for (key in newDetails) {
      appendString += key;
      appendString += "=";
      appendString += `"${newDetails[key]}" ,`;
    }
    appendString = appendString.substring(0, appendString.length - 1);
    let sql = `UPDATE user_table SET ${appendString} where uid = "${uid}"`;
    console.log(sql);
    // UPDATE user_table SET handle="wanda@123456" where uid = "53d4efe9-0967-40c3-9574-f4f97cab3dbf"
    connection.query(sql, function (error, data) {
      if (error) reject(error);
      else resolve(data);
    });
  });
}

app.patch("/user/:uid", upload.single("pImage"), async function (req, res) {
  try {
    let uid = req.params.uid;
    let userUpdate = req.body;
    let pImage = req.file.filename;
    // the name by which photo uploaded in form-data cames in req.file.filename
    // console.log(req.file);
    userUpdate.pImage = pImage;
    let data = await updateById(uid, userUpdate);
    res.json({
      message: "Update By Id Successful",
      data: data,
    });
  } catch (error) {
    res.json({
      message: "Update By Id unsuccessful",
      error: error,
    });
  }
});

// delete by id

function deleteById(uid) {
  return new Promise((resolve, reject) => {
    let sql = `DELETE FROM user_table where uid = "${uid}"`;
    connection.query(sql, function (error, data) {
      if (error) reject(error);
      else resolve(data);
    });
  });
}

app.delete("/user/:uid", async function (req, res) {
  try {
    let uid = req.params.uid;
    let data = await deleteById(uid);
    res.json({
      message: "Delete By Id successfully",
      data: data,
    });
  } catch (error) {
    res.json({
      message: "Delete By Id unsuccessful",
      error: error,
    });
  }
});

// requests - send,accept,pending + following users , followers_users counts,display

// post method - sent request --> public account or private

function addInFollowingTable(user_id, following_id, is_accepted) {
  return new Promise((resolve, reject) => {
    let sql = `INSERT INTO user_following(user_id, following_id, is_accepted) VALUES ("${user_id}","${following_id}",${is_accepted})`;
    connection.query(sql, function (error, data) {
      if (error) reject(error);
      else resolve(data);
    });
  });
}

function addInFollowerTable(user_id, followed_by_id) {
  return new Promise((resolve, reject) => {
    let sql = `INSERT INTO user_follower(user_id, follower_id) VALUES ("${user_id}","${followed_by_id}")`;
    connection.query(sql, function (error, data) {
      if (error) reject(error);
      else resolve(data);
    });
  });
}

app.post("/user/request", async function (req, res) {
  try {
    let { user_id, follow_id } = req.body;
    // object destructuring
    // vars with same name as keys specified and assigned to repective values

    // console.log("user_id", user_id);
    // console.log("follow_id", follow_id);

    // let user = getUserById(user_id);
    let follow = await getUserById(follow_id);
    // console.log(follow);
    // console.log(follow.name + " " + follow.is_public);
    if (follow.is_public == true) {
      let fingD = await addInFollowingTable(user_id, follow_id, true);
      let foloD = await addInFollowerTable(follow_id, user_id);
      res.json({
        message: "Request Sent and Accepted Successfully",
        data: [fingD, foloD],
      });
    } else {
      let fingD = await addInFollowingTable(user_id, follow_id, false);
      res.json({
        message: "Request Sent and pending",
        data: fingD,
      });
    }
  } catch (error) {
    res.json({
      message: "cannot sent request",
      error: error,
    });
  }
});

// ACCEPT REQUEST

function updateFollowing(user_id, following_id) {
  return new Promise((resolve, reject) => {
    let sql = `UPDATE user_following SET is_accepted=true WHERE user_id="${user_id}" AND following_id="${following_id}"`;
    connection.query(sql, function (error, data) {
      if (error) reject(error);
      else resolve(data);
    });
  });
}

function addFollower(user_id, follower_id) {
  return new Promise((resolve, reject) => {
    let sql = `INSERT INTO user_follower(user_id, follower_id) VALUES ("${user_id}","${follower_id}")`;
    connection.query(sql, function (error, data) {
      if (error) reject(error);
      else resolve(data);
    });
  });
}

app.post("/user/request/accept", async function (req, res) {
  try {
    let { user_id, accept_id } = req.body;
    let updateData = await updateFollowing(accept_id, user_id);
    let addData = await addFollower(user_id, accept_id);
    res.json({
      message: "Request Accepted Successfully",
      data: [updateData, addData],
    });
  } catch (error) {
    res.json({
      message: "Cannot accept Request",
      error: error,
    });
  }
});

// cancel request before accepting

function removeFromFollowingTable(user_id, following_id) {
  return new Promise((resolve, reject) => {
    let sql = `DELETE from user_following where user_id = "${user_id}" AND following_id = "${following_id}"`;
    connection.query(sql, function (error, data) {
      if (error) reject(error);
      else resolve(data);
    });
  });
}

app.post("/user/request/cancel", async function (req, res) {
  try {
    let { user_id, cancel_id } = req.body;
    let cancelData = await removeFromFollowingTable(user_id, cancel_id);
    res.json({
      message: "Canceled request Successfully",
      data: cancelData,
    });
  } catch (error) {
    res.json({
      message: "Cannot cancel request",
      error: error,
    });
  }
});

// see pending request

function getAllPendingIds(user_id) {
  return new Promise((resolve, reject) => {
    let sql = `SELECT user_id from user_following where following_id = "${user_id}" AND is_accepted=false`;
    // console.log(sql);
    connection.query(sql, function (error, data) {
      if (error) reject(error);
      else resolve(data);
    });
  });
}

app.get("/user/request/pending/:uid", async function (req, res) {
  try {
    let uid = req.params.uid;
    let data = await getAllPendingIds(uid); //uid of all the pending requests
    // console.log(data);
    let userData = [];
    for (let i = 0; i < data.length; i++) {
      // let ui = data[i][user_id]; //not working
      let user_id = data[i].user_id;
      let cd = await getUserById(user_id);
      userData.push(cd);
    }
    res.json({
      message: "Get Pending Successfully",
      data: userData,
    });
  } catch (error) {
    res.json({
      message: "Pending Request Not get!!",
      error: error,
    });
  }
});

// unfollow (one sided)

function removeFromFollowerTable(user_id, follower_id) {
  return new Promise((resolve, reject) => {
    let sql = `DELETE from user_follower where user_id = "${user_id}" AND follower_id = "${follower_id}"`;
    connection.query(sql, function (error, data) {
      if (error) reject(error);
      else resolve(data);
    });
  });
}

app.post("/user/request/unfollow", async function (req, res) {
  try {
    let { user_id, unfollow_id } = req.body;
    let flingD = await removeFromFollowingTable(user_id, unfollow_id);
    let foloD = await removeFromFollowerTable(unfollow_id, user_id);
    res.json({
      message: "Successfully Unfollowed",
      data: { flingD, foloD },
    });
  } catch (error) {
    res.json({
      message: "Cannot Unfollow",
      error: error,
    });
  }
});

// remove from followers list
app.post("/user/requet/removefollower", async function (req, res) {
  try {
    let { user_id, removeFollower_id } = req.body;
    let followerData = await removeFromFollowerTable(
      user_id,
      removeFollower_id
    );
    let followingData = await removeFromFollowingTable(
      removeFollower_id,
      user_id
    );
    res.json({
      message: "SuccressFully remove follower",
      data: [followerData, followingData],
    });
  } catch (error) {
    res.json({
      message: "Cannot remove follower",
      error: error,
    });
  }
});

// following Count
// how many I am following or kitni jagah in user_following I have myid in place of user_id

function getFollowingIds(user_id) {
  return new Promise((resolve, reject) => {
    let sql = `SELECT following_id from user_following where user_id = "${user_id}" AND is_accepted = true`;
    connection.query(sql, function (error, data) {
      if (error) reject(error);
      else resolve(data);
    });
  });
}

app.get("/user/request/following/:uid", async function (req, res) {
  try {
    let { uid } = req.params;
    let data = await getFollowingIds(uid);
    // console.log(data);
    let userData = [];
    for (let i = 0; i < data.length; i++) {
      let cu = await getUserById(data[i].following_id);
      userData.push(cu);
    }

    res.json({
      message: "Get Following Count Successful",
      data: userData,
    });
  } catch (error) {
    res.json({
      message: "Cannot get following Count for given User",
      error: error,
    });
  }
});

// follower Count
// how many I am being followed or kitni jagah in user_follower I have myid in place of user_id

function getFollowerIds(user_id) {
  return new Promise((resolve, reject) => {
    let sql = `SELECT follower_id from user_follower where user_id = "${user_id}"`;
    connection.query(sql, function (error, data) {
      if (error) reject(error);
      else resolve(data);
    });
  });
}

app.get("/user/request/follower/:uid", async function (req, res) {
  try {
    let { uid } = req.params;
    let data = await getFollowerIds(uid);
    // console.log(data);
    let userData = [];
    for (let i = 0; i < data.length; i++) {
      let cu = await getUserById(data[i].follower_id);
      userData.push(cu);
    }

    res.json({
      message: "Get Follower Count Successful",
      data: userData,
    });
  } catch (error) {
    res.json({
      message: "Cannot get followers Count for given User",
      error: error,
    });
  }
});

// image upload

// TEST REQUESTS TO SHOW HOW TO RECEVIE AND HANDLE THE IMAGE

// upload.single('avatar') to see the file/files
// data send via body => form-data => file

// app.post("/image", upload.single("profile"), function (req, res) {
//   console.log(req.body);
//   console.log(req.file);
//   console.log(req.files);

//   res.json({
//     message: "Received Image Successfully!",
//   });
// });
