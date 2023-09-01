import React, { useState, useEffect } from "react";
import {
  Box,
  Avatar,
  Typography,
  Stack,
  Chip,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { getHData } from "../server";
import { RecipeImg } from "../assets";
import EmaiIcon from "@mui/icons-material/Email";
import OutdoorGrill from "@mui/icons-material/OutdoorGrill";
import { CommentForm, CommentView } from "../components/Recipe/Comment";
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
    email: string;
    recipes: string[];
  };
  createdAt: string;
}

const RecipeView: React.FC = () => {
  const _id = location.pathname.split("/")[2];
  const [recipe, setRecipe] = useState<IRecipes>();

  useEffect(() => {
    async function fetchData() {
      const { error, data } = await getHData(`/recipe/getRecipe/${_id}`);

      if (error) {
        console.error(data);
      } else {
        setRecipe(data.data);
      }
    }
    fetchData();
  }, [_id]);
  return (
    <Box
      component={"main"}
      sx={{
        minHeight: "100vh",
        height: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box width={{ xs: "90%", sm: "60%" }}>
        <Box display={"flex"} alignItems={"center"} p={4}>
          <Avatar sx={{ bgcolor: "#6dbe45" }}>
            {recipe?.author?.userName[0]?.toLocaleUpperCase()}
          </Avatar>
          <Box ml={2}>
            <Typography
              component={"a"}
              sx={{
                textDecoration: "none",
                color: "#333",
              }}
              href={`/user/${recipe?.author?._id}`}
              fontWeight={"600"}
            >
              {recipe?.author.userName}
            </Typography>
            <Typography>{recipe?.createdAt}</Typography>
          </Box>
        </Box>
        <Box>
          <Box
            width={"100%"}
            sx={{
              aspectRatio: "2/1",
              objectFit: "cover",
            }}
            component={"img"}
            src={RecipeImg}
          />
        </Box>
        <Box my={1}>
          <Typography py={2} variant="h2">
            {recipe?.title}
          </Typography>
          <Stack spacing={2} direction={"row"} useFlexGap flexWrap={"wrap"}>
            {recipe?.ingredients?.map((ing, idx) => (
              <Chip key={idx} label={`${ing}`} />
            ))}
          </Stack>
          <Typography
            variant={"body1"}
            fontStyle={"normal"}
            textAlign={"justify"}
            py={2}
          >
            {recipe?.description}
          </Typography>
        </Box>
        <Box borderBottom={1} borderColor={"#333"}>
          <Typography py={2} variant="h6">
            Steps of Recipe to follow:{" "}
          </Typography>
          <Stepper orientation={"vertical"}>
            {recipe?.steps?.map((step, index) => (
              <Step key={index}>
                <StepLabel
                  sx={{
                    fontSize: "2rem",
                  }}
                >
                  {step}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <Box py={4}>
          <Typography variant={"h5"}>Comment Section</Typography>
          <CommentForm paddingHorizontal={0} isReply={false} commentID="" />
          <CommentView />
        </Box>
        <Box
          my={2}
          p={2}
          display={"flex"}
          justifyContent={"space-between"}
          bgcolor={`#333`}
          color={"#fff"}
        >
          <Typography component={"a"} display={"flex"} alignItems={"center"}>
            <EmaiIcon sx={{ mr: 2 }} />
            {recipe?.author.email}
          </Typography>
          <Typography display={"flex"}>
            <OutdoorGrill sx={{ mr: 2 }} />
            Recipes Posted : {recipe?.author.recipes?.length}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default RecipeView;
