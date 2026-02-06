import 'swiper';

declare module 'swiper' {
  interface Swiper {
    realIndex: number;
  }
}
