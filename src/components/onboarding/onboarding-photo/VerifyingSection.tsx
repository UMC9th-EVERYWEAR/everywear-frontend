import React, { useMemo } from 'react';
import FittingResultPreview, { type FittingStatus } from './FittingResultPreview';
import FittingProgressBox from './FittingProgressBox';
import { useEffect, useRef, useState } from 'react';
import VerifySteps, { type StepStatus } from './VerifySteps';
import Button from '../../common/Button';
import TipSection from './TipSection';
import { useVerifyAndSaveProfileImage } from '@/src/hooks/service/user/useVerifyAndSaveProfileImage';
import LoadingGuide from './LoadingGuide';
import type { AxiosError } from 'axios';
import { useNavigate } from 'react-router';
import { PATH } from '@/src/constants/path';

type VerifyPhase = 'IDLE' | 'VERIFYING' | 'SUCCESS' | 'FAIL';
type VerifyErrorType = 'INVALID_IMAGE' | 'SERVER_ERROR' | null;


interface VerifyingSectionProps {
	previewUrl: string;
	resizingPhoto: File | null ;
	setIsVerify: React.Dispatch<React.SetStateAction<boolean>>

}


const VerifyingSection = ({ previewUrl, resizingPhoto, setIsVerify } : VerifyingSectionProps)  => {

	const [stepIndex, setStepIndex] = useState<number | null>(null);

	const requestedRef = useRef(false);
	const navigate = useNavigate();


	const { mutateAsync } = useVerifyAndSaveProfileImage();

	const [phase, setPhase] = useState<VerifyPhase>('VERIFYING');
	const [errorType, setErrorType] = useState<VerifyErrorType>(null);

	useEffect(() => {
		if (!resizingPhoto || requestedRef.current) return;
		requestedRef.current = true;


		(async () => {
			try {
				await mutateAsync(resizingPhoto);
				setPhase('SUCCESS');
			} catch (error) {
				const status = (error as AxiosError)?.response?.status;

				if (status === 400) {
					setErrorType('INVALID_IMAGE');
				} else if (status === 500) {
					setErrorType('SERVER_ERROR');
				}

				setPhase('FAIL');
			}
		})();
	}, [resizingPhoto, mutateAsync]);



	useEffect(() => {
		if (phase !== 'VERIFYING') return;

		const t1 = window.setTimeout(() => setStepIndex(1), 12000);
		const t2 = window.setTimeout(() => setStepIndex(2), 14000);


		return () => {
			clearTimeout(t1);
			clearTimeout(t2);
		};
	}, [phase]);



	  // 전체 상태
	const status: FittingStatus =
    phase === 'VERIFYING'
    	? 'LOADING'
    	: phase === 'SUCCESS'
    		? 'SUCCESS'
    		: 'FAIL';


	// 단계별 상태
	const stepStatus: StepStatus[] = useMemo(() => {
		if (phase === 'FAIL') return ['FAIL', 'FAIL', 'FAIL'];
		if (phase === 'SUCCESS') return ['SUCCESS', 'SUCCESS', 'SUCCESS'];

		return [
			stepIndex === null ? 'LOADING' : 'SUCCESS',
			stepIndex === 1
				? 'LOADING'
				: stepIndex !== null && stepIndex >= 2
					? 'SUCCESS'
					: 'WAIT',
			stepIndex !== null && stepIndex >= 2 ? 'LOADING' : 'WAIT',
		];
	}, [phase, stepIndex]);


	// if(!previewUrl || !resizingPhoto){
	// 	setIsVerify(false)
	// }

	return (
		<div className="min-h-screen flex flex-col items-center py-4 px-2.5 text-center">
			<div className='w-full h-px bg-neutral-200 mb-6'/>

			<div className='flex flex-col gap-8'>

				<LoadingGuide />

				<FittingResultPreview
					originalImageUrl={previewUrl}
					status={status}
				/>

				<FittingProgressBox status={status}/>

				<VerifySteps stepStatus={stepStatus}/>

				{
					status === 'SUCCESS' && 
					<div className='flex flex-col gap-2 -mt-4 animate-frame-in'>
						<Button						
							size='lg'
							onClick={()=> navigate(PATH.HOME)}
						>이 사진으로 피팅하기</Button>
						<Button
							size='lg'
							variant='outlined'
							onClick={()=> setIsVerify(false)}
						>사진 변경하기</Button>
					</div>
				}
				{		
					(errorType === 'INVALID_IMAGE' || errorType === 'SERVER_ERROR') && 
					<Button
						size='lg'
						onClick={()=> setIsVerify(false)}
					>다른 사진 선택하기
					</Button>

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
