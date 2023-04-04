import * as React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";

function Main(props) {
  const { posts, title } = props;

  return (
    <Grid
      item
      xs={12}
      md={8}
      sx={{
        "& .markdown": {
          py: 3,
        },
        "& .blog-post": {
          marginBottom: "2rem",
        },
        "& .blog-title": {
          fontSize: "1.8rem",
          fontWeight: "400",
          marginTop: "0.5rem",
          textDecoration: "underline",
        },
        "& .blog-date": {
          marginBottom: "0.5rem",
          fontStyle: "italic",
        },
      }}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Divider />
      {posts.map((post) => {
        const formattedDate = new Date(post.createdAt).toLocaleDateString(
          "en-US",
          {
            month: "short",
            day: "numeric",
            year: "numeric",
          }
        );

        return (
          <div key={post.id} className="blog-post">
            <h2 className="blog-title">
              <Link to={`/blog/${post.id}`}>{post.title}</Link>
            </h2>
            <p className="blog-date">{formattedDate}</p>
            <p>{post.content}</p>
          </div>
        );
      })}
    </Grid>
  );
}

Main.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
};

export default Main;
