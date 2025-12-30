import { threads } from "@/lib/fakeData";
import ModeOverride from "@/components/ModeOverride";
import { classifyThread } from "@/lib/ai";

export default async function ThreadPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const thread = threads.find((t) => t.id === id);

  if (!thread) {
    return (
      <main className="p-10">
        <h1 className="text-xl font-bold">Thread not found</h1>
      </main>
    );
  }

  
  const classification = await classifyThread(
    thread.title,
    thread.content
  );

  const enrichedThread = {
    ...thread,
    metadata: {
      interaction_mode: classification.interaction_mode,
      confidence: classification.confidence,
      explanation: classification.reason,
    },
  };

  return (
    <main className="p-10 space-y-4">
      <div className="text-sm text-gray-500">
        🧠 Classified by <strong>LLaMA 3.2 (Ollama)</strong>
        <br />
        Mode: {enrichedThread.metadata.interaction_mode}
        <br />
        Confidence: {enrichedThread.metadata.confidence}
        <br />
        Reason: {enrichedThread.metadata.explanation}
      </div>

      <ModeOverride thread={enrichedThread} />
    </main>
  );
}
