import { Log } from "./logger";
import CONFIG from "./config";

const BASE = `${CONFIG.BASE_URL}/notifications`;

export async function fetchNotifications(params = {}) {
  const query = new URLSearchParams(params).toString();
  const url = query ? `${BASE}?${query}` : BASE;

  Log("frontend", "INFO", "api", `Fetching notifications — ${url}`);

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${CONFIG.TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    Log("frontend", "INFO", "api", `Received ${data.notifications.length} notifications`);
    return data.notifications;
  } catch (err) {
    Log("frontend", "ERROR", "api", `Fetch failed: ${err.message}`);
    return [];
  }
}