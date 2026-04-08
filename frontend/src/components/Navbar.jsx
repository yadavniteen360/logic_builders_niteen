import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Heart, Menu, Box } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-lg bg-white/80 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-primary-500 p-2 rounded-xl group-hover:scale-105 transition-transform shadow-sm">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 tracking-tight">CollabHub</span>
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            <Link to="/marketplace" className="text-slate-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Marketplace
            </Link>
            {user ? (
              <>
                <Link to="/dashboard" className="text-slate-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Dashboard
                </Link>
                <div className="flex items-center gap-4 ml-4 pl-4 border-l border-slate-200">
                   <div className="flex flex-col text-right">
                     <span className="text-sm font-semibold text-slate-800">{user.name}</span>
                     <span className="text-xs text-slate-500 capitalize">{user.role}</span>
                   </div>
                   <button onClick={handleLogout} className="btn btn-outline text-sm py-1.5">Logout</button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-slate-600 hover:text-slate-900 font-medium text-sm transition-colors">Login</Link>
                <Link to="/signup" className="btn btn-primary text-sm shadow-primary-500/30 shadow-lg hover:shadow-primary-500/50">Get Started</Link>
              </div>
            )}
          </div>
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
             <button className="p-2 text-slate-500 hover:text-slate-700">
                <Menu className="h-6 w-6"/>
             </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
