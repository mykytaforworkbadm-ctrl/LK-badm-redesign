import React, { useState } from 'react';
import { Survey } from '../types';
import { INITIAL_SURVEYS } from '../data';
import { Star, ChevronDown, ChevronUp, MessageSquareQuote, CheckSquare } from 'lucide-react';

export default function SurveysView() {
  const [surveys, setSurveys] = useState<Survey[]>(INITIAL_SURVEYS);
  
  // Custom feedback state (corresponds to the collapsed "Залишити відгук" item)
  const [showGeneralFeedback, setShowGeneralFeedback] = useState(false);
  const [generalRating, setGeneralRating] = useState(5);
  const [generalText, setGeneralText] = useState('');
  const [generalSubmitted, setGeneralSubmitted] = useState(false);

  // Expanded states for standard surveys
  const [expandedSurveyId, setExpandedSurveyId] = useState<string | null>('SRV-001');
  const [surveyRatings, setSurveyRatings] = useState<Record<string, number>>({});
  const [surveyTexts, setSurveyTexts] = useState<Record<string, string>>({});
  const [surveySubmitted, setSurveySubmitted] = useState<Record<string, boolean>>({});

  const toggleSurvey = (id: string) => {
    if (expandedSurveyId === id) {
      setExpandedSurveyId(null);
    } else {
      setExpandedSurveyId(id);
    }
  };

  const handleGeneralSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralSubmitted(true);
  };

  const handleSurveySubmit = (e: React.FormEvent, id: string) => {
    e.preventDefault();
    setSurveySubmitted({
      ...surveySubmitted,
      [id]: true
    });
  };

  const handleStarClick = (surveyId: string, rating: number) => {
    setSurveyRatings({
      ...surveyRatings,
      [surveyId]: rating
    });
  };

  return (
    <div className="animate-fade-in space-y-5">
      {/* Page Title */}
      <div>
        <h1 className="text-xl font-bold text-[#1A1D23] m-0" id="surveys-title">Опитування та відгуки</h1>
        <p className="text-xs text-[#6B7280] mt-1 m-0">Ваша зворотна думка допомагає нам покращувати умови співпраці та логістику</p>
      </div>

      {/* Accordion container */}
      <div className="space-y-3" id="surveys-accordion-container">
        {/* Requirement collapsed item: "Залишити загальний відгук про ЛК" */}
        <div className="bg-white border border-[#E3E6EA] rounded-[10px] overflow-hidden shadow-xs">
          <button
            type="button"
            onClick={() => setShowGeneralFeedback(!showGeneralFeedback)}
            className="w-full flex items-center justify-between p-4 bg-white hover:bg-neutral-50/50 text-left transition select-none focus:outline-none"
            id="general-feedback-trigger"
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-[#FDECEE] text-[#C8102E] flex items-center justify-center font-bold text-xs shrink-0">
                ★
              </span>
              <div>
                <h3 className="text-sm font-bold text-[#1A1D23] m-0">Залишити відгук</h3>
                <p className="text-xs text-[#6B7280] mt-0.5 m-0">Залиште вашу оцінку та побажання щодо роботи дистриб'ютора загалом</p>
              </div>
            </div>
            <div className="text-[#6B7280]">
              {showGeneralFeedback ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
          </button>

          {showGeneralFeedback && (
            <div className="p-5 border-t border-[#E3E6EA] bg-neutral-50/20" id="general-feedback-form-block">
              {generalSubmitted ? (
                <div className="text-center py-6 select-none animate-fade-in">
                  <div className="text-2xl mb-2">💚</div>
                  <h4 className="text-sm font-bold text-[#1A1D23]">Дякуємо за вашу думку!</h4>
                  <p className="text-xs text-[#6B7280] mt-1">Загальний відгук успішно надіслано до головного офісу БаДМ.</p>
                </div>
              ) : (
                <form onSubmit={handleGeneralSubmit} className="space-y-4 max-w-xl">
                  {/* Rating stars selector */}
                  <div>
                    <label className="block text-xs font-semibold text-[#1A1D23] mb-1.5 select-none">
                      Оцініть вашу задоволеність роботою БаДМ
                    </label>
                    <div className="flex gap-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setGeneralRating(star)}
                          className="p-1 focus:outline-none transition-transform active:scale-95"
                          title={`Оцінити на ${star} зірок`}
                        >
                          <Star
                            size={20}
                            className={star <= generalRating ? 'fill-[#8A5A0F] text-[#8A5A0F]' : 'text-[#9AA1AC]'}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Feedback text input */}
                  <div>
                    <label className="block text-xs font-semibold text-[#1A1D23] mb-1.5 select-none">
                      Ваш коментар чи побажання
                    </label>
                    <textarea
                      required
                      value={generalText}
                      onChange={(e) => setGeneralText(e.target.value)}
                      rows={3}
                      className="w-full text-xs p-3 rounded-[6px] border border-[#E3E6EA] bg-white text-[#1A1D23] focus:outline-none focus:border-[#C8102E]"
                      placeholder="Напишіть, будь ласка, що вам подобається або що слід покращити..."
                    />
                  </div>

                  <div className="flex justify-end select-none">
                    <button
                      type="submit"
                      className="bg-[#C8102E] hover:bg-[#A50D24] text-white px-4 py-2 rounded-[6px] text-xs font-semibold transition-colors"
                      id="submit-general-feedback-btn"
                    >
                      Надіслати відгук
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Dynamic standard surveys list */}
        {surveys.map((survey) => {
          const isExpanded = expandedSurveyId === survey.id;
          const isSubmitted = surveySubmitted[survey.id] || false;
          const currentRating = surveyRatings[survey.id] || 5;
          const currentText = surveyTexts[survey.id] || '';

          return (
            <div key={survey.id} className="bg-white border border-[#E3E6EA] rounded-[10px] overflow-hidden shadow-xs">
              <button
                type="button"
                onClick={() => toggleSurvey(survey.id)}
                className="w-full flex items-center justify-between p-4 bg-white hover:bg-neutral-50/50 text-left transition select-none focus:outline-none"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#EBF8FF] text-[#2B6CB0] flex items-center justify-center font-bold text-xs shrink-0">
                    ?
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-[#1A1D23] m-0">{survey.title}</h3>
                    <p className="text-xs text-[#6B7280] mt-0.5 m-0">Опитування претензійного відділу</p>
                  </div>
                </div>
                <div className="text-[#6B7280]">
                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </button>

              {isExpanded && (
                <div className="p-5 border-t border-[#E3E6EA] bg-neutral-50/10">
                  {isSubmitted ? (
                    <div className="text-center py-6 select-none animate-fade-in">
                      <div className="text-2xl mb-2">💚</div>
                      <h4 className="text-sm font-bold text-[#1A1D23]">Відповідь зафіксовано</h4>
                      <p className="text-xs text-[#6B7280] mt-1">Щиро дякуємо, що відповіли на опитування "{survey.title}".</p>
                    </div>
                  ) : (
                    <form onSubmit={(e) => handleSurveySubmit(e, survey.id)} className="space-y-4 max-w-xl">
                      <p className="text-xs text-[#6B7280] leading-relaxed select-none">{survey.description}</p>
                      
                      {/* Rating */}
                      <div>
                        <label className="block text-xs font-semibold text-[#1A1D23] mb-1.5 select-none">
                          Будь ласка, оцініть за 5-бальною шкалою
                        </label>
                        <div className="flex gap-1.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => handleStarClick(survey.id, star)}
                              className="p-1 focus:outline-none transition-transform active:scale-95"
                            >
                              <Star
                                size={18}
                                className={star <= currentRating ? 'fill-[#8A5A0F] text-[#8A5A0F]' : 'text-[#9AA1AC]'}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Comment input */}
                      <div>
                        <label className="block text-xs font-semibold text-[#1A1D23] mb-1.5 select-none">
                          Ваш розгорнутий коментар (необов'язково)
                        </label>
                        <textarea
                          value={currentText}
                          onChange={(e) => setSurveyTexts({ ...surveyTexts, [survey.id]: e.target.value })}
                          rows={2}
                          className="w-full text-xs p-3 rounded-[6px] border border-[#E3E6EA] bg-white text-[#1A1D23] focus:outline-none focus:border-[#C8102E]"
                          placeholder="Ваші думки чи конструктивні зауваження..."
                        />
                      </div>

                      <div className="flex justify-end select-none">
                        <button
                          type="submit"
                          className="bg-[#C8102E] hover:bg-[#A50D24] text-white px-4 py-2 rounded-[6px] text-xs font-semibold transition-colors"
                        >
                          Надіслати відповідь
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
