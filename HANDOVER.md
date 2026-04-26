# StackOverlap 이관계획서

## 서비스 개요

**StackOverlap** — AI 에이전트 시대를 위한 macOS 창 관리 도구

여러 AI 에이전트(Claude Code, Cursor, ChatGPT 등)를 동시에 돌릴 때, 창을 화면 모서리에 2/3 비율로 겹쳐서 배치하면 한 화면에서 여러 에이전트의 작업 상황을 한눈에 볼 수 있다. Rectangle/Spectacle의 "정렬"이 아닌, 의도적 "겹침(overlap)"이 핵심 컨셉.

## 컨셉

- **"Stack your agents, overlap your views"**
- 4개 창을 Q(좌상), E(우상), Z(좌하), C(하우) 모서리에 2/3 크기로 배치
- 창이 서로 겹치면서 가운데가 모든 창의 교집합 → 빠른 전환 가능
- 비율 조정 가능 (2/3, 3/4, 5/6 등)

## 현재 상태 (프로토타입 완성)

### 동작하는 파일 2개

**1. `winlayout` (핵심 스크립트)**
- 위치: `/Users/minho/bin/winlayout`
- 역할: 현재 포커스된 창을 지정 모서리 + 비율로 이동/리사이즈
- 기술: bash + JXA (JavaScript for Automation) + NSScreen API
- **멀티 모니터 자동 감지** (NSScreen.screens로 모든 모니터 좌표/해상도 동적 탐지, 현재 창 위치 기반 모니터 판별)
- 사용법: `winlayout [q|e|z|c] [비율]`

```bash
winlayout q       # 상단 왼쪽 2/3
winlayout e 3/4   # 상단 오른쪽 3/4
```

**2. `.skhdrc` (단축키 설정)**
- 위치: `/Users/minho/.skhdrc`
- 역할: 글로벌 단축키 → winlayout 스크립트 매핑
- 의존성: `skhd` (brew install koekeishiya/formulae/skhd)

| 단축키 | 동작 |
|--------|------|
| `⌥⌘Q` | 상단 왼쪽 2/3 |
| `⌥⌘E` | 상단 오른쪽 2/3 |
| `⌥⌘Z` | 하단 왼쪽 2/3 |
| `⌥⌘C` | 하단 오른쪽 2/3 |
| `⌥⌘⇧Q/E/Z/C` | 같은 위치 3/4 비율 |

### 모니터 감지 (자동)

JXA에서 `ObjC.import('AppKit')` → `$.NSScreen.screens`로 모든 모니터의 논리 좌표/해상도를 동적으로 가져옴. 현재 창의 position을 기준으로 어느 모니터에 있는지 판별 후 해당 모니터의 해상도에 맞춰 비율 계산.

검증된 환경:
- DELL U2719D 2560x1440 x2 (주 모니터 + 우측)
- iMac 1920x1080 (좌측, 4K 스케일링)

## 이관 후 해야 할 작업

### Phase 1: 프로젝트 구성

- [ ] `/Users/minho/IdeaProjects/m1kapp/stackoverlap/` 에 프로젝트 초기화
- [ ] git init + GitHub 리포 생성
- [ ] 기존 파일 복사 및 정리
  - `/Users/minho/bin/winlayout` → `bin/winlayout`
  - `/Users/minho/.skhdrc` → `skhdrc.example`
- [ ] `install.sh` 원클릭 설치 스크립트 작성
  - skhd 설치 (brew)
  - winlayout 스크립트 복사 (~/.local/bin/ 또는 /usr/local/bin/)
  - .skhdrc 생성 (기존 파일 있으면 병합)
  - skhd 서비스 시작
  - 접근성 권한 안내 출력
- [ ] `uninstall.sh` 제거 스크립트

### Phase 2: 안정화

- [ ] 다양한 모니터 조합 테스트 (단일 모니터, 듀얼, 트리플, 세로 모니터)
- [ ] 비율을 설정 파일(`~/.stackoverlap.conf`)에서 읽기
- [ ] 에러 핸들링 (창이 없을 때, 모니터 감지 실패 시)

### Phase 3: 랜딩페이지

- [ ] m1kapp 패턴에 맞게 Vite + React + Tailwind v4 프로젝트
- [ ] `@m1kapp/kit` 활용 (UI 컴포넌트)
- [ ] 페이지 구성:
  - 히어로: 4개 창이 겹쳐진 스크린샷/애니메이션
  - 컨셉: "AI 에이전트 시대, 창은 정렬이 아니라 겹침이다"
  - 설치 방법: `curl -sL ... | bash` 원라이너
  - 단축키 치트시트
  - GitHub 링크
- [ ] Vercel 배포

### Phase 4: (선택) 네이티브 앱

- [ ] Swift 메뉴바 앱으로 업그레이드
- [ ] skhd 의존성 제거 (앱 자체에서 글로벌 단축키 등록)
- [ ] 설정 UI (비율, 단축키 커스텀)
- [ ] DMG 패키징 + GitHub Releases 배포

## 기술 스택

| 구분 | 기술 |
|------|------|
| 핵심 스크립트 | bash + JXA (JavaScript for Automation) + NSScreen |
| 단축키 데몬 | skhd (brew) |
| 랜딩페이지 | Vite + React 19 + Tailwind v4 |
| UI 라이브러리 | @m1kapp/kit |
| 배포 | Vercel (랜딩), GitHub (스크립트) |
| 향후 | Swift + AppKit (네이티브 앱) |

## 설치 의존성

```bash
# 필수
brew install koekeishiya/formulae/skhd

# 스크립트
~/.local/bin/winlayout  (또는 /usr/local/bin/winlayout)

# 설정
~/.skhdrc

# 권한
시스템 설정 → 개인정보 보호 및 보안 → 손쉬운 사용 → skhd 허용
```

## 핵심 파일 원본 위치

| 파일 | 경로 |
|------|------|
| winlayout 스크립트 | `/Users/minho/bin/winlayout` |
| skhd 설정 | `/Users/minho/.skhdrc` |
| 이관계획서 | `/Users/minho/IdeaProjects/m1kapp/stackoverlap/HANDOVER.md` |

## 참고

- Rectangle (오픈소스): https://github.com/rxhanson/Rectangle
- Spectacle (deprecated): https://github.com/eczarny/spectacle
- skhd: https://github.com/koekeishiya/skhd
