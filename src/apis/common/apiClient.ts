// apiClient.ts는 axiosInstance와 swagger Api를 연결하는 역할을 한다.

/* 사용 예시
import { apiClient } from '@/apis/common/apiClient';

export const getProducts = async () => {
  const res = await apiClient.getProducts();
  return res.data.result;
};
*/

// import { Api } from '@/apis/generated';
import { axiosInstance } from '@/src/apis/common/apiInstance';

export const apiClient = new Api({
	axiosInstance,
});
