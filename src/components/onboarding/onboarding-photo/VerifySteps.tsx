import { Icons } from '@/src/assets/icons/components/Icons';
import { cn } from '@/src/utils/cn';

export type StepStatus = 'WAIT' | 'LOADING' | 'SUCCESS' | 'FAIL';

interface VerifyStepsProps {
  stepStatus: StepStatus[];
}

const steps = [
	{
		label: '신체 인식',
		type: 'PROCESS',
	},
	{
		label: '의상 매칭',
		type: 'PROCESS',
	},
	{
		label: '피팅 품질',
		type: 'RESULT',
	},
] as const;

const getStepText = (
	step: typeof steps[number],
	status: StepStatus,
) => {
	if (step.type === 'PROCESS') {
		if (status === 'LOADING') return '진행 중';
		if (status === 'SUCCESS') return '완료';
		if (status === 'FAIL') return '실패';
		return '대기 중';
	}

	// RESULT 타입 (피팅 품질)
	if (status === 'SUCCESS') return '우수';
	if (status === 'FAIL') return '기준 미달';
	if (status === 'LOADING') return '분석 중';
	return '대기 중';
};


const getStepIcon = (
	step: typeof steps[number],
	status: StepStatus,
) => {
	if (status === 'LOADING' || status === 'WAIT') return Icons.CheckLogin;


	if (step.type === 'PROCESS') {
		return status === 'SUCCESS' ? Icons.CheckLogin : Icons.XBox;
	}

	// RESULT 타입
	if (status === 'SUCCESS') return Icons.CheckLogin;
	if (status === 'FAIL') return Icons.XBox;

	return Icons.Loading;
};

const getIconClass = (
	status: StepStatus,
) => {
	if (status === 'LOADING') return 'animate-infinite-fade opacity-70';
	if (status === 'WAIT') return 'opacity-30';
	return 'opacity-100';
};


const VerifySteps = ({ stepStatus }: VerifyStepsProps) => {
	
	return (
		<div className="flex flex-col text-neutral-600 gap-2">
			{steps.map((step, index) => {
				const status = stepStatus[index];
				const StepIcon = getStepIcon(step, status);

				return (
					<div
						key={step.label}
						className="flex gap-4 items-center"
					>
						<StepIcon
							className={cn(
								'w-5 h-5',
								getIconClass(status),
								'text-primary-300',
							)}
						/>
						<span
							key={`${step.label}-${status}`}
							className="animate-text-change"
						>
							{step.label} {getStepText(step, status)}
						</span>
					</div>
				);
			})}

			
		</div>
	);
};
export default VerifySteps
