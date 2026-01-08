import { SettingIcon } from "../common/Icons";

const Header = ({ title = "Every Wear" }) => {
  return (
    <header className="flex w-[375px] h-[45px] px-4 justify-between items-end bg-white pb-2 mx-auto">
      {/* 균형을 맞추기 위한 왼쪽 투명 박스 */}
      <div className="w-[19.5px]" />

      <h1 className="text-primary text-center font-['Pretendard'] text-[20px] font-[800] tracking-[-0.4px] leading-none">
        {title}
      </h1>

      <button 
        className="text-primary cursor-pointer active:scale-95 transition-transform"
        onClick={() => alert("설정 창으로 이동합니다.")}
      >
        <SettingIcon />
      </button>
    </header>
  );
};

export default Header;