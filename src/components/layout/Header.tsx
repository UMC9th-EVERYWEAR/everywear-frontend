interface HeaderProps {
  type: 'main' | 'sub'; 
  title?: string;       
  onBack?: () => void;  
}

const Header = ({ type, title = 'EVERY WEAR', onBack }: HeaderProps) => {
    return (
        <header className="w-full h-[45px] px-4 bg-white flex items-center sticky top-0 z-30 shadow-[var(--shadow-12)]">
      
            {type === 'main' ? (
            /*1. 메인 헤더 레이아웃*/
                <div className="flex justify-between items-end w-full pb-1">
                    <img 
                        src="../../public/svgs/LogoImages/Everywear.svg" 
                        alt="Everywear" 
                        className="h-[18px] w-auto object-contain"
                    />
                    <button className="text-[var(--color-primary-600)] transition-opacity active:opacity-50 cursor-pointer">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                            <circle
                                cx="12"
                                cy="12"
                                r="3"
                            />
                        </svg>
                    </button>
                </div>
            ) : (
            /*2. 서브 헤더 레이아웃*/
                <div className="flex items-center w-full h-full">
                    <button 
                        onClick={onBack}
                        className="flex items-center justify-center mr-2 active:opacity-50 transition-opacity cursor-pointer"
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
                                stroke="var(--color-primary-600)"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                    <h2 
                        className="text-[var(--color-primary-600)] text-medium-16 tracking-[-0.48px]"
                    >
                        {title}
                    </h2>
                </div>
            )}
        </header>
    );
};

export default Header;