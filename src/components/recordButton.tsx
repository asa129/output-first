"use client";

import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { CircleStop, Mic } from "lucide-react";

export function RecordButton({
  setMarkdown,
}: {
  setMarkdown: (markdown: string) => void;
}) {
  const streamObject = useRef<MediaStream>(null);
  const chunks = useRef<Blob[]>([]);
  const isCertification = useRef<boolean>(false);
  const mediaRecorder = useRef<MediaRecorder>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const onCertification = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    if (stream.active) {
      streamObject.current = stream;
      isCertification.current = true;
    }
    return isCertification.current;
  };
  const onClickRecord = async () => {
    // 承認されていない場合
    if (!isCertification.current) {
      // 承認チェック
      const certification = await onCertification();
      if (!certification) {
        return;
      }
    }
    await setMediaRecorder();
    // 録音開始
    mediaRecorder.current?.start();
    console.log("録音開始");
    setMarkdown("recording...");
    setIsRecording(true);
  };

  const setMediaRecorder = async () => {
    // MediaRecorderを設定
    mediaRecorder.current = new MediaRecorder(streamObject.current!);
    mediaRecorder.current.ondataavailable = (e: BlobEvent) => {
      console.log("🔴 ondataavailable fired! Time:", Date.now());
      chunks.current = [...chunks.current, e.data];
    };

    // 停止時に実行する(mediaRecorder.current?.stop()が呼ばれたときに実行)
    mediaRecorder.current.onstop = async () => {
      setIsRecording(false);
      await onDataTranscription();
      chunks.current = [];
      mediaRecorder.current = null;
    };
  };

  const onClickStop = async () => {
    mediaRecorder.current?.stop();
    console.log("録音停止");
    setIsRecording(false);
  };

  const onDataTranscription = async () => {
    // Blobを作成
    const blob = new Blob(chunks.current, {
      type: mediaRecorder.current?.mimeType,
    });
    // formDataを作成
    const formData = new FormData();
    formData.append("audio", blob!, "recording.webm");
    const response = await fetch("http://localhost:3000/api/transcri", {
      method: "POST",
      body: formData,
    });
    const transcription = await response.text();
    setMarkdown(transcription);
  };
  return (
    <>
      {isRecording ? (
        <>
          <Button variant="outline" size="icon" onClick={onClickStop}>
            <CircleStop />
          </Button>
        </>
      ) : (
        <Button variant="outline" size="icon" onClick={onClickRecord}>
          <Mic />
        </Button>
      )}
    </>
  );
}
