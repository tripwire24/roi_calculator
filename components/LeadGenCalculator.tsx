import React, { useState, useMemo, useEffect } from 'react';
import { LeadGenState, InfoContent } from '../types';
import { initialLeadGenState } from '../constants';
import { Card, MetricCard, Alert } from './ui/Display';
import { Input } from './ui/FormControls';
import InfoModal from './ui/InfoModal';
import { infoContentData } from '../infoContent';

const formatCurrency = (value: number) => {
    if (isNaN(value) || !isFinite(value)) return '$0.00';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
};

const formatPercent = (value: number) => {
    if (isNaN(value) || !isFinite(value)) return '0.00%';
    return `${value.toFixed(2)}%`;
};

const formatNumber = (value: number) => {
    if (isNaN(value) || !isFinite(value)) return '0';
    return value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

const LeadGenCalculator: React.FC = () => {
    const [inputs, setInputs] = useState<LeadGenState>(() => {
        try {
            const saved = localStorage.getItem('leadGenInputs');
            return saved ? JSON.parse(saved) : initialLeadGenState;
        } catch {
            return initialLeadGenState;
        }
    });
    
    const [modalContent, setModalContent] = useState<InfoContent | null>(null);

    useEffect(() => {
        localStorage.setItem('leadGenInputs', JSON.stringify(inputs));
    }, [inputs]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputs(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    };

    const handleInfoClick = (key: string) => {
        const content = infoContentData[key];
        if (content) setModalContent(content);
    };

    const calculations = useMemo(() => {
        const { cpc, landingPageConversionRate, leadToSaleCloseRate, avgSaleValue, grossMarginPercentage, monthlyAdSpend, agencyFees, toolsSoftware, creativeLandingPages } = inputs;

        const currentCPL = landingPageConversionRate > 0 ? cpc / (landingPageConversionRate / 100) : Infinity;
        const grossProfitPerSale = avgSaleValue * (grossMarginPercentage / 100);
        const breakEvenCPL = grossProfitPerSale * (leadToSaleCloseRate / 100);

        const status: 'success' | 'danger' | 'warning' = currentCPL < breakEvenCPL ? 'success' : currentCPL > breakEvenCPL ? 'danger' : 'warning';
        const leadsGenerated = monthlyAdSpend > 0 && cpc > 0 && landingPageConversionRate > 0 ? monthlyAdSpend / currentCPL : 0;
        const salesClosed = leadsGenerated * (leadToSaleCloseRate / 100);
        const totalGrossProfit = salesClosed * grossProfitPerSale;
        const totalMarketingCost = monthlyAdSpend + agencyFees + toolsSoftware + creativeLandingPages;
        const netProfit = totalGrossProfit - totalMarketingCost;
        const netMarketingROI = totalMarketingCost > 0 ? (netProfit / totalMarketingCost) * 100 : 0;

        const targetCloseRate = grossProfitPerSale > 0 ? (currentCPL / grossProfitPerSale) * 100 : Infinity;
        const targetSaleValue = (grossMarginPercentage / 100) * (leadToSaleCloseRate / 100) > 0 ? currentCPL / ((grossMarginPercentage / 100) * (leadToSaleCloseRate / 100)) : Infinity;

        return { currentCPL, breakEvenCPL, status, leadsGenerated, salesClosed, totalGrossProfit, totalMarketingCost, netProfit, netMarketingROI, targetCloseRate, targetSaleValue };
    }, [inputs]);

    return (
        <>
        {modalContent && <InfoModal content={modalContent} onClose={() => setModalContent(null)} />}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
                <Card title="Lead & Sales Metrics">
                    <Input label="Cost per click (CPC)" name="cpc" type="number" value={inputs.cpc} onChange={handleInputChange} unit="$" infoKey="cpc" onInfoClick={handleInfoClick}/>
                    <Input label="Landing page CVR" name="landingPageConversionRate" type="number" value={inputs.landingPageConversionRate} onChange={handleInputChange} unit="%" unitPosition='right' infoKey="landingPageCVR" onInfoClick={handleInfoClick} />
                    <Input label="Lead-to-sale close rate" name="leadToSaleCloseRate" type="number" value={inputs.leadToSaleCloseRate} onChange={handleInputChange} unit="%" unitPosition='right' infoKey="leadToSaleCloseRate" onInfoClick={handleInfoClick}/>
                    <Input label="Average sale value" name="avgSaleValue" type="number" value={inputs.avgSaleValue} onChange={handleInputChange} unit="$" infoKey="avgSaleValue" onInfoClick={handleInfoClick} />
                    <Input label="Gross margin percentage" name="grossMarginPercentage" type="number" value={inputs.grossMarginPercentage} onChange={handleInputChange} unit="%" unitPosition='right' infoKey="grossMarginPercentage" onInfoClick={handleInfoClick} />
                </Card>
                <Card title="Marketing Costs">
                    <Input label="Monthly ad spend" name="monthlyAdSpend" type="number" value={inputs.monthlyAdSpend} onChange={handleInputChange} unit="$" infoKey="monthlyAdSpend" onInfoClick={handleInfoClick} />
                    <Input label="Agency/management fees" name="agencyFees" type="number" value={inputs.agencyFees} onChange={handleInputChange} unit="$" infoKey="agencyFee" onInfoClick={handleInfoClick} />
                    <Input label="Tools & software" name="toolsSoftware" type="number" value={inputs.toolsSoftware} onChange={handleInputChange} unit="$" infoKey="toolsSoftware" onInfoClick={handleInfoClick} />
                    <Input label="Creative/landing pages" name="creativeLandingPages" type="number" value={inputs.creativeLandingPages} onChange={handleInputChange} unit="$" infoKey="creativeCosts" onInfoClick={handleInfoClick} />
                </Card>
            </div>

            {/* Output Section */}
            <div className="space-y-6">
                <Card title="Lead Economics">
                     <div className="grid grid-cols-2 gap-4">
                        <MetricCard title="Current Cost Per Lead" value={formatCurrency(calculations.currentCPL)} status={calculations.status} infoKey="currentCPL" onInfoClick={handleInfoClick} />
                        <MetricCard title="Break-Even CPL" value={formatCurrency(calculations.breakEvenCPL)} status="warning" infoKey="breakEvenCPL" onInfoClick={handleInfoClick} />
                    </div>
                     <Alert message={calculations.status === 'success' ? 'Profitable!' : calculations.status === 'danger' ? 'Losing money per lead.' : 'Breaking even.'} type={calculations.status} />
                </Card>
                <Card title="Monthly Performance">
                     <MetricCard title="Net Marketing Profit" value={formatCurrency(calculations.netProfit)} status={calculations.netProfit > 0 ? 'success' : 'danger'} infoKey="netMarketingProfit" onInfoClick={handleInfoClick} />
                    <div className="grid grid-cols-2 gap-4">
                        <MetricCard title="Leads Generated" value={formatNumber(calculations.leadsGenerated)} />
                        <MetricCard title="Sales Closed" value={formatNumber(calculations.salesClosed)} />
                        <MetricCard title="Total Gross Profit" value={formatCurrency(calculations.totalGrossProfit)} />
                        <MetricCard title="Net Marketing ROI" value={formatPercent(calculations.netMarketingROI)} status={calculations.netMarketingROI > 0 ? 'success' : 'danger'} infoKey="netMarketingROI" onInfoClick={handleInfoClick} />
                    </div>
                </Card>
                 <Card title="Optimization Targets">
                    <p className="text-sm text-slate-600 mb-2 font-semibold">To break even, you need one of the following:</p>
                    <ul className="list-disc list-inside space-y-2 text-slate-700">
                        <li>Cost Per Lead (CPL) below <strong className="text-blue-600">{formatCurrency(calculations.breakEvenCPL)}</strong></li>
                        <li>Close Rate above <strong className="text-blue-600">{formatPercent(calculations.targetCloseRate)}</strong></li>
                        <li>Sale Value above <strong className="text-blue-600">{formatCurrency(calculations.targetSaleValue)}</strong></li>
                    </ul>
                </Card>
            </div>
        </div>
        </>
    );
};

export default LeadGenCalculator;