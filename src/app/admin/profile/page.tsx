"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Save, Loader2, Plus, X } from "lucide-react";
import toast from "react-hot-toast";

export default function ProfileEditor() {
  const { status } = useSession();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") { router.push("/admin/login"); return; }
    if (status === "authenticated") {
      fetch("/api/cms/personal").then(r => r.json()).then(setData);
    }
  }, [status, router]);

  const save = async () => {
    setSaving(true);
    const res = await fetch("/api/cms/personal", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) toast.success("Profile updated!");
    else toast.error("Failed to save");
    setSaving(false);
  };

  if (!data) return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="animate-spin text-salesforce" size={40} /></div>;

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Profile</h1>
          <p className="text-gray-400">Edit your personal information and bio.</p>
        </div>
        <button onClick={save} disabled={saving} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-salesforce text-white font-bold text-sm hover:bg-[#0081C0] transition-colors disabled:opacity-70">
          {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />} Save Changes
        </button>
      </div>

      <div className="space-y-8">
        {/* Basic Info */}
        <div className="glass p-6 rounded-2xl border border-white/5 space-y-4">
          <h2 className="text-lg font-bold text-white mb-4">Basic Information</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase text-gray-400 font-semibold mb-1 ml-1">Full Name</label>
              <input value={data.name || ""} onChange={e => setData({...data, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:border-salesforce outline-none" />
            </div>
            <div>
              <label className="block text-xs uppercase text-gray-400 font-semibold mb-1 ml-1">Title</label>
              <input value={data.title || ""} onChange={e => setData({...data, title: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:border-salesforce outline-none" />
            </div>
            <div>
              <label className="block text-xs uppercase text-gray-400 font-semibold mb-1 ml-1">Tagline</label>
              <input value={data.tagline || ""} onChange={e => setData({...data, tagline: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:border-salesforce outline-none" />
            </div>
            <div>
              <label className="block text-xs uppercase text-gray-400 font-semibold mb-1 ml-1">Location</label>
              <input value={data.location || ""} onChange={e => setData({...data, location: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:border-salesforce outline-none" />
            </div>
            <div>
              <label className="block text-xs uppercase text-gray-400 font-semibold mb-1 ml-1">Email</label>
              <input value={data.email || ""} onChange={e => setData({...data, email: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:border-salesforce outline-none" />
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="glass p-6 rounded-2xl border border-white/5 space-y-4">
          <h2 className="text-lg font-bold text-white mb-4">Social Links</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase text-gray-400 font-semibold mb-1 ml-1">LinkedIn</label>
              <input value={data.linkedin || ""} onChange={e => setData({...data, linkedin: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:border-salesforce outline-none" />
            </div>
            <div>
              <label className="block text-xs uppercase text-gray-400 font-semibold mb-1 ml-1">GitHub</label>
              <input value={data.github || ""} onChange={e => setData({...data, github: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:border-salesforce outline-none" />
            </div>
            <div>
              <label className="block text-xs uppercase text-gray-400 font-semibold mb-1 ml-1">Trailhead</label>
              <input value={data.trailhead || ""} onChange={e => setData({...data, trailhead: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:border-salesforce outline-none" />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="glass p-6 rounded-2xl border border-white/5 space-y-4">
          <h2 className="text-lg font-bold text-white mb-4">Stats</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs uppercase text-gray-400 font-semibold mb-1 ml-1">Years Experience</label>
              <input type="number" value={data.stats?.yearsExp || 0} onChange={e => setData({...data, stats: {...data.stats, yearsExp: parseInt(e.target.value) || 0}})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:border-salesforce outline-none" />
            </div>
            <div>
              <label className="block text-xs uppercase text-gray-400 font-semibold mb-1 ml-1">Certifications</label>
              <input type="number" value={data.stats?.certifications || 0} onChange={e => setData({...data, stats: {...data.stats, certifications: parseInt(e.target.value) || 0}})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:border-salesforce outline-none" />
            </div>
            <div>
              <label className="block text-xs uppercase text-gray-400 font-semibold mb-1 ml-1">Projects</label>
              <input type="number" value={data.stats?.projects || 0} onChange={e => setData({...data, stats: {...data.stats, projects: parseInt(e.target.value) || 0}})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:border-salesforce outline-none" />
            </div>
          </div>
        </div>

        {/* Roles */}
        <div className="glass p-6 rounded-2xl border border-white/5">
          <h2 className="text-lg font-bold text-white mb-4">Rotating Roles (Hero Section)</h2>
          {(data.roles || []).map((role: string, i: number) => (
            <div key={i} className="flex gap-2 mb-2">
              <input value={role} onChange={e => { const r = [...data.roles]; r[i] = e.target.value; setData({...data, roles: r}); }} className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:border-salesforce outline-none" />
              <button onClick={() => { const r = data.roles.filter((_:any, j:number) => j !== i); setData({...data, roles: r}); }} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg"><X size={16} /></button>
            </div>
          ))}
          <button onClick={() => setData({...data, roles: [...(data.roles||[]), ""]})} className="flex items-center gap-1 text-salesforce text-sm mt-2 hover:underline"><Plus size={14} /> Add Role</button>
        </div>

        {/* Bio */}
        <div className="glass p-6 rounded-2xl border border-white/5">
          <h2 className="text-lg font-bold text-white mb-4">Bio Paragraphs</h2>
          {(data.bio || []).map((para: string, i: number) => (
            <div key={i} className="flex gap-2 mb-3">
              <textarea value={para} onChange={e => { const b = [...data.bio]; b[i] = e.target.value; setData({...data, bio: b}); }} rows={3} className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:border-salesforce outline-none resize-none" />
              <button onClick={() => { const b = data.bio.filter((_:any, j:number) => j !== i); setData({...data, bio: b}); }} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg h-fit"><X size={16} /></button>
            </div>
          ))}
          <button onClick={() => setData({...data, bio: [...(data.bio||[]), ""]})} className="flex items-center gap-1 text-salesforce text-sm mt-2 hover:underline"><Plus size={14} /> Add Paragraph</button>
        </div>
      </div>
    </div>
  );
}
