//  typescript가 환경변수를 추론하게 하기 위한 파일
/// <reference types="vite/client" />

declare module '*.css';
declare module '*.scss';
declare module '*.sass';
declare module 'swiper/css';
declare module 'swiper/css/pagination';
declare module 'swiper/css/navigation';
declare module 'swiper/react'
declare module 'swiper/modules'

interface ImportMetaEnv {
  readonly MODE: 'development' | 'production' | string;
  readonly DEV: boolean;
  readonly PROD: boolean;


  readonly VITE_EMAILJS_SERVICE_ID: string;
  readonly VITE_EMAILJS_TEMPLATE_ID: string;
  readonly VITE_EMAILJS_PUBLIC_KEY: string;

  readonly VITE_IMGBB_API_KEY: string;
  readonly VITE_SERVER_API_URL: string;
  readonly VITE_LOCAL_API_BASE_URL: string;
  readonly VITE_DEV_ACCESS_TOKEN: string;

  

}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
