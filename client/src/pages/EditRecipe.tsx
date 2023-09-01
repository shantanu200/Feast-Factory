import { Box, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { getHData } from "../server";
import { useLinkClickHandler, useLocation } from "react-router-dom";
import EditForm from "../components/Recipe/EditForm";
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

const EditRecipe: React.FC = () => {
  const location = useLocation();
  const _id = location.pathname.split("/")[3];
  const [recipe, setRecipe] = useState<IRecipes>();

  useEffect(() => {
    async function fetchRecipe() {
      const { error, data } = await getHData(`/recipe/getRecipe/${_id}`);

      if (error) {
        console.error(error);
      } else {
        setRecipe(data?.data);
      }
    }
    fetchRecipe();
  }, [_id]);
  
  return (
    <Box
      sx={{
        // minWidth: "100vw",
        // width: "100%",
        minHeight: "100vh",
        height: "100%",
        background: "#6dbe45",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <EditForm recipe={recipe as IRecipes} setRecipe={setRecipe} />
    </Box>
  );
};

export default EditRecipe;
