interface SectionTitleProps {
  sectionTitle: string;
  sectionDescription: string;
}

const SectionTitle = ({ sectionTitle, sectionDescription }: SectionTitleProps) => {
	return(
		<div className='flex flex-col items-center w-full text-primary-600 gap-1.5  sm:pt-10'>

			<div className="border-[1.5px] border-primary-600 rounded-full px-2.5 text-semibold-20">{sectionTitle}</div>
			<div className="text-medium-12">{sectionDescription}</div>

		</div>
	)
}
export default SectionTitle
