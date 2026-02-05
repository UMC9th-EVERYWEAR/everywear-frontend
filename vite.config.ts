import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path'
import { fileURLToPath } from 'url' // 👈 [1] 이 줄 추가

// [2] ESM 환경에서 __dirname 구현하기
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig(({ mode }) => {
	const isDev = mode === 'development';

	return {
		plugins: [
			tailwindcss(),
			tsconfigPaths(),
		],

		// 👇 [3] 중요! alias는 반드시 resolve 객체 안에 있어야 합니다.
		resolve: {
			alias: [
				// "@/public"은 진짜 public 폴더를 가리키도록 설정
				{ find: '@/public', replacement: path.resolve(__dirname, 'public') },
                
				// "@"는 src 폴더를 가리키도록 설정
				{ find: '@', replacement: path.resolve(__dirname, 'src') },
			],
		},

		server: {
			...(isDev && {
				proxy: {
					'/api': {
						target: 'http://dev-app-alb-160354142.ap-northeast-2.elb.amazonaws.com',
						changeOrigin: true,
						secure: false,
						ws: false,
					},
				},

				hmr: {
					protocol: 'ws',
					host: 'localhost',
					port: 5173,
				},
			}),
		},
	};
});
