import {
  Watermark,
  Typewriter,
  Button,
  AppShell,
  AppShellHeader,
  AppShellContent,
} from "@m1kapp/kit";
import { OverlapDemo } from "./components/overlap-demo";
import { Install } from "./components/install";

export default function App() {
  return (
    <Watermark color="#0a0a0a" text="stackoverlap" speed={30}>
      <AppShell maxWidth={960} maxHeight={99999} className="m-0 mx-auto">
        <AppShellHeader className="dark:bg-neutral-950/80">
          <div className="flex items-center justify-between w-full">
            <span className="text-sm font-bold tracking-tight">
              StackOverlap
            </span>
            <div className="flex items-center gap-4 text-xs text-neutral-400">
              <a href="#install" className="hover:text-white transition-colors">
                Install
              </a>
              <a
                href="https://github.com/m1kapp/stackoverlap"
                className="hover:text-white transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </AppShellHeader>

        <AppShellContent>
          {/* Hero */}
          <section className="relative flex flex-col items-center justify-center px-6 pt-16 pb-12 md:pt-24 md:pb-16 overflow-hidden">
            <p className="mb-3 text-xs font-medium tracking-widest uppercase text-accent-light">
              macOS Window Manager
            </p>
            <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-center leading-tight">
              <span className="inline-flex items-baseline gap-2">
                Stack your{" "}
                <span className="inline-block w-[7ch] text-left">
                  <Typewriter
                    words={["agents", "views", "tools", "apps"]}
                    color="var(--color-accent)"
                    speed={90}
                  />
                </span>
              </span>
              <br />
              <span className="text-accent">overlap your views.</span>
            </h1>
            <p className="mt-4 max-w-lg text-center text-sm text-neutral-400 leading-relaxed">
              AI 에이전트 시대, 창은 정렬이 아니라 겹침이다.
              <br className="hidden sm:block" />
              4개 모서리에 2/3 크기로 배치하면 가운데가 모든 창의 교집합.
            </p>

            <div className="mt-6 flex gap-3">
              <Button href="#install" variant="light" shape="pill">
                Install
              </Button>
              <Button
                href="https://github.com/m1kapp/stackoverlap"
                variant="dark"
                shape="pill"
              >
                GitHub
              </Button>
            </div>

            {/* Interactive demo + keyboard */}
            <div className="mt-10 w-full max-w-xl">
              <OverlapDemo />
            </div>
          </section>

          {/* Install */}
          <section id="install" className="px-6 py-12 md:py-16">
            <Install />
          </section>

          {/* Footer */}
          <footer className="px-6 py-8 text-center text-xs text-neutral-500">
            <a
              href="https://m1k.app"
              className="hover:text-neutral-300 transition-colors"
            >
              m1k.app
            </a>
            {" / "}
            <a
              href="https://github.com/m1kapp/stackoverlap"
              className="hover:text-neutral-300 transition-colors"
            >
              GitHub
            </a>
          </footer>
        </AppShellContent>
      </AppShell>
    </Watermark>
  );
}
