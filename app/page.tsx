import Link from "next/link";

export default function Home() {
  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">
        Contextual Chameleon 🦎
      </h1>

      <p className="mt-4 text-gray-600">
        AI-powered adaptive forum UI
      </p>

      <Link
        href="/thread"
        className="inline-block mt-6 text-blue-600 underline"
      >
        View Threads →
      </Link>
    </main>
  );
}
