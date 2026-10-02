/**
 * IndiaUseful Blogger Calculator Engine
 *
 * Recreates all 21 production calculators in pure, dependency-free JavaScript
 * with zero external network requests. Preserves production formulas, defaults,
 * input bounds, presets, validation, clamping, and rounding 1:1.
 */

export function formatIndianCurrency(amount) {
  if (Number.isNaN(amount) || !Number.isFinite(amount)) return '₹0';
  const rounded = Math.round(amount);
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(rounded);
}

export function formatIndianNumber(value, decimals = 2) {
  if (Number.isNaN(value) || !Number.isFinite(value)) return '0';
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: decimals,
    minimumFractionDigits: 0
  }).format(value);
}

export function formatLakhsCrores(amount) {
  if (Number.isNaN(amount) || amount === 0) return '₹0';
  const abs = Math.abs(amount);
  if (abs >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  }
  if (abs >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} L`;
  }
  if (abs >= 1000) {
    return `₹${(amount / 1000).toFixed(1)} K`;
  }
  return formatIndianCurrency(amount);
}

/**
 * Complete metadata & defaults for all 21 calculators, matching
 * `src/app/calculators/[slug]/page.tsx` and `src/components/calculators/*.tsx`.
 */
export const CALCULATOR_SPECS = {
  emi: {
    id: 'emi',
    slug: 'emi-calculator',
    widgetType: 'generic-emi',
    label: 'Loan',
    defaults: { loanAmount: 2500000, interestRate: 9.0, tenureYears: 15 },
    bounds: {
      loanAmount: { min: 10000, max: 100000000, step: 10000, sliderMin: 50000, sliderMax: 15000000, sliderStep: 25000 },
      interestRate: { min: 1, max: 36, step: 0.1, sliderMin: 6, sliderMax: 24, sliderStep: 0.1 },
      tenureYears: { min: 1, max: 35, step: 1, sliderMin: 1, sliderMax: 30, sliderStep: 1 }
    }
  },
  'home-loan': {
    id: 'home-loan',
    slug: 'home-loan-emi-calculator',
    widgetType: 'generic-emi',
    label: 'Home Loan',
    defaults: { loanAmount: 5000000, interestRate: 8.5, tenureYears: 20 },
    bounds: {
      loanAmount: { min: 10000, max: 100000000, step: 10000, sliderMin: 50000, sliderMax: 15000000, sliderStep: 25000 },
      interestRate: { min: 1, max: 36, step: 0.1, sliderMin: 6, sliderMax: 24, sliderStep: 0.1 },
      tenureYears: { min: 1, max: 35, step: 1, sliderMin: 1, sliderMax: 30, sliderStep: 1 }
    }
  },
  'personal-loan': {
    id: 'personal-loan',
    slug: 'personal-loan-emi-calculator',
    widgetType: 'generic-emi',
    label: 'Personal Loan',
    defaults: { loanAmount: 300000, interestRate: 12.5, tenureYears: 3 },
    bounds: {
      loanAmount: { min: 10000, max: 100000000, step: 10000, sliderMin: 50000, sliderMax: 15000000, sliderStep: 25000 },
      interestRate: { min: 1, max: 36, step: 0.1, sliderMin: 6, sliderMax: 24, sliderStep: 0.1 },
      tenureYears: { min: 1, max: 35, step: 1, sliderMin: 1, sliderMax: 30, sliderStep: 1 }
    }
  },
  'car-loan': {
    id: 'car-loan',
    slug: 'car-loan-emi-calculator',
    widgetType: 'generic-emi',
    label: 'Vehicle Loan',
    defaults: { loanAmount: 800000, interestRate: 8.9, tenureYears: 5 },
    bounds: {
      loanAmount: { min: 10000, max: 100000000, step: 10000, sliderMin: 50000, sliderMax: 15000000, sliderStep: 25000 },
      interestRate: { min: 1, max: 36, step: 0.1, sliderMin: 6, sliderMax: 24, sliderStep: 0.1 },
      tenureYears: { min: 1, max: 35, step: 1, sliderMin: 1, sliderMax: 30, sliderStep: 1 }
    }
  },
  'loan-prepayment': {
    id: 'loan-prepayment',
    slug: 'loan-prepayment-calculator',
    widgetType: 'prepayment',
    defaults: {
      loanAmount: 4000000,
      interestRate: 8.75,
      tenureYears: 20,
      lumpsumPrepayment: 200000,
      prepayAfterYear: 3
    },
    bounds: {
      loanAmount: { sliderMin: 500000, sliderMax: 15000000, sliderStep: 50000 },
      interestRate: { step: 0.1 },
      lumpsumPrepayment: { sliderMin: 25000, sliderMax: 2000000, sliderStep: 25000 },
      prepayAfterYearPresets: [1, 2, 3, 5, 7, 10]
    }
  },
  fd: {
    id: 'fd',
    slug: 'fd-calculator',
    widgetType: 'deposit',
    depositType: 'fd',
    defaults: { depositAmount: 100000, interestRate: 7.1, tenureYears: 5, isSeniorCitizen: false },
    bounds: {
      depositAmount: { min: 500, max: 10000000, step: 5000, sliderMin: 10000, sliderMax: 2000000, sliderStep: 5000 },
      interestRate: { min: 3, max: 12, step: 0.1, sliderMin: 3, sliderMax: 10, sliderStep: 0.1 },
      tenureYears: { min: 1, max: 10, step: 1, sliderMin: 1, sliderMax: 10, sliderStep: 1 }
    }
  },
  rd: {
    id: 'rd',
    slug: 'rd-calculator',
    widgetType: 'deposit',
    depositType: 'rd',
    defaults: { depositAmount: 5000, interestRate: 7.1, tenureYears: 3, isSeniorCitizen: false },
    bounds: {
      depositAmount: { min: 500, max: 200000, step: 500, sliderMin: 500, sliderMax: 50000, sliderStep: 500 },
      interestRate: { min: 3, max: 12, step: 0.1, sliderMin: 3, sliderMax: 10, sliderStep: 0.1 },
      tenureYears: { min: 1, max: 10, step: 1, sliderMin: 1, sliderMax: 10, sliderStep: 1 }
    }
  },
  sip: {
    id: 'sip',
    slug: 'sip-calculator',
    widgetType: 'sip',
    defaults: { monthlyInvestment: 10000, expectedRate: 12, tenureYears: 15 },
    bounds: {
      monthlyInvestment: { min: 500, max: 500000, step: 500, sliderMin: 500, sliderMax: 100000, sliderStep: 500 },
      expectedRate: { min: 1, max: 30, step: 0.5, sliderMin: 1, sliderMax: 25, sliderStep: 0.5 },
      tenureYears: { min: 1, max: 40, step: 1, sliderMin: 1, sliderMax: 35, sliderStep: 1 }
    }
  },
  ppf: {
    id: 'ppf',
    slug: 'ppf-calculator',
    widgetType: 'ppf',
    defaults: { annualDeposit: 150000, tenureYears: 15, interestRate: 7.1 },
    bounds: {
      annualDeposit: { min: 500, max: 150000, step: 5000, sliderMin: 500, sliderMax: 150000, sliderStep: 5000 },
      tenureYearsPresets: [15, 20, 25, 30]
    }
  },
  nps: {
    id: 'nps',
    slug: 'nps-calculator',
    widgetType: 'nps',
    defaults: {
      currentAge: 30,
      monthlyContribution: 5000,
      expectedReturn: 10,
      annuitySharePercent: 40,
      annuityReturnRate: 6
    },
    bounds: {
      currentAge: { min: 18, max: 59, sliderMin: 18, sliderMax: 55 },
      monthlyContribution: { min: 500, max: 150000, step: 500, sliderMin: 1000, sliderMax: 50000, sliderStep: 500 },
      expectedReturn: { min: 5, max: 16, step: 0.5 },
      annuitySharePercent: { min: 40, max: 100, step: 5 }
    }
  },
  gratuity: {
    id: 'gratuity',
    slug: 'gratuity-calculator',
    widgetType: 'gratuity',
    defaults: { basicSalary: 50000, yearsOfService: 7, isCoveredUnderAct: true },
    bounds: {
      basicSalary: { min: 5000, max: 2000000, step: 1000, sliderMin: 10000, sliderMax: 300000, sliderStep: 5000 },
      yearsOfService: { min: 1, max: 45, sliderMin: 1, sliderMax: 40, sliderStep: 1 }
    }
  },
  salary: {
    id: 'salary',
    slug: 'salary-calculator',
    widgetType: 'salary',
    mode: 'simple',
    defaults: { ctcAnnual: 900000, bonusAnnual: 50000, monthlyProfTax: 200 },
    bounds: {
      ctcAnnual: { min: 100000, max: 100000000, step: 50000, sliderMin: 200000, sliderMax: 4000000, sliderStep: 25000 },
      bonusAnnual: { min: 0, max: 2000000, step: 10000, sliderMin: 0, sliderMax: 500000, sliderStep: 10000 },
      monthlyProfTaxPresets: [200, 150, 0]
    }
  },
  'ctc-inhand': {
    id: 'ctc-inhand',
    slug: 'ctc-inhand-calculator',
    widgetType: 'salary',
    mode: 'detailed',
    defaults: { ctcAnnual: 900000, bonusAnnual: 50000, monthlyProfTax: 200 },
    bounds: {
      ctcAnnual: { min: 100000, max: 100000000, step: 50000, sliderMin: 200000, sliderMax: 4000000, sliderStep: 25000 },
      bonusAnnual: { min: 0, max: 2000000, step: 10000, sliderMin: 0, sliderMax: 500000, sliderStep: 10000 },
      monthlyProfTaxPresets: [200, 150, 0]
    }
  },
  'gold-price': {
    id: 'gold-price',
    slug: 'gold-price-calculator',
    widgetType: 'gold',
    isKeralaPavan: false,
    defaults: {
      gramWeight: 10,
      ratePerGram22k: 6800,
      purity: '22k',
      makingChargeType: 'percent',
      makingChargeValue: 12,
      hallmarkFee: 45
    },
    bounds: {
      gramWeight: { min: 0.1, max: 5000, step: 0.1 },
      ratePerGram22k: { min: 3000, max: 15000, step: 10 },
      purityPresets: ['22k', '24k', '18k'],
      makingChargeTypePresets: ['percent', 'perGram'],
      makingChargePercent: { min: 0, max: 40, step: 0.5 },
      makingChargePerGram: { min: 0, max: 3000, step: 50 }
    }
  },
  gst: {
    id: 'gst',
    slug: 'gst-calculator',
    widgetType: 'gst',
    defaults: { amount: 10000, gstRate: 18, calculationType: 'exclusive' },
    bounds: {
      amount: { min: 1, max: 100000000, step: 100, sliderMin: 100, sliderMax: 200000, sliderStep: 100 },
      gstRatePresets: [5, 12, 18, 28],
      calculationTypePresets: ['exclusive', 'inclusive']
    }
  },
  percentage: {
    id: 'percentage',
    slug: 'percentage-calculator',
    widgetType: 'percentage',
    defaults: { percNum1: 25, percNum2: 200 }
  },
  age: {
    id: 'age',
    slug: 'age-calculator',
    widgetType: 'age',
    defaults: { dob: '1998-05-15' }
  },
  'date-difference': {
    id: 'date-difference',
    slug: 'date-difference-calculator',
    widgetType: 'date-difference',
    defaults: { startDate: '2026-01-01', endDate: '2026-12-31' }
  },
  discount: {
    id: 'discount',
    slug: 'discount-calculator',
    widgetType: 'discount',
    defaults: { originalPrice: 2499, discountPercent: 30 },
    bounds: {
      discountPercent: { sliderMin: 1, sliderMax: 95 }
    }
  },
  bmi: {
    id: 'bmi',
    slug: 'bmi-calculator',
    widgetType: 'bmi',
    defaults: { heightCm: 172, weightKg: 68 },
    bounds: {
      heightCm: { min: 90, max: 250 },
      weightKg: { min: 20, max: 250 }
    }
  },
  'kerala-gold': {
    id: 'kerala-gold',
    slug: 'kerala-gold-pavan-calculator',
    widgetType: 'gold',
    isKeralaPavan: true,
    defaults: {
      gramWeight: 8,
      ratePerGram22k: 6800,
      purity: '22k',
      makingChargeType: 'percent',
      makingChargeValue: 12,
      hallmarkFee: 45
    },
    bounds: {
      gramWeight: { min: 0.1, max: 5000, step: 0.1 },
      ratePerGram22k: { min: 3000, max: 15000, step: 10 },
      purityPresets: ['22k', '24k', '18k'],
      makingChargeTypePresets: ['percent', 'perGram'],
      makingChargePercent: { min: 0, max: 40, step: 0.5 },
      makingChargePerGram: { min: 0, max: 3000, step: 50 }
    }
  }
};

/**
 * Pure calculation functions matching each React component in `src/components/calculators/*.tsx`.
 */
export function calculateGenericEmi({ loanAmount, interestRate, tenureYears }) {
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
    principal,
    monthlyRate,
    totalMonths,
    emi,
    totalInterest,
    totalPayment,
    principalPercent,
    interestPercent
  };
}

