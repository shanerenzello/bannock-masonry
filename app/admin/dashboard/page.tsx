import { getSubmissions, getSubmissionCounts, type SubmissionStatus } from "@/lib/submissionStore";
import { BUSINESS_NAME } from "@/lib/constants";
import { setSubmissionStatus } from "./actions";

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

const TABS: { key: SubmissionStatus; label: string; color: string; activeClass: string; badgeClass: string }[] = [
  {
    key: "new",
    label: "New",
    color: "orange",
    activeClass: "border-orange-500 text-orange-600 bg-orange-50",
    badgeClass: "bg-orange-100 text-orange-700",
  },
  {
    key: "in_progress",
    label: "In Progress",
    color: "yellow",
    activeClass: "border-yellow-500 text-yellow-700 bg-yellow-50",
    badgeClass: "bg-yellow-100 text-yellow-700",
  },
  {
    key: "completed",
    label: "Completed",
    color: "green",
    activeClass: "border-green-500 text-green-700 bg-green-50",
    badgeClass: "bg-green-100 text-green-700",
  },
  {
    key: "deleted",
    label: "Deleted",
    color: "red",
    activeClass: "border-red-500 text-red-600 bg-red-50",
    badgeClass: "bg-red-100 text-red-700",
  },
];

const ACTIONS: Record<SubmissionStatus, { label: string; target: SubmissionStatus; className: string }[]> = {
  new: [
    { label: "Mark In Progress", target: "in_progress", className: "bg-yellow-100 hover:bg-yellow-200 text-yellow-800 border border-yellow-300" },
    { label: "Mark Complete", target: "completed", className: "bg-green-100 hover:bg-green-200 text-green-800 border border-green-300" },
    { label: "Delete", target: "deleted", className: "bg-red-100 hover:bg-red-200 text-red-700 border border-red-300" },
  ],
  in_progress: [
    { label: "Move to New", target: "new", className: "bg-orange-100 hover:bg-orange-200 text-orange-700 border border-orange-300" },
    { label: "Mark Complete", target: "completed", className: "bg-green-100 hover:bg-green-200 text-green-800 border border-green-300" },
    { label: "Delete", target: "deleted", className: "bg-red-100 hover:bg-red-200 text-red-700 border border-red-300" },
  ],
  completed: [
    { label: "Move to New", target: "new", className: "bg-orange-100 hover:bg-orange-200 text-orange-700 border border-orange-300" },
    { label: "Move to In Progress", target: "in_progress", className: "bg-yellow-100 hover:bg-yellow-200 text-yellow-800 border border-yellow-300" },
    { label: "Delete", target: "deleted", className: "bg-red-100 hover:bg-red-200 text-red-700 border border-red-300" },
  ],
  deleted: [
    { label: "Restore to New", target: "new", className: "bg-orange-100 hover:bg-orange-200 text-orange-700 border border-orange-300" },
  ],
};

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab } = await searchParams;
  const activeTab: SubmissionStatus =
    tab === "in_progress" || tab === "completed" || tab === "deleted" ? tab : "new";

  const [submissions, counts] = await Promise.all([
    getSubmissions(activeTab),
    getSubmissionCounts(),
  ]);

  const supabaseConfigured =
    !!process.env.SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY;

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
        <h1 className="text-2xl font-bold text-charcoal mb-6">Quote Requests</h1>

        {!supabaseConfigured && (
          <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 rounded-lg p-4 mb-6 text-sm">
            <strong>Storage not configured.</strong> Add <code>SUPABASE_URL</code> and{" "}
            <code>SUPABASE_SERVICE_ROLE_KEY</code> to your <code>.env.local</code>.
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {TABS.map((t) => {
            const isActive = activeTab === t.key;
            return (
              <a
                key={t.key}
                href={`/admin/dashboard?tab=${t.key}`}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 font-semibold text-sm transition-colors ${
                  isActive
                    ? t.activeClass
                    : "border-sand/40 text-slate bg-white hover:border-sand"
                }`}
              >
                {t.label}
                <span
                  className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${
                    isActive ? t.badgeClass : "bg-sand/30 text-slate"
                  }`}
                >
                  {counts[t.key]}
                </span>
              </a>
            );
          })}
        </div>

        {/* Submissions */}
        {submissions.length === 0 ? (
          <div className="bg-white rounded-lg border border-sand/40 p-12 text-center text-slate">
            No {activeTab.replace("_", " ")} quotes.
          </div>
        ) : (
          <div className="space-y-4">
            {submissions.map((s) => (
              <div
                key={s.id}
                className="bg-white rounded-xl border border-sand/40 p-6 shadow-sm"
              >
                {/* Contact info + date */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                  <div>
                    <p className="font-bold text-charcoal text-lg">{s.name}</p>
                    <a href={`tel:${s.phone}`} className="text-brick-red hover:underline text-sm block">
                      {s.phone}
                    </a>
                    {s.email && (
                      <a href={`mailto:${s.email}`} className="text-slate hover:underline text-sm block">
                        {s.email}
                      </a>
                    )}
                  </div>
                  <p className="text-slate text-xs whitespace-nowrap">{formatDate(s.createdAt)}</p>
                </div>

                {/* Message */}
                <p className="text-slate text-sm leading-relaxed whitespace-pre-wrap mb-4">
                  {s.message}
                </p>

                {/* Action buttons */}
                <div className="flex flex-wrap gap-2 pt-3 border-t border-sand/30">
                  {ACTIONS[s.status].map((action) => {
                    const boundAction = setSubmissionStatus.bind(null, s.id, action.target);
                    return (
                      <form key={action.target} action={boundAction}>
                        <button
                          type="submit"
                          className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${action.className}`}
                        >
                          {action.label}
                        </button>
                      </form>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
