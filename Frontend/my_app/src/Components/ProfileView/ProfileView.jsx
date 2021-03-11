import axios from "axios";
import React, { Component } from "react";
import uid from "../../uid";
import "./ProfileView.css";
// git remote add origin https://github.com/Rishabhjain-code/instagram.git

class ProfileView extends Component {
  // local state
  // change it on did mount so the it can rerender acc to updated data
  state = {
    user: {
      // our db has handle current have username thus he let it as it is but I changed change everywhere he writes username accordingly where he took data from backend
      handle: "",
      name: "",
      pImage: "",
    },
    suggestions: [{}],
  };

  componentDidMount() {
    // eqv to https:localhost:3000/api/user/uid as written proxy in package.json of frontend
    let user;
    axios
      .get(`api/user/${uid}`)
      .then((userData) => {
        // console.log(userData);
        user = userData.data.data;
        // console.log("User",user);
      })
      .then(() => {
        return axios.get(`api/request/suggestions/${uid}`);
      })
      .then((obj) => {
        // console.log(obj);
        let suggestions = obj.data.suggestions;
        suggestions.map((suggestion)=>{
          suggestion.isFollowed = false;
        })
        this.setState({
          user: user,
          suggestions: suggestions,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //  PROFILE VIEW K FOLLOW BUTTON KA KAM

  // sendRequest = (toWhom) => {
  //   let {
  //     user,suggestions
  //   } = this.state;

  //   axios({
  //     method: "post",
  //     url: "/api/request",
  //     data: {
  //       user_id: uid,
  //       follow_id: toWhom,
  //     },
  //   }).then((obj) => {
  //     // console.log(obj);
  //     if (obj.data.message == "Request sent and accepted !!") {
  //       for(let i=0;i<suggestions.length;i++){
  //         if(suggestions[i])
  //       }
  //     } else {
  //       requestedOrNot = true;
  //     }

  //     this.setState({
  //       username,
  //       userImage,
  //       postImage,
  //       caption,
  //       likes,
  //       followedOrNot,
  //       requestedOrNot,
  //     });
  //     // console.log(this.state);
  //   });
  // };

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
                  // key={suggestion.id}
                  className="profile-view-suggestion-user"
                >
                  <div className="profile-view-user-image">
                    <img src={suggestion.pImage} alt="" />
                  </div>
                  <div className="profile-view-user-names">
                    <div className="profile-view-username">
                      {suggestion.handle}
                    </div>
                    <div className="profile-view-fullname">
                      {suggestion.name}
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
