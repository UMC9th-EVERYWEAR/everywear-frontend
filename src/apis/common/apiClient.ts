
import { Api } from '@/src/apis/generated';
import { ENV_CONFIG } from '@/src/constants/config';

export const apiClient = new Api({
	baseURL: ENV_CONFIG.SERVER.API_URL,
	withCredentials: true,
});
