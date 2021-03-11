import React, { Component } from "react";
import "./Login.css";

class Login extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="login-page">
          <div className="login-logo">
            <img src="image/linkedin_profile_image.png" alt="" />
          </div>
          <div className="credentials">
            <div className="login-email">
              Email
              <input type="text" className="login-email-input" />
            </div>
            <div className="login-password">
              Password
              <input type="text" className="login-password-input" />
            </div>
          </div>
          <div className="oauth-login">
            <button className="btn btn-dark" onClick={this.props.handleLogin}>
              Login with Google
            </button>
          </div>
          <div className="login-button">
            <button className="btn btn-primary">Login</button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
