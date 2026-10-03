import { CALCULATOR_SPECS } from './calculator-engine.mjs';

/**
 * Generates the self-contained browser runtime `blogger/assets/calculators.js`
 * that powers all 21 interactive calculators plus header search and mobile
 * navigation on Blogger with zero external dependencies or network requests.
 */
export function generateBrowserCalculatorRuntime(calculatorsSearchIndex = []) {
  const specsJson = JSON.stringify(CALCULATOR_SPECS, null, 2);
  const searchJson = JSON.stringify(calculatorsSearchIndex, null, 2);

  return `/* IndiaUseful Blogger Client-Side Calculator Runtime (All 21 Calculators) */
(function () {
  'use strict';

  const CALCULATOR_SPECS = ${specsJson};
  const SEARCH_INDEX = ${searchJson};

  function formatIndianCurrency(amount) {
    if (Number.isNaN(amount) || !Number.isFinite(amount)) return '₹0';
    const rounded = Math.round(amount);
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(rounded);
  }

  function formatIndianNumber(value, decimals) {
    const dec = typeof decimals === 'number' ? decimals : 2;
    if (Number.isNaN(value) || !Number.isFinite(value)) return '0';
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: dec,
      minimumFractionDigits: 0
    }).format(value);
  }

  function formatLakhsCrores(amount) {
    if (Number.isNaN(amount) || amount === 0) return '₹0';
    const abs = Math.abs(amount);
    if (abs >= 10000000) return '₹' + (amount / 10000000).toFixed(2) + ' Cr';
    if (abs >= 100000) return '₹' + (amount / 100000).toFixed(2) + ' L';
    if (abs >= 1000) return '₹' + (amount / 1000).toFixed(1) + ' K';
    return formatIndianCurrency(amount);
  }

  function calculateGenericEmi(state) {
    const loanAmount = Number(state.loanAmount);
    const interestRate = Number(state.interestRate);
    const tenureYears = Number(state.tenureYears);
    const principal = loanAmount > 0 ? loanAmount : 0;
    const monthlyRate = interestRate > 0 ? interestRate / (12 * 100) : 0;
    const totalMonths = tenureYears > 0 ? tenureYears * 12 : 1;

    let emi = 0;
    let totalInterest = 0;
    let totalPayment = 0;

    if (principal > 0 && monthlyRate > 0 && totalMonths > 0) {
      const factor = Math.pow(1 + monthlyRate, totalMonths);
      emi = Math.round((principal * monthlyRate * factor) / (factor - 1));
      totalPayment = emi * totalMonths;
      totalInterest = totalPayment - principal;
    } else if (principal > 0 && monthlyRate === 0) {
      emi = Math.round(principal / totalMonths);
      totalPayment = principal;
      totalInterest = 0;
    }

    const principalPercent = totalPayment > 0 ? Math.round((principal / totalPayment) * 100) : 0;
    const interestPercent = 100 - principalPercent;

    return {
      principal: principal,
      monthlyRate: monthlyRate,
      totalMonths: totalMonths,
      emi: emi,
      totalInterest: totalInterest,
      totalPayment: totalPayment,
      principalPercent: principalPercent,
      interestPercent: interestPercent
    };
  }

  function calculatePrepayment(state) {
    const loanAmount = Number(state.loanAmount);
    const interestRate = Number(state.interestRate);
    const tenureYears = Number(state.tenureYears);
    const lumpsumPrepayment = Number(state.lumpsumPrepayment);
    const prepayAfterYear = Number(state.prepayAfterYear);

    const monthlyRate = interestRate / (12 * 100);
    const totalMonths = tenureYears * 12;
    const factor = Math.pow(1 + monthlyRate, totalMonths);
    const normalEmi = Math.round((loanAmount * monthlyRate * factor) / (factor - 1));
    const normalTotalInterest = normalEmi * totalMonths - loanAmount;

    let balance = loanAmount;
    let monthsWithPrepay = 0;
    let totalInterestWithPrepay = 0;
    const prepayMonth = prepayAfterYear * 12;

    for (let m = 1; m <= totalMonths; m++) {
      if (balance <= 0) break;
      const interestForMonth = balance * monthlyRate;
      totalInterestWithPrepay += interestForMonth;
      const principalPaid = normalEmi - interestForMonth;
      balance -= principalPaid;

      if (m === prepayMonth) {
        balance -= lumpsumPrepayment;
      }

      monthsWithPrepay = m;
      if (balance <= 0) {
        balance = 0;
        break;
      }
    }

    const interestSaved = Math.max(0, Math.round(normalTotalInterest - totalInterestWithPrepay));
    const monthsSaved = Math.max(0, totalMonths - monthsWithPrepay);
    const yearsSaved = (monthsSaved / 12).toFixed(1);
    const newPayoffYears = (monthsWithPrepay / 12).toFixed(1);

    return {
      normalEmi: normalEmi,
      normalTotalInterest: normalTotalInterest,
      monthsWithPrepay: monthsWithPrepay,
      interestSaved: interestSaved,
      monthsSaved: monthsSaved,
      yearsSaved: yearsSaved,
      newPayoffYears: newPayoffYears
    };
  }

  function calculateDeposit(state) {
    const depositAmount = Number(state.depositAmount);
    const interestRate = Number(state.interestRate);
    const tenureYears = Number(state.tenureYears);
    const isSeniorCitizen = Boolean(state.isSeniorCitizen);
    const isFd = Boolean(state.isFd);

    const effectiveRate = interestRate + (isSeniorCitizen ? 0.5 : 0);
    let maturityAmount = 0;
    let totalInvested = 0;

    if (isFd) {
      totalInvested = depositAmount;
      const nQuarter = 4;
      maturityAmount = Math.round(
        depositAmount * Math.pow(1 + effectiveRate / (100 * nQuarter), nQuarter * tenureYears)
      );
    } else {
      const totalMonths = tenureYears * 12;
      totalInvested = depositAmount * totalMonths;
      let sum = 0;
      const r = effectiveRate / 100;
      for (let m = 1; m <= totalMonths; m++) {
        const tRem = (totalMonths - m + 1) / 12;
        sum += depositAmount * Math.pow(1 + r / 4, 4 * tRem);
      }
      maturityAmount = Math.round(sum);
    }

    const interestEarned = Math.max(0, maturityAmount - totalInvested);

    return {
      effectiveRate: effectiveRate,
      totalInvested: totalInvested,
      maturityAmount: maturityAmount,
      interestEarned: interestEarned
    };
  }

  function calculateSip(state) {
    const monthlyInvestment = Number(state.monthlyInvestment);
    const expectedRate = Number(state.expectedRate);
    const tenureYears = Number(state.tenureYears);

    const i = expectedRate / (12 * 100);
    const n = tenureYears * 12;
    const investedAmount = monthlyInvestment * n;

    let futureValue = 0;
    if (i > 0 && n > 0 && monthlyInvestment > 0) {
      futureValue = Math.round(monthlyInvestment * ((Math.pow(1 + i, n) - 1) / i) * (1 + i));
    } else {
      futureValue = investedAmount;
    }

    const wealthGained = Math.max(0, futureValue - investedAmount);
    const investedPercent = futureValue > 0 ? Math.round((investedAmount / futureValue) * 100) : 0;
    const wealthPercent = 100 - investedPercent;

    return {
      investedAmount: investedAmount,
      futureValue: futureValue,
      wealthGained: wealthGained,
      investedPercent: investedPercent,
      wealthPercent: wealthPercent,
      totalMonths: n
    };
  }

  function calculatePpf(state) {
    const clampedDeposit = Math.min(150000, Number(state.annualDeposit));
    const tenureYears = Number(state.tenureYears);
    const interestRate = 7.1;

    let balance = 0;
    let totalInvested = 0;
    for (let y = 1; y <= tenureYears; y++) {
      totalInvested += clampedDeposit;
      const interest = Math.round((balance + clampedDeposit) * (interestRate / 100));
      balance = balance + clampedDeposit + interest;
    }

    const totalInterest = balance - totalInvested;
    return {
      annualDeposit: clampedDeposit,
      interestRate: interestRate,
      totalInvested: totalInvested,
      totalInterest: totalInterest,
      balance: balance
    };
  }

  function calculateNps(state) {
    const currentAge = Number(state.currentAge);
    const monthlyContribution = Number(state.monthlyContribution);
    const expectedReturn = Number(state.expectedReturn);
    const clampedAnnuityShare = Math.max(40, Number(state.annuitySharePercent));
    const annuityReturnRate = 6;

    const retirementAge = 60;
    const investmentYears = Math.max(1, retirementAge - currentAge);
    const totalMonths = investmentYears * 12;

    const r = expectedReturn / (12 * 100);
    let totalCorpus = 0;
    const totalInvested = monthlyContribution * totalMonths;

    if (r > 0) {
      totalCorpus = Math.round(monthlyContribution * ((Math.pow(1 + r, totalMonths) - 1) / r) * (1 + r));
    } else {
      totalCorpus = totalInvested;
    }

    const annuityAmount = Math.round((totalCorpus * clampedAnnuityShare) / 100);
    const lumpsumAmount = totalCorpus - annuityAmount;
    const monthlyPension = Math.round((annuityAmount * (annuityReturnRate / 100)) / 12);

    return {
      annuitySharePercent: clampedAnnuityShare,
      investmentYears: investmentYears,
      totalMonths: totalMonths,
      totalInvested: totalInvested,
      totalCorpus: totalCorpus,
      annuityAmount: annuityAmount,
      lumpsumAmount: lumpsumAmount,
      monthlyPension: monthlyPension
    };
  }

  function calculateGratuity(state) {
    const basicSalary = Number(state.basicSalary);
    const yearsOfService = Number(state.yearsOfService);
    const isCoveredUnderAct = Boolean(state.isCoveredUnderAct);

    const denominator = isCoveredUnderAct ? 26 : 30;
    let gratuityAmount = 0;

    if (yearsOfService >= 5 && basicSalary > 0) {
      gratuityAmount = Math.round((15 * basicSalary * yearsOfService) / denominator);
    }

    const taxExemptLimit = 2000000;
    const exemptGratuity = Math.min(gratuityAmount, taxExemptLimit);
    const taxableGratuity = Math.max(0, gratuityAmount - taxExemptLimit);

    return {
      denominator: denominator,
      gratuityAmount: gratuityAmount,
      exemptGratuity: exemptGratuity,
      taxableGratuity: taxableGratuity
    };
  }

  function calculateSalary(state) {
    const ctcAnnual = Number(state.ctcAnnual);
    const bonusAnnual = Number(state.bonusAnnual);
    const monthlyProfTax = Number(state.monthlyProfTax);

    const basicAnnual = Math.round(ctcAnnual * 0.40);
    const employerPfMonthly = Math.min(1800, Math.round((basicAnnual / 12) * 0.12));
    const employeePfMonthly = employerPfMonthly;
    const gratuityMonthlyReserve = Math.round((basicAnnual / 12) * 0.0481);

    const monthlyGross = Math.round((ctcAnnual - bonusAnnual) / 12) - employerPfMonthly - gratuityMonthlyReserve;
    const monthlyDeductions = employeePfMonthly + monthlyProfTax;
    const monthlyInHand = Math.max(0, monthlyGross - monthlyDeductions);

    return {
      basicAnnual: basicAnnual,
      employerPfMonthly: employerPfMonthly,
      employeePfMonthly: employeePfMonthly,
      gratuityMonthlyReserve: gratuityMonthlyReserve,
      monthlyGross: monthlyGross,
      monthlyDeductions: monthlyDeductions,
      monthlyInHand: monthlyInHand
    };
  }

  function calculateGold(state) {
    const clampedWeight = Math.max(0.1, Number(state.gramWeight));
    const ratePerGram22k = Number(state.ratePerGram22k);
    const purity = state.purity || '22k';
    const makingChargeType = state.makingChargeType || 'percent';
    const makingChargeValue = Number(state.makingChargeValue);
    const hallmarkFee = 45;

    const base24k = ratePerGram22k * (24 / 22);
    let effectiveGramRate = ratePerGram22k;
    if (purity === '24k') {
      effectiveGramRate = Math.round(base24k);
    } else if (purity === '18k') {
      effectiveGramRate = Math.round(base24k * 0.75);
    }

    const rawGoldValue = clampedWeight * effectiveGramRate;
    let makingChargeAmount = 0;
    if (makingChargeType === 'percent') {
      makingChargeAmount = Math.round((rawGoldValue * makingChargeValue) / 100);
    } else {
      makingChargeAmount = Math.round(clampedWeight * makingChargeValue);
    }

    const subTotalBeforeGst = rawGoldValue + makingChargeAmount + hallmarkFee;
    const gstAmount = Math.round(subTotalBeforeGst * 0.03);
    const totalBillAmount = subTotalBeforeGst + gstAmount;
    const pavans = (clampedWeight / 8).toFixed(2);

    return {
      gramWeight: clampedWeight,
      effectiveGramRate: effectiveGramRate,
      rawGoldValue: rawGoldValue,
      makingChargeAmount: makingChargeAmount,
      hallmarkFee: hallmarkFee,
      subTotalBeforeGst: subTotalBeforeGst,
      gstAmount: gstAmount,
      totalBillAmount: totalBillAmount,
      pavans: pavans
    };
  }

  function calculateGst(state) {
    const amount = Number(state.amount);
    const gstRate = Number(state.gstRate);
    const calculationType = state.calculationType || 'exclusive';

    let netAmount = 0;
    let gstAmount = 0;
    let totalAmount = 0;

    if (calculationType === 'exclusive') {
      netAmount = amount;
      gstAmount = Math.round((amount * gstRate) / 100);
      totalAmount = netAmount + gstAmount;
    } else {
      totalAmount = amount;
      netAmount = Math.round((amount * 100) / (100 + gstRate));
      gstAmount = totalAmount - netAmount;
    }

    const halfGst = Math.round(gstAmount / 2);

    return {
      netAmount: netAmount,
      gstAmount: gstAmount,
      totalAmount: totalAmount,
      halfGst: halfGst
    };
  }

  function calculatePercentage(state) {
    const percNum1 = Number(state.percNum1);
    const percNum2 = Number(state.percNum2);
    const isOf = (percNum1 / 100) * percNum2;
    const whatPercent = percNum2 !== 0 ? ((percNum1 / percNum2) * 100).toFixed(2) : 0;
    return { isOf: isOf, whatPercent: whatPercent };
  }

  function calculateAge(state) {
    const birth = new Date(state.dob);
    const now = state.referenceDate ? new Date(state.referenceDate) : new Date();
    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const diffTime = Math.abs(now.getTime() - birth.getTime());
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);

    return {
      years: years,
      months: months,
      days: days,
      totalDays: totalDays,
      totalWeeks: totalWeeks
    };
  }

  function calculateDateDifference(state) {
    const d1 = new Date(state.startDate);
    const d2 = new Date(state.endDate);
    const diffTime = Math.abs(d2.getTime() - d1.getTime());
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(totalDays / 7);
    const remainderDays = totalDays % 7;

    return {
      totalDays: totalDays,
      weeks: weeks,
      remainderDays: remainderDays
    };
  }

  function calculateDiscount(state) {
    const originalPrice = Number(state.originalPrice);
    const discountPercent = Number(state.discountPercent);
    const discountAmount = Math.round((originalPrice * discountPercent) / 100);
    const finalPrice = Math.max(0, originalPrice - discountAmount);
    return {
      discountAmount: discountAmount,
      finalPrice: finalPrice
    };
  }

  function calculateBmi(state) {
    const heightCm = Number(state.heightCm);
    const weightKg = Number(state.weightKg);
    const heightM = heightCm / 100;
    const bmi = heightM > 0 ? (weightKg / (heightM * heightM)).toFixed(1) : '0';
    const numericBmi = parseFloat(bmi);

    let category = 'Normal';
    let badgeTone = 'emerald';
    if (numericBmi < 18.5) {
      category = 'Underweight (< 18.5)';
      badgeTone = 'blue';
    } else if (numericBmi <= 22.9) {
      category = 'Healthy / Normal (18.5 - 22.9 Asian Cutoff)';
      badgeTone = 'emerald';
    } else if (numericBmi <= 24.9) {
      category = 'Overweight (23.0 - 24.9 Asian Cutoff)';
      badgeTone = 'amber';
    } else {
      category = 'Obese (≥ 25 Asian Cutoff)';
      badgeTone = 'red';
    }

    return {
      bmi: bmi,
      numericBmi: numericBmi,
      category: category,
      badgeTone: badgeTone
    };
  }

  function computeCalculatorById(id, inputOverrides) {
    const spec = CALCULATOR_SPECS[id];
    if (!spec) return null;
    const state = Object.assign({}, spec.defaults, inputOverrides || {});
    switch (spec.widgetType) {
      case 'generic-emi':
        return calculateGenericEmi(state);
      case 'prepayment':
        return calculatePrepayment(state);
      case 'deposit':
        return calculateDeposit(Object.assign({}, state, { isFd: spec.depositType === 'fd' }));
      case 'sip':
        return calculateSip(state);
      case 'ppf':
        return calculatePpf(state);
      case 'nps':
        return calculateNps(state);
      case 'gratuity':
        return calculateGratuity(state);
      case 'salary':
        return calculateSalary(state);
      case 'gold':
        return calculateGold(state);
      case 'gst':
        return calculateGst(state);
      case 'percentage':
        return calculatePercentage(state);
      case 'age':
        return calculateAge(state);
      case 'date-difference':
        return calculateDateDifference(state);
      case 'discount':
        return calculateDiscount(state);
      case 'bmi':
        return calculateBmi(state);
      default:
        return null;
    }
  }

  function setText(root, key, val) {
    const el = root.querySelector('[data-out="' + key + '"]');
    if (el) el.textContent = String(val);
  }

  function setBarWidth(root, key, pct) {
    const el = root.querySelector('[data-bar="' + key + '"]');
    if (el) el.style.width = pct + '%';
  }

  function bindCalculatorMount(mountEl) {
    const calcId = mountEl.getAttribute('data-calculator-id');
    const spec = CALCULATOR_SPECS[calcId];
    if (!spec) return;

    const state = Object.assign({}, spec.defaults);

    function syncInputs(changedField, newVal) {
      const fInput = mountEl.querySelector('[data-field="' + changedField + '"]');
      const sInput = mountEl.querySelector('[data-slider="' + changedField + '"]');
      if (fInput && fInput.type !== 'checkbox' && fInput.type !== 'radio' && String(fInput.value) !== String(newVal)) {
        fInput.value = String(newVal);
      }
      if (sInput && String(sInput.value) !== String(newVal)) {
        sInput.value = String(newVal);
      }
    }

    function updateOutputs() {
      const res = computeCalculatorById(calcId, state);
      if (!res) return;

      if (spec.widgetType === 'generic-emi') {
        setText(mountEl, 'tenureSuffix', 'Yrs (' + (state.tenureYears * 12) + ' Mos)');
        setText(mountEl, 'emi', formatIndianCurrency(res.emi));
        setText(mountEl, 'emiSub', 'per month for ' + (state.tenureYears * 12) + ' months');
        setText(mountEl, 'principal', formatIndianCurrency(res.principal));
        setText(mountEl, 'totalInterest', formatIndianCurrency(res.totalInterest));
        setText(mountEl, 'totalPayment', formatIndianCurrency(res.totalPayment));
        setText(mountEl, 'principalPercentLabel', 'Principal (' + res.principalPercent + '%)');
        setText(mountEl, 'interestPercentLabel', 'Interest (' + res.interestPercent + '%)');
        setBarWidth(mountEl, 'principal', res.principalPercent);
        setBarWidth(mountEl, 'interest', res.interestPercent);
      } else if (spec.widgetType === 'prepayment') {
        setText(mountEl, 'loanAmountDisplay', formatIndianCurrency(state.loanAmount));
        setText(mountEl, 'lumpsumPrepaymentDisplay', formatIndianCurrency(state.lumpsumPrepayment));
        setText(mountEl, 'interestSaved', formatIndianCurrency(res.interestSaved));
        setText(mountEl, 'tenureReduction', res.yearsSaved + ' Years earlier (' + res.monthsSaved + ' months)');
        setText(mountEl, 'newPayoffTime', res.newPayoffYears + ' Years');
        setText(mountEl, 'normalEmi', formatIndianCurrency(res.normalEmi));
      } else if (spec.widgetType === 'deposit') {
        setText(mountEl, 'maturityAmount', formatIndianCurrency(res.maturityAmount));
        setText(mountEl, 'effectiveRateSub', 'Effective Interest: ' + res.effectiveRate.toFixed(2) + '% with Indian quarterly compounding');
        setText(mountEl, 'totalInvested', formatIndianCurrency(res.totalInvested));
        setText(mountEl, 'interestEarned', '+' + formatIndianCurrency(res.interestEarned));
      } else if (spec.widgetType === 'sip') {
        setText(mountEl, 'futureValue', formatIndianCurrency(res.futureValue));
        setText(mountEl, 'sipSub', 'after ' + state.tenureYears + ' years (' + (state.tenureYears * 12) + ' installments)');
        setText(mountEl, 'investedAmount', formatIndianCurrency(res.investedAmount));
        setText(mountEl, 'wealthGained', '+' + formatIndianCurrency(res.wealthGained));
        setText(mountEl, 'investedPercentLabel', 'Principal (' + res.investedPercent + '%)');
        setText(mountEl, 'wealthPercentLabel', 'Gain (' + res.wealthPercent + '%)');
        setBarWidth(mountEl, 'invested', res.investedPercent);
        setBarWidth(mountEl, 'wealth', res.wealthPercent);
      } else if (spec.widgetType === 'ppf') {
        setText(mountEl, 'balance', formatIndianCurrency(res.balance));
        setText(mountEl, 'totalInvested', formatIndianCurrency(res.totalInvested));
        setText(mountEl, 'totalInterest', '+' + formatIndianCurrency(res.totalInterest));
      } else if (spec.widgetType === 'nps') {
        setText(mountEl, 'investmentYearsHint', 'Investing for ' + res.investmentYears + ' years until age 60.');
        setText(mountEl, 'totalCorpus', formatIndianCurrency(res.totalCorpus));
        setText(mountEl, 'monthlyPension', formatIndianCurrency(res.monthlyPension) + ' / month');
        setText(mountEl, 'lumpsumLabel', 'Illustrative lump-sum portion (' + (100 - res.annuitySharePercent) + '%):');
        setText(mountEl, 'lumpsumAmount', formatIndianCurrency(res.lumpsumAmount));
        setText(mountEl, 'annuityLabel', 'Annuity Purchased (' + res.annuitySharePercent + '%):');
        setText(mountEl, 'annuityAmount', formatIndianCurrency(res.annuityAmount));
        setText(mountEl, 'totalInvested', formatIndianCurrency(res.totalInvested));
      } else if (spec.widgetType === 'gratuity') {
        const warn = mountEl.querySelector('[data-out="serviceWarning"]');
        if (warn) warn.style.display = state.yearsOfService < 5 ? 'block' : 'none';
        setText(mountEl, 'gratuityAmount', formatIndianCurrency(res.gratuityAmount));
        setText(mountEl, 'gratuityFormula', 'Formula: (15 × ' + formatIndianCurrency(state.basicSalary) + ' × ' + state.yearsOfService + ') / ' + res.denominator);
        setText(mountEl, 'exemptGratuity', formatIndianCurrency(res.exemptGratuity));
        const taxRow = mountEl.querySelector('[data-out="taxableRow"]');
        if (taxRow) taxRow.style.display = res.taxableGratuity > 0 ? 'flex' : 'none';
        setText(mountEl, 'taxableGratuity', formatIndianCurrency(res.taxableGratuity));
      } else if (spec.widgetType === 'salary') {
        setText(mountEl, 'monthlyInHand', formatIndianCurrency(res.monthlyInHand));
        setText(mountEl, 'monthlyGross', formatIndianCurrency(res.monthlyGross));
        setText(mountEl, 'employeePfMonthly', '-' + formatIndianCurrency(res.employeePfMonthly));
        setText(mountEl, 'monthlyProfTax', '-' + formatIndianCurrency(state.monthlyProfTax));
        setText(mountEl, 'employerCtcPart', formatIndianCurrency(res.employerPfMonthly + res.gratuityMonthlyReserve) + ' /mo');
      } else if (spec.widgetType === 'gold') {
        setText(mountEl, 'pavansHint', '= ' + res.pavans + ' Kerala Pavan');
        setText(mountEl, 'pavanRateHint', '1 Pavan = ' + formatIndianCurrency(state.ratePerGram22k * 8));
        setText(mountEl, 'totalBillAmount', formatIndianCurrency(res.totalBillAmount));
        setText(mountEl, 'netGoldLabel', 'Net Gold Value (' + res.gramWeight + 'g @ ' + formatIndianCurrency(res.effectiveGramRate) + '/g):');
        setText(mountEl, 'rawGoldValue', formatIndianCurrency(res.rawGoldValue));
        setText(
          mountEl,
          'makingChargeLabel',
          'Making Charges (' + (state.makingChargeType === 'percent' ? state.makingChargeValue + '%' : '₹' + state.makingChargeValue + '/g') + '):'
        );
        setText(mountEl, 'makingChargeAmount', formatIndianCurrency(res.makingChargeAmount));
        setText(mountEl, 'gstAmount', '+' + formatIndianCurrency(res.gstAmount));
      } else if (spec.widgetType === 'gst') {
        const isExcl = state.calculationType === 'exclusive';
        setText(mountEl, 'amountLabel', isExcl ? 'Base Amount (Without GST)' : 'MRP / Invoice Total (With GST)');
        setText(mountEl, 'primaryHeader', isExcl ? 'Final Total Bill (Incl. GST)' : 'Net Base Price (Excl. GST)');
        setText(mountEl, 'primaryAmount', formatIndianCurrency(isExcl ? res.totalAmount : res.netAmount));
        setText(mountEl, 'gstRateSub', 'GST Rate applied: ' + state.gstRate + '%');
        setText(mountEl, 'netAmount', formatIndianCurrency(res.netAmount));
        setText(mountEl, 'totalGstLabel', 'Total GST (' + state.gstRate + '%):');
        setText(mountEl, 'gstAmount', '+' + formatIndianCurrency(res.gstAmount));
        setText(mountEl, 'cgstLabel', 'CGST (' + (state.gstRate / 2) + '%):');
        setText(mountEl, 'cgstAmount', formatIndianCurrency(res.halfGst));
        setText(mountEl, 'sgstLabel', 'SGST / UTGST (' + (state.gstRate / 2) + '%):');
        setText(mountEl, 'sgstAmount', formatIndianCurrency(res.halfGst));
        setText(mountEl, 'totalAmount', formatIndianCurrency(res.totalAmount));
      } else if (spec.widgetType === 'percentage') {
        setText(mountEl, 'isOf', res.isOf);
        setText(mountEl, 'whatPercent', res.whatPercent + '%');
      } else if (spec.widgetType === 'age') {
        const agePrimary = mountEl.querySelector('[data-out="agePrimary"]');
        if (agePrimary) {
          agePrimary.innerHTML =
            res.years + ' <span class="iu-unit">Yrs</span> ' +
            res.months + ' <span class="iu-unit">Mos</span> ' +
            res.days + ' <span class="iu-unit">Days</span>';
        }
        setText(mountEl, 'totalWeeks', res.totalWeeks.toLocaleString() + ' weeks');
        setText(mountEl, 'totalDays', res.totalDays.toLocaleString() + ' days');
      } else if (spec.widgetType === 'date-difference') {
        const totalDaysEl = mountEl.querySelector('[data-out="totalDaysDisplay"]');
        if (totalDaysEl) {
          totalDaysEl.innerHTML = res.totalDays + ' <span class="iu-unit">Days</span>';
        }
        setText(mountEl, 'weeksRemainderDisplay', 'Equivalent to: ' + res.weeks + ' weeks and ' + res.remainderDays + ' days');
      } else if (spec.widgetType === 'discount') {
        setText(mountEl, 'discountOfferBadge', state.discountPercent + '% OFF');
        setText(mountEl, 'finalPrice', formatIndianCurrency(res.finalPrice));
        setText(mountEl, 'savingBanner', '🎉 You save ' + formatIndianCurrency(res.discountAmount) + ' (' + state.discountPercent + '% discount)');
      } else if (spec.widgetType === 'bmi') {
        const bmiValEl = mountEl.querySelector('[data-out="bmiValue"]');
        if (bmiValEl) {
          bmiValEl.innerHTML = res.bmi + ' <span class="iu-unit">kg/m²</span>';
        }
        const catEl = mountEl.querySelector('[data-out="bmiCategory"]');
        if (catEl) {
          catEl.textContent = 'Classification: ' + res.category;
          catEl.className = 'iu-badge iu-badge-' + res.badgeTone;
        }
      }
    }

    mountEl.querySelectorAll('[data-field], [data-slider]').forEach(function (inputEl) {
      const fieldName = inputEl.getAttribute('data-field') || inputEl.getAttribute('data-slider');
      const isSlider = inputEl.hasAttribute('data-slider');

      function handleInput() {
        if (inputEl.type === 'checkbox') {
          state[fieldName] = inputEl.checked;
        } else if (inputEl.type === 'radio') {
          if (inputEl.checked) {
            state[fieldName] = inputEl.value === 'true';
          }
        } else if (inputEl.type === 'date') {
          state[fieldName] = inputEl.value;
        } else if (fieldName === 'percNum1Mirror') {
          state.percNum1 = Number(inputEl.value);
          syncInputs('percNum1', state.percNum1);
        } else if (fieldName === 'percNum2Mirror') {
          state.percNum2 = Number(inputEl.value);
          syncInputs('percNum2', state.percNum2);
        } else {
          let numVal = Number(inputEl.value);
          if (calcId === 'ppf' && fieldName === 'annualDeposit' && !isSlider) {
            numVal = Math.min(150000, numVal);
          } else if (calcId === 'nps' && fieldName === 'annuitySharePercent') {
            numVal = Math.max(40, numVal);
          } else if (spec.widgetType === 'gold' && fieldName === 'gramWeight') {
            numVal = Math.max(0.1, numVal);
          }
          state[fieldName] = numVal;
          syncInputs(fieldName, numVal);
          if (fieldName === 'percNum1') syncInputs('percNum1Mirror', numVal);
          if (fieldName === 'percNum2') syncInputs('percNum2Mirror', numVal);
        }
        updateOutputs();
      }

      inputEl.addEventListener('input', handleInput);
      inputEl.addEventListener('change', handleInput);
    });

    // Gold purity buttons
    mountEl.querySelectorAll('[data-purity]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.purity = btn.getAttribute('data-purity');
        mountEl.querySelectorAll('[data-purity]').forEach(function (b) {
          const active = b.getAttribute('data-purity') === state.purity;
          b.setAttribute('aria-pressed', active ? 'true' : 'false');
          b.classList.toggle('iu-choice-btn-active', active);
        });
        updateOutputs();
      });
    });

    // Gold makingChargeType buttons
    mountEl.querySelectorAll('[data-making-type]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.makingChargeType = btn.getAttribute('data-making-type');
        mountEl.querySelectorAll('[data-making-type]').forEach(function (b) {
          const active = b.getAttribute('data-making-type') === state.makingChargeType;
          b.setAttribute('aria-pressed', active ? 'true' : 'false');
          b.classList.toggle('iu-mini-btn-active', active);
        });
        const mcInput = mountEl.querySelector('[data-field="makingChargeValue"]');
        if (mcInput) {
          mcInput.max = state.makingChargeType === 'percent' ? '40' : '3000';
          mcInput.step = state.makingChargeType === 'percent' ? '0.5' : '50';
        }
        updateOutputs();
      });
    });

    // GST calculationType buttons
    mountEl.querySelectorAll('[data-calc-type]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.calculationType = btn.getAttribute('data-calc-type');
        mountEl.querySelectorAll('[data-calc-type]').forEach(function (b) {
          const active = b.getAttribute('data-calc-type') === state.calculationType;
          b.setAttribute('aria-pressed', active ? 'true' : 'false');
          b.classList.toggle('iu-choice-btn-active', active);
        });
        updateOutputs();
      });
    });

    // GST rate preset buttons
    mountEl.querySelectorAll('[data-gst-rate]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.gstRate = Number(btn.getAttribute('data-gst-rate'));
        mountEl.querySelectorAll('[data-gst-rate]').forEach(function (b) {
          const active = Number(b.getAttribute('data-gst-rate')) === state.gstRate;
          b.setAttribute('aria-pressed', active ? 'true' : 'false');
          b.classList.toggle('iu-rate-btn-active', active);
        });
        updateOutputs();
      });
    });

    updateOutputs();
  }

  function initCalculators() {
    if (typeof document === 'undefined') return;
    document.querySelectorAll('.iu-calculator-mount[data-calculator-id]').forEach(bindCalculatorMount);
  }

  function initHeaderUi() {
    if (typeof document === 'undefined') return;

    const menuBtn = document.getElementById('iu-mobile-menu-btn');
    const menuPanel = document.getElementById('mobile-menu-panel');
    if (menuBtn && menuPanel) {
      menuBtn.addEventListener('click', function () {
        const isOpen = menuBtn.getAttribute('aria-expanded') === 'true';
        menuBtn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
        menuPanel.hidden = isOpen;
      });
    }

    const searchBtn = document.getElementById('iu-mobile-search-btn');
    const searchPanel = document.getElementById('mobile-search-panel');
    if (searchBtn && searchPanel) {
      searchBtn.addEventListener('click', function () {
        const isOpen = searchBtn.getAttribute('aria-expanded') === 'true';
        searchBtn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
        searchPanel.hidden = isOpen;
      });
    }

    function wireSearchInput(inputId, resultsId) {
      const input = document.getElementById(inputId);
      const resultsBox = document.getElementById(resultsId);
      if (!input || !resultsBox) return;

      input.addEventListener('input', function () {
        const q = input.value.trim().toLowerCase();
        if (!q) {
          resultsBox.hidden = true;
          resultsBox.innerHTML = '';
          return;
        }
        const matches = SEARCH_INDEX.filter(function (c) {
          return (
            c.name.toLowerCase().indexOf(q) !== -1 ||
            c.shortDesc.toLowerCase().indexOf(q) !== -1 ||
            c.keywords.some(function (k) {
              return k.toLowerCase().indexOf(q) !== -1;
            })
          );
        }).slice(0, 6);

        resultsBox.hidden = false;
        if (matches.length === 0) {
          resultsBox.innerHTML = '<div class="iu-search-empty">No matching calculator found</div>';
          return;
        }
        resultsBox.innerHTML = matches
          .map(function (m) {
            return (
              '<a class="iu-search-item" href="' +
              m.bloggerUrl +
              '"><span>' +
              m.name +
              '</span><small>' +
              m.category +
              '</small></a>'
            );
          })
          .join('');
      });
    }

    wireSearchInput('iu-search-input', 'iu-search-results');
    wireSearchInput('iu-mobile-search-input', 'iu-mobile-search-results');
  }

  if (typeof window !== 'undefined') {
    window.IndiaUsefulCalculators = {
      CALCULATOR_SPECS: CALCULATOR_SPECS,
      computeCalculatorById: computeCalculatorById,
      formatIndianCurrency: formatIndianCurrency,
      formatIndianNumber: formatIndianNumber,
      formatLakhsCrores: formatLakhsCrores,
      initCalculators: initCalculators,
      initHeaderUi: initHeaderUi
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () {
        initCalculators();
        initHeaderUi();
      });
    } else {
      initCalculators();
      initHeaderUi();
    }
  }
})();
`;
}
