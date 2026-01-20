import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './router/routes/ProtectedRoute'; 
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex justify-center">
        {/* 모바일 뷰 컨테이너 */}
        <div className="relative w-[375px] h-screen bg-white shadow-lg overflow-hidden flex flex-col">
          
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Home />} />
            </Route>
          </Routes>

        </div>
      </div>
    </Router>
  );
}

export default App;
