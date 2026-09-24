export interface CalculatorMeta {
  id: string;
  slug: string;
  name: string;
  shortDesc: string;
  category: 'finance' | 'banking' | 'jobs' | 'gold' | 'tools' | 'kerala';
  icon: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
}

export interface CategoryMeta {
  id: 'finance' | 'banking' | 'jobs' | 'gold' | 'tools' | 'kerala';
  name: string;
  malayalamName: string;
  description: string;
  icon: string;
}

export const CATEGORIES: CategoryMeta[] = [
  {
    id: 'finance',
    name: 'Finance & Investments',
    malayalamName: 'ധനകാര്യം & നിക്ഷേപങ്ങൾ',
    description: 'Grow your wealth with accurate Indian tax-friendly calculators for SIP, PPF, NPS, and more.',
    icon: 'TrendingUp'
  },
  {
    id: 'banking',
    name: 'Banking & Loans',
    malayalamName: 'ബാങ്കിംഗ് & വായ്പകൾ',
    description: 'Calculate EMI, loan interest, prepayment savings, and FD/RD returns across Indian banks.',
    icon: 'Landmark'
  },
  {
    id: 'jobs',
    name: 'Salary & Employment',
    malayalamName: 'ശമ്പളം & തൊഴിൽ',
    description: 'Break down CTC into monthly in-hand take-home salary, Gratuity, and EPF under Indian labor laws.',
    icon: 'Briefcase'
  },
  {
    id: 'gold',
    name: 'Gold & Jewellery',
    malayalamName: 'സ്വർണം & ആഭരണങ്ങൾ',
    description: 'Calculate exact gold prices with hallmark purity (22K, 24K, 18K), making charges, and 3% GST.',
    icon: 'Coins'
  },
  {
    id: 'tools',
    name: 'Everyday Utility Tools',
    malayalamName: 'ദൈനംദിന യൂട്ടിലിറ്റികൾ',
    description: 'Instant calculators for GST breakdown, Percentage, Age, Date Differences, Discount, and BMI.',
    icon: 'Wrench'
  },
  {
    id: 'kerala',
    name: 'Kerala Special Corner',
    malayalamName: 'കേരള സ്പെഷ്യൽ',
    description: 'Tailored calculators for Kerala: Pavan to gram gold converter, NRI remittances, and local salary & land metrics.',
    icon: 'Palmtree'
  }
];

