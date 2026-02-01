

const NameRow = ({ part, names }: {part: string, names: string[]}) => {
	return(
		<div className='flex gap-1'>
			<span className='text-medium-12 w-11'>{part}</span>
			<div className='flex gap-1'>
				{
					names.map((i)=> (
						<span
							key={i}
							className='text-regular-12'
						>{i}</span>
					))
				}
			</div>
		</div>
	)
}

const FooterNameSection = () => {
  
	const pmName = ['박정범']
	const designName = ['이소민', '김재경']
	const feName = ['최정인', '김동환', '김재범'] 
	const beName = ['임준서', '김태림', '신영섭', '윤정민'] 

	return(
		<div
			className='flex flex-col'
		>
			<NameRow
				part='PM'
				names={pmName}
			/>
			<NameRow
				part='DESIGN'
				names={designName}
			/><NameRow
				part='FE'
				names={feName}
			  /><NameRow
				part='BE'
				names={beName}
			    />
		</div>
	)
}
export default FooterNameSection
