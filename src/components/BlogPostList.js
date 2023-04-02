import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class BlogPostList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blogPosts: [],
    };
  }

  componentDidMount() {
    axios
      .get(`${this.props.apiUrl}/blogposts`)
      .then((response) => {
        this.setState({ blogPosts: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleDelete = (id) => {
    axios
      .delete(`${this.props.apiUrl}/blogposts/${id}`)
      .then(() => {
        // remove the deleted blog post from the state
        this.setState((prevState) => ({
          blogPosts: prevState.blogPosts.filter((post) => post.id !== id),
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <h2>All Blog Posts</h2>
        <ul>
          {this.state.blogPosts.map((blogPost) => (
            <li key={blogPost.id}>
              <h3>
                <Link to={`/blogposts/${blogPost.id}`}>{blogPost.title}</Link>
              </h3>
              <p>{blogPost.content}</p>
              <small>{new Date(blogPost.createdAt).toLocaleString()}</small>
              <button onClick={() => this.handleDelete(blogPost.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default BlogPostList;
