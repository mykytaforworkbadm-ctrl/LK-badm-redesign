import React, { useState, useRef } from 'react';
import { Mail, Landmark, ShieldCheck, UploadCloud, File, Trash, Send } from 'lucide-react';

export default function FeedbackView() {
  const [activeTab, setActiveTab] = useState<'claims' | 'manager' | 'admin'>('claims');

  // Form Fields
  const [client, setClient] = useState('ДАРІЯФАРМА, ТОВ (код 31121)');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [name, setName] = useState('Микита');
  const [email, setEmail] = useState('mykytaforworkbadm@gmail.com');
  
  // File upload state simulation
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Success state simulation
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Tab definitions
  const tabs = [
    { id: 'claims', label: 'З відділом претензій та повернень', icon: <RotateCcwIcon /> },
    { id: 'manager', label: 'З менеджером', icon: <Landmark size={14} /> },
    { id: 'admin', label: 'З адміністратором', icon: <ShieldCheck size={14} /> }
  ];

  // Drag and Drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const filesArray = Array.from(e.dataTransfer.files);
      setUploadedFiles((prev) => [...prev, ...filesArray]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const filesArray = Array.from(e.target.files);
      setUploadedFiles((prev) => [...prev, ...filesArray]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      // Clean up fields
      setSubject('');
      setMessage('');
      setUploadedFiles([]);
    }, 200);
  };

  return (
    <div className="animate-fade-in space-y-5">
      {/* Title */}
      <div>
        <h1 className="text-xl font-bold text-[#1A1D23] m-0" id="feedback-title">Зворотній зв'язок</h1>
        <p className="text-xs text-[#6B7280] mt-1 m-0">Надіслати офіційний лист або запит до відповідних служб дистриб'ютора БаДМ</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#E3E6EA] select-none" id="feedback-department-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              setActiveTab(tab.id as any);
              setIsSubmitted(false);
            }}
            className={`px-4 py-2.5 text-[13px] font-medium border-b-2 -mb-[2px] transition flex items-center gap-1.5 ${
              activeTab === tab.id 
                ? 'text-[#C8102E] border-[#C8102E] font-semibold' 
                : 'text-[#6B7280] border-transparent hover:text-[#1A1D23]'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Form Card */}
      <div className="bg-white border border-[#E3E6EA] rounded-[10px] p-5 shadow-xs">
        {isSubmitted ? (
          <div className="text-center py-12 select-none animate-fade-in">
            <div className="text-3xl mb-3">✉️</div>
            <h3 className="text-base font-bold text-[#1A1D23]">Повідомлення успішно відправлено!</h3>
            <p className="text-xs text-[#6B7280] mt-1.5 max-w-[320px] mx-auto leading-relaxed">
              Ваш лист зареєстровано в системі. Копія звернення та регламентний номер відповіді надіслані на <span className="font-semibold text-[#1A1D23]">{email}</span>.
            </p>
            <button
              type="button"
              onClick={() => setIsSubmitted(false)}
              className="mt-5 text-xs text-[#C8102E] font-semibold hover:underline"
            >
              Надіслати інше повідомлення
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
            
            {/* Client Context Selector */}
            <div>
              <label className="block text-xs font-semibold text-[#1A1D23] mb-1.5 select-none">Відправник (Клієнт)</label>
              <select
                value={client}
                onChange={(e) => setClient(e.target.value)}
                className="w-full text-xs px-3 py-2.5 rounded-[6px] border border-[#E3E6EA] bg-white text-[#1A1D23] focus:outline-none focus:border-[#C8102E]"
              >
                <option value="ДАРІЯФАРМА, ТОВ (код 31121)">ДАРІЯФАРМА, ТОВ (код 31121, 11 підрозділів)</option>
              </select>
            </div>

            {/* Subject Input */}
            <div>
              <label className="block text-xs font-semibold text-[#1A1D23] mb-1.5 select-none">Тема листа</label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-[6px] border border-[#E3E6EA] bg-white text-[#1A1D23] focus:outline-none focus:border-[#C8102E]"
                placeholder="Вкажіть коротку суть звернення (напр. Претензія по накладній №1420)"
                id="feedback-subject-input"
              />
            </div>

            {/* Message Textarea */}
            <div>
              <label className="block text-xs font-semibold text-[#1A1D23] mb-1.5 select-none">Текст листа</label>
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full text-xs p-3 rounded-[6px] border border-[#E3E6EA] bg-white text-[#1A1D23] focus:outline-none focus:border-[#C8102E] leading-relaxed"
                placeholder="Детально опишіть вашу проблему або запитання..."
                id="feedback-message-textarea"
              />
            </div>

            {/* sender credentials row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#1A1D23] mb-1.5 select-none">Ваше ім'я</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-[6px] border border-[#E3E6EA] bg-white text-[#1A1D23] focus:outline-none focus:border-[#C8102E]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1A1D23] mb-1.5 select-none">Контактний Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-[6px] border border-[#E3E6EA] bg-white text-[#1A1D23] focus:outline-none focus:border-[#C8102E]"
                />
              </div>
            </div>

            {/* Usability standard: Drag and drop + click upload uploader */}
            <div>
              <label className="block text-xs font-semibold text-[#1A1D23] mb-1.5 select-none">Додати вкладення (акти, фото, накладні)</label>
              <div 
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-[10px] p-5 text-center cursor-pointer transition select-none ${
                  isDragActive ? 'border-[#C8102E] bg-[#FDECEE]/20' : 'border-[#E3E6EA] hover:border-neutral-400 bg-neutral-50/20'
                }`}
                id="feedback-drag-drop-uploader"
              >
                <input 
                  type="file"
                  multiple
                  ref={fileInputRef}
                  onChange={handleFileInputChange}
                  className="hidden"
                />
                <div className="flex flex-col items-center">
                  <UploadCloud size={24} className="text-[#9AA1AC] mb-2" />
                  <span className="text-xs font-semibold text-[#1A1D23]">Перетягніть файли сюди або клікніть для вибору</span>
                  <span className="text-[10px] text-[#9AA1AC] mt-1">Дозволено формати PDF, PNG, JPG, XLS (макс. 10MB)</span>
                </div>
              </div>

              {/* Uploaded files listing */}
              {uploadedFiles.length > 0 && (
                <div className="mt-3 space-y-1.5" id="uploaded-files-list">
                  {uploadedFiles.map((file, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-[#F1F2F4] p-2 rounded-[6px] text-xs font-mono">
                      <div className="flex items-center gap-2 text-[#6B7280] truncate">
                        <File size={13} className="shrink-0 text-[#9AA1AC]" />
                        <span className="truncate">{file.name}</span>
                        <span className="text-[10px] text-[#9AA1AC]">({(file.size / 1024).toFixed(1)} KB)</span>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile(idx);
                        }}
                        className="text-[#9AA1AC] hover:text-[#D2461B] p-1 bg-transparent border-none cursor-pointer"
                        title="Видалити вкладення"
                      >
                        <Trash size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submission buttons */}
            <div className="pt-4 border-t border-[#E3E6EA] flex justify-end">
              <button
                type="submit"
                className="bg-[#C8102E] hover:bg-[#A50D24] text-white px-5 py-2.5 rounded-[6px] text-xs font-semibold transition-colors flex items-center gap-1.5"
                id="send-feedback-submit-btn"
              >
                <Send size={13} />
                Надіслати запит
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

// Quick tiny custom sub-icon for claims uploader tab
function RotateCcwIcon() {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="14" 
      height="14" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className="lucide lucide-rotate-ccw"
    >
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
      <path d="M3 3v5h5"/>
    </svg>
  );
}
