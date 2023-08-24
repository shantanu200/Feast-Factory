import { useState } from "react";
import { Stack, TextField, Button } from "@mui/material";
import { postData } from "../../../server";
import { useNavigate } from "react-router-dom";

interface IUser {
  userName: string;
  password: string;
  email: string;
}

const SignUP: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser>({
    userName: "",
    password: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      let url = "/user";

      const { error, data } = await postData(url, user);

      if (error) {
        alert("Error occured");
      } else {
        navigate(`/recipe/${data?.data?._id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Stack
      spacing={2}
      sx={{ display: "flex", justifyContent: "center", p: 2 }}
      component="form"
    >
      <TextField
        name="userName"
        variant="outlined"
        label="Username"
        type="text"
        placeholder="Username"
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        name="email"
        type="email"
        label="Email"
        placeholder="Email"
        onChange={handleChange}
        fullWidth
      />
      <TextField
        name="password"
        type="password"
        label="Password"
        placeholder="Password"
        onChange={handleChange}
        fullWidth
        required
      />
      <Button variant="contained" onClick={handleSubmit}>
        Sign UP
      </Button>
    </Stack>
  );
};

export default SignUP;
