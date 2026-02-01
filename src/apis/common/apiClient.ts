import { ENV_CONFIG } from '@/src/constants/config';
import { createStorage, STORAGE_KEY, TOKEN_STORAGE_TYPE } from '@/src/utils/useStorage';
import axios, { type InternalAxiosRequestConfig } from 'axios';


interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry? : boolean; // 요청 재시도 여부를 나타내는 플래그
    // 만약 retry = true라면 이미 재시도한 걸로 간주하고 에러 반환
    // 서버에서 401 에러 발생 시 리프레시 토큰을 한 번 요청
    // 이때 리프레시 토큰 또한 만료된다면 리프레시 토큰을 다시 요청하는데
    // 이렇게 계속 요청 시 무한루프 발생 => retry 플래그로 해결 
}

// 전역변수로 refresh 요청의 Promise를 저장해서 중복 요청 방지
// 5개의 api를 동시에 호출할 때 액세스 토큰이 만료됐다고 하자.
// 첫 번째 api를 호출했을 때 리프레시 토큰을 요청하고 결과를 refreshPromise에 저장해두면
// 나머지 4개의 api는 refreshPromise에 이미 결과가 있으므로 리프레시 토큰 요청 X
// 액세스 토큰이 갱신되면 5개 api 모두 재호출, 성공 시 문제 해결이므로 refreshPromise = null 설정
let refreshPromise : Promise<string> | null = null;

// storage 타입만 바꿔주면 local / session 자동 전환
// 액세스토큰 스토리지 미리 지정
const accessTokenStorage = createStorage<string>(
	STORAGE_KEY.accessToken,
	TOKEN_STORAGE_TYPE,
);

export const axiosInstance = axios.create({
	// 모든 요청의 기본 주소 설정
	// https://api.myserver.com/v1/users에서 https://api.myserver.com를 의미
	baseURL: ENV_CONFIG.SERVER.API_URL, 
	// 서버에게 JSON 데이터 전송 알림	
	// 파일 이미지 업로드 등일 때는 multipart/form-data로 덮어씌워야 함.
	headers: {
		'Content-Type' : 'application/json',
	},
	// 백엔드에서 리프레시토큰을 쿠키에 담아서 관리하므로 
	// withCredentials = true로 설정하여 브라우저가 쿠키를 포함시켜서 서버로 가져감
	withCredentials: true, 
})

axiosInstance.interceptors.request.use(
	(config) => {
		// 리프레시 요청에는 Autorization 헤더를 넣지 않도록 통제
		if (config.url?.includes('/api/auth/refresh')) {
			return config;
		}

		const accessToken = accessTokenStorage.getItem();

		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`;
		}
		return config;
	},
	(error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		console.log('401 감지됨', error.config.url);
		const originalRequest : CustomInternalAxiosRequestConfig = error.config;

		if ( !error.response || error.response.status !== 401 || originalRequest._retry) {
			return Promise.reject(error);
		}

		if (originalRequest.url?.includes('/api/auth/refresh')) {
			accessTokenStorage.removeItem();
			window.location.href = '/login';
			return Promise.reject(error);
		}

		console.log('401 에러 감지: 토큰 갱신 시도');
		originalRequest._retry = true; // 재시도 플래그 설정

		try {
			// 갱신 요청 로직 시작
			if (!refreshPromise) {
				refreshPromise = (async () => {
					const { data } = await axiosInstance.post('/api/auth/refresh');

					const newAccessToken = data.result.accessToken;
					accessTokenStorage.setItem(newAccessToken);

					return newAccessToken;
				})()
					.finally(() => {
						refreshPromise = null;
					});
			}

			const newAccessToken = await refreshPromise;

			// 헤더 업데이트 후 재요청
			if (originalRequest.headers) {
				originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
			}
      
			return axiosInstance(originalRequest);

		} catch (refreshError) {
			console.error('토큰 갱신 실패:', refreshError);
			accessTokenStorage.removeItem();
			window.location.href = '/login';
			return Promise.reject(refreshError);
		}
	},
)
