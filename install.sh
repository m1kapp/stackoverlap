#!/bin/bash
# StackOverlap 설치 스크립트
# curl -sL https://raw.githubusercontent.com/m1kapp/stackoverlap/main/install.sh | bash

set -euo pipefail

RAW_BASE="https://raw.githubusercontent.com/m1kapp/stackoverlap/main"
INSTALL_DIR="$HOME/.local/bin"
WINLAYOUT_PATH="$INSTALL_DIR/winlayout"
SKHDRC_PATH="$HOME/.skhdrc"

say()  { printf "\033[1;36m==>\033[0m %s\n" "$*"; }
warn() { printf "\033[1;33m[!]\033[0m %s\n" "$*"; }
ok()   { printf "\033[1;32m[✓]\033[0m %s\n" "$*"; }

# 1) macOS 체크
if [[ "$(uname)" != "Darwin" ]]; then
    warn "StackOverlap 은 macOS 전용입니다."
    exit 1
fi

# 2) Homebrew 체크
if ! command -v brew >/dev/null 2>&1; then
    warn "Homebrew 가 필요합니다. https://brew.sh 에서 먼저 설치해 주세요."
    exit 1
fi

# 3) skhd 설치
if ! command -v skhd >/dev/null 2>&1; then
    say "skhd 설치 중..."
    brew install koekeishiya/formulae/skhd
else
    ok "skhd 이미 설치됨"
fi

# 4) winlayout 다운로드
say "winlayout → $WINLAYOUT_PATH"
mkdir -p "$INSTALL_DIR"
curl -sL "$RAW_BASE/bin/winlayout" -o "$WINLAYOUT_PATH"
chmod +x "$WINLAYOUT_PATH"
ok "winlayout 설치 완료"

# 5) PATH 안내
case ":$PATH:" in
    *":$INSTALL_DIR:"*) ;;
    *)
        warn "PATH 에 $INSTALL_DIR 이 포함돼 있지 않습니다."
        warn "쉘 설정 파일에 다음을 추가하세요:"
        warn "  export PATH=\"\$HOME/.local/bin:\$PATH\""
        ;;
esac

# 6) ~/.skhdrc 설치
if [[ -e "$SKHDRC_PATH" ]]; then
    BACKUP="$SKHDRC_PATH.backup.$(date +%Y%m%d%H%M%S)"
    say "기존 $SKHDRC_PATH → $BACKUP 으로 백업"
    cp "$SKHDRC_PATH" "$BACKUP"
fi
curl -sL "$RAW_BASE/skhdrc.example" | sed "s|__WINLAYOUT__|$WINLAYOUT_PATH|g" > "$SKHDRC_PATH"
ok "$SKHDRC_PATH 작성 완료"

# 7) skhd 서비스 시작/재시작
say "skhd 서비스 (재)시작"
skhd --stop-service 2>/dev/null || true
skhd --start-service 2>/dev/null || true

# 8) 마무리 안내
cat <<EOF

$(ok "설치 완료")

다음 단계:
  1. 시스템 설정 → 개인정보 보호 및 보안 → 손쉬운 사용
     에서 "skhd" 를 허용해 주세요.
  2. 어떤 창이든 포커스한 뒤 단축키를 눌러 보세요:

       ⌥⌘ Q / E / Z / C        2/3 비율로 모서리에 배치

문제가 있으면:  skhd --restart-service
설정 수정:      $SKHDRC_PATH

EOF
