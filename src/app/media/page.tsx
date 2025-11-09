"use client";
import { useEffect, useState, use } from "react";
import "../atodekesu.css";
// import fs from "fs";

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const filters = use(searchParams);
  if (filters !== null || filters !== undefined) {
    const title: string | string[] | undefined = filters!.title;
    const url: string | string[] | undefined = filters!.url;
    console.log(title);
    console.log(url);
    if (url!.includes("youtube")) {
      console.log("youtube");
    }
    if (url!.includes("udemy")) {
      console.log("udemy");
    }
  }

  const [isSupported, setIsSupported] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>();
  const [stoped, setStoped] = useState(false);
  const [audioURL, setAudioURL] = useState<string>();
  const [clipName, setClipName] = useState<string>();
  const [chunks, setChunks] = useState<BlobPart[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [blob, setBlob] = useState<Blob>();
  const [transcription, setTranscription] = useState<string>();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(
      async (stream) => {
        setIsSupported(true);
        const rec = new MediaRecorder(stream);
        setMediaRecorder(rec);
        console.log("getUserMedia is supported");

        rec.ondataavailable = async (e: BlobEvent) => {
          console.log("🔴 ondataavailable fired! Time:", Date.now());
          setChunks((prev) => [...prev, e.data]);
        };
      },
      () => {
        setIsSupported(false);
        console.log("getUserMedia is not supported");
      }
    );
  }, []);

  const onClickRecord = () => {
    mediaRecorder?.start();
    console.log(mediaRecorder?.state);
    console.log("Recorder started.");
    setIsRecording(true);
  };

  const onClickStop = () => {
    console.log("🟢 Stop clicked! Time:", Date.now());
    mediaRecorder?.stop();
    console.log(mediaRecorder?.state);
    console.log("Recorder stopped.");
    setStoped(true);
    setIsRecording(false);
  };

  useEffect(() => {
    if (stoped && chunks.length > 0) {
      onDataAvailable();
    }
  }, [chunks]);

  const onDataAvailable = () => {
    console.log("🟡 onDataAvailable called! Time:", Date.now());
    console.log("chunks length:", chunks.length);
    console.log("chunks:", chunks);
    console.log("Last data to read (after MediaRecorder.stop() called).");

    const clipName = prompt(
      "Enter a name for your sound clip?",
      "My unnamed clip"
    );

    if (clipName === null) {
      setClipName("My unnamed clip");
    } else {
      setClipName(clipName);
    }

    const blob = new Blob(chunks, { type: mediaRecorder?.mimeType });

    const audioURL = window.URL.createObjectURL(blob);
    setBlob(blob);
    setAudioURL(audioURL);
    console.log("recorder stopped");
  };

  const onClickTranscribe = async () => {
    const formData = new FormData();
    formData.append("audio", blob!, "recording.webm");
    const buffer = Buffer.from(await blob!.arrayBuffer());
    // fs.writeFileSync("./audio.webm", buffer);

    const response = await fetch("http://localhost:3000/api/transcri", {
      method: "POST",
      body: formData,
    });

    const transcription = await response.text();
    setTranscription(transcription);
  };

  if (!isSupported) {
    return <div>getUserMedia is not supported</div>;
  }

  return (
    <div>
      <div className="wrapper">
        <header>
          <h1 data-testid="title">Web dictaphone</h1>
        </header>
        <section className="main-controls">
          <canvas className="visualizer" height="60px"></canvas>
          <div id="buttons">
            <button className="record" onClick={onClickRecord}>
              Record
            </button>
            <button className="stop" onClick={onClickStop}>
              Stop
            </button>
          </div>
        </section>
        {isRecording ? "Recording" : "Not Recording"}
        <section className="sound-clips">
          {stoped ? (
            <article className="clip">
              <audio src={audioURL} controls></audio>
              <p>{clipName}</p>
              <button className="delete" onClick={() => setStoped(false)}>
                Delete
              </button>
              <button onClick={onClickTranscribe}>Transcribe</button>
            </article>
          ) : (
            <></>
          )}
        </section>
        {transcription != null && <div>文字起こし：{transcription}</div>}
      </div>
    </div>
  );
}
