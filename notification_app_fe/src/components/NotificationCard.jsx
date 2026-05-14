import { Card, CardContent, Typography, Chip, Box } from "@mui/material";
const TYPE_COLORS = {
  Placement: "success",
  Result: "warning",
  Event: "info",
};
export default function NotificationCard({ notification, isNew, onView }) {
  return (
    <Card
      onClick={onView}
      style={{
        marginBottom: 12,
        borderLeft: isNew ? "4px solid #1976d2" : "4px solid #ccc",
        cursor: "pointer",
        opacity: isNew ? 1 : 0.75,
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle1" fontWeight={isNew ? 700 : 400}>
            {notification.Message}
          </Typography>
          <Chip
            label={notification.Type}
            color={TYPE_COLORS[notification.Type] || "default"}
            size="small"
          />
        </Box>
        <Typography variant="caption" color="text.secondary">
          {new Date(notification.Timestamp).toLocaleString()}
          {isNew && <span style={{ marginLeft: 8, color: "#1976d2" }}>● New</span>}
        </Typography>
      </CardContent>
    </Card>
  );
}