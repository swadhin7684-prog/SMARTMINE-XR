import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, HardHat, LogOut, User, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

const publicLinks = [
  { to: '/', label: 'Home' },
  { to: '/training', label: 'Training' },
  { to: '/content', label: 'Content' },
  { to: '/product', label: 'Product' },
  { to: '/plans', label: 'Plans' },
  { to: '/support', label: 'Support' },
];

const authLinks = [
  { to: '/', label: 'Home' },
  { to: '/training', label: 'Training' },
  { to: '/content', label: 'Content' },
  { to: '/plans', label: 'Plans' },
  { to: '/support', label: 'Support' },
  { to: '/dashboard', label: 'Dashboard' },
];

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const links = isAuthenticated ? authLinks : publicLinks;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    setShowProfileMenu(false);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-mine-950/95 backdrop-blur-md border-b border-mine-700/50 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-safety rounded-lg flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(240,200,0,0.4)] transition-shadow">
              <HardHat className="w-5 h-5 text-mine-950" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-sm font-bold tracking-wider text-white">SMARTMINE</span>
              <span className="text-[10px] font-bold tracking-[0.3em] text-safety">XR</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.to
                    ? 'text-safety bg-safety/10'
                    : 'text-mine-300 hover:text-white hover:bg-mine-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Right */}
          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-mine-800 transition-colors"
                >
                  <div className="w-8 h-8 bg-safety/20 border border-safety/40 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-safety" />
                  </div>
                  <span className="text-sm font-medium text-mine-200">{user?.name?.split(' ')[0]}</span>
                </button>
                {showProfileMenu && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-mine-800 border border-mine-600 rounded-xl shadow-2xl overflow-hidden">
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 px-4 py-3 text-sm text-mine-200 hover:bg-mine-700 hover:text-white transition-colors"
                    >
                      <User className="w-4 h-4" /> Profile
                    </Link>
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-3 px-4 py-3 text-sm text-mine-200 hover:bg-mine-700 hover:text-white transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4" /> Dashboard
                    </Link>
                    <button
                      onClick={() => { logout(); navigate('/'); }}
                      className="flex items-center gap-3 w-full px-4 py-3 text-sm text-mine-200 hover:bg-mine-700 hover:text-white transition-colors border-t border-mine-600"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">Login</Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm">Register</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 text-mine-300 hover:text-white"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileOpen && (
        <div className="lg:hidden bg-mine-900/98 backdrop-blur-md border-t border-mine-700/50">
          <div className="section-container py-4 space-y-1">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? 'text-safety bg-safety/10'
                    : 'text-mine-300 hover:text-white hover:bg-mine-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-mine-700 space-y-2">
              {isAuthenticated ? (
                <>
                  <Link to="/profile">
                    <Button variant="secondary" fullWidth size="sm">Profile</Button>
                  </Link>
                  <Button variant="ghost" fullWidth size="sm" onClick={() => { logout(); navigate('/'); }}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login"><Button variant="secondary" fullWidth size="sm">Login</Button></Link>
                  <Link to="/register"><Button variant="primary" fullWidth size="sm">Register</Button></Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
