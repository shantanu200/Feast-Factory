import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { getData } from "../server";
import Post from "../components/User/Posts";
import { AddBox } from "@mui/icons-material";
import { Navigate, useNavigate } from "react-router-dom";

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

interface IUser {
  _id: string;
  userName: string;
  email: string;
  password: string;
  recipes: IRecipes[];
}

const User: React.FC = () => {
  const _id = location.pathname.split("/")[2];
  const [userData, setUserData] = useState<IUser>();
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchUser() {
      const { error, data } = await getData(`/user/${_id}`);

      if (error) {
        console.error(data);
      } else {
        setUserData(data.data);
      }
    }
    fetchUser();
  }, [_id]);

  return (
    <Container maxWidth={"lg"}>
      <Box
        display={"flex"}
        alignItems={"center"}
        p={4}
        justifyContent={"space-between"}
        component={"section"}
        width={"100%"}
        borderBottom={1}
      >
        <Box display={"flex"} alignItems={"center"}>
          <Avatar sx={{ mr: 2, backgroundColor: "#333" }}>
            {userData?.userName[0]?.toLocaleUpperCase()}
          </Avatar>
          <Stack>
            <Typography variant={"h3"}>{userData?.userName}</Typography>
            <Typography>{userData?.email}</Typography>
          </Stack>
        </Box>
        <Button
          variant={"contained"}
          sx={{
            background: "#333",
            color: "#fff",
            transition: "all ease .6s",
            "&:hover": {
              background: "#000",
            },
          }}
          onClick={() => navigate(`/create/${userData?._id}`)}
          startIcon={<AddBox />}
        >
          Create Post
        </Button>
      </Box>
      <Box p={4}>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typography variant="h4">Your Recipes</Typography>
          <Chip
            label={`Recipes posted: ${userData?.recipes.length}`}
            sx={{
              background: "#333",
              color: "#fff",
            }}
          />
        </Box>
        <Post recipes={userData?.recipes || []} />
      </Box>
    </Container>
  );
};

export default User;