export function calculatePrepayment({
  loanAmount,
  interestRate,
  tenureYears,
  lumpsumPrepayment,
  prepayAfterYear
}) {
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
    normalEmi,
    normalTotalInterest,
    monthsWithPrepay,
    interestSaved,
    monthsSaved,
    yearsSaved,
    newPayoffYears
  };
}

export function calculateDeposit({ depositAmount, interestRate, tenureYears, isSeniorCitizen, isFd }) {
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
    effectiveRate,
    totalInvested,
    maturityAmount,
    interestEarned
  };
}

export function calculateSip({ monthlyInvestment, expectedRate, tenureYears }) {
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
    investedAmount,
    futureValue,
    wealthGained,
    investedPercent,
    wealthPercent,
    totalMonths: n
  };
}

export function calculatePpf({ annualDeposit, tenureYears }) {
  const clampedDeposit = Math.min(150000, Number(annualDeposit));
  const interestRate = 7.1;
  let balance = 0;
  let totalInvested = 0;
  const yearlyBreakdown = [];

  for (let y = 1; y <= tenureYears; y++) {
    totalInvested += clampedDeposit;
    const interest = Math.round((balance + clampedDeposit) * (interestRate / 100));
    balance = balance + clampedDeposit + interest;
    yearlyBreakdown.push({
      year: y,
      deposited: totalInvested,
      interest,
      closing: balance
    });
  }

  const totalInterest = balance - totalInvested;
  return {
    annualDeposit: clampedDeposit,
    interestRate,
    totalInvested,
    totalInterest,
    balance,
    yearlyBreakdown
  };
}

