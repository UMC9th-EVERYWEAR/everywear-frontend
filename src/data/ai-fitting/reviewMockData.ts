
import type { ReviewDataAll, ReviewKeywordAll } from '@/src/types/ai-fitting/review';

export const dummyReviewSummaryData = '흰색 무지 티셔츠는 탄탄한 원단과 무난한 핏으로 데일리 기본템으로 활용도가 높다는 평가가 많습니다. \
대부분 착용감과 가성비에 만족하며, 세탁 후에도 형태 유지가 잘 된다는 의견이 있습니다.'

export const dummyReviewData: ReviewDataAll = [
	{
		starCount: 4,
		date: '2024-01-15', 
		itemName: '베이직 화이트 티셔츠',
		size: 'L',
		gender: '남성',
		height: 170,
		weight: 73,
		reviewImage: [
			{
				id: 1,
				imgUrl: 'https://lh3.googleusercontent.com/d/1eiIWEzT2SD1mdYZC1uDOko1vKCyMd5w-',
			},
			{
				id: 2,
				imgUrl: 'https://lh3.googleusercontent.com/d/1eiIWEzT2SD1mdYZC1uDOko1vKCyMd5w-',
			},
			{
				id: 3,
				imgUrl: 'https://lh3.googleusercontent.com/d/1eiIWEzT2SD1mdYZC1uDOko1vKCyMd5w-',
			},
			{
				id: 4,
				imgUrl: 'https://lh3.googleusercontent.com/d/1eiIWEzT2SD1mdYZC1uDOko1vKCyMd5w-',
			},
			{
				id: 5,
				imgUrl: 'https://lh3.googleusercontent.com/d/1eiIWEzT2SD1mdYZC1uDOko1vKCyMd5w-',
			},
		],
		reviewBody: '170에 73키로 남성에게는 M사이즈가 정사이즈로 딱 좋았어요! 원래 L사이즈 하려다가 후기랑 \
        보구 고른건데 M사이즈 아주 좋은 선택이였어요 오트밀 색상이 겨울엔 좀 더 따뜻한 느낌을 줄거 같아서 구매했는데 \
        개인적으로는 네이비색상이 더 예쁘긴 하네용 ㅎ 니트 자체는 부드럽고 따뜻해서 좋아요~ 보풀이 잘 일어날지 여부는 좀 입어보고 일반후기로 올려볼게요!',
	},
	{
		starCount: 4,
		date: '2024-02-02',
		itemName: '베이직 화이트 티셔츠',
		size: 'M',
		gender: '여성',
		height: 162,
		weight: 50,
		reviewImage: [], // 이미지가 없는 경우 빈 배열
		reviewBody: '배송이 정말 빨랐습니다. 사이즈는 정사이즈 같아요. 다만 생각보다 조금 얇은 감이 있어서 이너로 입기에 더 좋을 것 같습니다.',
	},
	{
		starCount: 5,
		date: '2024-02-10',
		itemName: '베이직 화이트 티셔츠',
		size: 'XL',
		gender: '남성',
		height: 181,
		weight: 85,
		reviewImage: [
			{
				id: 3,
				imgUrl: 'https://via.placeholder.com/150',
			},
		],
		reviewBody: '오버핏으로 입으려고 한 치수 크게 샀는데 딱 원하는 느낌입니다. 재질이 부드러워서 피부에 닿는 느낌이 좋아요.',
	},
];

export const dummyReviewKeywordData: ReviewKeywordAll = {
	data: [
		{ id: 1, data: '핏 좋음' },
		{ id: 2, data: '품질 우수' },
		{ id: 3, data: '가성비' },
		{ id: 4, data: '배송 느림' },
	],
};
