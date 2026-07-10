import React, { useState } from 'react';
import { RecalledProduct } from '../types';
import { INITIAL_RECALLED_PRODUCTS } from '../data';
import { AlertOctagon, HelpCircle, FileX } from 'lucide-react';

export default function RecalledView() {
  const [recalledList, setRecalledList] = useState<RecalledProduct[]>(INITIAL_RECALLED_PRODUCTS);
  const [simulateEmpty, setSimulateEmpty] = useState(false);

  return (
    <div className="animate-fade-in space-y-5">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 select-none">
        <div>
          <h1 className="text-xl font-bold text-[#1A1D23] m-0" id="recalled-title">Відкликані товари</h1>
          <p className="text-xs text-[#6B7280] mt-1 m-0">Приписи Держлікслужби щодо вилучення серій лікарських засобів з обігу</p>
        </div>

        {/* Empty state toggle */}
        <label className="flex items-center gap-1.5 text-xs text-[#6B7280] bg-[#F1F2F4] px-3 py-1.5 rounded-full border border-[#E3E6EA] cursor-pointer">
          <input
            type="checkbox"
            checked={simulateEmpty}
            onChange={(e) => setSimulateEmpty(e.target.checked)}
            className="accent-[#C8102E]"
            id="toggle-recalled-empty"
          />
          <span>Імітувати порожній стан (Даних немає)</span>
        </label>
      </div>

      {/* Main Container */}
      {simulateEmpty || recalledList.length === 0 ? (
        <div className="bg-white border border-[#E3E6EA] rounded-[10px] py-16 text-center select-none" id="recalled-empty-state">
          <div className="w-12 h-12 rounded-full bg-[#F1F2F4] flex items-center justify-center mx-auto mb-3 text-[#9AA1AC]">
            <FileX size={24} />
          </div>
          <div className="text-sm text-[#9AA1AC] font-semibold">Даних немає</div>
          <div className="text-xs text-[#9AA1AC] mt-1 max-w-[280px] mx-auto">Усі актуальні приписи Держлікслужби щодо відкликання серій відсутні для вашого переліку закупівлі.</div>
        </div>
      ) : (
        <div className="bg-white border border-[#E3E6EA] rounded-[10px] overflow-hidden shadow-xs" id="recalled-table-container">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[13px]">
              <thead>
                <tr className="bg-[#F4F5F7]/40 select-none">
                  <th className="px-4 py-3 text-[11px] font-bold text-[#9AA1AC] uppercase tracking-wider">Найменування лікарського засобу</th>
                  <th className="px-3 py-3 text-[11px] font-bold text-[#9AA1AC] uppercase tracking-wider">Серія</th>
                  <th className="px-3 py-3 text-[11px] font-bold text-[#9AA1AC] uppercase tracking-wider">Термін придатності</th>
                  <th className="px-3 py-3 text-[11px] font-bold text-[#9AA1AC] uppercase tracking-wider">Код товару</th>
                  <th className="px-3 py-3 text-[11px] font-bold text-[#9AA1AC] uppercase tracking-wider">Виробник</th>
                  <th className="px-3 py-3 text-[11px] font-bold text-[#9AA1AC] uppercase tracking-wider">Припис дійсний до</th>
                  <th className="px-3 py-3 text-[11px] font-bold text-[#9AA1AC] uppercase tracking-wider">Дата початку</th>
                  <th className="px-3 py-3 text-[11px] font-bold text-[#9AA1AC] uppercase tracking-wider">Дата закінчення</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E3E6EA]">
                {recalledList.map((item) => (
                  <tr key={item.id} className="hover:bg-neutral-50/50 transition-colors">
                    <td className="px-4 py-3.5 font-semibold text-[#1A1D23] flex items-center gap-2">
                      <AlertOctagon size={14} className="text-[#D2461B] shrink-0" />
                      {item.name}
                    </td>
                    <td className="px-3 py-3.5 font-mono font-bold text-[#D2461B] bg-[#FCE8E0]/40 rounded px-1.5 py-0.5 inline-block mt-2 ml-3 text-xs">{item.batch}</td>
                    <td className="px-3 py-3.5 text-[#6B7280] font-mono">{item.expiry}</td>
                    <td className="px-3 py-3.5 text-[#6B7280] font-mono">{item.code}</td>
                    <td className="px-3 py-3.5 text-[#6B7280] text-xs">{item.manufacturer}</td>
                    <td className="px-3 py-3.5 text-[#1A1D23] font-semibold font-mono">{item.validTill}</td>
                    <td className="px-3 py-3.5 text-[#6B7280] font-mono">{item.startDate}</td>
                    <td className="px-3 py-3.5 text-[#6B7280] font-mono">{item.endDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="bg-[#F1F2F4] px-4 py-3 text-xs text-[#6B7280] border-t border-[#E3E6EA] leading-relaxed select-none">
            <span className="font-semibold text-[#1A1D23]">Важливо:</span> Відкликані товари підлягають терміновому вилученню з обігу аптеки та переміщенню до карантинної зони зберігання. Будь ласка, оперативно оформіть заявку на повернення за цими позиціями через розділ <span className="font-semibold text-[#C8102E]">"Повернення"</span>.
          </div>
        </div>
      )}
    </div>
  );
}
