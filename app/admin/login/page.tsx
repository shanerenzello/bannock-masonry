export default function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-8">
        <div className="text-center mb-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo.jpg"
            alt="Bannock Stone & Brick Masonry"
            className="w-24 h-24 mx-auto mb-4 rounded-full object-cover"
          />
          <h1 className="text-xl font-bold text-charcoal">Owner Login</h1>
          <p className="text-slate text-sm mt-1">Bannock Stone & Brick Masonry</p>
        </div>

        <LoginError searchParams={searchParams} />

        <a
          href="/api/auth/google"
          className="flex items-center justify-center gap-3 w-full border border-sand rounded px-4 py-2.5 text-charcoal font-medium hover:bg-sand/20 transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
            <path fill="#4285F4" d="M47.5 24.6c0-1.6-.1-3.1-.4-4.6H24v8.7h13.2c-.6 3-2.3 5.5-4.9 7.2v6h7.9c4.6-4.3 7.3-10.6 7.3-17.3z"/>
            <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.9-6c-2.1 1.4-4.9 2.3-8 2.3-6.1 0-11.3-4.1-13.2-9.7H2.7v6.2C6.7 42.8 14.8 48 24 48z"/>
            <path fill="#FBBC05" d="M10.8 28.8c-.5-1.4-.8-2.8-.8-4.3s.3-3 .8-4.3v-6.2H2.7C1 17.4 0 20.6 0 24s1 6.6 2.7 9.9l8.1-5.1z"/>
            <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.5l6.7-6.7C35.9 2.4 30.4 0 24 0 14.8 0 6.7 5.2 2.7 12.9l8.1 6.2c1.9-5.6 7.1-9.6 13.2-9.6z"/>
          </svg>
          Sign in with Google
        </a>
      </div>
    </div>
  );
}

async function LoginError({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  if (!params.error) return null;
  const message =
    params.error === "unauthorized"
      ? "That Google account is not authorized."
      : "Something went wrong. Please try again.";
  return <p className="text-red-600 text-sm text-center mb-4">{message}</p>;
}
