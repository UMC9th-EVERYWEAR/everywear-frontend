// @ts-nocheck
export interface ApiResponseVoid {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: any;
}

export interface ApiResponseLong {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  /** @format int64 */
  result?: number;
}

/** 리뷰 크롤링 요청 */
export interface CrawlReviewDTO {
  /**
   * 상품 ID
   * @format int64
   * @example 123
   */
  product_id: number;
  /**
   * 상품 URL
   * @minLength 1
   * @example "https://www.musinsa.com/products/5432652"
   */
  product_url: string;
  /**
   * 쇼핑몰 이름
   * @minLength 1
   * @example "무신사"
   */
  shoppingmall_name: string;
}

export interface CrawlResponseDTO {
  status?: string;
  estimated_time?: string;
  from_cache?: boolean;
  /** @format int32 */
  total_count?: number;
  reviews?: ReviewDTO[];
}

export interface ReviewDTO {
  /** @format int64 */
  review_id?: number;
  /** @format int32 */
  rating?: number;
  content?: string;
  review_date?: string;
  /** @format int32 */
  user_height?: number;
  /** @format int32 */
  user_weight?: number;
  option_text?: string;
  images?: string[];
}

export interface ApiResponseMapStringObject {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: Record<string, any>;
}

/** 상품 등록 요청 (무신사/지그재그/29cm/W컨셉 URL 자동 감지) */
export interface ImportDTO {
  /**
   * 상품 URL (무신사, 지그재그, 29cm, W컨셉 중 하나)
   * @minLength 1
   * @example "string"
   */
  product_url: string;
}

export interface ApiResponseImportDTO {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  /** 상품 등록 요청 (무신사/지그재그/29cm/W컨셉 URL 자동 감지) */
  result?: ImportDTO;
}

export interface FittingRequest {
  /** @format int64 */
  productId?: number;
}

export interface ApiResponseFittingApplyResult {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: FittingApplyResult;
}

export interface FittingApplyResult {
  /** @format int64 */
  fittingId?: number;
  fittingResultImageUrl?: string;
}

export interface ApiResponseTokenRefreshResponse {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: TokenRefreshResponse;
}

export interface TokenRefreshResponse {
  accessToken?: string;
}

export interface ApiResponseString {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: string;
}

export interface ApiResponseLikeToggleDTO {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: LikeToggleDTO;
}

export interface LikeToggleDTO {
  is_liked?: boolean;
}

export interface ApiResponseUserResponse {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: UserResponse;
}

export interface UserResponse {
  /** @format int64 */
  userId?: number;
  name?: string;
  email?: string;
  socialType?: UserResponseSocialTypeEnum;
  isActive?: UserResponseIsActiveEnum;
  isAgreed?: boolean;
  alarmOnoff?: boolean;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
}

export interface UserImgQuery {
  /** @format int64 */
  profileImageId?: number;
  imageUrl?: string;
  representative?: boolean;
}

export interface AiReviewDTO {
  summary?: string;
  keywords?: string[];
  message?: string;
}

export interface ApiResponseAiReviewDTO {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: AiReviewDTO;
}

export interface ApiResponseProductListResponse {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: ProductListResponse;
}

export interface ListDTO {
  /** @format int64 */
  product_id?: number;
  shoppingmale_name?: string;
  product_url?: string;
  category?: string;
  product_img_url?: string;
  product_name?: string;
  brand_name?: string;
  price?: string;
  /** @format float */
  star_point?: number;
  /** @format int64 */
  product_num?: number;
  is_liked?: boolean;
  ai_review?: string;
}

export interface ProductListResponse {
  products?: ListDTO[];
}

export interface ApiResponseListFittingSummary {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: FittingSummary[];
}

export interface FittingSummary {
  /** @format int64 */
  fittingId?: number;
  fittingResultImage?: string;
  /** @format date-time */
  createdAt?: string;
  product?: ProductBrief;
}

export interface ProductBrief {
  /** @format int64 */
  productId?: number;
  productName?: string;
  isLiked?: boolean;
}

export interface ApiResponseFittingDetail {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: FittingDetail;
}

export interface FittingDetail {
  /** @format int64 */
  fittingId?: number;
  beforeImageUrl?: string;
  afterImageUrl?: string;
  /** @format date-time */
  createdAt?: string;
  product?: ProductSummary;
}

export interface ProductSummary {
  /** @format int64 */
  productId?: number;
  siteName?: string;
  productName?: string;
  price?: string;
  /** @format float */
  rating?: number;
  purchaseUrl?: string;
  isLiked?: boolean;
}

export enum UserResponseSocialTypeEnum {
  KAKAO = "KAKAO",
  GOOGLE = "GOOGLE",
  NAVER = "NAVER",
}

export enum UserResponseIsActiveEnum {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  DELETED = "DELETED",
}

export interface VerifyAndSavePayload {
  /** @format binary */
  image: File;
}
