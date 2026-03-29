import { loginAdmin } from "./actions";

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

        <form action={loginAdmin} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-charcoal mb-1"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              autoComplete="username"
              className="w-full border border-sand rounded px-3 py-2 text-charcoal focus:outline-none focus:border-brick-red"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-charcoal mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full border border-sand rounded px-3 py-2 text-charcoal focus:outline-none focus:border-brick-red"
            />
          </div>

          <LoginError searchParams={searchParams} />

          <button
            type="submit"
            className="w-full bg-brick-red hover:bg-terracotta text-white font-semibold py-2.5 rounded transition-colors"
          >
            Sign In
          </button>
        </form>
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
  return (
    <p className="text-red-600 text-sm text-center">
      Incorrect username or password.
    </p>
  );
}
