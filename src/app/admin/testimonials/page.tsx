"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Save, Loader2, Plus, Trash2, Quote } from "lucide-react";
import toast from "react-hot-toast";

export default function TestimonialsEditor() {
  const { status } = useSession();
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") { router.push("/admin/login"); return; }
    if (status === "authenticated") {
      fetch("/api/cms/testimonials").then(r => r.json()).then(setData);
    }
  }, [status, router]);

  const save = async () => {
    setSaving(true);
    const res = await fetch("/api/cms/testimonials", {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) toast.success("Testimonials updated!"); else toast.error("Failed to save");
    setSaving(false);
  };

  const addNew = () => {
    const newId = data.length > 0 ? Math.max(...data.map(d => d.id)) + 1 : 1;
    setData([...data, { id: newId, quote: "", name: "", title: "", company: "", relation: "", rating: 5 }]);
  };

  const remove = (id: number) => setData(data.filter(d => d.id !== id));

  const update = (id: number, field: string, value: any) => {
    setData(data.map(d => d.id === id ? { ...d, [field]: value } : d));
  };

  if (status === "loading" || !data) return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="animate-spin text-salesforce" size={40} /></div>;

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Testimonials</h1>
          <p className="text-gray-400">Manage LinkedIn recommendations ({data.length} total).</p>
        </div>
        <div className="flex gap-3">
          <button onClick={addNew} className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 text-white font-medium text-sm hover:bg-white/10 border border-white/10"><Plus size={16} /> Add</button>
          <button onClick={save} disabled={saving} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-salesforce text-white font-bold text-sm hover:bg-[#0081C0] disabled:opacity-70">
            {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />} Save
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {data.map((t) => (
          <div key={t.id} className="glass p-6 rounded-2xl border border-white/5 relative">
            <Quote className="absolute top-4 right-4 text-white/5" size={40} />
            <button onClick={() => remove(t.id)} className="absolute top-4 right-4 p-2 text-red-400 hover:bg-red-500/10 rounded-lg z-10"><Trash2 size={16} /></button>

            <div className="mb-4">
              <label className="block text-xs uppercase text-gray-400 font-semibold mb-1 ml-1">Quote</label>
              <textarea value={t.quote} onChange={e => update(t.id, "quote", e.target.value)} rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:border-salesforce outline-none resize-none" />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase text-gray-400 font-semibold mb-1 ml-1">Full Name</label>
                <input value={t.name} onChange={e => update(t.id, "name", e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:border-salesforce outline-none" />
              </div>
              <div>
                <label className="block text-xs uppercase text-gray-400 font-semibold mb-1 ml-1">Title / Role</label>
                <input value={t.title} onChange={e => update(t.id, "title", e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:border-salesforce outline-none" />
              </div>
              <div>
                <label className="block text-xs uppercase text-gray-400 font-semibold mb-1 ml-1">Company</label>
                <input value={t.company} onChange={e => update(t.id, "company", e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:border-salesforce outline-none" />
              </div>
              <div>
                <label className="block text-xs uppercase text-gray-400 font-semibold mb-1 ml-1">Relation</label>
                <select value={t.relation} onChange={e => update(t.id, "relation", e.target.value)} className="w-full bg-[#111827] border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:border-salesforce outline-none">
                  <option value="Manager">Manager</option>
                  <option value="Team Lead">Team Lead</option>
                  <option value="Senior Colleague">Senior Colleague</option>
                  <option value="Colleague">Colleague</option>
                  <option value="Client">Client</option>
                  <option value="Mentor">Mentor</option>
                  <option value="Employer">Employer</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4">
              <span className="text-xs uppercase text-gray-400 font-semibold">Rating:</span>
              {[1,2,3,4,5].map(star => (
                <button key={star} onClick={() => update(t.id, "rating", star)} className={`text-lg ${star <= t.rating ? "text-gold" : "text-gray-600"}`}>&#9733;</button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
