import "./App.css";
import React, { Component } from "react";
import NavBar from "./Components/NavBar/NavBar.jsx";
import Feeds from "./Components/Feeds/Feeds.jsx";
import ProfileView from "./Components/ProfileView/ProfileView";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Settings from "./Components/Settings/Settings";
import Profile from "./Components/Profile/Profile";
import Login from "./Components/Login/Login";

class App extends Component {
  state = {
    isAuth: true,
  };

  handleLogout = () => {
    this.setState({
      isAuth: false,
    });
  };

  handleLogin = () => {
    this.setState({
      isAuth: true,
    });
  };

  render() {
    return (
      <Router>
        <React.Fragment>
          {/* navabar is displayed always others only at the selected Route Path*/}
          <NavBar isAuth={this.state.isAuth} handleLogout={this.handleLogout} />
          <Route path="/" exact>
            {this.state.isAuth ? (
              <div className="home-view">
                <Feeds></Feeds>
                {/* feeds and profile view componenets flexed view*/}
                <ProfileView></ProfileView>
              </div>
            ) : (
              <Redirect to="/login"></Redirect>
            )}
          </Route>

          <Route path="/profile" exact>
            {this.state.isAuth ? (
              <Profile />
            ) : (
              <Redirect to="/login"></Redirect>
            )}
          </Route>

          <Route path="/settings" exact>
            {this.state.isAuth ? (
              <Settings />
            ) : (
              <Redirect to="/login"></Redirect>
            )}
          </Route>

          <Route path="/login" exact>
            {this.state.isAuth ? (
              <Redirect to="/"></Redirect>
            ) : (
              <Login handleLogin={this.handleLogin} />
            )}
          </Route>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
