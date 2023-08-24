import { Box } from "@mui/material";
import { NoResultsImg } from "../../assets";
import "./Style.index.css";
const NoResults: React.FC = () => {
  return (
    <Box
      width={"100%"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
      mt={8}
    >
      <img src={NoResultsImg} />
      <h1>No Results found!!</h1>
    </Box>
  );
};

export default NoResults;
