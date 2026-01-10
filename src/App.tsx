import Header from './components/layout/Header';
import { Navbar } from './components/layout/Navbar';
import Home from './pages/Home'; // 수정된 Home 컴포넌트 임포트

function App() {
  return (
    // 전체 배경: 중앙 정렬 및 연한 회색 배경
    <div className="min-h-screen bg-neutral-50 flex justify-center font-['Pretendard']">
      
      {/* 375px 모바일 피그마 규격 컨테이너 */}
      <div className="w-[375px] min-h-screen bg-white shadow-xl flex flex-col relative overflow-x-hidden">
        
        {/* 1. 상단 레이아웃 (고정) */}
        <Header />
        
        {/* 2. 스크롤 가능한 메인 콘텐츠 영역 */}
        <main className="flex-1 overflow-y-auto no-scrollbar pb-[70px]">
          <Home />
        </main>

        {/* 3. 하단 네비게이션 바 (고정) */}
        <Navbar />
        
      </div>
    </div>
  );
}

export default App;