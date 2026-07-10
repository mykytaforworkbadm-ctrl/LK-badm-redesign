import React, { useState } from 'react';
import { NotificationMessage } from '../types';
import { Plus, Edit3, Trash2, Calendar, CheckSquare, X } from 'lucide-react';

interface AdminAlertsViewProps {
  notifications: NotificationMessage[];
  onAddNotification: (newAlert: NotificationMessage) => void;
  onUpdateNotification: (updated: NotificationMessage) => void;
  onDeleteNotification: (id: string) => void;
}

export default function AdminAlertsView({ 
  notifications, 
  onAddNotification, 
  onUpdateNotification, 
  onDeleteNotification 
}: AdminAlertsViewProps) {
  
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [editingAlert, setEditingAlert] = useState<NotificationMessage | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [tabName, setTabName] = useState('Всі кабінети');
  const [body, setBody] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const handleCreateNewClick = () => {
    setEditingAlert(null);
    setTitle('');
    setTabName('Всі кабінети');
    setBody('');
    
    // Default dates around July 2026
    setDateFrom('10.07.2026');
    setDateTo('25.07.2026');
    
    setShowModal(true);
  };

  const handleEditClick = (alertMsg: NotificationMessage) => {
    setEditingAlert(alertMsg);
    setTitle(alertMsg.title);
    setTabName(alertMsg.tabName);
    setBody(alertMsg.body);
    setDateFrom(alertMsg.dateFrom);
    setDateTo(alertMsg.dateTo);
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    if (editingAlert) {
      // Update
      const updated: NotificationMessage = {
        ...editingAlert,
        title,
        tabName,
        body,
        dateFrom,
        dateTo
      };
      onUpdateNotification(updated);
      alert('Сповіщення успішно відредаговано!');
    } else {
      // Create
      const newId = `NT-${Math.floor(110 + Math.random() * 89)}`;
      const newAlert: NotificationMessage = {
        id: newId,
        title,
        tabName,
        body,
        dateFrom,
        dateTo,
        confirmCount: 0
      };
      onAddNotification(newAlert);
      alert('Нове сповіщення успішно створено та опубліковано!');
    }
    setShowModal(false);
  };

  return (
    <div className="animate-fade-in space-y-5">
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 select-none">
        <div>
          <h1 className="text-xl font-bold text-[#1A1D23] m-0" id="alerts-title">Оповіщення кабінетів</h1>
          <p className="text-xs text-[#6B7280] mt-1 m-0">Адміністрування інформаційних банерів та сповіщень для B2B клієнтів</p>
        </div>

        <button
          type="button"
          onClick={handleCreateNewClick}
          className="bg-[#C8102E] hover:bg-[#A50D24] text-white px-4 py-2 rounded-[6px] text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-sm"
          id="create-new-alert-btn"
        >
          <Plus size={14} />
          Створити нове
        </button>
      </div>

      {/* Admin Table Card */}
      <div className="bg-white border border-[#E3E6EA] rounded-[10px] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[13px]">
            <thead>
              <tr className="bg-[#F4F5F7]/40 select-none">
                <th className="px-4 py-3 text-[11px] font-bold text-[#9AA1AC] uppercase tracking-wider">ІД</th>
                <th className="px-3 py-3 text-[11px] font-bold text-[#9AA1AC] uppercase tracking-wider">Заголовок сповіщення</th>
                <th className="px-3 py-3 text-[11px] font-bold text-[#9AA1AC] uppercase tracking-wider">Цільова Вкладка</th>
                <th className="px-3 py-3 text-[11px] font-bold text-[#9AA1AC] uppercase tracking-wider">Тіло повідомлення</th>
                <th className="px-3 py-3 text-[11px] font-bold text-[#9AA1AC] uppercase tracking-wider">Період показу (з/по)</th>
                <th className="px-3 py-3 text-[11px] font-bold text-[#9AA1AC] uppercase tracking-wider text-center">Підтверджень</th>
                <th className="w-24 px-3 py-3 text-right text-[11px] font-bold text-[#9AA1AC] uppercase tracking-wider">Дії</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3E6EA]">
              {notifications.map((alertMsg) => (
                <tr key={alertMsg.id} className="hover:bg-neutral-50/50 transition-colors">
                  <td className="px-4 py-3.5 font-mono text-xs text-[#6B7280]">{alertMsg.id}</td>
                  <td className="px-3 py-3.5 font-bold text-[#1A1D23] max-w-xs truncate" title={alertMsg.title}>
                    {alertMsg.title}
                  </td>
                  <td className="px-3 py-3.5">
                    <span className="inline-block bg-[#F1F2F4] text-[#6B7280] text-[11px] font-semibold px-2 py-0.5 rounded">
                      {alertMsg.tabName}
                    </span>
                  </td>
                  <td className="px-3 py-3.5 text-xs text-[#6B7280] max-w-sm truncate" title={alertMsg.body}>
                    {alertMsg.body}
                  </td>
                  <td className="px-3 py-3.5">
                    <div className="flex items-center gap-1 text-[#6B7280] text-xs">
                      <Calendar size={12} className="text-[#9AA1AC]" />
                      <span>{alertMsg.dateFrom} – {alertMsg.dateTo}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3.5 text-center">
                    <span className="inline-flex items-center gap-1 font-mono font-bold text-xs bg-[#E6F4EA] text-[#0F9D58] px-2 py-0.5 rounded-full">
                      <CheckSquare size={10} />
                      {alertMsg.confirmCount}
                    </span>
                  </td>
                  <td className="px-3 py-3.5 text-right space-x-1.5 select-none">
                    <button
                      type="button"
                      onClick={() => handleEditClick(alertMsg)}
                      className="text-[#6B7280] hover:text-[#1A1D23] p-1.5 rounded hover:bg-neutral-100 transition-colors inline-block"
                      title="Редагувати сповіщення"
                    >
                      <Edit3 size={13} />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm('Ви впевнені, що хочете видалити це сповіщення?')) {
                          onDeleteNotification(alertMsg.id);
                        }
                      }}
                      className="text-[#9AA1AC] hover:text-[#D2461B] p-1.5 rounded hover:bg-neutral-100 transition-colors inline-block"
                      title="Видалити сповіщення"
                    >
                      <Trash2 size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black/45 flex items-center justify-center z-50 animate-fade-in" id="alert-form-modal">
          <div className="bg-white rounded-[10px] w-full max-w-[500px] overflow-hidden shadow-lg border border-[#E3E6EA]">
            <div className="px-5 py-4 border-b border-[#E3E6EA] flex items-center justify-between select-none bg-white">
              <h3 className="text-sm font-semibold text-[#1A1D23] m-0">
                {editingAlert ? 'Редагувати сповіщення' : 'Створити нове оповіщення'}
              </h3>
              <button 
                type="button" 
                onClick={() => setShowModal(false)}
                className="text-[#9AA1AC] hover:text-[#1A1D23]"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#1A1D23] mb-1.5 select-none">Заголовок сповіщення</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-[6px] border border-[#E3E6EA] bg-white text-[#1A1D23] focus:outline-none focus:border-[#C8102E]"
                  placeholder="напр. Планові роботи у кабінетах"
                />
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-[#1A1D23] mb-1.5 select-none">Цільова Вкладка</label>
                  <select
                    value={tabName}
                    onChange={(e) => setTabName(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-[6px] border border-[#E3E6EA] bg-white text-[#1A1D23] focus:outline-none focus:border-[#C8102E]"
                  >
                    <option value="Всі кабінети">Всі кабінети</option>
                    <option value="Замовлення online">Замовлення online</option>
                    <option value="Повернення">Повернення</option>
                    <option value="Супровідні документи">Супровідні документи</option>
                    <option value="Вхідний контроль">Вхідний контроль</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-[#1A1D23] mb-1.5 select-none">Дата З</label>
                    <input
                      type="text"
                      required
                      value={dateFrom}
                      onChange={(e) => setDateFrom(e.target.value)}
                      className="w-full text-xs px-2 py-2 rounded-[6px] border border-[#E3E6EA] bg-white text-[#1A1D23] focus:outline-none focus:border-[#C8102E] font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1A1D23] mb-1.5 select-none">Дата По</label>
                    <input
                      type="text"
                      required
                      value={dateTo}
                      onChange={(e) => setDateTo(e.target.value)}
                      className="w-full text-xs px-2 py-2 rounded-[6px] border border-[#E3E6EA] bg-white text-[#1A1D23] focus:outline-none focus:border-[#C8102E] font-mono"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1A1D23] mb-1.5 select-none">Текст оповіщення (Тіло)</label>
                <textarea
                  required
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  rows={4}
                  className="w-full text-xs p-3 rounded-[6px] border border-[#E3E6EA] bg-white text-[#1A1D23] focus:outline-none focus:border-[#C8102E] leading-relaxed"
                  placeholder="Введіть повний текст повідомлення, яке відображатиметься як інформаційний банер у кабінетах..."
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#E3E6EA] select-none">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-white border border-[#E3E6EA] text-[#6B7280] hover:text-[#1A1D23] px-4 py-2 rounded-[6px] text-xs font-semibold"
                >
                  Скасувати
                </button>
                <button
                  type="submit"
                  className="bg-[#C8102E] hover:bg-[#A50D24] text-white px-4 py-2 rounded-[6px] text-xs font-semibold transition-colors"
                >
                  {editingAlert ? 'Зберегти зміни' : 'Опублікувати'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
