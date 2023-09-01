import { useState, useEffect } from "react";
import { getHData } from "../server";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Stack,
  Chip,
  CardHeader,
  Avatar,
  Box,
  IconButton,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { red } from "@mui/material/colors";
import { HeroSVG, RecipeImg } from "../assets";
import Header from "../components/Recipe/Header";
import CircularProgress from "@mui/material/CircularProgress";
import { debounce } from "loadsh";
import NoResults from "../components/Recipe/NoResults";
import EditIcon from "@mui/icons-material/Edit";

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

const Recipe: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const _id = location.pathname.split("/")[3];
  const [recipes, setRecipes] = useState<IRecipes[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  async function fetchData() {
    setLoading(true);
    const { error, data } = await getHData(
      `/recipe/recipes/?page=${page}&limit=${limit}&search=${search}`
    );

    if (error) {
      console.error(data);
    } else {
      setRecipes(data?.data?.recipes);
    }
    setLoading(false);
  }

  const debounceSearch = debounce(fetchData, 800);

  useEffect(() => {
    debounceSearch(search);
    return () => debounceSearch.cancel();
  }, [page, limit, search]);

  return (
    <main
      style={{
        padding: "1rem",
      }}
    >
      <Header
        search={search}
        setSearch={setSearch}
        searchLength={recipes?.length}
      />
      {loading ? (
        <Box display={"flex"} justifyContent={"center"}>
          <CircularProgress size={64} />
        </Box>
      ) : (
        <Grid container spacing={4} p={1}>
          {recipes?.length > 0 ? (
            recipes.map((recipe, index) => (
              <Grid item key={index}>
                <Card sx={{ maxWidth: 400 }}>
                  <CardHeader
                    avatar={
                      <Avatar
                        sx={{
                          bgcolor: `#6dbe45`,
                        }}
                      >
                        {recipe.author.userName[0].toUpperCase()}
                      </Avatar>
                    }
                    title={recipe.title}
                    subheader={recipe.author.userName}
                    action={
                      recipe.author._id === _id && (
                        <IconButton
                          onClick={() => navigate(`/recipe/edit/${recipe._id}`)}
                        >
                          <EditIcon />
                        </IconButton>
                      )
                    }
                  />
                  <CardMedia component={"img"} height={320} image={RecipeImg} />
                  <CardContent>
                    <Typography>
                      {String(recipe.description).substring(0, 150)}...
                    </Typography>
                  </CardContent>
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    p={2}
                  >
                    <Stack direction={"row"} spacing={2}>
                      <Chip
                        label={`${recipe.ingredients.length} Ingredients`}
                      />
                      <Chip label={`${recipe.steps.length} Steps`} />
                    </Stack>
                    <Button
                      variant="outlined"
                      onClick={() => navigate(`/recipe/${recipe._id}`)}
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
            ))
          ) : (
            <NoResults />
          )}
        </Grid>
      )}
    </main>
  );
};

export default Recipe;
