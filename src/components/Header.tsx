import { Toolbar, Switch, Box, Typography } from "@mui/material";
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
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            sx={{
              color: isAdmin ? "#d8f96c" : "white",
              fontWeight: isAdmin ? 600 : 400,
              mr: 1,
              opacity: !isAdmin ? 0.5 : 1,
            }}
          >
            admin
          </Typography>
          <Switch
            checked={!isAdmin}
            onChange={() => dispatch(toggleUserMode())}
            sx={{
              "& .MuiSwitch-switchBase.Mui-checked": {
                color: "#d8f96c",
              },
              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                backgroundColor: "#d8f96c",
              },
            }}
          />
          <Typography
            sx={{
              color: !isAdmin ? "#d8f96c" : "white",
              fontWeight: !isAdmin ? 600 : 400,
              ml: 1,
              opacity: isAdmin ? 0.5 : 1,
            }}
          >
            user
          </Typography>
        </Box>
        <IconButton color="inherit" sx={{ ml: 2 }}>
          <LogoutIcon />
        </IconButton>
      </Box>
    </Toolbar>
  );
};

export default Header;
