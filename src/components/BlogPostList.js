import React from "react";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

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
        <Typography variant="h4" component="h2" gutterBottom>
          All Blog Posts
        </Typography>
        <Grid container spacing={4}>
          {this.state.blogPosts.map((blogPost) => (
            <Grid item xs={12} sm={6} md={4} key={blogPost.id}>
              <Paper elevation={3}>
                <Box p={2}>
                  <Typography variant="h5" component="h3">
                    <Link
                      component={RouterLink}
                      to={`/blogposts/${blogPost.id}`}
                      color="inherit"
                      underline="none"
                    >
                      {blogPost.title}
                    </Link>
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {blogPost.content}
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    {new Date(blogPost.createdAt).toLocaleString()}
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => this.handleDelete(blogPost.id)}
                  >
                    Delete
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

export default BlogPostList;
