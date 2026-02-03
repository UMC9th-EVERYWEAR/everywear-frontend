// import { LoadingSpinner } from '../../ai-fitting/LoadingSpinner';
import FittingResultPreview, { type FittingStatus } from './FittingResultPreview';
import FittingProgressBox from './FittingProgressBox';
import { useEffect, useState } from 'react';
import VerifySteps, { type StepStatus } from './VerifySteps';
import Button from '../../common/Button';
import TipSection from './TipSection';


interface VerifyingSectionProps {
previewUrl: string;
}


const VerifyingSection = ({ previewUrl } : VerifyingSectionProps)  => {
	const [status, setStatus] = useState<FittingStatus>('LOADING')
	const [stepStatus, setStepStatus] = useState<StepStatus[]>([
		'LOADING', // 신체 인식
		'WAIT',
		'WAIT',
	]);

	useEffect(() => {
		const timers: number[] = [];
		// 서버 상태에 따라 변경
		// 1단계 → 2단계
		timers.push(
			window.setTimeout(() => {
				setStepStatus(['SUCCESS', 'LOADING', 'WAIT']);
			}, 6000),
		);

		// 2단계 → 3단계
		timers.push(
			window.setTimeout(() => {
				setStepStatus(['SUCCESS', 'SUCCESS', 'LOADING']);
			}, 12000),
		);

		// 3단계 결과
		timers.push(
			window.setTimeout(() => {
				setStepStatus(['SUCCESS', 'SUCCESS', 'SUCCESS']); // or FAIL
				setStatus('SUCCESS')
			}, 18000),
		);

		return () => timers.forEach(clearTimeout);
	}, []);

	if(!previewUrl)
		return(
			<>사진이없어요</>
		)

	return (
		<div className="min-h-screen flex flex-col items-center py-4 px-2.5 text-center">
			<div className='w-full h-px bg-neutral-200 mb-6'/>

			<div className='flex flex-col gap-8'>


				<div className="w-full text-start px-3 flex flex-col -mb-2">
					<p className="text-medium-20 text-neutral-900">
						가상 피팅 테스트
					</p>

					<p className="text-regular-14 text-neutral-500">
						업로드한 사진이 가상 피팅에 적합한지 확인하고 있어요			
					</p>
				</div>

				<FittingResultPreview
					originalImageUrl={previewUrl}
					status={status}
				/>

				<FittingProgressBox status={status}/>

				<VerifySteps stepStatus={stepStatus}/>
				{
					status === 'SUCCESS' && 
					<div className='flex flex-col gap-2 -mt-4 animate-frame-in'>
						<Button size='lg'>이 사진으로 피팅하기</Button>
						<Button
							size='lg'
							variant='outlined'
						>사진 변경하기</Button>
					</div>
				}
  
				{
					(status === 'SUCCESS' || status === 'FAIL') && 
					<TipSection />
				}
			</div>
		</div>
	);
};

export default VerifyingSection;
