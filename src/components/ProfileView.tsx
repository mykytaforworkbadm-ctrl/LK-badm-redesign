import React, { useState, useEffect } from 'react';
import { SUBDIVISIONS } from '../data';
import { User, Key, Building2, FileText, ChevronLeft, ChevronRight, Check } from 'lucide-react';

export default function ProfileView() {
  const [activeTab, setActiveTab] = useState<'settings' | 'clients' | 'contracts'>('settings');

  // Settings states
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [otpTimer, setOtpTimer] = useState(0);
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);

  // Subdivisions pagination
  const [subPage, setSubPage] = useState(1);
  const subItemsPerPage = 5;
  const totalSubdivisions = SUBDIVISIONS.length;
  const totalSubPages = Math.ceil(totalSubdivisions / subItemsPerPage);
  
  const paginatedSubs = SUBDIVISIONS.slice(
    (subPage - 1) * subItemsPerPage,
    subPage * subItemsPerPage
  );

  // Otp timer loop
  useEffect(() => {
    let interval: any;
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);

  const handleGetCode = () => {
    setOtpSent(true);
    setOtpTimer(60);
    alert('Код двофакторної автентифікації надіслано у ваш підключений Telegram-бот @BaDM_Partner_Bot.');
  };

  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return; // numbers only
    const nextCode = [...otpCode];
    nextCode[index] = value.slice(-1);
    setOtpCode(nextCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    const joinedCode = otpCode.join('');
    if (joinedCode.length < 6) {
      alert('Будь ласка, введіть повний 6-значний код авторизації.');
      return;
    }
    setPasswordChangeSuccess(true);
    setTimeout(() => {
      setPasswordChangeSuccess(false);
      setOtpSent(false);
      setOtpCode(['', '', '', '', '', '']);
    }, 4000);
  };

  return (
    <div className="animate-fade-in space-y-5">
      {/* Title */}
      <div>
        <h1 className="text-xl font-bold text-[#1A1D23] m-0" id="profile-title">Мій Кабінет</h1>
        <p className="text-xs text-[#6B7280] mt-1 m-0">Реквізити контрагента, налаштування безпеки та діючі дистриб'юторські договори</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#E3E6EA] select-none" id="profile-sub-tabs">
        <button
          type="button"
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2.5 text-[13px] font-medium border-b-2 -mb-[2px] transition flex items-center gap-1.5 ${
            activeTab === 'settings' 
              ? 'text-[#C8102E] border-[#C8102E] font-semibold' 
              : 'text-[#6B7280] border-transparent hover:text-[#1A1D23]'
          }`}
        >
          <Key size={14} />
          <span>Налаштування безпеки</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('clients')}
          className={`px-4 py-2.5 text-[13px] font-medium border-b-2 -mb-[2px] transition flex items-center gap-1.5 ${
            activeTab === 'clients' 
              ? 'text-[#C8102E] border-[#C8102E] font-semibold' 
              : 'text-[#6B7280] border-transparent hover:text-[#1A1D23]'
          }`}
        >
          <Building2 size={14} />
          <span>Клієнти та підрозділи</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('contracts')}
          className={`px-4 py-2.5 text-[13px] font-medium border-b-2 -mb-[2px] transition flex items-center gap-1.5 ${
            activeTab === 'contracts' 
              ? 'text-[#C8102E] border-[#C8102E] font-semibold' 
              : 'text-[#6B7280] border-transparent hover:text-[#1A1D23]'
          }`}
        >
          <FileText size={14} />
          <span>Договори</span>
        </button>
      </div>

      {/* Settings Tab content */}
      {activeTab === 'settings' && (
        <div className="bg-white border border-[#E3E6EA] rounded-[10px] p-5 shadow-xs max-w-xl" id="profile-tab-settings">
          <h2 className="text-sm font-bold text-[#1A1D23] mb-4">Зміна паролю облікового запису</h2>
          
          {passwordChangeSuccess ? (
            <div className="bg-[#E6F4EA] border border-[#0F9D58]/20 text-[#0F9D58] p-4 rounded-[6px] text-xs font-semibold animate-fade-in flex items-center gap-2">
              <Check size={16} />
              <span>Пароль успішно змінено! Нові параметри автентифікації активовано.</span>
            </div>
          ) : (
            <form onSubmit={handleChangePassword} className="space-y-4">
              
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1A1D23] mb-1 select-none">Новий пароль</label>
                  <input
                    type="password"
                    required
                    className="w-full text-xs px-3 py-2 rounded-[6px] border border-[#E3E6EA] bg-white text-[#1A1D23] focus:outline-none focus:border-[#C8102E]"
                    placeholder="Введіть надійний пароль (від 8 символів)"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1A1D23] mb-1 select-none">Підтвердження паролю</label>
                  <input
                    type="password"
                    required
                    className="w-full text-xs px-3 py-2 rounded-[6px] border border-[#E3E6EA] bg-white text-[#1A1D23] focus:outline-none focus:border-[#C8102E]"
                    placeholder="Повторіть введений новий пароль"
                  />
                </div>
              </div>

              {/* 2FA Telegram bot row */}
              <div className="bg-[#F4F5F7] p-4 rounded-[8px] space-y-3.5 select-none border border-[#E3E6EA]/50">
                <div className="flex justify-between items-center">
                  <div className="text-xs">
                    <div className="font-semibold text-[#1A1D23]">Двофакторна авторизація через Telegram</div>
                    <div className="text-[#6B7280] text-[11px] mt-0.5">Код генерується офіційним ботом @BaDM_Partner_Bot</div>
                  </div>
                  
                  <button
                    type="button"
                    disabled={otpTimer > 0}
                    onClick={handleGetCode}
                    className="bg-white border border-[#E3E6EA] hover:border-neutral-400 text-[#1A1D23] text-[11px] font-semibold px-3 py-1.5 rounded-[5px] transition disabled:opacity-60"
                  >
                    {otpTimer > 0 ? `Отримати знову (${otpTimer}с)` : 'Отримати код'}
                  </button>
                </div>

                {otpSent && (
                  <div className="space-y-2 animate-fade-in">
                    <label className="block text-[11px] font-semibold text-[#1A1D23]">Введіть отриманий 6-значний код</label>
                    <div className="flex gap-2">
                      {otpCode.map((digit, idx) => (
                        <input
                          key={idx}
                          id={`otp-input-${idx}`}
                          type="text"
                          required
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(e.target.value, idx)}
                          className="w-10 h-10 text-center font-mono font-bold text-base bg-white border border-[#E3E6EA] rounded-[6px] focus:outline-none focus:border-[#C8102E]"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-[#E3E6EA] flex justify-end select-none">
                <button
                  type="submit"
                  className="bg-[#C8102E] hover:bg-[#A50D24] text-white px-4 py-2 rounded-[6px] text-xs font-semibold transition-colors"
                  id="submit-password-change-btn"
                >
                  Зберегти зміни
                </button>
              </div>

            </form>
          )}
        </div>
      )}

      {/* Clients Tab content */}
      {activeTab === 'clients' && (
        <div className="space-y-5 animate-fade-in" id="profile-tab-clients">
          
          {/* client details panel */}
          <div className="bg-white border border-[#E3E6EA] rounded-[10px] p-5 shadow-xs">
            <h2 className="text-xs font-bold uppercase text-[#9AA1AC] tracking-wider mb-4 select-none">Картка партнера (Контрагент)</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs select-none">
              <div className="bg-[#F1F2F4]/50 p-3 rounded-[6px]">
                <div className="text-[#9AA1AC]">Код контрагента:</div>
                <div className="font-bold text-[#1A1D23] font-mono mt-1 text-sm">31121</div>
              </div>
              <div className="bg-[#F1F2F4]/50 p-3 rounded-[6px]">
                <div className="text-[#9AA1AC]">Код ЄДРПОУ:</div>
                <div className="font-bold text-[#1A1D23] font-mono mt-1 text-sm">38491024</div>
              </div>
              <div className="bg-[#F1F2F4]/50 p-3 rounded-[6px] sm:col-span-2">
                <div className="text-[#9AA1AC]">Повна юридична назва:</div>
                <div className="font-bold text-[#1A1D23] mt-1 text-sm">ТОВАРИСТВО З ОБМЕЖЕНОЮ ВІДПОВІДАЛЬНІСТЮ "ДАРІЯФАРМА"</div>
              </div>
            </div>
          </div>

          {/* Paginated subdivisions table */}
          <div className="bg-white border border-[#E3E6EA] rounded-[10px] overflow-hidden shadow-xs">
            <div className="p-4 border-b border-[#E3E6EA] select-none">
              <h2 className="text-sm font-semibold text-[#1A1D23] m-0">Перелік зареєстрованих підрозділів ({totalSubdivisions})</h2>
            </div>
            
            <table className="w-full text-left border-collapse text-[13px]">
              <thead>
                <tr className="bg-[#F4F5F7]/30 select-none">
                  <th className="px-4 py-2.5 text-[11px] font-bold text-[#9AA1AC] uppercase tracking-wider">Ідентифікатор</th>
                  <th className="px-3 py-2.5 text-[11px] font-bold text-[#9AA1AC] uppercase tracking-wider">Код торговельної точки</th>
                  <th className="px-3 py-2.5 text-[11px] font-bold text-[#9AA1AC] uppercase tracking-wider">Назва аптечного закладу та адреса</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E3E6EA]">
                {paginatedSubs.map((sub, idx) => {
                  const globalIdx = (subPage - 1) * subItemsPerPage + idx + 1;
                  return (
                    <tr key={idx} className="hover:bg-neutral-50/50 transition-colors">
                      <td className="px-4 py-3 font-mono text-[#6B7280]">SUB-00{100 + globalIdx}</td>
                      <td className="px-3 py-3 font-mono font-bold text-[#1A1D23]">TP-{2000 + globalIdx}</td>
                      <td className="px-3 py-3 font-medium text-[#1A1D23]">{sub}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Pagination for subdivisions */}
            <div className="px-4 py-3 border-t border-[#E3E6EA] flex items-center justify-between text-xs text-[#6B7280] select-none">
              <div>
                Показано <span className="font-semibold text-[#1A1D23]">{(subPage - 1) * subItemsPerPage + 1}–{Math.min(subPage * subItemsPerPage, totalSubdivisions)}</span> з <span className="font-semibold text-[#1A1D23]">{totalSubdivisions}</span> підрозділів
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={subPage === 1}
                  onClick={() => setSubPage((p) => Math.max(p - 1, 1))}
                  className="px-2.5 py-1 rounded bg-white border border-[#E3E6EA] text-[#6B7280] hover:bg-neutral-50 disabled:opacity-50"
                >
                  Попередня
                </button>
                <button
                  type="button"
                  disabled={subPage === totalSubPages}
                  onClick={() => setSubPage((p) => Math.min(p + 1, totalSubPages))}
                  className="px-2.5 py-1 rounded bg-white border border-[#E3E6EA] text-[#6B7280] hover:bg-neutral-50 disabled:opacity-50"
                >
                  Наступна
                </button>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Contracts tab content (Simple elegant placeholder list as requested) */}
      {activeTab === 'contracts' && (
        <div className="bg-white border border-[#E3E6EA] rounded-[10px] p-5 shadow-xs space-y-4" id="profile-tab-contracts">
          <h2 className="text-sm font-semibold text-[#1A1D23] m-0 select-none">Договори з дистриб'ютором БаДМ</h2>
          <p className="text-xs text-[#6B7280] select-none">Дійсні комерційні угоди на постачання лікарських засобів:</p>
          
          <div className="space-y-3" id="contracts-list">
            <div className="border border-[#E3E6EA] p-4 rounded-[8px] flex justify-between items-center hover:bg-[#F4F5F7]/10 transition">
              <div>
                <span className="bg-[#EBF8FF] text-[#2B6CB0] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Основний</span>
                <h4 className="text-sm font-bold text-[#1A1D23] mt-1.5 m-0">Договір дистрибуції №Д-89914/2026</h4>
                <div className="text-[#9AA1AC] text-xs mt-1">Дата підписання: 10.01.2026 · Діє до: 31.12.2026</div>
              </div>
              <div className="text-right">
                <span className="text-[#0F9D58] bg-[#E6F4EA] px-2.5 py-1 rounded-full text-xs font-semibold">Діючий</span>
              </div>
            </div>

            <div className="border border-[#E3E6EA] p-4 rounded-[8px] flex justify-between items-center hover:bg-[#F4F5F7]/10 transition">
              <div>
                <span className="bg-[#F1F2F4] text-[#6B7280] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Додатковий</span>
                <h4 className="text-sm font-bold text-[#1A1D23] mt-1.5 m-0">Угода про відтермінування платежу №У-89914-А</h4>
                <div className="text-[#9AA1AC] text-xs mt-1">Дата підписання: 15.02.2026 · Ліміт кредиту: 500,000 грн</div>
              </div>
              <div className="text-right">
                <span className="text-[#0F9D58] bg-[#E6F4EA] px-2.5 py-1 rounded-full text-xs font-semibold">Діючий</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
