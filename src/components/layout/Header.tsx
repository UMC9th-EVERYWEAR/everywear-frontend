import { useNavigate } from 'react-router';
import { ICON_PATHS } from '../../constants/path'; 
import { LOGO_IMAGES } from '@/src/constants/images';

interface HeaderProps {
  type: 'main' | 'sub'; 
  title?: string;       
  onBack?: () => void;  
}

const Header = ({ type, title = 'EVERY WEAR', onBack }: HeaderProps) => {
	const navigate = useNavigate();

    // 뒤로가기 로직: 부모의 onBack이 있으면 실행, 없으면 이전 페이지로 이동
    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            navigate(-1);
        }
    };

    return (
        <header className="w-full h-[45px] px-4 bg-white flex items-center sticky top-0 z-30 shadow-12">
            {type === 'main' ? (
                /* 1. 메인 헤더 레이아웃*/
                <div className="flex justify-between items-end w-full pb-1">
                    <img 
                        src={LOGO_IMAGES.EVERYWEAR}
                        alt="Everywear" 
                        className="h-[18px] w-auto object-contain"
                    />
                    <button 
                            className="text-primary-600 transition-opacity active:opacity-50 cursor-pointer"
                            aria-label="설정"
                            onClick={() => navigate('/setting')} >
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
                            {/* 상수 처리된 설정 아이콘 경로 사용 */}
                            <path d={ICON_PATHS.SETTINGS} />
                            <circle cx="12" cy="12" r="3" />
                        </svg>
                    </button>
                </div>
            ) : (
                /* 2. 서브 헤더 레이아웃 (뒤로가기 + 타이틀) */
                <div className="flex items-center w-full h-full">
                    <button 
                        onClick={handleBack}
                        className="flex items-center justify-center mr-2 active:opacity-50 transition-opacity cursor-pointer"
                        aria-label="뒤로가기"
                    >
                        <svg
                            width="10"
                            height="18"
                            viewBox="0 0 10 18"
                            fill="none"
                            className="shrink-0"
                        >
                            <path
                                /* 상수 처리된 뒤로가기 아이콘 경로 사용 */
                                d={ICON_PATHS.BACK}
                                stroke="currentColor"
                                className="text-primary-600"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                    <h2 className="text-primary-600 text-medium-16 tracking-[-0.48px] font-bold">
                        {title}
                    </h2>
                </div>
            )}
        </header>
    );
};

export default Header;