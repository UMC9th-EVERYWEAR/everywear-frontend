// @ts-nocheck
import type { ApiResponseMapStringObject } from "./data-contracts";
import { HttpClient } from "./http-client";
import type { RequestParams } from "./http-client";

export class Health<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description 서버 상태 상세 정보 제공
   *
   * @tags Health Check
   * @name DetailedHealthCheck
   * @summary 상세 헬스체크
   * @request GET:/health
   * @secure
   * @response `200` `ApiResponseMapStringObject` OK
   */
  detailedHealthCheck = (params: RequestParams = {}) =>
    this.request<ApiResponseMapStringObject, any>({
      path: `/health`,
      method: "GET",
      secure: true,
      ...params,
    });
}
