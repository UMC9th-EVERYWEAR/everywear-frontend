import PartnerMallSection from './PartnerMallSection';


const MallLogosSection = () => {
	return(
		

		<div className="w-85 bg-neutral-50 py-7 px-8.5 flex flex-col  gap-5 rounded-lg">
			<div className='flex justify-center gap-3'>

				<PartnerMallSection />

			</div>
      	
			<div>
				<span className="text-start pl-3 text-primary-300 text-regular-10 cursor-pointer hover:opacity-75">
					유명 브랜드 가상 피팅 가이드 &gt;
				</span>
			</div>  
		</div>

	)
};
export default MallLogosSection
