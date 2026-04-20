import { getSubmissions } from "@/lib/submissionStore";
import { BUSINESS_NAME } from "@/lib/constants";

export const dynamic = "force-dynamic";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default async function DashboardPage() {
  const submissions = await getSubmissions();
  const supabaseConfigured =
    !!process.env.SUPABASE_URL &&
    !!process.env.SUPABASE_SERVICE_ROLE_KEY;

  return (
    <div className="min-h-screen bg-sand/10">
      {/* Header */}
      <header className="bg-charcoal text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo.jpg"
            alt="logo"
            className="w-9 h-9 rounded-full object-cover"
          />
          <span className="font-serif font-bold text-sand">
            {BUSINESS_NAME} — Admin
          </span>
        </div>
        <a
          href="/admin/logout"
          className="text-sand/70 hover:text-white text-sm transition-colors"
        >
          Sign out
        </a>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-charcoal mb-2">
          Quote Requests
        </h1>
        <p className="text-slate text-sm mb-8">
          {submissions.length} submission{submissions.length !== 1 ? "s" : ""}
        </p>

        {!supabaseConfigured && (
          <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 rounded-lg p-4 mb-6 text-sm">
            <strong>Storage not configured.</strong> Add{" "}
            <code>SUPABASE_URL</code> and{" "}
            <code>SUPABASE_SERVICE_ROLE_KEY</code> to your{" "}
            <code>.env.local</code> to save submissions here.
          </div>
        )}

        {submissions.length === 0 ? (
          <div className="bg-white rounded-lg border border-sand/40 p-12 text-center text-slate">
            No submissions yet.
          </div>
        ) : (
          <div className="space-y-4">
            {submissions.map((s) => (
              <div
                key={s.id}
                className="bg-white rounded-lg border border-sand/40 p-6 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                  <div>
                    <p className="font-bold text-charcoal text-lg">{s.name}</p>
                    <a
                      href={`mailto:${s.email}`}
                      className="text-brick-red hover:underline text-sm"
                    >
                      {s.email}
                    </a>
                  </div>
                  <p className="text-slate text-xs whitespace-nowrap">
                    {formatDate(s.createdAt)}
                  </p>
                </div>
                <p className="text-slate text-sm leading-relaxed whitespace-pre-wrap">
                  {s.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
