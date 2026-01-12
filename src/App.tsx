import { useState } from 'react';
import Header from './components/layout/Header';
import { Navbar } from './components/layout/Navbar';
import { Modal } from './components/common/Modal';
import Home from './pages/Home';

function App() {
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="relative w-[375px] h-screen bg-white shadow-lg overflow-hidden flex flex-col">
        
        {/* 상단 고정 헤더 */}
        <Header type="main" />

        {/* 2. 메인 영역에 Home 컴포넌트를 넣습니다. */}
        <main className="flex-1 overflow-y-auto no-scrollbar">
          <Home />
        </main>

        {/* 하단 네비바 */}
        <Navbar />

        {/* 모달 등 전역 요소 */}
        <Modal 
          isOpen={isWithdrawOpen}
          onClose={() => setIsWithdrawOpen(false)}
          title="정말 탈퇴하시겠습니까?"
          btn1Text="확인"
          btn1Action={() => setIsWithdrawOpen(false)}
        />
      </div>
    </div>
  );
}

export default App;