import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { Briefcase, Code2, Award, FolderGit2, MessageSquare, User, GraduationCap, Trophy } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  const sections = [
    { label: "Experience", href: "/admin/experience", icon: Briefcase, color: "text-blue-400", bg: "bg-blue-400/10" },
    { label: "Skills", href: "/admin/skills", icon: Code2, color: "text-purple-400", bg: "bg-purple-400/10" },
    { label: "Certifications", href: "/admin/certifications", icon: Award, color: "text-green-400", bg: "bg-green-400/10" },
    { label: "Projects", href: "/admin/projects", icon: FolderGit2, color: "text-orange-400", bg: "bg-orange-400/10" },
    { label: "Testimonials", href: "/admin/testimonials", icon: MessageSquare, color: "text-pink-400", bg: "bg-pink-400/10" },
    { label: "Profile", href: "/admin/profile", icon: User, color: "text-cyan-400", bg: "bg-cyan-400/10" },
    { label: "Education", href: "/admin/education", icon: GraduationCap, color: "text-yellow-400", bg: "bg-yellow-400/10" },
    { label: "Achievements", href: "/admin/achievements", icon: Trophy, color: "text-red-400", bg: "bg-red-400/10" },
  ];

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">Welcome Back, {session.user?.name || "Admin"}</h1>
        <p className="text-gray-400">Select a section below to edit your portfolio content.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sections.map((s) => (
          <Link key={s.label} href={s.href}>
            <div className="glass p-6 rounded-2xl border border-white/5 hover:border-white/20 hover:bg-white/5 transition-all group flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full ${s.bg} ${s.color} flex items-center justify-center shrink-0`}>
                <s.icon size={22} />
              </div>
              <p className="text-white font-semibold group-hover:text-salesforce transition-colors">{s.label}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
