import type { FittingData, ReviewItem, ReviewKeyword } from './data';

// [1-1] 피팅 에러 원인 (Discriminated Union용)
export type FittingErrorReason = 
  | 'INVALID_PRODUCT_IMAGE'  // 쇼핑몰 상품 이미지가 부적절함
  | 'INVALID_USER_IMAGE'     // 사용자가 업로드한 이미지가 부적절함 (사람 인식 불가 등)
  | 'UNKNOWN_ERROR';         // 기타 서버 에러

// [1-2] 피팅 화면 상태 (State)
export type FittingState = 
  | { status: 'idle' }    // 초기 상태 (아무것도 안 함)
  | { status: 'loading'} // AI 생성 중
  | { status: 'success'; resultUrl: FittingData}     // 성공 (결과 이미지 포함)
  | { status: 'error'; error: FittingErrorReason };   // 실패 (에러 원인 포함)

export type FittingStateStatus = 'idle' | 'loading' | 'success' | 'error';

// 리뷰 요약 에러
export type ReviewSummaryErrorReason = 'INSUFFICIENT_REVIEWS' | 'GENERATION_FAILED'; 
// 'INSUFFICIENT_REVIEWS' : 리뷰 수가 부족해 요약 불가
// 'GENERATION_FAILED' : AI 요약 생성 실패

// 리뷰 요약 상태
export type ReviewSummaryState = 
  | { status: 'loading' }                     // 요약 로딩 중 (옵션)
  | { status: 'success'; text: string }       // 성공 시 요약문
  | { status: 'error'; error: ReviewSummaryErrorReason }; // 요약만 실패

// [C] 리뷰 "불러오기" 치명적 에러 (목록 자체를 못 가져옴)
export type ReviewErrorReason = 'NETWORK_ERROR' | 'SERVER_ERROR';

// [D] 리뷰 탭 전체 상태 (최상위 상태)
export type ReviewState = 
  | { status: 'idle' }
  | { status: 'loading' } // 전체 화면 로딩 (스피너)
  | { status: 'fatal_error'; error: ReviewErrorReason } // 치명적 에러 (재시도 버튼 등 필요)
  | { 
      status: 'success'; 
      reviews: ReviewItem[];        // 리뷰 목록 (무조건 존재)
      keywords: ReviewKeyword[];    // 키워드 (무조건 존재)
      summary: ReviewSummaryState;  // ★ 요약 상태는 독립적으로 관리
    };
