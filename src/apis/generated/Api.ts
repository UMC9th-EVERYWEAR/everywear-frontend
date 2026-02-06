// @ts-nocheck
import type {
  ApiResponseAgreeToggleResponse,
  ApiResponseAiReviewDTO,
  ApiResponseAlarmToggleResponse,
  ApiResponseFittingApplyResult,
  ApiResponseFittingDetail,
  ApiResponseImportDTO,
  ApiResponseLikeToggleDTO,
  ApiResponseListFittingSummary,
  ApiResponseLong,
  ApiResponseMapStringObject,
  ApiResponseProductListResponse,
  ApiResponseString,
  ApiResponseTokenRefreshResponse,
  ApiResponseUserResponseDto,
  ApiResponseVoid,
  CrawlResponseDTO,
  CrawlReviewDTO,
  FittingRequest,
  ImportDTO,
  UserImgQuery,
  VerifyAndSavePayload,
} from "./data-contracts";
import { HttpClient } from "./http-client";
import type { RequestParams, ContentType } from "./http-client";

enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class Api<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description 사용자의 프로필사진들 중 하나를 선택하여 대표사진으로 설정합니다.
   *
   * @tags user-img-controller
   * @name SelectRepresentative
   * @summary 대표사진 변경 by 임준서(개발 완료)
   * @request POST:/api/user-images/{userImgId}/representative
   * @secure
   * @response `200` `ApiResponseVoid` OK
   */
  selectRepresentative = (userImgId: number, params: RequestParams = {}) =>
    this.request<ApiResponseVoid, any>({
      path: `/api/user-images/${userImgId}/representative`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * @description 사용자가 등록한 사진이 피팅에 적합한 지 검증한 뒤, 적합한 경우에만 프로필사진으로 저장합니다.
   *
   * @tags user-img-controller
   * @name VerifyAndSave
   * @summary 사용자 이미지 검증 by 임준서(개발 완료)
   * @request POST:/api/user-images/verify-and-save
   * @secure
   * @response `200` `ApiResponseLong` OK
   */
  verifyAndSave = (data: VerifyAndSavePayload, params: RequestParams = {}) =>
    this.request<ApiResponseLong, any>({
      path: `/api/user-images/verify-and-save`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * @description 상품 리뷰 크롤링을 시작합니다. **동작 방식:** 1. DB에 리뷰가 이미 있으면 즉시 반환 (캐시된 데이터) 2. 리뷰가 없으면 백그라운드에서 크롤링 시작 3. 크롤링이 진행 중이면 상태만 반환 **응답 타입:** - `from_cache: true` → 즉시 리뷰 데이터 반환 (캐시) - `from_cache: false, status: processing` → 크롤링 진행 중 (약 30초 소요) **크롤링 진행 확인:** - `GET /api/review/{productId}` API로 크롤링 상태 확인 가능 **지원 쇼핑몰:** - 무신사, 지그재그, 29CM, W컨셉
   *
   * @tags Review
   * @name CrawlReview
   * @summary 리뷰 크롤링 시작
   * @request POST:/api/review/crawl
   * @secure
   * @response `200` `CrawlResponseDTO` 리뷰가 이미 존재하여 즉시 반환 (캐시)
   * @response `202` `any` 리뷰 크롤링 시작됨 (백그라운드 처리 중)
   * @response `404` `any` 상품을 찾을 수 없음
   */
  crawlReview = (data: CrawlReviewDTO, params: RequestParams = {}) =>
    this.request<CrawlResponseDTO, any>({
      path: `/api/review/crawl`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description 특정 상품에 대해 이미 생성된 AI 요약과 키워드를 조회합니다.
   *
   * @tags Review
   * @name GetAiReview
   * @summary AI 리뷰 조회
   * @request GET:/api/review/ai/{productId}
   * @secure
   * @response `200` `ApiResponseAiReviewDTO` OK
   */
  getAiReview = (productId: number, params: RequestParams = {}) =>
    this.request<ApiResponseAiReviewDTO, any>({
      path: `/api/review/ai/${productId}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description 특정 상품의 모든 리뷰를 ChatGPT로 요약하고 키워드 4개를 추출합니다.
   *
   * @tags Review
   * @name GenerateAiReview
   * @summary 특정 상품의 AI 리뷰 및 키워드 생성
   * @request POST:/api/review/ai/{productId}
   * @secure
   * @response `200` `ApiResponseMapStringObject` OK
   */
  generateAiReview = (productId: number, params: RequestParams = {}) =>
    this.request<ApiResponseMapStringObject, any>({
      path: `/api/review/ai/${productId}`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * @description 등록할 상품 url을 입력해 상품 정보를 저장합니다. 무신사 입력 URL 형식들 : • 웹 URL: https://www.musinsa.com/products/{상품ID} • 앱 URL: https://www.musinsa.com/products/{상품ID} • 웹 공유하기: https://musinsa.onelink.me/ANAQ/{공유코드} • 앱 공유하기: https://musinsa.onelink.me/ANAQ/{공유코드} • 쇼핑몰 앱 공유하기: https://musinsa.onelink.me/PvkC/{공유코드} 지그재그 입력 URL 형식들 : • 웹 URL: https://zigzag.kr/catalog/products/{상품ID} • 앱 URL: https://zigzag.kr/catalog/products/{상품ID} • 웹 공유하기: https://zigzag.kr/catalog/products/{상품ID} • 앱 공유하기: https://zigzag.kr/catalog/products/{상품ID} • 쇼핑몰 앱 공유하기: https://s.zigzag.kr/{공유코드} W컨셉 입력 URL 형식들 : • 웹 URL: https://www.wconcept.co.kr/Product/{상품ID}?entry_channel=... • 앱 URL: https://m.wconcept.co.kr/Product/{상품ID}?applanding=X • 웹 공유하기: https://www.wconcept.co.kr/Product/{상품ID}?applanding=Y • 앱 공유하기: https://m.wconcept.co.kr/Product/{상품ID}?applanding=Z} • 쇼핑몰 앱 공유하기: https://m.wconcept.co.kr/Product/{상품ID}?applanding=Y 29cm 입력 URL 형식들 : • 웹 URL: https://www.29cm.co.kr/products/{상품ID}?categoryLargeCode=... • 앱 URL: https://www.29cm.co.kr/products/{상품ID} • 웹 공유하기: https://29cm.onelink.me/1080201211/{공유코드} • 앱 공유하기: https://29cm.onelink.me/1080201211/{공유코드} • 쇼핑몰 앱 공유하기: https://29cm.onelink.me/1080201211/{공유코드}
   *
   * @tags Product
   * @name ImportProduct
   * @summary 상품 등록
   * @request POST:/api/product/import
   * @secure
   * @response `200` `ApiResponseImportDTO` OK
   */
  importProduct = (data: ImportDTO, params: RequestParams = {}) =>
    this.request<ApiResponseImportDTO, any>({
      path: `/api/product/import`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 사용자의 대표사진에 상품 사진을 피팅합니다
   *
   * @tags fitting-controller
   * @name RequestFitting
   * @summary 가상 피팅 by 임준서(개발 완료)
   * @request POST:/api/fittings/try-on
   * @secure
   * @response `200` `ApiResponseFittingApplyResult` OK
   */
  requestFitting = (data: FittingRequest, params: RequestParams = {}) =>
    this.request<ApiResponseFittingApplyResult, any>({
      path: `/api/fittings/try-on`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 쿠키의 refreshToken으로 accessToken을 재발급합니다.
   *
   * @tags Auth
   * @name Refresh
   * @summary AccessToken 재발급
   * @request POST:/api/auth/refresh
   * @secure
   * @response `200` `ApiResponseTokenRefreshResponse` OK
   */
  refresh = (params: RequestParams = {}) =>
    this.request<ApiResponseTokenRefreshResponse, any>({
      path: `/api/auth/refresh`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * @description 사용자를 로그아웃하고 RefreshToken을 무효화합니다.
   *
   * @tags Auth
   * @name Logout
   * @summary 로그아웃
   * @request POST:/api/auth/logout
   * @secure
   * @response `200` `ApiResponseString` OK
   */
  logout = (params: RequestParams = {}) =>
    this.request<ApiResponseString, any>({
      path: `/api/auth/logout`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * @description 사용자의 알림 설정 상태를 토글합니다. 호출할 때마다 true/false가 반전됩니다. default값은 ture입니다.
   *
   * @tags User
   * @name ToggleAlarm
   * @summary 알림 설정 토글
   * @request PATCH:/api/user/alarm
   * @secure
   * @response `200` `ApiResponseAlarmToggleResponse` OK
   */
  toggleAlarm = (params: RequestParams = {}) =>
    this.request<ApiResponseAlarmToggleResponse, any>({
      path: `/api/user/alarm`,
      method: "PATCH",
      secure: true,
      ...params,
    });
  /**
   * @description 사용자의 약관 동의 상태를 토글합니다. 호출할 때마다 true/false가 반전됩니다. default값은 false입니다.
   *
   * @tags User
   * @name ToggleAgree
   * @summary 약관 동의 토글
   * @request PATCH:/api/user/agree
   * @secure
   * @response `200` `ApiResponseAgreeToggleResponse` OK
   */
  toggleAgree = (params: RequestParams = {}) =>
    this.request<ApiResponseAgreeToggleResponse, any>({
      path: `/api/user/agree`,
      method: "PATCH",
      secure: true,
      ...params,
    });
  /**
   * @description 특정 상품에 대한 사용자의 좋아요 상태를 토글합니다. 호출할 때마다 true/false가 반전됩니다.
   *
   * @tags Product
   * @name ToggleProductLike
   * @summary 상품 좋아요 토글
   * @request PATCH:/api/products/{product_id}/like
   * @secure
   * @response `200` `ApiResponseLikeToggleDTO` OK
   */
  toggleProductLike = (productId: number, params: RequestParams = {}) =>
    this.request<ApiResponseLikeToggleDTO, any>({
      path: `/api/products/${productId}/like`,
      method: "PATCH",
      secure: true,
      ...params,
    });
  /**
   * @description 현재 로그인한 사용자의 정보를 조회합니다.
   *
   * @tags User
   * @name GetMyInfo
   * @summary 내 정보 조회
   * @request GET:/api/user/me
   * @secure
   * @response `200` `ApiResponseUserResponseDto` OK
   */
  getMyInfo = (params: RequestParams = {}) =>
    this.request<ApiResponseUserResponseDto, any>({
      path: `/api/user/me`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description 사용자의 모든 프로필사진들을 조회합니다.
   *
   * @tags user-img-controller
   * @name GetProfileImages
   * @summary 프로필 사진 조회 by 임준서(개발 완료)
   * @request GET:/api/user-images
   * @secure
   * @response `200` `(UserImgQuery)[]` OK
   */
  getProfileImages = (params: RequestParams = {}) =>
    this.request<UserImgQuery[], any>({
      path: `/api/user-images`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description 상품의 리뷰를 조회합니다. **응답 상태:** - `completed`: 리뷰 데이터 있음 (크롤링 완료) - `processing`: 크롤링 진행 중 (리뷰 데이터 없음) - `failed`: 크롤링 실패 - `not_started`: 크롤링 아직 시작 안 함 **사용 시나리오:** 1. `POST /api/review/crawl`로 크롤링 시작 2. 이 API로 크롤링 상태 확인 3. `status: completed`가 되면 리뷰 데이터 사용 **Polling 권장 주기:** - 5초마다 확인 (최대 1분)
   *
   * @tags Review
   * @name GetReviews
   * @summary 리뷰 조회
   * @request GET:/api/review/{productId}
   * @secure
   * @response `200` `any` 크롤링 진행 중
   */
  getReviews = (productId: number, params: RequestParams = {}) =>
    this.request<any, any>({
      path: `/api/review/${productId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description 사용자가 등록한 모든 상품을 최신 업데이트 순으로 조회합니다.
   *
   * @tags Product
   * @name GetProducts
   * @summary 전체 상품 조회
   * @request GET:/api/products
   * @secure
   * @response `200` `ApiResponseProductListResponse` OK
   */
  getProducts = (params: RequestParams = {}) =>
    this.request<ApiResponseProductListResponse, any>({
      path: `/api/products`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description 사용자가 등록한 상의 상품을 최신 업데이트 순으로 조회합니다.
   *
   * @tags Product
   * @name GetTopProducts
   * @summary 상의 상품 조회
   * @request GET:/api/products/top
   * @secure
   * @response `200` `ApiResponseProductListResponse` OK
   */
  getTopProducts = (params: RequestParams = {}) =>
    this.request<ApiResponseProductListResponse, any>({
      path: `/api/products/top`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description 사용자가 등록한 아우터 상품을 최신 업데이트 순으로 조회합니다.
   *
   * @tags Product
   * @name GetOuterProducts
   * @summary 아우터 상품 조회
   * @request GET:/api/products/outer
   * @secure
   * @response `200` `ApiResponseProductListResponse` OK
   */
  getOuterProducts = (params: RequestParams = {}) =>
    this.request<ApiResponseProductListResponse, any>({
      path: `/api/products/outer`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description 사용자가 등록한 기타 상품을 최신 업데이트 순으로 조회합니다.
   *
   * @tags Product
   * @name GetEtcProducts
   * @summary 기타 상품 조회
   * @request GET:/api/products/etc
   * @secure
   * @response `200` `ApiResponseProductListResponse` OK
   */
  getEtcProducts = (params: RequestParams = {}) =>
    this.request<ApiResponseProductListResponse, any>({
      path: `/api/products/etc`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description 사용자가 등록한 원피스 상품을 최신 업데이트 순으로 조회합니다.
   *
   * @tags Product
   * @name GetDressProducts
   * @summary 원피스 상품 조회
   * @request GET:/api/products/dress
   * @secure
   * @response `200` `ApiResponseProductListResponse` OK
   */
  getDressProducts = (params: RequestParams = {}) =>
    this.request<ApiResponseProductListResponse, any>({
      path: `/api/products/dress`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description 사용자가 등록한 하의 상품을 최신 업데이트 순으로 조회합니다.
   *
   * @tags Product
   * @name GetBottomProducts
   * @summary 하의 상품 조회
   * @request GET:/api/products/bottom
   * @secure
   * @response `200` `ApiResponseProductListResponse` OK
   */
  getBottomProducts = (params: RequestParams = {}) =>
    this.request<ApiResponseProductListResponse, any>({
      path: `/api/products/bottom`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description 사용자의 피팅 내역 중 최신순 6개를 조회합니다.
   *
   * @tags Home
   * @name GetRecentFittings
   * @summary 홈 화면 최근 피팅내역 조회 by 임준서(개발 완료)
   * @request GET:/api/home/recent-fittings
   * @secure
   * @response `200` `ApiResponseListFittingSummary` OK
   */
  getRecentFittings = (params: RequestParams = {}) =>
    this.request<ApiResponseListFittingSummary, any>({
      path: `/api/home/recent-fittings`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description 사용자가 등록한 전체 상품 중 최신 업데이트 순으로 상위 6개 상품을 조회합니다.
   *
   * @tags Home
   * @name GetHomeProducts
   * @summary 홈 화면 상품 조회
   * @request GET:/api/home/products
   * @secure
   * @response `200` `ApiResponseProductListResponse` OK
   */
  getHomeProducts = (params: RequestParams = {}) =>
    this.request<ApiResponseProductListResponse, any>({
      path: `/api/home/products`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description 사용자의 피팅 목록을 조회합니다.
   *
   * @tags fitting-controller
   * @name GetMyFittings
   * @summary 피팅 목록 조회 by 임준서(개발 완료)
   * @request GET:/api/fittings
   * @secure
   * @response `200` `ApiResponseListFittingSummary` OK
   */
  getMyFittings = (params: RequestParams = {}) =>
    this.request<ApiResponseListFittingSummary, any>({
      path: `/api/fittings`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description 피팅 내역 상세 정보를 조회합니다.
   *
   * @tags fitting-controller
   * @name GetFittingDetail
   * @summary 피팅 상세 조회 by 임준서(개발 완료)
   * @request GET:/api/fittings/{fittingId}
   * @secure
   * @response `200` `ApiResponseFittingDetail` OK
   */
  getFittingDetail = (fittingId: number, params: RequestParams = {}) =>
    this.request<ApiResponseFittingDetail, any>({
      path: `/api/fittings/${fittingId}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description 내 옷장 상품을 최신순으로 조회합니다.
   *
   * @tags Closet
   * @name GetClosetProducts
   * @summary 내 옷장 상품 조회
   * @request GET:/api/closet
   * @secure
   * @response `200` `ApiResponseProductListResponse` OK
   */
  getClosetProducts = (params: RequestParams = {}) =>
    this.request<ApiResponseProductListResponse, any>({
      path: `/api/closet`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description 내 옷장 상의 상품을 최신순으로 조회합니다.
   *
   * @tags Closet
   * @name GetClosetTopProducts
   * @summary 내 옷장 상의 상품 조회
   * @request GET:/api/closet/top
   * @secure
   * @response `200` `ApiResponseProductListResponse` OK
   */
  getClosetTopProducts = (params: RequestParams = {}) =>
    this.request<ApiResponseProductListResponse, any>({
      path: `/api/closet/top`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description 내 옷장 아우터 상품을 최신순으로 조회합니다.
   *
   * @tags Closet
   * @name GetClosetOuterProducts
   * @summary 내 옷장 아우터 상품 조회
   * @request GET:/api/closet/outer
   * @secure
   * @response `200` `ApiResponseProductListResponse` OK
   */
  getClosetOuterProducts = (params: RequestParams = {}) =>
    this.request<ApiResponseProductListResponse, any>({
      path: `/api/closet/outer`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description is_liked가 true인 기타(category=기타) 상품 전체를 최신 업데이트 순(update_at 내림차순)으로 조회합니다. 등록한 상품이 없으면 products는 null입니다.
   *
   * @tags Closet
   * @name GetClosetEtcProducts
   * @summary 내 옷장 기타 상품 조회
   * @request GET:/api/closet/etc
   * @secure
   * @response `200` `ApiResponseProductListResponse` OK
   */
  getClosetEtcProducts = (params: RequestParams = {}) =>
    this.request<ApiResponseProductListResponse, any>({
      path: `/api/closet/etc`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description 내 옷장 원피스 상품을 최신순으로 조회합니다.
   *
   * @tags Closet
   * @name GetClosetDressProducts
   * @summary 내 옷장 원피스 상품 조회
   * @request GET:/api/closet/dress
   * @secure
   * @response `200` `ApiResponseProductListResponse` OK
   */
  getClosetDressProducts = (params: RequestParams = {}) =>
    this.request<ApiResponseProductListResponse, any>({
      path: `/api/closet/dress`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description 내 옷장 하의 상품을 최신순으로 조회합니다.
   *
   * @tags Closet
   * @name GetClosetBottomProducts
   * @summary 내 옷장 하의 상품 조회
   * @request GET:/api/closet/bottom
   * @secure
   * @response `200` `ApiResponseProductListResponse` OK
   */
  getClosetBottomProducts = (params: RequestParams = {}) =>
    this.request<ApiResponseProductListResponse, any>({
      path: `/api/closet/bottom`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description 사용자가 선택한 프로필사진을 삭제합니다.
   *
   * @tags user-img-controller
   * @name DeleteProfileImage
   * @summary 프로필 사진 삭제 by 임준서(개발 완료)
   * @request DELETE:/api/user-images/{imageId}
   * @secure
   * @response `200` `any` OK
   */
  deleteProfileImage = (imageId: number, params: RequestParams = {}) =>
    this.request<any, any>({
      path: `/api/user-images/${imageId}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description 사용자 계정을 삭제하고 카카오 연결을 끊습니다.
   *
   * @tags Auth
   * @name Withdraw
   * @summary 회원 탈퇴
   * @request DELETE:/api/auth/withdraw
   * @secure
   * @response `200` `ApiResponseString` OK
   */
  withdraw = (params: RequestParams = {}) =>
    this.request<ApiResponseString, any>({
      path: `/api/auth/withdraw`,
      method: "DELETE",
      secure: true,
      ...params,
    });
}
