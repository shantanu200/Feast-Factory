import { Box } from "@mui/material";
import CreateForm from "../components/User/CreateForm";
const CreateRecipe: React.FC = () => {
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
      <CreateForm />
    </Box>
  );
};

export default CreateRecipe;
