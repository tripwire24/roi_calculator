import React from 'react';

const InfoIcon: React.FC<{ infoKey: string; onInfoClick: (key: string) => void }> = ({ infoKey, onInfoClick }) => (
  <button
    type="button"
    onClick={(e) => {
      e.preventDefault();
      onInfoClick(infoKey);
    }}
    className="group relative flex items-center ml-2 cursor-pointer focus:outline-none"
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


interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  infoKey?: string;
  onInfoClick?: (key: string) => void;
  unit?: '$' | '%' | 'x';
  unitPosition?: 'left' | 'right';
}

export const Input: React.FC<InputProps> = ({ label, infoKey, onInfoClick, unit, unitPosition = 'left', ...props }) => {
  return (
    <div className="w-full">
      <label className="flex items-center text-sm font-medium text-slate-700 mb-1">
        {label}
        {infoKey && onInfoClick && <InfoIcon infoKey={infoKey} onInfoClick={onInfoClick} />}
      </label>
      <div className="relative">
        {unit && unitPosition === 'left' && <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">{unit}</span>}
        <input
          {...props}
          className={`w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white text-slate-900 ${unit && unitPosition === 'left' ? 'pl-7' : ''} ${unit && unitPosition === 'right' ? 'pr-7' : ''}`}
        />
        {unit && unitPosition === 'right' && <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500">{unit}</span>}
      </div>
    </div>
  );
};

interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: number | string;
  output: string;
}

export const Slider: React.FC<SliderProps> = ({ label, value, output, ...props }) => {
    return (
        <div>
            <label className="flex items-center justify-between text-sm font-medium text-slate-700 mb-1">
                <span>{label}: <span className="font-bold text-blue-600">{value}%</span></span>
                <span className="text-right">{output}</span>
            </label>
            <input type="range" {...props} value={value} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
        </div>
    );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  infoKey?: string;
  onInfoClick?: (key: string) => void;
  children: React.ReactNode;
}

export const Select: React.FC<SelectProps> = ({ label, infoKey, onInfoClick, children, ...props }) => {
  return (
    <div className="w-full">
      <label className="flex items-center text-sm font-medium text-slate-700 mb-1">
        {label}
        {infoKey && onInfoClick && <InfoIcon infoKey={infoKey} onInfoClick={onInfoClick} />}
      </label>
      <select
        {...props}
        className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white text-slate-900"
      >
        {children}
      </select>
    </div>
  );
};