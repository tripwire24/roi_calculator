import { InfoContent } from './types';

export const infoContentData: Record<string, InfoContent> = {
  // E-commerce Metrics
  aov: {
    title: 'Average Order Value (AOV)',
    explanation: 'AOV measures the average total of every order placed with a business over a defined period. It\'s a crucial metric for understanding customer purchasing habits. Increasing your AOV is one of the most effective ways to boost revenue without needing more traffic.',
    example: 'If your store has $10,000 in revenue from 100 orders in a month, your AOV is $100 ($10,000 / 100).',
  },
  ordersPerMonth: {
    title: 'Orders Per Month',
    explanation: 'This is the total count of individual orders your business receives in a typical month. It directly reflects the volume of transactions and is a primary driver of revenue.',
    example: 'If you sell 500 products in a month through 400 separate transactions, your Orders Per Month is 400.',
  },
  cogsPercentage: {
    title: 'Cost of Goods Sold (COGS) %',
    explanation: 'COGS represents the direct costs of producing the goods sold by a company. This includes the cost of the materials and labor directly used to create the good. It is expressed as a percentage of your revenue.',
    example: 'If a product sells for $100 and its materials and production cost you $30, your COGS is 30%.',
  },
  shippingSubsidy: {
    title: 'Shipping Subsidy Per Order',
    explanation: 'This is the portion of the shipping cost that your business absorbs, rather than passing on to the customer. Offering free or subsidized shipping can increase conversion rates but directly impacts your profit margin per order.',
    example: 'If the actual shipping cost is $12 and you charge the customer a flat rate of $5, your shipping subsidy is $7.',
  },
  paymentProcessing: {
    title: 'Payment Processing Fees',
    explanation: 'These are fees charged by payment gateways (like Stripe, PayPal, or Shopify Payments) for each transaction. They are typically a percentage of the transaction value plus a small fixed fee.',
    example: 'For a $100 order, a standard fee of 2.9% + $0.30 would result in a $3.20 charge ($2.90 + $0.30).',
  },
  returnsAllowance: {
    title: 'Returns/Warranty Allowance',
    explanation: 'This is an estimated cost per order set aside to cover potential returns, refunds, or warranty claims. Factoring this in gives a more realistic view of your net profit per order.',
    example: 'If you expect 5% of orders to be returned and the average loss on a return is $40, you might set aside $2 per order (5% of $40).',
  },
  pickPackOps: {
    title: 'Pick/Pack/Ops Per Order',
    explanation: 'This covers the operational costs associated with fulfilling an order, including warehouse labor for picking items, packing materials, and other fulfillment overhead.',
    example: 'If it costs $1 for packing materials and $2 in labor to prepare an order for shipment, your Pick/Pack cost is $3.',
  },
  monthlyAdSpend: {
    title: 'Monthly Ad Spend',
    explanation: 'This is the total amount of money you spend directly on advertising platforms like Google Ads, Facebook Ads, or TikTok Ads within a single month.',
    example: 'If your daily budget on Facebook is $100 and Google is $200, your monthly ad spend is approximately $9,000 (($100 + $200) * 30).',
  },
  cpc: {
    title: 'Cost Per Click (CPC)',
    explanation: 'CPC is the amount you pay for a single click on your ad. It is a fundamental metric in pay-per-click (PPC) advertising and varies widely by industry, platform, and keyword competitiveness.',
    example: 'If you spend $500 on a campaign and get 200 clicks, your average CPC is $2.50 ($500 / 200).',
  },
  conversionRate: {
    title: 'Conversion Rate (CVR)',
    explanation: 'The percentage of users who take a desired action. For e-commerce, this is usually the percentage of website visitors (or ad clicks) that result in a purchase.',
    example: 'If 1,000 people click your ad and 20 of them make a purchase, your conversion rate is 2% (20 / 1,000).',
  },
  agencyFee: {
    title: 'Agency Fee Structure',
    explanation: 'This defines how you compensate your marketing agency. Common models include a percentage of ad spend, a flat monthly retainer, or a hybrid of both. This is a significant cost that must be factored into your ROI.',
    example: 'An agency charging 15% on a $10,000 ad spend would have a fee of $1,500.',
  },
  setupFees: {
    title: 'Setup/Audit Fees',
    explanation: 'These are one-time fees charged by agencies for initial account setup, audits, or campaign launches. For accurate monthly calculation, you should amortize this cost over the expected lifetime of the work (e.g., divide a $1200 setup fee by 12 months to get $100/month).',
    example: 'A $600 one-time audit fee, spread over 6 months, adds $100 to your monthly costs.',
  },
  toolsSoftware: {
    title: 'Tools & Software',
    explanation: 'The monthly subscription costs for any third-party marketing tools used for analytics, reporting, design, landing pages, or automation.',
    example: 'Costs could include subscriptions for tools like Semrush ($120/mo), a landing page builder ($80/mo), or a reporting dashboard ($50/mo).',
  },
  creativeCosts: {
    title: 'Creative Costs',
    explanation: 'The monthly expense for creating ad assets, such as images, videos, and copywriting. This can be a fee paid to freelancers, an agency, or the amortized salary of an in-house designer.',
    example: 'If you pay a video editor $500 per month for new ad videos, that is your monthly creative cost.',
  },
  // E-commerce Output Metrics
  profitLoss: {
    title: 'Profit / Loss Per Month',
    explanation: 'This is your true bottom line. It calculates your total monthly revenue and subtracts ALL associated costs: COGS, operations, ad spend, agency fees, and other marketing expenses. A positive number means you are profitable.',
    example: 'If your revenue is $50k, and your total costs (COGS, shipping, ads, fees) are $45k, your monthly profit is $5,000.',
  },
  platformROAS: {
    title: 'Platform ROAS',
    explanation: 'Return On Ad Spend, as reported by the ad platform (e.g., Google Ads). It is calculated as (Revenue / Ad Spend). This metric is often misleadingly high because it does not account for COGS, fees, or any other business costs.',
    example: 'If you spend $10,000 on ads and the platform reports $40,000 in revenue, your Platform ROAS is 4x.',
  },
  mer: {
    title: 'Marketing Efficiency Ratio (MER)',
    explanation: 'MER provides a high-level view of the effectiveness of all marketing efforts combined. It is calculated as (Total Revenue / Total Marketing Costs). Unlike ROAS, it includes all marketing-related expenses (fees, tools, creative) in the denominator, giving a more accurate picture of profitability.',
    example: 'If your total revenue is $60,000 and your total marketing spend (ads + fees + tools) is $15,000, your MER is 4x.',
  },
  contributionPerOrder: {
    title: 'Contribution Per Order (Pre-Ads)',
    explanation: 'This is the profit generated from a single order *before* accounting for advertising costs. It is calculated as (AOV - COGS - Ops Costs). It tells you how much money you have available from each sale to pay for customer acquisition and generate a profit.',
    example: 'With an AOV of $100, COGS of $30, and shipping/ops of $10, your contribution per order is $60.',
  },
  contributionMargin: {
    title: 'Contribution Margin',
    explanation: 'The percentage of revenue from each sale that is available to cover marketing costs and generate profit. It is calculated as (Contribution Per Order / AOV). A higher margin means you can afford to spend more to acquire a customer.',
    example: 'If your Contribution Per Order is $60 on an AOV of $100, your Contribution Margin is 60%.',
  },
  breakEvenROAS: {
    title: 'Break-Even ROAS',
    explanation: 'This is the most critical metric for profitability. It tells you the minimum ROAS you must achieve on an ad platform to cover ALL your costs (product, ops, AND all marketing fees). If your Platform ROAS is below this number, you are losing money.',
    example: 'If your contribution margin is 50%, your Break-Even ROAS might be 2.5x. This means any platform ROAS below 2.5x is unprofitable.',
  },
  maxCPA: {
    title: 'Maximum CPA (Cost Per Acquisition)',
    explanation: 'The absolute most you can afford to pay to acquire a single customer (or order) and still break even. It is determined by your contribution margin and fixed marketing costs. Your actual CPA must be below this number to be profitable.',
    example: 'If your contribution per order is $60, your Max CPA is $60. Any ad campaign with a CPA over $60 will lose money.',
  },
  maxCPC: {
    title: 'Maximum CPC (Cost Per Click)',
    explanation: 'Based on your Maximum CPA and your Conversion Rate, this calculates the most you can afford to pay for a single click and still break even. It helps you set smart bids in your ad campaigns.',
    example: 'If your Max CPA is $60 and your CVR is 2%, your Max CPC is $1.20 ($60 * 2%). Bidding above $1.20 per click will be unprofitable.',
  },

  // Lead-Gen Metrics
  landingPageCVR: {
    title: 'Landing Page CVR',
    explanation: 'The Conversion Rate of your landing page. It measures the percentage of visitors who successfully complete the desired action, such as filling out a form to become a lead.',
    example: 'If 2,000 people visit your landing page and 100 people fill out the form, your CVR is 5% (100 / 2,000).',
  },
  leadToSaleCloseRate: {
    title: 'Lead-to-Sale Close Rate',
    explanation: 'The percentage of qualified leads that your sales team successfully converts into paying customers. This metric measures the effectiveness of your sales process.',
    example: 'If your sales team receives 80 leads in a month and closes 8 of them, your close rate is 10%.',
  },
  avgSaleValue: {
    title: 'Average Sale Value',
    explanation: 'The average revenue generated from a single closed sale. For subscription businesses, this might be the lifetime value (LTV) of a customer.',
    example: 'If you closed 3 deals for $1,500, $2,000, and $2,500, your average sale value is $2,000.',
  },
  grossMarginPercentage: {
    title: 'Gross Margin %',
    explanation: 'For lead generation, this represents the percentage of profit in your sale value after accounting for any direct costs associated with delivering the service or product.',
    example: 'If your service costs $5,000 and your direct costs to deliver it are $2,000, your gross profit is $3,000 and your gross margin is 60%.',
  },
  currentCPL: {
    title: 'Current Cost Per Lead (CPL)',
    explanation: 'The total cost to acquire a single lead from your advertising efforts. It is calculated as (Cost Per Click / Landing Page Conversion Rate).',
    example: 'If your CPC is $3.00 and your landing page CVR is 5%, your CPL is $60 ($3.00 / 0.05).',
  },
  breakEvenCPL: {
    title: 'Break-Even CPL',
    explanation: 'The maximum amount you can afford to pay for a lead without losing money. It is determined by your sale value, gross margin, and lead-to-sale close rate.',
    example: 'If a sale is worth $1,000 in profit and you close 10% of leads, your Break-Even CPL is $100 ($1,000 * 10%).',
  },
  netMarketingProfit: {
    title: 'Net Marketing Profit',
    explanation: 'The final profit from your lead generation efforts after all marketing costs are subtracted from the total gross profit generated from closed sales.',
    example: 'If you generated $20,000 in gross profit from sales and spent $8,000 on marketing, your net marketing profit is $12,000.',
  },
  netMarketingROI: {
    title: 'Net Marketing ROI',
    explanation: 'The Return on Investment for your marketing activities. It calculates the total return generated by your marketing spend. It is calculated as (Net Marketing Profit / Total Marketing Cost).',
    example: 'With $12,000 in net profit on an $8,000 marketing spend, your ROI is 150% ($12,000 / $8,000).',
  },

  // Agency Analyzer Metrics
  agencyContributionMargin: {
    title: 'Contribution Margin',
    explanation: 'The percentage of revenue left after subtracting Cost of Goods Sold (COGS) and other variable operational costs. This margin is what is available to cover all marketing expenses, overhead, and profit.',
    example: 'If your revenue is $100k and your COGS/ops costs are $40k, your contribution is $60k, and your margin is 60%.',
  },
  brandRoas: {
    title: 'Brand Campaign ROAS',
    explanation: 'Return On Ad Spend for campaigns that target your own brand name and keywords. This ROAS is naturally very high because these users are already looking for you. It can inflate overall performance metrics.',
    example: 'A user searches "YourCompanyName" and clicks your ad. The resulting ROAS is Brand ROAS.',
  },
  nonBrandRoas: {
    title: 'Non-Brand Campaign ROAS',
    explanation: 'Return On Ad Spend for campaigns targeting generic keywords or audiences who are not yet familiar with your brand. This is the true measure of an agency\'s ability to drive new growth and acquire new customers.',
    example: 'A user searches "red running shoes," clicks your ad, and buys. The resulting ROAS is Non-Brand ROAS.',
  },
  agencyOverallMer: {
    title: 'Overall MER',
    explanation: 'Marketing Efficiency Ratio measures the revenue from ALL marketing channels against the marketing spend from ALL channels. It helps to understand if the business is truly profitable when looking at the entire marketing picture.',
    example: 'If total company revenue is $200k and total marketing spend is $40k, your MER is 5x.',
  },
  totalAgencyCost: {
    title: 'Total Monthly Agency Cost',
    explanation: 'The complete monthly cost of your agency relationship, including their management fee, plus any additional costs for tools, setup fees, or other services billed through them.',
    example: 'A $2,000 retainer + $200 for a reporting tool + $100 amortized setup fee = $2,300 total cost.',
  },
  breakEvenRoasIncrease: {
    title: 'Break-Even ROAS Increase',
    explanation: 'This shows how much higher your Platform ROAS needs to be just to cover the cost of hiring the agency. It quantifies the performance lift the agency must achieve for their fee to be worthwhile.',
    example: 'If your base B/E ROAS is 2.5x and the agency fees increase it to 3.0x, the agency must deliver at least a 3.0x ROAS for you to not lose money.',
  },
};
