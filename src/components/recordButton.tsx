"use client";

import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Mic } from "lucide-react";

export function RecordButton() {
  const streamObject = useRef<MediaStream>(null);
  const isCertification = useRef<boolean>(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>();
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const onCertification = async () => {
    // await navigator.mediaDevices.getUserMedia({ audio: true }).then(
    //   (stream) => {
    //     isCertification.current = true;
    //     streamObject.current = stream;
    //     console.log("getUserMedia is supported");
    //   },
    //   () => {
    //     console.log("getUserMedia is not supported");
    //   }
    // );
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
      // 承認チェックのみ行う
      return;
    }
    // 録音開始
    const rec: MediaRecorder = new MediaRecorder(streamObject.current!);
    setMediaRecorder(rec);
    mediaRecorder?.start();
    console.log("録音開始");
    setIsRecording(true);
  };
  const onClickStop = () => {
    mediaRecorder?.stop();
    console.log("録音停止");
    setIsRecording(false);
  };
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={isRecording ? onClickStop : onClickRecord}
    >
      <Mic />
    </Button>
  );
}
