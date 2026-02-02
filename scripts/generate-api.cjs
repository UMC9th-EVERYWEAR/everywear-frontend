const { generateApi } = require('swagger-typescript-api');
const path = require('path');
const fs = require('fs');

// [피드백 반영] 환경 변수(.env) 사용을 위한 설정
require('dotenv').config();

/**
 * [STEP 1] 백엔드 팀에게 Swagger JSON URL을 받아야한다!!
 * .env 파일에 SWAGGER_URL=http://백엔드-도메인/v3/api-docs 가 정의되어야 한다.
 */
const SWAGGER_URL = process.env.SWAGGER_URL;

if (!SWAGGER_URL) {
  console.error('❌ Error: .env 파일에 SWAGGER_URL이 설정되지 않았습니다.');
  process.exit(1);
}

generateApi({
  url: SWAGGER_URL,
  httpClientType: 'axios',  // 우리가 사용할 axios로 코드 생성 -> import axios from 'axios'가 자동으로 들어가 있고, 모든 통신 로직이 Axios 기반으로 짜여짐
  generateClient: true,  // API 호출 함수(클라이언트) 생성 여부 -> 단순히 데이터의 타입(Interface)만 만들 건지, 아니면 실제로 서버에 데이터를 달라고 요청하는'함수(Function)'까지 만들 건지 결정
  generateRouteTypes: false,
  generateResponses: true,
  toJS: false,             // true면 JS로, false면 TS로 생성 (우리는 TS!)
  extractRequestBody: true,
  defaultResponseType: 'any',
  enumNamesAsValues: true,   // API를 도메인별(Auth, Product 등)로 파일 분리 -> 백엔드에서 정의한 태그(Tag)나 도메인 기준으로 파일을 쪼개서 생성

  // API를 도메인별로 파일 분리
  modular: true,

  // [STEP 2] hooks를 활용해 스키마를 커스텀
  hooks: {
    onParseSchema: (originalSchema, parsedSchema) => {
      if (originalSchema?.type === 'json') {
        parsedSchema.content = 'Record<string, any>';// 실제 타입스크립트엔 json이 없으므로 any보다 명확한 Record 타입으로 처리
      }
      return parsedSchema;
    },
  },
})
  .then(({ files }) => {
    const outputPath = path.resolve(__dirname, '../src/apis/generated'); // 생성된 API 파일들이 저장될 위치

    // 폴더가 없으면 생성
    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath, { recursive: true });
    }

    files.forEach((file) => {

      // swagger-typescript-api 버전별 구조 전부 커버
      const realContent =
        file.content ??
        file.fileContent ??
        file.file?.content ??
        file.file?.fileContent ??
        '';

      const fileName = file.fileName.endsWith('.ts')
        ? file.fileName
        : `${file.fileName}.ts`;

      if (!realContent || typeof realContent !== 'string') {
        console.warn('⚠️ empty content:', fileName);
        return;
      }

      const fileContent = `// @ts-nocheck\n${realContent}`;

      fs.writeFileSync(
        path.join(outputPath, fileName),
        fileContent,
        'utf-8'
      );

      console.log(`✅ ${fileName} generated!`);
    });
  })
  .catch((e) => {
    console.error('❌ Generation Failed:', e);
  });

/**
 * [STEP 4] 실전 활용 방법
 * 스크립트 실행 후 `src/apis/generated/` 폴더에 도메인명.ts 파일이 생기면
 * 컴포넌트에서 다음과 같이 사용합니다:
 *
 * import { Auth } from '@/apis/generated/Auth';
 *
 * const authApi = new Auth();
 * const { data } = await authApi.loginUser({ email, password });
 */
