import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './router/routes/ProtectedRoute'; // ✅ 알려주신 경로 반영
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex justify-center">
        {/* 모바일 뷰 컨테이너 */}
        <div className="relative w-[375px] h-screen bg-white shadow-lg overflow-hidden flex flex-col">
          
          <Routes>
            {/* 🔒 레이아웃(헤더/네브바)이 포함된 ProtectedRoute를 부모로 설정 */}
            <Route element={<ProtectedRoute />}>
              {/* ✅ "/" 경로로 들어오면 바로 Home 컴포넌트를 보여줌 */}
              <Route path="/" element={<Home />} />
              
              {/* 나중에 페이지가 추가되면 여기에 더 넣으시면 됩니다 */}
              {/* <Route path="/setting" element={<SettingPage />} /> */}
            </Route>
          </Routes>

        </div>
      </div>
    </Router>
  );
}

export default App;