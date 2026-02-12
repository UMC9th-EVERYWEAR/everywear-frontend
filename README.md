![ppt](https://github.com/user-attachments/assets/474866a8-30cd-443a-a5a1-e708929e57c3)

# EVERYWEAR
AI로 입어보고 AI로 분석하는 스마트 피팅 앱




<h2> EVERYWEAR Member </h2>

<table align="center">
    <tr align="center">
      <td style="min-width: 150px;">
          <img width="200" height="300" alt="smurf2 2" src="https://github.com/user-attachments/assets/48fb3d3f-862c-454d-aef5-71a1a0c89646" />
              <br/>
              <b>최정인</b>
        </td>
      <td style="min-width: 150px;">
            <img width="200" height="300" alt="1-74285756 2" src="https://github.com/user-attachments/assets/b1315436-0bcd-48b7-bdae-bb80d3024d8c" />
              <br/>
              <b>김재범</b>           
        </td>
      <td style="min-width: 150px;">
          <img width="200" height="300" alt="smurf3 2" src="https://github.com/user-attachments/assets/0e3ee9c8-426a-45d1-9393-a19aed778ec1" />
              <br/>
              <b>김동환</b>
        </td>
    </tr>

</table>

----

## 📈 Performance Optimization Guide

## [👉 🚀 성능 최적화 해결 문서](https://www.notion.so/EVERY-WEAR-2f88e2de5f4a800baafcc63b07b5c215)

  <br/>
  <br/>


## 🛠 EVERYWEAR WEB 기술 스택 


| 카테고리 | 기술 스택 |
| --- | --- |
| **UI Library** | ![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=white&style=for-the-badge) |
| **Language** | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white&style=for-the-badge) |
| **Build Tool** | ![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white&style=for-the-badge) |
| **Routing** | ![React Router](https://img.shields.io/badge/React%20Router-CA4245?logo=reactrouter&logoColor=white&style=for-the-badge) |
| **Styling** | ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=white&style=for-the-badge) |
| **State & Networking** | ![TanStack Query](https://img.shields.io/badge/TanStack%20Query-FF4154?logo=reactquery&logoColor=white&style=for-the-badge) |
| **Client State Management** | ![Zustand](https://img.shields.io/badge/Zustand-443E38?style=for-the-badge) |
| **Utility** | ![clsx](https://img.shields.io/badge/clsx-000000?style=for-the-badge)|
| **Package Manager** | ![pnpm](https://img.shields.io/badge/pnpm-F69220?logo=pnpm&logoColor=white&style=for-the-badge) |
| **Formatting & Workflow** | ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=white&style=for-the-badge) ![Lefthook](https://img.shields.io/badge/Lefthook-000000?style=for-the-badge) |
| **Deployment** | ![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white&style=for-the-badge) |

<br />
<br />
<br />


# 👕 EVERYWEAR WEB Convention

> EVERYWEAR Web 팀의 협업 효율과 코드 품질 유지를 위한 컨벤션 문서입니다.  
> Git / 브랜치 / 커밋 / 코드 스타일 / 폴더 구조 전반에 대한 기준을 정의합니다.

---

##  Git Convention

### Git Flow 요약
- `main` : 항상 배포 가능한 상태 유지
- `develop` : 기능 통합 브랜치
- `feat/*` : 기능 단위 작업 브랜치

<details>
<summary>📌 Git Flow 상세 규칙</summary>

### main branch
- 언제나 **배포 가능한 안정 상태**만 유지합니다.
- 직접 커밋 및 작업을 금지합니다.

### develop branch
- 모든 기능 개발의 **통합 브랜치**입니다.
- 기능 개발은 항상 `develop`에서 분기한 feature 브랜치에서 진행합니다.
- 안정화 완료 시 `main` 브랜치로 병합하여 CI/CD를 통해 배포합니다.

### Feature branch
- `develop` 브랜치에서 분기하여 **기능 단위 개발**을 진행합니다.
- 작업 완료 후 반드시 `develop` 브랜치로 PR을 생성합니다.

</details>

---

## Commit Message Convention

### 기본 형식
```text
{type}({scope}): {subject}
```

- type: 작업 종류

- scope: 변경 범위 (선택)

- subject: 변경 요약 (필수)

<details>
<summary>📌 Commit Type & 작성 규칙</summary>

### Commit Type

- `feat` : 새로운 기능 추가
- `fix` : 버그 수정
- `refactor` : 코드 리팩토링
- `perf`: 성능 개선
- `style` : 코드 포맷팅, 세미콜론 누락 등 (비즈니스 로직 변경 없음)
- `chore` : 빌드 업무 수정, 패키지 매니저 수정, 설정 변경
- `docs` : 문서 수정
- `test` : 테스트 코드 추가 및 수정
- `design`: UI 등 디자인 변경
- `rename`: 파일 또는 폴더명 변경
- `remove`: 파일 또는 폴더 삭제
---

### 작성 규칙

- 커밋 메시지는 **현재형**으로 작성합니다.
- 첫 글자는 **소문자 사용을 권장**합니다.
- 끝에 마침표(`.`)는 붙이지 않습니다.
- subject는 **50자 이내**로 간결하게 작성합니다.
- 변경 내용을 명확히 드러내는 동사를 사용합니다.  

  - ❌ update, change  
  - ✅ add, remove, prevent, handle, refactor
</details> 

##  Branch Convention

### 기본 형식
```text
{type}/{scope}-{short-description}
```
<details> <summary>📌 브랜치 네이밍 규칙</summary>
규칙

- type은 소문자로 작성합니다.

- scope는 변경 범위를 짧고 명확하게 작성합니다.
(ex: web, admin, api, auth, evaluation)

- short-description은 kebab-case로 작성합니다.

- 한글, 한글 직역 변수명 사용을 금지합니다.

- 의미 없는 축약어 사용을 지양합니다.

</details>

##  Pull Request Rule

- `main`, `develop` 브랜치에 **직접 push 금지**
- 반드시 **브랜치를 생성한 후 Pull Request**를 생성합니다.
- Pull Request 병합을 위해서는 **2명 이상의 Approve**가 필요합니다.

<details>
<summary>📌 Pull Request 상세 가이드</summary>

- 포크 방식이 아닌 **브랜치 기반 PR**만 허용합니다.
- PR 템플릿 작성을 필수로 합니다.
- 기능 단위로 PR을 분리하여 작성합니다.
- 리뷰 코멘트는 존중하며, 논의가 필요한 경우 적극적으로 소통합니다.
- 머지 전 CI / 빌드 상태를 반드시 확인합니다.

</details>

---



## 🗂 프로젝트 구조


```text
src/
├── apis/                              # 서버 API 호출 레이어
│   ├── common/                        # axios instance, interceptor 등 공통 설정
│   ├── domain/                        # 도메인별 API wrapper (generated 위를 감싸는 레이어)
│   ├── generated/                     # swagger-typescript-api 생성물 (있다면)
│   └── index.ts                       # apis 진입점 / re-export
├── assets/
│   └── icons/                         # 아이콘/정적 리소스 엔트리(아이콘 전용)
│
├── components/                    # UI 컴포넌트
│
├── constants/                     # 상수 관리
│
├── hooks/                         # 커스텀 훅
│   ├── services/                  # 서버 통신 성격의 hook
│   └── domain/                    # 비즈니스 로직 성격의 hook
│
├── lib/                               # queryClient 세팅 
│
├── pages/                         # 라우팅 단위 페이지(View)
│   ├── onboarding/
│   ├── login/
│   ├── home/
│   ├── products/
│   ├── ai-fitting/
│   ├── closet/
│   ├── setting/
│   ├── recent-fitting/
│   └── not-found/
│
├── providers/                     # 전역 Provider
├── router/                        # 라우터 설정
├── store/                         # 전역 상태 관리
├── types/                         # 전역 타입 정의
├── utils/                         # 공통 유틸 함수
│
├── App.tsx                        # 앱 루트 컴포넌트
└── main.tsx                       # React DOM entry
```

---
## 🤝 Ground Rule
기본 원칙

- 질문을 주저하지 않습니다.


- 작업 내용은 상세히 공유합니다.
