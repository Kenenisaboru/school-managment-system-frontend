import { useForm } from "react-hook-form";
import { useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";
import apiClient from "../services/apiClient.js";
import { useAuthStore } from "../store/authStore.js";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { email: "", password: "" } });
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const setCredentials = useAuthStore((state) => state.setCredentials);
  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  const onSubmit = async (values) => {
    setServerError("");
    setSubmitting(true);

    try {
      const { data } = await apiClient.post("/auth/login", values);
      const payload = {
        token: data?.data?.accessToken,
        user: data?.data?.user,
      };
      setCredentials(payload);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      // Only log errors in development
      if (import.meta.env.DEV) {
        console.error("Login error:", error);
        if (error.response) {
          console.error("Error response:", error.response.data);
          console.error("Status code:", error.response.status);
        } else {
          console.error("Network error - no response from server");
        }
      }
      
      // Handle network errors (no response)
      if (!error.response) {
        setServerError("Cannot connect to server. Please check if backend is running.");
        return;
      }
      
      // Handle validation errors
      if (error.response?.data?.errors && Array.isArray(error.response.data.errors)) {
        const validationErrors = error.response.data.errors
          .map((e) => {
            if (typeof e === "string") return e;
            return e.message || e.field || (Array.isArray(e.path) ? e.path.join(".") : String(e.path));
          })
          .filter(Boolean)
          .join(", ");
        setServerError(`Validation error: ${validationErrors || "Please check your input"}`);
        return;
      }
      
      // Handle API error messages
      const message = error.response?.data?.message ?? "Unable to login. Please try again.";
      setServerError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <p className="text-xs uppercase tracking-widest text-brand-500">School Managment</p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900">Sign in to continue</h1>
          <p className="mt-1 text-sm text-slate-500">Use your admin or staff credentials.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-slate-600">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2 text-slate-900 focus:border-brand-500 focus:outline-none"
              placeholder="principal@school.com"
            />
            {errors.email ? <p className="mt-1 text-xs text-rose-600">{errors.email.message}</p> : null}
          </div>

          <div>
            <label className="text-sm font-medium text-slate-600">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2 text-slate-900 focus:border-brand-500 focus:outline-none"
              placeholder="••••••••"
            />
            {errors.password ? <p className="mt-1 text-xs text-rose-600">{errors.password.message}</p> : null}
          </div>

          {serverError ? (
            <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{serverError}</div>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-brand-600 py-2 text-sm font-semibold text-white shadow hover:bg-brand-500 disabled:opacity-60"
          >
            {isSubmitting ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}


