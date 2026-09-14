import { createClient } from "redis";

export const redis = createClient({
  url: process.env.REDIS_URL,
});

redis.on("error", (error) => {
  console.error("Redis error:", error);
});

export const connectRedis = async () => {
  await redis.connect();

  console.log("Redis connected");
};
