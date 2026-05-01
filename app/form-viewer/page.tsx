"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function FormViewerPage() {
  const [forms, setForms] = useState<any[]>([]);
  const [selectedForm, setSelectedForm] = useState<any>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const supabase = createClientComponentClient();

  useEffect(() => { loadForms(); }, []);

  async function loadForms() {
    const { data } = await supabase.from("forms").select("*").eq("published", true);
    setForms(data || []);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await supabase.from("submissions").insert({ form_id: selectedForm.id, data: formData });
    setSubmitted(true);
  }

  if (submitted) return <div className="p-8 text-center">Thank you!</div>;
  if (selectedForm) return (
    <div className="max-w-md mx-auto p-8">
      <button onClick={() => setSelectedForm(null)} className="text-blue-600 mb-4">← Back</button>
      <h1 className="text-2xl font-bold mb-4">{selectedForm.title}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full p-2 border rounded" placeholder="Name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
        <input className="w-full p-2 border rounded" placeholder="Email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
        <textarea className="w-full p-2 border rounded" placeholder="Message" required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
        <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded">Submit</button>
      </form>
    </div>
  );

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Select a Form</h1>
      {forms.map(form => (
        <button key={form.id} onClick={() => setSelectedForm(form)} className="block w-full text-left p-2 border mb-2 rounded">{form.title}</button>
      ))}
    </div>
  );
}