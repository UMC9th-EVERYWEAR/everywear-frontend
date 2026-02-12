
import type { FittingStatus } from './FittingResultPreview';
import { cn } from '@/src/utils/cn';
import { Icons } from '@/src/assets/icons/components/Icons';


interface FittingProgressBoxProps {
  status: FittingStatus;
}

const FittingProgressBox = ({ status }: FittingProgressBoxProps) => {
	const content = {
		LOADING: {
			title: '분석 진행 중',
			desc: ['AI가 사진을 분석하고 있습니다.', '잠시만 기다려주세요.'],
			color: 'border-verifying-border bg-verifying',
			Icon: Icons.Loading,
		},

		SUCCESS: {
			title: '피팅 분석 완료',
			desc: ['사진 분석이 완료되었습니다.', '가상 피팅을 시작할 수 있어요.'],
			color: 'border-verifying-border bg-verifying',
			Icon: Icons.CheckLogin,
		},
		FAIL: {
			title: '분석 실패',
			desc: ['사진 분석에 실패했습니다.', '다른 사진으로 다시 시도해주세요.'],
			color: 'border-verifying-fail-border bg-verifying-fail',
			Icon: Icons.XBox,


		},
	}[status];

	return (
		<div
			className={cn('w-87 rounded-lg px-3 py-4 border',
				content.color,
			)}
		>
			<div className="flex gap-4 items-center">
				<content.Icon
					width={20}
					className={'text-primary-300'}
				/>				
				<span className="text-regular-16 text-neutral-900">
					{content.title}
				</span>
			</div>

			<div className="w-full px-9 text-start text-regular-14 text-neutral-600">
				{content.desc.map((line) => (
					<p key={line}>{line}</p>
				))}
			</div>
		</div>
	);
};

export default FittingProgressBox;
