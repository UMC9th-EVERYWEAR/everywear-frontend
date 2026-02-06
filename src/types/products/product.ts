export type CategoryKey = '전체' | '상의' | '아우터' | '기타' | '원피스' | '하의';

export const CATEGORY_QUERY_MAP = {
	전체: 'all',
	상의: 'top',
	아우터: 'outer',
	기타: 'etc',
	원피스: 'dress',
	하의: 'bottom',
} as const;


export type ResultType = 'FAIL' | 'SUCCESS';
