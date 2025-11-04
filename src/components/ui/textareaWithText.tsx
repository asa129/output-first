"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function TextareaWithText() {
  const [markdown, setMarkdown] = useState<string>("");
  return (
    <div className="grid w-full gap-3">
      <Label htmlFor="message-2">Your Message</Label>
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Textarea
            placeholder="Type your message here."
            id="message-2"
            onChange={(e) => {
              setMarkdown(e.target.value);
            }}
            value={markdown}
          />
          <p className="text-muted-foreground text-sm">
            Your message will be copied to the support team.
          </p>
        </TabsContent>
        <TabsContent value="password">
          <div className="prose">
            <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
