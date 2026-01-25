import { ICON_DATA } from '../../../public/Svgs/Icons/SvgIndex';

// 1. Props 타입 정의
interface CategoryBarProps {
	selected: string;
	onSelect: (category: string) => void;
}

// 아이콘 컴포넌트들은 그대로 유지 (ESLint 규칙에 맞춰 홑따옴표로 수정)
const AllIcon = ({ isActive }: { isActive: boolean }) => (
	<div className='flex items-center justify-center w-[16px] h-[16px] px-[2px] py-[2px]'>
		{ICON_DATA.AllIcon(isActive)}
	</div>
);

const TopIcon = ({ isActive }: { isActive: boolean }) => (
	<div className='flex items-center justify-center w-[16px] h-[16px] px-[1.33px] py-[2px]'>
		{ICON_DATA.TopIcon(isActive)}
	</div>
);

const BottomIcon = ({ isActive }: { isActive: boolean }) => (
	<div className='flex items-center justify-center w-[16px] h-[16px] px-[2.66px] py-[0.62px]'>
		{ICON_DATA.BottomIcon(isActive)}
	</div>
);

const OuterIcon = ({ isActive }: { isActive: boolean }) => (
	<div className='flex items-center justify-center w-[18px] h-[18px] px-[1.65px] py-[2.25px]'>
		{ICON_DATA.OuterIcon(isActive)}
	</div>
);

const DressIcon = ({ isActive }: { isActive: boolean }) => (
	<div className='flex items-center justify-center w-[16px] h-[16px] px-[1.79px] py-[0.78px]'>
		{ICON_DATA.DressIcon(isActive)}
	</div>
);

// 2. 부모로부터 selected와 onSelect를 받음
const CategoryBar = ({ selected, onSelect }: CategoryBarProps) => {
	const categories = [
		{ name: '전체', renderIcon: (active: boolean) => <AllIcon isActive={active} /> },
		{ name: '상의', renderIcon: (active: boolean) => <TopIcon isActive={active} /> },
		{ name: '하의', renderIcon: (active: boolean) => <BottomIcon isActive={active} /> },
		{ name: '아우터', renderIcon: (active: boolean) => <OuterIcon isActive={active} /> },
		{ name: '원피스', renderIcon: (active: boolean) => <DressIcon isActive={active} /> },
	];

	return (
		<div className='w-[375px] overflow-x-auto no-scrollbar bg-white sticky top-[45px] z-20'>
			<div className='flex gap-[10px] p-4 items-center whitespace-nowrap'>
				{categories.map((cat) => {
					const isActive = selected === cat.name;
					
					return (
						<button
							key={cat.name}
							onClick={() => onSelect(cat.name)} // 3. 클릭 시 부모의 상태 변경 함수 호출
							className={`
								flex items-center justify-center min-w-[60px] p-[10px] 
								rounded-full gap-0 border box-border cursor-pointer
								transition-all duration-200
								${isActive 
									? 'bg-[#3B4599] text-white font-bold border-[#3B4599]'
									: 'bg-[rgba(255,255,255,0.50)] text-[#596373] border-[#C7CBD2]'
								}
							`}
						>
							<div className='flex items-center justify-center shrink-0'>
								{cat.renderIcon(isActive)}
							</div>
							
							<span className={`
								text-[12px] font-medium font-['Pretendard']
								${cat.name === '전체' ? 'ml-[2px]' : 'ml-[-1px]'}
							`}>
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