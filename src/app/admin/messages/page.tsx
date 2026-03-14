"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Mail } from "lucide-react";

export default function MessagesPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/admin/login");
  }, [status, router]);

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">Inbox</h1>
        <p className="text-gray-400">Messages from the contact form.</p>
      </div>
      <div className="glass p-12 rounded-2xl border border-white/5 text-center flex flex-col items-center justify-center">
        <Mail size={48} className="text-gray-600 mb-4" />
        <h3 className="text-white text-lg font-medium mb-1">Inbox Zero</h3>
        <p className="text-gray-500 text-sm mb-4">Contact form messages will appear here once a database is connected.</p>
        <p className="text-gray-600 text-xs">To enable: connect a database (Supabase, PlanetScale, or SQLite) and run Prisma migrations.</p>
      </div>
    </div>
  );
}
