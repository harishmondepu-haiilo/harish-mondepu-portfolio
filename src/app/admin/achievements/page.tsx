"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Save, Loader2, Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export default function AchievementsEditor() {
  const { status } = useSession();
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") { router.push("/admin/login"); return; }
    if (status === "authenticated") {
      fetch("/api/cms/achievements").then(r => r.json()).then(setData);
    }
  }, [status, router]);

  const save = async () => {
    setSaving(true);
    const res = await fetch("/api/cms/achievements", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    if (res.ok) toast.success("Achievements updated!"); else toast.error("Failed to save");
    setSaving(false);
  };

  const addNew = () => setData([...data, { title: "", description: "", company: "" }]);
  const remove = (i: number) => setData(data.filter((_, j) => j !== i));
  const update = (i: number, field: string, value: string) => { const arr = [...data]; arr[i] = { ...arr[i], [field]: value }; setData(arr); };

  if (status === "loading" || !data) return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="animate-spin text-salesforce" size={40} /></div>;

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex justify-between items-center mb-10">
        <div><h1 className="text-3xl font-bold text-white mb-2">Achievements</h1><p className="text-gray-400">{data.length} achievements.</p></div>
        <div className="flex gap-3">
          <button onClick={addNew} className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 text-white font-medium text-sm hover:bg-white/10 border border-white/10"><Plus size={16} /> Add</button>
          <button onClick={save} disabled={saving} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-salesforce text-white font-bold text-sm hover:bg-[#0081C0] disabled:opacity-70">{saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />} Save</button>
        </div>
      </div>
      <div className="space-y-4">
        {data.map((ach, i) => (
          <div key={i} className="glass p-6 rounded-2xl border border-white/5">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1 grid md:grid-cols-2 gap-4">
                <div><label className="block text-xs uppercase text-gray-400 font-semibold mb-1 ml-1">Title</label><input value={ach.title} onChange={e => update(i, "title", e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:border-salesforce outline-none" /></div>
                <div><label className="block text-xs uppercase text-gray-400 font-semibold mb-1 ml-1">Company</label><input value={ach.company} onChange={e => update(i, "company", e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:border-salesforce outline-none" /></div>
              </div>
              <button onClick={() => remove(i)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg ml-2"><Trash2 size={16} /></button>
            </div>
            <div><label className="block text-xs uppercase text-gray-400 font-semibold mb-1 ml-1">Description</label><textarea value={ach.description} onChange={e => update(i, "description", e.target.value)} rows={2} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:border-salesforce outline-none resize-none" /></div>
          </div>
        ))}
      </div>
    </div>
  );
}
