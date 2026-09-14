import { redis } from "../config/redis.js";

export const getCache = async <T>(key: string): Promise<T | null> => {
  const data = await redis.get(key);

  if (!data) {
    return null;
  }

  return JSON.parse(data) as T;
};

export const setCache = async <T>(key: string, data: T, ttlSeconds: number) => {
  await redis.set(key, JSON.stringify(data), {
    EX: ttlSeconds,
  });
};

export const deleteCache = async (key: string) => {
  await redis.del(key);
};
