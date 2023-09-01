import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Chip,
  Stack,
  TextField,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { postData, postHData, putData } from "../../server";
import { useNavigate } from "react-router-dom";

interface IRecipe {
  title: string;
  description: string;
  steps: string[];
  imageUrl: string[];
  ingredients: string[];
}

interface IFile {
  url: string;
  name: string;
}

const CreateForm: React.FC = () => {
  const navigate = useNavigate();
  let _id = location.pathname.split("/")[2];
  const [ingredient, setIngredient] = useState<string>("");
  const [recipe, setRecipe] = useState<IRecipe>({
    title: "",
    description: "",
    steps: ["", "", ""],
    imageUrl: [],
    ingredients: [],
  });
  const [files, setFiles] = useState<IFile[]>([]);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };
  const handleSubmit = async () => {
    if (
      recipe.steps.includes("") ||
      recipe.ingredients.includes("") ||
      !recipe.title ||
      !recipe.description
    ) {
      alert("Please fill fields");
      return;
    }
    try {
      const { error, data } = await postHData(`/recipe/create/${_id}`, recipe);

      if (error) {
        console.error(data);
      } else {
        alert("Recipe is created");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setRecipe((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDelete = (value: string) => {
    let ingredients = recipe.ingredients;

    ingredients.splice(ingredients.indexOf(value), 1);

    setRecipe((prev: any) => ({
      ...prev,
      ingredients,
    }));
  };

  const handleRemoveStep = (idx: number) => {
    let steps = recipe.steps;

    steps.splice(idx, 1);

    setRecipe((prev: any) => ({
      ...prev,
      steps,
    }));
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (ingredient.trim() !== "") {
        let data = recipe.ingredients;
        let removeSpaces = ingredient.trim();
        let speratedData = removeSpaces.split(",");
        console.log(speratedData);
        setRecipe((prev: any) => ({
          ...prev,
          ingredients: [...data, ...speratedData],
        }));
        setIngredient("");
      }
    }
  };

  const handleSteps = () => {
    let data = recipe.steps;

    data.push("");

    setRecipe((prev: any) => ({
      ...prev,
      steps: data,
    }));
  };

  const handleChangeStep = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    let data = [...recipe.steps];
    data[idx] = e.target.value;

    setRecipe((prev: any) => ({
      ...prev,
      steps: data,
    }));
  };

  console.log(recipe);

  return (
    <Box
      component={"form"}
      width={{ md: "60%", sm: "90%" }}
      my={6}
      sx={{
        background: "#fff",
        p: 2,
        borderRadius: "1rem",
      }}
    >
      <Typography fontWeight={"700"} variant="h4" px={1} py={4}>
        Create Recipe
      </Typography>
      <Stack spacing={2} width={"100%"}>
        <TextField
          name="title"
          value={recipe.title}
          label="Title"
          onChange={handleChange}
          fullWidth
          variant="outlined"
        />
        <Stack spacing={1}>
          <TextField
            label="Ingredients"
            fullWidth
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setIngredient(e.target.value)
            }
            onKeyDown={handleInputKeyDown}
          />
          <Stack direction={"row"} spacing={2} useFlexGap flexWrap={"wrap"}>
            {recipe.ingredients?.map((ing, idx) => (
              <Chip
                key={idx}
                label={ing}
                onDelete={() => {
                  handleDelete(ing);
                }}
              />
            ))}
          </Stack>
        </Stack>

        <TextField
          label="Description"
          name="description"
          multiline
          rows={4}
          fullWidth
          sx={{
            resize: "vertical",
          }}
          value={recipe.description || ""}
          onChange={handleChange}
        />
      </Stack>
      <Stack mt={2} width={"100%"} spacing={2}>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Chip label="Recipe Steps" size={"medium"} color={"primary"} />
          <Button variant="outlined" onClick={handleSteps}>
            Add More
          </Button>
        </Box>
        <Stack direction={"column"} spacing={2}>
          {recipe.steps?.map((step, idx) => (
            <Box display={"flex"} alignItems={"center"}>
              <Typography mr={1}>{idx + 1}.</Typography>
              <TextField
                key={idx}
                value={step}
                fullWidth
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChangeStep(e, idx)
                }
              />
              <IconButton
                sx={{
                  ml: 2,
                }}
                onClick={() => handleRemoveStep(idx)}
              >
                <DeleteIcon color="error" />
              </IconButton>
            </Box>
          ))}
        </Stack>
        <Box>
          <Chip label="Upload Images" size={"medium"} color={"primary"} />

          <Box mt={2}>
            <TextField
              type="file"
              fullWidth
              inputProps={{
                multiple: true,
              }}
              onChange={handleImage}
            />
          </Box>
        </Box>
      </Stack>
      <Box width={"100%"} display={"flex"} mt={6} justifyContent={"flex-end"}>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={handleSubmit}
          color={"success"}
        >
          Create Recipe
        </Button>
      </Box>
    </Box>
  );
};

export default CreateForm;
