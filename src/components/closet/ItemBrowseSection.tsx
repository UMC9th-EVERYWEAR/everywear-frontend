import ProductCard from '../common/ProductCard';
import { IconImage } from '@/src/assets/icons/image/IconImage';
import type { ListDTO } from '@/src/apis/generated';
import { Virtuoso } from 'react-virtuoso'
import { forwardRef } from 'react';
import React from 'react';
import type { HTMLAttributes } from 'react';

interface ItemBrowseSectionProps {
    data : ListDTO[],
	isCloset?: boolean
}
const VIRTUALIZE_THRESHOLD = 50;

const GridList = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
		 
	// eslint-disable-next-line react/prop-types
	({ style, children, ...props }, ref) => (
		<div
			ref={ref}
			{...props}
			style={{
				display: 'flex',
				flexWrap: 'wrap',
				...style,
			}}
		>
			{children}
		</div>
	),
);
GridList.displayName = 'GridList';


const GridItem = ({ style, children, ...props }: HTMLAttributes<HTMLDivElement>) => (
	<div
		{...props}
		style={{
			width: '33.3333%',
			padding: '8px',
			boxSizing: 'border-box',
			...style,
		}}
	>
		{children}
	</div>
);

const ItemBrowseSection = ({ data, isCloset = false } : ItemBrowseSectionProps) => {
	const shouldVirtualize = data.length >= VIRTUALIZE_THRESHOLD;



	if(data.length === 0 ) {
		return(
			<div className="flex flex-col items-center justify-center text-neutral-500 text-medium-15 h-[75vh]">

				<IconImage
					name="Product"
					size={200}
				/>
				<span className='text-medium-20 mb-3'>아직 피팅할 상품이 없어요</span>
				<p className='text-medium-14'>
					관심 있는 상품을 추가하고
				</p>
				<p className='text-medium-14'>
					AI 피팅으로 스타일을 미리 확인해 보세요.					
				</p>
			</div>
		)
	}

	// 일단 50개 이상일 때만 Virtuoso 적용
	// 서버에서 개수 구분 없이 한 번에 내려주기 때문
	if(shouldVirtualize){
		return(
			<div className='h-full'>
				{
					<Virtuoso
						data={data}
						style={{ height: '80vh' }}
						initialItemCount={8}
						overscan={2000}
						// useWindowScroll
						components={{
							List: GridList,
							Item: GridItem,
						}}
						itemContent={(_, product) => (
							<ProductCard
								id={product.product_id ?? 0}
								company={product.brand_name ?? ''}
								name={product.product_name ?? ''}
								price={product.price ?? ''}
								rating={product.star_point ?? 0}
								imageUrl={product.product_img_url ?? ''}
								isCloset={isCloset}
								productUrl={product.product_url ?? ''}
							/>
						)}
					/>
				}
			</div>
		)
	}
	
	return (
		<>
			<div className='grid grid-cols-2 gap-2.5 place-items-center sm:grid-cols-3'>
				{data.map((product) => (
					<ProductCard
						key={product.product_id} // 리스트 렌더링엔 key가 필수
						id={product.product_id ?? 0}
						company={product.brand_name ?? ''}
						name={product.product_name ?? ''}
						price={product.price ?? ''}
						rating={product.star_point ?? 0}
						imageUrl={product.product_img_url ?? ''}
						isCloset={isCloset}
						productUrl={product.product_url ?? ''}
					/>
				))}
			</div>

		
		</>
	)
}

export default ItemBrowseSection
