import React, { useState, useMemo } from 'react';
import { Order } from '../types';
import { SUBDIVISIONS } from '../data';
import { Search, Plus, Sliders, AlertTriangle, HelpCircle, ChevronLeft, ChevronRight, X, Eye } from 'lucide-react';

interface OrdersViewProps {
  orders: Order[];
  onAddOrder: (newOrder: Order) => void;
}

export default function OrdersView({ orders, onAddOrder }: OrdersViewProps) {
  // Filters
  const [onlyActive, setOnlyActive] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>('Усі статуси');
  const [selectedSubdivision, setSelectedSubdivision] = useState<string>('Усі підрозділи');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Selection
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  
  // Create New Order Modal
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newOrderSubdivision, setNewOrderSubdivision] = useState(SUBDIVISIONS[0]);
  const [newOrderBatch, setNewOrderBatch] = useState('LK2407A');
  const [newOrderStatus, setNewOrderStatus] = useState<Order['status']>('Нове');
  
  // Column configuration popover state
  const [showColSettings, setShowColSettings] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({
    batch: true,
    created: true,
    shipped: true,
    status: true
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter logic
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      // "Тільки активні" logic: Active orders are anything that is not "Скасовано" or "Відмовлено"
      if (onlyActive && (order.status === 'Скасовано' || order.status === 'Відмовлено')) {
        return false;
      }
      
      // Status filter
      if (selectedStatus !== 'Усі статуси' && order.status !== selectedStatus) {
        return false;
      }

      // Subdivision filter
      if (selectedSubdivision !== 'Усі підрозділи' && !order.subdivision.includes(selectedSubdivision)) {
        return false;
      }

      // Search query (number or batch)
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesId = order.id.toLowerCase().includes(query);
        const matchesBatch = order.batch.toLowerCase().includes(query);
        const matchesSub = order.subdivision.toLowerCase().includes(query);
        if (!matchesId && !matchesBatch && !matchesSub) {
          return false;
        }
      }

      return true;
    });
  }, [orders, onlyActive, selectedStatus, selectedSubdivision, searchQuery]);

  // Pagination bounds
  const totalItems = filteredOrders.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredOrders.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredOrders, currentPage]);

  const startRange = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endRange = Math.min(currentPage * itemsPerPage, totalItems);

  // Status helper options
  const statusOptions = ['Усі статуси', 'Нове', 'Відправлено на склад', 'Очікування дозамовлення', 'В дорозі', 'Відмовлено', 'Скасовано'];

  // Handle select-all
  const isAllSelected = paginatedOrders.length > 0 && paginatedOrders.every(o => selectedIds.has(o.id));
  const toggleSelectAll = () => {
    const nextSelected = new Set(selectedIds);
    if (isAllSelected) {
      paginatedOrders.forEach(o => nextSelected.delete(o.id));
    } else {
      paginatedOrders.forEach(o => nextSelected.add(o.id));
    }
    setSelectedIds(nextSelected);
  };

  const toggleSelectOne = (id: string) => {
    const nextSelected = new Set(selectedIds);
    if (nextSelected.has(id)) {
      nextSelected.delete(id);
    } else {
      nextSelected.add(id);
    }
    setSelectedIds(nextSelected);
  };

  // Bulk actions simulator
  const handleBulkCancel = () => {
    alert(`Імітація скасування для вибраних замовлень: ${Array.from(selectedIds).join(', ')}`);
    setSelectedIds(new Set());
  };

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `U1420${Math.floor(80000 + Math.random() * 19999)}`;
    const todayStr = new Date().toLocaleDateString('uk-UA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).replace(/\//g, '.'); // Convert from MM/DD/YYYY if applicable

    const newOrder: Order = {
      id: newId,
      subdivision: newOrderSubdivision,
      batch: newOrderBatch || '—',
      dateCreated: todayStr,
      dateShipped: 'Очікується',
      status: newOrderStatus,
      hasWarning: Math.random() > 0.7,
      warningTooltip: 'Потребує додаткового узгодження партій'
    };

    onAddOrder(newOrder);
    setShowCreateModal(false);
    // Reset state
    setNewOrderBatch('LK2407A');
    setNewOrderStatus('Нове');
  };

  // Status chip renderer matching design
  const renderStatusChip = (status: Order['status']) => {
    switch (status) {
      case 'Відправлено на склад':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold bg-[#E6F4EA] text-[#0F9D58]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0F9D58]" />
            Відправлено на склад
          </span>
        );
      case 'Відмовлено':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-[#FCE8E0] text-[#D2461B]">
            ✕ Відмовлено
          </span>
        );
      case 'Очікування дозамовлення':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold bg-[#FDF3E1] text-[#8A5A0F]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8A5A0F]" />
            Очікування дозамовлення
          </span>
        );
      case 'Нове':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold bg-[#F1F2F4] text-[#6B7280]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6B7280]" />
            Нове
          </span>
        );
      case 'В дорозі':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold bg-[#EBF8FF] text-[#2B6CB0]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2B6CB0]" />
            В дорозі
          </span>
        );
      case 'Скасовано':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold bg-[#F1F2F4] text-[#A0AEC0]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A0AEC0]" />
            Скасовано
          </span>
        );
    }
  };

  return (
    <div className="animate-fade-in space-y-5">
      {/* Page Title Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="text-xl font-bold text-[#1A1D23] m-0" id="orders-title">Список замовлень</h1>
          <p className="text-xs text-[#6B7280] mt-1 m-0">
            {orders.length} замовлень · {orders.length * 2} позицій · 324,934.14 без ПДВ (зведені дані ЛК)
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowCreateModal(true)}
          className="bg-[#C8102E] hover:bg-[#A50D24] text-white px-4 py-2 rounded-[6px] text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-sm"
          id="create-new-order-btn"
        >
          <Plus size={14} />
          Створити нове
        </button>
      </div>

      {/* Filter and Toolbar Panel */}
      <div className="bg-white border border-[#E3E6EA] rounded-[10px] p-3.5 space-y-3.5 select-none shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Real Search bar */}
            <div className="relative w-48">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 text-[#9AA1AC]">
                <Search size={14} />
              </span>
              <input
                type="text"
                placeholder="Пошук (номер, серія)..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full text-xs pl-8 pr-2.5 py-1.5 rounded-[6px] border border-[#E3E6EA] focus:outline-none focus:border-[#C8102E] bg-white text-[#1A1D23]"
                aria-label="Пошук замовлень"
                id="search-orders-input"
              />
            </div>

            {/* subdivision select */}
            <select
              value={selectedSubdivision}
              onChange={(e) => {
                setSelectedSubdivision(e.target.value);
                setCurrentPage(1);
              }}
              className="px-2.5 py-1.5 text-xs rounded-[6px] border border-[#E3E6EA] bg-white text-[#6B7280] hover:text-[#1A1D23] focus:outline-none focus:border-[#C8102E] cursor-pointer max-w-[200px]"
              aria-label="Фільтр за підрозділом"
              id="filter-orders-subdivision"
            >
              <option value="Усі підрозділи">Всі підрозділи (11)</option>
              {SUBDIVISIONS.map((sub, idx) => (
                <option key={idx} value={sub}>{sub}</option>
              ))}
            </select>

            {/* status select */}
            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="px-2.5 py-1.5 text-xs rounded-[6px] border border-[#E3E6EA] bg-white text-[#6B7280] hover:text-[#1A1D23] focus:outline-none focus:border-[#C8102E] cursor-pointer"
              aria-label="Фільтр за статусом"
              id="filter-orders-status"
            >
              {statusOptions.map((status, idx) => (
                <option key={idx} value={status}>{status}</option>
              ))}
            </select>

            {/* active only toggle */}
            <label className="flex items-center gap-1.5 text-xs text-[#6B7280] cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyActive}
                onChange={(e) => {
                  setOnlyActive(e.target.checked);
                  setCurrentPage(1);
                }}
                className="accent-[#C8102E]"
                id="filter-orders-active-checkbox"
              />
              <span>Тільки активні</span>
            </label>
          </div>

          <div className="relative">
            {/* Column Config Trigger Gear */}
            <button
              type="button"
              onClick={() => setShowColSettings(!showColSettings)}
              className={`w-8 h-8 rounded-[6px] border border-[#E3E6EA] bg-white flex items-center justify-center text-[#6B7280] hover:text-[#1A1D23] focus:outline-none transition-colors ${showColSettings ? 'border-[#C8102E] text-[#C8102E]' : ''}`}
              title="Налаштування відображення колонок"
              aria-label="Налаштування колонок"
              id="columns-config-btn"
            >
              <Sliders size={14} />
            </button>

            {/* Column Config Dropdown popup */}
            {showColSettings && (
              <div className="absolute right-0 mt-1.5 w-52 bg-white border border-[#E3E6EA] rounded-[10px] p-3 shadow-lg z-20 text-xs text-[#6B7280]" id="columns-config-dropdown">
                <div className="font-semibold text-[#1A1D23] mb-2 border-b border-[#E3E6EA] pb-1.5 flex justify-between items-center">
                  <span>Показати колонки</span>
                  <button 
                    onClick={() => setShowColSettings(false)} 
                    className="text-xs text-[#9AA1AC] hover:text-[#1A1D23]"
                    id="close-col-config-btn"
                  >
                    ✕
                  </button>
                </div>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={visibleColumns.batch}
                      onChange={(e) => setVisibleColumns({ ...visibleColumns, batch: e.target.checked })}
                      className="accent-[#C8102E]"
                    />
                    <span>Серія (Батч)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={visibleColumns.created}
                      onChange={(e) => setVisibleColumns({ ...visibleColumns, created: e.target.checked })}
                      className="accent-[#C8102E]"
                    />
                    <span>Дата створення</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={visibleColumns.shipped}
                      onChange={(e) => setVisibleColumns({ ...visibleColumns, shipped: e.target.checked })}
                      className="accent-[#C8102E]"
                    />
                    <span>Дата відвантаження</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={visibleColumns.status}
                      onChange={(e) => setVisibleColumns({ ...visibleColumns, status: e.target.checked })}
                      className="accent-[#C8102E]"
                    />
                    <span>Стан замовлення</span>
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Selected actions strip */}
        {selectedIds.size > 0 && (
          <div className="flex items-center justify-between bg-[#FDECEE] text-xs text-[#C8102E] p-2.5 rounded-[6px] border border-[#C8102E]/20" id="selected-actions-panel">
            <div className="font-medium">
              Виділено: <span className="font-bold">{selectedIds.size}</span> замовлень
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleBulkCancel}
                className="bg-white hover:bg-neutral-50 text-[#C8102E] font-semibold border border-[#C8102E] px-3 py-1 rounded-[4px] transition"
                id="bulk-cancel-btn"
              >
                Скасувати замовлення
              </button>
              <button
                type="button"
                onClick={() => {
                  alert(`Завантажено документи для ${selectedIds.size} замовлень`);
                  setSelectedIds(new Set());
                }}
                className="bg-[#C8102E] hover:bg-[#A50D24] text-white font-semibold px-3 py-1 rounded-[4px] transition"
                id="bulk-download-btn"
              >
                Завантажити ТТН/Накладні
              </button>
              <button
                type="button"
                onClick={() => setSelectedIds(new Set())}
                className="text-[#6B7280] hover:text-[#1A1D23] font-medium px-1.5 py-1"
                id="bulk-clear-selection-btn"
              >
                Скасувати вибір
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Table Card */}
      <div className="bg-white border border-[#E3E6EA] rounded-[10px] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[13px]">
            <thead>
              <tr className="bg-[#F4F5F7]/40 select-none">
                <th className="w-10 p-3.5 text-center">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={toggleSelectAll}
                    aria-label="Вибрати всі замовлення на сторінці"
                    className="accent-[#C8102E] cursor-pointer"
                    id="orders-header-select-all"
                  />
                </th>
                <th className="w-9 px-1 py-2.5 text-center text-[11px] font-bold text-[#9AA1AC] uppercase tracking-wider">Мітки</th>
                <th className="px-3 py-2.5 text-[11px] font-bold text-[#9AA1AC] uppercase tracking-wider">Номер</th>
                <th className="px-3 py-2.5 text-[11px] font-bold text-[#9AA1AC] uppercase tracking-wider">Підрозділ аптеки</th>
                {visibleColumns.batch && <th className="px-3 py-2.5 text-[11px] font-bold text-[#9AA1AC] uppercase tracking-wider">Серія</th>}
                {visibleColumns.created && <th className="px-3 py-2.5 text-[11px] font-bold text-[#9AA1AC] uppercase tracking-wider">Дата створення</th>}
                {visibleColumns.shipped && <th className="px-3 py-2.5 text-[11px] font-bold text-[#9AA1AC] uppercase tracking-wider">Дата відвантаж.</th>}
                {visibleColumns.status && <th className="px-3 py-2.5 text-[11px] font-bold text-[#9AA1AC] uppercase tracking-wider">Стан</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3E6EA]">
              {paginatedOrders.length > 0 ? (
                paginatedOrders.map((order) => (
                  <tr 
                    key={order.id} 
                    className={`hover:bg-neutral-50/50 transition-colors ${selectedIds.has(order.id) ? 'bg-[#FDECEE]/10' : ''}`}
                  >
                    <td className="p-3 text-center">
                      <input
                        type="checkbox"
                        checked={selectedIds.has(order.id)}
                        onChange={() => toggleSelectOne(order.id)}
                        aria-label={`Вибрати замовлення ${order.id}`}
                        className="accent-[#C8102E] cursor-pointer"
                      />
                    </td>
                    <td className="px-1 py-3 text-center">
                      {order.hasWarning && (
                        <span 
                          className="text-[#B7791F] cursor-help inline-block text-center" 
                          title={order.warningTooltip || 'Увага щодо замовлення'}
                        >
                          ⚠️
                        </span>
                      )}
                      {order.hasQuestion && !order.hasWarning && (
                        <span 
                          className="text-[#3182CE] font-bold cursor-help inline-block text-center" 
                          title={order.questionTooltip || 'Потребує додаткового уточнення'}
                        >
                          ❓
                        </span>
                      )}
                      {!order.hasWarning && !order.hasQuestion && <span className="text-[#9AA1AC]">—</span>}
                    </td>
                    <td className="px-3 py-3 font-mono font-medium text-[#1A1D23]">{order.id}</td>
                    <td className="px-3 py-3 text-[#6B7280]">{order.subdivision}</td>
                    {visibleColumns.batch && <td className="px-3 py-3 font-mono text-[#6B7280]">{order.batch}</td>}
                    {visibleColumns.created && <td className="px-3 py-3 text-[#6B7280]">{order.dateCreated}</td>}
                    {visibleColumns.shipped && <td className="px-3 py-3 text-[#6B7280]">{order.dateShipped}</td>}
                    {visibleColumns.status && <td className="px-3 py-3">{renderStatusChip(order.status)}</td>}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="p-12 text-center text-[#9AA1AC] text-sm font-medium">
                    За вказаними фільтрами замовлень не знайдено.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Paginate Footer */}
        {totalItems > 0 && (
          <div className="px-5 py-3.5 border-t border-[#E3E6EA] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6B7280] select-none">
            <div>
              Показано <span className="font-semibold text-[#1A1D23]">{startRange}–{endRange}</span> з <span className="font-semibold text-[#1A1D23]">{totalItems}</span> замовлень
            </div>
            
            <div className="flex gap-1 items-center">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className="w-7 h-7 border border-[#E3E6EA] bg-white rounded-[5px] flex items-center justify-center text-[#6B7280] hover:bg-[#F4F5F7] disabled:opacity-50 disabled:hover:bg-white transition cursor-pointer"
                aria-label="Попередня сторінка"
                id="orders-prev-page"
              >
                <ChevronLeft size={13} />
              </button>

              {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-7 h-7 rounded-[5px] text-center text-xs font-semibold border transition cursor-pointer ${
                    currentPage === pageNum 
                      ? 'bg-[#C8102E] border-[#C8102E] text-white font-bold' 
                      : 'border-[#E3E6EA] bg-white text-[#6B7280] hover:bg-[#F4F5F7]'
                  }`}
                  aria-current={currentPage === pageNum ? 'page' : undefined}
                >
                  {pageNum}
                </button>
              ))}

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className="w-7 h-7 border border-[#E3E6EA] bg-white rounded-[5px] flex items-center justify-center text-[#6B7280] hover:bg-[#F4F5F7] disabled:opacity-50 disabled:hover:bg-white transition cursor-pointer"
                aria-label="Наступна сторінка"
                id="orders-next-page"
              >
                <ChevronRight size={13} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* "+ Створити нове" Order Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/45 flex items-center justify-center z-50 animate-fade-in" id="create-order-modal">
          <div className="bg-white rounded-[10px] w-full max-w-[480px] overflow-hidden shadow-lg border border-[#E3E6EA]">
            <div className="px-5 py-4 border-b border-[#E3E6EA] bg-white flex items-center justify-between select-none">
              <h3 className="text-sm font-semibold text-[#1A1D23] m-0">Створити нове експрес-замовлення</h3>
              <button 
                type="button" 
                onClick={() => setShowCreateModal(false)}
                className="text-[#9AA1AC] hover:text-[#1A1D23]"
                id="create-order-close-btn"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleCreateOrder} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#1A1D23] mb-1.5">
                  Виберіть підрозділ аптеки
                </label>
                <select
                  value={newOrderSubdivision}
                  onChange={(e) => setNewOrderSubdivision(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-[6px] border border-[#E3E6EA] bg-white text-[#1A1D23] focus:outline-none focus:border-[#C8102E]"
                >
                  {SUBDIVISIONS.map((sub, idx) => (
                    <option key={idx} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-[#1A1D23] mb-1.5">
                    Серія товару (Батч)
                  </label>
                  <input
                    type="text"
                    required
                    value={newOrderBatch}
                    onChange={(e) => setNewOrderBatch(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-[6px] border border-[#E3E6EA] bg-white text-[#1A1D23] focus:outline-none focus:border-[#C8102E]"
                    placeholder="напр. LK2407A"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1A1D23] mb-1.5">
                    Початковий статус
                  </label>
                  <select
                    value={newOrderStatus}
                    onChange={(e) => setNewOrderStatus(e.target.value as Order['status'])}
                    className="w-full text-xs px-3 py-2 rounded-[6px] border border-[#E3E6EA] bg-white text-[#1A1D23] focus:outline-none focus:border-[#C8102E]"
                  >
                    <option value="Нове">Нове</option>
                    <option value="Відправлено на склад">Відправлено на склад</option>
                    <option value="Очікування дозамовлення">Очікування дозамовлення</option>
                  </select>
                </div>
              </div>

              <div className="bg-[#F1F2F4] p-3 rounded-[6px] text-xs text-[#6B7280] leading-relaxed select-none">
                <span className="font-semibold text-[#1A1D23]">Зверніть увагу:</span> Замовлення створюється у режимі імітації реального часу. Номер генерується системою автоматично відповідно до шаблонів БаДМ.
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#E3E6EA] select-none">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="bg-white border border-[#E3E6EA] text-[#6B7280] hover:text-[#1A1D23] px-4 py-2 rounded-[6px] text-xs font-semibold transition-colors"
                >
                  Скасувати
                </button>
                <button
                  type="submit"
                  className="bg-[#C8102E] hover:bg-[#A50D24] text-white px-4 py-2 rounded-[6px] text-xs font-semibold transition-colors"
                  id="create-order-submit-btn"
                >
                  Створити замовлення
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
