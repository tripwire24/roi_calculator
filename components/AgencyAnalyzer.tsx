import React, { useState, useMemo, useEffect } from 'react';
import { AgencyState, InfoContent } from '../types';
import { initialAgencyState } from '../constants';
import { Card, MetricCard } from './ui/Display';
import { Input, Select } from './ui/FormControls';
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
    if (isNaN(value) || !isFinite(value)) return '0.00';
    return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}


const AgencyAnalyzer: React.FC = () => {
    const [inputs, setInputs] = useState<AgencyState>(() => {
        try {
            const saved = localStorage.getItem('agencyInputs');
            return saved ? JSON.parse(saved) : initialAgencyState;
        } catch {
            return initialAgencyState;
        }
    });
    
    const [modalContent, setModalContent] = useState<InfoContent | null>(null);

     useEffect(() => {
        localStorage.setItem('agencyInputs', JSON.stringify(inputs));
    }, [inputs]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'number') {
            if (value === '') {
                setInputs(prev => ({ ...prev, [name]: '' }));
            } else {
                const num = parseFloat(value);
                if (!isNaN(num)) {
                    setInputs(prev => ({ ...prev, [name]: num }));
                }
            }
        } else {
            setInputs(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleInfoClick = (key: string) => {
        const content = infoContentData[key];
        if (content) setModalContent(content);
    };

    const calculations = useMemo(() => {
        const num = (v: number | '') => Number(v) || 0;

        const monthlyAdSpend = num(inputs.monthlyAdSpend);
        const monthlyRevenueFromAds = num(inputs.monthlyRevenueFromAds);
        const contributionMargin = num(inputs.contributionMargin);
        const { agencyFeeType } = inputs;
        const basePercentage = num(inputs.basePercentage);
        const monthlyRetainer = num(inputs.monthlyRetainer);
        const setupFees = num(inputs.setupFees);
        const additionalToolCosts = num(inputs.additionalToolCosts);
        const brandRoas = num(inputs.brandRoas);
        const nonBrandRoas = num(inputs.nonBrandRoas);
        const overallMer = num(inputs.overallMer);
        const minimumCommitment = num(inputs.minimumCommitment);
        
        let agencyFeeCost = 0;
        if (agencyFeeType === 'percentage') {
            agencyFeeCost = monthlyAdSpend * (basePercentage / 100);
        } else if (agencyFeeType === 'flat') {
            agencyFeeCost = monthlyRetainer;
        } else if (agencyFeeType === 'hybrid') {
            agencyFeeCost = (monthlyAdSpend * (basePercentage / 100)) + monthlyRetainer;
        }
        
        const totalMonthlyAgencyCost = agencyFeeCost + setupFees + additionalToolCosts;

        const feePercentageOfRevenue = monthlyRevenueFromAds > 0 ? (totalMonthlyAgencyCost / monthlyRevenueFromAds) * 100 : 0;
        const feePercentageOfSpend = monthlyAdSpend > 0 ? (totalMonthlyAgencyCost / monthlyAdSpend) * 100 : 0;
        
        const baseBreakEvenROAS = contributionMargin > 0 ? 1 / (contributionMargin / 100) : Infinity;
        const newBreakEvenROAS = contributionMargin > 0 && monthlyAdSpend > 0 ? (monthlyAdSpend + totalMonthlyAgencyCost) / (monthlyAdSpend * (contributionMargin/100)) : Infinity;
        const breakEvenROASIncrease = newBreakEvenROAS - baseBreakEvenROAS;

        const redFlags = [];
        if (brandRoas > 5 && nonBrandRoas < 4 && ((brandRoas + nonBrandRoas) / 2) > 4) {
            redFlags.push("Blended brand/non-brand reporting might be hiding poor non-brand performance.");
        }
        if (overallMer > 0 && contributionMargin > 0 && overallMer < (1 / (contributionMargin/100))) {
            redFlags.push("MER tracking indicates you may be losing money overall, even if ROAS looks good.");
        }
        if (feePercentageOfSpend > 15) {
            redFlags.push(`High fee percentage (${formatPercent(feePercentageOfSpend)}) of ad spend.`);
        }
        if (minimumCommitment > 6) {
            redFlags.push("Long minimum commitment reduces your flexibility.");
        }

        return { totalMonthlyAgencyCost, feePercentageOfRevenue, feePercentageOfSpend, breakEvenROASIncrease, redFlags };
    }, [inputs]);

    return (
        <>
        {modalContent && <InfoModal content={modalContent} onClose={() => setModalContent(null)} />}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
                <Card title="Your Business Metrics">
                    <Input label="Monthly ad spend" name="monthlyAdSpend" type="number" value={inputs.monthlyAdSpend} onChange={handleInputChange} unit="$" infoKey="monthlyAdSpend" onInfoClick={handleInfoClick}/>
                    <Input label="Monthly revenue from ads" name="monthlyRevenueFromAds" type="number" value={inputs.monthlyRevenueFromAds} onChange={handleInputChange} unit="$" />
                    <Input label="Contribution margin" name="contributionMargin" type="number" value={inputs.contributionMargin} onChange={handleInputChange} unit="%" unitPosition="right" infoKey="agencyContributionMargin" onInfoClick={handleInfoClick}/>
                </Card>
                 <Card title="Current Agency Setup">
                    <Select label="Agency fee structure" name="agencyFeeType" value={inputs.agencyFeeType} onChange={handleInputChange} infoKey="agencyFee" onInfoClick={handleInfoClick}>
                        <option value="percentage">% of spend</option>
                        <option value="flat">Flat monthly</option>
                        <option value="hybrid">Hybrid (% + flat)</option>
                    </Select>
                    {(inputs.agencyFeeType === 'percentage' || inputs.agencyFeeType === 'hybrid') && <Input label="Base percentage" name="basePercentage" type="number" value={inputs.basePercentage} onChange={handleInputChange} unit="%" unitPosition='right' />}
                    {(inputs.agencyFeeType === 'flat' || inputs.agencyFeeType === 'hybrid') && <Input label="Monthly retainer" name="monthlyRetainer" type="number" value={inputs.monthlyRetainer} onChange={handleInputChange} unit="$" />}
                    <Input label="Setup fees (monthly avg)" name="setupFees" type="number" value={inputs.setupFees} onChange={handleInputChange} unit="$" infoKey="setupFees" onInfoClick={handleInfoClick} />
                    <Input label="Minimum commitment (months)" name="minimumCommitment" type="number" value={inputs.minimumCommitment} onChange={handleInputChange} />
                    <Input label="Additional tool costs" name="additionalToolCosts" type="number" value={inputs.additionalToolCosts} onChange={handleInputChange} unit="$" infoKey="toolsSoftware" onInfoClick={handleInfoClick} />
                </Card>
                 <Card title="Performance Tracking">
                    <Input label="Brand campaign ROAS" name="brandRoas" type="number" value={inputs.brandRoas} onChange={handleInputChange} unit="x" unitPosition='right' infoKey="brandRoas" onInfoClick={handleInfoClick}/>
                    <Input label="Non-brand campaign ROAS" name="nonBrandRoas" type="number" value={inputs.nonBrandRoas} onChange={handleInputChange} unit="x" unitPosition='right' infoKey="nonBrandRoas" onInfoClick={handleInfoClick}/>
                    <Input label="Overall MER" name="overallMer" type="number" value={inputs.overallMer} onChange={handleInputChange} unit="x" unitPosition='right' infoKey="agencyOverallMer" onInfoClick={handleInfoClick}/>
                </Card>
            </div>

            {/* Output Section */}
            <div className="space-y-6">
                <Card title="Fee Analysis">
                    <MetricCard title="Total Monthly Agency Cost" value={formatCurrency(calculations.totalMonthlyAgencyCost)} status={calculations.feePercentageOfSpend > 20 ? 'danger' : calculations.feePercentageOfSpend > 15 ? 'warning' : 'success'} infoKey="totalAgencyCost" onInfoClick={handleInfoClick}/>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <MetricCard title="Fee as % of Spend" value={formatPercent(calculations.feePercentageOfSpend)} />
                        <MetricCard title="Fee as % of Revenue" value={formatPercent(calculations.feePercentageOfRevenue)} />
                    </div>
                    <MetricCard title="B/E ROAS Increase" value={`+${formatNumber(calculations.breakEvenROASIncrease)}x`} infoKey="breakEvenRoasIncrease" onInfoClick={handleInfoClick} />
                </Card>

                <Card title="Red Flags Detected">
                    {calculations.redFlags.length > 0 ? (
                        <ul className="space-y-3">
                            {calculations.redFlags.map((flag, index) => (
                                <li key={index} className="flex items-start">
                                    <span className="text-red-500 mr-2 text-xl">❌</span>
                                    <span className="text-slate-700">{flag}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="text-center py-4">
                           <span className="text-green-500 text-2xl">✅</span>
                           <p className="text-slate-600 mt-2 font-semibold">No major red flags detected based on inputs.</p>
                        </div>
                    )}
                </Card>
                <Card title="Negotiation Recommendations">
                    <ul className="list-disc list-inside space-y-2 text-slate-700">
                        <li><strong>Suggested Structure:</strong> Consider a lower base percentage with performance bonuses tied to non-brand ROAS or MER growth.</li>
                        <li><strong>Performance Bonuses:</strong> Propose a bonus for exceeding a target MER, ensuring the agency is aligned with true profitability.</li>
                        <li><strong>Reporting:</strong> Demand separate reporting for Brand vs. Non-Brand campaigns to understand true acquisition performance.</li>
                         <li><strong>Commitments:</strong> Negotiate for a shorter commitment (e.g., 3 months) or a 30-day out-clause after the initial term.</li>
                    </ul>
                </Card>
            </div>
        </div>
        </>
    );
};

export default AgencyAnalyzer;