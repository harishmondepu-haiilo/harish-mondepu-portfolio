import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";
import { Mail, Star, Trash2, CheckCircle } from "lucide-react";
import { revalidatePath } from "next/cache";

async function markRead(id: string) {
  "use server";
  await supabaseAdmin().from("contact_messages").update({ read: true }).eq("id", id);
  revalidatePath("/admin/messages");
}

async function toggleStar(id: string, starred: boolean) {
  "use server";
  await supabaseAdmin().from("contact_messages").update({ starred: !starred }).eq("id", id);
  revalidatePath("/admin/messages");
}

async function deleteMsg(id: string) {
  "use server";
  await supabaseAdmin().from("contact_messages").delete().eq("id", id);
  revalidatePath("/admin/messages");
}

export default async function MessagesAdminPage() {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  const { data: messages, error } = await supabaseAdmin()
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  const unread = messages?.filter(m => !m.read).length || 0;

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">Inbox</h1>
        <p className="text-gray-400">
          {unread > 0 ? <span className="text-salesforce font-semibold">{unread} unread</span> : "All caught up"} · {messages?.length || 0} total messages
        </p>
      </div>

      {error && (
        <div className="glass p-4 rounded-xl border border-red-500/30 text-red-400 text-sm mb-6">
          Database error: {error.message}
        </div>
      )}

      <div className="space-y-4">
        {!messages || messages.length === 0 ? (
          <div className="glass p-12 rounded-2xl border border-white/5 text-center flex flex-col items-center justify-center">
            <Mail size={48} className="text-gray-600 mb-4" />
            <h3 className="text-white text-lg font-medium mb-1">Inbox Zero</h3>
            <p className="text-gray-500 text-sm">No messages yet. They&apos;ll appear here when someone contacts you.</p>
          </div>
        ) : (
          messages.map(msg => (
            <div key={msg.id} className={`glass p-6 rounded-2xl border transition-colors ${msg.read ? "border-white/5 bg-white/[0.02]" : "border-salesforce/40 bg-salesforce/5"}`}>
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    {!msg.read && <span className="w-2 h-2 rounded-full bg-salesforce shrink-0" />}
                    <h3 className={`text-lg font-bold ${msg.read ? "text-gray-300" : "text-white"}`}>{msg.name}</h3>
                    {msg.starred && <Star size={14} className="text-yellow-400 fill-yellow-400" />}
                  </div>
                  <div className="flex gap-4 text-sm mb-3 flex-wrap">
                    <a href={`mailto:${msg.email}`} className="text-salesforce hover:underline">{msg.email}</a>
                    {msg.company && <span className="text-gray-500">{msg.company}</span>}
                    {msg.project_type && <span className="text-gray-500 uppercase text-[10px] tracking-wider border border-white/10 px-2 py-0.5 rounded-full">{msg.project_type}</span>}
                    {msg.budget && <span className="text-gray-500 text-xs">Budget: {msg.budget}</span>}
                  </div>
                  <p className={`text-sm leading-relaxed ${msg.read ? "text-gray-500" : "text-gray-300"}`}>{msg.message}</p>
                  <p className="text-xs text-gray-600 mt-3">{new Date(msg.created_at).toLocaleString()}</p>
                </div>

                <div className="flex md:flex-col gap-2 shrink-0 justify-end">
                  {!msg.read && (
                    <form action={markRead.bind(null, msg.id)}>
                      <button type="submit" title="Mark as read" className="p-2 text-green-400 hover:bg-green-400/10 rounded-lg transition-colors">
                        <CheckCircle size={18} />
                      </button>
                    </form>
                  )}
                  <form action={toggleStar.bind(null, msg.id, msg.starred)}>
                    <button type="submit" title={msg.starred ? "Unstar" : "Star"} className={`p-2 rounded-lg transition-colors ${msg.starred ? "text-yellow-400 hover:bg-yellow-400/10" : "text-gray-500 hover:bg-white/5"}`}>
                      <Star size={18} className={msg.starred ? "fill-yellow-400" : ""} />
                    </button>
                  </form>
                  <form action={deleteMsg.bind(null, msg.id)}>
                    <button type="submit" title="Delete" className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
