import { NextRequest, NextResponse } from "next/server";

export const GET = (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const channel = searchParams.get("channel") || "everyone";

  const manifest = {
    name: "Kitten Digital Signage",
    short_name: "KDS",
    description: "Kitten Digital Signage Application",
    start_url: `/?channel=${channel}`,
    display: "fullscreen",
    background_color: "#ffffff",
    theme_color: "#171717",
    orientation: "landscape",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };

  return NextResponse.json(manifest);
};
