"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/lib/api";
import { useState } from "react";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginModal({
  open,
  onClose,
  onLogin,
}: {
  open: boolean;
  onClose: () => void;
  onLogin: (token: string, user: any) => void;
}) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  // ✅ Only return null *after* all hooks are called
  if (!open) return null;

  const onSubmit = async (data: LoginForm) => {
    try {
      setError("");
      setLoading(true);

      const res = await api.post("/auth/login", data);
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      onLogin(token, user);
      onClose(); // ✅ closes popup
      router.push("/dashboard"); // ✅ redirects
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 w-[380px] shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">🔥 SMOKE</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              {...register("email")}
              type="email"
              className="w-full mt-1 p-2 border rounded-md bg-gray-50 dark:bg-gray-700"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              {...register("password")}
              type="password"
              className="w-full mt-1 p-2 border rounded-md bg-gray-50 dark:bg-gray-700"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-700 text-white py-2 rounded-md hover:bg-gray-800 transition"
          >
            {loading ? "Logging in..." : "Enter"}
          </button>
        </form>
      </div>
    </div>
  );
}
