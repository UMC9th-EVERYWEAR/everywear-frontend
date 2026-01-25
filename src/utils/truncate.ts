// utils/truncate.ts

/**
 * 긴 문자열을 지정된 길이로 자르고 말줄임표(...)를 붙입니다.
 * str : 원본 문자열
 * maxLength : 최대 문자열 길이 (기본값 : 100)
 * suffix : 말줄임표 모양 (기본값 : ...)
 */
export const truncate = (str: string, maxLength : number = 100, suffix: string = '...') => {
	if (!str) return '';
	if (str.length <= maxLength) return str;
    
	return str.slice(0, maxLength) + suffix;
};
