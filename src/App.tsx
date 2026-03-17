import { HashRouter, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
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
import QRCodePage from './pages/QRCodePage';
import LinkShortenerPage from './pages/LinkShortenerPage';
import DashboardPage from './pages/DashboardPage';

function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

function AppRoutes() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <Routes>
      {/* Preview page – no Navbar */}
      <Route path="/preview" element={<PreviewPage />} />
      <Route path="/:username" element={<PreviewPage />} />

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
        <Route path="/qr-code" element={<QRCodePage />} />
        <Route path="/link-shortener" element={<LinkShortenerPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </AuthProvider>
  );
}
