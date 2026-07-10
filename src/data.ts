import { 
  Order, 
  RefundRequest, 
  SupportDocument, 
  IncomingControlRecord, 
  RecalledProduct, 
  PromoBanner, 
  Survey, 
  NotificationMessage, 
  ChangelogItem 
} from './types';

export const SUBDIVISIONS = [
  'Аптека №1, м.Житомир',
  'Аптека №2, м.Житомир',
  'Аптека №11, м.Новоград-Волинський',
  'Аптека №15, м.Коростень',
  'Аптека №18, Житомирська обл.',
  'Аптека №22, м.Бердичів',
  'Аптека №24, м.Малин',
  'Аптека №30, м.Звягель',
  'Аптека №33, м.Коростишів',
  'Аптека №41, м.Овруч',
  'Аптека №45, м.Радомишль'
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'U142086224',
    subdivision: 'Аптека №11, м.Новоград-Волинський',
    batch: 'LK2406A',
    dateCreated: '09.07.2026',
    dateShipped: '10.07.2026',
    status: 'Відправлено на склад',
    hasWarning: true,
    warningTooltip: 'Потребує перевірки супровідних документів'
  },
  {
    id: 'U142083538',
    subdivision: 'Аптека №2, м.Житомир',
    batch: 'LK2311B',
    dateCreated: '08.07.2026',
    dateShipped: '09.07.2026',
    status: 'Відмовлено',
    hasQuestion: true,
    questionTooltip: 'Уточнити деталі оплати замовлення'
  },
  {
    id: 'U142083535',
    subdivision: 'Аптека №2, м.Житомир',
    batch: 'LK2311B',
    dateCreated: '08.07.2026',
    dateShipped: '09.07.2026',
    status: 'Очікування дозамовлення',
    hasQuestion: true,
    questionTooltip: 'На складі очікується нова партія'
  },
  {
    id: 'U142083533',
    subdivision: 'Аптека №1, м.Житомир',
    batch: 'LK2298A',
    dateCreated: '08.07.2026',
    dateShipped: '09.07.2026',
    status: 'Відправлено на склад'
  },
  {
    id: 'U142083521',
    subdivision: 'Аптека №1, м.Житомир',
    batch: '—',
    dateCreated: '08.07.2026',
    dateShipped: '09.07.2026',
    status: 'Нове'
  },
  {
    id: 'U142083100',
    subdivision: 'Аптека №15, м.Коростень',
    batch: 'LK2401C',
    dateCreated: '07.07.2026',
    dateShipped: '08.07.2026',
    status: 'В дорозі'
  },
  {
    id: 'U142082914',
    subdivision: 'Аптека №18, Житомирська обл.',
    batch: 'LK2402B',
    dateCreated: '06.07.2026',
    dateShipped: '07.07.2026',
    status: 'Відправлено на склад'
  },
  {
    id: 'U142081512',
    subdivision: 'Аптека №22, м.Бердичів',
    batch: '—',
    dateCreated: '05.07.2026',
    dateShipped: '06.07.2026',
    status: 'Скасовано'
  },
  {
    id: 'U142080011',
    subdivision: 'Аптека №24, м.Малин',
    batch: 'LK2399F',
    dateCreated: '04.07.2026',
    dateShipped: '05.07.2026',
    status: 'В дорозі'
  },
  {
    id: 'U142079144',
    subdivision: 'Аптека №30, м.Звягель',
    batch: 'LK2355D',
    dateCreated: '03.07.2026',
    dateShipped: '04.07.2026',
    status: 'Відправлено на склад'
  }
];

