import type { FittingErrorReason, ReviewErrorReason, ReviewSummaryErrorReason } from './status';

export type ModalState  = 
    | {type : 'none'}
    | {type : 'success'}
    | {type : 'buy'}
    | {type : 'heart'}
    | {type : 'fittingError', reason : FittingErrorReason }
    | {type : 'reviewSummaryError', reason : ReviewSummaryErrorReason }
    | {type : 'reviewError', reason : ReviewErrorReason }
