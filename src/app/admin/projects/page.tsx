"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Save, Loader2, Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import toast from "react-hot-toast";

export default function ProjectsEditor() {
  const { status } = useSession();
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") { router.push("/admin/login"); return; }
    if (status === "authenticated") {
      fetch("/api/cms/projects").then(r => r.json()).then(setData);
    }
  }, [status, router]);

  const save = async () => {
    setSaving(true);
    const res = await fetch("/api/cms/projects", {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) toast.success("Projects updated!"); else toast.error("Failed to save");
    setSaving(false);
  };

  const addNew = () => {
    const newId = data.length > 0 ? Math.max(...data.map(d => d.id)) + 1 : 1;
    setData([...data, { id: newId, title: "", category: "Salesforce", description: "", outcome: "", tech: [], impact: "", color: "from-blue-600/20 to-salesforce/20", icon: "rocket" }]);
    setExpanded(newId);
  };

  const remove = (id: number) => setData(data.filter(d => d.id !== id));
  const update = (id: number, field: string, value: any) => setData(data.map(d => d.id === id ? { ...d, [field]: value } : d));

  if (status === "loading" || !data) return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="animate-spin text-salesforce" size={40} /></div>;

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Projects</h1>
          <p className="text-gray-400">{data.length} portfolio projects.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={addNew} className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 text-white font-medium text-sm hover:bg-white/10 border border-white/10"><Plus size={16} /> Add</button>
          <button onClick={save} disabled={saving} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-salesforce text-white font-bold text-sm hover:bg-[#0081C0] disabled:opacity-70">
            {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />} Save
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {data.map((proj) => (
          <div key={proj.id} className="glass rounded-2xl border border-white/5 overflow-hidden">
            <div className="flex items-center justify-between p-6 cursor-pointer hover:bg-white/[0.02]" onClick={() => setExpanded(expanded === proj.id ? null : proj.id)}>
              <div>
                <h3 className="text-white font-bold">{proj.title || "New Project"}</h3>
                <p className="text-gray-400 text-sm">{proj.category} &middot; {proj.impact}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={(e) => { e.stopPropagation(); remove(proj.id); }} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg"><Trash2 size={16} /></button>
                {expanded === proj.id ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
              </div>
            </div>

            {expanded === proj.id && (
              <div className="p-6 pt-0 space-y-4 border-t border-white/5">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase text-gray-400 font-semibold mb-1 ml-1">Title</label>
                    <input value={proj.title} onChange={e => update(proj.id, "title", e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:border-salesforce outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase text-gray-400 font-semibold mb-1 ml-1">Category</label>
                    <select value={proj.category} onChange={e => update(proj.id, "category", e.target.value)} className="w-full bg-[#111827] border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:border-salesforce outline-none">
                      <option>Salesforce</option><option>Integration</option><option>Innovation</option><option>Field Service</option><option>CPQ</option><option>Experience Cloud</option><option>OmniStudio</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase text-gray-400 font-semibold mb-1 ml-1">Description</label>
                  <textarea value={proj.description} onChange={e => update(proj.id, "description", e.target.value)} rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:border-salesforce outline-none resize-none" />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase text-gray-400 font-semibold mb-1 ml-1">Outcome</label>
                    <input value={proj.outcome || ""} onChange={e => update(proj.id, "outcome", e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:border-salesforce outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase text-gray-400 font-semibold mb-1 ml-1">Impact Label</label>
                    <input value={proj.impact || ""} onChange={e => update(proj.id, "impact", e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:border-salesforce outline-none" placeholder="e.g. 40% faster" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase text-gray-400 font-semibold mb-1 ml-1">Tech Stack (comma separated)</label>
                  <input value={(proj.tech || []).join(", ")} onChange={e => update(proj.id, "tech", e.target.value.split(",").map((s:string) => s.trim()).filter(Boolean))} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:border-salesforce outline-none" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
