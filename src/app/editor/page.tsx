"use client";
import React from "react";
import { useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Page() {
  //   const markdown = "# Hi, **Pluto**!";
  const [markdown, setMarkdown] = useState<string>("");
  // return <Markdown>{markdown}</Markdown>;
  return (
    <div>
      <h1 data-testid="title">タイトル</h1>
      <textarea
        className="m-2 w-[700px] h-[300px] border border-gray-300"
        name=""
        id=""
        onChange={(e) => {
          setMarkdown(e.target.value);
        }}
      ></textarea>
      <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
    </div>
  );
}
