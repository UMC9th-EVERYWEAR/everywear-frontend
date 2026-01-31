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

// 리뷰 요약 상태
export type ReviewSummaryState = 
  | { status: 'loading' }                     // 요약 로딩 중 (옵션)
  | { status: 'success'; text: string }       // 성공 시 요약문
  | { status: 'error'; error: 'INSUFFICIENT_REVIEWS' }; // 요약만 실패 / INSUFFICIENT_REVIEWS : 리뷰 수가 부족함


// [D] 리뷰 탭 전체 상태 (최상위 상태)
export type ReviewState = 
  | { status: 'idle' }
  | { status: 'loading' } // 전체 화면 로딩 (스피너)
  | { status: 'error'; error: 'SERVER_ERROR' } // 리뷰 가져오기 실패 / SERVER_ERROR : 서버 에러
  | { 
      status: 'success'; 
      reviews: ReviewItem[];        // 리뷰 목록 (무조건 존재)
      keywords: ReviewKeyword[];    // 키워드 (무조건 존재)
      summary: ReviewSummaryState;  // ★ 요약 상태는 독립적으로 관리
    };
