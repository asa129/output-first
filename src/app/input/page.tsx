import { TextareaWithText } from "@/components/ui/textareaWithText";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  async function submit(formData: FormData) {
    "use server";
    const markdown = formData.get("message-2") as string;
    const cookie = await cookies();
    cookie.set("markdown", markdown);
    redirect("/input");
    // console.log(cookie.get("markdown"));
  }
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
          {/* Title */}
          <h2 className="text-4xl font-bold text-slate-900 text-center text-balance">
            What did you learn today?
          </h2>

          {/* Learning Source */}
          <div className="bg-slate-200 rounded-lg border-l-4 border-slate-400 p-4">
            <p className="text-sm text-slate-600 mb-1">Learning Source</p>
            <a
              href={`${params.url}`}
              className="text-lg font-semibold text-slate-900 flex items-center gap-2 hover:text-slate-700"
              target="_blank"
            >
              {params.title}
              <ExternalLink className="size-4" />
            </a>
          </div>

          {/* Form */}
          <form action={submit} className="space-y-6">
            <TextareaWithText />
            {/* Submit Button */}
            {/* <Button variant="outline" className="w-full"> */}
            <Button className="w-full">Submit</Button>
          </form>
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
