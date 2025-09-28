"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function ResetPasswordFormInner() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    setEmail(searchParams.get("email") || "");
  }, [searchParams]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, newPassword: password }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Password reset successful! Redirecting...");
        setTimeout(() => router.push("/Login"), 1500);
      } else {
        setMessage("❌ " + (data.message || "Something went wrong"));
      }
    } catch (err) {
      console.error("ResetPassword error:", err);
      setMessage("❌ Network error, try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
        {email && (
          <p className="text-center text-sm text-gray-600 mb-4">
            Resetting password for: <span className="font-medium">{email}</span>
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              required
              className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white py-2 rounded-lg transition-colors"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
}

export default function ResetPasswordForm() {
  return (
    <Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
      <ResetPasswordFormInner />
    </Suspense>
  );
}
