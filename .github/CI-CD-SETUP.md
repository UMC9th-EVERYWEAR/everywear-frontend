# CI/CD 자동 배포 설정 가이드

이 가이드는 Organization 원본 저장소의 main 브랜치 변경사항을 Fork 저장소에 자동으로 동기화하고 Vercel에 배포하는 CI/CD 파이프라인 설정 방법을 설명합니다.

## 🏗️ 시스템 아키텍처

```bash
┌─────────────────────────────────────────────────────────────────┐
│                      원본 저장소 (Organization)                    │
│                                                                   │
│  main 브랜치 Push/PR Merge                                         │
│           ↓                                                       │
│  [notify-forks.yml] 실행                                          │
│           ↓                                                       │
│  repository_dispatch 이벤트 전송 → Fork 저장소들                   │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                         Fork 저장소                               │
│                                                                   │
│  repository_dispatch 이벤트 수신                                  │
│           ↓                                                       │
│  [sync-and-deploy.yml] 실행                                       │
│           ↓                                                       │
│  1. Secrets 검증                                                  │
│  2. Upstream과 동기화                                             │
│  3. 빌드 & Vercel 배포                                            │
└─────────────────────────────────────────────────────────────────┘
```

## 📋 워크플로우 파일 설명

### 원본 저장소 (Organization Repo)

#### 1️⃣ `notify-forks.yml`

- **위치**: 원본 저장소의 `.github/workflows/`
- **트리거**:
  - `main` 브랜치에 직접 push
  - Pull Request가 `main`으로 merge
- **기능**:
  - Fork 저장소들에게 `repository_dispatch` 이벤트 전송
  - 이벤트 타입: `main-updated`
  - 변경사항 정보 (커밋 SHA, 브랜치명 등) 포함

#### 2️⃣ `test-secrets.yml` (Optional)

- **위치**: 원본 저장소의 `.github/workflows/`
- **트리거**: 수동 실행만 (`workflow_dispatch`)
- **기능**: Secrets 설정을 디버깅하기 위한 테스트 도구
- **사용 시점**: Secrets 설정 문제가 의심될 때만 수동 실행

### Fork 저장소

#### 3️⃣ `sync-and-deploy.yml`

- **위치**: Fork 저장소의 `.github/workflows/`
- **트리거**:
  1. `repository_dispatch` 이벤트 (원본 저장소로부터 알림)
  2. 수동 실행 (`workflow_dispatch`, force_sync 옵션 포함)
  3. 스케줄 실행 (백업용, 매일 UTC 00:00 = KST 09:00)

- **실행 순서**:

  ```text
  1. 🔍 Secrets 검증
     - 모든 필수 secrets 존재 여부 확인
     - 누락 시 즉시 실패 (명확한 에러 메시지)

  2. 📥 Fork 저장소 체크아웃

  3. 🔄 Upstream 변경사항 확인
     - 원본 저장소의 main 브랜치와 비교

  4. 📦 동기화 (변경사항이 있을 때만)
     - Upstream merge
     - Conflict 자동 해결 (.github/workflows는 fork 버전 유지)

  5. 🚀 빌드 & Vercel 배포 (변경사항이 있을 때만)
  ```

## 🔐 필수 Secrets 설정

### 원본 저장소 (Organization)에서 설정

원본 저장소의 `Settings` → `Secrets and variables` → `Actions`에서 설정:

| Secret 이름  | 설명                 | 예시            |
| ------------ | -------------------- | --------------- |
| `FORK_OWNER` | Fork 저장소의 소유자 | `your-username` |
| `FORK_REPO`  | Fork 저장소 이름     | `UMC9th-EVERYWEAR`       |

### Fork 저장소에서 설정

Fork 저장소의 `Settings` → `Secrets and variables` → `Actions`에서 설정:

| Secret 이름         | 설명                         | 필수 여부 |
| ------------------- | ---------------------------- | --------- |
| `UPSTREAM_OWNER`    | 원본 Organization 이름       | ✅ 필수   |
| `UPSTREAM_REPO`     | 원본 저장소 이름             | ✅ 필수   |
| `PAT_TOKEN`         | GitHub Personal Access Token | ✅ 필수   |
| `VERCEL_TOKEN`      | Vercel API 토큰              | ✅ 필수   |
| `VERCEL_ORG_ID`     | Vercel 조직 ID               | ✅ 필수   |
| `VERCEL_PROJECT_ID` | Vercel 프로젝트 ID           | ✅ 필수   |

#### Secrets 상세 설정 방법

##### 1. **UPSTREAM_OWNER & UPSTREAM_REPO**

```text
UPSTREAM_OWNER: your-organization-name
UPSTREAM_REPO: UMC9th-EVERYWEAR
```

##### 2. **PAT_TOKEN** (GitHub Personal Access Token)

