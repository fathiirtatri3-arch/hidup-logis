import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import './index.css'
import App from './App.jsx'
import Layout from './components/Layout.jsx'
import AuditForm from './pages/AuditForm.jsx'
import ResultsPage from './pages/ResultsPage.jsx'
import Metodologi from './pages/Metodologi.jsx'
import Pricing from './pages/Pricing.jsx'
import FAQ from './pages/FAQ.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import Dashboard from './pages/Dashboard.jsx'
import AboutUs from './pages/AboutUs.jsx'
import NotFound from './pages/NotFound.jsx'
import TermsOfService from './pages/TermsOfService.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<App />} />
          
          {/* 🔥 SEMUA halaman LAIN harus di-wrap dengan Layout */}
          <Route path="/audit" element={
            <Layout>
              <AuditForm />
            </Layout>
          } />
          
          <Route path="/results" element={
            <Layout>
              <ResultsPage />
            </Layout>
          } />
          
          <Route path="/metodologi" element={
            <Layout>
              <Metodologi />
            </Layout>
          } />
          
          <Route path="/pricing" element={
            <Layout>
              <Pricing />
            </Layout>
          } />
          
          <Route path="/faq" element={
            <Layout>
              <FAQ />
            </Layout>
          } />
          
          <Route path="/about" element={
            <Layout>
              <AboutUs />
            </Layout>
          } />
          
          <Route path="/dashboard" element={
            <Layout>
              <Dashboard />
            </Layout>
          } />


          
          {/* 🔥 Halaman login/register BISA dengan atau tanpa Layout */}
          {/* Opsi 1: TANPA Layout (tampilan khusus) */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="*" element={<NotFound />} />
          
          
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)