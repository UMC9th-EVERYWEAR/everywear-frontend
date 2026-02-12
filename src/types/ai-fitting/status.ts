import type { AiReviewDTO, ReviewDTO } from '@/src/apis/generated';

export type FittingState = 
  | { status: 'idle' }    
  | { status: 'loading'} 
  | { status: 'success'; resultUrl?: string}   
  | { status: 'error' }; 

export type FittingStateStatus = 'idle' | 'loading' | 'success' | 'error';

export interface ReviewState {
  status: 'idle' | 'loading' | 'success' | 'error';
  reviews: ReviewDTO[];
  summary: {
    status: 'idle' | 'loading' | 'success' | 'error';
    text: string;
  };
  keywords: { id: number; label: string }[];
}

export type ReviewListState = 
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'success'; reviews: ReviewDTO[] };

export type AiSummaryState = 
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'success'; result?: AiReviewDTO };
