// import React from 'react';
import React, { Component } from "react";
import "./Post.css";
// git remote add origin https://github.com/Rishabhjain-code/instagram.git

// stateless functional components
// making it cc for working now

class Post extends Component {
  state = {
    username: "Mahendra Singh Dhoni",
    userImage: "image/default.png",
    postImage: "image/post.png",
    likes: 100,
  };

  componentDidMount(){
      this.setState({
          username : this.props.post.username,
          userImage : this.props.post.userImage,
          postImage : this.props.post.postImage,
          likes : this.props.post.likes,
      })
  }

  render() {
    return (
      <div className="post">
        <div className="post-username">
          <img src={this.state.userImage} alt="" />
          <div className="username">{this.state.username}</div>
          <button className="btn btn-primary follow-button">Follow</button>
        </div>
        <div className="post-image">
          <img src={this.state.postImage} alt="" />
        </div>
        <div className="post-actions">
          <div className="like-icon"><i className="far fa-heart"></i></div>
          <div className="comment-icon"><i className="fas fa-comments"></i></div>
        </div>
        <div className="post-likes-count">{this.state.likes}</div>
        {/* post-comments can be staeful component */}
        <div className="post-comments-section">Comments</div>
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
