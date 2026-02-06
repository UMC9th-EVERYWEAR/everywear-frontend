import { IconSvg } from '@/src/assets/icons';
import type { SvgIconKey } from '@/src/assets/icons/svg/SvgIcon';

const categories: readonly {
  name: string;
  icon: SvgIconKey;
}[] = [
	{ name: '전체', icon: 'All' },
	{ name: '상의', icon: 'Top' },
	{ name: '하의', icon: 'Bottom' },
	{ name: '아우터', icon: 'Outer' },
	{ name: '원피스', icon: 'Dress' },
	{ name: '기타', icon: 'Etc' },
];

interface CategoryBarProps {
  selected: string;
  onSelect: (category: string) => void;
}

const CategoryBar = ({ selected, onSelect }: CategoryBarProps) => {
	return (
		<div className='w-[375px] overflow-x-auto bg-white sticky top-0 z-20'>
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
							<IconSvg
								name={cat.icon}
								active={isActive}
								size={16}
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
