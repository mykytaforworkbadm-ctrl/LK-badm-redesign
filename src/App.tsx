import React, { useState } from 'react';
import { ActiveView, Order, RefundRequest, NotificationMessage } from './types';
import { 
  INITIAL_ORDERS, 
  INITIAL_REFUND_REQUESTS, 
  INITIAL_NOTIFICATIONS, 
  SUBDIVISIONS 
} from './data';

// Subcomponents imports
import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';
import DashboardView from './components/DashboardView';
import OrdersView from './components/OrdersView';
import RefundView from './components/RefundView';
import DocumentsView from './components/DocumentsView';
import IncomingControlView from './components/IncomingControlView';
import RecalledView from './components/RecalledView';
import PromosView from './components/PromosView';
import SurveysView from './components/SurveysView';
import FeedbackView from './components/FeedbackView';
import InstructionsView from './components/InstructionsView';
import ProfileView from './components/ProfileView';
import AdminAlertsView from './components/AdminAlertsView';
import AdminUpdatesView from './components/AdminUpdatesView';

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const [lang, setLang] = useState<'UKR' | 'RUS'>('UKR');
  const [isAdminVisible, setIsAdminVisible] = useState(true);

  // Master States
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [refundRequests, setRefundRequests] = useState<RefundRequest[]>(INITIAL_REFUND_REQUESTS);
  const [notifications, setNotifications] = useState<NotificationMessage[]>(INITIAL_NOTIFICATIONS);

  // Handlers for Orders
  const handleAddOrder = (newOrder: Order) => {
    setOrders([newOrder, ...orders]);
  };

  // Handlers for Refunds
  const handleAddRefund = (newRefund: RefundRequest) => {
    setRefundRequests([newRefund, ...refundRequests]);
  };

  // Handlers for Notifications (Admin)
  const handleAddNotification = (newAlert: NotificationMessage) => {
    setNotifications([newAlert, ...notifications]);
  };

  const handleUpdateNotification = (updated: NotificationMessage) => {
    setNotifications(notifications.map(n => n.id === updated.id ? updated : n));
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  // View router renderer
  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <DashboardView 
            orders={orders} 
            onNavigateToOrders={() => setActiveView('orders')}
            refundsCount={refundRequests.filter(r => r.status === 'В процесі' || r.status === 'Нова').length}
          />
        );
      case 'orders':
        return (
          <OrdersView 
            orders={orders} 
            onAddOrder={handleAddOrder}
          />
        );
      case 'refund':
        return (
          <RefundView 
            refundRequests={refundRequests} 
            onAddRefund={handleAddRefund}
          />
        );
      case 'documents':
        return <DocumentsView />;
      case 'control':
        return <IncomingControlView />;
      case 'recalled':
        return <RecalledView />;
      case 'promos':
        return <PromosView />;
      case 'surveys':
        return <SurveysView />;
      case 'feedback':
        return <FeedbackView />;
      case 'instructions':
        return <InstructionsView />;
      case 'profile':
        return <ProfileView />;
      case 'alerts':
        return (
          <AdminAlertsView 
            notifications={notifications}
            onAddNotification={handleAddNotification}
            onUpdateNotification={handleUpdateNotification}
            onDeleteNotification={handleDeleteNotification}
          />
        );
      case 'updates':
        return <AdminUpdatesView />;
      default:
        return (
          <div className="p-8 text-center text-[#9AA1AC]">
            Розділ знаходиться у процесі розробки.
          </div>
        );
    }
  };

  return (
    <div className="app flex flex-col h-screen overflow-hidden bg-[#F4F5F7]">
      {/* Top Banner Bar */}
      <Topbar 
        currentLang={lang} 
        onLangChange={(l) => setLang(l)} 
        subdivisionsCount={SUBDIVISIONS.length}
      />

      {/* Main Workspace */}
      <div className="body flex flex-1 overflow-hidden">
        {/* Navigation Sidebar */}
        <Sidebar 
          activeView={activeView} 
          onViewChange={(v) => setActiveView(v)} 
          isAdminVisible={isAdminVisible}
        />

        {/* Content Viewer viewport */}
        <main className="content flex-1 overflow-y-auto p-6 md:p-8">
          {renderActiveView()}
          
          {/* Quick simulation bar on bottom to toggle admin visibility as specified in prompt */}
          <div className="mt-12 pt-4 border-t border-[#E3E6EA]/60 flex items-center justify-between text-xs text-[#9AA1AC] select-none">
            <div>
              Текуча мова: <span className="font-semibold text-[#1A1D23]">{lang === 'UKR' ? 'Українська' : 'Російська'}</span>
            </div>
            
            <label className="flex items-center gap-1.5 cursor-pointer hover:text-[#1A1D23] transition-colors">
              <input
                type="checkbox"
                checked={isAdminVisible}
                onChange={(e) => {
                  setIsAdminVisible(e.target.checked);
                  // fallback navigation if we hide admin while inside admin view
                  if (!e.target.checked && (activeView === 'alerts' || activeView === 'updates')) {
                    setActiveView('dashboard');
                  }
                }}
                className="accent-[#C8102E] w-3 h-3"
                id="toggle-admin-sections"
              />
              <span>Показати розділ "🔒 Адміністрування"</span>
            </label>
          </div>
        </main>
      </div>
    </div>
  );
}