export const CALCULATORS: CalculatorMeta[] = [
  // 1. EMI
  {
    id: 'emi',
    slug: 'emi-calculator',
    name: 'Loan EMI Calculator',
    shortDesc: 'Calculate monthly installment, total interest, and complete repayment amortization.',
    category: 'banking',
    icon: 'Calculator',
    seoTitle: 'EMI Calculator India - Calculate Equated Monthly Installment & Interest',
    seoDescription: 'Free online EMI calculator for Indian home, car, and personal loans. Calculate monthly EMI, total interest payable, and amortization schedule instantly.',
    keywords: ['emi calculator', 'loan emi calculation', 'monthly emi india', 'sbi hdfc loan emi']
  },
  // 2. Home Loan
  {
    id: 'home-loan',
    slug: 'home-loan-emi-calculator',
    name: 'Home Loan EMI Calculator',
    shortDesc: 'Calculate home loan installments, processing charges, and tax deduction insights.',
    category: 'banking',
    icon: 'Home',
    seoTitle: 'Home Loan EMI Calculator - Housing Loan Interest & Eligibility India',
    seoDescription: 'Plan your dream home with India’s best Home Loan EMI Calculator. Get detailed monthly breakdown, interest amounts, and tax deduction estimates.',
    keywords: ['home loan emi calculator', 'housing loan india', 'sbi home loan emi', 'hdfc home loan calculator']
  },
  // 3. Personal Loan
  {
    id: 'personal-loan',
    slug: 'personal-loan-emi-calculator',
    name: 'Personal Loan EMI Calculator',
    shortDesc: 'Estimate monthly outflow for quick personal credit and emergency financing.',
    category: 'banking',
    icon: 'UserCheck',
    seoTitle: 'Personal Loan EMI Calculator India - Instant Monthly Interest Breakdown',
    seoDescription: 'Calculate your monthly personal loan EMI, interest rates from 10.5% to 24%, and total payable amount with validation and zero signup.',
    keywords: ['personal loan emi calculator', 'instant personal loan emi', 'bank personal loan calculator']
  },
  // 4. Car Loan
  {
    id: 'car-loan',
    slug: 'car-loan-emi-calculator',
    name: 'Car / Vehicle Loan Calculator',
    shortDesc: 'Plan financing for new or pre-owned vehicles with on-road down payments.',
    category: 'banking',
    icon: 'Car',
    seoTitle: 'Car Loan EMI Calculator India - Auto & Two-Wheeler Vehicle Loan',
    seoDescription: 'Calculate car loan equated monthly installment, interest cost, down payment impact, and vehicle loan tenure instantly.',
    keywords: ['car loan emi calculator', 'auto loan emi', 'bike loan emi calculator india']
  },
  // 5. Loan Prepayment
  {
    id: 'loan-prepayment',
    slug: 'loan-prepayment-calculator',
    name: 'Loan Prepayment Calculator',
    shortDesc: 'See how making part-prepayments reduces your tenure or monthly EMI.',
    category: 'banking',
    icon: 'FastForward',
    seoTitle: 'Loan Prepayment & Foreclosure Calculator - Save Lakhs in Interest',
    seoDescription: 'Calculate how much interest you save and how many years you shave off your home or personal loan with part-payments.',
    keywords: ['loan prepayment calculator', 'home loan part payment', 'loan tenure reduction calculator']
  },
  // 6. FD Calculator
  {
    id: 'fd',
    slug: 'fd-calculator',
    name: 'Fixed Deposit (FD) Calculator',
    shortDesc: 'Calculate maturity value and interest earnings on bank and post office term deposits.',
    category: 'banking',
    icon: 'PiggyBank',
    seoTitle: 'FD Calculator India - Fixed Deposit Maturity & Interest Earnings',
    seoDescription: 'Calculate Fixed Deposit maturity returns with quarterly compounding, senior citizen rates, and TDS insights for SBI, HDFC, ICICI, Post Office.',
    keywords: ['fd calculator', 'fixed deposit maturity calculator', 'sbi fd interest calculator']
  },
  // 7. RD Calculator
  {
    id: 'rd',
    slug: 'rd-calculator',
    name: 'Recurring Deposit (RD) Calculator',
    shortDesc: 'Compute maturity returns for monthly recurring savings schemes.',
    category: 'banking',
    icon: 'Layers',
    seoTitle: 'RD Calculator India - Recurring Deposit Maturity Amount',
    seoDescription: 'Find out the maturity amount of your monthly Recurring Deposit with quarterly compounding as per Indian banking guidelines.',
    keywords: ['rd calculator', 'recurring deposit calculator', 'post office rd calculator']
  },
  // 8. SIP Calculator
  {
    id: 'sip',
    slug: 'sip-calculator',
    name: 'SIP Calculator (Mutual Funds)',
    shortDesc: 'Calculate potential wealth creation through Systematic Investment Plans.',
    category: 'finance',
    icon: 'TrendingUp',
    seoTitle: 'SIP Calculator India - Mutual Fund Systematic Investment Plan Returns',
    seoDescription: 'Calculate future value of monthly SIP investments in Indian mutual funds and index funds with compounding wealth charts.',
    keywords: ['sip calculator', 'mutual fund sip returns', 'monthly sip wealth calculator']
  },
  // 9. PPF Calculator
  {
    id: 'ppf',
    slug: 'ppf-calculator',
    name: 'PPF (Public Provident Fund) Calculator',
    shortDesc: 'Calculate 15-year tax-free guaranteed returns under government PPF scheme.',
    category: 'finance',
    icon: 'ShieldCheck',
    seoTitle: 'PPF Calculator India - Public Provident Fund 15-Year Maturity',
    seoDescription: 'Check PPF maturity amount, annual tax-free interest, and tax savings under Section 80C with current Indian sovereign interest rates.',
    keywords: ['ppf calculator', 'public provident fund calculator', 'ppf maturity tax free']
  },
  // 10. NPS Calculator
  {
    id: 'nps',
    slug: 'nps-calculator',
    name: 'NPS (National Pension System) Calculator',
    shortDesc: 'Project retirement pension wealth and monthly pension annuity.',
    category: 'finance',
    icon: 'Award',
    seoTitle: 'NPS Calculator India - National Pension Scheme Wealth & Annuity',
    seoDescription: 'Estimate your retirement corpus, lumpsum withdrawal (60%), and monthly pension payout (40% annuity) with the National Pension System.',
    keywords: ['nps calculator', 'national pension scheme calculator', 'retirement pension india']
  },
  // 11. Gratuity Calculator
  {
    id: 'gratuity',
    slug: 'gratuity-calculator',
    name: 'Gratuity Calculator',
    shortDesc: 'Calculate statutory gratuity payout as per Payment of Gratuity Act, 1972.',
    category: 'jobs',
    icon: 'Gift',
    seoTitle: 'Gratuity Calculator India - Statutory Gratuity Formula & Tax Exemption',
    seoDescription: 'Calculate tax-exempt employee gratuity based on your last drawn basic salary + DA and total years of service under Indian labor law.',
    keywords: ['gratuity calculator', 'gratuity formula india', 'gratuity act 1972 calculation']
  },
  // 12. Salary / In-Hand Calculator
  {
    id: 'salary',
    slug: 'salary-calculator',
    name: 'In-Hand Salary Calculator',
    shortDesc: 'Calculate monthly take-home salary after PF, Professional Tax, and Income Tax deductions.',
    category: 'jobs',
    icon: 'Wallet',
    seoTitle: 'In-Hand Salary Calculator India - Take Home Pay from Gross CTC',
    seoDescription: 'Accurately convert your annual Gross CTC into monthly take-home in-hand pay after deducting EPF, PT, and standard deductions.',
    keywords: ['in hand salary calculator', 'take home salary calculator', 'gross to net salary india']
  },
  // 13. CTC to In-Hand Calculator
  {
    id: 'ctc-inhand',
    slug: 'ctc-inhand-calculator',
    name: 'CTC to In-Hand Salary Breakdown',
    shortDesc: 'Detailed line-item breakdown of CTC: Basic, HRA, Allowances, PF, Gratuity & TDS.',
    category: 'jobs',
    icon: 'Receipt',
    seoTitle: 'CTC to In-Hand Calculator India - Full Salary Structure Breakdown',
    seoDescription: 'Understand your Indian corporate CTC letter. Calculate employer PF, employee PF, HRA tax exemption, and true monthly bank credit.',
    keywords: ['ctc to in hand calculator', 'ctc breakdown calculator', 'cost to company to net pay']
  },
  // 14. Gold Price Calculator
  {
    id: 'gold-price',
    slug: 'gold-price-calculator',
    name: 'Gold Price & Jewellery Billing Calculator',
    shortDesc: 'Calculate total gold ornament cost with 22K/24K rate, making charges, and 3% GST.',
    category: 'gold',
    icon: 'Sparkles',
    seoTitle: 'Gold Price Calculator India - 24K, 22K, 18K Jewellery Billing & GST',
    seoDescription: 'Calculate exact jewellery bill amount including live gram rate, making charges (percentage or per gram), hallmarking fee, and 3% GST.',
    keywords: ['gold price calculator india', 'gold jewellery billing calculator', '22k gold rate with gst']
  },
  // 15. GST Calculator
  {
    id: 'gst',
    slug: 'gst-calculator',
    name: 'GST Calculator (India)',
    shortDesc: 'Calculate exclusive and inclusive GST for standard slabs (5%, 12%, 18%, 28%).',
    category: 'tools',
    icon: 'Percent',
    seoTitle: 'GST Calculator India - Add or Remove 5%, 12%, 18%, 28% GST',
    seoDescription: 'Fast, accurate Indian Goods and Services Tax calculator. Calculate SGST, CGST, and IGST breakdowns for inclusive and exclusive amounts.',
    keywords: ['gst calculator', 'gst inclusive calculator', 'gst exclusive india', 'cgst sgst calculator']
  },
  // 16. Percentage Calculator
  {
    id: 'percentage',
    slug: 'percentage-calculator',
    name: 'Percentage Calculator',
    shortDesc: 'Quickly find percentage increase, decrease, marks percentage, and discounts.',
    category: 'tools',
    icon: 'PercentCircle',
    seoTitle: 'Percentage Calculator - Percentage Increase, Decrease & Share',
    seoDescription: 'Multi-purpose percentage calculator for exams, business profit margins, markups, and everyday numerical ratios.',
    keywords: ['percentage calculator', 'percentage increase calculator', 'exam percentage calculator']
  },
  // 17. Age Calculator
  {
    id: 'age',
    slug: 'age-calculator',
    name: 'Age Calculator',
    shortDesc: 'Calculate exact age in years, months, weeks, and days from date of birth.',
    category: 'tools',
    icon: 'Calendar',
    seoTitle: 'Age Calculator - Exact Chronological Age in Years, Months, Days',
    seoDescription: 'Find your precise chronological age from Date of Birth for competitive Indian exams (UPSC, SSC, Banking) and government job eligibility.',
    keywords: ['age calculator', 'chronological age calculator', 'dob age calculator for govt exams']
  },
  // 18. Date Difference Calculator
  {
    id: 'date-difference',
    slug: 'date-difference-calculator',
    name: 'Date Difference / Duration Calculator',
    shortDesc: 'Count total days, weeks, months, or working days between two dates.',
    category: 'tools',
    icon: 'CalendarRange',
    seoTitle: 'Date Difference Calculator - Days Between Two Dates Online',
    seoDescription: 'Calculate the exact number of days, business working days, and weeks between two calendar dates for project deadlines and legal tenures.',
    keywords: ['date difference calculator', 'days between two dates', 'duration calculator']
  },
  // 19. Discount Calculator
  {
    id: 'discount',
    slug: 'discount-calculator',
    name: 'Discount & Sale Price Calculator',
    shortDesc: 'Calculate final price after flat or stacked retail discounts and sale offers.',
    category: 'tools',
    icon: 'Tag',
    seoTitle: 'Discount Calculator - Find Final Sale Price & Savings',
    seoDescription: 'Quickly calculate sale discounts, stacked percentage offers (e.g. 20% + 10%), and your total net savings during Flipkart/Amazon sales.',
    keywords: ['discount calculator', 'sale discount calculator', 'percentage off calculator']
  },
  // 20. BMI Calculator
  {
    id: 'bmi',
    slug: 'bmi-calculator',
    name: 'BMI (Body Mass Index) Calculator',
    shortDesc: 'Check your BMI classification according to WHO and Asian-Indian health criteria.',
    category: 'tools',
    icon: 'Activity',
    seoTitle: 'BMI Calculator India - Body Mass Index with Asian Indian Cutoffs',
    seoDescription: 'Calculate your BMI instantly using Asian Indian cutoff standards (lower threshold for healthy weight to reflect cardiometabolic risks).',
    keywords: ['bmi calculator india', 'body mass index asian cutoffs', 'healthy weight calculator']
  },
  // 21. Kerala Special - Pavan Gold Converter
  {
    id: 'kerala-gold',
    slug: 'kerala-gold-pavan-calculator',
    name: 'Kerala Pavan & Sovereign Gold Calculator',
    shortDesc: 'Convert Pavan (8 grams) to grams, sovereign rates, and wedding budget estimations.',
    category: 'kerala',
    icon: 'CircleDot',
    seoTitle: 'Kerala Gold Pavan Calculator - 1 Pavan (8g) Rate, Gram & Sovereign',
    seoDescription: 'Specific to Kerala jewellery market: calculate 1 Pavan (8 grams), sovereign pricing, making charges, and marriage jewellery budget.',
    keywords: ['kerala pavan rate', '1 pavan how many grams', 'kerala gold calculator', 'sovereign rate today']
  }
];

