import type { ReviewData } from '@/src/types/ai-fitting/data';

export const MOCK_REVIEW_DATA: ReviewData = {

	summary: '구매자들의 85%가 사이즈가 정사이즈라고 응답했습니다. 주로 재질의 탄탄함과 마감 처리에 대한 만족도가 높으며, 기장은 키 175cm 기준 발목을 살짝 덮는 정도입니다. 배송은 평균 2일 이내로 빠른 편입니다.',
  
	keywords: [
		{ id: 1, label: '핏이 예뻐요' },
		{ id: 2, label: '신축성 좋음' },
		{ id: 3, label: '재질이 탄탄함' },
		{ id: 4, label: '가성비 최고' },
	],

	reviews: [
		{
			id: 101,
			rating: 5,
			date: '2026-01-24',
			productName: '와이드 데님 팬츠',
			productSize: 'L',
			gender: 'Male',
			buyerHeight: 178,
			buyerWeight: 72,
			content: '인생 바지 찾았습니다. 허벅지가 좀 있는 편인데 와이드하게 떨어져서 핏이 너무 예쁘네요. 기장도 수선 없이 딱 맞습니다. 재구매 의사 있습니다!',
			images: [
				{ id: 1, imgUrl: 'https://lh3.googleusercontent.com/d/1eiIWEzT2SD1mdYZC1uDOko1vKCyMd5w-' },
				{ id: 2, imgUrl: 'https://lh3.googleusercontent.com/d/1eiIWEzT2SD1mdYZC1uDOko1vKCyMd5w-' },
			],
		},
		{
			id: 102,
			rating: 4,
			date: '2026-01-23',
			productName: '와이드 데님 팬츠',
			productSize: 'M',
			gender: 'Female',
			buyerHeight: 162,
			buyerWeight: 55,
			content: '생각보다 기장이 조금 길어서 굽 있는 신발이랑 신어야 할 것 같아요. 그래도 색감은 화면이랑 똑같고 예쁩니다. 허리는 밴딩이라 편해요.',
			images: [], // 이미지가 없는 리뷰 케이스
		},
		{
			id: 103,
			rating: 5,
			date: '2026-01-20',
			productName: '와이드 데님 팬츠',
			productSize: 'XL',
			gender: 'Male',
			buyerHeight: 185,
			buyerWeight: 80,
			content: '키 큰 분들에게 강추합니다. XL 시키니까 핏 딱 떨어지네요. 물빠짐도 거의 없고 튼튼해요.',
			images: [
				{ id: 3, imgUrl: 'https://lh3.googleusercontent.com/d/1eiIWEzT2SD1mdYZC1uDOko1vKCyMd5w-' },
			],
		},
		{
			id: 104,
			rating: 4,
			date: '2026-01-25',
			productName: '와이드 데님 팬츠',
			productSize: 'XL',
			gender: 'Male',
			buyerHeight : 175,
			buyerWeight: 75,
			content: '170에 73키로 남성에게는 M사이즈가 정사이즈로 딱 좋았어요! 원래 L사이즈 하려다가 후기랑 보구 고른건데 M사이즈 아주 좋은 선택이였어요 오트밀 색상이 겨울엔 좀 더 따뜻한 느낌을 줄거 같아서 구매했는데 개인적으로는 네이비색상이 더 예쁘긴 하네용 ㅎ 니트 자체는 부드럽고 따뜻해서 좋아요~ 보풀이 잘 일어날지 여부는 좀 입어보고 일반후기로 올려볼게요!',
			images: [
				{ id : 4, imgUrl : 'https://lh3.googleusercontent.com/d/1eiIWEzT2SD1mdYZC1uDOko1vKCyMd5w-' },
				{ id : 5, imgUrl : 'https://lh3.googleusercontent.com/d/1eiIWEzT2SD1mdYZC1uDOko1vKCyMd5w-' },
				{ id : 6, imgUrl : 'https://lh3.googleusercontent.com/d/1eiIWEzT2SD1mdYZC1uDOko1vKCyMd5w-' },
				{ id : 7, imgUrl : 'https://lh3.googleusercontent.com/d/1eiIWEzT2SD1mdYZC1uDOko1vKCyMd5w-' },
				{ id : 8, imgUrl : 'https://lh3.googleusercontent.com/d/1eiIWEzT2SD1mdYZC1uDOko1vKCyMd5w-' },
				{ id : 9, imgUrl : 'https://lh3.googleusercontent.com/d/1eiIWEzT2SD1mdYZC1uDOko1vKCyMd5w-' },
			],
		},
	],
};
