import {
  CALCULATOR_SPECS,
  computeCalculatorById,
  formatIndianCurrency
} from './calculator-engine.mjs';

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Renders the initial static HTML of any of the 21 calculator widgets with its
 * exact default inputs, bounds, aria-labels, calculated results, and model notes.
 */
export function renderCalculatorWidgetHtml(calculatorId) {
  const spec = CALCULATOR_SPECS[calculatorId];
  if (!spec) {
    throw new Error(`Unknown calculatorId: ${calculatorId}`);
  }
  const d = spec.defaults;
  const b = spec.bounds || {};
  const res = computeCalculatorById(calculatorId, d);

  if (spec.widgetType === 'generic-emi') {
    const label = spec.label;
    return `<div class="iu-calculator-mount" data-calculator-id="${escapeHtml(calculatorId)}" data-widget-type="generic-emi" data-label="${escapeHtml(label)}">
  <div class="iu-calc-grid">
    <div class="iu-calc-inputs iu-card">
      <div class="iu-field">
        <div class="iu-field-header">
          <label class="iu-label">${escapeHtml(label)} Amount</label>
          <div class="iu-input-group">
            <span class="iu-prefix">₹</span>
            <input type="number" data-field="loanAmount" aria-label="${escapeHtml(label)} amount" min="${b.loanAmount.min}" max="${b.loanAmount.max}" step="${b.loanAmount.step}" value="${d.loanAmount}" class="iu-num-input" />
          </div>
        </div>
        <input type="range" data-slider="loanAmount" aria-label="${escapeHtml(label)} amount slider" min="${b.loanAmount.sliderMin}" max="${b.loanAmount.sliderMax}" step="${b.loanAmount.sliderStep}" value="${d.loanAmount}" class="iu-range" />
        <div class="iu-range-ticks"><span>₹50,000</span><span>₹50 Lakh</span><span>₹1.5 Crore</span></div>
      </div>

      <div class="iu-field">
        <div class="iu-field-header">
          <label class="iu-label">Interest Rate (% p.a.)</label>
          <div class="iu-input-group">
            <input type="number" data-field="interestRate" aria-label="Interest rate annual percentage" min="${b.interestRate.min}" max="${b.interestRate.max}" step="${b.interestRate.step}" value="${d.interestRate}" class="iu-num-input iu-w-24" />
            <span class="iu-suffix">%</span>
          </div>
        </div>
        <input type="range" data-slider="interestRate" aria-label="Interest rate slider" min="${b.interestRate.sliderMin}" max="${b.interestRate.sliderMax}" step="${b.interestRate.sliderStep}" value="${d.interestRate}" class="iu-range" />
        <div class="iu-range-ticks"><span>6%</span><span>12%</span><span>24%</span></div>
      </div>

      <div class="iu-field">
        <div class="iu-field-header">
          <label class="iu-label">Tenure (Years)</label>
          <div class="iu-input-group">
            <input type="number" data-field="tenureYears" aria-label="Loan tenure in years" min="${b.tenureYears.min}" max="${b.tenureYears.max}" step="${b.tenureYears.step}" value="${d.tenureYears}" class="iu-num-input iu-w-20" />
            <span class="iu-suffix" data-out="tenureSuffix">Yrs (${d.tenureYears * 12} Mos)</span>
          </div>
        </div>
        <input type="range" data-slider="tenureYears" aria-label="Loan tenure slider" min="${b.tenureYears.sliderMin}" max="${b.tenureYears.sliderMax}" step="${b.tenureYears.sliderStep}" value="${d.tenureYears}" class="iu-range" />
        <div class="iu-range-ticks"><span>1 Yr</span><span>15 Yrs</span><span>30 Yrs</span></div>
      </div>
    </div>

    <div class="iu-calc-results iu-result-card">
      <div>
        <p class="iu-result-eyebrow">Monthly Loan EMI</p>
        <div class="iu-result-primary" data-out="emi">${formatIndianCurrency(res.emi)}</div>
        <p class="iu-result-sub" data-out="emiSub">per month for ${d.tenureYears * 12} months</p>
      </div>

      <div class="iu-result-rows">
        <div class="iu-result-row">
          <span>Principal Amount:</span>
          <strong data-out="principal">${formatIndianCurrency(res.principal)}</strong>
        </div>
        <div class="iu-result-row">
          <span>Total Interest Payable:</span>
          <strong class="iu-text-amber" data-out="totalInterest">${formatIndianCurrency(res.totalInterest)}</strong>
        </div>
        <div class="iu-result-row iu-result-row-total">
          <span>Total Payment (P + I):</span>
          <strong class="iu-text-emerald" data-out="totalPayment">${formatIndianCurrency(res.totalPayment)}</strong>
        </div>
      </div>

      <div class="iu-ratio-box">
        <div class="iu-ratio-labels">
          <span><i class="iu-dot iu-dot-emerald"></i> <span data-out="principalPercentLabel">Principal (${res.principalPercent}%)</span></span>
          <span><i class="iu-dot iu-dot-amber"></i> <span data-out="interestPercentLabel">Interest (${res.interestPercent}%)</span></span>
        </div>
        <div class="iu-ratio-bar">
          <div class="iu-ratio-fill-emerald" data-bar="principal" style="width:${res.principalPercent}%"></div>
          <div class="iu-ratio-fill-amber" data-bar="interest" style="width:${res.interestPercent}%"></div>
        </div>
      </div>

      <p class="iu-calc-note">
        Estimate uses a fixed annual rate applied monthly to a reducing balance, with no fees, insurance, or rate changes included. Lender schedules, rounding, and charges may differ.
      </p>
    </div>
  </div>
</div>`;
  }

  if (spec.widgetType === 'prepayment') {
    return `<div class="iu-calculator-mount" data-calculator-id="${escapeHtml(calculatorId)}" data-widget-type="prepayment">
  <div class="iu-calc-grid">
    <div class="iu-calc-inputs iu-card">
      <div class="iu-field">
        <div class="iu-field-header">
          <label class="iu-label">Original Loan Amount</label>
          <strong data-out="loanAmountDisplay">${formatIndianCurrency(d.loanAmount)}</strong>
        </div>
        <input type="range" data-field="loanAmount" aria-label="Original loan amount slider" min="${b.loanAmount.sliderMin}" max="${b.loanAmount.sliderMax}" step="${b.loanAmount.sliderStep}" value="${d.loanAmount}" class="iu-range" />
      </div>

      <div class="iu-two-col">
        <div class="iu-field">
          <label class="iu-label-sm">Interest Rate (%)</label>
          <input type="number" data-field="interestRate" aria-label="Annual interest rate in percent" step="0.1" value="${d.interestRate}" class="iu-num-input iu-w-full" />
        </div>
        <div class="iu-field">
          <label class="iu-label-sm">Tenure (Years)</label>
          <input type="number" data-field="tenureYears" aria-label="Loan tenure in years" value="${d.tenureYears}" class="iu-num-input iu-w-full" />
        </div>
      </div>

      <div class="iu-divider-section">
        <h3 class="iu-section-subhead">Prepayment Details</h3>
        <div class="iu-field">
          <div class="iu-field-header">
            <label class="iu-label">One-time Part Payment Amount</label>
            <strong class="iu-text-emerald" data-out="lumpsumPrepaymentDisplay">${formatIndianCurrency(d.lumpsumPrepayment)}</strong>
          </div>
          <input type="range" data-field="lumpsumPrepayment" aria-label="One-time part payment amount slider" min="${b.lumpsumPrepayment.sliderMin}" max="${b.lumpsumPrepayment.sliderMax}" step="${b.lumpsumPrepayment.sliderStep}" value="${d.lumpsumPrepayment}" class="iu-range" />
        </div>

        <div class="iu-field">
          <label class="iu-label-sm">Make prepayment after year</label>
          <select data-field="prepayAfterYear" aria-label="Year to make prepayment" class="iu-select iu-w-full">
            ${b.prepayAfterYearPresets
              .map(
                yr =>
                  `<option value="${yr}"${yr === d.prepayAfterYear ? ' selected="selected"' : ''}>After Year ${yr} (${yr * 12}th EMI)</option>`
              )
              .join('')}
          </select>
        </div>
      </div>
    </div>

    <div class="iu-calc-results iu-result-card">
      <div>
        <p class="iu-result-eyebrow">Total Interest Saved</p>
        <div class="iu-result-primary iu-text-emerald" data-out="interestSaved">${formatIndianCurrency(res.interestSaved)}</div>
        <p class="iu-result-sub">Direct interest money kept in your pocket</p>
      </div>

      <div class="iu-result-rows iu-white-box">
        <div class="iu-result-row">
          <span>Tenure Reduction:</span>
          <strong data-out="tenureReduction">${res.yearsSaved} Years earlier (${res.monthsSaved} months)</strong>
        </div>
        <div class="iu-result-row">
          <span>New Loan Payoff Time:</span>
          <strong class="iu-text-emerald" data-out="newPayoffTime">${res.newPayoffYears} Years</strong>
        </div>
        <div class="iu-result-row iu-result-row-total">
          <span>Monthly EMI (Unchanged):</span>
          <strong data-out="normalEmi">${formatIndianCurrency(res.normalEmi)}</strong>
        </div>
      </div>

      <div class="iu-calc-note">
        Simulation assumes the EMI and interest rate stay unchanged and applies one lump-sum payment in the selected month. It excludes lender fees, rate resets, and changes to EMI or tenure. Check your loan agreement and lender for applicable prepayment terms.
      </div>
    </div>
  </div>
</div>`;
  }

  if (spec.widgetType === 'deposit') {
    const isFd = spec.depositType === 'fd';
    return `<div class="iu-calculator-mount" data-calculator-id="${escapeHtml(calculatorId)}" data-widget-type="deposit" data-deposit-type="${spec.depositType}">
  <div class="iu-calc-grid">
    <div class="iu-calc-inputs iu-card">
      <div class="iu-field">
        <div class="iu-field-header">
          <label class="iu-label">${isFd ? 'Total Deposit Amount' : 'Monthly Deposit Amount'}</label>
          <div class="iu-input-group">
            <span class="iu-prefix">₹</span>
            <input type="number" data-field="depositAmount" aria-label="Deposit amount (rupees)" min="${b.depositAmount.min}" max="${b.depositAmount.max}" step="${b.depositAmount.step}" value="${d.depositAmount}" class="iu-num-input" />
          </div>
        </div>
        <input type="range" data-slider="depositAmount" aria-label="Deposit amount slider" min="${b.depositAmount.sliderMin}" max="${b.depositAmount.sliderMax}" step="${b.depositAmount.sliderStep}" value="${d.depositAmount}" class="iu-range" />
      </div>

      <div class="iu-field">
        <div class="iu-field-header">
          <label class="iu-label">Base Annual Interest Rate (%)</label>
          <div class="iu-input-group">
            <input type="number" data-field="interestRate" aria-label="Annual interest rate (percent)" min="${b.interestRate.min}" max="${b.interestRate.max}" step="${b.interestRate.step}" value="${d.interestRate}" class="iu-num-input iu-w-20" />
            <span class="iu-suffix">%</span>
          </div>
        </div>
        <input type="range" data-slider="interestRate" aria-label="Annual interest rate slider" min="${b.interestRate.sliderMin}" max="${b.interestRate.sliderMax}" step="${b.interestRate.sliderStep}" value="${d.interestRate}" class="iu-range" />
      </div>

      <div class="iu-checkbox-row">
        <input type="checkbox" id="seniorCitizen-${escapeHtml(calculatorId)}" data-field="isSeniorCitizen" />
        <label for="seniorCitizen-${escapeHtml(calculatorId)}">Senior Citizen (+0.50% extra interest)</label>
      </div>

      <div class="iu-field">
        <div class="iu-field-header">
          <label class="iu-label">Deposit Tenure (Years)</label>
          <div class="iu-input-group">
            <input type="number" data-field="tenureYears" aria-label="Deposit tenure in years" min="${b.tenureYears.min}" max="${b.tenureYears.max}" step="${b.tenureYears.step}" value="${d.tenureYears}" class="iu-num-input iu-w-20" />
            <span class="iu-suffix">Years</span>
          </div>
        </div>
        <input type="range" data-slider="tenureYears" aria-label="Deposit tenure slider" min="${b.tenureYears.sliderMin}" max="${b.tenureYears.sliderMax}" step="${b.tenureYears.sliderStep}" value="${d.tenureYears}" class="iu-range" />
      </div>
    </div>

    <div class="iu-calc-results iu-result-card">
      <div>
        <p class="iu-result-eyebrow">Total Maturity Value</p>
        <div class="iu-result-primary" data-out="maturityAmount">${formatIndianCurrency(res.maturityAmount)}</div>
        <p class="iu-result-sub" data-out="effectiveRateSub">Effective Interest: ${res.effectiveRate.toFixed(2)}% with Indian quarterly compounding</p>
      </div>

      <div class="iu-result-rows">
        <div class="iu-result-row">
          <span>Total Invested:</span>
          <strong data-out="totalInvested">${formatIndianCurrency(res.totalInvested)}</strong>
        </div>
        <div class="iu-result-row">
          <span>Total Interest Earned:</span>
          <strong class="iu-text-emerald" data-out="interestEarned">+${formatIndianCurrency(res.interestEarned)}</strong>
        </div>
      </div>

      <div class="iu-calc-note">
        Estimate assumes the selected rate remains unchanged for the full term and quarterly compounding. Actual bank and post-office products may use different terms, payment timing, compounding, and senior-citizen rates. For resident depositors, bank FD/RD interest TDS thresholds from 1 Apr 2025 are ₹50,000 per year for others and ₹1,00,000 for senior citizens; the usual rate is 10% with PAN and 20% without PAN, subject to applicable exemptions. TDS is not the final tax liability; this estimate does not deduct tax.
      </div>
    </div>
  </div>
</div>`;
  }

  if (spec.widgetType === 'sip') {
    return `<div class="iu-calculator-mount" data-calculator-id="${escapeHtml(calculatorId)}" data-widget-type="sip">
  <div class="iu-calc-grid">
    <div class="iu-calc-inputs iu-card">
      <div class="iu-field">
        <div class="iu-field-header">
          <label class="iu-label">Monthly Investment Amount</label>
          <div class="iu-input-group">
            <span class="iu-prefix">₹</span>
            <input type="number" data-field="monthlyInvestment" aria-label="Monthly investment amount" min="${b.monthlyInvestment.min}" max="${b.monthlyInvestment.max}" step="${b.monthlyInvestment.step}" value="${d.monthlyInvestment}" class="iu-num-input" />
          </div>
        </div>
        <input type="range" data-slider="monthlyInvestment" aria-label="Monthly investment slider" min="${b.monthlyInvestment.sliderMin}" max="${b.monthlyInvestment.sliderMax}" step="${b.monthlyInvestment.sliderStep}" value="${d.monthlyInvestment}" class="iu-range" />
        <div class="iu-range-ticks"><span>₹500</span><span>₹50,000</span><span>₹1,00,000</span></div>
      </div>

      <div class="iu-field">
        <div class="iu-field-header">
          <label class="iu-label">Assumed Annual Return Rate (%)</label>
          <div class="iu-input-group">
            <input type="number" data-field="expectedRate" aria-label="Expected annual return rate" min="${b.expectedRate.min}" max="${b.expectedRate.max}" step="${b.expectedRate.step}" value="${d.expectedRate}" class="iu-num-input iu-w-20" />
            <span class="iu-suffix">%</span>
          </div>
        </div>
        <input type="range" data-slider="expectedRate" aria-label="Expected return rate slider" min="${b.expectedRate.sliderMin}" max="${b.expectedRate.sliderMax}" step="${b.expectedRate.sliderStep}" value="${d.expectedRate}" class="iu-range" />
        <div class="iu-range-ticks"><span>1%</span><span>12% (assumption)</span><span>25%</span></div>
      </div>

      <div class="iu-field">
        <div class="iu-field-header">
          <label class="iu-label">Time Period (Years)</label>
          <div class="iu-input-group">
            <input type="number" data-field="tenureYears" aria-label="Investment tenure in years" min="${b.tenureYears.min}" max="${b.tenureYears.max}" step="${b.tenureYears.step}" value="${d.tenureYears}" class="iu-num-input iu-w-20" />
            <span class="iu-suffix">Years</span>
          </div>
        </div>
        <input type="range" data-slider="tenureYears" aria-label="Investment tenure slider" min="${b.tenureYears.sliderMin}" max="${b.tenureYears.sliderMax}" step="${b.tenureYears.sliderStep}" value="${d.tenureYears}" class="iu-range" />
        <div class="iu-range-ticks"><span>1 Year</span><span>15 Years</span><span>35 Years</span></div>
      </div>
    </div>

    <div class="iu-calc-results iu-result-card">
      <div>
        <p class="iu-result-eyebrow">Expected Total Wealth Corpus</p>
        <div class="iu-result-primary iu-text-emerald" data-out="futureValue">${formatIndianCurrency(res.futureValue)}</div>
        <p class="iu-result-sub" data-out="sipSub">after ${d.tenureYears} years (${d.tenureYears * 12} installments)</p>
      </div>

      <div class="iu-result-rows">
        <div class="iu-result-row">
          <span>Invested Amount:</span>
          <strong data-out="investedAmount">${formatIndianCurrency(res.investedAmount)}</strong>
        </div>
        <div class="iu-result-row">
          <span>Estimated Growth:</span>
          <strong class="iu-text-emerald" data-out="wealthGained">+${formatIndianCurrency(res.wealthGained)}</strong>
        </div>
      </div>

      <div class="iu-ratio-box">
        <div class="iu-ratio-labels">
          <span><i class="iu-dot iu-dot-gray"></i> <span data-out="investedPercentLabel">Principal (${res.investedPercent}%)</span></span>
          <span><i class="iu-dot iu-dot-emerald"></i> <span data-out="wealthPercentLabel">Gain (${res.wealthPercent}%)</span></span>
        </div>
        <div class="iu-ratio-bar">
          <div class="iu-ratio-fill-gray" data-bar="invested" style="width:${res.investedPercent}%"></div>
          <div class="iu-ratio-fill-emerald" data-bar="wealth" style="width:${res.wealthPercent}%"></div>
        </div>
      </div>

      <p class="iu-calc-note">
        Projection assumes monthly investments at the start of each month and a constant return compounded monthly. Mutual fund returns are market-linked and are not guaranteed; fees, tax, inflation, and changing returns are not modeled.
      </p>
    </div>
  </div>
</div>`;
  }

  if (spec.widgetType === 'ppf') {
    return `<div class="iu-calculator-mount" data-calculator-id="${escapeHtml(calculatorId)}" data-widget-type="ppf">
  <div class="iu-calc-grid">
    <div class="iu-calc-inputs iu-card">
      <div class="iu-field">
        <div class="iu-field-header">
          <label class="iu-label">Yearly Deposit (Max ₹1.5 Lakh)</label>
          <div class="iu-input-group">
            <span class="iu-prefix">₹</span>
            <input type="number" data-field="annualDeposit" aria-label="Annual PPF contribution in rupees" min="${b.annualDeposit.min}" max="${b.annualDeposit.max}" step="${b.annualDeposit.step}" value="${d.annualDeposit}" class="iu-num-input" />
          </div>
        </div>
        <input type="range" data-slider="annualDeposit" aria-label="Annual contribution slider" min="${b.annualDeposit.sliderMin}" max="${b.annualDeposit.sliderMax}" step="${b.annualDeposit.sliderStep}" value="${d.annualDeposit}" class="iu-range" />
      </div>

      <div class="iu-field">
        <label class="iu-label">Illustrative Annual Interest Rate</label>
        <div class="iu-info-pill">
          <span>Fixed assumption in this estimate:</span>
          <strong class="iu-text-emerald">${d.interestRate}% p.a. (fixed model input)</strong>
        </div>
      </div>

      <div class="iu-field">
        <div class="iu-field-header">
          <label class="iu-label">PPF Tenure</label>
          <select data-field="tenureYears" aria-label="PPF tenure in years" class="iu-select">
            <option value="15" selected="selected">15 Years (Base Lock-in)</option>
            <option value="20">20 Years (1 Extension block)</option>
            <option value="25">25 Years (2 Extension blocks)</option>
            <option value="30">30 Years (3 Extension blocks)</option>
          </select>
        </div>
      </div>
    </div>

    <div class="iu-calc-results iu-result-card">
      <div>
        <p class="iu-result-eyebrow">Estimated Maturity Value</p>
        <div class="iu-result-primary" data-out="balance">${formatIndianCurrency(res.balance)}</div>
        <p class="iu-result-sub iu-text-emerald">PPF tax benefits depend on current rules and individual eligibility</p>
      </div>

      <div class="iu-result-rows">
        <div class="iu-result-row">
          <span>Total Invested:</span>
          <strong data-out="totalInvested">${formatIndianCurrency(res.totalInvested)}</strong>
        </div>
        <div class="iu-result-row">
          <span>Total Interest Accrued:</span>
          <strong class="iu-text-emerald" data-out="totalInterest">+${formatIndianCurrency(res.totalInterest)}</strong>
        </div>
      </div>

      <div class="iu-calc-note">
        Estimate assumes a fixed 7.1% annual rate and one contribution at the start of each modeled year, with annual compounding. Actual PPF interest uses the government-notified/current applicable rate, which can change, and the lowest balance between the close of the fifth day and month-end. Verify the current rate and account terms. This simplified result is not an account statement or tax determination.
      </div>
    </div>
  </div>
</div>`;
  }

  if (spec.widgetType === 'nps') {
    return `<div class="iu-calculator-mount" data-calculator-id="${escapeHtml(calculatorId)}" data-widget-type="nps">
  <div class="iu-calc-grid">
    <div class="iu-calc-inputs iu-card">
      <div class="iu-field">
        <div class="iu-field-header">
          <label class="iu-label">Your Current Age</label>
          <div class="iu-input-group">
            <input type="number" data-field="currentAge" aria-label="Current age in years" min="${b.currentAge.min}" max="${b.currentAge.max}" value="${d.currentAge}" class="iu-num-input iu-w-20" />
            <span class="iu-suffix">Yrs</span>
          </div>
        </div>
        <input type="range" data-slider="currentAge" aria-label="Current age slider" min="${b.currentAge.sliderMin}" max="${b.currentAge.sliderMax}" value="${d.currentAge}" class="iu-range" />
        <p class="iu-field-hint" data-out="investmentYearsHint">Investing for ${res.investmentYears} years until age 60.</p>
      </div>

      <div class="iu-field">
        <div class="iu-field-header">
          <label class="iu-label">Monthly Contribution</label>
          <div class="iu-input-group">
            <span class="iu-prefix">₹</span>
            <input type="number" data-field="monthlyContribution" aria-label="Monthly NPS contribution in rupees" min="${b.monthlyContribution.min}" max="${b.monthlyContribution.max}" step="${b.monthlyContribution.step}" value="${d.monthlyContribution}" class="iu-num-input" />
          </div>
        </div>
        <input type="range" data-slider="monthlyContribution" aria-label="Monthly contribution slider" min="${b.monthlyContribution.sliderMin}" max="${b.monthlyContribution.sliderMax}" step="${b.monthlyContribution.sliderStep}" value="${d.monthlyContribution}" class="iu-range" />
      </div>

      <div class="iu-two-col">
        <div class="iu-field">
          <label class="iu-label-sm">Expected Return (CAGR %)</label>
          <input type="number" data-field="expectedReturn" aria-label="Expected annual return rate in percent" min="${b.expectedReturn.min}" max="${b.expectedReturn.max}" step="${b.expectedReturn.step}" value="${d.expectedReturn}" class="iu-num-input iu-w-full" />
        </div>
        <div class="iu-field">
          <label class="iu-label-sm">Annuity Allocation (Modelled %)</label>
          <input type="number" data-field="annuitySharePercent" aria-label="Annuity share in percent" min="${b.annuitySharePercent.min}" max="${b.annuitySharePercent.max}" step="${b.annuitySharePercent.step}" value="${d.annuitySharePercent}" class="iu-num-input iu-w-full" />
        </div>
      </div>
    </div>

    <div class="iu-calc-results iu-result-card">
      <div>
        <p class="iu-result-eyebrow">Total Retirement Corpus at 60</p>
        <div class="iu-result-primary" data-out="totalCorpus">${formatIndianCurrency(res.totalCorpus)}</div>
      </div>

      <div class="iu-highlight-box">
        <p class="iu-result-eyebrow">Estimated Monthly Pension</p>
        <div class="iu-result-secondary" data-out="monthlyPension">${formatIndianCurrency(res.monthlyPension)} / month</div>
        <p class="iu-result-sub">Illustration using a fixed 6% annual annuity payout assumption</p>
      </div>

      <div class="iu-result-rows">
        <div class="iu-result-row">
          <span data-out="lumpsumLabel">Illustrative lump-sum portion (${100 - d.annuitySharePercent}%):</span>
          <strong data-out="lumpsumAmount">${formatIndianCurrency(res.lumpsumAmount)}</strong>
        </div>
        <div class="iu-result-row">
          <span data-out="annuityLabel">Annuity Purchased (${d.annuitySharePercent}%):</span>
          <strong class="iu-text-emerald" data-out="annuityAmount">${formatIndianCurrency(res.annuityAmount)}</strong>
        </div>
        <div class="iu-result-row iu-text-muted">
          <span>Total Out-of-pocket Invested:</span>
          <span data-out="totalInvested">${formatIndianCurrency(res.totalInvested)}</span>
        </div>
      </div>

      <p class="iu-calc-note">
        Assumes contributions at the start of each month, with a fixed return until age 60 and a 6% annual annuity payout estimate. For normal-exit corpus above ₹12 lakh, current minimum annuity requirements are 20% for non-government and 40% for government subscribers; smaller-corpus exceptions and premature-exit rules differ. The 40–100% input range is a modelling constraint, not a regulatory minimum. Verify exit eligibility, tax treatment and insurer terms; this is not a guaranteed pension quote.
      </p>
    </div>
  </div>
</div>`;
  }

  if (spec.widgetType === 'gratuity') {
    return `<div class="iu-calculator-mount" data-calculator-id="${escapeHtml(calculatorId)}" data-widget-type="gratuity">
  <div class="iu-calc-grid">
    <div class="iu-calc-inputs iu-card">
      <div class="iu-field">
        <div class="iu-field-header">
          <label class="iu-label">Last Drawn Monthly Basic + Dearness Allowance (DA)</label>
          <div class="iu-input-group">
            <span class="iu-prefix">₹</span>
            <input type="number" data-field="basicSalary" aria-label="Last drawn monthly basic salary and dearness allowance in rupees" min="${b.basicSalary.min}" max="${b.basicSalary.max}" step="${b.basicSalary.step}" value="${d.basicSalary}" class="iu-num-input" />
          </div>
        </div>
        <input type="range" data-slider="basicSalary" aria-label="Salary slider" min="${b.basicSalary.sliderMin}" max="${b.basicSalary.sliderMax}" step="${b.basicSalary.sliderStep}" value="${d.basicSalary}" class="iu-range" />
        <p class="iu-field-hint">Excludes HRA, special allowances, bonuses, and incentives.</p>
      </div>

      <div class="iu-field">
        <div class="iu-field-header">
          <label class="iu-label">Completed Years of Service</label>
          <div class="iu-input-group">
            <input type="number" data-field="yearsOfService" aria-label="Completed years of service" min="${b.yearsOfService.min}" max="${b.yearsOfService.max}" value="${d.yearsOfService}" class="iu-num-input iu-w-20" />
            <span class="iu-suffix">Years</span>
          </div>
        </div>
        <input type="range" data-slider="yearsOfService" aria-label="Years of service slider" min="${b.yearsOfService.sliderMin}" max="${b.yearsOfService.sliderMax}" step="${b.yearsOfService.sliderStep}" value="${d.yearsOfService}" class="iu-range" />
        <p class="iu-warning-hint" data-out="serviceWarning" style="display:none;">
          ⚠️ Minimum 5 years continuous service required to qualify for statutory gratuity (except in death/disablement).
        </p>
      </div>

      <div class="iu-field">
        <label class="iu-label-sm">Organization Coverage</label>
        <div class="iu-radio-group">
          <label class="iu-radio-label">
            <input type="radio" name="actCoverage-${escapeHtml(calculatorId)}" data-field="isCoveredUnderAct" value="true" checked="checked" />
            <span>Covered by Gratuity Act 1972 (10+ employees)</span>
          </label>
          <label class="iu-radio-label">
            <input type="radio" name="actCoverage-${escapeHtml(calculatorId)}" data-field="isCoveredUnderAct" value="false" />
            <span>Not Covered (&lt; 10 employees)</span>
          </label>
        </div>
      </div>
    </div>

    <div class="iu-calc-results iu-result-card">
      <div>
        <p class="iu-result-eyebrow">Estimated Gratuity Payout</p>
        <div class="iu-result-primary" data-out="gratuityAmount">${formatIndianCurrency(res.gratuityAmount)}</div>
        <p class="iu-result-sub" data-out="gratuityFormula">Formula: (15 × ${formatIndianCurrency(d.basicSalary)} × ${d.yearsOfService}) / ${res.denominator}</p>
      </div>

      <div class="iu-result-rows">
        <div class="iu-result-row">
          <span>Amount treated as exempt in this estimate (up to ₹20 Lakh):</span>
          <strong class="iu-text-emerald" data-out="exemptGratuity">${formatIndianCurrency(res.exemptGratuity)}</strong>
        </div>
        <div class="iu-result-row iu-text-amber" data-out="taxableRow" style="display:none;">
          <span>Taxable Portion:</span>
          <strong data-out="taxableGratuity">${formatIndianCurrency(res.taxableGratuity)}</strong>
        </div>
      </div>

      <div class="iu-calc-note">
        Estimate uses the entered whole number of service years and a simplified formula. Statutory eligibility, the wage base, service-period rounding, coverage, exemption limits, and tax treatment depend on applicable law and individual circumstances; confirm with your employer or a qualified adviser.
      </div>
    </div>
  </div>
</div>`;
  }

  if (spec.widgetType === 'salary') {
    const isDetailed = spec.mode === 'detailed';
    return `<div class="iu-calculator-mount" data-calculator-id="${escapeHtml(calculatorId)}" data-widget-type="salary" data-mode="${spec.mode}">
  <div class="iu-calc-grid">
    <div class="iu-calc-inputs iu-card">
      ${
        isDetailed
          ? `<div class="iu-banner-blue">📋 <strong>Full CTC Breakdown View:</strong> Line-item calculation of employee vs employer statutory liabilities.</div>`
          : ''
      }
      <div class="iu-field">
        <div class="iu-field-header">
          <label class="iu-label">Annual Gross CTC (Cost to Company)</label>
          <div class="iu-input-group">
            <span class="iu-prefix">₹</span>
            <input type="number" data-field="ctcAnnual" aria-label="Annual CTC in rupees" min="${b.ctcAnnual.min}" max="${b.ctcAnnual.max}" step="${b.ctcAnnual.step}" value="${d.ctcAnnual}" class="iu-num-input" />
          </div>
        </div>
        <input type="range" data-slider="ctcAnnual" aria-label="Annual CTC slider" min="${b.ctcAnnual.sliderMin}" max="${b.ctcAnnual.sliderMax}" step="${b.ctcAnnual.sliderStep}" value="${d.ctcAnnual}" class="iu-range" />
        <div class="iu-range-ticks"><span>₹3 Lakhs</span><span>₹15 Lakhs</span><span>₹40 Lakhs</span></div>
      </div>

      <div class="iu-field">
        <div class="iu-field-header">
          <label class="iu-label">Annual Variable / Performance Bonus</label>
          <div class="iu-input-group">
            <span class="iu-prefix">₹</span>
            <input type="number" data-field="bonusAnnual" aria-label="Annual variable bonus in rupees" min="${b.bonusAnnual.min}" max="${b.bonusAnnual.max}" step="${b.bonusAnnual.step}" value="${d.bonusAnnual}" class="iu-num-input" />
          </div>
        </div>
        <input type="range" data-slider="bonusAnnual" aria-label="Annual bonus slider" min="${b.bonusAnnual.sliderMin}" max="${b.bonusAnnual.sliderMax}" step="${b.bonusAnnual.sliderStep}" value="${d.bonusAnnual}" class="iu-range" />
      </div>

      <div class="iu-field">
        <div class="iu-field-header">
          <label class="iu-label">Monthly Professional Tax (PT)</label>
          <select data-field="monthlyProfTax" aria-label="Monthly professional tax" class="iu-select">
            <option value="200" selected="selected">₹200 / month (Standard: Kerala, Karnataka, MH)</option>
            <option value="150">₹150 / month</option>
            <option value="0">₹0 (States with no PT / Delhi)</option>
          </select>
        </div>
      </div>
    </div>

    <div class="iu-calc-results iu-result-card">
      <div>
        <p class="iu-result-eyebrow">Estimated Monthly In-Hand (Take-Home) Pay</p>
        <div class="iu-result-primary iu-text-emerald" data-out="monthlyInHand">${formatIndianCurrency(res.monthlyInHand)}</div>
        <p class="iu-result-sub">Direct monthly bank credit (Pre-Income Tax TDS)</p>
      </div>

      <div class="iu-result-rows">
        <div class="iu-result-row">
          <span>Monthly Gross Salary:</span>
          <strong data-out="monthlyGross">${formatIndianCurrency(res.monthlyGross)}</strong>
        </div>
        <div class="iu-result-row iu-text-red">
          <span>Employee EPF (12%):</span>
          <span data-out="employeePfMonthly">-${formatIndianCurrency(res.employeePfMonthly)}</span>
        </div>
        <div class="iu-result-row iu-text-red">
          <span>Professional Tax:</span>
          <span data-out="monthlyProfTax">-${formatIndianCurrency(d.monthlyProfTax)}</span>
        </div>
        <div class="iu-result-row iu-result-row-total iu-text-muted">
          <span>Employer PF &amp; Gratuity (Included in CTC):</span>
          <span data-out="employerCtcPart">${formatIndianCurrency(res.employerPfMonthly + res.gratuityMonthlyReserve)} /mo</span>
        </div>
      </div>

      <p class="iu-calc-note">
        Estimate assumes basic pay is 40% of CTC, applies the displayed PF cap and selected professional tax, and excludes income-tax TDS and employer-specific benefits or deductions. Actual payslips depend on your salary structure and current rules.
      </p>
    </div>
  </div>
</div>`;
  }

  if (spec.widgetType === 'gold') {
    const isKerala = spec.isKeralaPavan;
    return `<div class="iu-calculator-mount" data-calculator-id="${escapeHtml(calculatorId)}" data-widget-type="gold" data-kerala="${isKerala ? 'true' : 'false'}">
  <div class="iu-calc-grid">
    <div class="iu-calc-inputs iu-card">
      ${
        isKerala
          ? `<div class="iu-banner-amber">✨ <strong>Kerala Sovereign Standard:</strong> 1 Pavan = exactly 8 grams of 22K (916) gold.</div>`
          : ''
      }
      <div class="iu-two-col">
        <div class="iu-field">
          <label class="iu-label">${isKerala ? 'Weight (Grams / Pavans)' : 'Gold Weight (Grams)'}</label>
          <div class="iu-input-group">
            <input type="number" data-field="gramWeight" aria-label="Gold weight in grams" min="0.1" max="5000" step="0.1" value="${d.gramWeight}" class="iu-num-input iu-w-full" />
            <span class="iu-suffix">grams</span>
          </div>
          <p class="iu-field-hint" data-out="pavansHint">= ${res.pavans} Kerala Pavan</p>
        </div>

        <div class="iu-field">
          <label class="iu-label">22K Rate / Gram</label>
          <div class="iu-input-group">
            <span class="iu-prefix">₹</span>
            <input type="number" data-field="ratePerGram22k" aria-label="22 karat gold rate per gram in rupees" min="3000" max="15000" step="10" value="${d.ratePerGram22k}" class="iu-num-input iu-w-full" />
          </div>
          <p class="iu-field-hint" data-out="pavanRateHint">1 Pavan = ${formatIndianCurrency(d.ratePerGram22k * 8)}</p>
        </div>
      </div>

      <div class="iu-field">
        <label class="iu-label">Gold Purity Hallmark</label>
        <div class="iu-btn-grid-3">
          <button type="button" data-purity="22k" aria-pressed="true" class="iu-choice-btn iu-choice-btn-active">
            <span class="iu-choice-title">22K (916 Hallmark)</span>
            <span class="iu-choice-sub">Bridal &amp; Daily</span>
          </button>
          <button type="button" data-purity="24k" aria-pressed="false" class="iu-choice-btn">
            <span class="iu-choice-title">24K (999 Pure)</span>
            <span class="iu-choice-sub">Bullion / Coins</span>
          </button>
          <button type="button" data-purity="18k" aria-pressed="false" class="iu-choice-btn">
            <span class="iu-choice-title">18K (750 Purity)</span>
            <span class="iu-choice-sub">Diamond Jewellery</span>
          </button>
        </div>
      </div>

      <div class="iu-field">
        <div class="iu-field-header">
          <label class="iu-label">Making Charges / Wastage (VA)</label>
          <div class="iu-toggle-pair">
            <button type="button" data-making-type="percent" aria-pressed="true" class="iu-mini-btn iu-mini-btn-active">% Percent</button>
            <button type="button" data-making-type="perGram" aria-pressed="false" class="iu-mini-btn">₹ Per Gram</button>
          </div>
        </div>
        <input type="number" data-field="makingChargeValue" aria-label="Making charge value" min="0" max="40" step="0.5" value="${d.makingChargeValue}" class="iu-num-input iu-w-full" />
        <p class="iu-field-hint">Making charges and wastage vary by jeweller, design, and location; enter the quoted value.</p>
      </div>
    </div>

    <div class="iu-calc-results iu-result-card iu-result-card-amber">
      <div>
        <p class="iu-result-eyebrow">Final Estimated Jewellery Invoice</p>
        <div class="iu-result-primary" data-out="totalBillAmount">${formatIndianCurrency(res.totalBillAmount)}</div>
        <p class="iu-result-sub">Inclusive of 3% GST &amp; BIS Hallmarking Fee</p>
      </div>

      <div class="iu-result-rows">
        <div class="iu-result-row">
          <span data-out="netGoldLabel">Net Gold Value (${d.gramWeight}g @ ${formatIndianCurrency(res.effectiveGramRate)}/g):</span>
          <strong data-out="rawGoldValue">${formatIndianCurrency(res.rawGoldValue)}</strong>
        </div>
        <div class="iu-result-row">
          <span data-out="makingChargeLabel">Making Charges (${d.makingChargeValue}%):</span>
          <strong data-out="makingChargeAmount">${formatIndianCurrency(res.makingChargeAmount)}</strong>
        </div>
        <div class="iu-result-row">
          <span>Illustrative hallmarking fee:</span>
          <strong>₹45</strong>
        </div>
        <div class="iu-result-row iu-result-row-total iu-text-amber">
          <span>3% GST (CGST 1.5% + SGST 1.5%):</span>
          <strong data-out="gstAmount">+${formatIndianCurrency(res.gstAmount)}</strong>
        </div>
      </div>

      <p class="iu-calc-note">
        Estimate uses the entered 22K rate to derive other purities, a fixed ₹45 hallmarking-fee assumption, and 3% GST on the modeled subtotal. Actual rates, charges, tax calculation, and invoice items can differ by jeweller and current rules; check the written quote.
      </p>
    </div>
  </div>
</div>`;
  }

  if (spec.widgetType === 'gst') {
    return `<div class="iu-calculator-mount" data-calculator-id="${escapeHtml(calculatorId)}" data-widget-type="gst">
  <div class="iu-calc-grid">
    <div class="iu-calc-inputs iu-card">
      <div class="iu-field">
        <label class="iu-label">Calculation Type</label>
        <div class="iu-two-col">
          <button type="button" data-calc-type="exclusive" aria-pressed="true" class="iu-choice-btn iu-choice-btn-active">
            <span class="iu-choice-title">GST Exclusive</span>
            <span class="iu-choice-sub">Add GST to base amount</span>
          </button>
          <button type="button" data-calc-type="inclusive" aria-pressed="false" class="iu-choice-btn">
            <span class="iu-choice-title">GST Inclusive</span>
            <span class="iu-choice-sub">Extract GST from MRP</span>
          </button>
        </div>
      </div>

      <div class="iu-field">
        <div class="iu-field-header">
          <label class="iu-label" data-out="amountLabel">Base Amount (Without GST)</label>
          <div class="iu-input-group">
            <span class="iu-prefix">₹</span>
            <input type="number" data-field="amount" aria-label="GST calculation amount" min="1" max="100000000" step="100" value="${d.amount}" class="iu-num-input" />
          </div>
        </div>
        <input type="range" data-slider="amount" aria-label="GST calculation amount slider" min="100" max="200000" step="100" value="${d.amount}" class="iu-range" />
      </div>

      <div class="iu-field">
        <label class="iu-label">Limited / Example GST Rate Presets</label>
        <div class="iu-btn-grid-4">
          ${[5, 12, 18, 28]
            .map(
              rate =>
                `<button type="button" data-gst-rate="${rate}" aria-pressed="${rate === d.gstRate ? 'true' : 'false'}" class="iu-rate-btn${rate === d.gstRate ? ' iu-rate-btn-active' : ''}">${rate}%</button>`
            )
            .join('')}
        </div>
        <p class="iu-calc-note">
          These are limited/example presets, not a complete current GST rate list. This calculator does not determine the applicable GST rate. Confirm the classification and rate for your transaction date; if that rate is not offered here, this tool cannot model it.
        </p>
        <p class="iu-calc-note">
          Dated rate context: the reforms from 22 September 2025 introduced a broad 5%/18% structure and a special 40% rate for selected supplies, with other rates, exemptions and subsequent amendments to check. See the <a href="https://www.pib.gov.in/PressReleasePage.aspx?PRID=2163555" target="_blank" rel="noopener noreferrer">Ministry of Finance announcement dated 3 September 2025</a> and <a href="https://taxinformation.cbic.gov.in/" target="_blank" rel="noopener noreferrer">current CBIC notifications and rate information</a>.
        </p>
      </div>
    </div>

    <div class="iu-calc-results iu-result-card">
      <div>
        <p class="iu-result-eyebrow" data-out="primaryHeader">Final Total Bill (Incl. GST)</p>
        <div class="iu-result-primary" data-out="primaryAmount">${formatIndianCurrency(res.totalAmount)}</div>
        <p class="iu-result-sub" data-out="gstRateSub">GST Rate applied: ${d.gstRate}%</p>
      </div>

      <div class="iu-result-rows">
        <div class="iu-result-row">
          <span>Net Pre-GST Amount:</span>
          <strong data-out="netAmount">${formatIndianCurrency(res.netAmount)}</strong>
        </div>
        <div class="iu-result-row iu-text-emerald">
          <span data-out="totalGstLabel">Total GST (${d.gstRate}%):</span>
          <strong data-out="gstAmount">+${formatIndianCurrency(res.gstAmount)}</strong>
        </div>
        <div class="iu-result-row iu-sub-row">
          <span data-out="cgstLabel">CGST (${d.gstRate / 2}%):</span>
          <span data-out="cgstAmount">${formatIndianCurrency(res.halfGst)}</span>
        </div>
        <div class="iu-result-row iu-sub-row">
          <span data-out="sgstLabel">SGST / UTGST (${d.gstRate / 2}%):</span>
          <span data-out="sgstAmount">${formatIndianCurrency(res.halfGst)}</span>
        </div>
        <div class="iu-result-row iu-result-row-total">
          <span>Gross Total Amount:</span>
          <strong data-out="totalAmount">${formatIndianCurrency(res.totalAmount)}</strong>
        </div>
      </div>
    </div>
  </div>
</div>`;
  }

  if (spec.widgetType === 'percentage') {
    return `<div class="iu-calculator-mount" data-calculator-id="${escapeHtml(calculatorId)}" data-widget-type="percentage">
  <div class="iu-two-col-cards">
    <div class="iu-card">
      <h3 class="iu-card-title">Calculate Percentage Value</h3>
      <p class="iu-field-hint">What is X% of Y?</p>
      <div class="iu-inline-inputs">
        <span>What is</span>
        <input type="number" data-field="percNum1" aria-label="Percentage value" value="${d.percNum1}" class="iu-num-input iu-w-20" />
        <span>% of</span>
        <input type="number" data-field="percNum2" aria-label="Base value" value="${d.percNum2}" class="iu-num-input iu-w-24" />
        <span>?</span>
      </div>
      <div class="iu-highlight-box">
        <span class="iu-result-eyebrow">Answer</span>
        <div class="iu-result-primary iu-text-emerald" data-out="isOf">${res.isOf}</div>
      </div>
    </div>

    <div class="iu-card">
      <h3 class="iu-card-title">Find Ratio Percentage</h3>
      <p class="iu-field-hint">X is what percentage of Y? (e.g. Exam marks)</p>
      <div class="iu-inline-inputs">
        <input type="number" data-field="percNum1Mirror" aria-label="Score obtained" value="${d.percNum1}" class="iu-num-input iu-w-20" />
        <span>out of</span>
        <input type="number" data-field="percNum2Mirror" aria-label="Total maximum score" value="${d.percNum2}" class="iu-num-input iu-w-24" />
      </div>
      <div class="iu-highlight-box iu-highlight-blue">
        <span class="iu-result-eyebrow">Percentage Score</span>
        <div class="iu-result-primary" data-out="whatPercent">${res.whatPercent}%</div>
      </div>
    </div>
  </div>
</div>`;
  }

  if (spec.widgetType === 'age') {
    return `<div class="iu-calculator-mount" data-calculator-id="${escapeHtml(calculatorId)}" data-widget-type="age">
  <div class="iu-two-col-cards">
    <div class="iu-card">
      <label class="iu-label">Select Date of Birth</label>
      <input type="date" data-field="dob" aria-label="Date of birth" value="${d.dob}" class="iu-date-input" />
      <p class="iu-field-hint">
        Calculates exact chronological age required for Indian competitive exam forms (UPSC, SSC, IBPS, KPSC).
      </p>
    </div>

    <div class="iu-result-card">
      <p class="iu-result-eyebrow">Exact Age as of Today</p>
      <div class="iu-result-primary" data-out="agePrimary">
        ${res.years} <span class="iu-unit">Yrs</span> ${res.months} <span class="iu-unit">Mos</span> ${res.days} <span class="iu-unit">Days</span>
      </div>
      <div class="iu-two-col iu-mt-3">
        <div class="iu-stat-tile">
          <span class="iu-field-hint">Total Weeks</span>
          <strong data-out="totalWeeks">${res.totalWeeks.toLocaleString()} weeks</strong>
        </div>
        <div class="iu-stat-tile">
          <span class="iu-field-hint">Total Days Lived</span>
          <strong data-out="totalDays">${res.totalDays.toLocaleString()} days</strong>
        </div>
      </div>
    </div>
  </div>
</div>`;
  }

  if (spec.widgetType === 'date-difference') {
    return `<div class="iu-calculator-mount" data-calculator-id="${escapeHtml(calculatorId)}" data-widget-type="date-difference">
  <div class="iu-two-col-cards">
    <div class="iu-card">
      <div class="iu-field">
        <label class="iu-label-sm">Start Date</label>
        <input type="date" data-field="startDate" aria-label="Start date" value="${d.startDate}" class="iu-date-input" />
      </div>
      <div class="iu-field">
        <label class="iu-label-sm">End Date</label>
        <input type="date" data-field="endDate" aria-label="End date" value="${d.endDate}" class="iu-date-input" />
      </div>
    </div>

    <div class="iu-result-card">
      <p class="iu-result-eyebrow">Total Calendar Difference</p>
      <div class="iu-result-primary" data-out="totalDaysDisplay">${res.totalDays} <span class="iu-unit">Days</span></div>
      <p class="iu-result-sub iu-text-emerald" data-out="weeksRemainderDisplay">Equivalent to: ${res.weeks} weeks and ${res.remainderDays} days</p>
    </div>
  </div>
</div>`;
  }

  if (spec.widgetType === 'discount') {
    return `<div class="iu-calculator-mount" data-calculator-id="${escapeHtml(calculatorId)}" data-widget-type="discount">
  <div class="iu-two-col-cards">
    <div class="iu-card">
      <div class="iu-field">
        <label class="iu-label">Original Price (MRP)</label>
        <div class="iu-input-group">
          <span class="iu-prefix">₹</span>
          <input type="number" data-field="originalPrice" aria-label="Original price in rupees" value="${d.originalPrice}" class="iu-num-input iu-w-full" />
        </div>
      </div>
      <div class="iu-field">
        <div class="iu-field-header">
          <label class="iu-label">Discount Offered (%)</label>
          <strong class="iu-text-emerald" data-out="discountOfferBadge">${d.discountPercent}% OFF</strong>
        </div>
        <input type="range" data-field="discountPercent" aria-label="Discount percentage slider" min="1" max="95" value="${d.discountPercent}" class="iu-range" />
      </div>
    </div>

    <div class="iu-result-card">
      <p class="iu-result-eyebrow">Final Deal Price to Pay</p>
      <div class="iu-result-primary" data-out="finalPrice">${formatIndianCurrency(res.finalPrice)}</div>
      <div class="iu-highlight-box" data-out="savingBanner">
        🎉 You save ${formatIndianCurrency(res.discountAmount)} (${d.discountPercent}% discount)
      </div>
    </div>
  </div>
</div>`;
  }

  if (spec.widgetType === 'bmi') {
    return `<div class="iu-calculator-mount" data-calculator-id="${escapeHtml(calculatorId)}" data-widget-type="bmi">
  <div class="iu-two-col-cards">
    <div class="iu-card">
      <div class="iu-field">
        <label class="iu-label">Height (cm)</label>
        <input type="number" data-field="heightCm" aria-label="Height in centimetres" min="90" max="250" value="${d.heightCm}" class="iu-num-input iu-w-full" />
      </div>
      <div class="iu-field">
        <label class="iu-label">Weight (kg)</label>
        <input type="number" data-field="weightKg" aria-label="Weight in kilograms" min="20" max="250" value="${d.weightKg}" class="iu-num-input iu-w-full" />
      </div>
    </div>

    <div class="iu-result-card">
      <p class="iu-result-eyebrow">Your Body Mass Index (BMI)</p>
      <div class="iu-result-primary" data-out="bmiValue">${res.bmi} <span class="iu-unit">kg/m²</span></div>
      <div class="iu-badge iu-badge-${res.badgeTone}" data-out="bmiCategory">Classification: ${res.category}</div>
      <p class="iu-calc-note">
        Note: This calculator uses Consensus Guidelines for Asian Indians (ICMR/WHO), which define normal BMI between 18.5 and 22.9 to account for higher body fat percentages.
      </p>
    </div>
  </div>
</div>`;
  }

  throw new Error(`Unhandled calculator widgetType: ${spec.widgetType}`);
}
