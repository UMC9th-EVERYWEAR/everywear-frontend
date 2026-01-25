export type ReviewSummary = string;

export interface ReviewImg {
    id : number;
    imgUrl : string;
}

export interface ReviewData {
    id : number;
    starCount : number;
    date : string;
    itemName : string;
    size : string;
    gender : string;
    height : number;
    weight : number;
    reviewImage : ReviewImg[];
    reviewBody : string;
}

export type ReviewDataAll = ReviewData[];

export interface ReviewKeyword {
    id : number;
    data : string;
}

export interface ReviewKeywordAll {
    data : ReviewKeyword[]
}
