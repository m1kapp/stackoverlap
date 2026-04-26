import { OGImage, loadPretendard } from "@m1kapp/kit/ogimage";
import { writeFileSync } from "fs";
import * as React from "react";

// @vercel/og's ImageResponse works in Node too
import { ImageResponse } from "@vercel/og";

async function main() {
  const fonts = await loadPretendard();

  const response = new ImageResponse(
    (
      <OGImage
        appName="StackOverlap"
        color="#6B9BF7"
        domain="stackoverlap.m1k.app"
        bg="dark"
        title="Stack your agents, overlap your views."
        sub="macOS window manager for the AI agent era"
      />
    ),
    { width: 1200, height: 630, fonts },
  );

  const buffer = Buffer.from(await response.arrayBuffer());
  writeFileSync("public/og.png", buffer);
  console.log("✓ public/og.png generated (1200x630)");
}

main().catch(console.error);
