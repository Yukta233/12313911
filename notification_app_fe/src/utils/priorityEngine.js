// src/utils/priorityEngine.js
// Priority: Placement=3, Result=2, Event=1
const WEIGHTS = {
  Placement: 3,
  Result: 2,
  Event: 1,
};
export function getTopNotifications(notifications, n = 10) {
  const now = Date.now();

  const scored = notifications.map((notif) => {
    const weight = WEIGHTS[notif.Type] || 0;
    const ageMs = now - new Date(notif.Timestamp).getTime();
    const ageHours = ageMs / (1000 * 60 * 60);
    // Higher score = more important + more recent
    const score = weight * 100 - ageHours;
    return { ...notif, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, n);
}