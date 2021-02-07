import axios from "axios";
import React, { Component } from "react";
import "./ProfileView.css";
// git remote add origin https://github.com/Rishabhjain-code/instagram.git

class ProfileView extends Component {
  // local state
  // change it on did mount so the it can rerender acc to updated data
  state = {
    user: {
      handle: "ms@dhoni",
      name: "Mahendra Singh Dhoni",
      pImage: "image/default.png",
    },
    suggestions: [
      {
        id: 1,
        username: "@rogers",
        userImage: "image/suggestion.jpg",
        fullname: "Roger fedrar",
      },
      {
        id: 2,
        username: "steve",
        userImage: "image/suggestion2.jpg",
        fullname: "Steve Rogers",
      },
      {
        id: 3,
        username: "kohli@2",
        userImage: "image/suggestion3.jpg",
        fullname: "Kohli Rogers",
      },
      {
        id: 4,
        username: "king@kohli",
        userImage: "image/suggestion4.jpg",
        fullname: "Virat Kohli",
      },
    ],
  };

  componentDidMount() {
    let uid = "1327529f-fc1e-4f3f-b200-a2c9df65bbee";
    axios.get(`/user/${uid}`).then((userData) => {
      let user = userData.data.data;
      let newUser = {
        username : user.handle,
        fullname : user.name,
        userImage : user.pImage
      }
      this.setState({
        user: user,
      });
      console.log(user);
    });
  }

  render() {
    return (
      <div className="profile-view">
        {/* 
        took for making the inner div at center as it needs justify-content:center but that needs display flex if more than 1 div then it will create error thus took 1 more div */}
        <div className="profile-view-div">
          <div className="profile-view-user-details">
            <div className="profile-view-user-image">
              <img src={this.state.user.pImage} alt="" />
            </div>
            <div className="profile-view-user-names">
              <div className="profile-view-username">
                {this.state.user.handle}
              </div>
              <div className="profile-view-fullname">
                {this.state.user.name}
              </div>
            </div>
          </div>

          <div className="profile-view-all-suggestions">
            <div className="profile-view-heading">
              <h4>Suggestions</h4>
            </div>
            {this.state.suggestions.map((suggestion) => {
              return (
                <div
                  key={suggestion.id}
                  className="profile-view-suggestion-user"
                >
                  <div className="profile-view-user-image">
                    <img src={suggestion.userImage} alt="" />
                  </div>
                  <div className="profile-view-user-names">
                    <div className="profile-view-username">
                      {suggestion.username}
                    </div>
                    <div className="profile-view-fullname">
                      {suggestion.fullname}
                    </div>
                  </div>
                  <div className="profile-view-follow-button">
                    <button className="btn btn-primary">Follow</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileView;
