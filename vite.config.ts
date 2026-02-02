import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(({ mode }) => {
	const isDev = mode === 'development';

	return{
		plugins: [
			tailwindcss(),
			tsconfigPaths(),
		],


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
