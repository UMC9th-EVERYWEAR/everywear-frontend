import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PATH } from './router/path'; 
import RootLayout from '@/src/components/layout/RootLayout';
import ProtectedRoute from '@/src/router/routes/ProtectedRoute';
import Home from '@/src/pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Navigate to={PATH.HOME} replace />} />
            
            <Route path={PATH.HOME} element={<Home />} />
          </Route>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;