export function calculateNps({
  currentAge,
  monthlyContribution,
  expectedReturn,
  annuitySharePercent
}) {
  const clampedAnnuityShare = Math.max(40, Number(annuitySharePercent));
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
    investmentYears,
    totalMonths,
    totalInvested,
    totalCorpus,
    annuityAmount,
    lumpsumAmount,
    monthlyPension
  };
}

export function calculateGratuity({ basicSalary, yearsOfService, isCoveredUnderAct }) {
  const denominator = isCoveredUnderAct ? 26 : 30;
  let gratuityAmount = 0;

  if (yearsOfService >= 5 && basicSalary > 0) {
    gratuityAmount = Math.round((15 * basicSalary * yearsOfService) / denominator);
  }

  const taxExemptLimit = 2000000;
  const exemptGratuity = Math.min(gratuityAmount, taxExemptLimit);
  const taxableGratuity = Math.max(0, gratuityAmount - taxExemptLimit);

  return {
    denominator,
    gratuityAmount,
    exemptGratuity,
    taxableGratuity
  };
}

export function calculateSalary({ ctcAnnual, bonusAnnual, monthlyProfTax }) {
  const basicAnnual = Math.round(ctcAnnual * 0.40);
  const employerPfMonthly = Math.min(1800, Math.round((basicAnnual / 12) * 0.12));
  const employeePfMonthly = employerPfMonthly;
  const gratuityMonthlyReserve = Math.round((basicAnnual / 12) * 0.0481);

  const monthlyGross = Math.round((ctcAnnual - bonusAnnual) / 12) - employerPfMonthly - gratuityMonthlyReserve;
  const monthlyDeductions = employeePfMonthly + monthlyProfTax;
  const monthlyInHand = Math.max(0, monthlyGross - monthlyDeductions);

  return {
    basicAnnual,
    employerPfMonthly,
    employeePfMonthly,
    gratuityMonthlyReserve,
    monthlyGross,
    monthlyDeductions,
    monthlyInHand
  };
}