export const INITIAL_REFUND_REQUESTS: RefundRequest[] = [
  {
    id: 'R-2026-0041',
    client: 'ДАРІЯФАРМА, ТОВ',
    subdivision: 'Аптека №2, м.Житомир',
    date: '09.07.2026',
    status: 'В процесі',
    productName: 'Парацетамол-Дарниця таб. 500мг №10',
    quantity: 15,
    reason: 'Виявлено пошкодження блістера при транспортуванні',
    invoiceNum: 'РН-0008453'
  },
  {
    id: 'R-2026-0039',
    client: 'ДАРІЯФАРМА, ТОВ',
    subdivision: 'Аптека №11, м.Новоград-Волинський',
    date: '05.07.2026',
    status: 'Підтверджена',
    productName: 'Аспірин Кардіо таб. 100мг №28',
    quantity: 5,
    reason: 'Помилкове подвійне замовлення',
    invoiceNum: 'РН-0008311'
  },
  {
    id: 'R-2026-0032',
    client: 'ДАРІЯФАРМА, ТОВ',
    subdivision: 'Аптека №1, м.Житомир',
    date: '28.06.2026',
    status: 'Відхилена',
    productName: 'Нурофен Форте таб. 400мг №12',
    quantity: 2,
    reason: 'Термін придатності закінчується менш ніж за 3 місяці',
    invoiceNum: 'РН-0007994'
  }
];

export const INITIAL_SUPPORT_DOCUMENTS: SupportDocument[] = [
  {
    id: 'D-00421',
    client: 'ДАРІЯФАРМА, ТОВ',
    type: 'Видаткова накладна',
    productName: 'Травісил Нео льодяники №16',
    batch: 'TR-1192A',
    invoiceNum: 'РН-1420862',
    date: '09.07.2026',
    amount: '12,450.00 грн',
    status: 'Підписано покупцем',
    hasEcp: true
  },
  {
    id: 'D-00422',
    client: 'ДАРІЯФАРМА, ТОВ',
    type: 'Сертифікат якості',
    productName: 'Травісил Нео льодяники №16',
    batch: 'TR-1192A',
    invoiceNum: 'РН-1420862',
    date: '09.07.2026',
    amount: '—',
    status: 'Дійсний',
    hasEcp: false
  },
  {
    id: 'D-00423',
    client: 'ДАРІЯФАРМА, ТОВ',
    type: 'Видаткова накладна',
    productName: 'Амоксицилін таб. 500мг №20',
    batch: 'AMX-0524B',
    invoiceNum: 'РН-1420835',
    date: '08.07.2026',
    amount: '4,120.50 грн',
    status: 'Очікує на підпис',
    hasEcp: false
  },
  {
    id: 'D-00424',
    client: 'ДАРІЯФАРМА, ТОВ',
    type: 'Товарно-транспортна накладна',
    productName: 'Амоксицилін таб. 500мг №20',
    batch: 'AMX-0524B',
    invoiceNum: 'ТТН-992144',
    date: '08.07.2026',
    amount: '—',
    status: 'Підписано ЕЦП',
    hasEcp: true
  },
  {
    id: 'D-00425',
    client: 'ДАРІЯФАРМА, ТОВ',
    type: 'Видаткова накладна',
    productName: 'Ібупрофен супп. 60мг №10',
    batch: 'IBU-9902',
    invoiceNum: 'РН-1420811',
    date: '06.07.2026',
    amount: '8,900.00 грн',
    status: 'Підписано покупцем',
    hasEcp: true
  },
  {
    id: 'D-00426',
    client: 'ДАРІЯФАРМА, ТОВ',
    type: 'Сертифікат якості',
    productName: 'Ібупрофен супп. 60мг №10',
    batch: 'IBU-9902',
    invoiceNum: 'РН-1420811',
    date: '06.07.2026',
    amount: '—',
    status: 'Дійсний',
    hasEcp: false
  },
  {
    id: 'D-00427',
    client: 'ДАРІЯФАРМА, ТОВ',
    type: 'Видаткова накладна',
    productName: 'Лоперамід капс. 2мг №20',
    batch: 'LOP-145D',
    invoiceNum: 'РН-1420790',
    date: '03.07.2026',
    amount: '1,560.80 грн',
    status: 'Архів',
    hasEcp: true
  }
];

