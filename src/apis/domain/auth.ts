import { apiClient } from '@/src/apis/common/apiClient'


export const refreshToken = async () => {
	const { data } = await apiClient.refresh();
	return data.result?.accessToken;
};

export const logout = async () => {
	await apiClient.logout();
};

export const withdraw = async () => {
	await apiClient.withdraw();
};
