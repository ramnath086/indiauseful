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
    description: 'Tailored calculators for Kerala: 1 Pavan (8 grams) sovereign gold rate, wedding jewellery estimates, making charges, and 3% GST.',
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
    seoTitle: 'EMI Calculator India - Monthly Installment & Interest',
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
    seoTitle: 'Home Loan EMI Calculator India - Interest & Eligibility',
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
    seoTitle: 'Personal Loan EMI Calculator India - Monthly Interest Breakdown',
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
    seoTitle: 'Car Loan EMI Calculator India - Auto & Two-Wheeler Loan',
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
    seoTitle: 'Loan Prepayment Calculator - Save Interest',
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
    seoTitle: 'FD Calculator India - Maturity & Interest Earnings',
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
    seoTitle: 'RD Calculator India - Maturity Amount',
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
    seoTitle: 'SIP Calculator India - Mutual Fund SIP Returns',
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
    seoTitle: 'PPF Calculator India - 15-Year Maturity',
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
    seoTitle: 'NPS Calculator India - Pension Wealth & Annuity',
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
    seoTitle: 'Gratuity Calculator India - Formula & Tax Exemption',
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
    seoTitle: 'In-Hand Salary Calculator India - Take Home Pay',
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
    seoTitle: 'CTC to In-Hand Calculator India - Salary Breakdown',
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
    seoTitle: 'Gold Price Calculator India - Jewellery Billing & GST',
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
    seoTitle: 'GST Calculator India - Add/Remove GST',
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
    seoTitle: 'Percentage Calculator - Increase, Decrease & Share',
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
    seoTitle: 'Age Calculator - Exact Age in Years, Months, Days',
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
    seoTitle: 'Date Difference Calculator - Days Between Dates',
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
    seoTitle: 'Discount Calculator - Final Price & Savings',
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
    seoTitle: 'BMI Calculator India - Body Mass Index Asian Cutoffs',
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
    seoTitle: 'Kerala Gold Pavan Calculator - 1 Pavan Rate & Sovereign',
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

### A Worked Example You Can Reproduce

Take a housing loan of **₹50,00,000 at 8.5% for 20 years**:

- Monthly EMI: approximately **₹43,391**
- Total repaid over 240 months: approximately **₹1,04,13,840**
- Interest component of that total: approximately **₹54,13,840**

Notice that the interest is larger than the amount borrowed. That single fact explains why home loans reward careful tenure selection and early prepayment more than almost any other retail borrowing decision.

### How Much Difference Does the Tenure Make?

Keeping the rate fixed at 9% and borrowing ₹25,00,000, the tenure alone changes the outcome substantially:

- **15 years:** EMI about ₹25,357, total interest about ₹20,64,260
- **20 years:** EMI about ₹22,493, total interest about ₹28,98,320
- **25 years:** EMI about ₹20,980, total interest about ₹37,94,000

Stretching from 15 to 25 years lowers the monthly payment by roughly ₹4,400 but adds more than ₹17 lakh of interest. Choose a tenure by asking whether the lower installment buys you enough monthly relief to justify that extra cost.

### How Much Difference Does the Rate Make?

Keeping the tenure at 20 years and borrowing ₹25,00,000:

- **At 8%:** EMI about ₹20,911, total interest about ₹25,18,640
- **At 9%:** EMI about ₹22,493, total interest about ₹28,98,320
- **At 10%:** EMI about ₹24,126, total interest about ₹32,90,240

Each percentage point of rate adds roughly ₹2,000 to the monthly EMI and around ₹3.7 lakh to the lifetime interest on this loan. This is why negotiating even 0.25% off a home loan rate is worth real money over two decades.

### Floating Rates and What a "Reset" Actually Does

Most Indian home loans are floating rate and linked to an external benchmark, commonly the repo rate under the External Benchmark Lending Rate (EBLR) framework. When the benchmark moves:

- Lenders can **change your EMI** while keeping the remaining tenure, or
- Keep the EMI unchanged and **extend or shorten the tenure**.

Both responses have consequences. A tenure extension raises total interest without changing your monthly outgo, so it is easy to miss. When you receive a reset notice, check which of the two the lender has applied and confirm the new amortization schedule in writing.

### Reading the Sanction Letter Before You Sign

The EMI is only part of the cost. Look specifically for:

- **Processing and documentation fees**, and whether they are a flat amount or a percentage of the sanction.
- **Pre-EMI arrangements** on an under-construction property, where you pay interest only until full disbursement.
- **Bundled insurance**, which is sometimes added to the loan amount and then attracts interest for the whole tenure.
- **Prepayment and foreclosure terms**, including any charges applicable to your loan type.
- **Reset frequency** on a floating loan, which determines how quickly a benchmark change reaches your EMI.

### Why Prepaying Early Beats Prepaying Later

Interest is charged on the outstanding balance, so a rupee of principal removed in year three saves interest on that rupee for roughly seventeen more years. The same rupee prepaid in year fifteen saves interest for only five.