export const INITIAL_INCOMING_CONTROL: IncomingControlRecord[] = [
  {
    id: 'IC-99211',
    client: 'ДАРІЯФАРМА, ТОВ',
    subdivision: 'Аптека №1, м.Житомир',
    date: '09.07.2026',
    invoiceNum: 'РН-1420862',
    productName: 'Травісил Нео льодяники №16',
    batch: 'TR-1192A',
    manufacturer: 'Пле Тхіко Фарма Лтд',
    controlStatus: 'Дозволено',
    conclusionNum: 'Висновок №99214'
  },
  {
    id: 'IC-99212',
    client: 'ДАРІЯФАРМА, ТОВ',
    subdivision: 'Аптека №2, м.Житомир',
    date: '08.07.2026',
    invoiceNum: 'РН-1420835',
    productName: 'Амоксицилін таб. 500мг №20',
    batch: 'AMX-0524B',
    manufacturer: 'ПАТ «Київмедпрепарат»',
    controlStatus: 'Дозволено',
    conclusionNum: 'Висновок №99215'
  },
  {
    id: 'IC-99213',
    client: 'ДАРІЯФАРМА, ТОВ',
    subdivision: 'Аптека №11, м.Новоград-Волинський',
    date: '07.07.2026',
    invoiceNum: 'РН-1420811',
    productName: 'Ібупрофен супп. 60мг №10',
    batch: 'IBU-9902',
    manufacturer: 'Софарма АТ',
    controlStatus: 'Дозволено',
    conclusionNum: 'Висновок №99190'
  },
  {
    id: 'IC-99214',
    client: 'ДАРІЯФАРМА, ТОВ',
    subdivision: 'Аптека №15, м.Коростень',
    date: '06.07.2026',
    invoiceNum: 'РН-1420790',
    productName: 'Лоперамід капс. 2мг №20',
    batch: 'LOP-145D',
    manufacturer: 'ТОВ «Здоров\'я»',
    controlStatus: 'Тимчасово заборонено',
    conclusionNum: 'Припис Держлікслужби №224-А'
  },
  {
    id: 'IC-99215',
    client: 'ДАРІЯФАРМА, ТОВ',
    subdivision: 'Аптека №18, Житомирська обл.',
    date: '05.07.2026',
    invoiceNum: 'РН-1420788',
    productName: 'Корвалол краплі 25мл',
    batch: 'KV-112B',
    manufacturer: 'АТ «Фармак»',
    controlStatus: 'Дозволено',
    conclusionNum: 'Висновок №98871'
  }
];

export const INITIAL_RECALLED_PRODUCTS: RecalledProduct[] = [
  {
    id: 'RCL-001',
    name: 'Валідол таб. 60мг №10',
    batch: 'VL-4001',
    expiry: '12.2028',
    code: '12411',
    manufacturer: 'АТ «Фармак», Україна',
    validTill: '01.09.2026',
    startDate: '12.06.2026',
    endDate: '01.09.2026'
  },
  {
    id: 'RCL-002',
    name: 'Аскорбінова кислота таб. 500мг №10',
    batch: 'AK-2023',
    expiry: '10.2027',
    code: '33100',
    manufacturer: 'АТ «Київський вітамінний завод», Україна',
    validTill: '15.08.2026',
    startDate: '10.05.2026',
    endDate: '15.08.2026'
  },
  {
    id: 'RCL-003',
    name: 'Ацетилсаліцилова кислота таб. 500мг №10',
    batch: 'ASP-144',
    expiry: '05.2028',
    code: '00291',
    manufacturer: 'ТОВ «Астрафарм», Україна',
    validTill: '20.07.2026',
    startDate: '14.04.2026',
    endDate: '20.07.2026'
  }
];

export const INITIAL_PROMO_BANNERS: PromoBanner[] = [
  {
    id: 'PRM-001',
    title: 'Акція: Сезонна пропозиція Травісил Нео',
    description: 'Замовляйте від 20 упаковок льодяників Травісил Нео та отримуйте знижку 15% на всю партію до кінця місяця. Пропозиція діє для всіх підрозділів.',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop&q=60',
    badge: 'Знижка 15%',
    validUntil: '31.07.2026'
  },
  {
    id: 'PRM-002',
    title: 'Збільшений кешбек на серію дитячих вітамінів',
    description: 'Отримуйте додатково +3.5% бонусів при оптовій закупці продукції бренду KidVit. Бонуси автоматично зараховуються на партнерський рахунок договору.',
    imageUrl: 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=400&auto=format&fit=crop&q=60',
    badge: '+3.5% Бонусів',
    validUntil: '15.08.2026'
  },
  {
    id: 'PRM-003',
    title: 'Безкоштовна експрес-доставка для нових аптек',
    description: 'Для всіх нещодавно активованих точок діє спеціальний тариф — 0 грн за термінову доставку замовлень вагою до 15 кг.',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&auto=format&fit=crop&q=60',
    badge: '0 грн Доставка',
    validUntil: '01.09.2026'
  },
  {
    id: 'PRM-004',
    title: 'Закупівля антибіотиків за вигідними умовами',
    description: 'Пріоритетні відвантаження на антибіотики широкого спектру від провідних українських та іноземних виробників з гнучким відтермінуванням платежу.',
    imageUrl: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=400&auto=format&fit=crop&q=60',
    badge: 'Відтермінування 45 днів',
    validUntil: '31.08.2026'
  }
];

