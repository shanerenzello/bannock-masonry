import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export type SubmissionStatus = "new" | "in_progress" | "completed" | "deleted";

export interface Submission {
  id: string;
  name: string;
  phone: string;
  email?: string;
  message: string;
  ip: string;
  status: SubmissionStatus;
  createdAt: string;
}

export async function saveSubmission(
  data: Omit<Submission, "id" | "createdAt" | "status">
): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) return;
  await supabase.from("submissions").insert({
    name: data.name,
    phone: data.phone,
    email: data.email ?? null,
    message: data.message,
    ip: data.ip,
    status: "new",
  });
}

export async function getSubmissions(status: SubmissionStatus): Promise<Submission[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data } = await supabase
    .from("submissions")
    .select("*")
    .eq("status", status)
    .order("created_at", { ascending: false });
  if (!data) return [];
  return data.map((row) => ({
    id: row.id,
    name: row.name,
    phone: row.phone,
    email: row.email,
    message: row.message,
    ip: row.ip,
    status: row.status,
    createdAt: row.created_at,
  }));
}

export async function getSubmissionCounts(): Promise<Record<SubmissionStatus, number>> {
  const supabase = getSupabase();
  if (!supabase) return { new: 0, in_progress: 0, completed: 0, deleted: 0 };
  const { data } = await supabase.from("submissions").select("status");
  if (!data) return { new: 0, in_progress: 0, completed: 0, deleted: 0 };
  return {
    new: data.filter((r) => r.status === "new").length,
    in_progress: data.filter((r) => r.status === "in_progress").length,
    completed: data.filter((r) => r.status === "completed").length,
    deleted: data.filter((r) => r.status === "deleted").length,
  };
}

export async function updateSubmissionStatus(
  id: string,
  status: SubmissionStatus
): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) return;
  await supabase.from("submissions").update({ status }).eq("id", id);
}
