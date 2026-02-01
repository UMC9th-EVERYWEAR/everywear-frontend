import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { STORAGE_KEYS } from '@/src/constants/storage'; // 상수 임포트

/**
 * 테마 상태 타입 정의
 * - 'light': 라이트 모드
 * - 'dark': 다크 모드
 */
interface ThemeState {
   theme: 'light' | 'dark';
   toggleTheme: () => void; // 현재 테마를 반대로 전환하는 함수
}

/**
 * [useThemeStore] 전역 테마 상태 관리 스토어
 * - 사용자의 테마 설정을 브라우저(localStorage)에 저장하여
 * - 재방문 시에도 이전 설정을 그대로 유지합니다.
 */
export const useThemeStore = create<ThemeState>()(
   persist(
      (set) => ({
         // 기본값: 라이트 모드
         theme: 'light', 

         // 테마 전환 로직: light ↔ dark 스위칭
         toggleTheme: () =>
            set((state) => ({
               theme: state.theme === 'light' ? 'dark' : 'light',
            })),
      }),
      {
         name: STORAGE_KEYS.THEME, // 피드백 반영: 외부 상수 파일의 키 사용
      }
   )
);