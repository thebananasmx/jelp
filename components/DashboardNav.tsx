
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ICONS } from '../constants';
import { useAuth } from '../contexts/AuthContext';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'config', label: 'Estilo', icon: ICONS.cog },
  { id: 'options', label: 'Funciones', icon: ICONS.options },
  { id: 'sizes', label: 'Tallas', icon: ICONS.sizes },
  { id: 'analytics', label: 'Insights', icon: ICONS.dashboard },
];

const DashboardNav: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <aside className="w-72 h-screen p-6 sticky top-0 flex flex-col">
      <div className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl shadow-sm flex flex-col h-full overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-gradient-to-br from-primary-50/50 to-transparent">
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 bg-primary-600 text-white flex items-center justify-center rounded-2xl shadow-lg shadow-primary-200 font-bold text-xl">
              {user?.businessName.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <h2 className="font-bold text-slate-800 truncate">{user?.businessName}</h2>
              <p className="text-xs text-slate-400 font-medium truncate uppercase tracking-wider">Business Tier</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 px-3 py-6 space-y-2">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.id}
              to={`/dashboard/${item.id}`}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm font-semibold rounded-2xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-200' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              <span className={`mr-3 transition-colors ${item.id === 'config' ? 'group-hover:rotate-45' : ''}`}>
                {React.cloneElement(item.icon as React.ReactElement, { className: 'h-5 w-5' })}
              </span>
              {item.label}
            </NavLink>
          ))}
        </nav>
        
        <div className="p-4 border-t border-slate-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 text-sm font-semibold text-slate-500 rounded-2xl hover:bg-red-50 hover:text-red-600 transition-all duration-300"
          >
            <span className="mr-3">{React.cloneElement(ICONS.logout as React.ReactElement, { className: 'h-5 w-5' })}</span>
            Cerrar Sesión
          </button>
        </div>
      </div>
    </aside>
  );
};

export default DashboardNav;
