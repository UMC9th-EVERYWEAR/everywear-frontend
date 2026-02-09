import type { AiReviewDTO, ReviewDTO } from '@/src/apis/generated';

export type FittingState = 
  | { status: 'idle' }    
  | { status: 'loading'} 
  | { status: 'success'; resultUrl?: string}   
  | { status: 'error' }; 

export type FittingStateStatus = 'idle' | 'loading' | 'success' | 'error';

export type ReviewSummaryState = 
  | { status: 'loading' }                     
  | { status: 'success'; result : AiReviewDTO}       
  | { status: 'error'};

export type ReviewState = 
  | { status: 'idle' }
  | { status: 'loading' } 
  | { status: 'error'}
  | { 
      status: 'success'; 
      reviews: ReviewDTO[];        
      summary: ReviewSummaryState;
    };
