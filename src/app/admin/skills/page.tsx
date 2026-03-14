"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Save, Loader2, Plus, Trash2, X } from "lucide-react";
import toast from "react-hot-toast";

export default function SkillsEditor() {
  const { status } = useSession();
  const router = useRouter();
  const [data, setData] = useState<Record<string, any[]>>({});
  const [saving, setSaving] = useState(false);
  const [newCat, setNewCat] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") { router.push("/admin/login"); return; }
    if (status === "authenticated") {
      fetch("/api/cms/skills").then(r => r.json()).then(setData);
    }
  }, [status, router]);

  const save = async () => {
    setSaving(true);
    const res = await fetch("/api/cms/skills", {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) toast.success("Skills updated!"); else toast.error("Failed to save");
    setSaving(false);
  };

  const addCategory = () => {
    if (!newCat.trim()) return;
    setData({ ...data, [newCat.trim()]: [] });
    setNewCat("");
  };

  const removeCategory = (cat: string) => {
    const copy = { ...data };
    delete copy[cat];
    setData(copy);
  };

  const addSkill = (cat: string) => {
    setData({ ...data, [cat]: [...data[cat], { name: "", level: 50, color: "#800020" }] });
  };

  const removeSkill = (cat: string, idx: number) => {
    setData({ ...data, [cat]: data[cat].filter((_, i) => i !== idx) });
  };

  const updateSkill = (cat: string, idx: number, field: string, value: any) => {
    const arr = [...data[cat]];
    arr[idx] = { ...arr[idx], [field]: value };
    setData({ ...data, [cat]: arr });
  };

  if (status === "loading" || !data) return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="animate-spin text-salesforce" size={40} /></div>;

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Skills</h1>
          <p className="text-gray-400">{Object.keys(data).length} categories, {Object.values(data).reduce((a, b) => a + b.length, 0)} skills total.</p>
        </div>
        <button onClick={save} disabled={saving} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-salesforce text-white font-bold text-sm hover:bg-[#0081C0] disabled:opacity-70">
          {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />} Save
        </button>
      </div>

      {/* Add Category */}
      <div className="flex gap-2 mb-8">
        <input value={newCat} onChange={e => setNewCat(e.target.value)} placeholder="New category name..." onKeyDown={e => e.key === "Enter" && addCategory()} className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:border-salesforce outline-none" />
        <button onClick={addCategory} className="px-4 py-2 rounded-xl bg-white/5 text-white text-sm border border-white/10 hover:bg-white/10"><Plus size={16} /></button>
      </div>

      <div className="space-y-8">
        {Object.entries(data).map(([category, skills]) => (
          <div key={category} className="glass p-6 rounded-2xl border border-white/5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-white">{category}</h2>
              <div className="flex gap-2">
                <button onClick={() => addSkill(category)} className="text-salesforce text-xs flex items-center gap-1 hover:underline"><Plus size={12} /> Add Skill</button>
                <button onClick={() => removeCategory(category)} className="p-1 text-red-400 hover:bg-red-500/10 rounded-lg"><Trash2 size={14} /></button>
              </div>
            </div>
            <div className="space-y-3">
              {skills.map((skill, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <input value={skill.name} onChange={e => updateSkill(category, idx, "name", e.target.value)} placeholder="Skill name" className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-salesforce outline-none" />
                  <div className="flex items-center gap-2 w-32">
                    <input type="range" min="0" max="100" value={skill.level} onChange={e => updateSkill(category, idx, "level", parseInt(e.target.value))} className="flex-1 accent-salesforce" />
                    <span className="text-xs text-gray-400 w-8 text-right">{skill.level}%</span>
                  </div>
                  <input type="color" value={skill.color} onChange={e => updateSkill(category, idx, "color", e.target.value)} className="w-8 h-8 rounded cursor-pointer bg-transparent border-0" />
                  <button onClick={() => removeSkill(category, idx)} className="p-1 text-red-400 hover:bg-red-500/10 rounded-lg"><X size={14} /></button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
