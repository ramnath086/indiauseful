import type { CalculatorGuideKey } from './calculatorGuides';

export interface Guide {
  slug: string;
  title: string;
  category: 'banking' | 'finance' | 'jobs';
  readTime: string;
  date: string;
  summary: string;
  calculatorIds: CalculatorGuideKey[];
  content: string;
}

/** Long-form companions to the existing calculators; rates in examples are assumptions, not offers. */
export const GUIDES: Guide[] = [
  {
    slug: 'home-loan-emi-salary-affordability-guide',
    title: 'Home Loan EMI and Salary Affordability: A Practical Planning Guide',
    category: 'banking',
    readTime: '6 min read',
    date: '2026-10-02',
    summary: 'Understand home loan EMI, compare tenures and test affordability against take-home salary, existing repayments and a realistic household budget.',
    calculatorIds: ['home-loan', 'emi', 'salary', 'ctc-inhand'],
    content: `
### Start with the Monthly Budget, Not the Maximum Sanction

A home loan connects a property purchase to many years of salary. The most useful question is not simply how much a bank might lend, but how much you can repay while meeting everyday expenses, keeping an emergency reserve and continuing important savings. A lender's eligibility decision and your own comfortable repayment limit are different things.

Use the [Home Loan EMI Calculator](/calculators/home-loan-emi-calculator) to estimate the monthly instalment, total interest and repayment schedule. It models a fully disbursed reducing-balance loan at the rate you enter. It does not approve an application, assess your salary or decide how much of a property price can be financed. All rates and budget percentages below are illustrations, not bank offers or universal eligibility rules.

### The Inputs That Determine EMI

The three inputs are principal, annual interest rate and tenure. Principal means the amount borrowed, not the complete property price. Your down payment reduces the principal; stamp duty, registration, processing charges and other purchase costs need their own cash budget unless they are actually financed.

**EMI = P × r × (1 + r)^n / [(1 + r)^n − 1]**

Here P is the loan principal, r is the annual percentage rate divided by 1,200, and n is the number of monthly instalments. At an assumed 8.5% a year, r is 0.085 divided by 12. A 20-year loan has 240 monthly payments. Mixing an annual rate with a monthly tenure produces an incorrect result.

Each instalment pays interest on the outstanding balance and then reduces principal. Early payments contain more interest because the balance is still large. Later payments repay more principal. This is why an unchanged EMI does not mean an unchanged interest charge every month.

### A Home Loan Example You Can Reproduce

Enter a principal of **₹50,00,000**, an assumed annual rate of **8.5%** and a tenure of **20 years**:

- Monthly EMI is approximately **₹43,391**.
- Total scheduled repayment is approximately **₹1,04,13,840**.
- Total interest is approximately **₹54,13,840**.

The total uses the calculator's rounded monthly EMI. A lender may use different rounding, payment dates or final-instalment adjustments. The result also excludes fees, insurance and changes in the rate. It is a comparison baseline, not the amount on a future sanction letter.

### Relating EMI to Salary

Use dependable monthly income after deductions, not annual CTC divided by twelve. Employer provident fund, gratuity provisions, variable pay and non-cash benefits may be part of CTC without becoming monthly spending money. An annual bonus should not fund an EMI that falls due every month unless you have deliberately set aside the cash.

Our [In-Hand Salary Calculator](/calculators/salary-calculator) and [CTC Breakdown Calculator](/calculators/ctc-inhand-calculator) help explain the structure, but their take-home illustration is **before income-tax TDS**. Reconcile it with an actual payslip and deduct income tax and any other regular deductions before using it as your household income.

One useful comparison is **total monthly loan repayments ÷ dependable monthly take-home income**. Include existing personal, vehicle and other loan payments as well as the proposed home EMI. There is no single percentage that establishes safe affordability for every household or determines approval at every lender.

### A Salary-Affordability Illustration

Suppose dependable monthly take-home income is ₹80,000 and you choose, purely for planning, to keep total loan repayments within 35% of that amount. That gives a repayment budget of ₹28,000. With no other loans, at the assumed 8.5% rate and 20-year tenure, this corresponds to a principal of roughly **₹32.3 lakh**, not ₹50 lakh.

If an existing loan already costs ₹8,000 each month, the same budget leaves only ₹20,000 for the home EMI. You should also check the cash left after repayments against rent during construction, groceries, school fees, insurance, dependants and savings. A percentage is a starting point; it cannot replace your actual expense list.

The ₹50 lakh example costs ₹43,391 a month, approximately 54% of an ₹80,000 take-home salary before any other repayments. Whether that is manageable depends on the household, but it is clearly a different commitment from the ₹28,000 planning budget.

### Lower EMI Does Not Necessarily Mean Lower Cost

For the same ₹50 lakh principal and assumed 8.5% rate:

- **15 years:** EMI about ₹49,237; total interest about ₹38.63 lakh.
- **20 years:** EMI about ₹43,391; total interest about ₹54.14 lakh.
- **25 years:** EMI about ₹40,261; total interest about ₹70.78 lakh.
- **30 years:** EMI about ₹38,446; total interest about ₹88.41 lakh.

Longer tenure buys monthly breathing room, but keeps principal outstanding for longer. Select a term that balances affordability and lifetime cost rather than minimising EMI alone. If you plan to shorten the term through future prepayments, also test what happens if those bonuses or surplus payments never arrive.

### Stress-Test the Rate and the Income

The calculator holds the selected rate constant. A floating-rate home loan can reset, and the lender may change EMI, tenure or both. For illustration, ₹50 lakh over 20 years at 10%, rather than 8.5%, requires an EMI of about ₹48,251. That is roughly ₹4,860 more each month on a fresh constant-rate comparison; the effect of a real reset depends on the balance and remaining term then.

Run a lower-income scenario too. Consider a break between jobs, parental leave or one household earner temporarily losing income. An emergency reserve matters because the lender's payment schedule continues even when your salary does not. Do not treat money required for the down payment and closing costs as an emergency fund that remains available after purchase.

### What the EMI Estimate Leaves Out

Under-construction purchases may involve staged disbursement and interest-only pre-EMI payments. Those are not the same as a standard repayment schedule beginning with the entire principal outstanding. Processing charges, insurance added to the loan, delayed payments and property costs can also change your total outgo.

The calculator does not calculate home-loan tax deductions. Eligibility depends on the applicable law, tax regime, property use and other conditions. Do not reduce the EMI budget by an assumed tax saving before checking that the saving is actually available to you.

### Questions to Resolve Before Applying

**Can the calculator tell me the salary required for approval?** No. It shows repayment arithmetic. A lender separately assesses documented income, other obligations, credit history, age, property and its lending policy.

**Should I always choose the shortest term?** A shorter term lowers interest but raises EMI. It is useful only if the payment leaves enough room for essential spending and a reserve.

**Does a future salary increase make today's EMI affordable?** Not by itself. Test today's dependable income first; treat later increases as an opportunity to save or prepay rather than a certainty needed to keep paying.

### Continue Your Loan Planning

Read the [personal loan flat-versus-reducing guide](/articles/personal-loan-flat-vs-reducing-interest-guide) when comparing another monthly obligation. For an existing housing loan, the [prepayment: EMI versus tenure guide](/articles/loan-prepayment-emi-vs-tenure-guide) explains the two choices after a part-payment. Use the [Loan Prepayment Calculator](/calculators/loan-prepayment-calculator) only after separating the cash you can genuinely spare from your emergency reserve.
    `
  },
  {
    slug: 'personal-loan-flat-vs-reducing-interest-guide',
    title: 'Personal Loan EMI: Flat Rate vs Reducing Balance Explained',
    category: 'banking',
    readTime: '6 min read',
    date: '2026-10-02',
    summary: 'Compare flat and reducing-balance personal loan quotes using EMI, total repayment, fees and the amount actually received.',
    calculatorIds: ['personal-loan', 'emi'],
    content: `
### The Same Headline Rate Can Describe Different Loans

A personal loan quote is meaningful only when you know how interest is charged. A 10% flat rate and a 10% reducing-balance rate are not equivalent, even if the principal and tenure are identical. Under a flat-rate calculation, interest is based on the original principal for the whole term. Under reducing balance, each month's interest is based on what remains unpaid.

The [Personal Loan EMI Calculator](/calculators/personal-loan-emi-calculator) uses the **reducing-balance method**. It estimates a fixed monthly instalment, total scheduled interest and total repayment. It does not convert a flat quote automatically, include processing fees or assess whether a lender will sanction the loan. Treat example rates as assumptions, not currently available offers.

### How Reducing-Balance EMI Works

For principal P, monthly rate r and n monthly payments, the standard formula is:

**EMI = P × r × (1 + r)^n / [(1 + r)^n − 1]**

Divide the annual percentage rate by 1,200 to obtain r. Convert a three-year tenure to 36 months. Interest for each month is the opening balance multiplied by r. The remainder of that EMI repays principal, so the next month's interest is computed on a smaller balance.

An early instalment therefore contains more interest than a late one. The overall payment can remain unchanged while its components change. Total scheduled interest is the rounded EMI multiplied by the number of payments, minus the principal, which is the convention used by this calculator.

### The Calculator's Default Example

A loan of **₹3,00,000 at an assumed 12.5% reducing rate for three years** gives:

- EMI of approximately **₹10,036**.
- Total repayment of approximately **₹3,61,296**.
- Total scheduled interest of approximately **₹61,296**.

This assumes full disbursement at the start, timely monthly payments and an unchanged rate. It excludes processing charges, insurance, late fees and foreclosure costs. A lender's exact schedule may differ slightly through rounding or payment dates. Those qualifications matter when reconciling an estimate with an actual offer.

### What a Flat Interest Quote Means

The simple flat-interest calculation is **principal × annual flat rate × years**. Divide principal plus that interest by the number of instalments to obtain the flat monthly payment. This charges interest on the original principal even though you are repaying it throughout the term.

For **₹3,00,000 at a 10% flat rate for three years**:

- Flat interest is ₹3,00,000 × 10% × 3 = **₹90,000**.
- Total repayment is **₹3,90,000**.
- Monthly payment is approximately **₹10,833** over 36 months.

Now compare the same principal and tenure at a **10% reducing-balance rate**. EMI is about **₹9,680**, total repayment about **₹3,48,480**, and interest about **₹48,480**. The same headline percentage produces very different costs because the interest bases are different.

### Why You Cannot Enter the Flat Rate as the Reducing Rate

Entering 10% into a reducing-balance calculator does not model a 10% flat loan. It models the cheaper reducing-balance example above. To compare a flat offer, first establish its actual instalments and all fees, then compare the resulting cash flows or the lender's annual percentage rate.

Ignoring fees and assuming equal monthly repayments, the 10% flat illustration has an equivalent nominal annual reducing rate of roughly **17.9%**. That figure is specific to this principal, term and payment pattern; it is not a universal conversion factor. A different tenure, advance instalment or fee changes the comparison.

Do not use a rule such as multiplying every flat rate by two and assume the result is exact. The relationship must be derived from the repayment cash flows. Request the lender's repayment schedule and the basis of its rate rather than relying on an advertisement's smallest number.

### Fees Change the Effective Cost

The amount sanctioned and the amount credited can differ. Suppose a ₹3 lakh loan has an illustrative 2% processing fee deducted upfront. You receive ₹2,94,000 before any applicable tax or other deduction, but the loan may still calculate EMI on ₹3,00,000. You repay a larger amount than you actually received.

That is why a rate comparison should include:

- The amount actually credited to your account.
- The number, amount and dates of instalments.
- Processing charges and applicable taxes.
- Insurance or other products added to the principal or deducted upfront.
- Any final payment, advance instalment or mandatory charge.

A loan with a slightly lower quoted rate can cost more after fees. Compare the lender's disclosed APR and total cash outgo on the same requested amount and tenure. Do not assume that charges absent from this calculator are absent from the loan.

### Choose Tenure by Both EMI and Total Repayment

Extending a personal loan generally reduces the instalment but increases the period over which interest is charged. A lower EMI may make the monthly budget workable, but it does not make the loan cheaper. A shorter term can reduce total interest while leaving too little cash for essential expenses.

Keep a comparison record with principal, reducing or flat basis, tenure, EMI, total repayment and net disbursement. Change one input at a time when using the calculator, so you can identify whether a difference comes from the rate or from a longer repayment term.

Check the payment against dependable take-home income after income tax and other deductions. Annual CTC, variable pay and an expected bonus are not interchangeable with monthly spending money. Existing repayments also reduce the room available for a new loan.

### Prepayment Is a Separate Decision

If you expect to repay early, ask when part-payment or foreclosure is permitted and what charges or conditions apply. The normal EMI projection assumes you make every scheduled payment. It does not model a lender's lock-in period, foreclosure fee or method for settling unearned interest on a flat-rate contract.

Do not estimate a foreclosure amount simply by adding the remaining instalments. A settlement can include outstanding principal, accrued interest and contract-specific charges. Obtain a dated statement from the lender. The [Loan Prepayment Calculator](/calculators/loan-prepayment-calculator) illustrates reducing-balance interest savings, not every possible personal loan contract.

### Reading an Offer Before You Accept It

Confirm the rate basis in writing. Ask whether the offer is fixed or floating, when the first instalment falls due and whether any instalment is collected in advance. Compare the sanction amount with the net amount credited. Read the repayment schedule alongside the charges rather than separately.

A low monthly payment should not conceal a long term or extra amounts financed. A quoted rate range is not a promise that your credit profile will receive the lowest rate. The calculator can help compare an offer once its terms are known; it cannot predict the result of underwriting.

### Frequently Asked Questions

**Is flat interest always the lower-cost option because its percentage looks smaller?** No. Compare the entire repayment stream and fees. The example shows why a smaller-looking flat percentage can imply a much higher reducing rate.

**Does EMI decline each month on a reducing loan?** Not necessarily. In the fixed-rate model, EMI stays constant while the interest part declines and the principal part rises.

**Can the calculator show the true APR?** No. It does not include the full dated cash flows and charges needed for that calculation. Use it for the reducing-balance EMI and request the disclosed APR from the lender.

### Related Guides and Tools

If this loan will sit alongside a housing loan, read the [home loan and salary-affordability guide](/articles/home-loan-emi-salary-affordability-guide). The [prepayment: EMI versus tenure guide](/articles/loan-prepayment-emi-vs-tenure-guide) explains what happens to a reducing-balance loan after a part-payment. For vehicle borrowing, compare the [car loan down-payment and tenure guide](/articles/car-loan-down-payment-tenure-guide).
    `
  },
  {
    slug: 'car-loan-down-payment-tenure-guide',
    title: 'Car Loan EMI: Down Payment, On-Road Price and Tenure',
    category: 'banking',
    readTime: '6 min read',
    date: '2026-10-02',
    summary: 'Work out the financed vehicle amount, compare down payments and tenures, and separate car loan EMI from the full cost of ownership.',
    calculatorIds: ['car-loan', 'emi'],
    content: `
### Begin with the Amount You Will Actually Finance

A car's advertised price and the principal on a loan are different numbers. The on-road quote can include registration, insurance and other charges. Your down payment reduces the financed amount, while accessories or insurance added to the loan can increase it. Before comparing EMI, obtain a written breakdown of what is being paid upfront and what is being borrowed.

The [Car / Vehicle Loan Calculator](/calculators/car-loan-emi-calculator) models a standard reducing-balance loan. Enter the financed principal, an assumed annual rate and the tenure. The result is an EMI and interest illustration, not a dealer offer, loan eligibility decision or complete ownership budget. Rates used here are examples, not quotations for new or used vehicles.

### From On-Road Price to Loan Principal

Start with **financed principal = costs included in the financing − cash down payment**. A ₹10 lakh on-road purchase with a ₹2 lakh down payment leaves a ₹8 lakh principal if the entire remaining quote is financed. If you pay a charge separately, do not also include it in the loan. If a fee is added to the borrowing, include it before calculating EMI.

Be precise about the word down payment. A refundable booking amount, a trade-in credit and a cash payment can affect the final balance differently. Reconcile all of them against the invoice and sanction letter, rather than assuming the quoted percentage applies to every element of the price.

The calculator has no separate down-payment field. Work out the net principal first and enter that amount. Entering the complete on-road price when you are paying part of it in cash overstates both EMI and total interest.

### How the Monthly Instalment Is Calculated

The loan uses the same reducing-balance formula as other EMI loans:

**EMI = P × r × (1 + r)^n / [(1 + r)^n − 1]**

P is the financed principal, r is the annual percentage rate divided by 1,200, and n is the number of monthly payments. Interest is charged on the outstanding balance. Each instalment first meets that month's interest and then repays principal.

The model assumes the selected rate stays unchanged and every payment arrives on time. Processing charges paid separately, insurance renewals and running costs are not part of the displayed interest. The last instalment on a lender's statement may differ because of exact dates and rounding.

### A Five-Year Vehicle Loan Example

For the ₹10 lakh on-road purchase and ₹2 lakh down payment, enter **₹8,00,000**, an assumed rate of **8.9%** and **five years**:

- Monthly EMI is approximately **₹16,568**.
- Scheduled loan repayments total approximately **₹9,94,080**.
- Interest is approximately **₹1,94,080**.

The down payment is additional to the loan repayments. In this simplified example, ₹2 lakh upfront plus ₹9,94,080 repaid gives ₹11,94,080 before any separately paid charges and ownership expenses. Looking only at the repayment total would leave out the cash paid at purchase.

### What a Larger Down Payment Changes

Keep the ₹10 lakh price, assumed 8.9% rate and five-year term unchanged:

- **₹1 lakh down:** borrow ₹9 lakh; EMI about **₹18,639**; interest about **₹2,18,340**.
- **₹2 lakh down:** borrow ₹8 lakh; EMI about **₹16,568**; interest about **₹1,94,080**.
- **₹3 lakh down:** borrow ₹7 lakh; EMI about **₹14,497**; interest about **₹1,69,820**.

More cash upfront reduces principal for the entire loan, so it reduces both EMI and interest. However, using all available savings for the down payment can leave you unable to meet an unexpected expense. Compare the interest saved with the liquidity you give up, rather than treating the largest possible down payment as automatically best.

A dealer's zero-down-payment offer does not remove the purchase cost. It finances more of it. Confirm whether a different price, fee or bundled product applies to that offer before comparing it with a cash contribution.

### Tenure: Smaller Instalment, Larger Interest Bill

For the same ₹8 lakh principal and assumed 8.9% rate:

- **Three years:** EMI about **₹25,403**; interest about **₹1,14,508**.
- **Five years:** EMI about **₹16,568**; interest about **₹1,94,080**.
- **Seven years:** EMI about **₹12,831**; interest about **₹2,77,804**.

The seven-year loan eases monthly cash flow but adds about ₹1.63 lakh of interest compared with the three-year illustration. That saving is meaningful only if the higher three-year EMI is affordable. Conversely, a long term chosen solely to reach an attractive monthly instalment can hide a substantial increase in the financing cost.

Compare tenure with how long you expect to keep the vehicle. Selling a car does not cancel its loan. You may need to settle the outstanding balance and complete the lender's release process before transferring it.

### A Depreciating Vehicle and an Outstanding Loan

The vehicle's resale value and the loan balance follow different paths. Resale value depends on age, mileage, condition and market demand, while the balance follows the repayment schedule. A long loan can leave a substantial balance when you want to sell or replace the vehicle.

Do not assume an insurance settlement or trade-in valuation will always cover that balance. The calculator does not forecast resale value or insured value. Those are separate estimates, and the difference can matter if the vehicle is sold or written off before the borrowing is cleared.

A down payment creates some initial equity in the vehicle, but it does not guarantee a particular resale outcome. The useful check is to compare the remaining loan obligation with a realistic sale estimate at the time, not with the original purchase price.

### Budget for Ownership, Not Just EMI

Fuel or charging, routine service, tyres, parking, tolls and insurance renewals all sit outside the EMI. Build a monthly ownership allowance as well as a purchase budget. A vehicle can have an affordable loan instalment while its overall running costs are still too high for the household.

Use dependable take-home income after deductions. Include existing home or personal loan instalments and avoid depending on uncertain variable pay. If a larger down payment prevents you from retaining a reserve for repairs or job disruption, the lower EMI may not be enough to compensate.

### Comparing Dealer and Bank Offers

Compare the same financed amount and tenure, not just two headline rates. Ask whether each rate is flat or reducing. A subsidised or promotional offer may involve a different vehicle price, processing fee, mandatory product or early-settlement condition.

The [personal loan flat-versus-reducing guide](/articles/personal-loan-flat-vs-reducing-interest-guide) explains why the rate basis matters. Do not enter a flat percentage directly into this reducing-balance calculator and interpret the output as the dealer's schedule.

If you expect to prepay, obtain the applicable part-payment and foreclosure conditions. The ordinary car loan projection includes no early settlement. A future prepayment is not certain simply because you expect a bonus.

### Frequently Asked Questions

**Should I enter ex-showroom or on-road price?** Enter the actual amount financed after the down payment and any separately paid charges. Neither price is automatically the correct loan principal.

**Does a larger down payment only lower EMI?** It also lowers interest, because less principal remains outstanding throughout the term. The trade-off is having less cash available today.

**Is a seven-year term always easier to afford?** The EMI is smaller, but ownership costs continue and total interest is greater. Check both the monthly budget and the likely period of ownership.

### Continue the Comparison

Use the [Car Loan Calculator](/calculators/car-loan-emi-calculator) for consistent scenarios. The [home loan salary-affordability guide](/articles/home-loan-emi-salary-affordability-guide) explains how to budget for several repayments together. The [prepayment: EMI versus tenure guide](/articles/loan-prepayment-emi-vs-tenure-guide) helps distinguish monthly relief from lifetime interest savings.
    `
  },
  {
    slug: 'loan-prepayment-emi-vs-tenure-guide',
    title: 'Loan Prepayment: Reduce EMI or Shorten Tenure?',
    category: 'banking',
    readTime: '6 min read',
    date: '2026-10-02',
    summary: 'Understand how a part-payment reduces outstanding principal, why tenure reduction and EMI reduction differ, and what this calculator actually models.',
    calculatorIds: ['loan-prepayment', 'home-loan'],
    content: `
### A Part-Payment Changes Principal, Not Just the Next Bill

A loan prepayment is an additional payment against the outstanding principal. On a reducing-balance loan, future interest is charged on that smaller balance. The benefit is not merely the amount you paid: it is also the interest that amount no longer attracts over the remaining term.

The [Loan Prepayment Calculator](/calculators/loan-prepayment-calculator) compares a scheduled loan with the same loan after one lump-sum part-payment. It **keeps the EMI unchanged and shortens the tenure**. It does not provide an automatic comparison of both post-prepayment choices, model multiple part-payments or include lender-specific charges. Knowing this assumption is essential before reading the interest-saving result.

### The Two Common Choices After Prepayment

With a lower principal balance, a lender can recalculate the schedule in two broad ways. You may keep paying the existing EMI and finish sooner, or keep the remaining repayment period and reduce the EMI. The lender's process and your instructions determine what actually happens.

**Tenure reduction** directs the existing monthly repayment toward a smaller loan. More of the EMI clears principal, and the loan ends earlier. **EMI reduction** spreads the smaller loan across the original remaining months. It releases monthly cash, but leaves the balance outstanding longer than the unchanged-EMI option.

For the same part-payment, rate and starting balance, keeping the EMI generally saves more interest. Reducing EMI can still be the right priority if your income has fallen or monthly commitments need relief. The choice is between two cash-flow outcomes, not a universal recommendation for every borrower.

### How the Calculator Builds the Comparison

The model first calculates the normal EMI using the principal, rate and original tenure. It then works through the loan month by month. Each payment covers that month's interest and reduces principal. After the scheduled instalment in the selected prepayment month, it subtracts the additional payment from the balance.

The original EMI continues until the remaining balance is cleared. The tool compares total interest in this shortened schedule with the original scheduled interest. It also shows how many months are removed. It is not a calculation of the lender's settlement amount or a guarantee that the lender will apply your payment on that exact date.

The selected year is converted to months. In the example below, year three means the extra payment follows the **36th scheduled monthly instalment**, not the beginning of the third year. A payment made earlier or later produces a different saving.

### A Worked Tenure-Reduction Example

Use **₹40,00,000**, an assumed annual rate of **8.75%**, an original tenure of **20 years**, and a **₹2,00,000** prepayment after **three years**:

- Original rounded EMI is approximately **₹35,348**.
- Principal outstanding after 36 regular payments is approximately **₹37.47 lakh**.
- After the additional ₹2 lakh payment, the balance is approximately **₹35.47 lakh**.
- Keeping the EMI unchanged saves approximately **₹6,11,721** of interest in the model.
- The loan closes about **22 months early**.

These are constant-rate, no-fee illustrations using the existing tool's rounding. A floating-rate reset, a different posting date, an additional payment or a lender charge changes the result. The large interest saving is possible because the reduced principal would otherwise remain outstanding for many more years.

### What EMI Reduction Would Look Like Instead

After the same 36 payments and ₹2 lakh prepayment, there are 204 months left in the original schedule. Re-amortising the approximate ₹35.47 lakh balance at the same assumed 8.75% rate over those 204 months gives an EMI of roughly **₹33,462**, rather than ₹35,348.

That frees about **₹1,886 per month**. The illustrative lifetime interest saving is around **₹1.85 lakh**, rather than the roughly ₹6.12 lakh from holding EMI constant. The comparison accounts for the extra ₹2 lakh paid upfront; it is not simply the reduction in monthly payments multiplied by the remaining months.

This separate example explains the choice. The prepayment widget itself continues to model tenure reduction only. To assess a lender's EMI-reduction proposal, ask for the actual outstanding balance and revised schedule, then use the [Loan EMI Calculator](/calculators/emi-calculator) with the new principal and remaining tenure.

### Why Earlier Prepayments Usually Save More

An earlier principal reduction avoids interest for more months. A payment late in the loan may still reduce the balance, but has less time to generate savings. The exact benefit depends on the rate, remaining balance, payment amount and what happens to EMI or tenure afterward.

This does not mean every available rupee should immediately go toward the loan. Paying an emergency reserve into principal may force you to borrow more expensive credit later. Keep enough accessible money for near-term expenses before comparing an interest saving with another use of funds.

### Charges and Conditions Can Change the Decision

Prepayment terms depend on the loan, lender, rate type and applicable rules. Some loans permit part-payments without a charge; others can have restrictions or charges. Do not infer your contract's conditions from this calculator's no-penalty assumption.

Check the minimum payment, permitted frequency, settlement date and any fee or applicable tax on that fee. A charge reduces the net benefit. An amount paid toward an overdue instalment or another charge is not necessarily credited entirely to principal, so check the statement after making the payment.

For a floating loan, also check how a later rate reset changes the schedule. This model assumes a single constant rate and cannot tell you the final saving across unknown future resets.

### Prepaying Versus Keeping the Money Invested

A repayment reduces future contractual interest, while an investment has its own return, tax, risk and liquidity conditions. Compare like with like. A speculative gross investment return is not directly comparable with a loan interest charge that must be met every month.

If an investment would mature soon, consider access and penalties as well as returns. If you are using deposit proceeds, the [FD maturity guide](/articles/fd-maturity-quarterly-compounding-guide) explains why the gross maturity figure is not the same as money available after tax and any early-closure adjustment.

Tax deductions on a loan are conditional, not an automatic discount on the rate. Verify whether any relevant deduction applies before deciding the after-tax borrowing cost. This calculator estimates loan interest, not your tax position.

### Give the Lender a Clear Instruction

Specify whether you want **tenure reduction** or **EMI reduction** rather than assuming the lender will select your preferred option. Obtain acknowledgement of the principal amount credited and ask for the revised schedule. Check the new closing date or instalment against the choice you requested.

Keep proof of the payment and avoid cancelling the regular EMI instruction just because an extra payment has been made. The normal instalment can still fall due while the part-payment is being processed.

### Frequently Asked Questions

**Does the calculator's saving include the part-payment itself?** The saving shown is avoided interest, not the amount of principal repaid. The extra payment is your own money used to clear part of the debt sooner.

**Will the next EMI fall automatically?** Not necessarily. It depends on your instruction and the lender's revised schedule. This tool explicitly leaves EMI unchanged.

**Can I use the result for several annual prepayments?** Not as a combined forecast. It models one payment. A sequence of payments needs a schedule that accounts for each amount and date.

### Related Loan Planning

The [home loan and salary-affordability guide](/articles/home-loan-emi-salary-affordability-guide) helps decide whether you need monthly relief or can comfortably retain the existing EMI. The [personal loan flat-versus-reducing guide](/articles/personal-loan-flat-vs-reducing-interest-guide) explains why a flat-rate contract may need a different settlement comparison.
    `
  },
  {
    slug: 'fd-maturity-quarterly-compounding-guide',
    title: 'FD Maturity Calculation: Quarterly Compounding, Interest and TDS',
    category: 'banking',
    readTime: '6 min read',
    date: '2026-10-02',
    summary: 'Calculate cumulative fixed-deposit maturity, understand quarterly compounding and distinguish gross interest, TDS and final tax liability.',
    calculatorIds: ['fd'],
    content: `
### What an FD Maturity Estimate Represents

A fixed deposit places a lump sum with a provider for a chosen term. For a cumulative deposit, interest is reinvested and paid with the principal at maturity. A payout deposit distributes interest during the term instead. Those products can quote similar annual rates while producing different cash flows.

The [FD Calculator](/calculators/fd-calculator) estimates a **cumulative deposit with quarterly compounding**. It shows invested principal, gross interest and maturity value. It does not calculate income tax, deduct TDS, select a bank's current rate or apply a premature-closure penalty. Use the actual booked rate and product conditions for planning, and treat rates in this guide as illustrations.

### The Quarterly-Compounding Formula

The model uses **maturity = P × (1 + R / 400)^(4 × t)**. P is the original deposit, R is the annual rate in percentage points, and t is the term in years. Dividing R by 400 produces a quarterly decimal rate. The exponent counts four quarters per year.

At an assumed 7.1% annual rate, a quarter earns 1.775% before considering any provider-specific convention. In a cumulative model, each quarter's interest joins the balance, so later quarters earn interest on both the principal and previously credited interest. That is the compounding effect.

The interest figure is maturity minus principal. Neither the principal nor the entire maturity value should be mistaken for interest income. Keeping those components separate is important when comparing returns and considering tax.

### A Worked Five-Year FD Example

Enter **₹1,00,000**, an assumed rate of **7.1%** and **five years**:

- Principal invested is **₹1,00,000**.
- Gross maturity is approximately **₹1,42,175**.
- Gross interest earned across the term is approximately **₹42,175**.

For comparison, simple interest at 7.1% for five years would give ₹35,500 of interest and ₹1,35,500 in total. Annual compounding at the same nominal rate would give about ₹1,40,912. Those are mathematical comparisons, not alternative promises from a particular bank.

A quarterly rate does not mean the deposit earns four times the annual quoted rate. The annual rate is divided across quarters; the modest additional growth comes from reinvesting the interest.

### Check Whether the Product Is Cumulative or Payout

If the bank pays interest to a savings account each month or quarter, that interest is no longer automatically compounding inside the FD. You may reinvest it elsewhere, but that creates another cash flow and potentially another rate. The cumulative calculator cannot assume that separate reinvestment occurs.

Monthly payout amounts can also follow product-specific discounting or payment conventions. Do not derive an exact monthly pension-style payout from the cumulative maturity figure. Read the deposit advice to confirm compounding, payout frequency, maturity date and the amount promised under the booked terms.

### Senior-Citizen Rates Are Product Terms

The calculator's senior-citizen switch adds **0.50 percentage points** to the base rate. It is a modelling assumption, not a rule that every bank or post-office product gives that uplift. Some providers have different extra rates, age criteria or special-tenure offers.

With the illustrative base 7.1% rate, the switch uses 7.6%. On ₹1 lakh for five years with quarterly compounding, that gives maturity of about **₹1,45,708**. If your quoted senior-citizen rate already includes the extra interest, avoid adding the bonus again. Match the effective rate displayed by the tool to your actual quote.

### TDS Thresholds from 1 April 2025

For resident depositors, the bank FD/RD interest TDS threshold from **1 April 2025** is **₹50,000 per year for others** and **₹1,00,000 for senior citizens**. Banks generally aggregate relevant interest across accounts and branches of the same bank; the threshold is not a separate allowance for every FD.

The usual TDS rate is **10% with PAN** and **20% without PAN**, subject to applicable exemptions, valid declarations or certificates and other relevant conditions. Non-resident deposits and other kinds of deposit providers can have different rules. These thresholds concern the relevant annual interest, not the principal placed or the total five-year maturity amount.

Once the applicable threshold is crossed, TDS is generally on the relevant interest, not just the amount above the threshold. For example, if a resident depositor below senior-citizen age earns ₹60,000 of relevant bank interest in a year, the usual 10% deduction with PAN would be ₹6,000 in the absence of an applicable exemption. It is not 10% of only the ₹10,000 excess.

### TDS Is Not the Final Tax Bill

A TDS threshold does not make interest below that figure tax-free. Deposit interest is generally taxable at the rate applicable to your income, with any eligible relief depending on your circumstances. TDS is tax collected in advance and credited against the final liability; it is not a separate extra return deduction that should be counted twice.

If your final tax is higher than the amount deducted, more may be payable. If it is lower, a refund may be available through the applicable filing process. Check the gross interest reported, TDS credit and provider's certificate against your records. Do not interpret the calculator's gross interest as an after-tax gain.

### Why Actual Maturity Can Differ

The model holds the rate constant and uses quarterly compounding over the entered years. Actual products may handle partial quarters, exact days, leap years, rounding and payout schedules differently. An FD renewed after maturity is a new rate decision, not necessarily a continuation at the old rate.

Premature closure can change both the rate used and the amount received, and may involve a penalty under the product terms. The full-term projection is not a premature-withdrawal quote. TDS deducted during the term can also affect reinvestment and the eventual amount credited, which the gross model does not simulate.

### Comparing Deposits for a Savings Goal

Compare principal, rate, term, compounding or payout option, maturity date and withdrawal conditions together. A higher rate on a longer term may not suit an expense that falls due earlier. A deposit ladder can spread maturity dates, but it does not remove the need to check provider terms and annual tax treatment.

Separate accessible emergency money from a deposit earmarked for a known future payment. The ability to close a deposit is not the same as receiving the projected maturity without adjustment. If you need to build savings monthly rather than invest a lump sum today, use the [RD Calculator](/calculators/rd-calculator) instead.

### Frequently Asked Questions

**Does quarterly compounding mean interest is tax-free until maturity?** No. Tax and TDS follow applicable credit, payment and reporting rules. Maturity timing alone does not settle the year in which interest is taxable.

**Can I treat the senior switch as a confirmed bank offer?** No. It applies the tool's fixed 0.50-point assumption. Confirm the rate and eligibility with the provider.

**Is the maturity amount already net of TDS?** No. The projection is gross and does not deduct TDS or final income tax.

### Related Savings Guides

Read the [RD maturity and monthly-deposit guide](/articles/rd-maturity-monthly-deposits-guide) for regular saving from income. The [PPF maturity and fifth-of-month guide](/articles/ppf-maturity-fifth-of-month-rule-guide) explains a different interest-timing system. If using deposit proceeds against a loan, see the [prepayment: EMI versus tenure guide](/articles/loan-prepayment-emi-vs-tenure-guide).
    `
  },
  {
    slug: 'rd-maturity-monthly-deposits-guide',
    title: 'RD Maturity Calculation: Monthly Deposits, Compounding and TDS',
    category: 'banking',
    readTime: '6 min read',
    date: '2026-10-02',
    summary: 'See how each recurring-deposit instalment earns for a different period, calculate gross maturity and apply the corrected bank-interest TDS context.',
    calculatorIds: ['rd'],
    content: `
### An RD Builds the Principal Over Time

A recurring deposit turns a regular monthly saving into a deposit balance that matures on a future date. Unlike an FD, the full principal is not present at the beginning. You add one instalment at a time, so earlier deposits earn interest for longer than later ones.

The [RD Calculator](/calculators/rd-calculator) estimates maturity for equal monthly deposits at a constant rate using its quarterly-compounding convention. It separates total invested from gross interest earned. It does not deduct tax, choose a current bank rate or model missed payments. The rate examples below are assumptions, not quotes from a bank or post office.

### Why You Cannot Use an FD Formula on the Total Deposits

Suppose you save ₹5,000 per month for three years. Total deposits are ₹1,80,000, but that whole amount is not invested for three years. The first instalment stays invested much longer than the last one. Treating ₹1,80,000 as a three-year FD overstates the period during which most of the money earns interest.

That comparison is especially important when a quoted maturity appears lower than expected. An RD is not paying the headline annual rate on all future deposits from the first day. The rate applies to money actually deposited, for the time it remains with the provider.

### The Calculation Used by This Tool

For each monthly instalment A, the calculator estimates **instalment maturity = A × (1 + R / 400)^(4 × months remaining / 12)**. R is the annual rate in percentage points. It then adds the maturity values of all instalments.

The first instalment is treated as invested at the start of the first modelled month. For a 36-month term, it earns for 36 months. The second earns for 35 months, and the final instalment for one month. Fractional quarterly periods are handled through the exponent in this simplified model.

Real providers may follow different exact-day, due-date or compounding conventions. The formula describes this calculator, not every RD product's contractual maturity calculation. It is useful for comparison when the same convention is used across scenarios.

### A Three-Year Worked Example

Enter **₹5,000 per month**, an assumed annual rate of **7.1%** and **three years**:

- Number of instalments is **36**.
- Total principal deposited is ₹5,000 × 36 = **₹1,80,000**.
- Gross maturity is approximately **₹2,01,001**.
- Gross interest across the term is approximately **₹21,001**.

The gross gain is not three years of interest on ₹1,80,000 because the principal accumulated gradually. Dividing the final gain by total deposits and calling that an annual return would also ignore the different investment dates.

If the monthly instalment doubles to ₹10,000 with the other inputs unchanged, maturity doubles to roughly ₹4,02,002 in the model. That larger corpus comes from contributing twice as much, not from receiving a better rate.

### Tenure and the Savings Commitment

At the same ₹5,000 monthly contribution and assumed 7.1% rate, a five-year projection has 60 deposits, ₹3 lakh invested and maturity of about **₹3,60,615**. The corpus is larger than the three-year example because you make more contributions and earlier deposits earn for longer.

A longer RD is also a longer monthly commitment. Select the instalment from a dependable surplus after rent, bills, insurance, loan repayments and essential savings. An amount that fits only in a bonus month can be difficult to maintain on every due date.

For a known goal, compare the maturity date with when the money is needed. A five-year maturity estimate cannot be used as the amount available after two years without checking premature-closure terms.

### Deposit Timing and Missed Instalments

The calculator assumes each payment is made at the start of its modelled month and no payment is missed. An actual RD has due dates and rules for delayed or failed payments. A late instalment may earn for fewer days and may attract a charge; continued defaults can have further consequences under the product terms.

A standing instruction can support regular payment, but only if the linked account has enough money. Check whether the first deposit, monthly due date and final instalment line up with the calculator's timing assumption. Small differences can explain a maturity amount that does not exactly match the estimate.

The tool does not simulate arrears or adjust the schedule after a missed month. Obtain a provider's statement rather than simply reducing total invested and assuming interest changes in the same proportion.

### Senior-Citizen Interest Assumptions

The senior-citizen switch adds a fixed **0.50 percentage points** to the base rate in the model. That is not a universal RD entitlement across every provider. Confirm whether the actual product offers an additional rate and whether you meet its eligibility conditions.

If a senior-citizen quote already includes the additional rate, do not count it twice by entering that rate as the base and selecting the switch. Compare the effective rate displayed with the actual contracted rate. Eligibility for an interest offer and the tax rules for senior citizens are separate questions.

### Bank RD Interest and TDS from 1 April 2025

For resident depositors, bank FD/RD interest TDS thresholds from **1 April 2025** are **₹50,000 per year for others** and **₹1,00,000 for senior citizens**. Relevant interest is generally aggregated across deposits and branches of the same bank. A separate RD does not create another independent threshold alongside your FDs at that bank.

The usual rate is **10% with PAN** and **20% without PAN**, subject to applicable exemptions, valid declarations or certificates and other conditions. The rules for non-residents or other deposit providers can differ. This is an annual interest threshold, not a threshold on instalments, principal or the entire maturity amount.

For example, ₹35,000 of relevant FD interest plus ₹25,000 of RD interest at the same bank totals ₹60,000. For a resident non-senior depositor without an applicable exemption, the ordinary 10% TDS with PAN would be ₹6,000 on that relevant interest. It is not a deduction only on the ₹10,000 above the threshold.

### Gross Maturity, TDS and Final Income Tax

The calculator shows a gross estimate without deducting tax. RD interest is generally taxable at the rate applicable to your income. Interest below the TDS threshold is not automatically exempt, and a 10% deduction does not establish a final 10% tax rate for everyone.

TDS is a credit against your tax liability. Depending on your overall income and eligibility, you may owe more tax or have a refund due. Reconcile the provider's interest statement and TDS credit with your own records instead of using only the maturity proceeds as a tax calculation.

Check whether tax deducted during the term affects the amount that remains invested under your product. The calculator does not model that effect, which is another reason a provider's final credit can differ from the gross projection.

### RD, FD or SIP: Choose the Right Cash-Flow Model

An FD suits a lump sum already available. An RD suits fixed monthly deposits under the provider's terms. A mutual fund SIP also uses regular contributions, but returns are market-linked rather than a deposit's contracted rate. Identical monthly contribution amounts do not make their risks or withdrawal conditions identical.

Compare the timing of cash flows, access before maturity, tax and the nature of returns before looking at a projected corpus. The [FD maturity guide](/articles/fd-maturity-quarterly-compounding-guide) and [SIP return-calculation guide](/articles/sip-return-calculation-guide) explain those other models without treating their assumptions as interchangeable promises.

### Frequently Asked Questions

**Why does the last deposit earn so little?** It remains invested for only a short time before maturity. The tool gives the final instalment one month, compared with the full term for the first.

**Does the calculator deduct TDS?** No. It estimates gross maturity. Consider relevant annual interest across your bank deposits separately.

**Can I skip a month and still receive the displayed amount?** No. The projection assumes every instalment is paid on time. Charges and interest changes depend on the product's rules.

### Related Tools

Use the [RD Calculator](/calculators/rd-calculator) for a monthly savings illustration and the [FD Calculator](/calculators/fd-calculator) only when the principal is available as a lump sum. For a longer-term scheme with a different monthly interest rule, read the [PPF maturity guide](/articles/ppf-maturity-fifth-of-month-rule-guide).
    `
  },
  {
    slug: 'sip-return-calculation-guide',
    title: 'SIP Return Calculation: Contributions, Compounding and Assumptions',
    category: 'finance',
    readTime: '6 min read',
    date: '2026-10-02',
    summary: 'Understand the monthly SIP future-value formula, test assumed returns and distinguish a projection from an actual mutual fund return.',
    calculatorIds: ['sip'],
    content: `
### A SIP Is an Investment Schedule, Not a Guaranteed Return

A Systematic Investment Plan is a way to invest regular amounts in a mutual fund scheme. The schedule can help you invest consistently, but it does not give the underlying investment a fixed return. Unit prices move, and the eventual value depends on the scheme and the market when you redeem.

The [SIP Calculator](/calculators/sip-calculator) answers a hypothetical question: what would a constant monthly contribution become if it earned a constant assumed rate for a selected period? It is not a fund recommendation, a forecast or evidence that a particular index or fund category will deliver the selected percentage. None of the example rates in this guide represent historical performance claims.

### What the Three Inputs Mean

Enter the monthly investment, the assumed annual rate and the number of years. The investment is kept unchanged throughout the model. A 15-year plan has 180 monthly instalments. Total contributed is monthly investment multiplied by the number of instalments.

The assumed return is a planning input. The calculator divides the annual percentage by 1,200 to get a monthly rate and compounds monthly. That convention is not the same as measuring a fund's realised annualised return from changing daily unit prices. Be consistent about the convention when comparing two calculators.

The term describes how long contributions continue. It is not a guarantee that a goal can be funded at any point during that period, or that a market-linked investment will have a particular value on the final date.

### The Future-Value Formula

The tool uses **FV = M × [((1 + i)^n − 1) / i] × (1 + i)**. M is the fixed monthly investment, i is the assumed monthly rate and n is the number of instalments. The final factor, (1 + i), means contributions arrive at the **start of each month**.

A month-end contribution model omits that last factor. It gives each instalment one less month of growth. A difference between two projections can therefore come from payment timing rather than an arithmetic error. Your actual debit and investment dates can vary, and a real portfolio does not earn an identical rate every month.

The calculator's projected gain is future value minus total contributed. A positive illustrative gain is not a promise that a real investment cannot fall below its contributions.

### A Worked Fifteen-Year SIP Example

For **₹10,000 per month**, an assumed annual rate of **12%** and **15 years**:

- Contributions total ₹10,000 × 180 = **₹18,00,000**.
- Projected future value is approximately **₹50,45,760**.
- Projected gain is approximately **₹32,45,760**.

The 12% figure is solely an assumption used to explain the calculation. It is not attached to Nifty 50, a large-cap fund or a mid/small-cap category. The result assumes timely contributions, constant monthly growth and no withdrawals or increase in the monthly amount.

### Test More Than One Assumed Rate

Keeping ₹10,000 per month and 15 years unchanged:

- At an assumed **8%**, future value is about **₹34,83,451**.
- At an assumed **10%**, future value is about **₹41,79,243**.
- At an assumed **12%**, future value is about **₹50,45,760**.

These are mathematical scenarios, not probabilities or suggested returns for different asset classes. A wide gap between them shows how sensitive a long-term goal is to the assumption. If a goal works only at the highest input, consider the size and duration of contributions rather than treating the optimistic projection as money already earned.

This tool does not simulate every adverse market outcome. A lower positive rate is still a constant-growth illustration; it is not a model of a prolonged loss or a sharp fall just before redemption.

### Time Changes Contributions as Well as Compounding

At ₹10,000 per month and an assumed 12%, the model gives approximately ₹8.25 lakh after five years, ₹23.23 lakh after ten, ₹50.46 lakh after fifteen and ₹99.91 lakh after twenty. Each longer scenario also includes more contributions.

Do not attribute the whole difference to investment performance. Five years involves ₹6 lakh of contributions, while twenty years involves ₹24 lakh. The remaining difference is projected growth under the selected assumption. Both the savings commitment and the time available matter.

Starting earlier can reduce the monthly contribution needed in a constant-rate model, but actual outcomes remain uncertain. An earlier start also means committing money for longer; check your liquidity needs and the risk of the underlying scheme.

### Rupee Cost Averaging Has Limits

A fixed amount buys more units when NAV is low and fewer when it is high. That spreads purchase prices across dates. It does not guarantee a profit, prevent loss or prove that SIP always outperforms investing a lump sum.

For example, ₹3,000 invested at NAV ₹30 buys 100 units; the same amount at NAV ₹20 buys 150 units. What those units eventually earn depends on the later NAV. More units purchased during a fall are helpful only in the context of the eventual value and the investor's ability to stay invested.

A lump sum invested earlier benefits sooner if the market rises; a gradual schedule can have a different outcome when prices fall first. There is no supported universal claim here about index rolling returns or one method always beating market timing. Compare the cash-flow dates and risk exposure rather than a slogan.

### Actual SIP Return and XIRR

For a real SIP, contributions are made on different dates and buy different numbers of units. Comparing the final value with total contributions ignores how long each instalment was invested. An annualised cash-flow measure such as XIRR uses the dates and amounts of investments and withdrawals.

That is different from the constant assumed rate entered into this future-value calculator. The tool does not calculate your portfolio's XIRR from account statements. Use actual transactions and redemption value when evaluating realised performance, and keep that evaluation separate from a planning projection.

### Fees, Tax, Inflation and Redemption Timing

The model does not separately deduct expense ratios, exit loads, taxes or inflation. Mutual fund NAV performance is ordinarily reported after scheme expenses, so do not blindly deduct an expense ratio again from a return assumption already based on a net figure. Know what your chosen assumption represents.

Exit loads and tax treatment depend on the scheme, holding periods, transactions and rules applicable at redemption. Each SIP instalment has its own purchase date. The entire SIP is not necessarily treated as a single investment made when the first contribution occurred.

Inflation changes what the future corpus can buy. Match a future-value estimate with a goal cost expressed for the same future date. Also allow for market risk near the goal: a large accumulated balance can experience a significant value change even if your monthly contribution is small in comparison.

### What Happens if the Contribution Changes?

A step-up SIP increases the instalment periodically. This calculator models a level amount and does not automatically increase it with salary. A higher future corpus from larger contributions should not be described as better investment performance.

Skipped payments, withdrawals and a pause also change the result. The model assumes every monthly investment arrives on time. Revisit a goal when contribution capacity changes rather than treating an old projection as a fixed entitlement.

### Frequently Asked Questions

**Is the default 12% a guaranteed or historical index return?** No. It is an illustrative input. It does not establish what any fund or index will earn.

**Can SIP remove market risk?** No. It spreads purchases across dates, but the underlying investment remains market-linked.

**Why do two calculators show different values?** They may use different rate conversion, instalment timing, rounding or step-up assumptions. Compare those conventions before comparing totals.

### Related Guides and Tools

For regular deposit saving instead of market-linked investment, read the [RD maturity guide](/articles/rd-maturity-monthly-deposits-guide). The [PPF maturity guide](/articles/ppf-maturity-fifth-of-month-rule-guide) explains a government-notified interest scheme, while the [NPS corpus and pension guide](/articles/nps-corpus-annuity-pension-guide) separates investment accumulation from annuity income. See also our [SIP versus lump-sum guide](/articles/sip-vs-lumpsum-mutual-funds-guide) for a cash-flow comparison, not a performance promise.
    `
  },
  {
    slug: 'ppf-maturity-fifth-of-month-rule-guide',
    title: 'PPF Maturity and the 5th-of-the-Month Interest Rule',
    category: 'finance',
    readTime: '6 min read',
    date: '2026-10-02',
    summary: 'Understand annual PPF compounding, the monthly fifth-day balance rule and why a 7.1% maturity projection is an assumption, not a permanently fixed rate.',
    calculatorIds: ['ppf'],
    content: `
### PPF Has a Government-Notified Rate, Not a Permanent 7.1% Promise

The Public Provident Fund is a government small-savings scheme with contribution limits, a defined maturity framework and interest credited annually. The government notifies the applicable interest rate for the relevant period. That rate can change during the life of an account; a figure used today is not a contractual promise for every future year.

The [PPF Calculator](/calculators/ppf-calculator) uses **7.1% as a fixed illustrative assumption**. It does not fetch future notifications or guarantee that 7.1% will apply throughout a 15-, 20- or 30-year projection. Confirm the government-notified/current applicable rate with the account provider and the relevant notification. Government backing and a permanently locked interest rate are not the same concept.

### What the Calculator Models

Enter an annual contribution and choose the modelled term. The widget caps the annual amount at ₹1,50,000 and treats one contribution as arriving at the start of each modelled year. It adds interest on the opening balance plus that year's contribution, then carries the closing balance into the next year.

In other words, **closing balance = opening balance + annual contribution + rounded annual interest**. The annual interest is calculated at the fixed 7.1% model input. This is a simplified early-year contribution illustration, not a reconstruction of the month's eligible balances in an actual account.

A monthly contribution plan will generally have different first-year interest from the model's lump sum at the start of the year. The calculator has no input for each deposit date or for a rate change partway through the term.

### A Worked Maturity Illustration

For an annual contribution of **₹1,50,000** over **15 modelled years** at the fixed assumed **7.1%**:

- Contributions total **₹22,50,000**.
- Projected closing balance is approximately **₹40,68,208**.
- Projected interest is approximately **₹18,18,208**.

These values use the widget's annual rounding and its start-of-year contribution assumption. They are not a bank or post-office maturity quotation. Changes in rates, actual account age, deposits made later, withdrawals or a discontinued account can all alter the amount received.

Do not compare this projection with an account statement without checking how many financial years, contributions and interest credits that statement actually includes.

### The 5th-of-the-Month Rule

PPF interest for a calendar month is calculated on the **lowest balance between the close of the fifth day and the end of that month**. To have a new contribution included for that month's interest, it should be credited to the account on or before the fifth day, subject to the actual balance during the rest of the month.

A contribution credited on the sixth is present in the account but does not raise that month's qualifying lowest balance. It can count for subsequent months. The relevant date is when the amount reaches the PPF account, not merely when you initiate a transfer from another account.

This is a monthly eligibility calculation followed by annual interest credit. It is not monthly compounding. A withdrawal can also reduce the qualifying balance, so depositing before the fifth is not by itself a complete explanation of interest if the balance later changes.

### What One Missed Month Can Mean

Suppose a ₹1,50,000 contribution is credited on 6 April rather than by the close of 5 April, and there are no other balance changes affecting the comparison. At an assumed 7.1%, the interest attributable to that new amount for one month would be **₹1,50,000 × 7.1% ÷ 12**, or about **₹888**.

That is an illustration of a month's interest opportunity, not a fee or a penalty for depositing later. The effect on an eventual maturity value can be larger because interest credited at year-end then remains in the account and earns interest in later years. Actual calculations must use the applicable rate and eligible balances for each period.

Allow for holidays and processing time rather than leaving a transfer until the last possible hour on the fifth. Confirm the account credit in your statement.

### Annual Lump Sum Versus Monthly Contributions

If you already have the annual contribution available and can spare it, an early-April deposit credited by the fifth can qualify for all twelve months of that financial year. A monthly contribution spreads the cash commitment, but amounts added later in the year have fewer eligible months.

For illustration, ₹1.5 lakh eligible for all twelve months at a constant assumed 7.1% earns ₹10,650 on that contribution in the year. Twelve deposits of ₹12,500, each credited by the fifth from April through March, earn roughly ₹5,769 on those new contributions in their first year under the same no-withdrawal assumption.

The difference comes from timing, not a different rate for monthly savers. Choose a schedule that fits actual available cash; do not borrow simply to make an early deposit without comparing the borrowing cost and keeping an emergency reserve.

### The Scheme Term and the Modelled Years

The scheme's initial maturity is linked to **15 years from the end of the financial year in which the account was opened**. That is not necessarily exactly 15 calendar years from the opening date. The simplified calculator shows the selected number of annual contributions and compounding steps, without asking for the opening date.

Check the provider's recorded maturity date before relying on the money for a particular expense. An existing account with a balance is also not the same as a new projection starting at zero; the widget does not accept an opening balance.

Extension blocks can continue an eligible account after maturity under the scheme's conditions. The 20-, 25- and 30-year selections illustrate continued annual contributions at the same assumed rate. They do not submit an extension request or determine whether your account has met the conditions for extending with contributions.

### Contributions and Tax Benefits Are Separate Questions

The scheme's contribution limit is not an automatic tax saving. Whether a contribution qualifies for a deduction depends on the applicable law, tax year, chosen regime and other eligible payments using the available limit. Interest and withdrawal treatment should also be checked under the rules applicable to the account and the individual.

The calculator does not compute a personal tax deduction or compare tax regimes. Its maturity output should not be increased by an assumed tax refund. The [financial disclaimer](/disclaimer) explains the site's tax-reference context; consult the current rules or a qualified adviser for a filing decision.

### Withdrawals, Loans and Account Conditions

PPF is not an unrestricted savings account. Loans, partial withdrawals, premature closure and extension have scheme-specific conditions. The maturity model does not include any of those cash flows. An amount withdrawn stops earning future interest in the account and can change the eligible monthly balance immediately.

Maintain the required contributions and check the consequences of a discontinued account with the provider. Do not assume that a displayed model balance determines whether you can withdraw that amount today.

### Frequently Asked Questions

**Is 7.1% guaranteed for the full term?** No. It is the calculator's fixed assumption. Actual interest uses the government-notified rates applicable during the account's life.

**Does a deposit made after the fifth earn nothing forever?** No. It generally misses eligibility for that month's interest on the new amount, but can qualify in subsequent months.

**Does the tool model my monthly deposits exactly?** No. It assumes one contribution at the start of each modelled year. Use eligible monthly balances and actual rates to reconcile a statement.

### Related Savings Guides

Compare the [FD quarterly-compounding guide](/articles/fd-maturity-quarterly-compounding-guide) and [RD monthly-deposit guide](/articles/rd-maturity-monthly-deposits-guide) before treating all savings products as the same interest calculation. The [SIP return guide](/articles/sip-return-calculation-guide) explains market-linked assumptions, and the [NPS corpus and annuity guide](/articles/nps-corpus-annuity-pension-guide) separates retirement savings from pension payments.
    `
  },
  {
    slug: 'nps-corpus-annuity-pension-guide',
    title: 'NPS Corpus, Annuity and Pension: Calculation and Exit-Rule Context',
    category: 'finance',
    readTime: '6 min read',
    date: '2026-10-02',
    summary: 'Separate NPS corpus growth from annuity income and understand why sector, exit type and corpus size matter more than a generic 60/40 rule.',
    calculatorIds: ['nps'],
    content: `
### An NPS Projection Has Two Different Stages

The National Pension System builds an investment corpus through contributions. At exit, applicable rules determine how the accumulated pension wealth can be withdrawn or used to buy an annuity. Investment growth and pension income are different calculations, with different assumptions and risks.

The [NPS Calculator](/calculators/nps-calculator) projects constant monthly contributions until **age 60**, splits the estimated corpus using the selected annuity allocation and illustrates a pension using a **fixed 6% annual annuity payout assumption**. It does not select a subscriber's sector, determine legal exit eligibility, retrieve an insurer's quote or apply every corpus-based withdrawal option.

### How the Accumulation Formula Works

The contribution calculation uses **corpus = M × [((1 + i)^n − 1) / i] × (1 + i)**. M is the monthly contribution, i is the assumed annual percentage return divided by 1,200, and n is the number of months between the entered age and age 60.

The final factor assumes contributions at the start of each month. The model holds the contribution and return unchanged. Actual NPS performance is market-linked and depends on the selected schemes, asset mix, charges and market conditions. The assumed return is not a government-guaranteed growth rate.

Age 60 is the calculator's horizon, not a universal legal exit date. A subscriber's normal exit can depend on the model, service rules and applicable subscription period. Keeping the tool's horizon separate from regulatory eligibility avoids mistaking a projection for an approved withdrawal instruction.

### A Worked Corpus and Pension Example

A **30-year-old** contributing **₹5,000 a month** at an assumed **10% annual return** for the 30 years modelled by the tool has:

- Total contributions of **₹18,00,000**.
- Projected corpus of approximately **₹1,13,96,627**.
- At the illustrative **40% annuity allocation**, approximately **₹45,58,651** toward an annuity.
- An illustrative lump-sum portion of approximately **₹68,37,976**.
- At the fixed **6% payout assumption**, pension of approximately **₹22,793 per month** before tax.

The 40% selection is an example, not a statement that every NPS subscriber must use that split. The contribution return and annuity payout rate are also separate inputs. A 10% assumed investment return does not establish a 10% pension payout after exit.

### There Is No Universal 60/40 Exit Rule

Current exit provisions distinguish **government and non-government subscribers**, normal and premature exits, joining age and accumulated pension wealth. For a normal-exit corpus **above ₹12 lakh**, eligible non-government subscribers can take up to **80%** as lump sum/allowed periodic payouts, with at least **20%** for an annuity. Government-sector normal exits above that threshold retain at least **40% annuity**, with the balance up to **60%** available under the permitted withdrawal modes.

For the All Citizen model, normal-exit eligibility includes completion of 15 years of subscription or attaining age 60, whichever is earlier, subject to applicable scheme conditions. Corporate-sector normal exit follows the retirement or superannuation terms that apply to the subscriber. Government-sector eligibility follows the applicable service rules. Do not apply one model's eligibility to every other subscriber.

These distinctions follow the NPS Trust's [normal-exit guidance](https://npstrust.org.in/normal-exit) and PFRDA's December 2025 exit-amendment summary [1](https://www.pfrda.org.in/documents/33652/86710/Press+Release+-+Key+changes+-+Exit+Regulations+.pdf). Verify the regulations and your account category at the time you actually exit.

### Normal-Exit Options for Smaller Corpuses

For subscribers who joined before age 60, normal-exit provisions include corpus-based alternatives:

- **Up to ₹8 lakh:** the entire accumulated pension wealth can be withdrawn; permitted periodic withdrawal options are also available.
- **Above ₹8 lakh and up to ₹12 lakh:** an option permits up to ₹6 lakh as lump sum, with the balance used for an annuity or Systematic Unit Redemption over at least six years; the applicable sector's percentage route is also available.
- **Above ₹12 lakh:** the sector-specific minimum annuity requirement described above applies.

Those alternatives mean even a sector-specific percentage is not a complete rule for every corpus. Subscribers joining at or after age 60 have a separate normal-exit framework, including full withdrawal where accumulated pension wealth does not exceed ₹12 lakh. See the official [normal-exit guidance](https://npstrust.org.in/normal-exit) and PFRDA summary [1](https://www.pfrda.org.in/documents/33652/86710/Press+Release+-+Key+changes+-+Exit+Regulations+.pdf) before choosing an option.

### Premature Exit Is a Different Case

For a premature exit, the usual framework is up to **20% withdrawal and at least 80% annuity**, with full-withdrawal provisions for a corpus **up to ₹5 lakh**, subject to the applicable conditions. This is not the same as a non-government normal exit with at least 20% annuity. Reversing those percentages would materially change the amount available.

The rules for joining at or after age 60, death, disability and other special circumstances can differ. The calculator does not determine which exit category applies. Use the PFRDA exit summary [1](https://www.pfrda.org.in/documents/33652/86710/Press+Release+-+Key+changes+-+Exit+Regulations+.pdf) and obtain confirmation from your account's service provider rather than selecting a percentage solely because it gives a desired lump sum.

### What the Annuity Input Does and Does Not Mean

The existing widget accepts a **40–100% annuity allocation** and defaults to 40%. That range is a **modelling constraint, not a regulatory minimum**. It can illustrate a voluntary allocation higher than a legal minimum, but cannot represent every permitted lower-annuity or full-withdrawal option.

For perspective, applying a hypothetical 20% allocation to the example corpus would produce an annuity amount of about ₹22,79,325 and a remaining portion of about ₹91,17,302. At the same illustrative 6% payout, pension would be about ₹11,397 a month. This is a separate explanation of the trade-off, not an option automatically available to every subscriber or a change to the widget's input behaviour.

An exit that is legally permitted is not automatically entirely tax-exempt. Withdrawal permissions, tax treatment and annuity taxation are separate questions. The tool displays pre-tax illustrations and does not determine tax liability.

### Why an Annuity Quote Can Differ

An annuity converts a purchase amount into periodic income under an insurer's terms. Age, single-life or joint-life coverage, return of purchase price, payment frequency and other product choices affect the quote. Comparing only one payout percentage can miss important differences in what happens after the annuitant's death.

The calculator simply multiplies the annuity amount by 6% and divides by twelve. It does not price those options, apply insurer expenses or guarantee a future monthly amount. Obtain quotes for the same product features and consider the household's need for continuing income as well as the first monthly payment.

### Keep the Planning Assumptions Visible

Test a lower accumulation return and consider what happens if contributions pause. The tool keeps contributions flat, so it does not automatically model future salary increases. Its displayed pension also does not adjust for inflation; a monthly amount many years away may buy less than the same amount today.

Separate the funds you might need before exit from a retirement allocation with withdrawal restrictions. The corpus projection is not a measure of money freely available today. Review the assumed age, contribution, return and annuity allocation together rather than treating any one of them as a promise.

### Frequently Asked Questions

**Must every subscriber use 40% for an annuity?** No. Current requirements depend on sector, exit type and corpus, with specific exceptions. The widget's lower input boundary is not a legal determination.

**Is the 6% pension rate guaranteed?** No. It is a fixed illustration. An insurer's actual quote depends on the option, circumstances and prices at purchase.

**Can the calculator confirm my tax-free withdrawal?** No. It estimates amounts before tax and does not assess the applicable exemption or exit eligibility.

### Related Retirement Guides

Read the [SIP return-calculation guide](/articles/sip-return-calculation-guide) for the contribution-compounding convention, and the [PPF maturity guide](/articles/ppf-maturity-fifth-of-month-rule-guide) for a scheme with government-notified interest rather than market-linked accumulation. The [gratuity calculation guide](/articles/gratuity-calculation-guide) explains another retirement or employment-exit amount without treating it as an annuity.
    `
  },
  {
    slug: 'gratuity-calculation-guide',
    title: 'Gratuity Calculation: Salary, Service Years and Estimate Limits',
    category: 'jobs',
    readTime: '6 min read',
    date: '2026-10-02',
    summary: 'Understand the salary-and-service gratuity formula, the calculator’s covered and uncovered illustrations, and the limits of its eligibility and tax estimates.',
    calculatorIds: ['gratuity', 'salary', 'ctc-inhand'],
    content: `
### Gratuity Is an Employment-Exit Benefit, Not Monthly Take-Home Pay

Gratuity is a lump-sum employment benefit whose entitlement and amount depend on applicable law, employment category, salary and service. It can be relevant at resignation, retirement or another qualifying event. A provision shown in CTC is not necessarily cash paid to the employee every month or a final settlement amount already earned without conditions.

The [Gratuity Calculator](/calculators/gratuity-calculator) provides a simplified salary-and-service illustration using its covered and uncovered formula options. It is not a legal eligibility assessment or a payroll settlement statement. Check the law, wage definition, service record and employment terms applicable to your case before relying on the displayed amount.

### The Salary Input Is Not the Whole CTC

The widget asks for **last drawn monthly basic salary plus dearness allowance**. Do not enter annual CTC or total monthly earnings that include every allowance. A large difference between basic pay and gross pay can make this distinction material.

For example, if a payslip shows ₹40,000 basic pay, ₹10,000 DA and ₹15,000 of other allowances, the input modelled here is ₹50,000, not ₹65,000 or the annual CTC. This example explains the tool's input, not a universal legal rule that every payroll component is excluded in every case.

Actual statutory wage definitions and averaging requirements can differ with the applicable framework and employment category. The uncovered option in particular is a simplified calculation using the same entered salary, not an automatic reconstruction of all salary-period rules. Confirm the relevant wage base with your employer or adviser.

### The Covered-Establishment Formula in the Widget

The covered option uses **gratuity = 15 × monthly salary × service years ÷ 26**. The model treats fifteen days of salary as the benefit for each entered year of service and uses 26 as the monthly divisor.

With **₹50,000 monthly salary** and **seven years**:

- Fifteen days' salary in this model is ₹50,000 × 15 ÷ 26, about ₹28,846.
- Multiplying by seven gives approximately **₹2,01,923**.
- The result is rounded to the nearest rupee.

A formula estimate is separate from determining coverage and entitlement. Do not select the option solely because it gives a larger number. The correct category follows the applicable law and circumstances, not the preference of the person using the calculator.

### What the Uncovered Option Illustrates

The other widget option uses **gratuity = 15 × entered monthly salary × service years ÷ 30**. For the same ₹50,000 input and seven years, it gives **₹1,75,000**. The different divisor explains the lower illustration.

That does not establish that everyone outside the covered category is entitled to that amount, or that last drawn basic plus DA is always the legally correct salary for that category. Coverage, salary averaging, employment terms and the tax formula can require a different assessment. The calculator does not make those decisions.

A provider or employer's settlement can therefore differ for reasons beyond rounding. Request the actual formula, wage base and service count used in the settlement so you can identify the source of the difference.

### Service Years: Enter a Verified Count

The widget uses a **whole number of years**. It does not take joining and leaving dates or calculate a qualifying service period from attendance records. Enter a service count that has been checked against the rules applicable to the employment.

The familiar covered formula can count a part-year in excess of six months as an additional year for the benefit calculation, subject to the applicable law. That is not the same as entering a decimal such as 7.7 into a whole-year model, or automatically rounding every incomplete year upward. Coverage and continuous-service rules also matter.

A seven-year, seven-month service period may therefore need a different qualifying year count from a seven-year, five-month period. The calculator cannot decide that from the single integer input. Get the recorded dates and the employer's basis for any rounding.

### Eligibility Is Not Established by the Displayed Amount

The existing widget returns zero below **five entered years** and uses that as a simplified qualification check. It does not implement every exception or every employment category. Death, disablement, fixed-term arrangements and other legally distinct cases can have different eligibility conditions.

A zero from the model is therefore not proof that no benefit is payable, just as a positive output is not proof that an employer owes the displayed amount. The actual result depends on the applicable framework, continuous service, the event triggering payment and employment terms.

Do not alter the service input merely to force a positive result. Keep the actual record and seek an eligibility assessment if the simplified model does not fit your situation. Legal questions about a particular settlement should not be answered from the formula alone.

### How Salary and Years Affect the Illustration

Within the model, gratuity scales proportionally with the entered salary and service years once the five-year check is met. At ₹50,000 and the covered divisor:

- **Five years:** approximately **₹1,44,231**.
- **Seven years:** approximately **₹2,01,923**.
- **Ten years:** approximately **₹2,88,462**.

Doubling the salary with the same years doubles the formula amount. This does not forecast future salary increases or prove a future entitlement. For retirement planning, label any assumed salary and service clearly, and do not treat a projected benefit as accessible money today.

A gratuity provision inside CTC can use the employer's accounting assumptions. It is not the same calculation as the final benefit using the eligible wage base and service at exit. Comparing the two without those distinctions can create an apparent shortfall that is actually a difference in purpose.

### Understand the Tax Display's Simplification

The calculator treats up to **₹20,00,000** of the calculated amount as exempt and displays an excess as potentially taxable. That is the ceiling and method modelled by the tool, not a complete tax-exemption assessment for every employee.

Actual exemption can depend on employment category, the amount received, the applicable statutory calculation, limits in force and benefits previously received. Government and non-government employment can be treated differently. An exemption ceiling is not an unconditional promise that every payment below it is tax-free.

The tool also does not calculate tax at your marginal rate on a taxable portion. A displayed taxable amount is not the tax bill itself. Use the employer's settlement statement and the rules applicable to the tax year when preparing a return.

### Checking a Settlement Step by Step

Gather the joining and leaving dates, the wage components used, any relevant service interruptions and the employer's coverage or legal basis. Request a written calculation showing salary, eligible service and the formula divisor. Separate gross gratuity from any deduction or tax withholding in the final settlement.

Compare the model only after aligning the inputs. If the employer uses a different wage base or year count, changing the divisor alone will not reconcile the figures. A dispute about qualifying service, coverage or a wage component needs professional or statutory clarification, not just another run of the calculator.

Keep a copy of the settlement and service records. They can be useful when checking an exemption involving an earlier payment or comparing the final benefit with a CTC provision.

### Frequently Asked Questions

**Should I enter gross salary or CTC?** Neither by default. The widget models monthly basic plus DA. Verify whether that also matches the legally applicable wage base in your situation.

**Does zero below five years settle my eligibility?** No. It is a simplified model check that does not cover every exception or employment category.

**Is the displayed exempt amount a tax certificate?** No. It applies a simplified ceiling without evaluating all exemption conditions or previous payments.

**Why is gratuity listed in CTC but not paid monthly?** A CTC provision represents an employer cost or accounting allocation. The actual benefit is assessed at a qualifying event under the applicable conditions.

### Related Salary and Retirement Guides

Use the [CTC Breakdown Calculator](/calculators/ctc-inhand-calculator) and the [CTC versus in-hand salary article](/articles/understanding-ctc-vs-in-hand-salary-india) to separate monthly cash from employer provisions. The [home loan salary-affordability guide](/articles/home-loan-emi-salary-affordability-guide) explains why those non-cash amounts should not fund an EMI budget. For a separate pension projection, read the [NPS corpus and annuity guide](/articles/nps-corpus-annuity-pension-guide).
    `
  }
];
