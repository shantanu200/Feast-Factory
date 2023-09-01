import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Recipe from "./pages/Recipe";
import { createTheme, ThemeProvider } from "@mui/material";
import EditRecipe from "./pages/EditRecipe";
import RecipeView from "./pages/RecipeView";
import User from "./pages/User";
import CreateRecipe from "./pages/CreateRecipe";
const theme = createTheme({
  typography: {
    fontFamily: "Source Sans 3",
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/recipe/user/:id" element={<Recipe />} />
        <Route path="/recipe/edit/:id" element={<EditRecipe />} />
        <Route path="/recipe/:id" element={<RecipeView />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/create/:id" element={<CreateRecipe />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
