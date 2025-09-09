import React, { useState, useCallback } from 'react';
import { Tab } from './types';
import Header from './components/Header';
import EcommerceCalculator from './components/EcommerceCalculator';
import LeadGenCalculator from './components/LeadGenCalculator';
import AgencyAnalyzer from './components/AgencyAnalyzer';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('ecommerce');
  const [showCalculators, setShowCalculators] = useState<boolean>(false);

  const handleGetStarted = useCallback(() => {
    setShowCalculators(true);
    const calculatorSection = document.getElementById('calculator-section');
    if (calculatorSection) {
      calculatorSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 md:py-16">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-800 mb-4 tracking-tight">
            Stop Subsidizing Ad Platforms. Start Tracking <span className="text-blue-600">Real Profitability.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-8">
            The only calculator that shows your true advertising ROI—including all fees, tools, and hidden costs.
          </p>
          <div className="flex justify-center gap-4">
            <button onClick={handleGetStarted} className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105">
              Get Started Free
            </button>
            <button onClick={handleGetStarted} className="bg-white text-slate-700 font-bold py-3 px-8 rounded-lg shadow-lg border border-slate-200 hover:bg-slate-100 transition-transform transform hover:scale-105">
              See Example Calculation
            </button>
          </div>
        </div>
        
        {showCalculators && (
          <div id="calculator-section" className="w-full max-w-7xl mx-auto">
            {/* Tab Navigation */}
            <div className="mb-8 flex justify-center border-b border-slate-200">
              <button
                onClick={() => setActiveTab('ecommerce')}
                className={`px-6 py-3 font-semibold text-lg transition-colors duration-200 ${activeTab === 'ecommerce' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-blue-500'}`}
              >
                E-commerce ROI
              </button>
              <button
                onClick={() => setActiveTab('leadgen')}
                className={`px-6 py-3 font-semibold text-lg transition-colors duration-200 ${activeTab === 'leadgen' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-blue-500'}`}
              >
                Lead Gen ROI
              </button>
              <button
                onClick={() => setActiveTab('agency')}
                className={`px-6 py-3 font-semibold text-lg transition-colors duration-200 ${activeTab === 'agency' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-blue-500'}`}
              >
                Agency Fee Audit
              </button>
            </div>

            {/* Content based on active tab */}
            <div>
              {activeTab === 'ecommerce' && <EcommerceCalculator />}
              {activeTab === 'leadgen' && <LeadGenCalculator />}
              {activeTab === 'agency' && <AgencyAnalyzer />}
            </div>
          </div>
        )}
      </main>

      <footer className="text-center py-4 border-t border-slate-200">
        <p className="text-slate-500">&copy; {new Date().getFullYear()} Tripwire Digital LLC. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
