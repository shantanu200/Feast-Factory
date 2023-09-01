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
import { postData, putData } from "../../server";
import { useNavigate } from "react-router-dom";

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

interface PropsForm {
  recipe: IRecipes;
  setRecipe: (value: any) => void;
}

const EditForm: React.FC<PropsForm> = ({ recipe, setRecipe }) => {
  const [ingredient, setIngredient] = useState<string>("");
  const [steps, setSteps] = useState(recipe?.steps || []);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (recipe.steps.includes("")) {
      alert("Please fill fields");
      return;
    }

    try {
      const { error, data } = await putData(
        `/recipe/editRecipe/${recipe._id}`,
        recipe
      );

      if (error) {
        console.error(data);
      } else {
        navigate(-1);
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
      width={"60%"}
      my={6}
      sx={{
        background: "#fff",
        p: 2,
        borderRadius: "1rem",
      }}
    >
      <Typography fontWeight={"700"} variant="h4" px={1} py={4}>
        Edit Recipe Data
      </Typography>
      <Stack spacing={2} width={"100%"}>
        <TextField
          name="title"
          value={recipe.title || ""}
          label="Title"
          onChange={handleChange}
          fullWidth
          variant="outlined"
          error={recipe.title?.length === 0}
          helperText={recipe.title?.length === 0 && "Please enter recipe title"}
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
          rows={12}
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
          pl={3}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography variant="h6">Recipe Steps</Typography>
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
                error={step.length === 0}
                helperText={step.length == 0 && "Please Fill these step."}
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
      </Stack>
      <Box width={"100%"} display={"flex"} mt={6} justifyContent={"flex-end"}>
        <Button
          sx={{
            mr: 2,
          }}
          variant="contained"
          startIcon={<EditIcon />}
          onClick={handleSubmit}
        >
          Edit Recipe
        </Button>
        <Button
          variant="contained"
          sx={{
            background: "red",
            "&:hover": {
              background: "#D11A2A",
            },
          }}
          startIcon={<DeleteIcon />}
        >
          Delete Recipe
        </Button>
      </Box>
    </Box>
  );
};

export default EditForm;
