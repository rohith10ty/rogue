import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { CartProvider, useCart } from './context/CartContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { Gridlines } from './components/common/Gridlines';
import { ProductModal } from './components/common/ProductModal';
import { FloatingCartPill } from './components/common/FloatingCartPill';
import { FlyToCartOverlay } from './components/common/FlyToCartOverlay';
import { SearchModal } from './components/common/SearchModal';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { CartPage } from './pages/CartPage';
import { ArrowUp, Sparkles } from 'lucide-react';

const AppContent = () => {
  const [currentPage, setCurrentPage] = useState('landing'); // 'landing' | 'login'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchOpen, setSearchOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);
  const [modalInitialImageIdx, setModalInitialImageIdx] = useState(0);
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  const { toastMessage, showToast } = useCart();

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9
    });

    let frameId;
    function raf(time) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }

    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);

  const handleOpenQuickView = (product, initialIndex = 0) => {
    setModalProduct(product);
    setModalInitialImageIdx(initialIndex);
  };

  const handleCloseQuickView = () => {
    setModalProduct(null);
  };

  const handleLoginSuccess = (userData) => {
    setAuthenticatedUser(userData);
    setCurrentPage('landing');
    showToast(`Welcome, ${userData.name}. VIP Atelier privileges unlocked.`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col justify-between relative bg-[#F9F8F6] text-[#1A1A1A] dark:bg-[#121212] dark:text-[#F9F8F6] selection:bg-[#D4AF37] selection:text-[#1A1A1A] transition-colors duration-300 font-sans antialiased">
      
      {/* 4 Fixed Vertical Gridlines & Paper Grain Noise Overlay */}
      <Gridlines />



      {/* Top Navigation */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onOpenSearch={() => setSearchOpen(true)}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setCurrentPage('landing');
          setTimeout(() => {
            const sectionMap = {
              'T-Shirts': 't-shirts-section',
              'Outerwear': 'hoodies-section',
              'Sweatshirts': 'hoodies-section',
              'Shirts': 'shirts-section',
              'Trousers': 'pants-section'
            };
            const targetId = sectionMap[cat] || 'collection-section';
            const el = document.getElementById(targetId);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}
      />

      {/* Main Viewport */}
      <main className="flex-grow z-10">
        {currentPage === 'landing' && (
          <LandingPage
            onQuickView={handleOpenQuickView}
            onNavigate={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentPage === 'cart' && (
          <CartPage
            onNavigate={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentPage === 'login' && (
          <LoginPage
            onLoginSuccess={handleLoginSuccess}
            onNavigate={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setCurrentPage('landing');
          setTimeout(() => {
            const sectionMap = {
              'T-Shirts': 't-shirts-section',
              'Outerwear': 'hoodies-section',
              'Sweatshirts': 'hoodies-section',
              'Shirts': 'shirts-section',
              'Trousers': 'pants-section'
            };
            const targetId = sectionMap[cat] || 'collection-section';
            const el = document.getElementById(targetId);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}
        onNavigate={(page) => {
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Product Detail Modal Pop-up */}
      <ProductModal
        product={modalProduct}
        initialImageIndex={modalInitialImageIdx}
        isOpen={!!modalProduct}
        onClose={handleCloseQuickView}
        onNavigate={setCurrentPage}
      />

      {/* Floating Bottom-Right Cart Pill (Hidden when modals are active to prevent overlaying on mobile) */}
      {currentPage !== 'cart' && !modalProduct && !searchOpen && (
        <FloatingCartPill onNavigate={setCurrentPage} />
      )}

      {/* Fly-to-Cart Animation Overlay */}
      <FlyToCartOverlay />

      {/* Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectProduct={(prod) => handleOpenQuickView(prod, 0)}
      />

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-7 left-7 z-40 p-2.5 bg-[#1A1A1A] text-[#F9F8F6] dark:bg-[#F9F8F6] dark:text-[#1A1A1A] border border-[#D4AF37]/50 shadow-xl hover:bg-[#D4AF37] hover:text-[#1A1A1A] transition-colors duration-200 focus:outline-none"
        aria-label="Scroll to Top"
      >
        <ArrowUp className="w-4 h-4" />
      </button>

    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </ThemeProvider>
  );
}
