import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { STORAGE_KEYS } from '@/src/constants/storage'; // 상수 임포트

/**
 * 사용자 정보 타입 정의
 */
interface User {
   id: string;
   name: string;
   email: string;
   profileImage?: string;
}

/**
 * 인증 관련 전역 상태 타입
 */
interface AuthState {
   isLoggedIn: boolean;     // 로그인 여부
   user: User | null;       // 사용자 정보 (미로그인 시 null)
   accessToken: string | null; // API 요청용 토큰
   login: (user: User, token: string) => void; // 로그인 액션
   logout: () => void;      // 로그아웃 액션 (상태 초기화)
}

/**
 * [useAuthStore] 인증 상태를 관리하는 전역 스토어
 * - 보안 강화를 위해 localStorage 대신 sessionStorage를 사용하도록 수정되었습니다.
 * - 브라우저 탭을 닫으면 인증 정보가 만료되어 보안성이 향상됩니다.
 */
export const useAuthStore = create<AuthState>()(
   persist(
      (set) => ({
         // 초기 상태
         isLoggedIn: false,
         user: null,
         accessToken: null,

         // 로그인: 사용자 정보와 토큰을 저장하고 로그인 상태를 true로 변경
         login: (user, token) =>
            set({
               isLoggedIn: true,
               user,
               accessToken: token,
            }),

         // 로그아웃: 모든 인증 상태를 초기값으로 리셋
         logout: () =>
            set({
               isLoggedIn: false,
               user: null,
               accessToken: null,
            }),
      }),
      {
         name: STORAGE_KEYS.AUTH, // 피드백 반영: 외부 상수 파일의 키 사용
         storage: createJSONStorage(() => sessionStorage), // 보안 피드백 반영: 세션 스토리지 사용
      }
   )
);