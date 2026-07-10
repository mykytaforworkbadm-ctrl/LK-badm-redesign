import React, { useState } from 'react';
import { ChangelogItem } from '../types';
import { INITIAL_CHANGELOG } from '../data';
import { RefreshCw, Calendar, ChevronDown, ChevronUp, Check, Info } from 'lucide-react';

export default function AdminUpdatesView() {
  const [changelogs, setChangelogs] = useState<ChangelogItem[]>(INITIAL_CHANGELOG);
  const [collapsedIds, setCollapsedIds] = useState<Set<string>>(new Set(['CHG-03', 'CHG-02'])); // collapse older by default

  const [checking, setChecking] = useState(false);
  const [checkResult, setCheckResult] = useState<string | null>(null);

  const toggleChangelog = (id: string) => {
    const nextCollapsed = new Set(collapsedIds);
    if (nextCollapsed.has(id)) {
      nextCollapsed.delete(id);
    } else {
      nextCollapsed.add(id);
    }
    setCollapsedIds(nextCollapsed);
  };

  const handleCheckUpdates = () => {
    setChecking(true);
    setCheckResult(null);
    setTimeout(() => {
      setChecking(false);
      setCheckResult('У вас встановлено найсвіжішу версію кабінету: LK BaDM Client v4.2.0 (Збірка від 10.07.2026). Оновлення не потрібні.');
    }, 1500);
  };

  return (
    <div className="animate-fade-in space-y-5">
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 select-none pb-2 border-b border-[#E3E6EA]">
        <div>
          <h1 className="text-xl font-bold text-[#1A1D23] m-0" id="updates-title">Журнал оновлень</h1>
          <p className="text-xs text-[#6B7280] mt-1 m-0">Історія релізів, виправлень та план проведення планового технічного обслуговування</p>
        </div>

        <button
          type="button"
          disabled={checking}
          onClick={handleCheckUpdates}
          className="bg-white border border-[#E3E6EA] hover:border-neutral-400 text-[#1A1D23] px-3.5 py-2 rounded-[6px] text-xs font-semibold transition flex items-center gap-1.5 disabled:opacity-60"
          id="check-updates-btn"
        >
          <RefreshCw size={13} className={checking ? 'animate-spin' : ''} />
          {checking ? 'Перевірка...' : 'Перевірити оновлення'}
        </button>
      </div>

      {/* Checking Updates Result Popup */}
      {checkResult && (
        <div className="bg-[#E6F4EA] border border-[#0F9D58]/20 text-[#0F9D58] p-3.5 rounded-[10px] text-xs font-semibold animate-fade-in flex items-center justify-between gap-3 select-none">
          <div className="flex items-center gap-2">
            <Check size={16} />
            <span>{checkResult}</span>
          </div>
          <button 
            type="button"
            onClick={() => setCheckResult(null)} 
            className="text-[#0F9D58] hover:text-[#1A1D23] font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Grid: Changelogs & Future plans */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Collapsible Changelog List */}
        <div className="lg:col-span-2 space-y-3.5" id="changelog-accordion">
          <h2 className="text-xs font-bold uppercase text-[#9AA1AC] tracking-wider mb-2 select-none">Історія версій та виправлень</h2>
          
          {changelogs.map((item) => {
            const isCollapsed = collapsedIds.has(item.id);
            return (
              <div key={item.id} className="bg-white border border-[#E3E6EA] rounded-[10px] overflow-hidden shadow-xs">
                {/* Accordion header */}
                <button
                  type="button"
                  onClick={() => toggleChangelog(item.id)}
                  className="w-full flex items-center justify-between p-4 bg-white hover:bg-neutral-50/40 text-left transition select-none focus:outline-none"
                >
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-sm font-bold text-[#1A1D23]">{item.version}</span>
                    <span className="text-xs text-[#9AA1AC] font-mono">({item.date})</span>
                  </div>
                  <div className="text-[#6B7280]">
                    {isCollapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
                  </div>
                </button>

                {/* Accordion body list */}
                {!isCollapsed && (
                  <div className="p-4 border-t border-[#E3E6EA] bg-neutral-50/10 animate-fade-in">
                    <ul className="list-disc pl-4 text-xs text-[#6B7280] space-y-2 leading-relaxed">
                      {item.changes.map((change, idx) => (
                        <li key={idx}>{change}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Future Schedule block */}
        <div className="space-y-4 select-none">
          <div className="bg-white border border-[#E3E6EA] rounded-[10px] p-5 shadow-xs">
            <h2 className="text-xs font-bold uppercase text-[#9AA1AC] tracking-wider mb-3.5 flex items-center gap-1.5">
              <Calendar size={13} />
              План наступних оновлень
            </h2>
            
            <p className="text-xs text-[#6B7280] leading-relaxed mb-4">
              Технічне обслуговування проводиться у нічні години з метою мінімізації впливу на замовлення аптеками.
            </p>

            <div className="space-y-3 font-sans text-xs">
              <div className="border-l-3 border-[#8A5A0F] pl-3 py-1 bg-[#FDF3E1]/30 rounded-r">
                <div className="font-bold text-[#1A1D23]">Технічне вікно №1</div>
                <div className="text-[#6B7280] mt-0.5 font-mono text-[11px]">14.07.2026 · 02:00 – 05:00</div>
                <div className="text-[#9AA1AC] text-[10px] mt-0.5">Оптимізація бази даних супровідних листів</div>
              </div>

              <div className="border-l-3 border-[#6B7280] pl-3 py-1 bg-[#F1F2F4]/50 rounded-r">
                <div className="font-bold text-[#1A1D23]">Технічне вікно №2</div>
                <div className="text-[#6B7280] mt-0.5 font-mono text-[11px]">28.07.2026 · 03:00 – 04:00</div>
                <div className="text-[#9AA1AC] text-[10px] mt-0.5">Реліз оновлених правил КЕП/ЕЦП підписів</div>
              </div>
            </div>
          </div>

          {/* Quick info banner */}
          <div className="bg-[#F1F2F4] p-4 rounded-[10px] border border-[#E3E6EA]/50 text-xs text-[#6B7280] flex items-start gap-2.5 leading-relaxed">
            <Info size={16} className="text-[#9AA1AC] shrink-0 mt-0.5" />
            <span>
              Якщо у вас виникли помилки після оновлення версії, очистіть кеш браузера (Ctrl+F5) або зверніться до служби підтримки за номером вказаним у верхній панелі.
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
