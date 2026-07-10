export interface Order {
  id: string;
  subdivision: string;
  batch: string;
  dateCreated: string;
  dateShipped: string;
  status: 'Нове' | 'Відправлено на склад' | 'Очікування дозамовлення' | 'В дорозі' | 'Відмовлено' | 'Скасовано';
  hasWarning?: boolean;
  warningTooltip?: string;
  hasQuestion?: boolean;
  questionTooltip?: string;
}

export interface RefundRequest {
  id: string;
  client: string;
  subdivision: string;
  date: string;
  status: 'Нова' | 'В процесі' | 'Підтверджена' | 'Відхилена';
  productName: string;
  quantity: number;
  reason: string;
  invoiceNum: string;
}

export interface SupportDocument {
  id: string;
  client: string;
  type: string;
  productName: string;
  batch: string;
  invoiceNum: string;
  date: string;
  amount: string;
  status: string;
  hasEcp: boolean; // Електронний цифровий підпис (ЕЦП)
}

export interface IncomingControlRecord {
  id: string;
  client: string;
  subdivision: string;
  date: string;
  invoiceNum: string;
  productName: string;
  batch: string;
  manufacturer: string;
  controlStatus: 'Дозволено' | 'Тимчасово заборонено' | 'Заборонено';
  conclusionNum: string;
}

export interface RecalledProduct {
  id: string;
  name: string;
  batch: string;
  expiry: string;
  code: string;
  manufacturer: string;
  validTill: string;
  startDate: string;
  endDate: string;
}

export interface PromoBanner {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  badge?: string;
  validUntil?: string;
}

export interface Survey {
  id: string;
  title: string;
  description: string;
  isExpanded?: boolean;
  rating?: number;
  feedbackText?: string;
  isSubmitted?: boolean;
}

export interface NotificationMessage {
  id: string;
  title: string;
  tabName: string;
  body: string;
  dateFrom: string;
  dateTo: string;
  confirmCount: number;
}

export interface ChangelogItem {
  id: string;
  version: string;
  date: string;
  changes: string[];
}

export type ActiveView =
  | 'dashboard'
  | 'orders'
  | 'refund'
  | 'documents'
  | 'control'
  | 'recalled'
  | 'promos'
  | 'surveys'
  | 'feedback'
  | 'instructions'
  | 'profile'
  | 'alerts'
  | 'updates';
