import { useEffect, useState } from "react";
import { Container, Typography, Chip, Box, CircularProgress } from "@mui/material";
import { fetchNotifications } from "../utils/api";
import { Log } from "../utils/logger";
import NotificationCard from "../components/NotificationCard";
export default function AllNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [viewed, setViewed] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    Log("frontend", "INFO", "AllNotifications", "Page mounted — loading notifications");
    fetchNotifications().then((data) => {
      setNotifications(data);
      setLoading(false);
      Log("frontend", "INFO", "AllNotifications", `Rendered ${data.length} notifications`);
    });
  }, []);

  const markRead = (id) => {
    Log("frontend", "DEBUG", "AllNotifications", `Notification ${id} marked as viewed`);
    setViewed((prev) => new Set([...prev, id]));
  };

  const types = ["All", "Placement", "Result", "Event"];

  const visible = notifications.filter(
    (n) => filter === "All" || n.Type === filter
  );

  return (
    <Container maxWidth="md" style={{ marginTop: 30 }}>
      <Typography variant="h4" gutterBottom>All Notifications</Typography>

      <Box mb={2} display="flex" gap={1}>
        {types.map((t) => (
          <Chip
            key={t}
            label={t}
            onClick={() => setFilter(t)}
            color={filter === t ? "primary" : "default"}
            clickable
          />
        ))}
      </Box>

      {loading ? (
        <CircularProgress />
      ) : (
        visible.map((n) => (
          <NotificationCard
            key={n.ID}
            notification={n}
            isNew={!viewed.has(n.ID)}
            onView={() => markRead(n.ID)}
          />
        ))
      )}
    </Container>
  );
}