> ⚠️ **보안 권장 사항**  
> Classic PAT(`repo` 전체 권한)는 권한 범위가 과도하여 보안 위험이 있으므로,  
> **Fine-grained personal access token 사용을 권장합니다.**

##### Fine-grained Personal Access Token 생성 방법 (권장)

1. GitHub → **Settings → Developer settings**
2. **Personal access tokens → Fine-grained tokens**
3. **Generate new token** 클릭
4. Token 설정
   - **Token name**: 예 `github-actions-sync-and-deploy`
   - **Expiration**: 필요에 맞게 설정 (권장: 30~90 days)
5. **Repository access**
   - `Only select repositories` 선택
   - 다음 저장소 선택:
     - Fork 저장소
     - 원본(Upstream) 저장소
6. **Permissions**
   - **Contents** → Read and write  
     (Upstream fetch, merge, push를 위해 필요)
   - **Actions** → Read and write  
     (GitHub Actions 워크플로우 실행 및 연계를 위해 필요)
7. **Generate token**
8. 생성된 토큰을 Fork 저장소의 GitHub Actions Secret `PAT_TOKEN`으로 저장


##### 3. **VERCEL_TOKEN**

Vercel에서 토큰 생성:

1. [Vercel Dashboard](https://vercel.com/) → Settings → Tokens
2. "Create Token" 클릭
3. 토큰 이름 입력 (예: `GitHub-Actions`)
4. Scope 선택 후 생성
5. 생성된 토큰을 복사하여 GitHub Secrets에 추가

##### 4. **VERCEL_ORG_ID & VERCEL_PROJECT_ID**

**방법 1: Vercel 대시보드에서 확인**

- Vercel Dashboard → 프로젝트 선택 → Settings → General
- Project ID와 Team ID 확인

**방법 2: Vercel CLI 사용**

```bash
# 프로젝트 디렉토리에서 실행
npx vercel link

# 생성된 파일에서 ID 확인
cat .vercel/project.json
```

출력 예시:

```json
{
  "projectId": "prj_xxxxxxxxxxxx",
  "orgId": "team_xxxxxxxxxxxx"
}
```

## 🚀 동작 원리

### 자동 동기화 플로우

```
1. 원본 저장소의 main 브랜치에 Push/PR Merge 발생
   ↓
2. notify-forks.yml 실행
   ↓
3. repository_dispatch 이벤트를 Fork 저장소로 전송
   ↓
4. Fork 저장소의 sync-and-deploy.yml 자동 실행
   ↓
5. Secrets 검증 ✅
   ↓
6. Upstream 변경사항 확인
   ↓
7. 변경사항이 있으면:
   - Upstream과 동기화 (자동 merge)
   - 빌드
   - Vercel 배포
   ↓
8. 완료 🎉
```

### 백업 메커니즘

**스케줄 실행 (Fallback)**:

- 매일 UTC 00:00 (KST 오전 9시)에 자동 실행
- `repository_dispatch` 이벤트가 누락되었을 경우를 대비

## 🛠️ 설정 및 테스트

### 1단계: 원본 저장소 설정

1. 원본 저장소에 `notify-forks.yml` 파일 확인
2. Secrets 설정:
   - `FORK_OWNER`
   - `FORK_REPO`

### 2단계: Fork 저장소 설정

1. Fork 저장소에 `sync-and-deploy.yml` 파일 복사
2. 모든 필수 Secrets 설정 (위 표 참고)
3. `.github/workflows/` 디렉토리 구조 확인

### 3단계: Secrets 검증

**Option A: 자동 검증 (권장)**

- `sync-and-deploy.yml`이 실행될 때마다 자동으로 검증됨
- 누락된 secrets가 있으면 명확한 에러 메시지와 함께 즉시 실패

**Option B: 수동 테스트**

1. Fork 저장소의 Actions 탭으로 이동
2. "Test Secrets Access" 워크플로우 선택
3. "Run workflow" 클릭
4. 로그에서 모든 secrets가 ✅로 표시되는지 확인

### 4단계: 첫 동기화 테스트

1. Fork 저장소의 Actions 탭으로 이동
2. "Sync from Organization Repo and Deploy to Vercel" 선택
3. "Run workflow" 클릭
4. 필요시 "Force sync" 체크박스 선택
5. 워크플로우 실행 로그 확인

### 5단계: 자동화 확인

1. 원본 저장소의 main 브랜치에 테스트 커밋 push
2. Fork 저장소의 Actions 탭에서 자동 실행 확인
3. Vercel 대시보드에서 배포 상태 확인

## 🔍 로그 및 모니터링

### GitHub Actions 로그 확인

**Fork 저장소**:

1. Actions 탭
2. 최근 워크플로우 실행 클릭
3. 각 단계별 로그 확인

**주요 로그 포인트**:

- ✅ Secrets 검증 성공 여부
- 📊 Upstream과의 커밋 해시 비교
- 🔄 동기화 여부 (has_updates)
- 🚀 Vercel 배포 결과

### Vercel 배포 확인

1. [Vercel Dashboard](https://vercel.com/)
2. 프로젝트 선택
3. Deployments 탭에서 최근 배포 확인

## 🐛 문제 해결

### 1. Secrets 관련 문제

**증상**: 워크플로우가 즉시 실패하고 "Missing required secrets" 에러 발생

**해결 방법**:

```bash
# 에러 메시지 예시
🚨 Missing required secrets: PAT_TOKEN VERCEL_TOKEN
Please configure these secrets in repository settings.
```

- 에러 메시지에 표시된 secrets를 Fork 저장소에 추가
- 설정 후 "Run workflow"로 재실행

**디버깅 도구**:

- Actions 탭 → "Test Secrets Access" 워크플로우 수동 실행
- 각 secret의 존재 여부를 개별적으로 확인

### 2. PAT_TOKEN 권한 문제

**증상**: "Permission denied" 또는 "Resource not accessible" 에러

**해결 방법**:

1. PAT_TOKEN 재생성 시 권한 확인:
   - (Fine-grained PAT 권장)
     - Contents: Read and write
     - Actions: Read and write
2. 토큰 만료 여부 확인
3. 새 토큰으로 교체

### 3. Upstream 동기화 실패

**증상**: Merge conflict 에러

**해결 방법**:

- `.github/workflows/` 충돌은 자동으로 Fork 버전 유지
- 다른 파일의 충돌은 수동 해결 필요:
  ```bash
  git fetch upstream
  git merge upstream/main
  # 충돌 해결 후
  git push origin main
  ```

### 4. Vercel 배포 실패

**증상**: 빌드는 성공하지만 배포가 실패

**해결 방법**:

1. Vercel 토큰 권한 확인
2. Project ID와 Org ID 재확인
3. Vercel 대시보드에서 프로젝트 설정 확인
4. 로그에서 구체적인 에러 메시지 확인

### 5. 자동 트리거가 작동하지 않음

**증상**: 원본 저장소에 push해도 Fork가 동기화되지 않음

**체크리스트**:

- [ ] 원본 저장소에 `notify-forks.yml`이 있는가?
- [ ] 원본 저장소의 `FORK_OWNER`, `FORK_REPO` secrets가 올바른가?
- [ ] Fork 저장소에 `sync-and-deploy.yml`이 있는가?
- [ ] Fork 저장소의 Actions가 활성화되어 있는가?

**임시 해결**:

- Fork 저장소에서 "Run workflow" 수동 실행
- 스케줄 실행 대기 (다음 날 오전 9시)

## ⚙️ 커스터마이징

### 스케줄 간격 변경

`sync-and-deploy.yml` 파일 수정:

```yaml
schedule:
  # 현재: 매일 한 번 (UTC 00:00 = KST 09:00)
  - cron: '0 0 * * *'

  # 예시: 다른 주기
  - cron: '0 */6 * * *' # 6시간마다
  - cron: '0 9,18 * * *' # 매일 오전 9시, 오후 6시 (UTC 기준)
  - cron: '0 0 * * 1' # 매주 월요일
```

### 추가 빌드 단계

필요한 경우 빌드 전에 테스트나 린팅 추가:

```yaml
- name: Run tests
  if: steps.check-updates.outputs.has_updates == 'true'
  run: pnpm test

- name: Run linting
  if: steps.check-updates.outputs.has_updates == 'true'
  run: pnpm lint
```

### Conflict 해결 전략 수정

다른 디렉토리의 충돌도 자동 해결하려면:

```yaml
# .github/workflows 외에 다른 폴더도 fork 버전 유지
if git diff --name-only --diff-filter=U | grep -q "^config/"; then
git checkout --ours config/
git add config/
fi
```

## 📚 추가 자료

### GitHub Actions 관련

- [repository_dispatch 이벤트 문서](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#repository_dispatch)
- [GitHub Actions Secrets 관리](https://docs.github.com/en/actions/security-guides/encrypted-secrets)

### Vercel 관련

- [Vercel CLI 문서](https://vercel.com/docs/cli)
- [Vercel GitHub Actions](https://vercel.com/guides/how-can-i-use-github-actions-with-vercel)

## 🎉 완료!

이제 다음과 같은 자동화 파이프라인이 구축되었습니다:

✅ 원본 저장소의 main 브랜치 변경 → Fork 저장소 자동 동기화  
✅ 자동 빌드 및 Vercel 배포  
✅ Secrets 자동 검증으로 에러 조기 발견  
✅ 백업 스케줄 실행으로 안정성 확보  
✅ 수동 실행 옵션으로 유연한 제어

원본 저장소가 업데이트될 때마다 Fork 저장소가 자동으로 최신 상태를 유지하며, Vercel에 즉시 배포됩니다! 🚀