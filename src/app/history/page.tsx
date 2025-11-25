import React from "react";
import { ExternalLink } from "lucide-react";
import { cookies } from "next/headers";

export default async function page() {
  const cookieStore = await cookies();
  const theme = cookieStore.get("record");
  const record = JSON.parse(theme?.value || "");
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="px-6 py-4">
        <div className="flex items-center gap-2">
          {/* Logo */}
          <h1 className="text-xl font-semibold text-slate-900">Recall Hub</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-6 py-12">
        <div className="w-full max-w-2xl space-y-8">
          <div className="bg-slate-200 rounded-lg border-l-4 border-slate-400 p-4">
            <p className="text-sm text-slate-600 mb-1">{record?.timestamp}</p>
            <a
              href={record?.url}
              className="text-lg font-semibold text-slate-900 flex items-center gap-2 hover:text-slate-700"
              target="_blank"
            >
              {record?.url}
              {/* {params.title} */}
              <ExternalLink className="size-4" />
            </a>
            <p>{record?.title}</p>
            <p>{record?.markdown}</p>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="px-6 py-8 text-center">
        <p className="text-sm text-slate-500">
          © 2025 Recall Hub. A tool for better learning.
        </p>
      </footer>
    </div>
  );
}
