import { useState, useEffect, useCallback } from "react";
import { MiniKeyboard } from "./mini-keyboard";

const CORNERS = [
  { key: "q", label: "Q", name: "상단 왼쪽", x: 0, y: 0 },
  { key: "e", label: "E", name: "상단 오른쪽", x: 1, y: 0 },
  { key: "z", label: "Z", name: "하단 왼쪽", x: 0, y: 1 },
  { key: "c", label: "C", name: "하단 오른쪽", x: 1, y: 1 },
] as const;

const COLORS = [
  "border-blue-400/40",
  "border-purple-400/40",
  "border-emerald-400/40",
  "border-amber-400/40",
];

const BG = [
  "bg-blue-500/20",
  "bg-purple-500/20",
  "bg-emerald-500/20",
  "bg-amber-500/20",
];

const LABELS = ["Claude Code", "Cursor", "ChatGPT", "Browser"];
const KEY_MAP = ["Q", "E", "Z", "C"];

// Per-key timing: press modifiers → press letter → release all → window appears
// Each keystroke takes KEY_DURATION, gap between keystrokes is KEY_GAP
const KEY_DURATION = 500; // how long keys are held
const KEY_GAP = 300;      // pause between keystrokes
const HOLD = 2200;        // hold all windows before fade out
const ONE_KEY = KEY_DURATION + KEY_GAP;
const CYCLE_TOTAL = ONE_KEY * 4 + HOLD + 600;

export function OverlapDemo() {
  const [active, setActive] = useState<Set<number>>(new Set());
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const [auto, setAuto] = useState(true);

  const runCycle = useCallback(() => {
    const order = [0, 1, 2, 3];
    const timers: ReturnType<typeof setTimeout>[] = [];

    order.forEach((i, idx) => {
      const base = idx * ONE_KEY;

      // 1) press opt + cmd
      timers.push(
        setTimeout(() => {
          setPressedKeys(new Set(["opt", "cmd"]));
        }, base),
      );

      // 2) +80ms: press letter key too
      timers.push(
        setTimeout(() => {
          setPressedKeys(new Set(["opt", "cmd", KEY_MAP[i]]));
        }, base + 80),
      );

      // 3) release all keys + place window
      timers.push(
        setTimeout(() => {
          setPressedKeys(new Set());
          setActive((prev) => new Set([...prev, i]));
        }, base + KEY_DURATION),
      );
    });

    // fade all out after hold
    timers.push(
      setTimeout(() => {
        setActive(new Set());
        setPressedKeys(new Set());
      }, ONE_KEY * 4 + HOLD),
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (!auto) return;
    const cleanup = runCycle();
    const interval = setInterval(runCycle, CYCLE_TOTAL);
    return () => {
      cleanup();
      clearInterval(interval);
    };
  }, [auto, runCycle]);

  const toggle = (key: string) => {
    setAuto(false);
    const i = KEY_MAP.indexOf(key);
    if (i === -1) return;
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const ratio = 2 / 3;

  const radii = [
    "rounded-tl-2xl rounded-tr-sm rounded-bl-sm rounded-br-sm",
    "rounded-tl-sm rounded-tr-2xl rounded-bl-sm rounded-br-sm",
    "rounded-tl-sm rounded-tr-sm rounded-bl-2xl rounded-br-sm",
    "rounded-tl-sm rounded-tr-sm rounded-bl-sm rounded-br-2xl",
  ];

  // keyboard only shows currently pressed keys, not accumulated windows
  const litKeys = new Set<string>(pressedKeys);

  return (
    <div>
      {/* Monitor frame */}
      <div className="relative aspect-[16/10] w-full rounded-2xl border border-neutral-700/60 bg-neutral-900 overflow-hidden shadow-2xl">
        {/* Menu bar */}
        <div className="h-[3.5%] bg-neutral-800/80 flex items-center px-3">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
            <div className="w-2 h-2 rounded-full bg-[#febc2e]" />
            <div className="w-2 h-2 rounded-full bg-[#28c840]" />
          </div>
        </div>

        {/* Desktop area */}
        <div className="relative w-full" style={{ height: "96.5%" }}>
          {CORNERS.map((corner, i) => (
            <div
              key={corner.key}
              className={`absolute border ${radii[i]} transition-all duration-500 ease-out ${COLORS[i]} ${BG[i]} ${
                active.has(i)
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95"
              }`}
              style={{
                width: `${ratio * 100}%`,
                height: `${ratio * 100}%`,
                left: corner.x === 0 ? 0 : `${(1 - ratio) * 100}%`,
                top: corner.y === 0 ? 0 : `${(1 - ratio) * 100}%`,
                transformOrigin: `${corner.x === 0 ? "left" : "right"} ${corner.y === 0 ? "top" : "bottom"}`,
              }}
            >
              <div className="p-2 md:p-3 text-[10px] md:text-xs font-mono text-neutral-300/70">
                {LABELS[i]}
              </div>
            </div>
          ))}

          {/* Center overlap indicator */}
          <div
            className={`absolute border border-dashed border-white/15 rounded-lg flex items-center justify-center pointer-events-none transition-opacity duration-500 ${
              active.size >= 2 ? "opacity-100" : "opacity-0"
            }`}
            style={{
              left: `${(1 - ratio) * 100}%`,
              top: `${(1 - ratio) * 100}%`,
              width: `${(2 * ratio - 1) * 100}%`,
              height: `${(2 * ratio - 1) * 100}%`,
            }}
          >
            <span className="text-[10px] md:text-xs text-white/30 font-mono">
              overlap
            </span>
          </div>
        </div>
      </div>

      {/* Keyboard below demo */}
      <div className="mt-6">
        <MiniKeyboard
          litKeys={litKeys}
          pressedKeys={pressedKeys}
          onToggle={toggle}
        />
      </div>
    </div>
  );
}
