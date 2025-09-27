"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }), 
        }
      );

      const data = await res.json();
      console.log("API response:", data); 

      if (res.ok) {
        setMessage("✅ " + data.message);
        setTimeout(() => {
          router.push(`/VerifyCode?email=${encodeURIComponent(email)}`);
        }, 1000);
      } else {
        setMessage("❌ " + (data.message || "Request failed"));
      }
    } catch (error) {
      console.error("Network error:", error);
      setMessage("❌ Network error, try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-gray-100 flex items-center justify-center">
      <div className="my-52">
        <div className="bg-white p-8 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6">
            Forgot Password
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-700 hover:bg-slate-800 text-white py-2 rounded-lg cursor-pointer"
            >
              {loading ? "Sending..." : "Send Reset Code"}
            </button>
          </form>
          {message && (
            <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
