
"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function VerifyCodeInner() {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ resetCode: code }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Code verified successfully!");
        setTimeout(() => {
          router.push(`/ResetPassword?email=${encodeURIComponent(email || "")}`);
        }, 1000);
      } else {
        setMessage("❌ " + (data.message || "Invalid code"));
      }
    } catch (error) {
      console.error("VerifyCode error:", error);
      setMessage("❌ Network error, try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Verify Code</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Reset Code</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter reset code"
              required
              className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
          >
            {loading ? "Verifying..." : "Verify Code"}
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
}

export default function VerifyCode() {
  return (
    <Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
      <VerifyCodeInner />
    </Suspense>
  );
}

