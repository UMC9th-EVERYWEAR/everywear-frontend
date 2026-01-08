import { BottomNav } from "./components/layout/Navbar";

function App() {
  return (
    /* 화면 전체 중앙 정렬을 위한 래퍼 */
    <div className="min-h-screen bg-gray-200 flex justify-center font-['Pretendard']">
      
      {/* 375px 규격의 메인 모바일 뷰박스 (relative 필수) */}
      <div className="w-[375px] min-h-screen bg-white shadow-2xl flex flex-col relative overflow-hidden">
        
        {/* 콘텐츠 영역 */}
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-primary text-2xl font-extrabold mb-2">Every Wear</h1>
            <p className="text-secondary text-[12px]">하단 탭 규격 적용 완료</p>
          </div>
        </main>

        {/* 이제 absolute가 적용된 네비게이션 바가 이 박스 안 하단에 위치합니다. */}
        <BottomNav />

      </div>
    </div>
  );
}

export default App;