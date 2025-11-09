"use client";

import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { RecordButton } from "../recordButton";
import FakeRecordingWave from "../fakeRecordingWave";
import { Card } from "@/components/ui/card";

export function TextareaWithText() {
  const [markdown, setMarkdown] = useState<string>("");
  const isRecording: string = "recording...";

  return (
    <div className="grid w-full gap-3">
      <Tabs defaultValue="edit" className="w-full">
        <TabsList>
          <TabsTrigger value="edit">Edit</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="edit">
          <div className="relative">
            <Textarea
              placeholder={
                markdown === isRecording ? "" : "Type your message here."
              }
              id="message-2"
              onChange={(e) => {
                setMarkdown(e.target.value);
              }}
              value={markdown === isRecording ? "" : markdown}
              className="pr-12 h-[calc(50vh-150px)]"
              name="message-2"
            />
            {markdown === isRecording && (
              <div className="absolute bottom-2 left-2">
                <FakeRecordingWave />
              </div>
            )}
            <div className="absolute bottom-2 right-5">
              <RecordButton setMarkdown={setMarkdown} />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="preview">
          <Card>
            <div className="prose">
              <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
