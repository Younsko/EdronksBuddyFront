import { NavLink } from 'react-router-dom';
import { Home, CreditCard, BarChart3, User, Settings, LogOut } from 'lucide-react';

interface MobileNavProps {
  onLogout: () => void;
}

export const MobileNav = ({ onLogout }: MobileNavProps) => {
  const links = [
    { to: '/dashboard', icon: Home },
    { to: '/transactions', icon: CreditCard },
    { to: '/categories', icon: BarChart3 },
    { to: '/profile', icon: User },
    { to: '/settings', icon: Settings },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-white dark:bg-secondary-dark border-t border-gray-100 dark:border-gray-700 z-50">
      <div className="flex items-center justify-around px-2 py-3">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-primary text-white'
                  : 'text-gray-400 dark:text-gray-500 hover:text-primary-dark dark:hover:text-primary-light hover:bg-secondary dark:hover:bg-secondary-dark-lighter'
              }`
            }
          >
            <link.icon className="w-5 h-5" />
          </NavLink>
        ))}
        <button
          onClick={onLogout}
          className="flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-200 text-expense dark:text-expense-dark hover:bg-expense/10 dark:hover:bg-expense-dark/10"
          title="Logout"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </nav>
  );
};