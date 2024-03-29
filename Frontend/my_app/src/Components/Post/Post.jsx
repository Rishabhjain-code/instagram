// import React from 'react';
import React, { Component } from "react";
import "./Post.css";
import axios from "axios";
import uid from "../../uid";
// git remote add origin https://github.com/Rishabhjain-code/instagram.git

// stateless functional components
// making it cc for working now

class Post extends Component {
  state = {
    user: {},
    username: "",
    userImage: "",
    postImage: "",
    caption: "",
    likes: 0,
    followedOrNot: false,
    requestedOrNot: false,
  };

  componentDidMount() {
    axios.get(`/api/user/${this.props.post.uid}`).then((obj) => {
      let user = obj.data.data;
      // console.log(user);
      this.setState({
        user: user,
        username: user.name,
        userImage: user.pImage,
        postImage: this.props.post.postImage,
        caption: this.props.post.caption,
      });
    });

    // this.setState({
    //     username : this.props.post.username,
    //     userImage : this.props.post.userImage,
    //     postImage : this.props.post.postImage,
    //     likes : this.props.post.likes,
    // })
  }

  sendRequest = (toWhom) => {
    let {
      user,
      username,
      userImage,
      postImage,
      caption,
      likes,
      followedOrNot,
      requestedOrNot,
    } = this.state;

    axios({
      method: "post",
      url: "/api/request",
      data: {
        user_id: uid,
        follow_id: toWhom,
      },
    }).then((obj) => {
      console.log(obj);
      if (obj.data.message == "Request sent and accepted !!") {
        followedOrNot = true;
      } else {
        requestedOrNot = true;
      }

      this.setState({
        user,
        username,
        userImage,
        postImage,
        caption,
        likes,
        followedOrNot,
        requestedOrNot,
      });
      // console.log(this.state);
    });
  };

  render() {
    return (
      <div className="post">
        <div className="post-username">
          <img src={this.state.userImage} alt="" />
          <div className="username">{this.state.username}</div>
          {this.state.user.uid != uid && (
            <button
              className="btn btn-primary follow-button"
              onClick={() => {
                this.sendRequest(this.props.post.uid);
              }}
            >
              {this.state.followedOrNot
                ? "Following"
                : this.state.requestedOrNot
                ? "Requested"
                : "Follow"}
            </button>
          )}
        </div>
        <div className="post-image">
          <img src={this.state.postImage} alt="" />
        </div>
        <div className="post-actions">
          <div className="like-icon">
            <i className="far fa-heart"></i>
          </div>
          <div className="comment-icon">
            <i className="fas fa-comments"></i>
          </div>
        </div>
        <div className="post-likes-count">{this.state.likes}</div>
        {/* post-comments can be staeful component */}
        <div className="post-comments-section">
          <strong>{this.state.username}</strong> {this.state.caption}
        </div>
        <div className="post-add-comment">
          <input type="text" placeholder="Add a comment.." name="" id="" />
          {/* <div contentEditable = "true" id="comment-input">Add a comment..</div> */}
          <button className="btn btn-success">Post</button>
        </div>
      </div>
    );
  }
}

// const Post = () => {
//     return (
//         <div className="post">
//             <div className="post uername">
//                 <img src="" alt=""/>
//                 <div className="username"></div>
//             </div>
//             <div className="post image">
//                 <img src="" alt=""/>
//             </div>
//             <div className="post actions">
//                 <div className="like-icon"></div>
//                 <div className="comment-icon"></div>
//             </div>
//             <div className="post likes-count">12 likes</div>
//             {/* post comments can be staeful component */}
//             <div className="post comments-section">Comments</div>
//             <div className="post add-comment">
//                 <input type="text" placeholder="Add a comment.." name="" id=""/>
//                 <button>Post</button>
//             </div>
//             Post is here
//         </div>
//      );
// }

export default Post;
