import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getContentFresh } from "@/lib/content";
import { Briefcase, Code2, Award, FolderGit2, MessageSquare, GraduationCap } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  const content = await getContentFresh();

  const skillCount = Object.values(content.skills).reduce((sum, arr) => sum + (Array.isArray(arr) ? arr.length : 0), 0);

  const stats = [
    { label: "Experiences", value: content.experiences.length, icon: Briefcase, href: "/admin/cms", color: "text-blue-400", bg: "bg-blue-400/10" },
    { label: "Skills", value: skillCount, icon: Code2, href: "/admin/cms", color: "text-purple-400", bg: "bg-purple-400/10" },
    { label: "Certifications", value: content.certs.length, icon: Award, href: "/admin/cms", color: "text-green-400", bg: "bg-green-400/10" },
    { label: "Projects", value: content.projects.length, icon: FolderGit2, href: "/admin/cms", color: "text-orange-400", bg: "bg-orange-400/10" },
    { label: "Testimonials", value: content.testimonials.length, icon: MessageSquare, href: "/admin/cms", color: "text-pink-400", bg: "bg-pink-400/10" },
    { label: "Education", value: content.education.length, icon: GraduationCap, href: "/admin/cms", color: "text-red-400", bg: "bg-red-400/10" },
  ];

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">Welcome Back, {session.user?.name || "Admin"}</h1>
        <p className="text-gray-400">Here is what&apos;s happening with your portfolio today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <div className="glass p-6 rounded-2xl border border-white/5 hover:border-white/20 hover:bg-white/5 transition-all group flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-full ${stat.bg} ${stat.color} flex items-center justify-center`}>
                <stat.icon size={24} />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
         <div className="glass p-8 rounded-2xl border border-white/5">
            <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
            <div className="space-y-4">
              <Link href="/admin/cms" className="flex items-center justify-between p-4 rounded-xl border border-white/10 hover:bg-white/5 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-salesforce/20 text-salesforce flex items-center justify-center">
                    <Code2 size={18} />
                  </div>
                  <div>
                    <h3 className="text-white font-medium group-hover:text-salesforce transition-colors">Edit Content</h3>
                    <p className="text-xs text-gray-400">Update any section of your portfolio</p>
                  </div>
                </div>
                <span className="text-gray-400">&rarr;</span>
              </Link>
            </div>
         </div>
      </div>
    </div>
  );
}
