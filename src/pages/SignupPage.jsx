import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FirebaseAuth from "../auth/firebaseAuth";

const firebaseAuth = new FirebaseAuth();

function SignupPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!form.email.trim() || !form.password || !form.confirmPassword) {
      setError("Please complete all fields.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await firebaseAuth.signup(form.email.trim(), form.password);

      navigate("/");
    } catch (firebaseError) {
      if (firebaseError.code === "auth/email-already-in-use") {
        setError("An account with this email already exists.");
      } else if (firebaseError.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else if (firebaseError.code === "auth/weak-password") {
        setError("Please choose a stronger password.");
      } else {
        setError("Unable to create your account. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page-enter flex min-h-[calc(100vh-160px)] items-center justify-center px-4 py-10">
      <section
        className="w-full max-w-md bg-[#162536] p-5 shadow-xl sm:p-8"
        aria-labelledby="signup-title"
      >
        <div className="mb-7">
          <p className="text-xs uppercase tracking-wider text-[#66c0f4]">
            Account
          </p>

          <h1
            id="signup-title"
            className="mt-1 text-2xl font-semibold text-white"
          >
            Create your account
          </h1>

          <p className="mt-2 text-sm leading-6 text-white/60">
            Sign up to continue to the store.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="space-y-5">
            <div>
              <label
                htmlFor="signup-email"
                className="text-sm font-medium text-white/80"
              >
                Email
              </label>

              <input
                id="signup-email"
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                disabled={loading}
                className="mt-1.5 min-h-11 w-full rounded-sm border border-[#2a475e] bg-[#101820] px-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-[#66c0f4] focus:ring-2 focus:ring-[#66c0f4]/30 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <div>
              <label
                htmlFor="signup-password"
                className="text-sm font-medium text-white/80"
              >
                Password
              </label>

              <input
                id="signup-password"
                name="password"
                type="password"
                autoComplete="new-password"
                value={form.password}
                onChange={handleChange}
                disabled={loading}
                className="mt-1.5 min-h-11 w-full rounded-sm border border-[#2a475e] bg-[#101820] px-3 text-sm text-white outline-none transition focus:border-[#66c0f4] focus:ring-2 focus:ring-[#66c0f4]/30 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <div>
              <label
                htmlFor="signup-confirm-password"
                className="text-sm font-medium text-white/80"
              >
                Confirm password
              </label>

              <input
                id="signup-confirm-password"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                value={form.confirmPassword}
                onChange={handleChange}
                disabled={loading}
                className="mt-1.5 min-h-11 w-full rounded-sm border border-[#2a475e] bg-[#101820] px-3 text-sm text-white outline-none transition focus:border-[#66c0f4] focus:ring-2 focus:ring-[#66c0f4]/30 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>

          {error && (
            <p
              className="mt-5 text-sm text-red-400"
              role="alert"
              aria-live="assertive"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 min-h-11 w-full rounded-sm bg-[#66c0f4] px-5 text-sm font-semibold text-[#101820] transition hover:bg-white active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#66c0f4] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-white/50">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-[#66c0f4] underline-offset-4 hover:text-white hover:underline focus-visible:text-white focus-visible:outline-none focus-visible:underline"
          >
            Back to store
          </Link>
        </p>
      </section>
    </main>
  );
}

export default SignupPage;