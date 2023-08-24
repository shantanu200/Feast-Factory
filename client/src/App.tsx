import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Recipe from "./pages/Recipe";
import { createTheme, ThemeProvider } from "@mui/material";
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
        <Route path="/recipe/:id" element={<Recipe />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
