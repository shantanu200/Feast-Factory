import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./Styles.index.css";
const ROUTES = [
  { label: "Home", path: "/" },
  { label: "Register", path: "/" },
  { label: "Home", path: "/" },
  { label: "Home", path: "/" },
  { label: "Home", path: "/" },
];

const Navbar: React.FC = () => {
  return (
    <nav>
      <h1>Feast-Factory</h1>
      <div className="right">
        <ul>
          {ROUTES.map((route, idx) => (
            <li key={idx}>
              <a href={route.path}>{route.label}</a>
            </li>
          ))}
        </ul>
        <div>
          <TextField
            variant="standard"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            placeholder="Search.."
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
