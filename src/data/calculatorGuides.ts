/**
 * Per-calculator explanatory content.
 *
 * Each guide is written for one specific tool: what it computes, the maths it
 * applies, a worked example using the same arithmetic as the widget, the
 * assumptions behind the numbers, where the estimate stops being reliable, and
 * what people typically use the tool for.
 *
 * `Record<CalculatorGuideKey, CalculatorGuide>` keeps this in step with the
 * calculator list: adding a tool without adding a guide is a type error.
 */

export interface CalculatorGuide {
  /** What this tool computes and why that is useful. */
  overview: string;
  /** The arithmetic the widget applies, plus notes on the variables. */
  formula?: {
    expression: string;
    notes: string[];
  };
  /** A worked example using inputs consistent with the widget defaults. */
  example: string;
  /** What must be true for the result to hold. */
  assumptions: string[];
  /** Where the estimate stops matching real-world statements or rules. */
  limitations: string[];
  /** Practical situations the tool is designed for. */
  useCases: string[];
  /** Tool-specific questions, rendered on the page and as FAQPage markup. */
  faqs: { q: string; a: string }[];
}

export type CalculatorGuideKey =
  | 'emi'
  | 'home-loan'
  | 'personal-loan'
  | 'car-loan'
  | 'loan-prepayment'
  | 'fd'
  | 'rd'
  | 'sip'
  | 'ppf'
  | 'nps'
  | 'gratuity'
  | 'salary'
  | 'ctc-inhand'
  | 'gold-price'
  | 'gst'
  | 'percentage'
  | 'age'
  | 'date-difference'
  | 'discount'
  | 'bmi'
  | 'kerala-gold';

