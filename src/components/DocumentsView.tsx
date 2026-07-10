import React, { useState, useMemo } from 'react';
import { SupportDocument } from '../types';
import { INITIAL_SUPPORT_DOCUMENTS } from '../data';
import { Search, FileText, Info, Download, ShieldCheck } from 'lucide-react';

export default function DocumentsView() {
  const [documents, setDocuments] = useState<SupportDocument[]>(INITIAL_SUPPORT_DOCUMENTS);

  // Search filter states
  const [clientFilter, setClientFilter] = useState('Усі');
  const [docTypeFilter, setDocTypeFilter] = useState('Усі');
  const [productQuery, setProductQuery] = useState('');
  const [batchQuery, setBatchQuery] = useState('');
  const [invoiceQuery, setInvoiceQuery] = useState('');

  // Dropdown list generation
  const clients = ['Усі', 'ДАРІЯФАРМА, ТОВ'];
  const docTypes = ['Усі', 'Видаткова накладна', 'Товарно-транспортна накладна', 'Сертифікат якості'];

  // Handle Search / Filtering
  const filteredDocs = useMemo(() => {
    return documents.filter((doc) => {
      if (clientFilter !== 'Усі' && doc.client !== clientFilter) return false;
      if (docTypeFilter !== 'Усі' && doc.type !== docTypeFilter) return false;

      if (productQuery.trim() !== '' && !doc.productName.toLowerCase().includes(productQuery.toLowerCase())) {
        return false;
      }
      if (batchQuery.trim() !== '' && !doc.batch.toLowerCase().includes(batchQuery.toLowerCase())) {
        return false;
      }
      if (invoiceQuery.trim() !== '' && !doc.invoiceNum.toLowerCase().includes(invoiceQuery.toLowerCase())) {
        return false;
      }

      return true;
    });
  }, [documents, clientFilter, docTypeFilter, productQuery, batchQuery, invoiceQuery]);

  const handleDownload = (docId: string, docName: string) => {
    alert(`Завантаження документу ${docName} (${docId}) у форматі PDF...`);
  };

  const handleEcpVerify = (docId: string) => {
    alert(`Електронний Цифровий Підпис (ЕЦП) підтверджено. Сертифікат дійсний. Перевірено через сервіс КЕП.`);
  };

  return (
    <div className="animate-fade-in space-y-5">
      {/* Page Title */}
      <div>
        <h1 className="text-xl font-bold text-[#1A1D23] m-0" id="documents-title">Супровідні документи</h1>
        <p className="text-xs text-[#6B7280] mt-1 m-0">Перегляд видаткових накладних, товарно-транспортних накладних та сертифікатів якості</p>
      </div>

      {/* Information Warning Banner Strip - Non default styled */}
      <div className="flex items-start gap-3.5 bg-[#FDF3E1] border border-[#FCD7DB]/30 rounded-[10px] p-4 text-[13px] select-none text-[#8A5A0F]" id="documents-search-hint">
        <Info size={18} className="shrink-0 text-[#8A5A0F] mt-0.5" />
        <div className="space-y-1">
          <div className="font-semibold text-[#1A1D23]">Пошук супровідних документів за великі періоди може бути довгим</div>
          <div className="text-[#6B7280] text-xs leading-relaxed">
            Для прискорення формування реєстру заповнюйте хоча б декілька фільтрів одночасно (наприклад, серію товару або точний номер видаткової накладної). Дані за останні 3 місяці завантажуються майже миттєво.
          </div>
        </div>
      </div>

      {/* Search Form Panel */}
      <div className="bg-white border border-[#E3E6EA] rounded-[10px] p-5 shadow-xs">
        <h2 className="text-xs font-bold uppercase text-[#9AA1AC] tracking-wider mb-4 select-none">Параметри пошуку супровідних документів</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {/* Client Filter */}
          <div>
            <label className="block text-xs font-semibold text-[#1A1D23] mb-1.5 select-none">Клієнт</label>
            <select
              value={clientFilter}
              onChange={(e) => setClientFilter(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-[6px] border border-[#E3E6EA] bg-white text-[#1A1D23] focus:outline-none focus:border-[#C8102E]"
            >
              {clients.map((c, idx) => (
                <option key={idx} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Doc Type */}
          <div>
            <label className="block text-xs font-semibold text-[#1A1D23] mb-1.5 select-none">Тип документу</label>
            <select
              value={docTypeFilter}
              onChange={(e) => setDocTypeFilter(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-[6px] border border-[#E3E6EA] bg-white text-[#1A1D23] focus:outline-none focus:border-[#C8102E]"
            >
              {docTypes.map((type, idx) => (
                <option key={idx} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Product Name Query */}
          <div>
            <label className="block text-xs font-semibold text-[#1A1D23] mb-1.5 select-none">Назва товару</label>
            <input
              type="text"
              value={productQuery}
              onChange={(e) => setProductQuery(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-[6px] border border-[#E3E6EA] bg-white text-[#1A1D23] focus:outline-none focus:border-[#C8102E]"
              placeholder="напр. Травісил"
            />
          </div>

          {/* Batch Query */}
          <div>
            <label className="block text-xs font-semibold text-[#1A1D23] mb-1.5 select-none">Серія товару</label>
            <input
              type="text"
              value={batchQuery}
              onChange={(e) => setBatchQuery(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-[6px] border border-[#E3E6EA] bg-white text-[#1A1D23] focus:outline-none focus:border-[#C8102E]"
              placeholder="напр. TR-1192A"
            />
          </div>

          {/* Invoice Query */}
          <div>
            <label className="block text-xs font-semibold text-[#1A1D23] mb-1.5 select-none">Номер накладної</label>
            <input
              type="text"
              value={invoiceQuery}
              onChange={(e) => setInvoiceQuery(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-[6px] border border-[#E3E6EA] bg-white text-[#1A1D23] focus:outline-none focus:border-[#C8102E]"
              placeholder="напр. РН-1420862"
            />
          </div>
        </div>

        {/* Clear filters shortcut */}
        {(productQuery || batchQuery || invoiceQuery || clientFilter !== 'Усі' || docTypeFilter !== 'Усі') && (
          <div className="mt-4 flex justify-end select-none">
            <button
              type="button"
              onClick={() => {
                setClientFilter('Усі');
                setDocTypeFilter('Усі');
                setProductQuery('');
                setBatchQuery('');
                setInvoiceQuery('');
              }}
              className="text-xs text-[#C8102E] font-semibold hover:underline"
              id="clear-docs-filters-btn"
            >
              Очистити всі фільтри
            </button>
          </div>
        )}
      </div>

      {/* Support Documents Results Table Card */}
      <div className="bg-white border border-[#E3E6EA] rounded-[10px] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[13px]">
            <thead>
              <tr className="bg-[#F4F5F7]/40">
                <th className="px-4 py-3 text-[11px] font-bold text-[#9AA1AC] uppercase tracking-wider">Тип документу</th>
                <th className="px-3 py-3 text-[11px] font-bold text-[#9AA1AC] uppercase tracking-wider">Дата</th>
                <th className="px-3 py-3 text-[11px] font-bold text-[#9AA1AC] uppercase tracking-wider">Номер накладної / ТТН</th>
                <th className="px-3 py-3 text-[11px] font-bold text-[#9AA1AC] uppercase tracking-wider">Товар та Серія</th>
                <th className="px-3 py-3 text-[11px] font-bold text-[#9AA1AC] uppercase tracking-wider">Сума</th>
                <th className="px-3 py-3 text-[11px] font-bold text-[#9AA1AC] uppercase tracking-wider">Статус КЕП / ЕЦП</th>
                <th className="w-20 px-3 py-3 text-right text-[11px] font-bold text-[#9AA1AC] uppercase tracking-wider">Дія</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3E6EA]">
              {filteredDocs.length > 0 ? (
                filteredDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-neutral-50/50 transition-colors">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2 font-semibold text-[#1A1D23]">
                        <FileText size={14} className="text-[#6B7280]" />
                        {doc.type}
                      </div>
                    </td>
                    <td className="px-3 py-3.5 text-[#6B7280]">{doc.date}</td>
                    <td className="px-3 py-3.5 font-mono text-[#1A1D23] font-medium">{doc.invoiceNum}</td>
                    <td className="px-3 py-3.5">
                      <div className="text-[#1A1D23] font-medium">{doc.productName}</div>
                      <div className="text-xs text-[#9AA1AC] mt-0.5">Серія: <span className="font-mono font-semibold">{doc.batch}</span></div>
                    </td>
                    <td className="px-3 py-3.5 text-[#1A1D23] font-semibold">{doc.amount}</td>
                    <td className="px-3 py-3.5">
                      {doc.hasEcp ? (
                        <button
                          type="button"
                          onClick={() => handleEcpVerify(doc.id)}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-[#E6F4EA] text-[#0F9D58] border border-transparent hover:border-[#0F9D58] transition"
                          title="Клікнути для перевірки сертифікату ЕЦП"
                        >
                          <ShieldCheck size={12} />
                          Підписано ЕЦП
                        </button>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold bg-[#F1F2F4] text-[#9AA1AC]">
                          Без підпису
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-3.5 text-right">
                      <button
                        type="button"
                        onClick={() => handleDownload(doc.id, doc.type)}
                        className="text-[#C8102E] hover:text-[#A50D24] p-1.5 rounded hover:bg-[#FDECEE] transition-colors"
                        title="Завантажити копію PDF"
                        aria-label={`Завантажити PDF ${doc.type}`}
                      >
                        <Download size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-[#9AA1AC] text-sm font-medium">
                    За вказаними критеріями пошуку документів не знайдено.
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
