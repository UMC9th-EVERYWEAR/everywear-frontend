interface ItemAddCountSectionProps {
    category : string;
    count : number;
    onClick : () => void
}


const ItemAddCountSection = ({ category, count, onClick } : ItemAddCountSectionProps) => {
	return (
		<div className='flex justify-between items-center mb-5'>
			<p className='text-regular-14 font-anonymous'>{category} 상품({count})</p>
			<button
				className='w-18 h-6 px-1.75 py-1.25 flex justify-center 
                items-center border rounded-sm border-none bg-primary-600 shrink-0 
                font-inter text-regular-12 text-white cursor-pointer'
				onClick={onClick}
			>+ 상품추가</button>
		</div>
	)
}

export default ItemAddCountSection
