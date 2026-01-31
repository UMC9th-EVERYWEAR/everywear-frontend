import { type ClassValue, clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/*
  cn: Tailwind className을 안전하게 합치는 유틸 함수

  1. clsx: 조건부 className 병합
  - 문자열, 배열, 객체({ className: boolean }) 등 다양한 입력을 받아
    false/undefined/null 값은 자동 제거하고 className 문자열로 만들어줌

  2. twMerge: Tailwind 클래스 충돌 해결
  - 예: "p-2 p-4" 같이 겹치는 클래스가 있으면 마지막 값(p-4)만 남김

  따라서 cn()은 "조건부 클래스 처리 + Tailwind 충돌 정리"를 한번에 해결함.
 */

/*
  twMerge에서 text-접두사들을 사용하는 클래스를 동일 클래스로 인식하기 때문에
  text의 색상 설정과 text의 크기,스타일 설정이 충돌하는 문제가 발생하였다.

  따라서 커스텀 text- 클래스들을 명시적으로 font-size class group에 등록하여
  충돌을 방지하고 별도의 설정으로 인식하게끔 수정하였다. 

  global.css에 새로운 text- 클래스를 추가할 경우 여기에도 추가해주세요!
  */
const customTwMerge = extendTailwindMerge({
	extend: {
		classGroups : {
			'font-size' : [
				'text-bold-24',
				'text-bold-20',
				'text-bold-18',
				'text-bold-16',
				'text-semibold-24',
				'text-semibold-20',
				'text-semibold-18',
				'text-semibold-16',
				'text-medium-18',
				'text-medium-16',
				'text-medium-14',
				'text-medium-12',
				'text-medium-10',
				'text-regular-18',
				'text-regular-16',
				'text-regular-14',
				'text-regular-12',
				'text-regular-10',
			],
		},
	},
})



export function cn(...inputs: ClassValue[]) {
	return customTwMerge(clsx(inputs))
}
