import { Toolbar, Switch, FormControlLabel, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toggleUserMode } from "../store/reducers/userSlice";
import { RootState } from "../store";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";

const Header = () => {
  const dispatch = useDispatch();
  const isAdmin = useSelector((state: RootState) => state.user.isAdmin);

  return (
    <Toolbar sx={{ justifyContent: "space-between" }}>
      <Box sx={{ flex: 1 }}></Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <FormControlLabel
          control={
            <Switch
              checked={isAdmin}
              onChange={() => dispatch(toggleUserMode())}
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": {
                  color: "#2F4F2F",
                },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: "#2F4F2F",
                },
              }}
            />
          }
          label={isAdmin ? "Admin Mode" : "User Mode"}
          sx={{ color: "white" }}
        />
        <IconButton color="inherit" sx={{ ml: 2 }}>
          <LogoutIcon />
        </IconButton>
      </Box>
    </Toolbar>
  );
};

export default Header;
