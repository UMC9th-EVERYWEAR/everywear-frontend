import { IconSvg } from '@/src/assets/icons';
import type { SvgIconKey } from '@/src/assets/icons/svg/SvgIcon';
import type { CategoryKey } from '@/src/types/products/product';

const categories: readonly { name: CategoryKey; icon: SvgIconKey; }[] = [
	{ name: '전체', icon: 'All' },
	{ name: '상의', icon: 'Top' },
	{ name: '하의', icon: 'Bottom' },
	{ name: '아우터', icon: 'Outer' },
	{ name: '원피스', icon: 'Dress' },
	{ name: '기타', icon: 'Etc' },
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
								<IconSvg
									name={cat.icon}
									active={isActive}
									size={16}
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
