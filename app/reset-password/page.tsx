"use client";

import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash.includes("access_token")) alert("Invalid or expired link");
  }, []);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.updateUser({ password });
    if (error) alert(error.message);
    else { setSuccess(true); setTimeout(() => router.push("/login"), 2000); }
  };

  if (success) return <div className="p-8 text-center">Password reset! Redirecting...</div>;

  return (
    <div className="max-w-md mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">New Password</h1>
      <form onSubmit={handleReset}>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full p-2 border rounded mb-4" placeholder="New password" />
        <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded">Reset Password</button>
      </form>
    </div>
  );
}