export function calculateGold({
  gramWeight,
  ratePerGram22k,
  purity,
  makingChargeType,
  makingChargeValue,
  hallmarkFee = 45
}) {
  const clampedWeight = Math.max(0.1, Number(gramWeight));
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
    effectiveGramRate,
    rawGoldValue,
    makingChargeAmount,
    hallmarkFee,
    subTotalBeforeGst,
    gstAmount,
    totalBillAmount,
    pavans
  };
}

export function calculateGst({ amount, gstRate, calculationType }) {
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
    netAmount,
    gstAmount,
    totalAmount,
    halfGst
  };
}

export function calculatePercentage({ percNum1, percNum2 }) {
  const isOf = (percNum1 / 100) * percNum2;
  const whatPercent = percNum2 !== 0 ? ((percNum1 / percNum2) * 100).toFixed(2) : 0;
  return { isOf, whatPercent };
}

export function calculateAge({ dob, referenceDate }) {
  const birth = new Date(dob);
  const now = referenceDate ? new Date(referenceDate) : new Date();
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

  return { years, months, days, totalDays, totalWeeks };
}

export function calculateDateDifference({ startDate, endDate }) {
  const d1 = new Date(startDate);
  const d2 = new Date(endDate);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(totalDays / 7);
  const remainderDays = totalDays % 7;

  return { totalDays, weeks, remainderDays };
}

export function calculateDiscount({ originalPrice, discountPercent }) {
  const discountAmount = Math.round((originalPrice * discountPercent) / 100);
  const finalPrice = Math.max(0, originalPrice - discountAmount);
  return { discountAmount, finalPrice };
}

export function calculateBmi({ heightCm, weightKg }) {
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

  return { bmi, numericBmi, category, badgeTone };
}

/**
 * Unified dispatcher by calculator id (`emi`, `home-loan`, ..., `kerala-gold`).
 */
export function computeCalculatorById(id, inputOverrides = {}) {
  const spec = CALCULATOR_SPECS[id];
  if (!spec) {
    throw new Error(`Unknown calculator id: ${id}`);
  }
  const state = { ...spec.defaults, ...inputOverrides };

  switch (spec.widgetType) {
    case 'generic-emi':
      return calculateGenericEmi(state);
    case 'prepayment':
      return calculatePrepayment(state);
    case 'deposit':
      return calculateDeposit({ ...state, isFd: spec.depositType === 'fd' });
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
      throw new Error(`Unsupported widgetType: ${spec.widgetType}`);
  }
}
