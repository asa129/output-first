import React from "react";
import { ExternalLink } from "lucide-react";
import { cookies } from "next/headers";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Card } from "@/components/ui/card";
import PreviewCard from "@/components/ui/previewCard";

export default async function page() {
  const cookieStore = await cookies();
  const theme = cookieStore.get("record");
  const record = JSON.parse(theme?.value || "");
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-6 py-12">
        <div className="w-full max-w-2xl space-y-8">
          <Dialog>
            <DialogTrigger>
              <div className="bg-slate-200 rounded-lg border-l-4 border-slate-400 p-4 text-left">
                <p className="text-sm text-slate-600 mb-1">
                  {new Date(record?.timestamp).getUTCFullYear() +
                    "/" +
                    (new Date(record?.timestamp).getUTCMonth() + 1) +
                    "/" +
                    new Date(record?.timestamp).getUTCDate() +
                    " " +
                    new Date(record?.timestamp).getHours() +
                    ":" +
                    new Date(record?.timestamp).getMinutes() +
                    ":" +
                    new Date(record?.timestamp).getSeconds()}
                </p>
                <a
                  href={record?.url}
                  className="text-lg font-semibold text-slate-900 flex gap-2 hover:text-slate-700"
                  target="_blank"
                >
                  {record?.url}
                  {/* {params.title} */}
                  <ExternalLink className="size-4" />
                </a>
                <p>{record?.title}</p>
                <p>
                  {record?.markdown ? record?.markdown.substring(0, 100) : ""}
                </p>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader className="">
                <DialogTitle>{record?.title}</DialogTitle>
                <DialogDescription>
                  <PreviewCard markdown={record?.markdown} />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  );
}
