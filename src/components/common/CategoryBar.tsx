import React from 'react';
import type { CategoryKey } from '@/src/types/products/product';
import { AllIcon, BottomIcon, EtcIcon, OnepeiceIcon, OuterIcon, TopIcon } from '@/src/assets/icons/components/Icons';
import { cn } from '@/src/utils/cn';

const categories: readonly {
  name: CategoryKey;
	Icon: React.FC<{ size?: number; className?: string }>,
}[] = [
	{ name: '전체', Icon: AllIcon },
	{ name: '상의', Icon: TopIcon },
	{ name: '하의', Icon: BottomIcon },
	{ name: '아우터', Icon: OuterIcon },
	{ name: '원피스', Icon: OnepeiceIcon },
	{ name: '기타', Icon: EtcIcon },
];

interface CategoryBarProps {
  selected: CategoryKey;
  onSelect: (category: CategoryKey) => void;
}

const CategoryBar = ({ selected, onSelect }: CategoryBarProps) => {
	return (
		<div className=' w-[375px] overflow-x-auto bg-white sticky top-0 z-20 sm:w-full sm:-mx-2'>
			<div className='flex gap-[10px] p-4 items-center whitespace-nowrap'>
				{categories.map((cat) => {
					const isActive = selected === cat.name;

					return (
						<button
							key={cat.name}
							onClick={() => onSelect(cat.name)}
							className={`
                flex shrink-0 items-center justify-center min-w-[60px] p-[10px] 
                rounded-full gap-1 border box-border cursor-pointer
                transition-all duration-200
                ${
                  isActive
                  	? 'bg-[var(--color-primary-600)] text-[var(--color-neutral-50)] border-[var(--color-primary-600)]'
                  	: 'bg-[var(--color-neutral-100)] text-[var(--color-neutral-700)] border-[var(--color-neutral-300)]'
                }
              `}
						>
							<cat.Icon
								className={cn('w-5',
									isActive ? 'text-white' : 'text-neutral-700',
								)}
							/>
							<span
								className={`
                  text-medium-12 font-pretandard
                  ${isActive ? 'font-bold' : ''}
                  ${cat.name === '전체' ? 'ml-[2px]' : 'ml-[-1px]'}
                `}
							>
								{cat.name}
							</span>
						</button>
					);
				})}
			</div>
		</div>
	);
};

export default CategoryBar;
