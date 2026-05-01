"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function NewFormPage() {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const supabase = createClientComponentClient();
  const router = useRouter();

  const createForm = async () => {
    if (!title.trim()) return alert("Title required");
    setLoading(true);
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const { data: { user } } = await supabase.auth.getUser();
    const { data, error } = await supabase.from("forms").insert({
      title, slug, user_id: user?.id,
      content: { type: "doc", content: [{ type: "paragraph", content: [{ type: "text", text: "New form" }] }] },
      published: false,
    }).select().single();
    if (error) alert(error.message);
    else router.push(`/dashboard`);
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">New Form</h1>
      <input className="w-full p-2 border rounded mb-4" placeholder="Form Title" value={title} onChange={e => setTitle(e.target.value)} />
      <button onClick={createForm} disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">Create</button>
    </div>
  );
}