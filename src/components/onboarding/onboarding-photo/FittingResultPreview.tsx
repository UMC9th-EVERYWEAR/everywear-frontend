import { CheckLoginIcon, LoadingIcon, XBoxIcon } from '@/src/assets/icons/components/Icons';

export type FittingStatus = 'LOADING' | 'SUCCESS' | 'FAIL';


interface FittingResultPreviewProps {
  originalImageUrl: string;     // 업로드한 사진
  resultImageUrl?: string;      // 로딩
  status: FittingStatus;
}

const FittingResultPreview = ({
	originalImageUrl,
	status,
}: FittingResultPreviewProps) => {
	return (
		<div className="flex justify-between gap-5 max-w-87">
			{/* 업로드한 이미지 */}
			<img
				src={originalImageUrl}
				alt="uploaded"
				className="w-41 h-50 object-cover rounded-lg"
			/>

			{/* 가상 피팅 결과 */}
			<div className="w-41 h-50 rounded-lg bg-gray-100 flex items-center justify-center">
				{status === 'LOADING' && (
					<div className="flex flex-col items-center gap-2.5 text-regular-16">

						<LoadingIcon
							width={28}
							height={28}
						/>
						<p className="text-regular-16 text-neutral-500 text-center">
							AI 분석 중
						</p>
					</div>
				)}

				{status === 'SUCCESS'  && (
					<div className="flex flex-col items-center gap-2.5 text-regular-16">
						<CheckLoginIcon
							width={28}
							height={28}
							className={  'text-primary-300 rounded-xs'}
						/>
						<p className="text-regular-16 text-neutral-500 text-center">
							인식 성공
						</p>
					</div>
				)}

				{status === 'FAIL' && (
					<div className="flex flex-col items-center gap-2.5 text-regular-16">
						<XBoxIcon
							width={28}
							height={28}
						/>
						{/* <img
							src={noCheckMarked}
							alt="fitting-result"
							className="w-7 h-7 object-cover "
						/> */}
						<p className="text-regular-16 text-neutral-500 text-center">
							인식 실패
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default FittingResultPreview;
