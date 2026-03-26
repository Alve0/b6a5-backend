import app from "./app";
import config from "./config";
import type { Server } from "http";

let server: Server | undefined;

const shutdownServer = (err?: Error) => {
  if (err) {
    console.error("Server fatal error:", err);
  }

  if (server && server.close) {
    server.close(() => {
      console.log("Server closed.");
      process.exit(err ? 1 : 0);
    });

    // Fallback if close hangs
    setTimeout(() => {
      console.error("Could not close server gracefully, forcing exit.");
      process.exit(err ? 1 : 0);
    }, 5000);
  } else {
    process.exit(err ? 1 : 0);
  }
};

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
  shutdownServer(reason instanceof Error ? reason : undefined);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  shutdownServer(error);
});

async function main() {
  try {
    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });

    server.on("error", (error) => {
      console.error("Server encountered an error:", error);
      shutdownServer(error);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    shutdownServer(err instanceof Error ? err : undefined);
  }
}

main();
