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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { red } from "@mui/material/colors";
import { HeroSVG, RecipeImg } from "../assets";
import Header from "../components/Recipe/Header";
import CircularProgress from "@mui/material/CircularProgress";
import { debounce } from "loadsh";
import NoResults from "../components/Recipe/NoResults";

interface IRecipes {
  title: string;
  description: string;
  ingredients: string[];
  steps: string[];
  imageUrl: string[];
  author: {
    userName: string;
  };
}

const Recipe: React.FC = () => {
  const navigate = useNavigate();
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
                      onClick={() => navigate("")}
                      sx={{
                        borderColor: "#333333",
                        color: "#333333",
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
