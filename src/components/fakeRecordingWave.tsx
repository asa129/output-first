"use client";
import React, { useEffect, useState } from "react";

export default function FakeRecordingWave() {
  const [bars, setBars] = useState(Array(80).fill(5));

  useEffect(() => {
    const interval = setInterval(() => {
      // ランダムに高さを変える
      setBars((prev) => prev.map(() => Math.random() * 30 + 5));
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-end gap-[2px]">
      {bars.map((height, i) => (
        <div
          key={i}
          className="w-[2px] bg-[#333] rounded-[2px] transition-all duration-150 ease-linear"
          style={{ height: `${height}px` }}
        />
      ))}
    </div>
  );
}