Consider a ₹40,00,000 loan at 8.75% for 20 years with a single **₹2,00,000 prepayment after 3 years**, applied to reduce the tenure:

- Interest saved: approximately **₹6,11,721**
- Loan closes about **22 months early** (roughly 1.8 years)

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

### Rupee Cost Averaging, With Actual Numbers

The benefit is easier to see with a small example. Suppose you invest **₹3,000 every month** and the scheme's net asset value (NAV) moves through four months like this:

- Month 1 — NAV ₹30: your ₹3,000 buys 100.00 units
- Month 2 — NAV ₹25: your ₹3,000 buys 120.00 units
- Month 3 — NAV ₹20: your ₹3,000 buys 150.00 units
- Month 4 — NAV ₹25: your ₹3,000 buys 120.00 units

You invested ₹12,000 and accumulated **490 units**, which is an average cost of about **₹24.49 per unit**. The average NAV across those four months was ₹25.00, so your average purchase cost sits below the average price, purely because the fixed amount bought more units when the price was low.

Now compare two investors over the same four months:

- The **SIP investor** holds 490 units, worth ₹12,250 at the final NAV of ₹25.
- An investor who put the whole **₹12,000 in at the first month's NAV of ₹30** holds 400 units, worth ₹10,000 at the same final NAV.

The illustration shows the mechanism, not a promise. In a market that rises steadily without falling, the lump sum invested earlier would have done better, because SIP keeps part of your money in cash for longer.

### Why the Final Years Matter More Than the Early Ones

A SIP corpus is most exposed to the market in its last few years, when the balance is largest. A sharp fall in year 19 of a 20-year plan can remove more value than a fall in year 2, even though the earlier fall made your monthly installment buy more units. This is why long-term investors often reduce risk gradually as a goal approaches, rather than staying fully in equities until the final month.

### Level SIP vs Step-Up SIP

Most people can increase their investment as income grows, and that single habit changes the outcome more than most fund selection decisions. Comparing a **₹10,000 monthly SIP over 20 years at an assumed 12%**:

- **Level SIP:** final corpus of about **₹99,91,479** on ₹24,00,000 invested.
- **Step-up SIP increasing 10% each year:** final corpus of about **₹1,98,88,715** on ₹68,73,000 invested, with the monthly installment rising to roughly ₹61,159 by the final year.

The step-up plan contributes far more money, which is why the corpus is larger. It is not free outperformance; it is a bigger commitment sustained over time. The [SIP Calculator](/calculators/sip-calculator) models a level installment, so use it to sanity-check the base case before layering a step-up on top.

### What the Projection Deliberately Leaves Out

A gross projection overstates what you actually receive. Before comparing the number with a goal, account for:

- **Expense ratio:** charged by the scheme every year on your corpus, and it compounds against you.
- **Exit load:** payable if you redeem within the scheme's specified period.
- **Capital gains tax:** payable on redemption, at rates that depend on the scheme type and holding period in force at that time.
- **Inflation:** a corpus that looks comfortable today buys less in twenty years.

A projection is a planning aid, not a forecast. The assumed return is the single biggest variable in the result, so it is worth testing a lower figure and checking whether the goal still works.

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
Under BIS standards, every hallmarked piece must have a laser-engraved 6-digit HUID (Hallmark Unique Identification). A complete hallmark carries three pieces of information on the piece itself:

- The **BIS logo**, showing the article was assayed at a BIS-recognised centre.
- The **purity declaration**, expressed in carat and fineness, such as 22K and 916.
- The **6-character alphanumeric HUID**, which is unique to that individual article.

You can verify this via the official BIS Care mobile app. If a piece carries no HUID, or the purity marks do not match what you are being charged for, that is a reason to ask questions before paying.

### A Full Bill, Line by Line

Here is what the standard billing formula produces for a typical purchase, using a 22K rate of ₹6,800 per gram:

- **10 grams of 22K gold** at ₹6,800 per gram = **₹68,000** metal value
- **Making charges at 12%** of the metal value = **₹8,160**
- **Hallmarking fee** = **₹45**
- **Pre-tax total** = **₹76,205**
- **GST at 3%** on that total = **₹2,286**
- **Final bill** = **₹78,491**

Check two things on a real invoice. First, whether GST was applied to the making charges as well as the metal, because it applies to the whole pre-tax amount. Second, whether the per-gram rate matches the rate in force on the purchase date, since rates move daily.

### Making Charges, Wastage and Stone Charges Are Three Different Things

These are frequently conflated, and the confusion is usually expensive:

- **Making charges** pay for labour, design and finishing. On machine-made chains and bangles they are typically low; on handcrafted or antique-finish pieces they can be very high.
- **Wastage** or value addition is a percentage some jewellers add to account for metal lost during manufacturing. It appears as a separate line and is often the line with the most negotiating room.
- **Stone and diamond charges** are billed separately from the gold weight, and the stones are generally not part of the gold value you get back on resale.

