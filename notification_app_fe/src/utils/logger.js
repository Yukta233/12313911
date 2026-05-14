import CONFIG from "./config";

const LOG_URL = `${CONFIG.BASE_URL}/logs`;

export async function Log(stack, level, pkg, message) {
  console.log(`[${level}] [${pkg}] ${message}`);

  try {
    await fetch(LOG_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${CONFIG.TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stack: stack,
        level: level,
        package: pkg,
        message: message,
      }),
    });
  } catch (err) {
    // silent fail
  }
}