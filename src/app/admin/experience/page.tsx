"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Save, Loader2, Plus, Trash2, ChevronDown, ChevronUp, X } from "lucide-react";
import toast from "react-hot-toast";

export default function ExperienceEditor() {
  const { status } = useSession();
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") { router.push("/admin/login"); return; }
    if (status === "authenticated") {
      fetch("/api/cms/experiences").then(r => r.json()).then(setData);
    }
  }, [status, router]);

  const save = async () => {
    setSaving(true);
    const res = await fetch("/api/cms/experiences", {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) toast.success("Experience updated!"); else toast.error("Failed to save");
    setSaving(false);
  };

  const addNew = () => {
    const newId = data.length > 0 ? Math.max(...data.map(d => d.id)) + 1 : 1;
    setData([{ id: newId, role: "", company: "", date: "", type: "Full-time", description: "", bullets: [""], tech: [""], keyWin: "" }, ...data]);
    setExpanded(newId);
  };

  const remove = (id: number) => { setData(data.filter(d => d.id !== id)); };

  const update = (id: number, field: string, value: any) => {
    setData(data.map(d => d.id === id ? { ...d, [field]: value } : d));
  };

  if (status === "loading" || !data) return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="animate-spin text-salesforce" size={40} /></div>;

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Experience</h1>
          <p className="text-gray-400">Manage your career timeline ({data.length} roles).</p>
        </div>
        <div className="flex gap-3">
          <button onClick={addNew} className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 text-white font-medium text-sm hover:bg-white/10 transition-colors border border-white/10">
            <Plus size={16} /> Add Role
          </button>
          <button onClick={save} disabled={saving} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-salesforce text-white font-bold text-sm hover:bg-[#0081C0] transition-colors disabled:opacity-70">
            {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />} Save
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {data.map((exp) => (
          <div key={exp.id} className="glass rounded-2xl border border-white/5 overflow-hidden">
            <div className="flex items-center justify-between p-6 cursor-pointer hover:bg-white/[0.02]" onClick={() => setExpanded(expanded === exp.id ? null : exp.id)}>
              <div>
                <h3 className="text-white font-bold">{exp.role || "New Role"}</h3>
                <p className="text-gray-400 text-sm">{exp.company} &middot; {exp.date}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={(e) => { e.stopPropagation(); remove(exp.id); }} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg"><Trash2 size={16} /></button>
                {expanded === exp.id ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
              </div>
            </div>

            {expanded === exp.id && (
              <div className="p-6 pt-0 space-y-4 border-t border-white/5">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase text-gray-400 font-semibold mb-1 ml-1">Role Title</label>
                    <input value={exp.role} onChange={e => update(exp.id, "role", e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:border-salesforce outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase text-gray-400 font-semibold mb-1 ml-1">Company</label>
                    <input value={exp.company} onChange={e => update(exp.id, "company", e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:border-salesforce outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase text-gray-400 font-semibold mb-1 ml-1">Date Range</label>
                    <input value={exp.date} onChange={e => update(exp.id, "date", e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:border-salesforce outline-none" placeholder="Jan 2023 – Present" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase text-gray-400 font-semibold mb-1 ml-1">Type</label>
                    <input value={exp.type} onChange={e => update(exp.id, "type", e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:border-salesforce outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase text-gray-400 font-semibold mb-1 ml-1">Description</label>
                  <textarea value={exp.description} onChange={e => update(exp.id, "description", e.target.value)} rows={2} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:border-salesforce outline-none resize-none" />
                </div>
                <div>
                  <label className="block text-xs uppercase text-gray-400 font-semibold mb-1 ml-1">Key Bullets</label>
                  {(exp.bullets || []).map((b: string, i: number) => (
                    <div key={i} className="flex gap-2 mb-2">
                      <input value={b} onChange={e => { const arr = [...exp.bullets]; arr[i] = e.target.value; update(exp.id, "bullets", arr); }} className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:border-salesforce outline-none" />
                      <button onClick={() => update(exp.id, "bullets", exp.bullets.filter((_:any, j:number) => j !== i))} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg"><X size={14} /></button>
                    </div>
                  ))}
                  <button onClick={() => update(exp.id, "bullets", [...(exp.bullets||[]), ""])} className="flex items-center gap-1 text-salesforce text-xs mt-1 hover:underline"><Plus size={12} /> Add Bullet</button>
                </div>
                <div>
                  <label className="block text-xs uppercase text-gray-400 font-semibold mb-1 ml-1">Tech Stack (comma separated)</label>
                  <input value={(exp.tech || []).join(", ")} onChange={e => update(exp.id, "tech", e.target.value.split(",").map((s:string) => s.trim()).filter(Boolean))} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:border-salesforce outline-none" />
                </div>
                <div>
                  <label className="block text-xs uppercase text-gray-400 font-semibold mb-1 ml-1">Key Win</label>
                  <input value={exp.keyWin || ""} onChange={e => update(exp.id, "keyWin", e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:border-salesforce outline-none" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
