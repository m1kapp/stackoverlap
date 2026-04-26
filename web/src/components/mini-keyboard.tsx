const ACTIVE_KEYS = new Set(["Q", "W", "E", "A", "S", "D", "Z", "X", "C"]);
const MOD_KEYS = new Set(["opt", "cmd"]);

export function MiniKeyboard({
  litKeys,
  pressedKeys,
  onToggle,
}: {
  litKeys: Set<string>;
  pressedKeys: Set<string>;
  onToggle: (key: string) => void;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      {/* Number row */}
      <Row>
        <Key label="1" />
        <Key label="2" />
        <Key label="3" />
        <Key label="4" />
        <Key label="5" />
        <Key label="6" />
      </Row>
      {/* QWERTY */}
      <Row indent={4}>
        <Key label="Q" corner="좌상" lit={litKeys.has("Q")} pressed={pressedKeys.has("Q")} onClick={() => onToggle("Q")} />
        <Key label="W" corner="상" lit={litKeys.has("W")} pressed={pressedKeys.has("W")} onClick={() => onToggle("W")} />
        <Key label="E" corner="우상" lit={litKeys.has("E")} pressed={pressedKeys.has("E")} onClick={() => onToggle("E")} />
        <Key label="R" />
        <Key label="T" />
        <Key label="Y" />
      </Row>
      {/* ASDF */}
      <Row indent={8}>
        <Key label="A" corner="좌" lit={litKeys.has("A")} pressed={pressedKeys.has("A")} onClick={() => onToggle("A")} />
        <Key label="S" corner="전체" lit={litKeys.has("S")} pressed={pressedKeys.has("S")} onClick={() => onToggle("S")} />
        <Key label="D" corner="우" lit={litKeys.has("D")} pressed={pressedKeys.has("D")} onClick={() => onToggle("D")} />
        <Key label="F" />
        <Key label="G" />
        <Key label="H" />
      </Row>
      {/* ZXCV */}
      <Row>
        <Key label="shift" sub="⇧" w="w-10" />
        <Key label="Z" corner="좌하" lit={litKeys.has("Z")} pressed={pressedKeys.has("Z")} onClick={() => onToggle("Z")} />
        <Key label="X" corner="하" lit={litKeys.has("X")} pressed={pressedKeys.has("X")} onClick={() => onToggle("X")} />
        <Key label="C" corner="우하" lit={litKeys.has("C")} pressed={pressedKeys.has("C")} onClick={() => onToggle("C")} />
        <Key label="V" />
        <Key label="B" />
      </Row>
      {/* Modifiers */}
      <Row>
        <Key label="fn" w="w-8" />
        <Key label="ctrl" sub="⌃" w="w-10" />
        <Key label="opt" sub="⌥" w="w-10" modifier pressed={pressedKeys.has("opt")} />
        <Key label="cmd" sub="⌘" w="w-10" modifier pressed={pressedKeys.has("cmd")} />
        <Key label="" w="w-20" />
        <Key label="cmd" sub="⌘" w="w-10" />
      </Row>
    </div>
  );
}

function Row({
  children,
  indent = 0,
}: {
  children: React.ReactNode;
  indent?: number;
}) {
  return (
    <div
      className="flex gap-1"
      style={indent ? { paddingLeft: indent } : undefined}
    >
      {children}
    </div>
  );
}

function Key({
  label,
  sub,
  corner,
  lit,
  pressed,
  modifier,
  onClick,
  w = "w-8",
}: {
  label: string;
  sub?: string;
  corner?: string;
  lit?: boolean;
  pressed?: boolean;
  modifier?: boolean;
  onClick?: () => void;
  w?: string;
}) {
  const isActive = ACTIVE_KEYS.has(label);
  const isMod = MOD_KEYS.has(label);

  let style: string;
  if (pressed) {
    style =
      "border-accent bg-accent/30 text-white shadow-[0_0_12px_rgba(100,160,255,0.3)] scale-95";
  } else if (lit && (isActive || isMod)) {
    style =
      "border-accent/50 bg-accent/15 text-accent-light shadow-[0_0_8px_rgba(100,160,255,0.15)]";
  } else if (modifier) {
    style = "border-neutral-600 bg-neutral-700/50 text-neutral-300";
  } else {
    style = "border-neutral-800/60 bg-neutral-900/40 text-neutral-600";
  }

  return (
    <div
      onClick={onClick}
      className={`${w} h-8 rounded-md border flex flex-col items-center justify-center leading-none gap-px transition-all duration-150 ${style} ${
        isActive ? "cursor-pointer" : ""
      }`}
    >
      {sub ? (
        <>
          <span className="text-[8px] leading-none opacity-70">{sub}</span>
          <span className="text-[8px] leading-none">{label}</span>
        </>
      ) : corner ? (
        <>
          <span className="text-[11px] leading-none">{label}</span>
          <span className="text-[6px] text-accent-light/50 leading-none">
            {corner}
          </span>
        </>
      ) : (
        <span className="text-[11px]">{label}</span>
      )}
    </div>
  );
}
