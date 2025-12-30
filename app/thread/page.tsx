import Link from "next/link";
import { threads } from "@/lib/fakeData";

export default function ThreadListPage() {
  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold mb-6">
        Threads
      </h1>

      <ul className="space-y-4">
        {threads.map((thread) => (
          <li key={thread.id} className="border p-4 rounded">
            <h2 className="text-lg font-semibold">
              {thread.title}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Mode: {thread.metadata.interaction_mode}
            </p>

            <Link
              href={`/thread/${thread.id}`}
              className="text-blue-600 underline mt-2 inline-block"
            >
              Open →
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
