export type Tab = 'ecommerce' | 'leadgen' | 'agency';

export interface InfoContent {
  title: string;
  explanation: string;
  example: string;
}

export interface EcommerceState {
  aov: number | '';
  ordersPerMonth: number | '';
  cogsPercentage: number | '';
  shippingSubsidy: number | '';
  paymentProcessingType: 'standard' | 'custom_percent' | 'flat_fee';
  paymentProcessingCustomPercent: number | '';
  paymentProcessingCustomFee: number | '';
  returnsAllowance: number | '';
  returnsAllowanceType: 'amount' | 'percentage';
  pickPackOps: number | '';
  monthlyAdSpend: number | '';
  cpc: number | '';
  conversionRate: number | '';
  agencyFeeType: 'none' | 'percentage' | 'flat' | 'hybrid';
  agencyPercentage: number | '';
  agencyFlatFee: number | '';
  setupFees: number | '';
  toolsSoftware: number | '';
  creativeCosts: number | '';
}

export interface LeadGenState {
  cpc: number | '';
  landingPageConversionRate: number | '';
  leadToSaleCloseRate: number | '';
  avgSaleValue: number | '';
  grossMarginPercentage: number | '';
  monthlyAdSpend: number | '';
  agencyFees: number | '';
  toolsSoftware: number | '';
  creativeLandingPages: number | '';
}

export interface AgencyState {
    monthlyAdSpend: number | '';
    monthlyRevenueFromAds: number | '';
    contributionMargin: number | '';
    agencyFeeType: 'percentage' | 'flat' | 'hybrid';
    basePercentage: number | '';
    monthlyRetainer: number | '';
    setupFees: number | '';
    minimumCommitment: number | '';
    additionalToolCosts: number | '';
    brandRoas: number | '';
    nonBrandRoas: number | '';
    overallMer: number | '';
}