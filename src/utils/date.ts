/**
 * '2025.6.7' 또는 Date 객체를 '2025년 6월' 형식으로 변환합니다. -> 최근피팅내역 페이지에 사용
 */
export const formatToMonthGroup = (dateStr: string) => {
	const [year, month] = dateStr.split('.');
	return `${year}년 ${month}월`;
};