export const INITIAL_SURVEYS: Survey[] = [
  {
    id: 'SRV-001',
    title: 'Оцінка якості та швидкості доставки за липень 2026',
    description: 'Будь ласка, залиште ваш відгук щодо якості пакування, температурного режиму під час транспортування та ввічливості водіїв-експедиторів.'
  },
  {
    id: 'SRV-002',
    title: 'Зручність використання оновленого інтерфейсу ЛК',
    description: 'Ми оновили розділи документів та взаємодії. Оцініть, будь ласка, наскільки швидше тепер вдається знаходити вхідний контроль та сертифікати.'
  },
  {
    id: 'SRV-003',
    title: 'Задоволеність процесом повернення товарів',
    description: 'Поділіться досвідом взаємодії з відділом претензій та швидкістю обробки ваших заявок на повернення.'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationMessage[] = [
  {
    id: 'NT-101',
    title: 'Важливе технічне обслуговування сервера БаДМ',
    tabName: 'Всі кабінети',
    body: 'Повідомляємо, що 14 липня з 02:00 до 05:00 будуть проводитися планові профілактичні роботи. Доступ до кабінету буде тимчасово обмежений.',
    dateFrom: '10.07.2026',
    dateTo: '14.07.2026',
    confirmCount: 42
  },
  {
    id: 'NT-102',
    title: 'Обов\'язкова заміна ключів ЕЦП до кінця місяця',
    tabName: 'Супровідні документи',
    body: 'Нагадуємо про необхідність завантажити нові діючі сертифікати електронного підпису для безперебійного підтвердження накладних в системі.',
    dateFrom: '01.07.2026',
    dateTo: '31.07.2026',
    confirmCount: 189
  },
  {
    id: 'NT-103',
    title: 'Зміна порядку подачі претензій щодо якості',
    tabName: 'Повернення',
    body: 'Відтепер фотофіксація пошкодженої упаковки є обов\'язковою для розгляду заявки на повернення. Файли можна прикріпити прямо в інтерфейсі.',
    dateFrom: '05.07.2026',
    dateTo: '20.07.2026',
    confirmCount: 74
  }
];

export const INITIAL_CHANGELOG: ChangelogItem[] = [
  {
    id: 'CHG-04',
    version: 'v4.2.0',
    date: '10.07.2026',
    changes: [
      'Додано повнофункціональний пошук супровідних документів та вхідного контролю.',
      'Розроблено розділ відкликаних товарів з можливістю перегляду статусу.',
      'Створено інтерактивні опитування клієнтів та форми детального зворотного зв\'язку.',
      'Реалізовано систему Telegram-бот двофакторної автентифікації для зміни паролю.',
      'Впроваджено модуль адміністрування сповіщень та перегляду плану чергових оновлень.'
    ]
  },
  {
    id: 'CHG-03',
    version: 'v4.1.0',
    date: '28.06.2026',
    changes: [
      'Оновлено дизайн-систему: додано семантичні статуси із підтримкою для людей з вадами зору.',
      'Покращено механізм фільтрації замовлень та оптимізовано роботу з 11 підрозділами.',
      'Реалізовано інтерфейс заявок на повернення з інформаційним модальним вікном правил.'
    ]
  },
  {
    id: 'CHG-02',
    version: 'v4.0.0',
    date: '15.05.2026',
    changes: [
      'Початковий реліз оновленого кабінету B2B самообслуговування клієнтів.',
      'Інтеграція головного дашборду зі зведеною статистикою та останніми замовленнями.',
      'Додано перелік інструкцій та загальний профіль користувача.'
    ]
  }
];
