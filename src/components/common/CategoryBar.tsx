import React from 'react';
import type { CategoryKey } from '@/src/types/products/product';
import { Icons } from '@/src/assets/icons/components/Icons';
import { cn } from '@/src/utils/cn';

const categories: readonly {
  name: CategoryKey;
	Icon: React.FC<{ size?: number; className?: string }>,
}[] = [
	{ name: '전체', Icon: Icons.All },
	{ name: '상의', Icon: Icons.Top },
	{ name: '하의', Icon: Icons.Bottom },
	{ name: '아우터', Icon: Icons.Outer },
	{ name: '원피스', Icon: Icons.OnePiece },
	{ name: '기타', Icon: Icons.Etc },
];

interface CategoryBarProps {
  selected: CategoryKey;
  onSelect: (category: CategoryKey) => void;
}

const CategoryBar = ({ selected, onSelect }: CategoryBarProps) => {
	return (
		<div className="w-full overflow-hidden bg-transparent sticky top-0 z-20 transition-colors duration-300">
			<div className="flex overflow-x-auto no-scrollbar justify-center items-center p-4">
				<div className="flex gap-[10px] items-center whitespace-nowrap">
					{categories.map((cat) => {
						const isActive = selected === cat.name;

						return (
							<button
								key={cat.name}
								onClick={() => onSelect(cat.name)}
								className={`
                                    flex shrink-0 items-center justify-center min-w-[60px] p-[10px] 
                                    rounded-full gap-1 border box-border cursor-pointer transition-all
                                    ${
                                        /* ✅ 미선택 버튼 배경: bg-white -> dark:bg-neutral-700
                                           ✅ 미선택 버튼 글자: dark:text-neutral-200
                                        */
                                        isActive
                                        	? 'bg-primary-600 text-white border-primary-600'
                                        	: 'bg-white dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 border-neutral-300 dark:border-neutral-600'
                                    }
                                `}
							>
								<cat.Icon
									className={cn('w-5',
										isActive ? 'text-white' : 'text-neutral-500',
									)}
								/>
								<span className={`text-medium-14 font-pretandard ${cat.name === '전체' ? 'ml-[2px]' : 'ml-[-1px]'}`}>
									{cat.name}
								</span>
							</button>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default CategoryBar;
