import React, { Component } from "react";
import Post from "../Post/Post.jsx";
import "./Feeds.css"

class Feeds extends Component {
  state = {
    posts: [
      {
        id: 1,
        username: "Mahendra Singh Dhoni",
        userImage: "image/default.png",
        postImage: "image/post.png",
        likes: 10,
      },
      {
        id: 2,
        username: "Dhoni",
        userImage: "image/default.png",
        postImage: "image/post.png",
        likes: 100,
      },
      {
        id: 3,
        username: "Singh Dhoni",
        userImage: "image/default.png",
        postImage: "image/post.png",
        likes: 101,
      },
      {
        id: 4,
        username: "Kohli Singh Dhoni",
        userImage: "image/default.png",
        postImage: "image/post.png",
        likes: 600,
      },
    ],
  };
  render() {
    return (
      // <React.Fragment>
      <div className="feeds">
        {this.state.posts.map(function (post) {
          return <Post key={post.id} post = {post}/>;
        })}
        {/* </React.Fragment> */}
      </div>
    );
  }
}

export default Feeds;
