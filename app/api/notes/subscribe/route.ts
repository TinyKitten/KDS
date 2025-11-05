export const runtime = "nodejs";

import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();

  writer.write(
    new TextEncoder().encode("data: SSE connection established\n\n")
  );

  const interval = setInterval(() => {
    writer.write(
      new TextEncoder().encode(
        `data: Current time: ${new Date().toISOString()}\n\n`
      )
    );
  }, 1000);

  request.signal.addEventListener("abort", () => {
    clearInterval(interval);
    writer.close();
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
