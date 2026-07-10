import React, { useState } from 'react';
import { Order } from '../types';
import { AlertCircle, HelpCircle, Check, X } from 'lucide-react';

interface DashboardViewProps {
  orders: Order[];
  onNavigateToOrders: () => void;
  refundsCount: number;
}

export default function DashboardView({ orders, onNavigateToOrders, refundsCount }: DashboardViewProps) {
  const [showPromo, setShowPromo] = useState(true);

  // Take first 4 orders for "Останні замовлення" table
  const recentOrders = orders.slice(0, 4);

  // Status chip renderer matching reference
  const renderStatusChip = (status: Order['status']) => {
    switch (status) {
      case 'Відправлено на склад':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold bg-[#E6F4EA] text-[#0F9D58]" id="status-warehouse">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0F9D58]" />
            Відправлено на склад
          </span>
        );
      case 'Відмовлено':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-[#FCE8E0] text-[#D2461B]" id="status-rejected">
            ✕ Відмовлено
          </span>
        );
      case 'Очікування дозамовлення':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold bg-[#FDF3E1] text-[#8A5A0F]" id="status-pending">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8A5A0F]" />
            Очікування дозамовлення
          </span>
        );
      case 'Нове':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold bg-[#F1F2F4] text-[#6B7280]" id="status-new">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6B7280]" />
            Нове
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold bg-[#F1F2F4] text-[#6B7280]" id="status-default">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6B7280]" />
            {status}
          </span>
        );
    }
  };

  return (
    <div className="animate-fade-in space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-xl font-bold text-[#1A1D23] m-0" id="dashboard-title">Добрий день, Микита</h1>
        <p className="text-xs text-[#6B7280] mt-1 m-0">ДАРІЯФАРМА, ТОВ · зведені дані по всіх 11 підрозділах</p>
      </div>

      {/* Stat Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Stat 1 */}
        <div className="bg-white border border-[#E3E6EA] rounded-[10px] p-4 select-none">
          <div className="text-[12.5px] text-[#6B7280] flex items-center gap-1.5 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#0F9D58]" />
            Активні замовлення
          </div>
          <div className="text-2xl font-semibold text-[#1A1D23]" id="stat-active-orders">89</div>
          <div className="text-[11px] text-[#9AA1AC] mt-1.5">з 127 замовлень загалом (ілюстративно)</div>
        </div>

        {/* Stat 2 */}
        <div className="bg-white border border-[#E3E6EA] rounded-[10px] p-4 select-none">
          <div className="text-[12.5px] text-[#6B7280] flex items-center gap-1.5 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#8A5A0F]" />
            Заявки на повернення
          </div>
          <div className="text-2xl font-semibold text-[#8A5A0F]" id="stat-refund-requests">{refundsCount}</div>
          <div className="text-[11px] text-[#9AA1AC] mt-1.5">активні рекламації у процесі обробки</div>
        </div>

        {/* Stat 3 */}
        <div className="bg-white border border-[#E3E6EA] rounded-[10px] p-4 select-none">
          <div className="text-[12.5px] text-[#6B7280] flex items-center gap-1.5 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#6B7280]" />
            Замовлення в чернетках
          </div>
          <div className="text-2xl font-semibold text-[#1A1D23]" id="stat-draft-orders">1</div>
          <div className="text-[11px] text-[#9AA1AC] mt-1.5">очікують на фінальне відправлення</div>
        </div>

        {/* Stat 4 */}
        <div className="bg-white border border-[#E3E6EA] rounded-[10px] p-4 select-none">
          <div className="text-[12.5px] text-[#6B7280] flex items-center gap-1.5 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#D2461B]" />
            Відмовлено дистриб'ютором
          </div>
          <div className="text-2xl font-semibold text-[#D2461B]" id="stat-rejected-orders">2</div>
          <div className="text-[11px] text-[#9AA1AC] mt-1.5">протягом останніх 7 робочих днів</div>
        </div>
      </div>

      {/* Promo Strip */}
      {showPromo && (
        <div className="flex items-center gap-3.5 bg-white border border-[#E3E6EA] rounded-[10px] p-3 text-[13px] relative animate-fade-in select-none" id="dashboard-promo-strip">
          <div className="w-12 h-9 bg-neutral-100 rounded flex items-center justify-center border border-[#E3E6EA] text-xs text-[#9AA1AC] font-medium shrink-0">
            БаДМ
          </div>
          <div className="flex-1 text-[#6B7280]">
            <span className="font-bold text-[#1A1D23]">Травісил Нео</span> — нові трав'яні льодяники вже доступні для експрес-замовлення з додатковою знижкою.
          </div>
          <div className="flex gap-1 shrink-0 px-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#E3E6EA]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#E3E6EA]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#E3E6EA]" />
          </div>
          <button 
            type="button"
            onClick={() => setShowPromo(false)}
            className="text-[#9AA1AC] hover:text-[#1A1D23] cursor-pointer p-1 bg-transparent border-none transition"
            aria-label="Закрити промо"
            id="dismiss-promo-btn"
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* Latest Orders Table Card */}
      <div className="bg-white border border-[#E3E6EA] rounded-[10px] overflow-hidden">
        <div className="px-[18px] py-3.5 border-b border-[#E3E6EA] flex items-center justify-between select-none">
          <h2 className="text-sm font-semibold text-[#1A1D23] m-0">Останні замовлення</h2>
          <button 
            type="button"
            onClick={onNavigateToOrders}
            className="text-xs text-[#C8102E] font-semibold hover:underline bg-transparent border-none cursor-pointer"
            id="view-all-orders-link"
          >
            Усі замовлення →
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[13px]">
            <thead>
              <tr className="bg-[#F4F5F7]/30">
                <th className="w-9 px-3.5 py-2.5 text-center text-[11px] font-bold text-[#9AA1AC] uppercase tracking-wider">Мітки</th>
                <th className="px-3 py-2.5 text-[11px] font-bold text-[#9AA1AC] uppercase tracking-wider">Номер</th>
                <th className="px-3 py-2.5 text-[11px] font-bold text-[#9AA1AC] uppercase tracking-wider">Підрозділ аптеки</th>
                <th className="px-3 py-2.5 text-[11px] font-bold text-[#9AA1AC] uppercase tracking-wider">Дата створення</th>
                <th className="px-3 py-2.5 text-[11px] font-bold text-[#9AA1AC] uppercase tracking-wider">Стан замовлення</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3E6EA]">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-neutral-50/50 transition-colors">
                  <td className="px-3.5 py-3 text-center">
                    {order.hasWarning && (
                      <span 
                        className="text-[#B7791F] cursor-help" 
                        title={order.warningTooltip || 'Увага щодо замовлення'}
                      >
                        ⚠️
                      </span>
                    )}
                    {order.hasQuestion && !order.hasWarning && (
                      <span 
                        className="text-[#3182CE] font-bold cursor-help" 
                        title={order.questionTooltip || 'Потребує додаткового уточнення'}
                      >
                        ❓
                      </span>
                    )}
                    {!order.hasWarning && !order.hasQuestion && <span className="text-[#9AA1AC]">—</span>}
                  </td>
                  <td className="px-3 py-3 font-mono font-medium text-[#1A1D23]">{order.id}</td>
                  <td className="px-3 py-3 text-[#6B7280]">{order.subdivision}</td>
                  <td className="px-3 py-3 text-[#6B7280]">{order.dateCreated}</td>
                  <td className="px-3 py-3">{renderStatusChip(order.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
