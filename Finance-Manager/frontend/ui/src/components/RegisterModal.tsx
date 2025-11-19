"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/lib/api";
import { useState } from "react";

const registerSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain one uppercase letter")
    .regex(/[a-z]/, "Must contain one lowercase letter")
    .regex(/[0-9]/, "Must contain one number")
    .regex(/[^A-Za-z0-9]/, "Must contain one special character"),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterModal({ onRegister }: { onRegister: () => void }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      setError("");
      setLoading(true);
      await api.post("/auth/register", data);
      onRegister(); // Close modal or redirect
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 w-[380px] shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Create Account</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input {...register("name")} placeholder="Name" className="w-full p-2 border rounded-md" />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

          <input {...register("email")} placeholder="Email" className="w-full p-2 border rounded-md" />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

          <input {...register("password")} placeholder="Password" type="password" className="w-full p-2 border rounded-md" />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
