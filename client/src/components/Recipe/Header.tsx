import { useEffect, useState } from "react";
import { Box, Chip, Avatar, TextField, Stack } from "@mui/material";
import { getData, getHData } from "../../server";
import { useLocation } from "react-router-dom";

interface User {
  userName: string;
}

interface HeaderProps {
  search: string;
  setSearch: (value: any) => void;
  searchLength: number;
}

const Header: React.FC<HeaderProps> = ({ search, setSearch, searchLength }) => {
  const location = useLocation();
  const _id = location.pathname.split("/")[2];
  console.log(_id);
  const [user, setUser] = useState<User>({
    userName: "",
  });
  useEffect(() => {
    async function fetchData() {
      const { error, data } = await getData(`/user/${_id}`);

      if (error) {
        console.error(data);
      } else {
        setUser(data?.data);
      }
    }
    fetchData();
  }, [_id]);
  console.log(user);
  return (
    <Box p={2}>
      <Box width={"100%"} display={"flex"} justifyContent={"space-between"}>
        <Box>
          <TextField
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
            placeholder="Search recipe,ingredients and many more..."
            variant="standard"
            sx={{
              width: "320px",
            }}
          />
        </Box>
        <Box>
          <Chip
            avatar={<Avatar>{user.userName[0]?.toUpperCase()}</Avatar>}
            label={`${user.userName}`}
            variant="outlined"
            onClick={() => alert("Chip is clicked")}
          />
        </Box>
      </Box>
      {search && (
        <Stack spacing={2} direction={"row"} mt={2}>
          <Chip label={`Search: ${search}`} variant="outlined" />
          <Chip label={`Results: ${searchLength || 0}`} variant="outlined" />
        </Stack>
      )}
    </Box>
  );
};
export default Header;
