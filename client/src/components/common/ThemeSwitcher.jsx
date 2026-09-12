import React, { useState, useRef, useEffect } from 'react';
import { Palette, Moon, Sun, Compass, Shield, Check } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function ThemeSwitcher({ compact = false }) {
  const { theme, changeTheme, themes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getIcon = (id) => {
    switch (id) {
      case 'light': return <Sun className="w-3.5 h-3.5" />;
      case 'navy': return <Compass className="w-3.5 h-3.5" />;
      case 'amber': return <Shield className="w-3.5 h-3.5" />;
      default: return <Moon className="w-3.5 h-3.5" />;
    }
  };

  const currentTheme = themes.find(t => t.id === theme) || themes[0];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-industrial-800/80 hover:bg-industrial-700 text-industrial-200 hover:text-white border border-industrial-700/60 transition-all text-xs font-medium shadow-sm"
        title="Change Visual Theme"
      >
        <Palette className="w-3.5 h-3.5 text-amber-brand" />
        {!compact && (
          <span className="hidden 2xl:inline text-[11px] font-semibold">
            {currentTheme.name.split(' ')[0]}
          </span>
        )}
        <span
          className="w-2.5 h-2.5 rounded-full border border-white/20"
          style={{ backgroundColor: currentTheme.accent }}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-industrial-900 border border-industrial-800 shadow-2xl p-2 z-50 animate-fade-in">
          <div className="text-[10px] font-bold text-industrial-400 uppercase tracking-wider px-2.5 py-1.5">
            Select Industrial Theme
          </div>

          <div className="space-y-1">
            {themes.map((t) => {
              const isSelected = t.id === theme;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    changeTheme(t.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-amber-brand/15 text-amber-brand font-bold border border-amber-500/30'
                      : 'text-industrial-300 hover:bg-industrial-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-4 h-4 rounded-full border border-white/20 flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: t.preview }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: t.accent }}
                      />
                    </span>
                    <span className="text-left text-xs">{t.name}</span>
                  </div>

                  {isSelected && <Check className="w-3.5 h-3.5 text-amber-brand" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

