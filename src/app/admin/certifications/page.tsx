"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Save, Loader2, Plus, Trash2, Star } from "lucide-react";
import toast from "react-hot-toast";

export default function CertificationsEditor() {
  const { status } = useSession();
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") { router.push("/admin/login"); return; }
    if (status === "authenticated") {
      fetch("/api/cms/certs").then(r => r.json()).then(setData);
    }
  }, [status, router]);

  const save = async () => {
    setSaving(true);
    const res = await fetch("/api/cms/certs", {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) toast.success("Certifications updated!"); else toast.error("Failed to save");
    setSaving(false);
  };

  const addNew = () => {
    const newId = data.length > 0 ? Math.max(...data.map(d => d.id)) + 1 : 1;
    setData([...data, { id: newId, name: "", issuer: "Salesforce", date: new Date().getFullYear().toString(), logo: "gear", verified: true, highlight: false }]);
  };

  const remove = (id: number) => setData(data.filter(d => d.id !== id));
  const update = (id: number, field: string, value: any) => setData(data.map(d => d.id === id ? { ...d, [field]: value } : d));

  if (status === "loading" || !data) return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="animate-spin text-salesforce" size={40} /></div>;

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Certifications</h1>
          <p className="text-gray-400">{data.length} certifications managed.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={addNew} className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 text-white font-medium text-sm hover:bg-white/10 border border-white/10"><Plus size={16} /> Add</button>
          <button onClick={save} disabled={saving} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-salesforce text-white font-bold text-sm hover:bg-[#0081C0] disabled:opacity-70">
            {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />} Save
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {data.map((cert) => (
          <div key={cert.id} className={`glass p-4 rounded-xl border ${cert.highlight ? "border-salesforce/50 bg-salesforce/5" : "border-white/5"} flex items-center gap-4`}>
            <div className="flex-1 grid md:grid-cols-4 gap-3">
              <input value={cert.name} onChange={e => update(cert.id, "name", e.target.value)} placeholder="Cert name" className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-salesforce outline-none" />
              <input value={cert.issuer} onChange={e => update(cert.id, "issuer", e.target.value)} placeholder="Issuer" className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-salesforce outline-none" />
              <input value={cert.date} onChange={e => update(cert.id, "date", e.target.value)} placeholder="Year" className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-salesforce outline-none" />
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-1 text-xs text-gray-400 cursor-pointer">
                  <input type="checkbox" checked={cert.highlight} onChange={e => update(cert.id, "highlight", e.target.checked)} className="accent-salesforce" />
                  <Star size={12} /> Featured
                </label>
              </div>
            </div>
            <button onClick={() => remove(cert.id)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg shrink-0"><Trash2 size={16} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}
