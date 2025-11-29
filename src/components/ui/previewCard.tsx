"use client";
import React from "react";
import { Card } from "./card";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function PreviewCard({ markdown }: { markdown: string }) {
  return (
    <Card>
      <div className="prose">
        <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
      </div>
    </Card>
  );
}
