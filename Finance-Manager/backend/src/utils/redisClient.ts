import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();

const redisClient = createClient({
  url: process.env.REDIS_URL,
  socket: {
    tls: true, // required for rediss://
  },
});

redisClient.on("connect", () => {
  console.log("✅ Connected to Upstash Redis");
});

redisClient.on("error", (err) => {
  console.error("❌ Redis connection error:", err);
});

(async () => {
  if (!redisClient.isOpen) await redisClient.connect();
})();

export default redisClient;
