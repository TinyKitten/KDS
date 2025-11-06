export const runtime = "nodejs";

import { NextRequest } from "next/server";
import { createRedisClient } from "../../utils/createRedisClient";

export async function GET(request: NextRequest) {
  const redisClient = await createRedisClient();
  const subscriber = redisClient.duplicate();
  subscriber.on("error", (err) => console.error(err));
  await subscriber.connect();

  const noteChannel = request.nextUrl.searchParams.get("channel") || "everyone";

  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();

  const listener = (message: string) =>
    writer.write(new TextEncoder().encode(message));
  await subscriber.subscribe(noteChannel, listener);

  request.signal.addEventListener("abort", async () => {
    writer.close();
    await subscriber.unsubscribe(noteChannel, listener);
  });

  return new Response(readable, {
    headers: {
      "X-Accel-Buffering": "no",
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
