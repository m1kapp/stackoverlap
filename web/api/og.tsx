import { ImageResponse } from "@vercel/og";
import { OGImage, loadPretendard } from "@m1kapp/kit/ogimage";

export const config = { runtime: "edge" };

export default async function handler() {
  const fonts = await loadPretendard();

  return new ImageResponse(
    (
      <OGImage
        appName="StackOverlap"
        color="#6B9BF7"
        domain="stackoverlap.m1k.app"
        bg="dark"
        title="Stack your agents, overlap your views."
        sub="macOS 창 관리 도구 — AI 에이전트 시대, 창은 정렬이 아니라 겹침이다."
        badge="macOS"
      />
    ),
    {
      width: 1200,
      height: 630,
      fonts,
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
      },
    },
  );
}