export const ARTICLES = [
  {
    slug: 'how-to-calculate-home-loan-emi-india',
    title: 'How Home Loan EMI is Calculated in India: Formula, Amortization, and Prepayment Hacks',
    category: 'banking',
    readTime: '6 min read',
    date: '2026-09-20',
    summary: 'A comprehensive guide explaining the reducing balance method used by Indian banks (SBI, HDFC, ICICI) and how part-payments reduce total interest outflow by lakhs of rupees.',
    content: `
### Understanding the Equated Monthly Installment (EMI)

When you take a home loan in India, your bank doesn't charge simple interest. Instead, they calculate EMI using the reducing balance method. 

The standard mathematical formula used across Indian commercial banks is:

**EMI = [P x R x (1+R)^N] / [(1+R)^N - 1]**

Where:
- **P** = Principal Loan Amount
- **R** = Monthly Interest Rate (Annual interest rate divided by 12 and then by 100)
- **N** = Total loan tenure in months (e.g., 20 years = 240 months)

### Why Most Interest is Paid in the First 5-7 Years

Because EMI remains constant while your principal reduces, in the early years of your home loan, up to 70% to 80% of each EMI goes solely toward servicing the interest. Only a small fraction chips away at the principal.

### Prepayment Strategy: The Game Changer
Even a single extra EMI paid every year, or a 5% prepayment made annually, can reduce a 20-year home loan down to 13–14 years, saving between ₹12,00,000 to ₹25,00,000 in compound interest.

Use our free [Home Loan EMI Calculator](/calculators/home-loan-emi-calculator) and [Loan Prepayment Calculator](/calculators/loan-prepayment-calculator) to simulate your exact bank statements.
    `
  },
  {
    slug: 'sip-vs-lumpsum-mutual-funds-guide',
    title: 'SIP vs Lumpsum Mutual Fund Investing in India: Compounding and Rupee Cost Averaging',
    category: 'finance',
    readTime: '5 min read',
    date: '2026-09-18',
    summary: 'Why Systematic Investment Plans (SIP) beat market timing for Indian salaried individuals, backed by 15-year Nifty 50 rolling return data.',
    content: `
### What is SIP and Why Does it Work?

A Systematic Investment Plan (SIP) allows you to invest a fixed amount regularly (monthly or weekly) into a mutual fund scheme. Instead of waiting for market dips, SIP enforces strict financial discipline.

### Benefits of Rupee Cost Averaging
In volatile Indian stock markets, your fixed SIP buys more units when prices fall and fewer units when prices surge. Over 5 to 10 years, this automatically brings down your average cost per unit without needing you to predict market tops or bottoms.

### The Power of 12% to 14% Long-Term Compounding
- A monthly SIP of **₹5,000** for 20 years at a historical 12% return yields over **₹49.9 Lakhs** on an invested principal of just ₹12 Lakhs.
- Increasing your SIP by just 10% annually (Step-up SIP) can more than double your terminal corpus.

Test your personal wealth goals with our instant [SIP Calculator](/calculators/sip-calculator).
    `
  },
  {
    slug: 'gold-buying-guide-hallmarking-gst-making-charges',
    title: 'Buying Gold Jewellery in India: Hallmark HUID, 3% GST, and Making Charges Explained',
    category: 'gold',
    readTime: '7 min read',
    date: '2026-09-15',
    summary: 'Never overpay for gold jewellery again. Understand BIS 6-digit HUID hallmarks, wastage (VA), making charges, and the compulsory 3% GST on billing.',
    content: `
### The Gold Jewellery Billing Formula in India

When you purchase jewellery from stores in Kerala or anywhere in India, the invoice follows this mandatory formula:

**Final Bill = [(Gold Weight in grams x Current Gram Rate) + Making Charges / Wastage] + 3% GST + ₹45 Hallmarking Fee**

### What Purity to Choose?
- **24 Karat (999):** 99.9% pure gold. Too soft for intricate jewellery; ideal for bullion coins and minted bars.
- **22 Karat (916):** 91.6% pure gold alloyed with copper/silver for strength. The standard for traditional Indian & Kerala bridal jewellery.
- **18 Karat (750):** 75.0% pure gold. Ideal for modern diamond-studded jewellery.

### Verify the 6-Digit Alphanumeric HUID
Under BIS standards, every hallmarked piece must have a laser-engraved 6-digit HUID (Hallmark Unique Identification). You can verify this via the official BIS Care mobile app.

Check your upcoming jewellery bills in seconds with our [Gold Price Calculator](/calculators/gold-price-calculator) and [Kerala Pavan Gold Calculator](/calculators/kerala-gold-pavan-calculator).
    `
  },
  {
    slug: 'understanding-ctc-vs-in-hand-salary-india',
    title: 'CTC vs In-Hand Salary Explained: EPF, Gratuity, Professional Tax, and Income Tax',
    category: 'jobs',
    readTime: '6 min read',
    date: '2026-09-12',
    summary: 'Why your monthly bank credit is 20% to 30% lower than your offer letter CTC. Complete breakdown of Employer PF, Gratuity reserve, and standard deductions.',
    content: `
### The Myth of CTC (Cost to Company)

Your offer letter CTC is the total expense your company incurs to keep you employed for a year. It includes non-cash items, deferred benefits, and statutory employer contributions that never reach your bank account each month.

### Components that Reduce In-Hand Pay:
1. **Employer EPF (12% of Basic):** Mandated by EPFO, part of CTC but deposited directly into retirement provident funds.
2. **Employee EPF (12% of Basic):** Deducted from your gross earnings.
3. **Gratuity Reserve (4.81% of Basic):** Companies accrue this for long-term loyalty (payable only after 5 continuous years of service).
4. **Professional Tax (PT):** State-level tax (typically ₹200 to ₹2,500/year depending on state laws like Kerala, Maharashtra, Karnataka).
5. **Income Tax (TDS):** Deducted under New Tax Regime or Old Tax Regime depending on declarations.

Calculate your exact monthly take-home pay using our [In-Hand Salary Calculator](/calculators/salary-calculator) and [CTC Breakdown Calculator](/calculators/ctc-inhand-calculator).
    `
  }
];
