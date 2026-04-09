import { Mail } from "lucide-react";

export default function MessagesAdminPage() {
  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">Inbox</h1>
        <p className="text-gray-400">Contact form submissions are delivered via Web3Forms to your email.</p>
      </div>

      <div className="glass p-12 rounded-2xl border border-white/5 text-center flex flex-col items-center justify-center">
        <Mail size={48} className="text-gray-600 mb-4" />
        <h3 className="text-white text-lg font-medium mb-1">Messages go to your email</h3>
        <p className="text-gray-500 text-sm max-w-md">
          The contact form uses Web3Forms to send messages directly to your inbox.
          Check your email for new submissions.
        </p>
      </div>
    </div>
  );
}