export const CALCULATOR_GUIDES: Record<CalculatorGuideKey, CalculatorGuide> = {
  /* ------------------------------------------------------------------ */
  /* Banking & loans                                                     */
  /* ------------------------------------------------------------------ */
  emi: {
    overview:
      'An EMI (Equated Monthly Instalment) is one payment amount that clears both the interest and a slice of the principal every month until the loan ends. Indian lenders calculate it on a reducing balance, so interest is charged only on the amount still outstanding. That is why the same EMI clears very little principal in the first years and much more towards the end of the term.',
    formula: {
      expression: 'EMI = [P x R x (1 + R)^N] / [(1 + R)^N - 1]',
      notes: [
        'P is the principal amount actually borrowed.',
        'R is the monthly rate: the annual rate divided by 12 and then by 100. A 9% annual rate is 0.0075 per month.',
        'N is the tenure in months, not years.',
        'Because R applies to the reducing balance, the split between interest and principal shifts every month even though the EMI itself stays fixed.'
      ]
    },
    example:
      'A loan of Rs 25,00,000 at 9% per annum for 15 years gives an EMI of about Rs 25,357. Over 180 months that is roughly Rs 45,64,260 repaid in total, of which about Rs 20,64,260 is interest.',
    assumptions: [
      'The interest rate stays unchanged for the entire tenure.',
      'The full principal is disbursed on day one, so there is no moratorium or broken-period interest.',
      'Interest is charged monthly on the reducing balance with no fees, insurance or penalties added.',
      'The EMI is paid on time every month for the whole term.'
    ],
    limitations: [
      'Floating-rate loans reset when the benchmark changes, which usually alters either the EMI or the remaining tenure.',
      'Processing fees, documentation charges and bundled insurance are outside the calculation but add to the true cost of borrowing.',
      'Lenders may round installments to the nearest rupee and recover the difference in the final installment.'
    ],
    useCases: [
      'Working out how large an installment a given loan amount actually costs before approaching a lender.',
      'Comparing how the same principal behaves across different tenures or rates.',
      'Deciding how much of a monthly budget can safely go to loan repayment.'
    ],
    faqs: [
      {
        q: 'Does a longer tenure make a loan cheaper because the EMI is smaller?',
        a: 'No. A longer tenure lowers the monthly installment but increases the total interest, because interest keeps accruing on the balance for more months. Compare the total repayment figure, not only the EMI.'
      },
      {
        q: 'Why does the EMI barely reduce the principal in the early years?',
        a: 'Interest is charged on the outstanding balance, and in year one that balance is still almost the full loan. Once the balance falls, a larger share of the same EMI goes to principal, which is why the last years of a loan repay principal quickly.'
      },
      {
        q: 'Can I use an EMI estimate when applying to a bank?',
        a: 'Use it for planning and comparison only. The lender computes its own schedule with its own rate, fee treatment and rounding, and that figure governs the actual contract.'
      }
    ]
  },

  'home-loan': {
    overview:
      'Home loans in India usually run much longer than other retail loans, which makes the total interest very sensitive to both the rate and the tenure. This tool models a standard reducing-balance housing loan so you can see the monthly commitment and the lifetime interest before choosing a tenure. It is the same EMI mathematics used for any loan, applied to the larger principals and longer tenures typical of property purchase.',
    formula: {
      expression: 'EMI = [P x R x (1 + R)^N] / [(1 + R)^N - 1]',
      notes: [
        'P is the sanctioned amount, not the property price. The difference is your down payment.',
        'R is the annual rate divided by 12 and then by 100.',
        'N is the tenure in months. A 20-year loan is 240 installments.',
        'Total repayment minus P gives the total interest cost of the loan.'
      ]
    },
    example:
      'A housing loan of Rs 50,00,000 at 8.5% for 20 years gives an EMI of about Rs 43,391. Total repayment is roughly Rs 1,04,13,840, so the interest alone comes to about Rs 54,13,840 over the term.',
    assumptions: [
      'The rate stays fixed for the whole term. Floating home loans change when the benchmark moves.',
      'No prepayment, part-payment or foreclosure happens during the term.',
      'Disbursement is treated as a single amount at the start, so pre-EMI interest during construction is not modelled.',
      'Registration, stamp duty, processing fees and property insurance are excluded.'
    ],
    limitations: [
      'Most Indian home loans are floating rate and linked to an external benchmark, so rate resets will change the EMI or the remaining tenure.',
      'For an under-construction property, many lenders collect interest-only pre-EMI until full disbursement, which this model does not capture.',
      'Tax treatment of home loan interest and principal repayment depends on your tax regime, eligibility and current rules; the tool shows the loan cash flow only.'
    ],
    useCases: [
      'Sizing how much loan a comfortable monthly installment can support before you shortlist property.',
      'Comparing 15, 20 and 30-year tenures to see how much extra interest a longer term costs.',
      'Setting a realistic budget for prepayments alongside the regular EMI.'
    ],
    faqs: [
      {
        q: 'What is pre-EMI and why is it not in this estimate?',
        a: 'Pre-EMI is the interest-only payment some lenders collect on amounts already disbursed before the property is complete and the full loan is released. It sits outside a standard EMI schedule, so this tool models the post-disbursement phase only.'
      },
      {
        q: 'Does the calculator include tax deductions on the home loan?',
        a: 'No. It shows the loan arithmetic: installment, total repayment and interest. Whether interest or principal qualifies for a deduction depends on your regime and circumstances, and that is best confirmed against current rules or with a professional.'
      },
      {
        q: 'Is it better to choose the shortest tenure I can afford?',
        a: 'Shorter tenures cut total interest substantially but raise the monthly installment. The useful test is whether the higher EMI still leaves an emergency buffer after other commitments.'
      }
    ]
  },

  'personal-loan': {
    overview:
      'A personal loan is unsecured, so the lender prices it higher than a secured loan and usually for a shorter tenure. The EMI therefore takes a larger share of monthly income, and the total interest can be a significant fraction of the amount borrowed. This tool shows the installment, total interest and total repayment for the unsecured-loan rate range.',
    formula: {
      expression: 'EMI = [P x R x (1 + R)^N] / [(1 + R)^N - 1]',
      notes: [
        'P is the amount credited, before any processing fee is deducted.',
        'R is the annual rate divided by 12 and then by 100.',
        'N is the tenure in months. Personal loans commonly run 12 to 60 months.',
        'The widget defaults cover a typical unsecured range rather than any single lender rate.'
      ]
    },
    example:
      'Borrowing Rs 3,00,000 at 12.5% for 3 years gives an EMI of about Rs 10,036. Total repayment is roughly Rs 3,61,296, of which about Rs 61,296 is interest.',
    assumptions: [
      'The rate is fixed for the whole tenure.',
      'No processing fee, insurance or late-payment charge is added.',
      'The loan is repaid exactly on schedule with no prepayment.'
    ],
    limitations: [
      'Processing fees are often deducted from the disbursed amount, which raises the effective cost above the quoted rate.',
      'The rate you are offered depends on your credit profile, income stability and existing obligations, not on a published card rate.',
      'Short tenures leave limited room for interest savings from prepayment, because most of the interest is charged early.'
    ],
    useCases: [
      'Checking whether a required installment fits the month before committing to an offer.',
      'Comparing quotes from two lenders at different rates or tenures.',
      'Deciding how much to borrow when only part of a planned expense needs funding.'
    ],
    faqs: [
      {
        q: 'Is the loan with the lowest EMI always the cheaper one?',
        a: 'No. Stretching the tenure lowers the EMI but raises the total interest. Compare the total repayment figure when two offers have different tenures.'
      },
      {
        q: 'Can an existing personal loan affect a future home loan application?',
        a: 'Lenders assess total existing obligations against income when deciding how much to sanction. An open personal loan generally reduces the housing loan you can be offered, so clearing it first is often worthwhile.'
      },
      {
        q: 'What does the processing fee do to the real cost?',
        a: 'A fee deducted upfront means you receive less than the sanctioned amount while repaying interest on the full sanction. That pushes the effective rate above the advertised one.'
      }
    ]
  },

  'car-loan': {
    overview:
      'Vehicle loans are usually secured by the vehicle itself, so rates sit below unsecured credit, but the loan is typically written against a depreciating asset. This tool models the installment and total interest so you can judge how much of the vehicle cost to fund and for how long. It also helps show why stretching a vehicle loan over many years can leave the outstanding balance above the resale value.',
    formula: {
      expression: 'EMI = [P x R x (1 + R)^N] / [(1 + R)^N - 1]',
      notes: [
        'P is the financed portion of the on-road price, that is the price after your down payment.',
        'R is the annual rate divided by 12 and then by 100.',
        'N is the tenure in months, commonly 36 to 84 for vehicles.',
        'Total repayment minus P is the interest paid for the financing.'
      ]
    },
    example:
      'Financing Rs 8,00,000 at 8.9% for 5 years gives an EMI of about Rs 16,568. Over 60 months that is roughly Rs 9,94,080 repaid, so the interest is about Rs 1,94,080.',
    assumptions: [
      'The financed amount equals the on-road price minus the down payment.',
      'The rate stays constant for the term and no dealer subvention applies.',
      'Insurance, registration and accessories are paid separately rather than financed.',
      'No foreclosure or part-payment happens during the term.'
    ],
    limitations: [
      'Dealer schemes, subvented rates and festive offers change the effective rate and are not modelled.',
      'Used-vehicle loans are normally priced higher than new-vehicle loans for the same tenure.',
      'Processing fees, hypothecation charges and mandatory insurance bundled into the loan raise the total outgo.'
    ],
    useCases: [
      'Deciding the down payment needed to keep the installment within budget.',
      'Comparing tenure options against how long you expect to keep the vehicle.',
      'Testing whether financing an add-on such as insurance is worth the interest it attracts.'
    ],
    faqs: [
      {
        q: 'Should insurance and registration be financed along with the vehicle?',
        a: 'Financing them increases the amount on which interest is charged, even though those costs do not add resale value. Paying them upfront, if cash flow allows, usually costs less overall.'
      },
      {
        q: 'Why does a long tenure on a vehicle loan carry extra risk?',
        a: 'Vehicles lose value faster than the loan balance falls, especially in the first years. If you sell or the vehicle is written off mid-tenure, the outstanding amount can exceed the insured or resale value.'
      },
      {
        q: 'Does a larger down payment only reduce the EMI?',
        a: 'It reduces both the EMI and the total interest, because the lender charges interest on a smaller principal for the entire term.'
      }
    ]
  },

  'loan-prepayment': {
    overview:
      'A prepayment is a lump sum paid against the outstanding principal rather than toward the scheduled installment. Because interest is charged on the reducing balance, every rupee of principal removed early also removes all the interest that rupee would have attracted for the rest of the tenure. The earlier in the loan a prepayment lands, the larger the saving, which is exactly what this tool quantifies.',
    formula: {
      expression: 'Interest saved = Scheduled total interest - Interest paid after prepayment',
      notes: [
        'The tool first builds the original schedule, then replays it with a single lump sum applied in the chosen year.',
        'The EMI is held constant in this model, so the prepayment shortens the tenure instead of lowering the installment.',
        'Schedules are recalculated month by month on the reducing balance, which is why the saving is not simply the prepaid amount.',
        'The difference between the two schedules gives both the interest saved and the months removed from the loan.'
      ]
    },
    example:
      'On a Rs 40,00,000 loan at 8.75% for 20 years, a single Rs 2,00,000 prepayment after 3 years saves roughly Rs 6,11,721 in interest and closes the loan about 22 months (around 1.8 years) early.',
    assumptions: [
      'One lump-sum prepayment is made at the start of the selected year.',
      'The EMI stays the same after prepayment, so the benefit appears as a shorter tenure.',
      'No prepayment penalty or foreclosure charge applies.',
      'The interest rate remains unchanged for the whole term.'
    ],
    limitations: [
      'Many lenders respond to a prepayment by reducing the EMI and keeping the tenure, which saves less interest than this model shows.',
      'Some fixed-rate loans and certain lender categories carry prepayment charges that offset part of the saving.',
      'The tool models a single prepayment, not a series of them, and cannot capture rate resets on a floating loan.'
    ],
    useCases: [
      'Deciding whether to deploy a bonus or maturity proceeds against a loan or elsewhere.',
      'Judging whether giving up liquidity for an interest saving is worthwhile at your loan rate.',
      'Checking whether a prepayment penalty still leaves a net benefit.'
    ],
    faqs: [
      {
        q: 'Should I reduce the EMI or the tenure after prepaying?',
        a: 'Reducing the tenure saves more total interest because the balance clears faster. Reducing the EMI improves monthly cash flow but leaves interest accruing for longer. The right choice depends on whether your priority is total cost or monthly breathing room.'
      },
      {
        q: 'When is prepaying not the best use of the money?',
        a: 'If the loan rate is low and stable, and the money can earn more after tax elsewhere, prepaying may cost you more than it saves. Prepaying is most clearly valuable when the loan rate is high or when the removed installment improves your monthly position.'
      },
      {
        q: 'Does a prepayment reduce the next installment automatically?',
        a: 'Not automatically. Lenders act according to the instruction you give, so specify whether you want the tenure shortened or the EMI reduced, and confirm it in writing.'
      }
    ]
  },

  fd: {
    overview:
      'A fixed deposit pays a contracted rate on a lump sum for a fixed term, with interest normally compounded each quarter and paid out at maturity. This tool shows the maturity value, the interest earned and the effect of the additional rate many banks offer senior citizens. It answers the planning question of what a known amount becomes by a known date.',
    formula: {
      expression: 'Maturity = P x (1 + r / 400)^(4 x t)',
      notes: [
        'P is the deposit amount.',
        'r is the annual rate in percent; dividing by 400 converts it to a quarterly rate and then to a decimal.',
        't is the tenure in years, multiplied by 4 because there are four compounding periods a year.',
        'A senior citizen rate adds a fixed margin to the base rate before compounding, which is modelled by the senior citizen toggle.'
      ]
    },
    example:
      'A deposit of Rs 1,00,000 at 7.1% for 5 years matures at about Rs 1,42,175, giving roughly Rs 42,175 of interest across the term.',
    assumptions: [
      'The rate is fixed for the whole term and interest is compounded quarterly.',
      'Interest is reinvested rather than paid out periodically.',
      'The deposit runs to full maturity, so no premature-withdrawal penalty applies.',
      'The senior citizen option adds a fixed margin to the base rate you enter.'
    ],
    limitations: [
      'Interest on deposits is generally added to your income and taxed at your slab, and tax may be deducted at source once interest crosses the applicable threshold, so the post-tax return is lower than the figure shown.',
      'Premature closure usually carries a rate penalty and can change the compounding assumption entirely.',
      'Banks revise rates frequently, and the rate applied is the one in force on the day the deposit is booked.'
    ],
    useCases: [
      'Checking what a known lump sum becomes by a future date, such as a target maturity.',
      'Comparing a deposit against other fixed-income options after accounting for taxability.',
      'Splitting a large amount across deposits to manage interest payout and liquidity.'
    ],
    faqs: [
      {
        q: 'How is FD interest taxed?',
        a: 'FD interest is generally taxable at your applicable slab rate. For resident depositors, bank FD/RD interest TDS thresholds from 1 Apr 2025 are Rs 50,000 per year for others and Rs 1,00,000 for senior citizens, generally aggregated across deposits at the same bank. The usual TDS rate is 10% with PAN and 20% without PAN, subject to applicable exemptions. TDS is not the final tax liability, and the calculator shows a gross estimate.'
      },
      {
        q: 'Is the maturity amount guaranteed?',
        a: 'Bank deposits carry a contracted rate and are covered by deposit insurance up to the statutory limit per depositor per bank. Larger balances across one bank are therefore not fully insured, which is a reason to spread very large sums.'
      },
      {
        q: 'Why is my actual maturity value slightly different from the estimate?',
        a: 'Banks may compound monthly or pay simple interest on premature closure, apply rounding, and use the exact rate on the booking date. Those conventions move the final figure by small amounts.'
      }
    ]
  },

  rd: {
    overview:
      'A recurring deposit accepts a fixed amount every month and pays deposit-style interest on the accumulating balance until maturity. Each installment earns for a different length of time, so the first deposit earns the most and the final one earns for barely a month. This tool models that structure with quarterly compounding, which is how Indian banks and post offices typically compute recurring deposit maturity.',
    formula: {
      expression: 'Maturity = Sum over each installment of [A x (1 + r/4)^(4 x months remaining / 12)]',
      notes: [
        'A is the monthly installment amount, and the sum runs across all installments.',
        'The exponent depends on how many months each installment stays invested before maturity.',
        'Interest is compounded quarterly, so the quarterly rate is the annual rate divided by 400.',
        'Total invested is simply the installment multiplied by the number of months.'
      ]
    },
    example:
      'Depositing Rs 5,000 every month at 7.1% for 3 years produces a maturity value of about Rs 2,01,001 against Rs 1,80,000 invested, or roughly Rs 21,001 of interest.',
    assumptions: [
      'Every installment is paid on time and in full for the whole term.',
      'The interest rate stays unchanged until maturity and compounding is quarterly.',
      'The deposit runs to maturity with no penalties for delay.',
      'No tax is deducted from the projection.'
    ],
    limitations: [
      'Missed or late installments attract charges and change the maturity amount, since the missing deposit earns nothing for its remaining period.',
      'Interest is taxable, so the effective return is lower for anyone with taxable income.',
      'Banks may apply their own compounding convention, which can shift the final figure slightly.'
    ],
    useCases: [
      'Turning a monthly surplus into a defined corpus over a known period.',
      'Building an emergency fund without needing a lump sum at the start.',
      'Working backwards from a savings target to find the monthly installment needed.'
    ],
    faqs: [
      {
        q: 'Is a recurring deposit better than a fixed deposit?',
        a: 'They solve different problems. A fixed deposit suits money you already hold and usually earns the same headline rate on the full amount from day one. A recurring deposit suits regular saving from income, but only later installments benefit from the full term.'
      },
      {
        q: 'Is RD interest taxable like FD interest?',
        a: 'Yes. RD interest is generally taxable at your slab rate. For resident depositors, bank FD/RD interest TDS thresholds from 1 Apr 2025 are Rs 50,000 per year for others and Rs 1,00,000 for senior citizens, generally aggregated across deposits at the same bank. The usual rate is 10% with PAN and 20% without PAN, subject to applicable exemptions. Below the TDS threshold does not automatically mean tax-free.'
      },
      {
        q: 'What happens if I miss an installment?',
        a: 'Banks normally levy a penalty for each missed installment and the maturity value falls because that deposit never earns interest. Sustained defaults can lead to the account being closed early.'
      }
    ]
  },

  /* ------------------------------------------------------------------ */
  /* Finance & investments                                               */
  /* ------------------------------------------------------------------ */
  sip: {
    overview:
      'A Systematic Investment Plan invests a fixed amount at regular intervals, usually monthly, into a mutual fund scheme. Investing in equal amounts regardless of price means you buy more units when prices fall and fewer when they rise, which averages out your purchase cost over time. This tool projects what a monthly investment could grow to at a constant assumed return.',
    formula: {
      expression: 'FV = M x [((1 + i)^n - 1) / i] x (1 + i)',
      notes: [
        'M is the monthly investment amount.',
        'i is the monthly rate: the expected annual return divided by 12 and then by 100.',
        'n is the number of monthly installments.',
        'The trailing (1 + i) reflects the tool investing at the start of each month, so every installment earns for its full period.',
        'Total invested is simply M multiplied by n; the rest is the projected gain.'
      ]
    },
    example:
      'Investing Rs 10,000 a month at an assumed 12% annual return for 15 years projects a corpus of about Rs 50,45,760 on Rs 18,00,000 invested, a gain of roughly Rs 32,45,760.',
    assumptions: [
      'The expected return stays constant for the entire period, compounded monthly.',
      'Each installment is invested at the start of the month and none is skipped.',
      'Fund expense ratios, exit loads, transaction charges and taxes are not deducted.',
      'The investment amount is never increased, so no step-up is applied.'
    ],
    limitations: [
      'Mutual fund returns are market-linked. The assumed rate is a planning input, not a promise, and the actual corpus will differ.',
      'Expense ratios and exit loads reduce the return actually credited to your units, so the real corpus is usually lower than a gross projection.',
      'Capital gains tax applies when units are redeemed, and the final value depends heavily on market levels in the last years of the investment.'
    ],
    useCases: [
      'Setting a monthly investment amount from a long-term goal such as retirement or education.',
      'Seeing how much difference starting a few years earlier makes to the final corpus.',
      'Comparing a steady monthly plan against investing a lump sum.'
    ],
    faqs: [
      {
        q: 'Is the projected return a guarantee?',
        a: 'No. The rate is an assumption you choose to see how the compounding works. Market-linked returns vary year to year, and the corpus at redemption depends on the market on that date.'
      },
      {
        q: 'What happens to a SIP when markets fall?',
        a: 'Your fixed installment buys more units when prices are lower, spreading purchases across different prices. It does not guarantee a profit or outperformance; the eventual result depends on the market value when you redeem.'
      },
      {
        q: 'What is a step-up SIP?',
        a: 'It increases the installment amount periodically, often by a fixed percentage each year. Because the higher amounts also compound, even a modest annual increase can make a large difference over long periods, but this tool models a level installment only.'
      }
    ]
  },

  ppf: {
    overview:
      'The Public Provident Fund is a long-tenure sovereign savings scheme with a 15-year term, an annual deposit limit and interest compounded annually. Tax benefits depend on the applicable regime and eligibility. Actual interest uses the government-notified/current applicable rate, which can change. This tool projects annual deposits at a fixed 7.1% illustrative assumption, not a permanently guaranteed scheme rate.',
    formula: {
      expression: 'Closing balance = Opening balance + Deposit + Interest on (Opening balance + Deposit)',
      notes: [
        'Interest is compounded once a year, and the balance attracts interest after the deposit is made.',
        'The deposit is treated as arriving at the start of each modelled year, which is the most favourable timing.',
        'The widget caps the annual input at Rs 1,50,000, the scheme limit it models.',
        'Total invested is the annual deposit multiplied by the number of years.'
      ]
    },
    example:
      'Depositing Rs 1,50,000 each year for 15 years at the fixed 7.1% illustrative rate used in the tool gives a projected maturity of about Rs 40,68,208 on Rs 22,50,000 invested.',
    assumptions: [
      'The estimate holds the assumed 7.1% rate constant for the whole term; actual government-notified rates may change.',
      'One deposit is made at the start of each year, up to the annual cap.',
      'No partial withdrawals are taken during the term.',
      'The account completes the full 15-year maturity without extension.'
    ],
    limitations: [
      'The scheme rate is reviewed periodically by the government, so a 15-year projection at one rate will not match the eventual maturity if rates change.',
      'Monthly interest uses the lowest balance between the close of the fifth day and month-end. A new deposit should be credited on or before the fifth to count for that month; this annual model does not track monthly deposit dates.',
      'Partial withdrawal and extension rules apply at specified stages, and those reduce or extend the balance in ways this projection does not show.'
    ],
    useCases: [
      'Planning a long-term tax-advantaged allocation alongside market-linked investments.',
      'Checking the corpus a full annual contribution builds by maturity.',
      'Deciding how much of the annual limit to use now versus investing elsewhere.'
    ],
    faqs: [
      {
        q: 'Can I deposit more than Rs 1,50,000 in a year?',
        a: 'The tool caps the input at the annual limit it models. Deposits beyond the scheme limit do not attract the same treatment, so confirm the current rules before exceeding it.'
      },
      {
        q: 'Does the interest rate stay the same for 15 years?',
        a: 'No. The government notifies the applicable rate periodically, so an actual account earns the rates in force for the relevant periods. The fixed 7.1% used here is an assumption for a planning estimate, not a guarantee for 15 years.'
      },
      {
        q: 'What happens at maturity?',
        a: 'The account reaches maturity after the scheme term and can be closed or extended in blocks under the scheme rules. This tool projects the balance at the end of the initial term only.'
      }
    ]
  },

  nps: {
    overview:
      'The National Pension System builds a retirement corpus through contributions invested in market-linked schemes. Exit eligibility and withdrawal or annuity requirements depend on sector, exit type, joining age and corpus size. This tool projects contributions until age 60 and illustrates a selected annuity allocation; it does not determine the legally applicable exit option.',
    formula: {
      expression: 'Corpus = M x [((1 + i)^n - 1) / i] x (1 + i), then split by annuity share',
      notes: [
        'M is the monthly contribution and i is the expected annual return divided by 12 and then by 100.',
        'n is the number of monthly contributions between your current age and the retirement age used by the tool, 60.',
        'The annuity share is the percentage of the corpus directed to buying a pension; the rest is the lump sum.',
        'Monthly pension is the annuity amount multiplied by the annuity yield, divided by 12.'
      ]
    },
    example:
      'A 30-year-old contributing Rs 5,000 a month at an assumed 10% return projects a corpus of about Rs 1,13,96,627 by age 60. With an illustrative 40% directed to an annuity, the lump sum is roughly Rs 68,37,976 and the annuity about Rs 45,58,651, which at the modelled 6% yield pays about Rs 22,793 a month.',
    assumptions: [
      'Contributions are made at the start of each month until the retirement age modelled by the tool.',
      'The expected return stays constant for the whole accumulation period.',
      'The annuity is priced at the fixed yield used by the tool, and the payout is shown before tax.',
      'The contribution amount is never increased during the accumulation phase.'
    ],
    limitations: [
      'NPS returns are market-linked and depend on the scheme mix you select, so the actual corpus will differ from the projection.',
      'For normal-exit corpus above Rs 12 lakh, current minimum annuity requirements are 20% for non-government and 40% for government subscribers. Smaller-corpus exceptions and premature-exit rules differ; the 40-100% input range in this widget is a model constraint, not a universal regulatory minimum.',
      'Annuity rates vary by insurer, age, purchase amount and the payout option chosen, so the pension shown is an illustration rather than a quote.'
    ],
    useCases: [
      'Estimating the retirement gap between what you are contributing and what you may need.',
      'Understanding what share of the corpus becomes a monthly pension rather than a lump sum.',
      'Comparing a retirement contribution against other long-term options.'
    ],
    faqs: [
      {
        q: 'Can the entire corpus be withdrawn as a lump sum at retirement?',
        a: 'It depends on your sector, exit type, joining age and corpus. Normal-exit provisions permit full withdrawal up to Rs 8 lakh for subscribers who joined before 60, with a separate Rs 12 lakh limit for those joining at or after 60. Above Rs 12 lakh, normal-exit minimum annuity is 20% for non-government and 40% for government subscribers. Other corpus bands and premature exits have different rules; verify the option applicable to your account.'
      },
      {
        q: 'What exactly is an annuity?',
        a: 'An annuity is a product that converts a lump sum into periodic payments, usually monthly, for a defined period or for life. The rate depends on the insurer and the option you choose.'
      },
      {
        q: 'Is NPS better than PPF or a mutual fund SIP?',
        a: 'They behave differently. NPS is market-linked with sector- and exit-specific withdrawal rules, PPF uses government-notified interest rates with a defined term, and mutual fund SIP liquidity depends on the scheme and any applicable lock-in or exit load. The right mix depends on risk appetite, goals and liquidity needs.'
      }
    ]
  },

  /* ------------------------------------------------------------------ */
  /* Salary & employment                                                 */
  /* ------------------------------------------------------------------ */
  gratuity: {
    overview:
      'Gratuity is a lump sum an employer pays for long service, generally at the time of leaving the organisation. For establishments covered by the Payment of Gratuity Act, 1972, the payout follows a standard formula based on last drawn salary and completed years of service. This tool applies that formula and shows how much of the payout is covered by the exemption ceiling it models.',
    formula: {
      expression: 'Covered establishments: Gratuity = (15 x Last drawn salary x Years of service) / 26',
      notes: [
        'The 15 represents fifteen days of salary for each completed year of service.',
        'The divisor is 26 for employers covered by the Act, reflecting a six-day working week; for establishments outside the Act the tool uses 30.',
        'Last drawn salary means basic pay plus dearness allowance, and the value you enter should exclude allowances that are not part of that definition.',
        'A separate exemption ceiling is applied to the computed amount to show the likely taxable portion.'
      ]
    },
    example:
      'With a last drawn salary of Rs 50,000 and 7 years of service in a covered establishment, gratuity works out to about Rs 2,01,923. The same salary and service outside the Act, computed with a divisor of 30, would be Rs 1,75,000.',
    assumptions: [
      'Service is counted in completed years as entered, with the Act-covered or uncovered divisor chosen by you.',
      'Salary consists of basic pay plus dearness allowance as defined for gratuity purposes.',
      'The employer is covered by the Payment of Gratuity Act, 1972, unless the uncovered option is selected.',
      'The exemption ceiling applied is the one modelled in the tool.'
    ],
    limitations: [
      'Entitlement normally requires a minimum period of continuous service, so leaving earlier may mean no gratuity at all.',
      'Employers differ on what they include in salary for gratuity, and some compute on basic pay alone.',
      'Taxability depends on whether the employer is covered and on your circumstances, so the split between exempt and taxable amounts is an indication only.',
      'Adjustments for unpaid leave, break in service or partial years are not modelled.'
    ],
    useCases: [
      'Checking an exit settlement before accepting the figure quoted.',
      'Estimating what service is worth at retirement if the same salary continues.',
      'Comparing two offers where one includes gratuity in the CTC and the other does not.'
    ],
    faqs: [
      {
        q: 'Is gratuity payable if I resign before completing the qualifying service?',
        a: 'The statutory entitlement generally requires a minimum period of continuous service, so a shorter stint may not qualify, apart from limited exceptions. Confirm your position against the Act and your employment terms.'
      },
      {
        q: 'Is gratuity taxed?',
        a: 'Gratuity is exempt up to the ceiling modelled in the tool, and amounts above that may be taxable depending on whether the employer is covered by the Act and on your category. Verify the current ceiling and your position before relying on the net figure.'
      },
      {
        q: 'Why does gratuity appear in my CTC but never in my monthly salary?',
        a: 'Many employers accrue a gratuity reserve as part of cost to company because the liability builds over the years of service. It is paid at exit, so it appears in the CTC structure without ever reaching your monthly bank credit.'
      }
    ]
  },

  salary: {
    overview:
      'Take-home pay is what actually reaches your bank account after the deductions on your payslip, and it is always lower than the cost to company quoted in an offer. This tool converts an annual CTC into an estimated monthly credit by modelling the employer-side costs and the standard recurring deductions. It is designed as a budgeting aid for the fixed monthly component, not as a payslip replacement.',
    formula: {
      expression: 'In-hand = Monthly gross - (Employee PF + Professional tax)',
      notes: [
        'Basic pay is assumed to be 40% of CTC, which is a common structure. Change the CTC and the basic moves with it.',
        'Employer PF is 12% of monthly basic, capped at the wage-ceiling amount modelled in the tool.',
        'Gratuity reserve is accrued at 4.81% of monthly basic and treated as a CTC cost rather than cash in hand.',
        'Monthly gross therefore excludes employer PF, the gratuity reserve and the annual variable component, and professional tax is deducted as selected.'
      ]
    },
    example:
      'On a CTC of Rs 9,00,000 with a Rs 50,000 annual variable component and Rs 200 monthly professional tax, the modelled basic is Rs 3,60,000 a year. Employer and employee PF work out to about Rs 1,800 a month each, the gratuity reserve to roughly Rs 1,443 a month, giving a gross of about Rs 67,590 and an in-hand figure of about Rs 65,590 before income tax is considered.',
    assumptions: [
      'Basic pay is 40% of CTC and the variable component is paid once a year, as entered.',
      'Provident fund applies at the statutory rate on basic up to the ceiling modelled.',
      'Professional tax is the monthly figure selected for your state.',
      'Income tax deducted at source is not applied, so the result is a pre-TDS take-home.'
    ],
    limitations: [
      'Salary structures vary widely. A higher basic share raises PF and lowers monthly cash, while a lower basic does the opposite.',
      'Income tax, surcharge and cess are excluded, so the amount finally credited will be lower for anyone with taxable income.',
      'Reimbursements, meal cards, insurance premiums, gratuity accrual and variable pay timing are not modelled here.'
    ],
    useCases: [
      'Estimating the monthly cash that a quoted CTC translates into before accepting an offer.',
      'Budgeting rent and fixed obligations against the usable monthly figure.',
      'Checking whether a payslip deduction looks broadly consistent with the structure.'
    ],
    faqs: [
      {
        q: 'Why is take-home so much lower than the CTC I was quoted?',
        a: 'CTC includes costs that never arrive as monthly cash: the employer provident fund contribution, the gratuity accrual, the annual variable component and any insurance or benefits. The offer amount is the total cost of employing you, not the amount you receive each month.'
      },
      {
        q: 'Does this figure include income tax?',
        a: 'No. The result is a pre-TDS take-home. Income tax depends on your regime, declarations and the deductions you claim, so the amount finally credited will normally be lower.'
      },
      {
        q: 'Why does the basic pay percentage matter so much?',
        a: 'Provident fund, gratuity and several components are calculated on basic pay. A higher basic share increases retirement contributions and lowers monthly cash, while a lower basic share does the reverse.'
      }
    ]
  },

  'ctc-inhand': {
    overview:
      'An offer letter states cost to company, but the line items inside it behave very differently: some reach your account monthly, some are deferred, and some are employer contributions that only appear in the CTC total. This mode of the calculator lays out that structure so you can read an offer letter line by line instead of comparing headline numbers. It is the detailed counterpart of the simple in-hand estimate.',
    formula: {
      expression: 'In-hand = (CTC - Variable pay) / 12 - Employer PF - Gratuity reserve - Employee PF - Professional tax',
      notes: [
        'The annual variable component is removed first because it is not paid monthly.',
        'Employer PF and the gratuity reserve are subtracted as CTC costs that do not arrive as cash.',
        'Employee PF and professional tax are then subtracted as deductions from gross pay.',
        'The result is the recurring monthly credit before income tax deducted at source.'
      ]
    },
    example:
      'For a CTC of Rs 9,00,000 with a Rs 50,000 variable component and Rs 200 monthly professional tax, the fixed monthly gross is about Rs 67,590 after employer PF and the gratuity reserve, and the take-home is about Rs 65,590 once employee PF and professional tax are deducted.',
    assumptions: [
      'Basic pay is 40% of CTC, which drives the PF and gratuity lines.',
      'Employer and employee PF are equal and capped at the statutory wage ceiling modelled.',
      'The variable component is paid annually and in full.',
      'Income tax deducted at source is excluded from the calculation.'
    ],
    limitations: [
      'Real structures include house rent allowance, special allowance, leave travel, reimbursements and insurance, which shift the split between monthly cash and deferred benefits.',
      'House rent allowance exemption depends on rent paid, city and regime, and is not computed here.',
      'Employers may cap or exclude some components from PF differently from the model used here.'
    ],
    useCases: [
      'Comparing two offer letters with different basic pay, variable pay and benefits.',
      'Understanding why a CTC figure does not match the monthly credit in the bank.',
      'Negotiating the fixed component when a large share of the offer is variable.'
    ],
    faqs: [
      {
        q: 'What is the difference between gross salary and CTC?',
        a: 'Gross salary is what you earn before deductions such as provident fund and tax. CTC is larger because it also includes employer contributions and accruals such as the employer PF share, gratuity reserve and the cost of benefits.'
      },
      {
        q: 'Why is a higher variable component a risk?',
        a: 'Variable pay is usually conditional on performance or company results, so it can be reduced or deferred. A high variable share makes the offer look larger while the predictable monthly amount stays lower.'
      },
      {
        q: 'What should I compare between two offers?',
        a: 'Compare the fixed monthly take-home, the provident fund and gratuity accruals, the variable component and its conditions, and any joining bonus with a clawback period. The headline CTC alone hides all of those differences.'
      }
    ]
  },

  /* ------------------------------------------------------------------ */
  /* Gold & jewellery                                                    */
  /* ------------------------------------------------------------------ */
  'gold-price': {
    overview:
      'A gold jewellery bill is built from several separate charges, and jewellers apply them in a fixed order: metal value by weight and purity, making charges or wastage, a hallmarking fee per article, and GST on the total. This tool reproduces that arithmetic so you can check a quotation or an invoice line by line rather than accepting the final figure.',
    formula: {
      expression: 'Total = [Gold value + Making charges + Hallmarking fee] + 3% GST',
      notes: [
        'Gold value is the entered weight multiplied by the per-gram rate for the selected purity.',
        'The rate you enter is treated as the 22K rate. The tool derives 24K by multiplying by 24/22 and 18K by taking 75% of the 24K rate.',
        'Making charges are either a percentage of the gold value or a fixed amount per gram, as selected.',
        'The hallmarking fee is charged per article, and GST is applied to the whole pre-tax total, including making charges.'
      ]
    },
    example:
      'For 10 grams of 22K gold at Rs 6,800 per gram with 12% making charges, the metal value is Rs 68,000, making charges are Rs 8,160 and the hallmarking fee is Rs 45. The pre-tax total is Rs 76,205, GST at 3% adds Rs 2,286, giving a bill of about Rs 78,491.',
    assumptions: [
      'The rate entered is the current 22K per-gram rate and remains fixed for the whole bill.',
      'Making charges apply uniformly to every gram at the selected rate.',
      'The hallmarking fee is levied once per article.',
      'GST applies at the rate built into the tool, on the total including making charges.'
    ],
    limitations: [
      'Some jewellers charge wastage or value addition in addition to making charges, which this model does not separate out.',
      'Stone, diamond and enamel work is priced separately and is not part of a gold-weight calculation.',
      'Old gold exchange involves a purity deduction and melting loss, which reduces the credit you receive against the new purchase.',
      'Rates vary by city and are revised daily, so a bill is only reproducible with the rate in force on that date.'
    ],
    useCases: [
      'Verifying a jeweller invoice before paying, particularly the purity rate and making charges.',
      'Budgeting a jewellery purchase from a target gram weight.',
      'Comparing making-charge quotes between two shops for the same design.'
    ],
    faqs: [
      {
        q: 'Why is the 22K rate lower than the 24K rate per gram?',
        a: 'Purity is the difference. 24K is 99.9% gold, while 22K is 91.6% gold alloyed with metals such as copper or silver for strength. The tool derives the 24K rate from your 22K figure using the 24/22 ratio.'
      },
      {
        q: 'What is the difference between making charges and wastage?',
        a: 'Making charges pay for the labour and design of the piece. Wastage or value addition is a separate percentage some jewellers add for metal lost in manufacturing. Both increase the bill, and both are commonly negotiable, so ask how each is charged.'
      },
      {
        q: 'Should diamond jewellery be bought in 18K instead of 22K?',
        a: '18K is harder because it contains more alloy, which holds stone settings more securely than softer 22K. That is why most stone-set jewellery is made in 18K or lower, even though the gold value per gram is proportionally lower.'
      }
    ]
  },

  'kerala-gold': {
    overview:
      'In Kerala, gold is commonly discussed in pavan rather than grams: one pavan is exactly 8 grams of 22K gold, and the same unit is called a sovereign. Quoting a rate per pavan is convenient for wedding budgeting, but a bill is always computed on weight and purity, so the two need converting. This tool does that conversion and then completes the billing arithmetic including making charges, hallmarking and GST.',
    formula: {
      expression: 'Total = [(Weight in grams x 22K rate) + Making charges + Hallmarking fee] + 3% GST',
      notes: [
        'One pavan equals 8 grams, so the tool shows the pavan equivalent of the weight you enter.',
        'Purity pivots around the 22K rate: 24K is derived by multiplying by 24/22 and 18K by taking 75% of the 24K figure.',
        'Making charges can be a percentage of the metal value or a fixed amount per gram.',
        'GST is applied to the metal value plus making charges plus the hallmarking fee.'
      ]
    },
    example:
      'Two pavan, that is 16 grams of 22K gold at Rs 6,800 per gram, gives a metal value of Rs 1,08,800. With 12% making charges of Rs 13,056 and a Rs 45 hallmarking fee, the pre-tax total is Rs 1,21,901, and 3% GST of Rs 3,657 brings the bill to about Rs 1,25,558.',
    assumptions: [
      'One pavan is treated as exactly 8 grams of 22K gold.',
      'The rate entered is the 22K per-gram rate for the day of the calculation.',
      'Making charges apply at a uniform rate across the whole weight.',
      'GST applies at the rate built into the tool on the full pre-tax amount.'
    ],
    limitations: [
      'Pavan is a Kerala and South Indian convention of 8 grams. A tola, used in some northern markets, is about 11.66 grams, so a per-tola rate is not comparable with a per-pavan rate.',
      'Wastage or value addition charged separately by some jewellers is not modelled.',
      'Wedding sets often combine 22K and 18K pieces plus stones, which are billed differently and must be costed separately.',
      'Making charges vary substantially between jewellers and are frequently negotiable, especially on larger purchases.'
    ],
    useCases: [
      'Converting a per-gram quotation into the per-pavan rate used in local price discussions.',
      'Budgeting a wedding purchase from a target number of pavan.',
      'Comparing the all-in cost per pavan between jewellers after making charges and GST.'
    ],
    faqs: [
      {
        q: 'How many grams is one pavan?',
        a: 'One pavan is exactly 8 grams. In Kerala the term is used interchangeably with sovereign for 22K gold, so a rate quoted per pavan is the per-gram rate multiplied by eight.'
      },
      {
        q: 'Is GST charged on making charges as well as the gold?',
        a: 'In the billing structure the tool follows, GST applies to the full pre-tax amount, which includes the metal value, making charges and the hallmarking fee, rather than to the metal value alone.'
      },
      {
        q: 'How do I compare two jewellers fairly?',
        a: 'Compare three numbers separately: the 22K per-gram rate, the making charge as a percentage or per gram, and any wastage or value addition. Comparing only the advertised rate hides the charges that often decide the final bill.'
      }
    ]
  },

  /* ------------------------------------------------------------------ */
  /* Everyday utility tools                                              */
  /* ------------------------------------------------------------------ */
  gst: {
    overview:
      'GST is charged on the value of a supply, and the same amount can be described in two ways: a price before tax to which GST is added, or a final price that already includes it. Businesses quote in both directions, and consumers usually need to work backwards from a tax-inclusive price to check what the tax actually was. This tool handles both directions and splits the tax into the two equal components used for intra-state supplies.',
    formula: {
      expression: 'Exclusive: GST = Amount x Rate / 100    |    Inclusive: Taxable value = Amount x 100 / (100 + Rate)',
      notes: [
        'Exclusive mode adds tax to the amount you enter, which is the pre-tax value.',
        'Inclusive mode extracts the tax from a price that already contains it; subtracting the taxable value from the amount gives the GST component.',
        'The tool displays the tax split into two equal halves, which corresponds to CGST and SGST on an intra-state supply.',
        'Inter-state supplies carry a single IGST at the same combined rate instead of the split.'
      ]
    },
    example:
      'Rs 10,000 before tax at 18% attracts Rs 1,800 of GST, making the total Rs 11,800, shown as Rs 900 CGST and Rs 900 SGST. Working backwards, a tax-inclusive price of Rs 10,000 at 18% contains a taxable value of about Rs 8,475 and Rs 1,525 of GST.',
    assumptions: [
      'One rate applies to the entire amount, with no mixed-rate invoice lines.',
      'GST is computed on the full value with no exempt portion or composition scheme.',
      'The amount entered is treated as either wholly pre-tax or wholly tax-inclusive, never mixed.'
    ],
    limitations: [
      'Real invoices can combine items taxed at different rates, and each line must be computed separately.',
      'Cess, discounts applied after the tax point, and composition-scheme treatment are outside the model.',
      'Which rate applies to a particular goods or service depends on current classification, and rate structures are revised from time to time, so confirm the applicable rate before quoting a figure as final.'
    ],
    useCases: [
      'Checking the tax component of a bill or invoice.',
      'Working out the pre-tax value of an inclusive price for accounting purposes.',
      'Quoting a customer price from a known pre-tax cost.'
    ],
    faqs: [
      {
        q: 'What is the difference between GST-inclusive and GST-exclusive pricing?',
        a: 'An exclusive price is the value before tax, so GST is added on top of it. An inclusive price already contains the tax, so the taxable value has to be extracted from it. The difference matters because adding 18% and then removing 18% do not return the original number.'
      },
      {
        q: 'Why does the tool split the GST into two equal parts?',
        a: 'For a supply within one state, the tax is divided equally between central and state components, CGST and SGST. For a supply between states, a single IGST at the same combined rate applies instead.'
      },
      {
        q: 'Which GST rate applies to my product or service?',
        a: 'That depends on how the item is classified under current rules, and classifications and rates are revised periodically. Use this tool for the arithmetic once you have confirmed the rate that applies to your specific item.'
      }
    ]
  },

  percentage: {
    overview:
      'Most percentage mistakes come from answering the wrong question. Finding 25% of a number and finding what percentage one number is of another are different operations that are easy to mix up, and the two are the most common percentage questions in exams, bills and business. This tool answers both from the same two inputs so you can see them side by side.',
    formula: {
      expression: 'X% of Y = (X / 100) x Y    |    X as a % of Y = (X / Y) x 100',
      notes: [
        'The first expression takes a percentage of an amount.',
        'The second expresses one quantity as a share of another, and is shown to two decimal places.',
        'Both are computed from the same two numbers, which makes the difference between them immediately visible.',
        'A percentage is always relative to a base, so identifying the base is the key step in any percentage problem.'
      ]
    },
    example:
      'With the first value at 25 and the second at 200, 25% of 200 is 50, while 25 as a percentage of 200 is 12.50%. The same two numbers give very different answers depending on which question is being asked.',
    assumptions: [
      'Both inputs are treated as plain numbers with no currency or unit conversion.',
      'The denominator is not zero, so the share calculation is always defined.',
      'Results are rounded to two decimal places for display.'
    ],
    limitations: [
      'This tool answers the two questions above. Percentage change between two values, compound growth over time and weighted averages are separate calculations.',
      'A percentage alone does not indicate the base it refers to, which is why a 10% figure can be large or trivial depending on what it is 10% of.',
      'Rounding to two decimals can make figures differ marginally from a spreadsheet.'
    ],
    useCases: [
      'Working out marks scored in an exam from total marks.',
      'Finding a share of a total, such as a category contribution to expenses.',
      'Checking a percentage stated in a report against the underlying numbers.'
    ],
    faqs: [
      {
        q: 'What is the difference between a percentage and a percentage point?',
        a: 'A change from 5% to 6% is one percentage point but a 20% relative increase. Lenders, exam results and reports often mix the two, so it is worth checking which one is meant.'
      },
      {
        q: 'How do I find the original value before a percentage was applied?',
        a: 'Divide by the multiplier rather than subtracting the percentage. A price of 1,180 after 18% was added corresponds to an original value of 1,180 divided by 1.18, which is 1,000. Subtracting 18% from 1,180 would give the wrong answer.'
      },
      {
        q: 'Why do a markup and a margin give different percentages?',
        a: 'They use different bases. A 25% markup on a cost of 100 gives a selling price of 125, which is a 20% margin on that selling price, because the margin is measured against the price rather than the cost.'
      }
    ]
  },

  age: {
    overview:
      'Exact age is not simply a subtraction of years, because months have different lengths and leap years change the day count. Forms, eligibility rules and legal documents often need age in completed years, months and days as on a specific date. This tool computes that breakdown from a date of birth and also shows the total days and weeks lived.',
    formula: {
      expression: 'Completed age = whole years, then whole months, then remaining days',
      notes: [
        'The calculation first counts completed years, then the whole months since the last birthday, then the leftover days.',
        'Month lengths are respected, so the day count adjusts for months with 28, 30 or 31 days.',
        'Leap years are accounted for because the day count is derived from actual calendar dates.',
        'Totals are also shown in days and weeks for reference.'
      ]
    },
    example:
      'For a date of birth of 15 May 1998, an age check on 29 September 2026 gives 28 completed years and 4 completed months, with the remaining days shown separately along with totals in weeks and days.',
    assumptions: [
      'Age is measured to the current date on the device running the calculator.',
      'The date of birth is entered as a valid calendar date.',
      'Age is expressed in completed units, so the year count increases on the birthday itself.'
    ],
    limitations: [
      'Eligibility for exams and government posts is normally reckoned as on a cut-off date fixed by the recruiting body, and often with relaxations for reserved categories, so today\u2019s age is not the same as eligibility age.',
      'Different rules treat dates such as 29 February differently, so an unusual date of birth should be confirmed against the applicable rule.',
      'The tool shows chronological age only; it does not apply any age-relaxation or eligibility rule.'
    ],
    useCases: [
      'Filling in a form that requires age in years, months and days.',
      'Checking the exact gap between two milestone dates in your own records.',
      'Working out how many days remain until a birthday or an anniversary of an event.'
    ],
    faqs: [
      {
        q: 'Does age in completed years increase on the birthday?',
        a: 'Yes. Completed years increase on the birthday itself, which is why the year count here ticks over on that date rather than the day after.'
      },
      {
        q: 'Can I use this for exam age eligibility?',
        a: 'Use it for reference only. Recruiting bodies specify a cut-off date and their own reckoning rules, sometimes with category relaxations, so the authoritative figure comes from the official notification.'
      },
      {
        q: 'How are 29 February birthdays handled?',
        a: 'The tool works from calendar dates, so the result depends on the date you enter and the months in between. Where a rule specifically defines how a leap-day birthday is treated, follow that rule.'
      }
    ]
  },

  'date-difference': {
    overview:
      'Counting the days between two dates looks trivial until the answer decides something: a notice period, a filing deadline, a project timeline or an interest calculation. The subtlety is whether the first or last day is counted, because that single choice changes the total by a day. This tool shows the interval between two dates in days, weeks and months so the basis is explicit.',
    formula: {
      expression: 'Days = difference between the two calendar dates, with one endpoint excluded',
      notes: [
        'The tool measures the interval from the start date to the end date and does not count both endpoints.',
        'Weeks are shown as complete seven-day groups, with any leftover days reported separately.',
        'Months and years are derived from the same interval.',
        'Because it is calendar arithmetic, weekends and public holidays are included.'
      ]
    },
    example:
      'From 1 January 2026 to 31 December 2026 the tool reports 364 days, which is 52 complete weeks with no remaining days. The full calendar year spans 365 days only if the start and the end dates are both counted.',
    assumptions: [
      'Both dates are valid and the end date is not earlier than the start date.',
      'The interval is measured in calendar days, with no time zone or cut-off time adjustment.',
      'One endpoint is excluded, which is the convention for measuring elapsed time.'
    ],
    limitations: [
      'Working days are not computed, because that requires a holiday calendar for the relevant state or country.',
      'Different conventions apply in different contexts. Banks, courts and contract clauses often define how days are counted, and their definition governs.',
      'The tool does not model time of day, so part-days are not represented.'
    ],
    useCases: [
      'Checking a notice period or a cooling-off window before agreeing to it.',
      'Measuring the elapsed time between two events for a record or report.',
      'Counting the days available before a deadline when the deadline is expressed as a period.'
    ],
    faqs: [
      {
        q: 'Does the calculation include both the start and the end date?',
        a: 'No. The tool measures the interval between the dates with one endpoint excluded, which is the usual way elapsed time is expressed. If your rule counts both days, add one to the result.'
      },
      {
        q: 'Does it exclude weekends and holidays?',
        a: 'It counts every calendar day. Working-day calculations need a holiday calendar and a rule for weekly offs, neither of which is modelled here.'
      },
      {
        q: 'Can I use this to work out interest for a number of days?',
        a: 'You can use the day count as a starting point, but interest calculations follow day-count conventions defined by the lender or contract, and those sometimes count differently.'
      }
    ]
  },

  discount: {
    overview:
      'Retail discounts are quoted in ways that are easy to misread. Two successive discounts are not the same as their sum, and a discount advertised against maximum retail price can be worth less than it appears once the selling price is compared. This tool computes the discount amount and final price for a given rate so the actual saving is clear.',
    formula: {
      expression: 'Discount = Price x Rate / 100    |    Final price = Price - Discount',
      notes: [
        'The discount is computed on the price you enter, which should be the price the discount applies to.',
        'Discounts applied one after another multiply rather than add, because the second applies to the already-reduced price.',
        'The tool models a single discount rate, so stacked offers are handled by applying it once per stage.',
        'The final price can never fall below zero.'
      ]
    },
    example:
      'A Rs 2,499 item at 30% off gives Rs 750 off and a final price of Rs 1,749. The same item offered as 20% followed by 10% ends at about Rs 1,799, an effective reduction of roughly 28% rather than 30%, because the second discount applies to the reduced price.',
    assumptions: [
      'The discount applies to the marked price with no further conditions.',
      'Only one discount stage is applied in a single calculation.',
      'No additional charges, delivery fees or taxes are added after the discount.'
    ],
    limitations: [
      'Advertised discounts are often measured against maximum retail price rather than a realistic selling price, which overstates the saving.',
      'Bank offers and coupons frequently carry caps, minimum spends or card conditions that reduce the effective benefit.',
      'Whether the displayed price already includes tax depends on the retailer, so the final payable amount can differ from the discounted figure.'
    ],
    useCases: [
      'Checking the real saving on a sale price before buying.',
      'Comparing two offers expressed in different formats, such as a percentage against a flat amount.',
      'Calculating what price a cash discount produces in a negotiation.'
    ],
    faqs: [
      {
        q: 'Is 20% plus 10% the same as 30% off?',
        a: 'No. Successive discounts multiply. A 20% discount followed by 10% gives an effective reduction of about 28%, because the second discount is applied to the already-reduced price.'
      },
      {
        q: 'Is a flat Rs 500 off better than 20% off?',
        a: 'It depends on the price. A flat amount is worth relatively more on a cheap item and relatively less on an expensive one, so convert both to the final price before comparing.'
      },
      {
        q: 'Is the final price inclusive of tax?',
        a: 'That depends on the retailer and the marketplace. Most listed consumer prices in India include GST, but trade quotations often do not, so confirm before treating the figure as the amount payable.'
      }
    ]
  },

  bmi: {
    overview:
      'Body Mass Index compares weight with height to give a single screening number, and it is widely used as a first indicator of whether weight is in a healthy range. For people of South Asian descent, risk rises at a lower BMI than international thresholds assume, so Indian guidelines classify a lower range as overweight. This tool applies those Asian Indian cut-offs rather than the international ones.',
    formula: {
      expression: 'BMI = Weight in kilograms / (Height in metres)^2',
      notes: [
        'Height is converted from centimetres to metres before squaring.',
        'The result is expressed in kilograms per square metre and shown to one decimal place.',
        'The tool classifies the result using Asian Indian cut-offs: underweight below 18.5, normal 18.5 to 22.9, overweight 23 to 24.9, and obese at 25 and above.',
        'Those thresholds are lower than the international classification, where overweight normally starts at 25.'
      ]
    },
    example:
      'Someone 172 cm tall weighing 68 kg has a BMI of 23.0, which falls in the overweight band under the Asian Indian cut-offs used here, even though the same value would sit in the normal range under international thresholds.',
    assumptions: [
      'The calculation is for adults, not children or adolescents, who use age and sex specific charts.',
      'Height and weight are entered accurately and represent a stable measurement.',
      'The Asian Indian classification is the appropriate reference for the person being assessed.'
    ],
    limitations: [
      'BMI cannot distinguish muscle from fat, so muscular people can be classified as overweight while carrying little excess fat.',
      'The measure ignores where fat is stored, and central obesity is a risk factor that BMI alone will not reveal.',
      'Pregnancy, significant fluid retention or recent illness make the result unreliable.',
      'BMI is a screening indicator, not a diagnosis, and it does not replace a clinical assessment.'
    ],
    useCases: [
      'Tracking weight direction over months at the same measured height.',
      'Understanding why Indian guidelines flag risk at a lower BMI than international charts.',
      'Preparing a basic health summary before a routine check-up.'
    ],
    faqs: [
      {
        q: 'Why does my BMI fall in the overweight range at 23?',
        a: 'Asian Indian guidelines place the overweight threshold at 23 rather than 25, because cardiometabolic risk is observed at a lower BMI in South Asian populations. The tool follows those guidelines.'
      },
      {
        q: 'Is BMI accurate for muscular people?',
        a: 'No. BMI uses total weight and cannot distinguish muscle from fat, so athletes and very muscular people can be classified as overweight despite low body fat.'
      },
      {
        q: 'What does BMI miss that I should also track?',
        a: 'Fat distribution. Waist circumference and waist-to-height ratio both capture central adiposity, which BMI does not. Combining measurements gives a more useful picture than BMI alone.'
      }
    ]
  }
};
