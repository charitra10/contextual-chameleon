import { classifyThread } from "@/lib/ai";

export async function POST(req: Request) {
  const { title, content } = await req.json();

  const result = await classifyThread(title, content);

  return Response.json(result);
}
