"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FileText, PlusCircle, Download } from "lucide-react";

export default function Dashboard() {
  const [forms, setForms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
      const { data } = await supabase.from("forms").select("*").eq("user_id", user.id);
      setForms(data || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b p-4 flex justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Link href="/editor/new" className="bg-blue-600 text-white px-4 py-2 rounded-lg flex gap-2"><PlusCircle className="w-4 h-4"/> New Form</Link>
      </div>
      <div className="p-8">
        {forms.length === 0 ? (
          <div className="text-center text-gray-500">No forms yet. Create your first form.</div>
        ) : (
          forms.map(form => (
            <div key={form.id} className="bg-white p-4 rounded shadow mb-2 flex justify-between">
              <div>
                <Link href={`/form-viewer?form=${form.id}`} className="font-semibold">{form.title}</Link>
                <p className="text-sm text-gray-500">Slug: {form.slug}</p>
              </div>
              <Link href={`/editor/new?id=${form.id}`} className="text-blue-600">Edit</Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}