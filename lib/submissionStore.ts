import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
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
  const supabase = getSupabase();
  if (!supabase) return;
  await supabase.from("submissions").insert({
    name: data.name,
    email: data.email,
    message: data.message,
    ip: data.ip,
  });
}

export async function getSubmissions(): Promise<Submission[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data } = await supabase
    .from("submissions")
    .select("*")
    .order("created_at", { ascending: false });
  if (!data) return [];
  return data.map((row) => ({
    id: row.id,
    name: row.name,
    email: row.email,
    message: row.message,
    ip: row.ip,
    createdAt: row.created_at,
  }));
}
