import DevStackThread from "./modes/DevStackThread";
import DebateThread from "./modes/DebateThread";
import GalleryThread from "./modes/GalleryThread";

export default function ThreadRenderer({ thread }: any) {
  const mode = thread.metadata?.interaction_mode;

  switch (mode) {
    case "DEV_STACK":
      return <DevStackThread thread={thread} />;

    case "DEBATE":
      return <DebateThread thread={thread} />;

    case "SHOWCASE":
      return <GalleryThread thread={thread} />;

    default:
      return (
        <div className="border p-6">
          <h1 className="text-xl font-bold">{thread.title}</h1>
          <p className="mt-4 whitespace-pre-wrap">
            {thread.content}
          </p>
        </div>
      );
  }
}
