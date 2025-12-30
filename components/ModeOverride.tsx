"use client";

import { useState } from "react";
import ThreadRenderer from "./ThreadRenderer";

export default function ModeOverride({ thread }: any) {
  const [mode, setMode] = useState(
    thread.metadata.interaction_mode
  );

  const overriddenThread = {
    ...thread,
    metadata: {
      ...thread.metadata,
      interaction_mode: mode,
      override: true,
    },
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <label className="text-sm text-gray-600">
          Change view:
        </label>

        <select
          className="border px-2 py-1 rounded"
          value={mode}
          onChange={(e) => setMode(e.target.value)}
        >
          <option value="DEV_STACK">Developer</option>
          <option value="DEBATE">Debate</option>
          <option value="SHOWCASE">Showcase</option>
        </select>

        <span className="text-xs text-orange-600">
          (manual override)
        </span>
      </div>

      <ThreadRenderer thread={overriddenThread} />
    </div>
  );
}
