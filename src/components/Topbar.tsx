import React, { useState } from 'react';
import { Phone, Check, HelpCircle } from 'lucide-react';

interface TopbarProps {
  currentLang: 'UKR' | 'RUS';
  onLangChange: (lang: 'UKR' | 'RUS') => void;
  subdivisionsCount: number;
}

export default function Topbar({ currentLang, onLangChange, subdivisionsCount }: TopbarProps) {
  const [showSupportModal, setShowSupportModal] = useState(false);

  return (
    <>
      <header className="h-[56px] bg-white border-b border-[#E3E6EA] flex items-center justify-between px-5 shrink-0 select-none">
        {/* Left section with Logo and Multi-tenant client context */}
        <div className="flex items-center gap-3.5">
          <div className="flex items-center gap-2 font-semibold text-base text-[#1A1D23]">
            <div className="w-[26px] height-[26px] h-[26px] bg-[#C8102E] rounded-[6px] flex items-center justify-center text-white text-[13px] font-bold">
              LK
            </div>
            <span>BaDM</span>
          </div>
          
          <div className="flex items-baseline gap-1.5 text-[13px] pl-3.5 border-l border-[#E3E6EA] h-[18px] leading-[18px]">
            <span className="font-semibold text-[#1A1D23]">ДАРІЯФАРМА, ТОВ</span>
            <span className="text-[#9AA1AC]">·</span>
            <span className="text-[#6B7280]">
              {subdivisionsCount > 1 ? `${subdivisionsCount} підрозділів` : '1 підрозділ'}
            </span>
            <span className="text-[#9AA1AC]">·</span>
            <span className="text-[#9AA1AC] text-xs">код 31121</span>
          </div>
        </div>

        {/* Right section: Lang switcher, contact support, user avatar */}
        <div className="flex items-center gap-3.5 text-[13px] text-[#6B7280]">
          <div className="flex items-center gap-1 cursor-pointer select-none">
            <button 
              type="button"
              onClick={() => onLangChange('UKR')}
              className={`px-1.5 py-0.5 rounded transition ${currentLang === 'UKR' ? 'text-[#1A1D23] font-semibold bg-[#F1F2F4]' : 'text-[#9AA1AC] hover:text-[#1A1D23]'}`}
            >
              Укр
            </button>
            <span className="text-[#E3E6EA] text-xs">|</span>
            <button 
              type="button"
              onClick={() => onLangChange('RUS')}
              className={`px-1.5 py-0.5 rounded transition ${currentLang === 'RUS' ? 'text-[#1A1D23] font-semibold bg-[#F1F2F4]' : 'text-[#9AA1AC] hover:text-[#1A1D23]'}`}
            >
              Рус
            </button>
          </div>

          <button
            type="button"
            onClick={() => setShowSupportModal(true)}
            className="w-8 h-8 rounded-full border border-[#E3E6EA] bg-white flex items-center justify-center text-[#6B7280] hover:text-[#C8102E] hover:border-[#C8102E] transition-colors"
            title="Зв'язатися з технічною підтримкою"
            id="topbar-support-btn"
          >
            <Phone size={14} />
          </button>

          <div className="flex items-center gap-2 pl-2 border-l border-[#E3E6EA]">
            <div className="text-right">
              <div className="font-semibold text-[#1A1D23] leading-none">Микита</div>
              <div className="text-[10px] text-[#9AA1AC]">Провізор-адмін</div>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#F1F2F4] text-[#6B7280] flex items-center justify-center text-[12px] font-bold border border-[#E3E6EA]">
              МД
            </div>
          </div>
        </div>
      </header>

      {/* Dynamic support phone modal */}
      {showSupportModal && (
        <div className="fixed inset-0 bg-black/45 flex items-center justify-center z-50 transition-opacity animate-fade-in" id="support-modal">
          <div className="bg-white rounded-[10px] max-width-[400px] w-full max-w-[400px] p-6 shadow-lg border border-[#E3E6EA] relative">
            <h3 className="text-base font-semibold text-[#1A1D23] mb-3 flex items-center gap-2">
              <Phone size={18} className="text-[#C8102E]" />
              Гаряча лінія підтримки БаДМ
            </h3>
            <p className="text-sm text-[#6B7280] mb-4 leading-relaxed">
              Ви можете оперативно звернутися до нашої служби підтримки клієнтів за наступними номерами:
            </p>
            <div className="space-y-2.5 mb-5 font-mono text-sm">
              <div className="flex justify-between items-center bg-[#F1F2F4] p-2.5 rounded-md">
                <span className="text-[#1A1D23] font-medium">Відділ продажу:</span>
                <a href="tel:0800500123" className="text-[#C8102E] hover:underline font-semibold">0 800 500-123</a>
              </div>
              <div className="flex justify-between items-center bg-[#F1F2F4] p-2.5 rounded-md">
                <span className="text-[#1A1D23] font-medium">Технічні питання ЛК:</span>
                <a href="tel:0800500124" className="text-[#C8102E] hover:underline font-semibold">0 800 500-124</a>
              </div>
              <div className="flex justify-between items-center bg-[#F1F2F4] p-2.5 rounded-md">
                <span className="text-[#1A1D23] font-medium">Претензії та повернення:</span>
                <a href="tel:0800500125" className="text-[#C8102E] hover:underline font-semibold">0 800 500-125</a>
              </div>
            </div>
            <div className="text-xs text-[#9AA1AC] mb-5 text-center">
              Дзвінки зі стаціонарних та мобільних телефонів в межах України безкоштовні.
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowSupportModal(false)}
                className="bg-[#C8102E] hover:bg-[#A50D24] text-white px-4 py-2 rounded-[6px] text-xs font-semibold transition-colors"
                id="close-support-btn"
              >
                Закрити
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
