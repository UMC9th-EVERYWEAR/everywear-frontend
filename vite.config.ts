import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path';

export default defineConfig(({ mode }) => {
	const isDev = mode === 'development';

	return{
		plugins: [
			tailwindcss(),
			tsconfigPaths(),
			
		],
		  resolve: {
			alias: [
				// 👇 [2] 여기가 핵심입니다! 
				// "@"는 src를 가리키지만, "@/public"은 진짜 public 폴더를 가리키도록 새치기 규칙을 만드는 겁니다.
				{ find: '@/public', replacement: path.resolve(process.cwd(), 'public') },
      
				// 원래 있던 설정 (@ -> src)
				// { find: '@', replacement: path.resolve(process.cwd(), 'src') },
			],
		},

		// 이 설정은 브라우저가 localhost로만 요청하게 해서 CORS를 피하고,
		// Vite가 대신 dev 백엔드로 요청을 전달하게 만들기 위한 장치
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
