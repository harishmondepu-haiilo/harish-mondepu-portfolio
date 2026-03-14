"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";
import Providers from "@/components/Providers";
import {
  LayoutDashboard,
  User,
  Briefcase,
  Code2,
  Award,
  FolderGit2,
  MessageSquare,
  LogOut,
  GraduationCap,
  Trophy,
} from "lucide-react";

const SIDEBAR_LINKS = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Profile", href: "/admin/profile", icon: User },
  { name: "Experience", href: "/admin/experience", icon: Briefcase },
  { name: "Skills", href: "/admin/skills", icon: Code2 },
  { name: "Certifications", href: "/admin/certifications", icon: Award },
  { name: "Projects", href: "/admin/projects", icon: FolderGit2 },
  { name: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
  { name: "Education", href: "/admin/education", icon: GraduationCap },
  { name: "Achievements", href: "/admin/achievements", icon: Trophy },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Don't show sidebar on login page
  if (pathname === "/admin/login") {
    return <Providers>{children}</Providers>;
  }

  return (
    <Providers>
    <div className="min-h-screen bg-[#0A0F1E] flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-[#111827] flex flex-col hidden md:flex shrink-0 fixed top-0 bottom-0 left-0 z-50">
        <div className="p-6">
          <Link href="/" className="inline-flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-full bg-salesforce text-white flex items-center justify-center font-heading font-bold text-sm">
              HM
            </div>
            <span className="font-heading font-semibold text-lg text-white">CMS Panel</span>
          </Link>

          <nav className="space-y-1">
            {SIDEBAR_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    active
                      ? "bg-salesforce text-white shadow-[0_0_15px_rgba(128,0,32,0.3)]"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <link.icon size={18} />
                  <span className="font-medium text-sm">{link.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-6">
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-3 px-4 py-3 rounded-xl w-full text-left text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors bg-white/5"
          >
            <LogOut size={18} />
            <span className="font-medium text-sm">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 p-8 min-h-screen overflow-y-auto w-full">
        {children}
      </main>
    </div>
    </Providers>
  );
}
