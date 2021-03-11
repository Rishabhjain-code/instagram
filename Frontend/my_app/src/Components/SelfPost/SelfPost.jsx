// import React from 'react';
import React, { Component } from "react";
import "./SelfPost.css";
import axios from "axios";
// git remote add origin https://github.com/Rishabhjain-code/instagram.git

// stateless functional components
// making it cc for working now

class SelfPost extends Component {
  state = {
    username: "Mahendra Singh Dhoni",
    userImage: "image/default.png",
    postImage: "image/post.png",
    caption: "",
    likes: 100,
  };

  componentDidMount() {
    axios.get(`/api/user/${this.props.post.uid}`).then((obj) => {
      let user = obj.data.data;
      // console.log(user);
      this.setState({
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

  render() {
    return (
      <div className="self-post">
        <div className="self-post-username">
          <img src={this.state.userImage} alt="" />
          <div className="username">{this.state.username}</div>
          {/* <button className="btn btn-primary follow-button">Follow</button> */}
        </div>
        <div className="self-post-image">
          <img src={this.state.postImage} alt="" />
        </div>
        <div className="self-post-actions">
          <div className="like-icon">
            <i className="far fa-heart"></i>
          </div>
          <div className="comment-icon">
            <i className="fas fa-comments"></i>
          </div>
        </div>
        <div className="self-post-likes-count">{this.state.likes}</div>
        {/* self-post-comments can be staeful component */}
        <div className="self-post-comments-section">
          <strong>{this.state.username}</strong> {this.state.caption}
          <div className="self-post-comments">
            <div className="comment">
              <div className="user-who">
                <strong>Natasha Romanoff </strong>
              </div>
              <div className="user-commented">
                <p>Hey nice pic man!</p>
              </div>
            </div>
            <div className="comment">
              <div className="user-who">
                <strong>Natasha Romanoff </strong>
              </div>
              <div className="user-commented">
                <p>Hey nice pic man!</p>
              </div>
            </div>
            <div className="comment">
              <div className="user-who">
                <strong>Natasha Romanoff </strong>
              </div>
              <div className="user-commented">
                <p>Hey nice pic man!</p>
              </div>
            </div>
            <i>Load More Comments...</i>
          </div>
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

export default SelfPost;
