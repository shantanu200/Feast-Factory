import { HeroSVG } from "../../assets";
import "./Styles.index.css";
import { Button, Box, Stack, Typography } from "@mui/material";

interface DialogProps {
  open: boolean;
  setOpen: (value: any) => void;
}

const Hero: React.FC<DialogProps> = ({ setOpen }) => {
  return (
    <Box display={"flex"} width={"100%"}>
      <Stack
        className="left"
        sx={{
          width: "50%",
          height: "80vh",
          justifyContent: "center",
          padding: "3rem",
        }}
        spacing={2}
      >
        <h1>Discover Culinary Delights with Feast Factory</h1>
        <span>
          {" "}
          - Explore a World of Flavorful Recipes and Culinary Inspiration
        </span>
        <Box>
          <Button
            variant="contained"
            sx={{
              background: "#333333",
              "&:hover": {
                background: "#6dbe45",
              },
            }}
            onClick={() => setOpen(true)}
          >
            Get Started
          </Button>
        </Box>
      </Stack>
      <Box
        sx={{
          width: "50%",
        }}
      >
        <img className="image" alt="" src={HeroSVG} />
      </Box>
    </Box>
  );
};

export default Hero;
