import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'


/*
  cn: Tailwind className을 안전하게 합치는 유틸 함수

  ✅ clsx: 조건부 className 병합
  - 문자열, 배열, 객체({ className: boolean }) 등 다양한 입력을 받아
    false/undefined/null 값은 자동 제거하고 className 문자열로 만들어줌

  ✅ twMerge: Tailwind 클래스 충돌 해결
  - 예: "p-2 p-4" 같이 겹치는 클래스가 있으면 마지막 값(p-4)만 남김

  따라서 cn()은 "조건부 클래스 처리 + Tailwind 충돌 정리"를 한번에 해결함.
 */

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}
