import React from 'react';
import { Mic, Baseline as Timeline, Settings, Moon, Sun } from 'lucide-react';

interface NavigationProps {
  activeView: 'record' | 'timeline' | 'settings';
  onViewChange: (view: 'record' | 'timeline' | 'settings') => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

const Navigation: React.FC<NavigationProps> = ({
  activeView,
  onViewChange,
  darkMode,
  onToggleDarkMode,
}) => {
  const navItems = [
    { id: 'record', label: 'Record', icon: Mic },
    { id: 'timeline', label: 'Timeline', icon: Timeline },
    { id: 'settings', label: 'Settings', icon: Settings },
  ] as const;

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-lavender-500 to-mint-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-lavender-600 to-mint-600 bg-clip-text text-transparent">
              Echoes of Me
            </h1>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    activeView === item.id
                      ? 'bg-gradient-to-r from-lavender-500 to-mint-500 text-white shadow-md'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </button>
              );
            })}

            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;