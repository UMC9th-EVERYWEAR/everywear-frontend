const fs = require("fs");

const commitMsgFilePath = process.argv[2];
const commitMessage = fs.readFileSync(commitMsgFilePath, "utf8").trim();

// ✅ Merge commit은 검사 제외
if (commitMessage.startsWith("Merge ")) {
  process.exit(0);
}

const allowedTypes = [
  "feat",
  "fix",
  "refactor",
  "perf",
  "style",
  "chore",
  "docs",
  "test",
  "design",
  "rename",
  "remove",
];

// ✅ 첫 줄만 검사 (subject)
const subject = commitMessage.split("\n")[0].trim();

// ✅ type: subject
const commitRegex = /^([a-z]+):\s(.+)$/;
const match = subject.match(commitRegex);

if (!match) {
  console.error(`
❌ 커밋 실패!

✅ 커밋 메시지는 아래 형식이어야 합니다.
  <type>: <subject>

예시:
  feat: 추가 로그인 함수
  fix: 이미지 업로드 버그 수정
`);
  process.exit(1);
}

const type = match[1];
const title = match[2].trim();

// ✅ type 검사
if (!allowedTypes.includes(type)) {
  console.error(`
❌ 커밋 실패!

❗ "${type}"는 허용되지 않은 타입입니다.

✅ 허용 타입:
  ${allowedTypes.join(", ")}
`);
  process.exit(1);
}

// ✅ 제목 50자 제한
if (subject.length > 50) {
  console.error(`
❌ 커밋 실패!

❗ 제목은 최대 50자까지 가능합니다.
- 현재 길이: ${subject.length}자
- 제목: ${subject}
`);
  process.exit(1);
}

// ✅ 제목 마침표 금지
if (title.endsWith(".")) {
  console.error(`
❌ 커밋 실패!

❗ 제목은 마침표(.)로 끝나면 안됩니다.
`);
  process.exit(1);
}

console.log("✅ 커밋 메시지 통과!");
process.exit(0);
