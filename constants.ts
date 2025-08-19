
import { EcommerceState, LeadGenState, AgencyState } from './types';

export const initialEcommerceState: EcommerceState = {
  aov: 120,
  ordersPerMonth: 500,
  cogsPercentage: 30,
  shippingSubsidy: 5,
  paymentProcessingType: 'standard',
  paymentProcessingCustomPercent: 2.9,
  paymentProcessingCustomFee: 0.30,
  returnsAllowance: 5,
  returnsAllowanceType: 'percentage',
  pickPackOps: 3,
  monthlyAdSpend: 10000,
  cpc: 2.50,
  conversionRate: 2,
  agencyFeeType: 'percentage',
  agencyPercentage: 15,
  agencyFlatFee: 0,
  setupFees: 0,
  toolsSoftware: 250,
  creativeCosts: 500,
};

export const initialLeadGenState: LeadGenState = {
  cpc: 3.00,
  landingPageConversionRate: 5,
  leadToSaleCloseRate: 10,
  avgSaleValue: 2000,
  grossMarginPercentage: 50,
  monthlyAdSpend: 5000,
  agencyFees: 1000,
  toolsSoftware: 150,
  creativeLandingPages: 300,
};


export const initialAgencyState: AgencyState = {
    monthlyAdSpend: 20000,
    monthlyRevenueFromAds: 80000,
    contributionMargin: 60,
    agencyFeeType: 'hybrid',
    basePercentage: 10,
    monthlyRetainer: 1000,
    setupFees: 500,
    minimumCommitment: 3,
    additionalToolCosts: 200,
    brandRoas: 15,
    nonBrandRoas: 3.5,
    overallMer: 3,
};
