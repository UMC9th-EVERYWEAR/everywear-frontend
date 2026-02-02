
import { Api } from '@/src/apis/generated';
import { ENV_CONFIG } from '@/src/constants/config';
import { axiosInstance } from './apiInstance';

export const apiClient = new Api({
	baseURL: ENV_CONFIG.SERVER.API_URL,
	withCredentials: true,
});


apiClient.instance = axiosInstance;


// swagger Api가 내부적으로 쓰는 axios를

// 우리가 interceptor 붙여둔 axiosInstance로 교체