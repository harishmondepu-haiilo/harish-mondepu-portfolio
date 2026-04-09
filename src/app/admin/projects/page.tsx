import { FolderGit2 } from "lucide-react";
import Link from "next/link";

export default function ProjectsAdminPage() {
  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Projects</h1>
          <p className="text-gray-400">Edit your projects from the experience section.</p>
        </div>
      </div>
      <div className="glass p-12 rounded-2xl border border-white/5 text-center flex flex-col items-center justify-center">
        <FolderGit2 size={48} className="text-gray-600 mb-4" />
        <h3 className="text-white text-lg font-medium mb-1">Use the CMS editors</h3>
        <p className="text-gray-500 text-sm mb-6">Go back to dashboard and select the section you want to edit.</p>
        <Link href="/admin" className="px-6 py-2 rounded-xl bg-salesforce text-white font-bold text-sm hover:bg-[#0081C0] transition-colors">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
