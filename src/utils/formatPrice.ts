// number, string 모두 처리
export const formatPrice = (price: number | string): string => {
	
	if (!price) return '0';
  
	// 숫자로 변환 후 toLocaleString() 적용
	// toLocaleString()은 3자리마다 콤마를 찍어줍니다.
	return Number(price).toLocaleString();
};
