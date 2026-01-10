interface SubHeaderProps {
  title?: string;
}

const SubHeader = ({ title = "최근 피팅 내역" }: SubHeaderProps) => {
  return (
    <header className="w-[375px] h-[45px] px-4 flex items-center bg-white sticky top-0 z-30">
      
      <button 
        className="flex items-center justify-center mr-2 active:opacity-50 transition-opacity"
        aria-label="뒤로가기"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="10" 
          height="18" 
          viewBox="0 0 10 18" 
          fill="none"
          className="shrink-0"
        >
          <path 
            d="M9 1L1 9L9 17" 
            stroke="#3B4599" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className="flex-1 flex items-center h-full">
        <h2 
          className="text-[#3B4599] text-[16px] font-[600] leading-[150%] tracking-[-0.48px]"
          style={{ fontFamily: 'Pretendard' }}
        >
          {title}
        </h2>
      </div>
      
    </header>
  );
};

export default SubHeader;