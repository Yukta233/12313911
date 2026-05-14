import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Log } from "../utils/logger";

export default function Navbar() {
  const navigate = useNavigate();

  const go = (path, label) => {
    Log("frontend", "INFO", "Navbar", `User navigated to ${label}`);
    navigate(path);
  };

  return (
    <AppBar position="static" style={{ backgroundColor: "#1a1a2e" }}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Campus Notifications
        </Typography>
        <Box>
          <Button color="inherit" onClick={() => go("/", "All Notifications")}>
            All
          </Button>
          <Button color="inherit" onClick={() => go("/priority", "Priority Inbox")}>
            Priority
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}