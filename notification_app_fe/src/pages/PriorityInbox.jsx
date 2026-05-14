import { useEffect, useState } from "react";
import { Container, Typography, Slider, Box, CircularProgress, Select, MenuItem } from "@mui/material";
import { fetchNotifications } from "../utils/api";
import { getTopNotifications } from "../utils/priorityEngine";
import { Log } from "../utils/logger";
import NotificationCard from "../components/NotificationCard";

export default function PriorityInbox() {
  const [all, setAll] = useState([]);
  const [topN, setTopN] = useState(10);
  const [typeFilter, setTypeFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Log("frontend", "INFO", "PriorityInbox", "Priority inbox mounted");
    fetchNotifications().then((data) => {
      setAll(data);
      setLoading(false);
    });
  }, []);

  const filtered = typeFilter === "All"
    ? all
    : all.filter((n) => n.Type === typeFilter);

  const top = getTopNotifications(filtered, topN);

  return (
    <Container maxWidth="md" style={{ marginTop: 30 }}>
      <Typography variant="h4" gutterBottom>Priority Inbox</Typography>

      <Box mb={3} display="flex" gap={3} alignItems="center">
        <Box width={250}>
          <Typography>Show top: {topN}</Typography>
          <Slider
            min={5} max={20} value={topN}
            onChange={(_, val) => {
              setTopN(val);
              Log("frontend", "DEBUG", "PriorityInbox", `Top-N changed to ${val}`);
            }}
          />
        </Box>

        <Select
          value={typeFilter}
          onChange={(e) => {
            setTypeFilter(e.target.value);
            Log("frontend", "DEBUG", "PriorityInbox", `Filter changed to ${e.target.value}`);
          }}
          size="small"
        >
          {["All", "Placement", "Result", "Event"].map((t) => (
            <MenuItem key={t} value={t}>{t}</MenuItem>
          ))}
        </Select>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : (
        top.map((n) => (
          <NotificationCard key={n.ID} notification={n} isNew={true} onView={() => {}} />
        ))
      )}
    </Container>
  );
}