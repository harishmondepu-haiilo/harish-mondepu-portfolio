"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Briefcase,
  Code2,
  Award,
  FolderGit2,
  MessageSquare,
  Users,
  GraduationCap,
  Trophy,
  Loader2,
} from "lucide-react";

type ContentData = {
  personal: any;
  experiences: any[];
  certs: any[];
  skills: Record<string, any[]>;
  projects: any[];
  testimonials: any[];
  education: any[];
  achievements: any[];
};

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [content, setContent] = useState<ContentData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
      return;
    }

    if (status === "authenticated") {
      fetch("/api/cms")
        .then((res) => res.json())
        .then((data) => {
          setContent(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [status, router]);

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin text-salesforce" size={40} />
      </div>
    );
  }

  if (!content) return null;

  const skillCategoriesCount = Object.keys(content.skills).length;
  const totalSkills = Object.values(content.skills).reduce(
    (acc, arr) => acc + arr.length,
    0
  );

  const stats = [
    {
      label: "Experiences",
      value: content.experiences.length,
      icon: Briefcase,
      href: "/admin/experience",
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
    {
      label: "Skills",
      value: `${totalSkills} in ${skillCategoriesCount} categories`,
      icon: Code2,
      href: "/admin/skills",
      color: "text-purple-400",
      bg: "bg-purple-400/10",
    },
    {
      label: "Certifications",
      value: content.certs.length,
      icon: Award,
      href: "/admin/certifications",
      color: "text-green-400",
      bg: "bg-green-400/10",
    },
    {
      label: "Projects",
      value: content.projects.length,
      icon: FolderGit2,
      href: "/admin/projects",
      color: "text-orange-400",
      bg: "bg-orange-400/10",
    },
    {
      label: "Testimonials",
      value: content.testimonials.length,
      icon: MessageSquare,
      href: "/admin/testimonials",
      color: "text-pink-400",
      bg: "bg-pink-400/10",
    },
    {
      label: "Achievements",
      value: content.achievements.length,
      icon: Trophy,
      href: "/admin/achievements",
      color: "text-amber-400",
      bg: "bg-amber-400/10",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome Back, {session?.user?.name || "Admin"}
        </h1>
        <p className="text-gray-400">
          Here is what&apos;s happening with your portfolio today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <div className="glass p-6 rounded-2xl border border-white/5 hover:border-white/20 hover:bg-white/5 transition-all group flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400 mb-1">
                  {stat.label}
                </p>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </div>
              <div
                className={`w-12 h-12 rounded-full ${stat.bg} ${stat.color} flex items-center justify-center`}
              >
                <stat.icon size={24} />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <div className="glass p-8 rounded-2xl border border-white/5">
          <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="space-y-4">
            <Link
              href="/admin/profile"
              className="flex items-center justify-between p-4 rounded-xl border border-white/10 hover:bg-white/5 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-salesforce/20 text-salesforce flex items-center justify-center">
                  <Users size={18} />
                </div>
                <div>
                  <h3 className="text-white font-medium group-hover:text-salesforce transition-colors">
                    Update Bio
                  </h3>
                  <p className="text-xs text-gray-400">
                    Modify your about section text
                  </p>
                </div>
              </div>
              <span className="text-gray-400">&rarr;</span>
            </Link>
            <Link
              href="/admin/projects"
              className="flex items-center justify-between p-4 rounded-xl border border-white/10 hover:bg-white/5 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center">
                  <FolderGit2 size={18} />
                </div>
                <div>
                  <h3 className="text-white font-medium group-hover:text-purple-400 transition-colors">
                    Add Project
                  </h3>
                  <p className="text-xs text-gray-400">
                    Publish a new portfolio piece
                  </p>
                </div>
              </div>
              <span className="text-gray-400">&rarr;</span>
            </Link>
            <Link
              href="/admin/experience"
              className="flex items-center justify-between p-4 rounded-xl border border-white/10 hover:bg-white/5 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center">
                  <Briefcase size={18} />
                </div>
                <div>
                  <h3 className="text-white font-medium group-hover:text-blue-400 transition-colors">
                    Add Experience
                  </h3>
                  <p className="text-xs text-gray-400">
                    Add a new role to your timeline
                  </p>
                </div>
              </div>
              <span className="text-gray-400">&rarr;</span>
            </Link>
            <Link
              href="/admin/certifications"
              className="flex items-center justify-between p-4 rounded-xl border border-white/10 hover:bg-white/5 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center">
                  <Award size={18} />
                </div>
                <div>
                  <h3 className="text-white font-medium group-hover:text-green-400 transition-colors">
                    Add Certification
                  </h3>
                  <p className="text-xs text-gray-400">
                    Record a new certification
                  </p>
                </div>
              </div>
              <span className="text-gray-400">&rarr;</span>
            </Link>
          </div>
        </div>

        {/* Content Overview */}
        <div className="glass p-8 rounded-2xl border border-white/5">
          <h2 className="text-xl font-bold text-white mb-6">Content Overview</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg">
              <span className="text-gray-400 text-sm">Name</span>
              <span className="text-white font-medium">{content.personal.name}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg border-t border-white/5">
              <span className="text-gray-400 text-sm">Title</span>
              <span className="text-white font-medium">{content.personal.title}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg border-t border-white/5">
              <span className="text-gray-400 text-sm">Location</span>
              <span className="text-white font-medium">{content.personal.location}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg border-t border-white/5">
              <span className="text-gray-400 text-sm">Years Experience</span>
              <span className="text-white font-medium">{content.personal.stats?.yearsExp}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg border-t border-white/5">
              <span className="text-gray-400 text-sm">Education</span>
              <span className="text-white font-medium">{content.education.length} degrees</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
