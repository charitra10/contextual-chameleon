"use client";

import { useState } from "react";
import ThreadRenderer from "./ThreadRenderer";
import Link from "next/link";

export default function ThreadClientWrapper({ initialThread }: { initialThread: any }) {
 
  const [mode, setMode] = useState(initialThread.metadata?.interaction_mode || "DEV_STACK");

  return (
    <div>
     
      <div className="sticky top-0 z-50 bg-white border-b px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-slate-500 hover:text-black">← Back</Link>
          <div className="text-sm">
             <span className="text-slate-500">AI Logic: </span>
             <span className="font-medium">{initialThread.metadata?.explanation || "Default View"}</span>
          </div>
        </div>

      
        <select 
          value={mode} 
          onChange={(e) => setMode(e.target.value)}
          className="border border-slate-300 rounded px-3 py-1 text-sm bg-slate-50 hover:bg-white transition"
        >
          <option value="DEV_STACK">👨‍💻 Dev Stack</option>
          <option value="DEBATE">⚖️ Debate</option>
          <option value="SHOWCASE">🎨 Showcase</option>
        </select>
      </div>

      
      <div className="p-6">
        <ThreadRenderer thread={initialThread} forcedMode={mode} />
      </div>
    </div>
  );
}