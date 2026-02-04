import { useNavigate } from 'react-router';
import { ICON_PATHS } from '../../constants/path'; 
import { PATH } from '@/src/constants/path'; 

interface HeaderProps {
  type: 'main' | 'sub'; 
  title?: string;       
  onBack?: () => void;  
}

// ✅ 타이틀 기본값도 상수가 있다면 대체하는 것이 좋습니다.
const Header = ({ type, title = 'EVERY WEAR', onBack }: HeaderProps) => {
    const navigate = useNavigate();

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
                <div className="flex justify-between items-end w-full pb-1">
                    <img 
                        src="../../public/svgs/LogoImages/Everywear.svg" 
                        alt="Everywear" 
                        className="h-[18px] w-auto object-contain"
                    />
                    <button 
                        className="text-primary-600 transition-opacity active:opacity-50 cursor-pointer"
                        aria-label="설정"
                        /* ✅ 문자열 '/setting' 대신 PATH 상수를 사용합니다 */
                        onClick={() => navigate(PATH.SETTING.ROOT)} >
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
                            <path d={ICON_PATHS.SETTINGS} />
                            <circle cx="12" cy="12" r="3" />
                        </svg>
                    </button>
                </div>
            ) : (
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
                                d={ICON_PATHS.BACK}
                                stroke="currentColor"
                                className="text-primary-600"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                    {/* ✅ font-pretandard 적용 및 폰트 스타일 통일 */}
                    <h2 className="text-primary-600 text-medium-16 tracking-[-0.48px] font-bold font-pretandard">
                        {title}
                    </h2>
                </div>
            )}
        </header>
    );
};

export default Header;