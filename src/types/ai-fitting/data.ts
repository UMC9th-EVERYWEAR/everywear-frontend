export interface ReviewImage {
  id: number;
  imgUrl: string; 
}

export interface ReviewKeyword {
  label: string; 
}

export interface ReviewItem {
  id: number;
  rating: number;      
  date: string;
  productName: string; 
  productSize: string; 
  gender: '남성' | '여성';
  buyerHeight: number; 
  buyerWeight: number; 
  content: string;     
  images: ReviewImage[]; 
}

// 최종 ReviewData 타입
export interface ReviewData {
  summary: string;           // AI 요약 텍스트
  keywords: ReviewKeyword[]; // 추천 키워드 리스트
  reviews: ReviewItem[];     // 리뷰 목록 리스트
}


