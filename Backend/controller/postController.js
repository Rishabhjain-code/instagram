const connection = require("../model/db");
const { v4: uuidv4 } = require("uuid");

/* CREATE TABLE post_table(
	uid varchar(255) not null,
  	pid varchar(255) PRIMARY KEY,
	postImage varchar(255) not null unique,
    caption varchar(255),
); 



Set a date in MySQL using DATETIME
Using DATETIME you can store both the date and the time. Its format is YYYY-MM-DD HH:mm:SS. Using this statement you can store the output for both DATE and TIME statements.

created_on date not null =>created_on datetime not null

ALTER TABLE post_table
MODIFY COLUMN created_on DATETIME;

*/

function getAllPosts(req, res) {
  const sql = `SELECT * FROM post_table`;
  connection.query(sql, function (error, data) {
    if (error) {
      res.json({
        message: "Failed To get all posts",
        error,
      });
    } else {
      res.status(200).json({
        message: "got all posts !!",
        data,
      });
    }
  });
}

//getPostsByUserId actually
function getPostById(req, res) {
  const uid = req.params.uid;
  const sql = `SELECT * FROM post_table WHERE uid = '${uid}' `;
  // console.log(sql);
  connection.query(sql, function (error, data) {
    if (error) {
      res.json({
        message: "failed to get post !",
        error,
      });
    } else {
      if (data.length) {
        res.status(200).json({
          message: "Got All posts by uid",
          data,
        });
      } else {
        res.status(200).json({
          message: "No post FOUND !!!",
        });
      }
    }
  });
}

function updatePostById(req, res) {
  const { caption, pid } = req.body;
  let sql = `UPDATE post_table SET caption = '${caption}' WHERE pid = '${pid}'`;
  // UPDATE post_table SET caption = "" WHERE pid=""
  connection.query(sql, function (error, data) {
    if (error) {
      res.json({
        message: "Failed to update",
        error,
      });
    } else {
      res.status(201).json({
        message: "updated post !!",
        data,
      });
    }
  });
}

function deletePostById(req, res) {
  const pid = req.params.pid;
  const sql = `DELETE FROM post_table WHERE pid='${pid}' `;
  connection.query(sql, function (error, data) {
    if (error) {
      res.json({
        error,
      });
    } else {
      if (data.affectedRows) {
        res.status(201).json({
          message: "Deleted post !!",
          data,
        });
      } else {
        res.json({
          message: "No post Found !",
        });
      }
    }
  });
}

// making sql queries is a async and time consuming work thus we create promises and move ahead only when it got fullfilled as we used the await thing
// USE OF PROMISE IS JUST FOR WHEN WORK FULFILLED THEN CAN GO ON .THEN AS IT HAS ERROR OR FURTHER PROCESSING INSTRUCTIONS
// CAN DO IT ON SAME VIA CALLBACKS PUTTING PROMISE KA .THEN WORK INSIDE THE CALLBACK FUNCTIONS BUT FOR CLARITY WE USE THE PROMISES(TO AVOID CALL BACK HELLS)

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

// console.log(formatDate("Sun May 11,2014"));

function createPostPromisified(postObject) {
  return new Promise(function (resolve, reject) {
    // console.log("inside creaetePost Promisified");
    const { pid, uid, postImage, caption } = postObject;
    let createdOn = new Date();
    // console.log(createdOn);
    createdOn = createdOn.toString();
    // console.log(createdOn);
    createdOn = createdOn.substring(4, 24);
    createdOnDate = createdOn.substring(0, 11);
    createdOnTime = createdOn.substring(12);
    // console.log(createdOnDate + "," + createdOnTime);
    createdOnDate = formatDate(createdOnDate);
    createdOn = createdOnDate + " " + createdOnTime;
    // console.log(createdOn);
    let sql = `INSERT INTO post_table(pid , uid , postImage , caption , created_on ) VALUES ( '${pid}' , '${uid}' , '${postImage}' , '${caption}' , '${createdOn}')`;
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

async function createPost(req, res) {
  try {
    // console.log("Hello inside create post");
    const pid = uuidv4();
    let postImage = req.file.destination + "/" + req.file.filename;
    postImage = postImage.substring(7);
    const { uid, caption } = req.body;
    //createdOn?
    let postObject = {
      pid,
      uid,
      caption,
      postImage,
    };
    // console.log(postObject);
    let data = await createPostPromisified(postObject);
    // RESOLVE PART IN PROMISE IS BELOW
    res.status(200).json({
      message: "post Created Succssfully !!!",
      data,
    });
  } catch (error) {
    // REJECT PART IN PROMISE IS BELOW
    res.json({
      message: "Failed to create a post !",
      error,
    });
  }
}

module.exports.getAllPosts = getAllPosts;
module.exports.getPostById = getPostById;
module.exports.updatePostById = updatePostById;
module.exports.deletePostById = deletePostById;
module.exports.createPost = createPost;
