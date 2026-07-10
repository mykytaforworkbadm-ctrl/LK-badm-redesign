import React from 'react';
import { ActiveView } from '../types';
import { 
  Home, 
  FileText, 
  RotateCcw, 
  FileSpreadsheet, 
  ClipboardCheck, 
  AlertTriangle, 
  Sparkles, 
  CheckSquare, 
  Mail, 
  BookOpen, 
  User, 
  Bell, 
  RefreshCw 
} from 'lucide-react';

interface SidebarProps {
  activeView: ActiveView;
  onViewChange: (view: ActiveView) => void;
  isAdminVisible?: boolean;
}

export default function Sidebar({ activeView, onViewChange, isAdminVisible = true }: SidebarProps) {
  
  const navItemClass = (view: ActiveView) => {
    const isCurrent = activeView === view;
    return `w-full flex items-center gap-2.5 px-3.5 py-2 rounded-[6px] text-[13px] font-medium text-left transition-colors border-l-3 ${
      isCurrent 
        ? 'bg-[#FDECEE] text-[#C8102E] border-[#C8102E] font-semibold' 
        : 'text-[#6B7280] hover:bg-[#F4F5F7] border-transparent hover:text-[#1A1D23]'
    } focus-visible:outline-2 focus-visible:outline-[#C8102E] focus-visible:outline-offset-1`;
  };

  return (
    <nav className="w-[240px] bg-white border-r border-[#E3E6EA] overflow-y-auto shrink-0 p-3 flex flex-col justify-between" aria-label="Основна навігація">
      <div className="space-y-4">
        {/* РОБОТА */}
        <div>
          <div className="text-[11px] uppercase tracking-wider text-[#9AA1AC] font-bold px-3 mb-2 flex items-center gap-1.5 select-none">
            Робота
          </div>
          <div className="space-y-0.5">
            <button
              type="button"
              className={navItemClass('dashboard')}
              onClick={() => onViewChange('dashboard')}
              aria-current={activeView === 'dashboard' ? 'page' : undefined}
              id="sidebar-nav-dashboard"
            >
              <Home size={15} className="opacity-80" />
              <span>Головна</span>
            </button>
            <button
              type="button"
              className={navItemClass('orders')}
              onClick={() => onViewChange('orders')}
              aria-current={activeView === 'orders' ? 'page' : undefined}
              id="sidebar-nav-orders"
            >
              <FileSpreadsheet size={15} className="opacity-80" />
              <span>Замовлення online</span>
            </button>
            <button
              type="button"
              className={navItemClass('refund')}
              onClick={() => onViewChange('refund')}
              aria-current={activeView === 'refund' ? 'page' : undefined}
              id="sidebar-nav-refund"
            >
              <RotateCcw size={15} className="opacity-80" />
              <span>Повернення</span>
            </button>
          </div>
        </div>

        {/* ДОКУМЕНТИ */}
        <div>
          <div className="text-[11px] uppercase tracking-wider text-[#9AA1AC] font-bold px-3 mb-2 flex items-center gap-1.5 select-none">
            Документи
          </div>
          <div className="space-y-0.5">
            <button
              type="button"
              className={navItemClass('documents')}
              onClick={() => onViewChange('documents')}
              aria-current={activeView === 'documents' ? 'page' : undefined}
              id="sidebar-nav-documents"
            >
              <FileText size={15} className="opacity-80" />
              <span>Супровідні документи</span>
            </button>
            <button
              type="button"
              className={navItemClass('control')}
              onClick={() => onViewChange('control')}
              aria-current={activeView === 'control' ? 'page' : undefined}
              id="sidebar-nav-control"
            >
              <ClipboardCheck size={15} className="opacity-80" />
              <span>Вхідний контроль</span>
            </button>
            <button
              type="button"
              className={navItemClass('recalled')}
              onClick={() => onViewChange('recalled')}
              aria-current={activeView === 'recalled' ? 'page' : undefined}
              title="Провизорне розміщення — потребує підтвердження реальної частоти використання"
              id="sidebar-nav-recalled"
            >
              <AlertTriangle size={15} className="opacity-80 text-[#8A5A0F]" />
              <span>Відкликані товари</span>
            </button>
          </div>
        </div>

        {/* ВЗАЄМОДІЯ */}
        <div>
          <div className="text-[11px] uppercase tracking-wider text-[#9AA1AC] font-bold px-3 mb-2 flex items-center gap-1.5 select-none">
            Взаємодія
          </div>
          <div className="space-y-0.5">
            <button
              type="button"
              className={navItemClass('promos')}
              onClick={() => onViewChange('promos')}
              aria-current={activeView === 'promos' ? 'page' : undefined}
              id="sidebar-nav-promos"
            >
              <Sparkles size={15} className="opacity-80" />
              <span>Пропозиції для Вас</span>
            </button>
            <button
              type="button"
              className={navItemClass('surveys')}
              onClick={() => onViewChange('surveys')}
              aria-current={activeView === 'surveys' ? 'page' : undefined}
              id="sidebar-nav-surveys"
            >
              <CheckSquare size={15} className="opacity-80" />
              <span>Опитування та відгуки</span>
            </button>
            <button
              type="button"
              className={navItemClass('feedback')}
              onClick={() => onViewChange('feedback')}
              aria-current={activeView === 'feedback' ? 'page' : undefined}
              id="sidebar-nav-feedback"
            >
              <Mail size={15} className="opacity-80" />
              <span>Зворотній зв'язок</span>
            </button>
          </div>
        </div>

        {/* ДОВІДКА */}
        <div>
          <div className="text-[11px] uppercase tracking-wider text-[#9AA1AC] font-bold px-3 mb-2 flex items-center gap-1.5 select-none">
            Довідка
          </div>
          <div className="space-y-0.5">
            <button
              type="button"
              className={navItemClass('instructions')}
              onClick={() => onViewChange('instructions')}
              aria-current={activeView === 'instructions' ? 'page' : undefined}
              id="sidebar-nav-instructions"
            >
              <BookOpen size={15} className="opacity-80" />
              <span>Інструкції</span>
            </button>
            <button
              type="button"
              className={navItemClass('profile')}
              onClick={() => onViewChange('profile')}
              aria-current={activeView === 'profile' ? 'page' : undefined}
              id="sidebar-nav-profile"
            >
              <User size={15} className="opacity-80" />
              <span>Про користувача</span>
            </button>
          </div>
        </div>

        {/* АДМІНІСТРУВАННЯ - Isolated wrapper wrapper to allow easy toggling/hiding entirely */}
        {isAdminVisible && (
          <div className="border-t border-[#E3E6EA] mt-4 pt-3 space-y-0.5">
            <div className="text-[11px] uppercase tracking-wider text-[#9AA1AC] font-bold px-3 mb-2 flex items-center justify-between select-none">
              <span>Адміністрування</span>
              <span className="text-[10px] text-[#9AA1AC] font-normal" title="Доступно лише адміністраторам">🔒 адмін</span>
            </div>
            <button
              type="button"
              className={navItemClass('alerts')}
              onClick={() => onViewChange('alerts')}
              aria-current={activeView === 'alerts' ? 'page' : undefined}
              id="sidebar-nav-alerts"
            >
              <Bell size={15} className="opacity-80" />
              <span>Оповіщення</span>
            </button>
            <button
              type="button"
              className={navItemClass('updates')}
              onClick={() => onViewChange('updates')}
              aria-current={activeView === 'updates' ? 'page' : undefined}
              id="sidebar-nav-updates"
            >
              <RefreshCw size={15} className="opacity-80" />
              <span>Оновлення</span>
            </button>
          </div>
        )}
      </div>

      <div className="pt-4 text-center select-none border-t border-[#E3E6EA]/50 mt-4">
        <div className="text-[10px] text-[#9AA1AC] font-mono">LK BaDM Client v4.2.0</div>
        <div className="text-[9px] text-[#9AA1AC]/70 mt-0.5">Всі права захищено © 2026</div>
      </div>
    </nav>
  );
}
