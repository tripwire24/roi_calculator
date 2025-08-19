import React, { useState, useMemo, useEffect } from 'react';
import { EcommerceState, InfoContent } from '../types';
import { initialEcommerceState } from '../constants';
import { Card, MetricCard, Alert } from './ui/Display';
import { Input, Select, Slider } from './ui/FormControls';
import InfoModal from './ui/InfoModal';
import { infoContentData } from '../infoContent';

const formatCurrency = (value: number) => {
    if (isNaN(value) || !isFinite(value)) return '$0.00';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
};

const formatPercent = (value: number) => {
    if (isNaN(value) || !isFinite(value)) return '0.00%';
    return `${(value * 100).toFixed(2)}%`;
};

const formatNumber = (value: number) => {
    if (isNaN(value) || !isFinite(value)) return '0';
    return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

const EcommerceCalculator: React.FC = () => {
    const [inputs, setInputs] = useState<EcommerceState>(() => {
        try {
            const saved = localStorage.getItem('ecommerceInputs');
            return saved ? JSON.parse(saved) : initialEcommerceState;
        } catch {
            return initialEcommerceState;
        }
    });

    const [scenario, setScenario] = useState({ increaseCVR: 0, increaseAOV: 0, reduceCOGS: 0 });
    const [modalContent, setModalContent] = useState<InfoContent | null>(null);

    useEffect(() => {
        localStorage.setItem('ecommerceInputs', JSON.stringify(inputs));
    }, [inputs]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setInputs(prev => ({ ...prev, [name]: e.target.type === 'number' ? parseFloat(value) || 0 : value }));
    };
    
    const handleScenarioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setScenario(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    }
    
    const handleInfoClick = (key: string) => {
        const content = infoContentData[key];
        if (content) setModalContent(content);
    };

    const calculations = useMemo(() => {
        const { aov, ordersPerMonth, cogsPercentage, shippingSubsidy, paymentProcessingType, paymentProcessingCustomPercent, paymentProcessingCustomFee, returnsAllowance, returnsAllowanceType, pickPackOps, monthlyAdSpend, cpc, conversionRate, agencyFeeType, agencyPercentage, agencyFlatFee, setupFees, toolsSoftware, creativeCosts } = inputs;
        
        const monthlyRevenue = aov * ordersPerMonth;
        const cogsAmount = aov * (cogsPercentage / 100);

        let paymentFee = 0;
        if (paymentProcessingType === 'standard') paymentFee = aov * 0.029 + 0.30;
        else if (paymentProcessingType === 'custom_percent') paymentFee = aov * (paymentProcessingCustomPercent / 100);
        else if (paymentProcessingType === 'flat_fee') paymentFee = paymentProcessingCustomFee;

        const returnsAmount = returnsAllowanceType === 'percentage' ? aov * (returnsAllowance / 100) : returnsAllowance;

        const contributionPerOrderPreAds = aov - cogsAmount - shippingSubsidy - paymentFee - returnsAmount - pickPackOps;
        const contributionMargin = aov > 0 ? contributionPerOrderPreAds / aov : 0;

        let agencyFee = 0;
        if (agencyFeeType === 'percentage') agencyFee = monthlyAdSpend * (agencyPercentage / 100);
        else if (agencyFeeType === 'flat') agencyFee = agencyFlatFee;
        else if (agencyFeeType === 'hybrid') agencyFee = monthlyAdSpend * (agencyPercentage / 100) + agencyFlatFee;

        const totalFixedFees = agencyFee + setupFees + toolsSoftware + creativeCosts;

        const feePercentOfSpend = agencyFeeType === 'percentage' || agencyFeeType === 'hybrid' ? agencyPercentage / 100 : 0;
        
        const breakEvenROAS = contributionMargin > 0 ? ((1 + feePercentOfSpend) + (totalFixedFees/monthlyAdSpend)) / contributionMargin : Infinity;
        
        const platformROAS = monthlyAdSpend > 0 ? monthlyRevenue / monthlyAdSpend : Infinity;
        const profit = monthlyRevenue * contributionMargin - monthlyAdSpend - totalFixedFees;
        
        const mer = (monthlyAdSpend + totalFixedFees) > 0 ? monthlyRevenue / (monthlyAdSpend + totalFixedFees) : Infinity;
        const maxCPA = ordersPerMonth > 0 ? contributionPerOrderPreAds - (totalFixedFees / ordersPerMonth) : 0;
        const maxCPC = maxCPA * (conversionRate / 100);
        
        const profitStatus: 'success' | 'danger' | 'warning' = profit > 0 ? 'success' : profit < 0 ? 'danger' : 'warning';
        
        // Scenario Calculations
        const newAOV = aov * (1 + scenario.increaseAOV / 100);
        const newCogsAmount = newAOV * (cogsPercentage / 100) * (1 - scenario.reduceCOGS / 100);
        const newContributionPerOrder = newAOV - newCogsAmount - shippingSubsidy - paymentFee - returnsAmount - pickPackOps;
        const newMaxCPA = ordersPerMonth > 0 ? newContributionPerOrder - (totalFixedFees / ordersPerMonth) : 0;
        
        const newConversionRate = conversionRate * (1 + scenario.increaseCVR / 100);
        const newMaxCPC = maxCPA * (newConversionRate / 100);

        const newContributionMargin = newAOV > 0 ? newContributionPerOrder / newAOV : 0;
        const newBreakEvenROAS = newContributionMargin > 0 ? ((1 + feePercentOfSpend) + (totalFixedFees/monthlyAdSpend)) / newContributionMargin : Infinity;


        return { monthlyRevenue, contributionPerOrderPreAds, contributionMargin, breakEvenROAS, platformROAS, profit, mer, maxCPA, maxCPC, profitStatus, newMaxCPC, newMaxCPA, newBreakEvenROAS };
    }, [inputs, scenario]);

    return (
        <>
        {modalContent && <InfoModal content={modalContent} onClose={() => setModalContent(null)} />}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Input Section */}
            <div className="lg:col-span-3 space-y-6">
                <Card title="Revenue Metrics">
                    <div className="grid md:grid-cols-2 gap-4">
                        <Input label="Average Order Value (AOV)" name="aov" type="number" value={inputs.aov} onChange={handleInputChange} unit="$" infoKey="aov" onInfoClick={handleInfoClick}/>
                        <Input label="Orders per month" name="ordersPerMonth" type="number" value={inputs.ordersPerMonth} onChange={handleInputChange} infoKey="ordersPerMonth" onInfoClick={handleInfoClick} />
                    </div>
                     <div className="bg-slate-100 p-3 rounded-lg text-center">
                        <p className="text-sm text-slate-600">Auto-calculated Monthly Revenue</p>
                        <p className="text-2xl font-bold text-blue-600">{formatCurrency(calculations.monthlyRevenue)}</p>
                    </div>
                </Card>

                <Card title="Cost Structure">
                    <Input label="COGS percentage" name="cogsPercentage" type="number" value={inputs.cogsPercentage} onChange={handleInputChange} unit="%" unitPosition="right" infoKey="cogsPercentage" onInfoClick={handleInfoClick} />
                    <Input label="Shipping subsidy per order" name="shippingSubsidy" type="number" value={inputs.shippingSubsidy} onChange={handleInputChange} unit="$" infoKey="shippingSubsidy" onInfoClick={handleInfoClick} />
                    <Select label="Payment processing" name="paymentProcessingType" value={inputs.paymentProcessingType} onChange={handleInputChange} infoKey="paymentProcessing" onInfoClick={handleInfoClick}>
                        <option value="standard">Standard (2.9% + $0.30)</option>
                        <option value="custom_percent">Custom %</option>
                        <option value="flat_fee">Flat Fee</option>
                    </Select>
                     {inputs.paymentProcessingType === 'custom_percent' && <Input label="Custom %" name="paymentProcessingCustomPercent" type="number" value={inputs.paymentProcessingCustomPercent} onChange={handleInputChange} unit="%" unitPosition='right'/>}
                     {inputs.paymentProcessingType === 'flat_fee' && <Input label="Flat Fee $" name="paymentProcessingCustomFee" type="number" value={inputs.paymentProcessingCustomFee} onChange={handleInputChange} unit="$" />}
                     <div className="grid grid-cols-2 gap-4 items-end">
                        <Input label="Returns/warranty allowance" name="returnsAllowance" type="number" value={inputs.returnsAllowance} onChange={handleInputChange} unit={inputs.returnsAllowanceType === 'amount' ? '$' : '%'} unitPosition={inputs.returnsAllowanceType === 'amount' ? 'left' : 'right'} infoKey="returnsAllowance" onInfoClick={handleInfoClick} />
                         <Select label="Type" name="returnsAllowanceType" value={inputs.returnsAllowanceType} onChange={handleInputChange}>
                            <option value="percentage">% of AOV</option>
                            <option value="amount">$ amount</option>
                        </Select>
                     </div>
                    <Input label="Pick/pack/ops per order" name="pickPackOps" type="number" value={inputs.pickPackOps} onChange={handleInputChange} unit="$" infoKey="pickPackOps" onInfoClick={handleInfoClick} />
                </Card>

                <Card title="Advertising & Agency">
                    <Input label="Monthly ad spend" name="monthlyAdSpend" type="number" value={inputs.monthlyAdSpend} onChange={handleInputChange} unit="$" infoKey="monthlyAdSpend" onInfoClick={handleInfoClick} />
                    <Input label="Cost per click (CPC)" name="cpc" type="number" value={inputs.cpc} onChange={handleInputChange} unit="$" infoKey="cpc" onInfoClick={handleInfoClick} />
                    <Input label="Conversion rate" name="conversionRate" type="number" value={inputs.conversionRate} onChange={handleInputChange} unit="%" unitPosition="right" infoKey="conversionRate" onInfoClick={handleInfoClick} />
                    <Select label="Agency fee structure" name="agencyFeeType" value={inputs.agencyFeeType} onChange={handleInputChange} infoKey="agencyFee" onInfoClick={handleInfoClick}>
                        <option value="none">No Agency</option>
                        <option value="percentage">% of spend</option>
                        <option value="flat">Flat monthly</option>
                        <option value="hybrid">Hybrid (% + flat)</option>
                    </Select>
                    {(inputs.agencyFeeType === 'percentage' || inputs.agencyFeeType === 'hybrid') && <Input label="Agency percentage" name="agencyPercentage" type="number" value={inputs.agencyPercentage} onChange={handleInputChange} unit="%" unitPosition='right' />}
                    {(inputs.agencyFeeType === 'flat' || inputs.agencyFeeType === 'hybrid') && <Input label="Flat monthly fee" name="agencyFlatFee" type="number" value={inputs.agencyFlatFee} onChange={handleInputChange} unit="$" />}
                    <Input label="Setup/audit fees (monthly avg)" name="setupFees" type="number" value={inputs.setupFees} onChange={handleInputChange} unit="$" infoKey="setupFees" onInfoClick={handleInfoClick} />
                    <Input label="Tools & software (monthly)" name="toolsSoftware" type="number" value={inputs.toolsSoftware} onChange={handleInputChange} unit="$" infoKey="toolsSoftware" onInfoClick={handleInfoClick} />
                    <Input label="Creative costs (monthly)" name="creativeCosts" type="number" value={inputs.creativeCosts} onChange={handleInputChange} unit="$" infoKey="creativeCosts" onInfoClick={handleInfoClick} />
                </Card>

            </div>

            {/* Output Section */}
            <div className="lg:col-span-2 space-y-6">
                <Card title="Reality Check">
                    <MetricCard title="Profit / Loss per month" value={formatCurrency(calculations.profit)} status={calculations.profitStatus} infoKey="profitLoss" onInfoClick={handleInfoClick} />
                    <Alert message={calculations.profit > 0 ? "Profitable! Your campaigns are generating a positive return." : calculations.profit === 0 ? "Break-even. You are not making or losing money." : "Losing Money. Your campaigns are costing more than they generate."} type={calculations.profitStatus} />
                    <div className="grid grid-cols-2 gap-4">
                        <MetricCard title="Platform ROAS" value={`${formatNumber(calculations.platformROAS)}x`} infoKey="platformROAS" onInfoClick={handleInfoClick} />
                        <MetricCard title="MER" value={`${formatNumber(calculations.mer)}x`} status={calculations.mer > calculations.breakEvenROAS ? 'success' : 'danger'} infoKey="mer" onInfoClick={handleInfoClick} />
                    </div>
                </Card>
                <Card title="Unit Economics">
                     <div className="grid grid-cols-2 gap-4">
                        <MetricCard title="Contribution per order" value={formatCurrency(calculations.contributionPerOrderPreAds)} infoKey="contributionPerOrder" onInfoClick={handleInfoClick} />
                        <MetricCard title="Contribution margin" value={formatPercent(calculations.contributionMargin)} infoKey="contributionMargin" onInfoClick={handleInfoClick} />
                    </div>
                </Card>
                <Card title="Break-Even Targets">
                    <MetricCard title="Break-even ROAS" value={`${formatNumber(calculations.breakEvenROAS)}x`} status="warning" infoKey="breakEvenROAS" onInfoClick={handleInfoClick} />
                    <div className="grid grid-cols-2 gap-4">
                        <MetricCard title="Maximum CPA" value={formatCurrency(calculations.maxCPA)} infoKey="maxCPA" onInfoClick={handleInfoClick} />
                        <MetricCard title="Maximum CPC" value={formatCurrency(calculations.maxCPC)} infoKey="maxCPC" onInfoClick={handleInfoClick} />
                    </div>
                </Card>
                 <Card title="Improvement Scenarios">
                    <Slider label="Increase CVR by" name="increaseCVR" value={scenario.increaseCVR} onChange={handleScenarioChange} output={`New Max CPC: ${formatCurrency(calculations.newMaxCPC)}`} min="0" max="50" step="1" />
                    <Slider label="Increase AOV by" name="increaseAOV" value={scenario.increaseAOV} onChange={handleScenarioChange} output={`New Max CPA: ${formatCurrency(calculations.newMaxCPA)}`} min="0" max="50" step="1" />
                    <Slider label="Reduce COGS by" name="reduceCOGS" value={scenario.reduceCOGS} onChange={handleScenarioChange} output={`New B/E ROAS: ${formatNumber(calculations.newBreakEvenROAS)}x`} min="0" max="20" step="1" />
                </Card>
            </div>
        </div>
        </>
    );
};

export default EcommerceCalculator;