Ask for all three to be quoted separately in writing before you commit. A lower headline rate per gram can easily be the more expensive purchase once wastage and making charges are added.

### Pavan, Sovereign and Tola Are Not the Same Unit

In Kerala and much of South India, gold is discussed in **pavan**, where 1 pavan equals exactly **8 grams** of 22K gold, and the same unit is called a sovereign. In some northern markets, quotes use the **tola**, which is about **11.66 grams**. A rate quoted per tola is therefore not comparable with a rate quoted per pavan, and comparing them directly can overstate or understate a price by nearly half.

### Exchange, Buy-Back and the Deduction Nobody Mentions

When you exchange old gold, jewellers normally apply a **purity deduction** and a **melting loss** before crediting you for the metal. The practical consequences are:

- Old ornaments often do not get credited at the full prevailing 22K rate.
- Stones and enamel in the old piece are removed from the weight.
- Without the original invoice, some jewellers apply a larger deduction.

Keep invoices for major purchases. They are the evidence of what you bought and at what purity, and they matter at resale far more than the packaging does.

### Why the Same 22K Rate Differs Between Shops

Bullion rates are influenced by international prices, import duty and local demand, and city-level associations publish reference rates that member jewellers follow. Because of this, the per-gram rate, making charges and wastage can each differ between two shops on the same day. Compare all three numbers rather than only the advertised rate.

### A Short Checklist Before You Pay

- Confirm the purity and the fineness mark on the article, not just on the tag.
- Check that the weight billed matches the weight shown on the piece.
- Ask for making charges and any wastage as separate figures.
- Confirm the hallmarking fee and whether GST has been applied to the full pre-tax total.
- Keep the invoice; it is your record of purity, weight and price.

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

### A Worked Example

Take a CTC of **₹9,00,000** with a **₹50,000 annual variable component** and **₹200 monthly professional tax**:

- Assumed basic pay at 40% of CTC: **₹3,60,000** a year
- Employer PF at 12% of monthly basic, subject to the wage ceiling used in the model: about **₹1,800** a month
- Gratuity reserve at 4.81% of monthly basic: about **₹1,443** a month
- Fixed monthly gross after those two CTC costs: about **₹67,590**
- Less employee PF and professional tax: in-hand of about **₹65,590**

That is roughly **73% of CTC** reaching the bank each month, before any income tax is deducted. The gap is not a deduction from your salary; most of it is money the employer spends on your behalf.

### Where the Employer's PF Contribution Actually Goes

The employer's 12% is not a single deposit. Under EPFO rules, a portion is diverted to the Employees' Pension Scheme, with the balance going to the provident fund, and the pension diversion is generally computed on basic pay up to the statutory wage ceiling rather than on your entire basic.

Two practical consequences:

- If your basic pay is well above the ceiling, the effective retirement accrual is lower than 12% of your basic, and the rest of the employer contribution above the ceiling typically flows to the provident fund.
- A structure with a lower basic pay reduces both your PF accrual and the employer's, which increases monthly cash but shrinks retirement savings.

### The Regime Choice Changes TDS, Not Structure

Choosing between the old and new tax regimes affects how much tax is deducted at source and which deductions you can claim. It does not change the structure of the offer: employer PF, the gratuity reserve and the variable component behave exactly the same way in either regime. Evaluate the structure first, then the tax position on top of it.

### Comparing Two Offers Properly

Two offers with the same CTC can deliver noticeably different monthly cash. Compare these items side by side:

- **Fixed versus variable split.** A high variable share looks good on paper but is conditional on performance and company results.
- **Basic pay percentage.** A higher basic increases PF and gratuity accrual but lowers monthly cash.
- **PF on full basic or on the ceiling.** Employers differ, and this alone changes the monthly figure materially.
- **Joining bonus and clawback.** A bonus recoverable if you leave within a stated period is not really fixed compensation.
- **ESOPs and vesting.** Valuable, but the value and the timing depend on vesting schedules and future events.
- **Notice period and buyout terms.** These affect your ability to switch later.
- **Insurance and benefits.** Employer-provided cover is part of the cost to company but never appears as cash.

### Why Your First Payslip Can Differ From the Estimate

The first month rarely matches a clean calculation. Common reasons:

- Joining mid-month, so salary is paid pro rata for days worked.
- One-time deductions such as notice-period recovery, canteen, or a joining kit.
- Provident fund starting from a different month or on a different basic than you assumed.
- Tax deducted without declarations in place yet, which corrects once you submit them.

Treat the calculator as the steady-state estimate, and give the first two or three payslips time to settle before drawing conclusions.

Calculate your exact monthly take-home pay using our [In-Hand Salary Calculator](/calculators/salary-calculator) and [CTC Breakdown Calculator](/calculators/ctc-inhand-calculator).
    `
  }
];
