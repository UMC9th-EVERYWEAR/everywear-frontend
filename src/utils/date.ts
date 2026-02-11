/**
 * ISO 형식(2026-02-07T...) 문자열을 받아 '2026년 2월' 형식으로 변환합니다.
 */
export const formatToMonthGroup = (dateStr: string) => {
	if (!dateStr) return '날짜 정보 없음';

	// ISO 형식이든 점(.) 형식이든 Date 객체로 변환 시도
	const date = new Date(dateStr.includes('.') ? dateStr.replace(/\./g, '-') : dateStr);
    
	// 날짜 변환이 실패할 경우를 대비한 예외 처리
	if (isNaN(date.getTime())) return '알 수 없는 날짜';

	const year = date.getFullYear();
	const month = date.getMonth() + 1; // getMonth는 0부터 시작하므로 +1

	return `${year}년 ${month}월`;
};
