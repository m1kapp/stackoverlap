export function Shortcuts() {
  return (
    <div className="max-w-sm mx-auto">
      <h2 className="text-lg font-bold text-center mb-2">Why Q E Z C?</h2>
      <p className="text-xs text-neutral-400 text-center mb-6">
        키보드 위치가 곧 화면 위치
      </p>

      {/* Mini keyboard */}
      <div className="flex flex-col items-center gap-1">
        {/* Number row */}
        <Row>
          <Key label="1" dim />
          <Key label="2" dim />
          <Key label="3" dim />
          <Key label="4" dim />
          <Key label="5" dim />
          <Key label="6" dim />
        </Row>
        {/* QWERTY row */}
        <Row indent={4}>
          <Key label="Q" accent corner="좌상" />
          <Key label="W" dim />
          <Key label="E" accent corner="우상" />
          <Key label="R" dim />
          <Key label="T" dim />
          <Key label="Y" dim />
        </Row>
        {/* ASDF row */}
        <Row indent={8}>
          <Key label="A" dim />
          <Key label="S" dim />
          <Key label="D" dim />
          <Key label="F" dim />
          <Key label="G" dim />
          <Key label="H" dim />
        </Row>
        {/* ZXCV row */}
        <Row>
          <Key label="shift" sub="⇧" dim w="w-10" />
          <Key label="Z" accent corner="좌하" />
          <Key label="X" dim />
          <Key label="C" accent corner="우하" />
          <Key label="V" dim />
          <Key label="B" dim />
        </Row>
        {/* Bottom row: modifiers */}
        <Row>
          <Key label="fn" dim w="w-8" />
          <Key label="ctrl" sub="⌃" dim w="w-10" />
          <Key label="opt" sub="⌥" modifier w="w-10" />
          <Key label="cmd" sub="⌘" modifier w="w-10" />
          <Key label="" dim w="w-20" />
          <Key label="cmd" sub="⌘" dim w="w-10" />
        </Row>
      </div>

      {/* Legend */}
      <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-1 text-xs text-neutral-400 max-w-[220px] mx-auto">
        <span>
          <kbd className="text-accent-light font-mono">Q</kbd> 상단 왼쪽
        </span>
        <span>
          <kbd className="text-accent-light font-mono">E</kbd> 상단 오른쪽
        </span>
        <span>
          <kbd className="text-accent-light font-mono">Z</kbd> 하단 왼쪽
        </span>
        <span>
          <kbd className="text-accent-light font-mono">C</kbd> 하단 오른쪽
        </span>
      </div>

      <p className="mt-3 text-[11px] text-neutral-500 text-center">
        <kbd className="font-mono text-neutral-400">⌥ opt</kbd>
        {" + "}
        <kbd className="font-mono text-neutral-400">⌘ cmd</kbd>
        {" + 키"}
      </p>
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
    <div className="flex gap-1" style={indent ? { paddingLeft: indent } : undefined}>
      {children}
    </div>
  );
}

function Key({
  label,
  sub,
  corner,
  accent,
  modifier,
  dim,
  w = "w-8",
}: {
  label: string;
  sub?: string;
  corner?: string;
  accent?: boolean;
  modifier?: boolean;
  dim?: boolean;
  w?: string;
}) {
  const hasTwoLines = !!sub;

  return (
    <div
      className={`${w} ${hasTwoLines ? "h-8" : "h-8"} rounded-md border flex flex-col items-center justify-center leading-none gap-px ${
        accent
          ? "border-accent/50 bg-accent/15 text-accent-light shadow-[0_0_8px_rgba(100,160,255,0.15)]"
          : modifier
            ? "border-neutral-500 bg-neutral-700/60 text-neutral-200"
            : dim
              ? "border-neutral-800/60 bg-neutral-900/40 text-neutral-600"
              : "border-neutral-700 bg-neutral-800/50 text-neutral-300"
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
