import React, { useState } from 'react';
import { PromoBanner } from '../types';
import { INITIAL_PROMO_BANNERS } from '../data';
import { Percent, Calendar, Sparkles, Check } from 'lucide-react';

export default function PromosView() {
  const [promos, setPromos] = useState<PromoBanner[]>(INITIAL_PROMO_BANNERS);
  const [activeTab, setActiveTab] = useState<'available' | 'banners'>('available');

  const handleApplyPromoCode = (promoId: string) => {
    alert(`Промокод на акцію ${promoId} успішно активовано та закріплено за вашим договором! Знижки відображатимуться при закупівлі.`);
  };

  return (
    <div className="animate-fade-in space-y-5">
      {/* Header Row with Tabs style toggles */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 select-none pb-2 border-b border-[#E3E6EA]">
        <div>
          <h1 className="text-xl font-bold text-[#1A1D23] m-0" id="promos-title">Пропозиції для Вас</h1>
          <p className="text-xs text-[#6B7280] mt-1 m-0">Акційні умови, пріоритетні закупівлі та партнерські бонуси</p>
        </div>

        {/* Tab Style Toggle */}
        <div className="flex bg-[#F1F2F4] p-1 rounded-[8px] border border-[#E3E6EA] text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('available')}
            className={`px-3.5 py-1.5 rounded-[6px] transition-colors ${
              activeTab === 'available' 
                ? 'bg-white text-[#C8102E] shadow-sm font-bold' 
                : 'text-[#6B7280] hover:text-[#1A1D23]'
            }`}
          >
            Доступні для аптеки Акції
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('banners')}
            className={`px-3.5 py-1.5 rounded-[6px] transition-colors ${
              activeTab === 'banners' 
                ? 'bg-white text-[#C8102E] shadow-sm font-bold' 
                : 'text-[#6B7280] hover:text-[#1A1D23]'
            }`}
          >
            Показати банери акцій
          </button>
        </div>
      </div>

      {/* Promos Grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5" id="promos-grid-layout">
        {promos.map((promo) => (
          <div 
            key={promo.id} 
            className="bg-white border border-[#E3E6EA] rounded-[10px] overflow-hidden flex flex-col sm:flex-row shadow-xs hover:shadow-md transition-shadow"
          >
            {/* Promo Image */}
            <div className="sm:w-2/5 relative h-48 sm:h-auto shrink-0 bg-neutral-100">
              <img 
                src={promo.imageUrl} 
                alt={promo.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              {promo.badge && (
                <span className="absolute top-3 left-3 bg-[#C8102E] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-[4px] shadow-sm flex items-center gap-1">
                  <Percent size={10} />
                  {promo.badge}
                </span>
              )}
            </div>

            {/* Promo Contents */}
            <div className="p-5 flex flex-col justify-between flex-1 space-y-3">
              <div>
                <h3 className="text-sm font-bold text-[#1A1D23] leading-snug line-clamp-2">
                  {promo.title}
                </h3>
                <p className="text-xs text-[#6B7280] mt-2 leading-relaxed line-clamp-4">
                  {promo.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E3E6EA]/60 flex items-center justify-between text-xs text-[#9AA1AC] select-none">
                <div className="flex items-center gap-1">
                  <Calendar size={13} />
                  <span>Діє до {promo.validUntil || '31.12.2026'}</span>
                </div>
                
                <button
                  type="button"
                  onClick={() => handleApplyPromoCode(promo.id)}
                  className="bg-[#C8102E] hover:bg-[#A50D24] text-white px-3 py-1.5 rounded-[5px] text-[11px] font-bold transition-colors"
                >
                  Активувати
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
