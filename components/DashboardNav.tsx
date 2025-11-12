import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ICONS } from '../constants';
import { useAuth } from '../contexts/AuthContext';

interface NavItem {
  id: string;
  label: string;
  // Fix: Changed JSX.Element to React.ReactNode to resolve the type error.
  icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'config', label: 'Configuration', icon: ICONS.cog },
  { id: 'options', label: 'Button Options', icon: ICONS.options },
  { id: 'sizes', label: 'Size Charts', icon: ICONS.sizes },
  { id: 'analytics', label: 'Dashboard', icon: ICONS.dashboard },
];

const DashboardNav: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <aside className="w-64 bg-white shadow-md flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 bg-primary-500 text-white flex items-center justify-center rounded-full font-bold text-lg">
            {user?.businessName.charAt(0)}
          </div>
          <div>
            <h2 className="font-semibold text-gray-800">{user?.businessName}</h2>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-1">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.id}
            to={`/dashboard/${item.id}`}
            className={({ isActive }) =>
              `flex items-center px-4 py-2 text-gray-700 rounded-md transition-colors duration-200 ${
                isActive ? 'bg-primary-100 text-primary-700' : 'hover:bg-gray-100'
              }`
            }
          >
            <span className="mr-3">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="p-2 border-t">
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
        >
          <span className="mr-3">{ICONS.logout}</span>
          Logout
        </button>
      </div>
    </aside>
  );
};

export default DashboardNav;