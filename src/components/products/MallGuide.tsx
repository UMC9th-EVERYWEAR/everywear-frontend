import { useState } from 'react'
import step1 from '@/public/svgs/guide/guide1.svg'
import step2 from '@/public/svgs/guide/guide2.svg'
import step3 from '@/public/svgs/guide/guide3.svg'
import step4 from '@/public/svgs/guide/guide4.svg'


interface MallGuideProps {
	onClose : () => void
}
const MallGuide = ({ onClose }: MallGuideProps) => {
	const [step, setStep] = useState<number>(1)
	return(
		<div className="fixed inset-0 z-100 flex items-center justify-center bg-neutral-500">
			{
				step === 1 && 
				<button
					onClick={()=> setStep((prev)=> prev+1)}
				>
					<img
						src={step1}
						alt='step1'
						className='w-full'
					/>
				</button>
			}			
			{
				step === 2 && 
				<button
					onClick={()=> setStep((prev)=> prev+1)}
				>
					<img
						src={step2}
						alt='step2'
					/>
				</button>
			}		
			{
				step === 3 && 
				<button
					onClick={()=> setStep((prev)=> prev+1)}
				>
					<img
						src={step3}
						alt='step3'
					/>
				</button>
			}		
			{
				step === 4 && 
				<button
					onClick={onClose}
				>
					<img
						src={step4}
						alt='step4'
					/>
				</button>
			}
		</div>
	)
}
export default MallGuide
