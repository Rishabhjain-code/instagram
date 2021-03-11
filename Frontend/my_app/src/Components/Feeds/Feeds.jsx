import React, { Component, createRef } from "react";
import Post from "../Post/Post.jsx";
import "./Feeds.css";
import axios from "axios";
import uid from "../../uid";

class Feeds extends Component {
  state = {
    posts: [],
    caption: "",
  };

  // runs only once
  componentDidMount() {
    axios.get("/api/post").then((obj) => {
      console.log(obj);
      let posts = obj.data.data;
      // console.log(posts);
      // reverse order sorting latest one comes first
      posts.sort((a, b) => {
        return new Date(b.created_on) - new Date(a.created_on);
      });
      this.setState({
        posts: posts,
        caption: "",
      });
    });
  }

  onChangeHandler = (e) => {
    this.setState({
      caption: e.target.value,
    });
    // console.log(this.state.caption);
  };

  onPostClickHandler = () => {
    if (this.feedsFileInput.current.files) {
      let file = this.feedsFileInput.current.files[0];
      let formData = new FormData();
      formData.append("post", file);
      formData.append("caption", this.state.caption);
      formData.append("uid", uid);
      axios.post("/api/post", formData).then((obj) => {
        // console.log(obj);
        this.componentDidMount();
      });
    }
  };

  feedsFileInput = createRef();

  render() {
    return (
      <React.Fragment>
        <div className="feeds">
          <div className="feeds-upload-post">
            <input
              type="file"
              name="file-input"
              className="feeds-file-input"
              ref={this.feedsFileInput}
            />
            <input
              type="text"
              name="caption-input"
              className="feeds-caption-input"
              onChange={(e) => {
                this.onChangeHandler(e);
              }}
            />
            <button
              className="btn btn-primary feeds-post-button"
              onClick={this.onPostClickHandler}
            >
              Post
            </button>
          </div>

          {this.state.posts.map(function (post) {
            return <Post key={post.pid} post={post} />;
          })}
        </div>
      </React.Fragment>
    );
  }
}

export default Feeds;
