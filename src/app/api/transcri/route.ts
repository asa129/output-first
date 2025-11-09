import { OpenAI } from "openai";
import fs from "fs";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.formData();
  const data: FormDataEntryValue | null = body.get("audio");

  const transcription = await onTranscribe(data as File);
  console.log(transcription);

  return new Response(transcription);
}

async function onTranscribe(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync("./audio.webm", buffer);
  const openai = new OpenAI();

  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream("./audio.webm"),
    model: "gpt-4o-transcribe",
  });

  // 終わったら一時ファイルを消す

  if (!transcription.text) {
    throw new Error("Transcription failed");
  }

  return transcription.text;
}
