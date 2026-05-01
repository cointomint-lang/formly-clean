"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const supabase = createClientComponentClient();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` });
    setSent(true);
  };

  if (sent) return <div className="p-8 text-center">Check your email for reset link.</div>;

  return (
    <div className="max-w-md mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
      <form onSubmit={handleReset}>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full p-2 border rounded mb-4" placeholder="Email" />
        <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded">Send Reset Link</button>
      </form>
      <Link href="/login" className="text-blue-600 mt-4 inline-block">← Back</Link>
    </div>
  );
}