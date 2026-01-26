import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
   theme: 'light' | 'dark';
   toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
   persist(
      (set) => ({
         theme: 'light', // 초기값
         toggleTheme: () =>
            set((state) => ({
               theme: state.theme === 'light' ? 'dark' : 'light',
            })),
      }),
      {
         name: 'theme-storage', // 로컬 스토리지에 저장될 이름
      }
   )
);