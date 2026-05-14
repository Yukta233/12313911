const LOG_SERVER_URL = "http://4.224.186.213/evaluation-service/log";

async function Log(stack, level, pkg, message) {
  const payload = {
    stack,
    level,
    package: pkg,
    message,
    timestamp: new Date().toISOString(),
  };

  console.log(`[${level}] [${stack}] [${pkg}]: ${message}`);

  try {
    await fetch(LOG_SERVER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error("Logging failed:", err.message);
  }
}

module.exports = { Log };