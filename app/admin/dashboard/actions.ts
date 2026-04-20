"use server";

import { revalidatePath } from "next/cache";
import { updateSubmissionStatus, type SubmissionStatus } from "@/lib/submissionStore";

export async function setSubmissionStatus(id: string, status: SubmissionStatus) {
  await updateSubmissionStatus(id, status);
  revalidatePath("/admin/dashboard");
}
