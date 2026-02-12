export const formatToMonthGroup = (dateStr: string) => {
	if (!dateStr) return '날짜 정보 없음';

	const date = new Date(dateStr.includes('.') ? dateStr.replace(/\./g, '-') : dateStr);
    
	if (isNaN(date.getTime())) return '알 수 없는 날짜';

	const year = date.getFullYear();
	const month = date.getMonth() + 1; 

	return `${year}년 ${month}월`;
};
