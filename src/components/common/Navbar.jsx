import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext';
import { Tooltip } from './Tooltip';
import { 
  ShoppingBag, 
  Search, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  User, 
  Heart
} from 'lucide-react';

export const Navbar = ({ currentPage, setCurrentPage, onOpenSearch, onSelectCategory }) => {
  const { theme, toggleTheme } = useTheme();
  const { totalItemsCount, setIsCartOpen, wishlist } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page, sectionId = null) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
    if (page === 'landing' && sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#F9F8F6]/95 dark:bg-[#121212]/95 backdrop-blur-md py-4 border-b border-[#1A1A1A]/10 dark:border-[#F9F8F6]/10' 
          : 'bg-transparent py-6 md:py-8'
      }`}
    >
      <div className="max-w-[1500px] mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Left: Brand Identity (ACME. style -> ROGUE.) */}
        <button 
          onClick={() => handleNavClick('landing')}
          className="font-serif text-2xl md:text-3xl font-bold tracking-[0.15em] text-[#1A1A1A] dark:text-[#F9F8F6] focus:outline-none hover:text-[#D4AF37] transition-colors"
        >
          ROGUE<span className="text-[#D4AF37]">.</span>
        </button>

        {/* Center/Right: Clean Minimalist Nav Links & Inquire Button */}
        <div className="hidden md:flex items-center space-x-8 xl:space-x-10">
          <nav className="flex items-center space-x-8">
            <button
              onClick={() => handleNavClick('landing', 'collection-section')}
              className="text-xs uppercase tracking-[0.25em] font-medium text-[#1A1A1A] dark:text-[#F9F8F6] hover:text-[#D4AF37] transition-colors"
            >
              Collection
            </button>
            
            <button
              onClick={() => handleNavClick('landing', 'lookbook-section')}
              className="text-xs uppercase tracking-[0.25em] font-medium text-[#1A1A1A] dark:text-[#F9F8F6] hover:text-[#D4AF37] transition-colors"
            >
              Atelier
            </button>

            <button
              onClick={() => handleNavClick('landing', 'services-section')}
              className="text-xs uppercase tracking-[0.25em] font-medium text-[#1A1A1A] dark:text-[#F9F8F6] hover:text-[#D4AF37] transition-colors"
            >
              Journal
            </button>
          </nav>

          <div className="flex items-center space-x-3 border-l border-[#1A1A1A]/15 dark:border-[#F9F8F6]/15 pl-6">
            {/* Search */}
            <Tooltip content="Search [⌘K]" position="bottom">
              <button
                onClick={onOpenSearch}
                className="p-1.5 text-[#1A1A1A] dark:text-[#F9F8F6] hover:text-[#D4AF37] transition-colors"
                aria-label="Search"
              >
                <Search className="w-4 h-4 stroke-[1.5]" />
              </button>
            </Tooltip>

            {/* Theme Switcher */}
            <Tooltip content={theme === 'dark' ? "Switch to Alabaster" : "Switch to Obsidian"} position="bottom">
              <button
                onClick={toggleTheme}
                className="p-1.5 text-[#1A1A1A] dark:text-[#F9F8F6] hover:text-[#D4AF37] transition-colors cursor-pointer"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-[#D4AF37] stroke-[1.5]" />
                ) : (
                  <Moon className="w-4 h-4 text-[#1A1A1A] stroke-[1.5]" />
                )}
              </button>
            </Tooltip>

            {/* Wishlist */}
            <Tooltip content={`Wishlist (${wishlist.length})`} position="bottom">
              <button
                onClick={() => handleNavClick('landing', 'collection-section')}
                className="p-1.5 text-[#1A1A1A] dark:text-[#F9F8F6] hover:text-[#D4AF37] transition-colors relative"
                aria-label="Wishlist"
              >
                <Heart className={`w-4 h-4 stroke-[1.5] ${wishlist.length > 0 ? 'fill-[#D4AF37] text-[#D4AF37]' : ''}`} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#D4AF37] text-[#1A1A1A] text-[9px] font-mono font-bold flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>
            </Tooltip>

            {/* Bag Button with Bag Text and Target ID */}
            <Tooltip content="Atelier Bag" position="bottom">
              <button
                id="navbar-bag-button"
                onClick={() => handleNavClick('cart')}
                className={`px-2.5 py-1 transition-all relative flex items-center space-x-1.5 border ${
                  currentPage === 'cart'
                    ? 'border-[#D4AF37] text-[#D4AF37] bg-[#D4AF37]/10 font-bold'
                    : 'border-[#1A1A1A]/10 dark:border-[#F9F8F6]/10 text-[#1A1A1A] dark:text-[#F9F8F6] hover:text-[#D4AF37] hover:border-[#D4AF37]'
                }`}
                aria-label="Shopping Bag"
              >
                <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
                <span className="text-[11px] font-mono uppercase tracking-wider font-semibold">Bag</span>
                {totalItemsCount > 0 && (
                  <span className="text-[10px] font-mono font-bold text-[#D4AF37]">
                    [{totalItemsCount}]
                  </span>
                )}
              </button>
            </Tooltip>

            {/* SIGN IN button */}
            <button
              onClick={() => handleNavClick('login')}
              className={`text-xs uppercase tracking-[0.25em] font-medium px-5 py-2 border transition-all ${
                currentPage === 'login'
                  ? 'bg-[#1A1A1A] text-[#F9F8F6] dark:bg-[#F9F8F6] dark:text-[#1A1A1A] border-transparent'
                  : 'border-[#1A1A1A] dark:border-[#F9F8F6] text-[#1A1A1A] dark:text-[#F9F8F6] hover:bg-[#1A1A1A] hover:text-[#F9F8F6] dark:hover:bg-[#F9F8F6] dark:hover:text-[#1A1A1A]'
              }`}
            >
              Sign In
            </button>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center space-x-3">
          <button
            onClick={toggleTheme}
            className="p-1.5 text-[#1A1A1A] dark:text-[#F9F8F6]"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-[#D4AF37]" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            id="navbar-bag-button-mobile"
            onClick={() => handleNavClick('cart')}
            className="p-1.5 text-[#1A1A1A] dark:text-[#F9F8F6] relative"
            aria-label="Shopping Bag"
          >
            <ShoppingBag className="w-4 h-4" />
            {totalItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#D4AF37] text-[#1A1A1A] text-[9px] font-mono font-bold flex items-center justify-center">
                {totalItemsCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1.5 text-[#1A1A1A] dark:text-[#F9F8F6]"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[68px] bg-[#F9F8F6] dark:bg-[#121212] z-40 border-t border-[#1A1A1A]/10 dark:border-[#F9F8F6]/10 p-8 flex flex-col justify-between animate-fadeIn">
          <div className="flex flex-col space-y-6 pt-4">
            <button
              onClick={() => handleNavClick('landing', 'collection-section')}
              className="text-left font-serif text-2xl tracking-[0.1em] text-[#1A1A1A] dark:text-[#F9F8F6]"
            >
              Collection
            </button>
            <button
              onClick={() => handleNavClick('landing', 'lookbook-section')}
              className="text-left font-serif text-2xl tracking-[0.1em] text-[#1A1A1A] dark:text-[#F9F8F6]"
            >
              Atelier
            </button>
            <button
              onClick={() => handleNavClick('landing', 'services-section')}
              className="text-left font-serif text-2xl tracking-[0.1em] text-[#1A1A1A] dark:text-[#F9F8F6]"
            >
              Journal
            </button>
            <button
              onClick={() => handleNavClick('login')}
              className="text-left font-serif text-2xl tracking-[0.1em] text-[#D4AF37]"
            >
              Client Inquire / Login
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
