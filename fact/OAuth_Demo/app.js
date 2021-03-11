const express = require("express");
const app = express();
const port = 4000;
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const { CLIENT_ID, CLIENT_PSWD } = require("./config/credentails");
const connection = require("../../Backend/model/db");
/* NPM - A user session can be stored in two main ways with cookies: on the server or on the client. This module stores the session data on the client within a cookie, while a module like express-session stores only a session identifier on the client within a cookie and stores the session data on the server, typically in a database */
const cookie = require("cookie-session");

app.use(express.static("public"));
app.use(
  cookie({
    name: "session",
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: ["key1", "key2"],
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  console.log("inside serialzed user");
  console.log(user);
  // console.log(done);
  // now it calls the auth/callback ka callback function
  done(null, user);
});

passport.deserializeUser(function (data, done) {
  console.log("Inside deserialize user!!!");
  console.log(data);
  done(null, data);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: CLIENT_ID,
      clientSecret: CLIENT_PSWD,
      callbackURL: "http://localhost:4000/auth/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      //if user already in the db getDetails only otherwise createTheUser
      let { email, id, displayName, given_name, picture } = profile;
      // SELECT * FROM `user_table` WHERE email = "rjexpert.coding@gmail.com"
      // sql is case sensitive
      let sql = `SELECT * FROM user_table WHERE email = "${email}"`;
      console.log(sql);
      connection.query(sql, function (error, data) {
        if (error) {
          // console.log(error);
          done(error);
        } else {
          if (data.length) {
            // user pehle se h
            console.log("User already signed Up!!!");
            console.log(data[0]);
            done(null, data);
          } else {
            let is_verified = profile.verified ? 1 : 0;
            // by default private account and bio empty
            let insertSQL = `INSERT INTO user_table(uid, name, handle, email, bio, phone, is_public, is_verified, pImage) VALUES ("${id}","${displayName}","${email}","${email}","${given_name}","",0,"${is_verified}","${picture}")`;
            console.log(insertSQL);
            connection.query(insertSQL, function (error, data) {
              if (error) {
                // console.log(error);
                done(error);
              } else {
                console.log(data);
                console.log("User Successfully Created!!!");
                //created user then call to done with final details of user in the database
                connection.query(sql, function (error, data) {
                  if (error) {
                    done(error);
                  } else {
                    // data of user got
                    done(null, data[0]);
                  }
                });
              }
            });
          }
        }
      });
    }
  )
);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] }),
  function (req, res) {
    res.send("Google Consent Form");
  }
);

app.get("/auth/callback", passport.authenticate("google"), function (req, res) {
  console.log("Callback function ", req.user);
  res.send("Hello form callback");
});

// app.get("/auth/callback",function(res,res){
//     console.log("You are at the /auth/callback function");
//     res.send("Hello from callback");
// })

// PROFILE ROUTES only after logged in

// app.get("/profile", function (req, res) {
//   if (req.user) {
// user logged in
//     console.log(req.user);
//     res.send("User logged in!!! <br></br> Hi " + req.user[0].name);
//   } else {
//     res.redirect("/login");
//   }
// });

// profile view via middleWare
// NOTE WHEN COOKIE PRESENT STILL THE REQUEST WILL HAVE THE USERS
checkLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.send("You are not logged in!!!");
  }
};

app.get("/profile", checkLoggedIn, function (req, res) {
  res.send("Welcome to profile Page!!! " + req.user[0].name);
});

app.get("/login", function (req, res) {
  res.send("Please login first");
});

app.listen(port, function () {
  console.log(`App is listening at ${port}!!!`);
});
