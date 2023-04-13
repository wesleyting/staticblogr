import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "./Header";
import MainFeaturedPost from "./MainFeaturedPost";
import FeaturedPost from "./FeaturedPost";
import Main from "./Main";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { API_URL } from "../globals/config";

const sections = [
  { title: "Technology", url: "#" },
  { title: "Design", url: "#" },
  { title: "Culture", url: "#" },
  { title: "Business", url: "#" },
  { title: "Politics", url: "#" },
  { title: "Opinion", url: "#" },
  { title: "Science", url: "#" },
  { title: "Health", url: "#" },
  { title: "Style", url: "#" },
  { title: "Travel", url: "#" },
];

export const presetBlogPosts = [
  {
    id: "123",
    title: "Preset Blog Post 1",
    content: "This is a preset blog post.",
    createdAt: new Date(2021, 5, 16),
    isFeatured: false,
    imageText: "Featured post image",
  },
  {
    id: "1234",
    title: "Preset Blog Post 2",
    content: "This is another preset blog post.",
    createdAt: new Date(2022, 8, 25),
    isFeatured: false,
    imageText: "Featured post image",
  },
  {
    id: "12345",
    title: "Preset Blog Post 3",
    content: "This is another preset blog post.",
    createdAt: new Date(2023, 2, 7),
    isFeatured: false,
    imageText: "Featured post image",
  },
];

const mainFeaturedPost = {
  title: "Example Freelance Client Website",
  description:
    "The function is to swiftly build a client's website using any template, but having the flexibility of adding your own front-end UI for a blog while using an API for your own back-end. ",
  image: "https://source.unsplash.com/random?city",
  imageText: "main image description",
};

function generateArchiveList(posts) {
  const archives = {};

  posts.forEach((post) => {
    const date = new Date(post.createdAt);
    const monthYear = `${date.toLocaleString("default", {
      month: "long",
    })} ${date.getFullYear()}`;

    if (archives[monthYear]) {
      archives[monthYear].push(post);
    } else {
      archives[monthYear] = [post];
    }
  });

  return Object.entries(archives).map(([title, posts]) => ({
    title,
    url: "#",
    posts,
  }));
}

const theme = createTheme();

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState([...presetBlogPosts]);
  const [sidebar, setSidebar] = useState({
    title: "About",
    description:
      "Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.",
    archives: [],
    social: [
      { name: "Instagram", icon: InstagramIcon },
      { name: "Twitter", icon: TwitterIcon },
      { name: "Facebook", icon: FacebookIcon },
    ],
  });

  useEffect(() => {
    axios
      .get(`${API_URL}/blogposts`)
      .then((response) => {
        const fetchedPosts = response.data.map((post) => {
          return {
            ...post,
            createdAt: post.createdAt.toString(),
            image: "https://source.unsplash.com/random/160x240/?scenery",
            imageText: "Featured post image",
          };
        });
        const updatedPosts = [...presetBlogPosts, ...fetchedPosts];
        setBlogPosts(updatedPosts);

        const archives = generateArchiveList(updatedPosts);
        setSidebar((prevSidebar) => ({ ...prevSidebar, archives }));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const featuredBlogPosts = blogPosts.filter((post) => post.isFeatured);

  const sortedBlogPosts = [...blogPosts].sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Client Website" sections={sections} />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredBlogPosts.map((post) => (
              <FeaturedPost key={post.id} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} sx={{ mt: 3 }}>
            <Main title="Stay in the know." posts={sortedBlogPosts} />
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            />
          </Grid>
        </main>
      </Container>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </ThemeProvider>
  );
}
