import { getContentFresh } from "@/lib/content";
import { FolderGit2 } from "lucide-react";
import Link from "next/link";

export default async function ProjectsAdminPage() {
  const content = await getContentFresh();
  const projects = content.projects;

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Projects</h1>
          <p className="text-gray-400">Your portfolio projects. Edit them in the CMS tab.</p>
        </div>
        <Link href="/admin/cms" className="px-4 py-2 rounded-xl bg-salesforce text-white font-bold text-sm hover:bg-[#0081C0] transition-colors">
          Edit in CMS
        </Link>
      </div>

      <div className="space-y-4">
        {projects.length === 0 ? (
          <div className="glass p-12 rounded-2xl border border-white/5 text-center flex flex-col items-center justify-center">
            <FolderGit2 size={48} className="text-gray-600 mb-4" />
            <h3 className="text-white text-lg font-medium mb-1">No Projects Yet</h3>
            <p className="text-gray-500 text-sm">Add projects through the CMS editor.</p>
          </div>
        ) : (
          projects.map((project: any, idx: number) => (
            <div key={idx} className="glass p-6 rounded-2xl border border-white/5 hover:border-white/20 transition-colors">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                    {project.tag && (
                      <span className="px-2 py-1 bg-salesforce/20 text-salesforce text-[10px] font-bold uppercase rounded-md">
                        {project.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 line-clamp-2 mb-3">{project.description}</p>
                  {project.tech && (
                    <div className="flex gap-2 flex-wrap text-xs font-medium text-gray-500">
                      {project.tech.slice(0, 5).map((t: string) => <span key={t}>#{t}</span>)}
                      {project.tech.length > 5 && <span>+{project.tech.length - 5} more</span>}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
