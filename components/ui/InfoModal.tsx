import React, { useEffect } from 'react';
import { InfoContent } from '../../types';

interface InfoModalProps {
  content: InfoContent;
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ content, onClose }) => {
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscKey);
    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="info-modal-title"
    >
      <div
        className="bg-white rounded-xl shadow-2xl p-6 md:p-8 max-w-2xl w-full relative transform transition-all duration-300 scale-95 animate-in fade-in-0 zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 transition-colors"
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 id="info-modal-title" className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-4 pr-8">
          {content.title}
        </h2>
        <div className="space-y-6 text-slate-700">
            <div>
                <h3 className="font-bold text-lg text-blue-600 mb-2">What is it?</h3>
                <p className="leading-relaxed">{content.explanation}</p>
            </div>
            <div>
                <h3 className="font-bold text-lg text-blue-600 mb-2">Example</h3>
                <p className="bg-slate-100 p-4 rounded-lg border border-slate-200 leading-relaxed text-slate-600">{content.example}</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
