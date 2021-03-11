import React, { Component } from "react";
import "./Settings.css";
const axios = require("axios");
const uid = require("../../uid");

// function toggleDisabled() {
//   let currDisabled = this.state.disabled;
//   console.log(currDisabled);
//   let user = this.state.user;
//   console.log(user);
//   this.setState({
//     user: user,
//     disabled: !currDisabled,
//   });
// }

class Settings extends Component {
  state = {
    user: {
      uid: "",
      name: "",
      handle: "",
      email: "",
      bio: "",
      phone: "",
      is_public: "",
      is_verified: "",
      pImage: "",
    },
    disabled: true,
  };

  toggleDisabled = () => {
    let currDisabled = this.state.disabled;
    // console.log(currDisabled);
    let user = this.state.user;
    // console.log(user);
    this.setState({
      user: user,
      disabled: !currDisabled,
    });
  };

  //   updating the user and changing the state which calls on the render where it puts the value of input acc to the state at that moment thus updateable input
  onChangeHandler = (e) => {
    let user = this.state.user;
    let whichInput = e.target.id;
    //   console.log(e.target);//whole html element
    user[whichInput] = e.target.value;
    // console.log(user);
    let currDisabled = this.state.disabled;
    this.setState({
      user: user,
      disabled: currDisabled,
    });
  };

  changeImageHandler = () => {
    let newImage = document.querySelector("#new-image");
    newImage.click();
    setTimeout(() => {
      console.log(newImage.value);
    }, 4000);
  };

  //   took from db as state may have wrong value
  cancelHandler = () => {
    let user;
    axios.get(`/api/user/${uid}`).then((obj) => {
      //   console.log(obj);
      user = obj.data.data;
      let currDisabled = this.state.disabled;
      this.setState({
        user: user,
        disabled: currDisabled,
      });
    });
  };

  saveChanges = () => {
    let elem = this.fileInput.current;
    let fileObj = elem.files[0];
    // console.log(fileObj);
    let formData = new FormData();
    if (fileObj) {
      formData.append("user", fileObj);
    }
    formData.append("name", this.state.user.name);
    formData.append("handle", this.state.user.handle);
    formData.append("bio", this.state.user.bio);
    formData.append("email", this.state.user.email);
    formData.append("is_public", this.state.user.is_public);
    // console.log(formData)

    axios.patch(`api/user/${uid}`, formData).then((obj) => {
      // console.log(obj);
      this.componentDidMount();
    });
  };

  //   on edit disabled set to false thus can edit
  componentDidMount() {
    let user;
    axios.get(`/api/user/${uid}`).then((obj) => {
      //   console.log(obj);
      user = obj.data.data;
      // console.log(user);
      this.setState({
        user: user,
      });
    });
  }

  fileInput = React.createRef();

  render() {
    let {
      name,
      handle,
      bio,
      email,
      phone,
      pImage,
      uid,
      is_public,
    } = this.state.user;
    let disabled = this.state.disabled;
    return (
      <div className="settings">
        <div className="left">
          <div className="profile-image">
            {/* <img src="/images/user/default.jpeg" alt="user-image" /> */}
            <img src={pImage} alt="user-image" />
            {!disabled && (
              <input type="file" className="file-input" ref={this.fileInput} />
            )}
          </div>
        </div>
        <div className="right">
          <div className="right-details">
            <div className="name settings-input">
              <label htmlFor="">Name</label>
              <input
                id="name"
                type="text"
                value={name}
                disabled={disabled}
                onChange={this.onChangeHandler}
              />
            </div>
            <div className="handle settings-input">
              <label htmlFor="">Handle</label>
              <input
                id="handle"
                type="text"
                value={handle}
                disabled={disabled}
                onChange={this.onChangeHandler}
              />
            </div>
            <div className="email settings-input">
              <label htmlFor="">Email</label>
              <input
                id="email"
                type="text"
                value={email}
                disabled={disabled}
                onChange={this.onChangeHandler}
              />
            </div>
            <div className="password settings-input">
              <label htmlFor="">Password</label>
              <input
                id="password"
                type="text"
                value="*******"
                disabled={disabled}
                onChange={this.onChangeHandler}
              />
            </div>
            <div className="bio settings-input">
              <label htmlFor="">Bio</label>
              <input
                id="bio"
                type="text"
                value={bio}
                disabled={disabled}
                onChange={this.onChangeHandler}
              />
            </div>
            <div className="is-public settings-input">
              <label htmlFor="">Privacy - Account Type</label>
              {this.state.user.is_public == "1" && (
                <div className="options">
                  <select name="" id="" disabled={disabled}>
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                  </select>
                </div>
              )}
              {console.log(this.state.user)}
              {this.state.user.is_public == "0" && (
                <div className="options">
                  <select name="" id="" disabled={disabled}>
                    <option value="private">Private</option>
                    <option value="public">Public</option>
                  </select>
                </div>
              )}
            </div>
            <div className="actions">
              {disabled ? (
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    this.toggleDisabled();
                  }}
                >
                  Edit
                </button>
              ) : (
                <React.Fragment>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      this.toggleDisabled();
                      this.cancelHandler();
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      this.toggleDisabled();
                      this.saveChanges();
                    }}
                  >
                    Save
                  </button>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Settings;
