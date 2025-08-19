import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-xl font-bold text-slate-800 mb-4">{title}</h3>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

type MetricStatus = 'success' | 'danger' | 'warning' | 'neutral';

const statusClasses: Record<MetricStatus, string> = {
  success: 'text-success',
  danger: 'text-danger',
  warning: 'text-warning',
  neutral: 'text-slate-800',
};

const InfoIcon: React.FC<{ infoKey: string; onInfoClick: (key: string) => void }> = ({ infoKey, onInfoClick }) => (
  <button
    type="button"
    onClick={(e) => {
      e.preventDefault();
      onInfoClick(infoKey);
    }}
    className="group relative flex items-center ml-1.5 cursor-pointer focus:outline-none"
    aria-label={`Learn more about ${infoKey}`}
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400 group-hover:text-blue-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max px-3 py-1.5 bg-slate-800 text-white text-xs rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
      Click for details
    </div>
  </button>
);


interface MetricCardProps {
  title: string;
  value: string;
  infoKey?: string;
  onInfoClick?: (key: string) => void;
  status?: MetricStatus;
}

export const MetricCard: React.FC<MetricCardProps> = ({ title, value, infoKey, onInfoClick, status = 'neutral' }) => {
  return (
    <div className="bg-slate-100/70 p-4 rounded-lg">
      <div className="flex items-center text-sm text-slate-600 mb-1">
        {title}
        {infoKey && onInfoClick && <InfoIcon infoKey={infoKey} onInfoClick={onInfoClick} />}
      </div>
      <p className={`text-3xl font-extrabold ${statusClasses[status]}`}>{value}</p>
    </div>
  );
};


interface AlertProps {
    message: string;
    type: 'success' | 'danger' | 'warning';
}

const alertIcons: Record<AlertProps['type'], React.ReactNode> = {
    danger: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>,
    warning: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.21 3.03-1.742 3.03H4.42c-1.532 0-2.492-1.696-1.742-3.03l5.58-9.92zM10 13a1 1 0 110-2 1 1 0 010 2zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>,
    success: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>,
};

const alertColors: Record<AlertProps['type'], string> = {
    danger: 'bg-red-100 border-red-400 text-red-700',
    warning: 'bg-yellow-100 border-yellow-400 text-yellow-700',
    success: 'bg-green-100 border-green-400 text-green-700'
};

export const Alert: React.FC<AlertProps> = ({ message, type }) => {
    return (
        <div className={`border-l-4 p-4 flex items-center ${alertColors[type]}`} role="alert">
            {alertIcons[type]}
            <p className="font-bold">{message}</p>
        </div>
    );
};