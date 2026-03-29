import { Redis } from "@upstash/redis";

let redis: Redis | null = null;

function getRedis(): Redis | null {
  if (
    !process.env.UPSTASH_REDIS_REST_URL ||
    !process.env.UPSTASH_REDIS_REST_TOKEN
  ) {
    return null;
  }
  if (!redis) {
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
  }
  return redis;
}

export interface Submission {
  id: string;
  name: string;
  email: string;
  message: string;
  ip: string;
  createdAt: string;
}

export async function saveSubmission(
  data: Omit<Submission, "id" | "createdAt">
): Promise<void> {
  const r = getRedis();
  if (!r) return;
  const submission: Submission = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  await r.lpush("bannock:submissions", JSON.stringify(submission));
}

export async function getSubmissions(): Promise<Submission[]> {
  const r = getRedis();
  if (!r) return [];
  const items = await r.lrange<string>("bannock:submissions", 0, -1);
  return items.map((item) =>
    typeof item === "string" ? JSON.parse(item) : item
  );
}
