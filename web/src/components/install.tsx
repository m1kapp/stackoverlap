import { useState } from "react";

const INSTALL_CMD = `curl -sL https://raw.githubusercontent.com/m1kapp/stackoverlap/main/install.sh | bash`;

export function Install() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(INSTALL_CMD);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto text-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">Install</h2>
      <p className="text-neutral-400 mb-8">
        Homebrew + skhd + 접근성 권한만 있으면 끝.
      </p>

      <button
        onClick={copy}
        className="group w-full rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-3 text-left font-mono text-sm hover:border-neutral-500 transition-colors cursor-pointer"
      >
        <div className="flex items-center justify-between gap-4">
          <code className="text-accent-light truncate">{INSTALL_CMD}</code>
          <span className="shrink-0 text-xs text-neutral-500 group-hover:text-neutral-300 transition-colors">
            {copied ? "Copied!" : "Copy"}
          </span>
        </div>
      </button>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
        <div className="rounded-lg border border-neutral-800 p-4">
          <div className="text-lg mb-2">1</div>
          <p className="text-neutral-400">skhd 자동 설치</p>
        </div>
        <div className="rounded-lg border border-neutral-800 p-4">
          <div className="text-lg mb-2">2</div>
          <p className="text-neutral-400">winlayout 스크립트 배치</p>
        </div>
        <div className="rounded-lg border border-neutral-800 p-4">
          <div className="text-lg mb-2">3</div>
          <p className="text-neutral-400">접근성 권한 허용</p>
        </div>
      </div>
    </div>
  );
}
