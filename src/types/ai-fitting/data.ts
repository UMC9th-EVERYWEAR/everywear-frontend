export type FittingData = string;

export interface ReviewImage {
  id: number;
  imgUrl: string; 
}

export interface ReviewKeyword {
  id: number;
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
  summary: string;         
  keywords: ReviewKeyword[]; 
  reviews: ReviewItem[];    
}


