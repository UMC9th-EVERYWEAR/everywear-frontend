import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  accessToken: string | null;
  // login 시 rememberMe 인자를 추가로 받습니다.
  login: (user: User, token: string, rememberMe: boolean) => void;
  logout: () => void;
}

/**
 * [useAuthStore] 인증 상태 관리 스토어
 * - 기본값으로 sessionStorage를 사용합니다 (브라우저 닫으면 로그아웃).
 * - 로그인 시 '상태 유지'를 체크하면 localStorage로 전환됩니다.
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: null,
      accessToken: null,

      login: (user, token, rememberMe) => {
        // 1. 선택에 따라 저장소 타겟 결정
        const targetStorage = rememberMe ? localStorage : sessionStorage;
        
        // 2. Zustand의 persist 옵션을 런타임에 변경
        useAuthStore.persist.setOptions({
          storage: createJSONStorage(() => targetStorage),
        });

        // 3. 상태 업데이트
        set({
          isLoggedIn: true,
          user,
          accessToken: token,
        });
      },

      logout: () => {
        set({
          isLoggedIn: false,
          user: null,
          accessToken: null,
        });
        // 로그아웃 시 저장된 정보 완전 삭제
        useAuthStore.persist.clearStorage();
      },
    }),
    {
      name: 'auth-storage',
      // 초기값은 더 안전한 sessionStorage로 시작.
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);