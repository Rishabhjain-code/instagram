const connection = require("../model/db");
const { v4: uuidv4 } = require("uuid");

function getAllUsers(req, res) {
  const sql = `SELECT * FROM user_table`;
  connection.query(sql, function (error, data) {
    if (error) {
      res.json({
        message: "Failed To get all users",
        error,
      });
    } else {
      res.status(200).json({
        message: "got all users !!",
        data,
      });
    }
  });
}

function getUserByIdPromisified(uid) {
  return new Promise(function (resolve, reject) {
    const sql = `SELECT * FROM user_table WHERE uid = '${uid}' `;
    connection.query(sql, function (error, data) {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

async function getUserById(req, res) {
  try {
    const uid = req.params.uid;
    // console.log(uid);
    let data = await getUserByIdPromisified(uid);
    if (data.length) {
      res.status(200).json({
        message: "Got user by id",
        data: data[0],
      });
    } else {
      res.status(200).json({
        message: "No User FOUND !!!",
      });
    }
  } catch (error) {
    res.json({
      message: "Failed to get User !",
      error,
    });
  }
}

// working from body=>raw in req
// not from body=>form-data in req
function updateUserById(req, res) {
  console.log(req.body);
  const uid = req.params.uid;
  const updateObject = req.body;
  // console.log(updateObject);
  let sql = `UPDATE user_table SET `;
  for (key in updateObject) {
    sql += `${key} = '${updateObject[key]}',`;
  }
  // sql = sql.substring(0, sql.length - 1);
  if (req.file) {
    let pImage = (req.file.destination + "/" + req.file.filename).substr(7);
    sql += `pImage = "${pImage}"`;
  } else {
    sql = sql.substring(0, sql.length - 1);
  }
  sql += ` WHERE uid = '${uid}'`;
  // console.log(sql);
  // console.log(sql);
  // UPDATE user_table
  // SET "name"="IRON MAN" "bio":"I am billionaire"
  // WHERE uid = '1313131'
  // const sql ???
  connection.query(sql, function (error, data) {
    if (error) {
      res.json({
        message: "Failed to update",
        error,
      });
    } else {
      res.status(201).json({
        message: "updated user !!",
        data,
      });
    }
  });
}
function deleteUserById(req, res) {
  const uid = req.params.uid;
  const sql = `DELETE FROM user_table WHERE uid='${uid}' `;
  connection.query(sql, function (error, data) {
    if (error) {
      res.json({
        error,
      });
    } else {
      if (data.affectedRows) {
        res.status(201).json({
          message: "Deleted user !!",
          data,
        });
      } else {
        res.json({
          message: "No user Found !",
        });
      }
    }
  });
}
function createUserPromisified(userObject) {
  return new Promise(function (resolve, reject) {
    const {
      uid,
      name,
      handle,
      email,
      bio,
      phone,
      is_public,
      is_verifed,
      pImage,
    } = userObject;
    let sql;
    if (is_public != undefined) {
      let defaultPImage = "images/user/default.jpeg";
      sql = `INSERT INTO user_table(uid , name ,handle, email , bio ,phone, is_public ,is_verified, pImage) VALUES ( '${uid}' , '${name}' ,'${handle}', '${email}' , '${bio}' , '${phone}',${is_public} ,'${
        is_verifed ? is_verifed : 0
      }','${pImage ? pImage : defaultPImage}')`;
    } else {
      sql = `INSERT INTO user_table(uid , name , handle,email , bio ,phone,is_verified,pImage) VALUES ( '${uid}' , '${name}' ,'${handle}' , '${email}' , '${bio}','${phone}','${
        is_verifed ? is_verifed : 0
      }' ,'${pImage ? pImage : "images/user/default.jpeg"}')`;
    }
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
async function createUser(req, res) {
  try {
    const uid = uuidv4();
    const { name, handle, email, bio, phone, is_public, is_verifed } = req.body;
    let userObject = {
      uid,
      name,
      handle,
      email,
      bio,
      phone,
      is_public,
      is_verifed,
    };
    if (req.file) {
      let pImage = (req.file.destination + "/" + req.file.filename).substr(7);
      userObject.pImage = pImage;
    }
    let data = await createUserPromisified(userObject);
    res.status(200).json({
      message: "User Created Succssfully !!!",
      data,
    });
  } catch (error) {
    res.json({
      message: "Failed to create a user !",
      error,
    });
  }
}

module.exports.getAllUsers = getAllUsers;
module.exports.getUserById = getUserById;
module.exports.updateUserById = updateUserById;
module.exports.deleteUserById = deleteUserById;
module.exports.createUser = createUser;

module.exports.getUserByIdPromisified = getUserByIdPromisified;
