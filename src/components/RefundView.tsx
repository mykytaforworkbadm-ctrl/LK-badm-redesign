import React, { useState, useEffect } from 'react';
import { RefundRequest } from '../types';
import { SUBDIVISIONS } from '../data';
import { AlertCircle, RotateCcw, HelpCircle, FileText, Check, Trash, Plus } from 'lucide-react';

interface RefundViewProps {
  refundRequests: RefundRequest[];
  onAddRefund: (newRefund: RefundRequest) => void;
}

export default function RefundView({ refundRequests, onAddRefund }: RefundViewProps) {
  const [activeTab, setActiveTab] = useState<'new' | 'history'>('new');
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [emptyStateSimulation, setEmptyStateSimulation] = useState(false);

  // Form states
  const [subdivision, setSubdivision] = useState(SUBDIVISIONS[0]);
  const [invoiceNum, setInvoiceNum] = useState('РН-1420862');
  const [productName, setProductName] = useState('Парацетамол-Дарниця таб. 500мг №10');
  const [quantity, setQuantity] = useState(1);
  const [reason, setReason] = useState('Виявлено пошкодження блістера при транспортуванні');

  // Trigger rules modal only once when entering Refund flow
  useEffect(() => {
    setShowRulesModal(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName.trim() || !invoiceNum.trim()) return;

    const newId = `R-2026-00${Math.floor(50 + Math.random() * 49)}`;
    const todayStr = new Date().toLocaleDateString('uk-UA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).replace(/\//g, '.');

    const newRefund: RefundRequest = {
      id: newId,
      client: 'ДАРІЯФАРМА, ТОВ',
      subdivision,
      date: todayStr,
      status: 'Нова',
      productName,
      quantity: Number(quantity),
      reason,
      invoiceNum
    };

    onAddRefund(newRefund);
    alert('Заявку на повернення успішно створено та надіслано до відділу претензій!');
    setActiveTab('history');
  };

  const renderStatusChip = (status: RefundRequest['status']) => {
    switch (status) {
      case 'Нова':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold bg-[#F1F2F4] text-[#6B7280]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6B7280]" />
            Нова
          </span>
        );
      case 'В процесі':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold bg-[#FDF3E1] text-[#8A5A0F]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8A5A0F]" />
            В процесі
          </span>
        );
      case 'Підтверджена':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold bg-[#E6F4EA] text-[#0F9D58]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0F9D58]" />
            Підтверджена
          </span>
        );
      case 'Відхилена':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-[#FCE8E0] text-[#D2461B]">
            ✕ Відхилена
          </span>
        );
    }
  };

  return (
    <div className="animate-fade-in space-y-5">
      {/* Page header */}
      <div className="flex justify-between items-center select-none">
        <div>
          <h1 className="text-xl font-bold text-[#1A1D23] m-0" id="refund-title">Повернення товарів</h1>
          <p className="text-xs text-[#6B7280] mt-1 m-0">Подача рекламацій та відслідковування статусів повернення</p>
        </div>
        <button
          type="button"
          onClick={() => setShowRulesModal(true)}
          className="text-xs font-semibold text-[#C8102E] bg-[#FDECEE] hover:bg-[#FCD7DB] px-3.5 py-2 rounded-[6px] border border-transparent transition flex items-center gap-1.5"
          id="show-rules-btn"
        >
          <HelpCircle size={14} />
          Правила повернення
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#E3E6EA] select-none" id="refund-tabs-bar">
        <button
          type="button"
          onClick={() => setActiveTab('new')}
          className={`px-4 py-2 text-[13.5px] font-medium border-b-2 -mb-[2px] transition ${
            activeTab === 'new' 
              ? 'text-[#C8102E] border-[#C8102E] font-semibold' 
              : 'text-[#6B7280] border-transparent hover:text-[#1A1D23]'
          }`}
        >
          Нова заявка
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 text-[13.5px] font-medium border-b-2 -mb-[2px] transition ${
            activeTab === 'history' 
              ? 'text-[#C8102E] border-[#C8102E] font-semibold' 
              : 'text-[#6B7280] border-transparent hover:text-[#1A1D23]'
          }`}
        >
          Історія заявок ({refundRequests.length})
        </button>
      </div>

      {/* New Refund Application Tab */}
      {activeTab === 'new' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5" id="tab-refund-new">
          <div className="lg:col-span-2 bg-white border border-[#E3E6EA] rounded-[10px] p-5">
            <h2 className="text-sm font-semibold text-[#1A1D23] mb-4">Формування заявки на рекламацію</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1A1D23] mb-1.5">
                    Підрозділ аптеки
                  </label>
                  <select
                    value={subdivision}
                    onChange={(e) => setSubdivision(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-[6px] border border-[#E3E6EA] bg-white text-[#1A1D23] focus:outline-none focus:border-[#C8102E]"
                  >
                    {SUBDIVISIONS.map((sub, idx) => (
                      <option key={idx} value={sub}>{sub}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1A1D23] mb-1.5">
                    Номер видаткової накладної
                  </label>
                  <input
                    type="text"
                    required
                    value={invoiceNum}
                    onChange={(e) => setInvoiceNum(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-[6px] border border-[#E3E6EA] bg-white text-[#1A1D23] focus:outline-none focus:border-[#C8102E]"
                    placeholder="напр. РН-1420862"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1A1D23] mb-1.5">
                  Найменування лікарського засобу або товару
                </label>
                <input
                  type="text"
                  required
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-[6px] border border-[#E3E6EA] bg-white text-[#1A1D23] focus:outline-none focus:border-[#C8102E]"
                  placeholder="Вкажіть точну назву за накладною"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="sm:col-span-1">
                  <label className="block text-xs font-semibold text-[#1A1D23] mb-1.5">
                    Кількість
                  </label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full text-xs px-3 py-2 rounded-[6px] border border-[#E3E6EA] bg-white text-[#1A1D23] focus:outline-none focus:border-[#C8102E]"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-semibold text-[#1A1D23] mb-1.5">
                    Причина рекламації
                  </label>
                  <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-[6px] border border-[#E3E6EA] bg-white text-[#1A1D23] focus:outline-none focus:border-[#C8102E]"
                  >
                    <option value="Виявлено пошкодження блістера при транспортуванні">Виявлено пошкодження блістера при транспортуванні</option>
                    <option value="Помилкове подвійне замовлення провізора">Помилкове подвійне замовлення провізора</option>
                    <option value="Термін придатності закінчується менш ніж за 3 місяці">Термін придатності закінчується менш ніж за 3 місяці</option>
                    <option value="Невідповідність маркування серії на коробці">Невідповідність маркування серії на коробці</option>
                    <option value="Брак заводського пакування / дефект флакону">Брак заводського пакування / дефект флакону</option>
                    <option value="Інша причина (описати додатково)">Інша причина (описати додатково)</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E3E6EA] flex justify-end">
                <button
                  type="submit"
                  className="bg-[#C8102E] hover:bg-[#A50D24] text-white px-5 py-2.5 rounded-[6px] text-xs font-semibold transition-colors flex items-center gap-1.5"
                  id="submit-refund-btn"
                >
                  <Plus size={14} />
                  Надіслати заявку
                </button>
              </div>
            </form>
          </div>

          {/* Quick instructions panel inside form */}
          <div className="bg-white border border-[#E3E6EA] rounded-[10px] p-5 select-none space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#9AA1AC]">Пам'ятка провізору</h3>
            <ul className="space-y-3.5 text-xs text-[#6B7280] pl-4 list-disc leading-relaxed">
              <li>Будь ласка, зберігайте транспортну тару до підтвердження рекламації.</li>
              <li>Термін розгляду заявки претензійним відділом становить <span className="text-[#1A1D23] font-semibold">2 робочі дні</span>.</li>
              <li>Після підтвердження заявки водій БаДМ забере товар під час наступного планового рейсу.</li>
              <li>Фінансове зарахування коштів на баланс проводиться протягом <span className="text-[#1A1D23] font-semibold">24 годин</span> з моменту фактичного повернення товару на склад.</li>
            </ul>
          </div>
        </div>
      )}

      {/* Refund History Tab */}
      {activeTab === 'history' && (
        <div className="space-y-4" id="tab-refund-history">
          {/* Simulation Toggle to let users view both beautiful tables and the required Empty state */}
          <div className="flex justify-end select-none">
            <label className="flex items-center gap-1.5 text-xs text-[#6B7280] bg-[#F1F2F4] px-3 py-1.5 rounded-full border border-[#E3E6EA] cursor-pointer">
              <input
                type="checkbox"
                checked={emptyStateSimulation}
                onChange={(e) => setEmptyStateSimulation(e.target.checked)}
                className="accent-[#C8102E]"
                id="toggle-refund-empty-state"
              />
              <span>Імітувати відсутність заявок (порожній стан)</span>
            </label>
          </div>

          {emptyStateSimulation || refundRequests.length === 0 ? (
            <div className="bg-white border border-[#E3E6EA] rounded-[10px] py-16 text-center select-none" id="refund-empty-state">
              <div className="text-3xl mb-2.5 opacity-55">📭</div>
              <div className="text-sm text-[#9AA1AC] font-medium">Заявок на повернення ще немає</div>
              <div className="text-xs text-[#9AA1AC] mt-1 max-w-[280px] mx-auto">Усі створені рекламації щодо якості чи помилкових поставок з'являться у цьому розділі.</div>
            </div>
          ) : (
            <div className="bg-white border border-[#E3E6EA] rounded-[10px] overflow-hidden shadow-xs" id="refund-history-table-container">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-[13px]">
                  <thead>
                    <tr className="bg-[#F4F5F7]/40">
                      <th className="px-4 py-2.5 text-[11px] font-bold text-[#9AA1AC] uppercase tracking-wider">ID Заявки</th>
                      <th className="px-3 py-2.5 text-[11px] font-bold text-[#9AA1AC] uppercase tracking-wider">Дата подачі</th>
                      <th className="px-3 py-2.5 text-[11px] font-bold text-[#9AA1AC] uppercase tracking-wider">Підрозділ аптеки</th>
                      <th className="px-3 py-2.5 text-[11px] font-bold text-[#9AA1AC] uppercase tracking-wider">Накладна</th>
                      <th className="px-3 py-2.5 text-[11px] font-bold text-[#9AA1AC] uppercase tracking-wider">Товар та кількість</th>
                      <th className="px-3 py-2.5 text-[11px] font-bold text-[#9AA1AC] uppercase tracking-wider">Причина рекламації</th>
                      <th className="px-3 py-2.5 text-[11px] font-bold text-[#9AA1AC] uppercase tracking-wider">Статус</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E3E6EA]">
                    {refundRequests.map((req) => (
                      <tr key={req.id} className="hover:bg-neutral-50/50 transition-colors">
                        <td className="px-4 py-3.5 font-mono font-medium text-[#1A1D23]">{req.id}</td>
                        <td className="px-3 py-3.5 text-[#6B7280]">{req.date}</td>
                        <td className="px-3 py-3.5 text-[#6B7280]">{req.subdivision}</td>
                        <td className="px-3 py-3.5 font-mono text-[#6B7280]">{req.invoiceNum}</td>
                        <td className="px-3 py-3.5 text-[#1A1D23]">
                          <div className="font-semibold">{req.productName}</div>
                          <div className="text-xs text-[#9AA1AC] mt-0.5">Кількість: {req.quantity} уп.</div>
                        </td>
                        <td className="px-3 py-3.5 text-[#6B7280] text-xs">{req.reason}</td>
                        <td className="px-3 py-3.5">{renderStatusChip(req.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Pre-Claim Mandatory Instructions Dialog */}
      {showRulesModal && (
        <div className="fixed inset-0 bg-black/45 flex items-center justify-center z-50 transition-opacity animate-fade-in" id="rules-modal-overlay">
          <div className="bg-white rounded-[10px] max-width-[480px] w-11/12 max-w-[480px] shadow-xl overflow-hidden border border-[#E3E6EA]">
            <div className="flex items-center gap-2.5 px-5 py-4 border-b border-[#E3E6EA]">
              <div className="w-7 h-7 rounded-full bg-[#FDF3E1] text-[#8A5A0F] flex items-center justify-center font-bold text-sm shrink-0">
                !
              </div>
              <h3 className="m-0 text-sm font-semibold text-[#1A1D23]" id="modal-title">Перед створенням заявки</h3>
            </div>
            
            <div className="p-5 text-[13.5px] text-[#6B7280] leading-relaxed">
              <ol className="list-decimal pl-4.5 space-y-2.5">
                <li>
                  Вкажіть причину повернення <span className="text-[#1A1D23] font-semibold">максимально точно</span> — це суттєво прискорить обробку заявки претензійним відділом.
                </li>
                <li>
                  Для різних товарів у одній заявці можна вказати причину рекламації окремо для кожної позиції.
                </li>
                <li>
                  Якщо адреса забору відрізняється від адреси доставки за накладною — обов'язково вкажіть це в коментарях або повідомте менеджеру.
                </li>
              </ol>
            </div>
            
            <div className="px-5 py-3.5 border-t border-[#E3E6EA] flex justify-end bg-neutral-50/50">
              <button
                type="button"
                onClick={() => setShowRulesModal(false)}
                className="bg-[#C8102E] hover:bg-[#A50D24] text-white px-4 py-2 rounded-[6px] text-xs font-semibold transition-colors"
                id="modal-close"
              >
                Зрозуміло
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
