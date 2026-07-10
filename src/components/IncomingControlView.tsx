import React, { useState, useMemo } from 'react';
import { IncomingControlRecord } from '../types';
import { INITIAL_INCOMING_CONTROL, SUBDIVISIONS } from '../data';
import { Search, Calendar, FileSpreadsheet, ShieldAlert, CheckCircle2, ShieldAlert as AlertIcon } from 'lucide-react';

export default function IncomingControlView() {
  const [records, setRecords] = useState<IncomingControlRecord[]>(INITIAL_INCOMING_CONTROL);

  // Search Type Choice
  const [searchType, setSearchType] = useState<'date' | 'invoice'>('date');

  // Filter states
  const [selectedClient, setSelectedClient] = useState('Усі');
  const [selectedSubdivision, setSelectedSubdivision] = useState('Усі');
  const [dateQuery, setDateQuery] = useState('');
  const [invoiceQuery, setInvoiceQuery] = useState('');

  // Dropdowns
  const clients = ['Усі', 'ДАРІЯФАРМА, ТОВ'];

  // Filter Logic
  const filteredRecords = useMemo(() => {
    return records.filter((rec) => {
      if (selectedClient !== 'Усі' && rec.client !== selectedClient) return false;
      if (selectedSubdivision !== 'Усі' && rec.subdivision !== selectedSubdivision) return false;

      if (searchType === 'date') {
        if (dateQuery.trim() !== '' && !rec.date.includes(dateQuery)) {
          return false;
        }
      } else {
        if (invoiceQuery.trim() !== '' && !rec.invoiceNum.toLowerCase().includes(invoiceQuery.toLowerCase())) {
          return false;
        }
      }

      return true;
    });
  }, [records, searchType, selectedClient, selectedSubdivision, dateQuery, invoiceQuery]);

  const renderControlStatus = (status: IncomingControlRecord['controlStatus']) => {
    switch (status) {
      case 'Дозволено':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#E6F4EA] text-[#0F9D58]" id="control-allowed">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0F9D58]" />
            Дозволено
          </span>
        );
      case 'Тимчасово заборонено':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FDF3E1] text-[#8A5A0F]" id="control-suspended">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8A5A0F]" />
            Тимчасово заборонено
          </span>
        );
      case 'Заборонено':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FCE8E0] text-[#D2461B]" id="control-banned">
            ✕ Заборонено
          </span>
        );
    }
  };

  return (
    <div className="animate-fade-in space-y-5">
      {/* Page header */}
      <div>
        <h1 className="text-xl font-bold text-[#1A1D23] m-0" id="incoming-control-title">Вхідний контроль</h1>
        <p className="text-xs text-[#6B7280] mt-1 m-0">Реєстр результатів вхідного контролю якості лікарських засобів та медичних виробів</p>
      </div>

      {/* Search Toggle + Inputs Form */}
      <div className="bg-white border border-[#E3E6EA] rounded-[10px] p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 select-none pb-3 border-b border-[#E3E6EA]/60">
          <h2 className="text-xs font-bold uppercase text-[#9AA1AC] tracking-wider m-0">Критерії пошуку уповноваженої особи</h2>
          
          {/* Radio Choices */}
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-xs font-semibold text-[#1A1D23] cursor-pointer">
              <input
                type="radio"
                name="searchType"
                checked={searchType === 'date'}
                onChange={() => setSearchType('date')}
                className="accent-[#C8102E] w-3.5 h-3.5"
                id="search-by-date-radio"
              />
              <span className="flex items-center gap-1">
                <Calendar size={13} className="text-[#6B7280]" />
                Пошук за датою
              </span>
            </label>
            
            <label className="flex items-center gap-2 text-xs font-semibold text-[#1A1D23] cursor-pointer">
              <input
                type="radio"
                name="searchType"
                checked={searchType === 'invoice'}
                onChange={() => setSearchType('invoice')}
                className="accent-[#C8102E] w-3.5 h-3.5"
                id="search-by-invoice-radio"
              />
              <span className="flex items-center gap-1">
                <FileSpreadsheet size={13} className="text-[#6B7280]" />
                Пошук за накладною
              </span>
            </label>
          </div>
        </div>

        {/* Dynamic Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* Client select */}
          <div>
            <label className="block text-xs font-semibold text-[#1A1D23] mb-1.5 select-none">Клієнт</label>
            <select
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-[6px] border border-[#E3E6EA] bg-white text-[#1A1D23] focus:outline-none focus:border-[#C8102E]"
            >
              {clients.map((c, idx) => (
                <option key={idx} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Subdivision select */}
          <div>
            <label className="block text-xs font-semibold text-[#1A1D23] mb-1.5 select-none">Підрозділ аптеки</label>
            <select
              value={selectedSubdivision}
              onChange={(e) => setSelectedSubdivision(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-[6px] border border-[#E3E6EA] bg-white text-[#1A1D23] focus:outline-none focus:border-[#C8102E]"
            >
              <option value="Усі">Усі підрозділи (11)</option>
              {SUBDIVISIONS.map((sub, idx) => (
                <option key={idx} value={sub}>{sub}</option>
              ))}
            </select>
          </div>

          {/* Conditional field */}
          {searchType === 'date' ? (
            <div>
              <label className="block text-xs font-semibold text-[#1A1D23] mb-1.5 select-none">Дата надходження (або місяць)</label>
              <input
                type="text"
                value={dateQuery}
                onChange={(e) => setDateQuery(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-[6px] border border-[#E3E6EA] bg-white text-[#1A1D23] focus:outline-none focus:border-[#C8102E]"
                placeholder="напр. 08.07.2026 або .07."
                id="control-date-input"
              />
            </div>
          ) : (
            <div>
              <label className="block text-xs font-semibold text-[#1A1D23] mb-1.5 select-none">Точний номер накладної</label>
              <input
                type="text"
                value={invoiceQuery}
                onChange={(e) => setInvoiceQuery(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-[6px] border border-[#E3E6EA] bg-white text-[#1A1D23] focus:outline-none focus:border-[#C8102E]"
                placeholder="напр. РН-1420862"
                id="control-invoice-input"
              />
            </div>
          )}

          {/* Search trigger simulation info */}
          <div className="flex items-end pb-1 text-xs text-[#9AA1AC] italic select-none">
            Дані фільтруються в реальному часі
          </div>
        </div>
      </div>

      {/* Results Table Card */}
      <div className="bg-white border border-[#E3E6EA] rounded-[10px] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[13px]">
            <thead>
              <tr className="bg-[#F4F5F7]/40">
                <th className="px-4 py-3 text-[11px] font-bold text-[#9AA1AC] uppercase tracking-wider">Дата</th>
                <th className="px-3 py-3 text-[11px] font-bold text-[#9AA1AC] uppercase tracking-wider">Накладна</th>
                <th className="px-3 py-3 text-[11px] font-bold text-[#9AA1AC] uppercase tracking-wider">Підрозділ аптеки</th>
                <th className="px-3 py-3 text-[11px] font-bold text-[#9AA1AC] uppercase tracking-wider">Найменування товару</th>
                <th className="px-3 py-3 text-[11px] font-bold text-[#9AA1AC] uppercase tracking-wider">Серія / Виробник</th>
                <th className="px-3 py-3 text-[11px] font-bold text-[#9AA1AC] uppercase tracking-wider">Висновок уповноваженої особи</th>
                <th className="px-3 py-3 text-[11px] font-bold text-[#9AA1AC] uppercase tracking-wider">Результат контролю</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3E6EA]">
              {filteredRecords.length > 0 ? (
                filteredRecords.map((rec) => (
                  <tr key={rec.id} className="hover:bg-neutral-50/50 transition-colors">
                    <td className="px-4 py-3.5 text-[#6B7280]">{rec.date}</td>
                    <td className="px-3 py-3.5 font-mono text-[#1A1D23] font-medium">{rec.invoiceNum}</td>
                    <td className="px-3 py-3.5 text-[#6B7280]">{rec.subdivision}</td>
                    <td className="px-3 py-3.5 font-medium text-[#1A1D23]">{rec.productName}</td>
                    <td className="px-3 py-3.5">
                      <div className="text-xs font-semibold font-mono text-[#1A1D23]">Серія: {rec.batch}</div>
                      <div className="text-[11px] text-[#9AA1AC] mt-0.5">{rec.manufacturer}</div>
                    </td>
                    <td className="px-3 py-3.5 font-mono text-xs text-[#6B7280]">{rec.conclusionNum}</td>
                    <td className="px-3 py-3.5">{renderControlStatus(rec.controlStatus)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-[#9AA1AC] text-sm font-medium">
                    За вказаними критеріями вхідного контролю записів не знайдено.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
