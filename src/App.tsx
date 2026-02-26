import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import TemplatesPage from './pages/TemplatesPage';
import MarketplacePage from './pages/MarketplacePage';
import LearnPage from './pages/LearnPage';
import CreatePage from './pages/CreatePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AudienceContactsPage from './pages/AudienceContactsPage';
import PreviewPage from './pages/PreviewPage';

function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Preview page – no Navbar */}
          <Route path="/preview" element={<PreviewPage />} />

          {/* All other pages – with Navbar */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/templates" element={<TemplatesPage />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/admin/audience/contacts" element={<AudienceContactsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
