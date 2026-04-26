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
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        Install
      </h2>

      {/* Step 1: Open terminal */}
      <div className="mb-4">
        <p className="text-xs text-neutral-400 mb-2 flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-neutral-800 text-[10px] font-bold text-neutral-300">
            1
          </span>
          터미널을 열어주세요
          <kbd className="font-mono text-accent-light text-[11px]">
            ⌘ Space
          </kbd>
          <span>→ Terminal 검색</span>
        </p>
      </div>

      {/* Step 2: Terminal window with command */}
      <div className="mb-4">
        <p className="text-xs text-neutral-400 mb-2 flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-neutral-800 text-[10px] font-bold text-neutral-300">
            2
          </span>
          아래 명령어를 복사해서 붙여넣기하세요
        </p>

        {/* macOS Terminal window */}
        <div className="rounded-xl border border-neutral-700/60 bg-neutral-900 overflow-hidden shadow-lg">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-3 py-2 bg-neutral-800/80 border-b border-neutral-700/40">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            </div>
            <span className="text-[10px] text-neutral-500 mx-auto pr-8">
              Terminal
            </span>
          </div>

          {/* Terminal body */}
          <button
            onClick={copy}
            className="w-full text-left px-4 py-4 cursor-pointer hover:bg-neutral-800/30 transition-colors group"
          >
            <div className="flex items-start gap-2">
              <span className="text-emerald-400 font-mono text-sm shrink-0 select-none">
                $
              </span>
              <code className="font-mono text-sm text-neutral-200 break-all leading-relaxed">
                {INSTALL_CMD}
              </code>
            </div>
            <div className="mt-3 flex justify-end">
              <span
                className={`text-xs px-2 py-0.5 rounded transition-colors ${
                  copied
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-neutral-800 text-neutral-500 group-hover:text-neutral-300"
                }`}
              >
                {copied ? "Copied!" : "Click to copy"}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Step 3: Accessibility */}
      <div className="mb-4">
        <p className="text-xs text-neutral-400 mb-2 flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-neutral-800 text-[10px] font-bold text-neutral-300">
            3
          </span>
          접근성 권한을 허용해주세요
        </p>
        <p className="text-xs text-neutral-500 pl-7">
          시스템 설정 → 개인정보 보호 및 보안 → 손쉬운 사용 →{" "}
          <span className="text-neutral-300">skhd</span> 허용
        </p>
      </div>

      {/* Step 4: Try it */}
      <div>
        <p className="text-xs text-neutral-400 mb-2 flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-neutral-800 text-[10px] font-bold text-neutral-300">
            4
          </span>
          아무 창이나 포커스하고 눌러보세요
        </p>
        <div className="pl-7 grid grid-cols-2 gap-1.5 max-w-xs">
          {[
            { keys: "⌥ ⌘ Q", pos: "상단 왼쪽" },
            { keys: "⌥ ⌘ E", pos: "상단 오른쪽" },
            { keys: "⌥ ⌘ Z", pos: "하단 왼쪽" },
            { keys: "⌥ ⌘ C", pos: "하단 오른쪽" },
          ].map(({ keys, pos }) => (
            <div
              key={keys}
              className="flex items-center justify-between rounded-md bg-neutral-800/50 border border-neutral-800 px-2.5 py-1.5"
            >
              <kbd className="font-mono text-[11px] text-accent-light">
                {keys}
              </kbd>
              <span className="text-[10px] text-neutral-500">{pos}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
