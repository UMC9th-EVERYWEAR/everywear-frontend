import { useState } from 'react';
import Header from './components/layout/Header';
import { Navbar } from './components/layout/Navbar';
import CategoryBar from './components/common/CategoryBar';
import { Button } from './components/common/Button';
import { Modal } from './components/common/Modal';

function App() {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-50 flex justify-center font-['Pretendard']">
      <div className="w-[375px] min-h-screen bg-white shadow-xl flex flex-col relative overflow-x-hidden">
        
        {/* type=main은 everywear, type=sub는 최근피팅내역 헤더 */}
        <Header type="main" /> 
        
        <CategoryBar />

        <main className="flex-1 overflow-y-auto p-4 flex flex-col items-center gap-6 pt-10">
          <Button onClick={() => setIsConfirmOpen(true)}>AI 피팅하기</Button>
          <Button variant="outlined" onClick={() => setIsErrorOpen(true)}>사진 변경하기</Button>
          <Button disabled onClick={() => setIsWithdrawOpen(true)}>탈퇴하기</Button>
          <Button variant="hover" onClick={() => alert('Hover 버튼 클릭')}>AI 피팅하기</Button>
        </main>

        <Navbar />

        {/* 확인 모달 */}
        <Modal
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          title="피팅을 시작할까요?"
          text="선택하신 상품으로 AI 피팅을 진행합니다."
          btn1Text="시작하기"
          btn1Action={() => {
            alert('피팅 시작!');
            setIsConfirmOpen(false);
          }}
          btn2Text="취소"
          btn2Action={() => setIsConfirmOpen(false)}
        />

        {/* 에러 모달 (버튼 1개) */}
        <Modal
          isOpen={isErrorOpen}
          onClose={() => setIsErrorOpen(false)}
          title="AI 피팅을 실패했습니다."
          text="나중에 다시 시도해주세요."
          btn1Text="확인"
          btn1Action={() => setIsErrorOpen(false)}
        />

        {/* 탈퇴 모달 */}
        <Modal
          isOpen={isWithdrawOpen}
          onClose={() => setIsWithdrawOpen(false)}
          title="정말 탈퇴하시겠습니까?"
          btn1Text="예"
          btn1Action={() => {
            alert('탈퇴 처리됨');
            setIsWithdrawOpen(false);
          }}
          btn2Text="아니오"
          btn2Action={() => setIsWithdrawOpen(false)}
        />
      </div>
    </div>
  );
}

export default App;