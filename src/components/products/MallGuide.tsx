import { useState } from 'react'
import { GUIDE_IMAGES } from '@/src/constants/images'


interface MallGuideProps {
	onClose : () => void
}
const MallGuide = ({ onClose }: MallGuideProps) => {
	const [step, setStep] = useState<number>(1)
	return(
		<div		className="fixed inset-0 z-100 flex items-center justify-center bg-black/50">
			{
				step === 1 && 
				<button
					onClick={()=> setStep((prev)=> prev+1)}
				>
					<img
						src={GUIDE_IMAGES.GUIDE_1}
						alt='step1'
					/>
				</button>
			}			
			{
				step === 2 && 
				<button
					onClick={()=> setStep((prev)=> prev+1)}
				>
					<img
						src={GUIDE_IMAGES.GUIDE_2}
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
						src={GUIDE_IMAGES.GUIDE_3}
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
						src={GUIDE_IMAGES.GUIDE_4}
						alt='step4'
					/>
				</button>
			}
		</div>
	)
}
export default MallGuide
