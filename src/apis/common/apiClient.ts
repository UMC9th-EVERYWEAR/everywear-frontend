
import { Api } from '@/src/apis/generated';
import { axiosInstance } from './apiInstance';

export const apiClient = new Api();


apiClient.instance = axiosInstance;


// swagger Api가 내부적으로 쓰는 axios를

// 우리가 interceptor 붙여둔 axiosInstance로 교체
