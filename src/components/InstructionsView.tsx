import React from 'react';
import { BookOpen, FileText, Download, Shield } from 'lucide-react';

export default function InstructionsView() {
  const handleDownloadPdf = (filename: string) => {
    alert(`Ініціація завантаження офіційної інструкції "${filename}" у форматі PDF...`);
  };

  return (
    <div className="animate-fade-in space-y-5">
      {/* Page Title */}
      <div>
        <h1 className="text-xl font-bold text-[#1A1D23] m-0" id="instructions-title">Інструкції користувача</h1>
        <p className="text-xs text-[#6B7280] mt-1 m-0">Документація щодо налаштування та роботи з порталом самообслуговування БаДМ</p>
      </div>

      {/* Side by side cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5" id="instructions-cards-grid">
        
        {/* Card 1 */}
        <div className="bg-white border border-[#E3E6EA] rounded-[10px] p-5 flex flex-col justify-between h-56 hover:shadow-xs transition-shadow">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-8 rounded-full bg-[#FDECEE] text-[#C8102E] flex items-center justify-center">
                <BookOpen size={16} />
              </span>
              <h3 className="text-sm font-bold text-[#1A1D23] m-0">Посібник користувача ЛК БаДМ</h3>
            </div>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              Детальний опис інтерфейсу, заповнення реквізитів, фільтрація замовлень для всіх 11 підрозділів аптеки та відправка супровідних документів.
            </p>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-[#E3E6EA]/50 select-none">
            {/* Filename Chip */}
            <span className="inline-flex items-center gap-1 bg-[#F1F2F4] text-[#6B7280] px-2.5 py-1 rounded-md text-xs font-mono font-medium">
              <FileText size={12} />
              badm_guide_v4.2.pdf
            </span>

            <button
              type="button"
              onClick={() => handleDownloadPdf('badm_guide_v4.2.pdf')}
              className="text-[#C8102E] hover:text-[#A50D24] text-xs font-bold flex items-center gap-1 hover:underline"
            >
              <Download size={13} />
              Завантажити (2.4 MB)
            </button>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white border border-[#E3E6EA] rounded-[10px] p-5 flex flex-col justify-between h-56 hover:shadow-xs transition-shadow">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-8 rounded-full bg-[#E6F4EA] text-[#0F9D58] flex items-center justify-center">
                <Shield size={16} />
              </span>
              <h3 className="text-sm font-bold text-[#1A1D23] m-0">Інструкція з налаштування КЕП / ЕЦП</h3>
            </div>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              Керівництво по інтеграції ваших ключів кваліфікованого електронного підпису (КЕП) для безперешкодного затвердження видаткових накладних.
            </p>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-[#E3E6EA]/50 select-none">
            {/* Filename Chip */}
            <span className="inline-flex items-center gap-1 bg-[#F1F2F4] text-[#6B7280] px-2.5 py-1 rounded-md text-xs font-mono font-medium">
              <FileText size={12} />
              ecp_signing_setup.pdf
            </span>

            <button
              type="button"
              onClick={() => handleDownloadPdf('ecp_signing_setup.pdf')}
              className="text-[#C8102E] hover:text-[#A50D24] text-xs font-bold flex items-center gap-1 hover:underline"
            >
              <Download size={13} />
              Завантажити (1.8 MB)
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
