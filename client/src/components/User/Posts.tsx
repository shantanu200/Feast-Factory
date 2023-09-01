import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { getHData } from "../../server";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { RecipeImg } from "../../assets";
interface IRecipes {
  _id: string;
  title: string;
  description: string;
  ingredients: string[];
  steps: string[];
  imageUrl: string[];
  author: {
    _id: string;
    userName: string;
  };
}

interface PropsPost {
  recipes: IRecipes[];
}

const Post: React.FC<PropsPost> = ({ recipes }) => {
  const navigate = useNavigate();

  return (
    <Grid container spacing={2} py={2}>
      {recipes?.map((post, index) => (
        <Grid item key={index}>
          <Card sx={{ maxWidth: 400 }}>
            <CardHeader
              title={post?.title}
              action={
                <IconButton
                  onClick={() => navigate(`/recipe/edit/${post?._id}`)}
                >
                  <EditIcon />
                </IconButton>
              }
            />
            <CardMedia component={"img"} height={320} image={RecipeImg} />
            <CardContent>
              <Typography>
                {String(post?.description).substring(0, 150)}...
              </Typography>
            </CardContent>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
              p={2}
            >
              <Stack direction={"row"} spacing={2}>
                <Chip label={`${post?.ingredients.length} Ingredients`} />
                <Chip label={`${post?.steps.length} Steps`} />
              </Stack>
              <Button
                variant="outlined"
                onClick={() => navigate(`/recipe/${post?._id}`)}
                sx={{
                  borderColor: "#333333",
                  color: "#333333",
                  transition: "all ease .6s",
                  "&:hover": {
                    backgroundColor: "#333333",
                    color: "#fff",
                    borderColor: "#333333",
                  },
                }}
              >
                View More
              </Button>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Post;
