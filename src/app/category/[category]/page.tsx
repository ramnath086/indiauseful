import { SITE_URL } from '@/lib/siteConfig';
import { createPageMetadata } from '@/lib/metadata';
import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { CATEGORIES, CALCULATORS } from '@/data/calculators';
import { GUIDES } from '@/data/guides';
import Breadcrumbs from '@/components/Breadcrumbs';
import AdPlaceholder from '@/components/AdPlaceholder';
import { ArrowRight, Calculator, BookOpen, Sparkles, Shield } from 'lucide-react';

interface Props {
  params: Promise<{
    category: string;
  }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map(cat => ({
    category: cat.id
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = CATEGORIES.find(c => c.id === category);
  if (!cat) return {};

  return createPageMetadata({
    title: cat.name,
    description: cat.description,
    path: `/category/${cat.id}`,
    ogImage: `${SITE_URL}/og-image.png`
  });
}

const categoryContent: Record<string, {
  intro: string;
  keyTopics: { title: string; content: string; articleLink?: string; calculatorLinks?: string[] }[];
  clinicalNote?: string;
}> = {
  finance: {
    intro: 'Grow your wealth with accurate Indian tax-friendly calculators for SIP, PPF, NPS, and more.',
    keyTopics: [
      {
        title: 'SIP vs Lump Sum: Cash Flows and Compounding',
        content: 'Compare regular SIP contributions with a lump-sum investment. Rupee cost averaging spreads entry prices but does not guarantee profit or outperformance; projected returns are assumptions.',
        articleLink: '/articles/sip-vs-lumpsum-mutual-funds-guide',
        calculatorLinks: ['/calculators/sip-calculator', '/calculators/ppf-calculator', '/calculators/nps-calculator']
      },
      {
        title: 'PPF: Maturity and Government-Notified Interest',
        content: 'PPF interest uses the government-notified/current applicable rate, which can change. The calculator uses a fixed 7.1% illustrative assumption, not a permanently guaranteed rate. Tax benefits depend on the applicable regime and eligibility.',
        articleLink: '/articles/ppf-maturity-fifth-of-month-rule-guide',
        calculatorLinks: ['/calculators/ppf-calculator']
      },
      {
        title: 'NPS: Retirement Corpus & Monthly Pension Projection',
        content: 'Project NPS corpus and illustrative pension. For normal-exit corpus above ₹12 lakh, the minimum annuity is currently 20% for non-government and 40% for government subscribers; smaller-corpus exceptions and premature-exit rules differ.',
        articleLink: '/articles/nps-corpus-annuity-pension-guide',
        calculatorLinks: ['/calculators/nps-calculator']
      }
    ],
    clinicalNote: 'Projections are estimates based on assumed returns. Account for expense ratios, exit loads, capital gains tax, and inflation before making investment decisions.'
  },
  banking: {
    intro: 'Estimate monthly loan EMI, total interest and repayment totals, fixed-EMI prepayment savings, and gross FD/RD maturity. These tools do not produce a month-by-month amortization table or calculate home-loan fees and tax deductions.',
    keyTopics: [
      {
        title: 'How Home Loan EMI is Calculated in India',
        content: 'Indian banks use the reducing balance method. The standard formula: EMI = [P × R × (1+R)^N] / [(1+R)^N - 1]. In early years, 70-80% of each EMI goes to interest. See our detailed guide on amortization and prepayment hacks.',
        articleLink: '/articles/how-to-calculate-home-loan-emi-india',
        calculatorLinks: ['/calculators/home-loan-emi-calculator', '/calculators/loan-prepayment-calculator']
      },
      {
        title: 'FD & RD Returns with Quarterly Compounding',
        content: 'Indian banks use quarterly compounding for FDs and RDs. Senior citizens get 0.5% extra. For resident depositors, bank FD/RD interest TDS thresholds from 1 Apr 2025 are ₹50,000 for others and ₹1,00,000 for senior citizens; the usual rate is 10% with PAN and 20% without PAN, subject to applicable exemptions. Calculate maturity for SBI, HDFC, ICICI, Post Office.',
        articleLink: '/articles/fd-maturity-quarterly-compounding-guide',
        calculatorLinks: ['/calculators/fd-calculator', '/calculators/rd-calculator']
      },
      {
        title: 'Loan Prepayment: Save Lakhs in Interest',
        content: 'Interest is charged on outstanding balance, so a rupee prepaid in year 3 saves interest for ~17 more years. A ₹2L prepayment on a ₹40L loan at 8.75% for 20 years saves ~₹6.1L interest and closes ~22 months early.',
        articleLink: '/articles/loan-prepayment-emi-vs-tenure-guide',
        calculatorLinks: ['/calculators/loan-prepayment-calculator']
      }
    ],
    clinicalNote: 'Results are estimates based on standard Indian banking formulas. Actual terms may vary by bank, credit profile, and loan type. Consult your bank for exact terms.'
  },
  jobs: {
    intro: 'Estimate monthly salary before income-tax TDS using a simplified CTC model with PF, gratuity costs, variable pay and selected professional tax. Income tax, HRA exemptions and a full allowance breakdown are not calculated.',
    keyTopics: [
      {
        title: 'CTC vs In-Hand: The Hidden Components',
        content: 'Your offer letter CTC includes non-cash items, deferred benefits, and statutory employer contributions. The tools illustrate modelled employer and employee PF, gratuity costs and variable pay rather than a complete payslip. Compare the pre-income-tax-TDS estimate with your actual salary structure.',
        articleLink: '/articles/understanding-ctc-vs-in-hand-salary-india',
        calculatorLinks: ['/calculators/salary-calculator', '/calculators/ctc-inhand-calculator']
      },
      {
        title: 'Employer PF: Where Does the 12% Really Go?',
        content: 'Employer\'s 12% is split: part goes to EPS (pension) up to the wage ceiling, rest to PF. If Basic exceeds the wage ceiling, the effective retirement accrual is lower than 12%. Check if your employer contributes on full Basic or the ceiling.',
        calculatorLinks: ['/calculators/ctc-inhand-calculator']
      },
      {
        title: 'Old vs New Tax Regime: Structure First, Then Tax',
        content: 'Regime choice affects TDS, not the salary structure. Employer PF, gratuity reserve, and variable component behave the same in both regimes. These tools estimate structure and pre-income-tax-TDS pay only; assess income tax and HRA eligibility separately.',
        calculatorLinks: ['/calculators/ctc-inhand-calculator', '/calculators/salary-calculator']
      }
    ],
    clinicalNote: 'First few payslips may differ due to mid-month joining, one-time deductions, PF start date, or tax declarations not yet submitted. Allow 2-3 payslips to settle before comparing with estimates.'
  },
  gold: {
    intro: 'A jewellery budget starts with the quoted gold rate, weight and purity, then adds making charges and other invoice items. Use the existing calculator to compare estimates from those inputs rather than treating a default rate as a live market quote. Read the buying guide before comparing written quotations, especially when stones, wastage or separate charges are involved.',
    keyTopics: [
      {
        title: 'Gold Price & Jewellery Billing Calculator',
        content: 'Enter the quoted 22K rate per gram, gram weight, selected purity and making-charge basis. The tool estimates metal value, making charges, a fixed hallmarking-fee assumption and modelled 3% GST. Other purity rates are derived from your input; live gold quotes are not fetched.',
        calculatorLinks: ['/calculators/gold-price-calculator']
      },
      {
        title: 'Gold-Buying Guide: Purity, HUID and Invoice Charges',
        content: 'Read the existing guide on hallmark purity and HUID, making charges, wastage, GST and gold-weight units. Use it to ask for a clear written breakdown before comparing jewellery quotations; the calculator does not include separate stone or diamond prices.',
        articleLink: '/articles/gold-buying-guide-hallmarking-gst-making-charges'
      }
    ],
    clinicalNote: 'Use your own quoted rate and verify current charges and tax treatment with the jeweller. The displayed result is a simplified estimate, not a live price feed or a guaranteed invoice.'
  },
  tools: {
    intro: 'Use limited GST rate presets for inclusive/exclusive arithmetic and a CGST/SGST illustration, calculate a percentage of a value or a share, check chronological age, count calendar days/weeks, apply one discount stage, or view BMI with Asian-Indian thresholds.',
    keyTopics: [
      {
        title: 'GST Arithmetic with Limited Rate Presets',
        content: 'The 5%, 12%, 18% and 28% buttons are limited/example presets, not a complete current GST rate list. Dated context: the 22 September 2025 reforms introduced a broad 5%/18% structure with a special 40% rate for selected supplies. Other rates, exemptions and later amendments can apply. The calculator does not determine the applicable rate and cannot model a rate missing from its presets.',
        calculatorLinks: ['/calculators/gst-calculator']
      },
      {
        title: 'Percentage of a Value and Percentage Share',
        content: 'Calculate X% of Y or X as a percentage of Y, such as marks scored out of a total. Percentage change between an old and new value is a separate calculation, not an output of this tool.',
        calculatorLinks: ['/calculators/percentage-calculator']
      },
      {
        title: 'Chronological Age for Competitive Exams',
        content: 'Competitive exams (UPSC, SSC, Banking) need precise chronological age from DOB. Calculate down to the day for eligibility checks. Also useful for legal tenures and project durations.',
        calculatorLinks: ['/calculators/age-calculator', '/calculators/date-difference-calculator']
      }
    ],
    clinicalNote: 'Calculators provide mathematical results. For legal/tax filings, consult a CA or tax professional.'
  },
  kerala: {
    intro: 'Tailored calculators for Kerala: 1 Pavan (8 grams) sovereign gold rate, wedding jewellery estimates, making charges, and 3% GST. Built for the unique Kerala jewellery market where gold is quoted per Pavan.',
    keyTopics: [
      {
        title: 'Pavan, Sovereign, Tola — Not the Same Unit',
        content: 'In Kerala and South India, gold is quoted per Pavan (8g of 22K gold = 1 Sovereign). North India uses Tola (~11.66g). A rate per Tola is NOT comparable to per Pavan — comparing directly misleads by ~46%. Always verify the unit.',
        calculatorLinks: ['/calculators/kerala-gold-pavan-calculator']
      },
      {
        title: 'Hallmark HUID: Mandatory on Every Piece',
        content: 'BIS mandates 6-digit HUID laser-engraved on every hallmarked piece. Verify via BIS Care app. The hallmark shows: BIS logo, purity (22K/916), and the unique HUID. No HUID = no hallmark guarantee.',
        articleLink: '/articles/gold-buying-guide-hallmarking-gst-making-charges',
        calculatorLinks: ['/calculators/kerala-gold-pavan-calculator']
      },
      {
        title: 'Exchange Old Gold: The Hidden Deductions',
        content: 'When exchanging old gold, jewellers apply purity deduction and melting loss before crediting metal value. Stones/enamel are removed from weight. Without original invoice, deductions increase. Keep invoices for major purchases.',
        calculatorLinks: ['/calculators/kerala-gold-pavan-calculator']
      }
    ],
    clinicalNote: 'Pavan/Sovereign = 8g of 22K gold. Tola ≈ 11.66g. Rates differ daily. Verify HUID on BIS Care app. Stones/enamel not part of gold value on exchange.'
  }
};

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = CATEGORIES.find(c => c.id === category);

  if (!cat) {
    notFound();
  }

  const tools = CALCULATORS.filter(c => c.category === cat.id);
  const relatedGuides = GUIDES.filter(g => g.category === cat.id);
  const content = categoryContent[cat.id];

  // ItemList schema for SEO
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${cat.name} Calculators`,
    description: cat.description,
    itemListElement: tools.map((tool, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: tool.name,
      url: `${SITE_URL}/calculators/${tool.slug}`
    }))
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <Breadcrumbs items={[{ label: 'Categories', href: '/#categories' }, { label: cat.name }]} />

      <div className="mt-4 rounded-2xl bg-gradient-to-r from-emerald-700 to-teal-800 p-6 sm:p-10 text-white shadow-md">
        <div className="inline-block rounded-full bg-emerald-500/30 px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur-xs">
          Category Hub
        </div>
        <h1 className="mt-3 text-2xl sm:text-4xl font-extrabold tracking-tight">
          {cat.name}
        </h1>
        <p className="mt-1 text-emerald-200 text-sm font-medium">
          {cat.malayalamName}
        </p>
        <p className="mt-3 max-w-2xl text-sm sm:text-base text-emerald-100/90 leading-relaxed">
          {cat.description}
        </p>
      </div>

      <AdPlaceholder slotId={`category-${cat.id}-top`} format="horizontal" />

      {/* Category Deep Dive Content */}
      {content && (
        <section className="mt-10 max-w-3xl space-y-8">
          <div className="text-gray-700 leading-relaxed">
            <p>{content.intro}</p>
          </div>

          <section className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Key Topics</h2>
            <div className="space-y-6">
              {content.keyTopics.map((topic, idx) => (
                <article key={idx} className="rounded-xl bg-white p-5 border border-gray-100 shadow-sm">
                  <h4 className="font-semibold text-gray-900">{topic.title}</h4>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">{topic.content}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {topic.articleLink && (
                      <Link
                        href={topic.articleLink}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700 hover:underline"
                      >
                        Read article <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    )}
                    {topic.calculatorLinks?.map((link, li) => (
                      <Link
                        key={li}
                        href={link}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 hover:bg-emerald-50/80 transition-colors"
                      >
                        <Calculator className="h-3.5 w-3.5" /> Calculator
                      </Link>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          {cat.id === 'tools' && (
            <p className="text-xs leading-relaxed text-gray-600">
              GST rate reference: the{' '}
              <a href="https://www.pib.gov.in/PressReleasePage.aspx?PRID=2163555" target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline">Ministry of Finance announcement dated 3 September 2025</a>{' '}
              describes the reforms from 22 September 2025. Check the{' '}
              <a href="https://taxinformation.cbic.gov.in/" target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline">current CBIC notifications and rate information</a>{' '}
              for the classification and date of your transaction. These presets do not determine the applicable GST rate.
            </p>
          )}

          {relatedGuides.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">Calculator Guides</h2>
              <ul className="space-y-3">
                {relatedGuides.map(g => (
                  <li key={g.slug}>
                    <Link href={`/articles/${g.slug}`} className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700 hover:underline">
                      <BookOpen className="h-4 w-4 shrink-0" /> {g.title}
                      <ArrowRight className="h-3.5 w-3.5 shrink-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </section>
      )}

      <AdPlaceholder slotId={`category-${cat.id}-bottom`} format="horizontal" />

      {content?.clinicalNote && (
        <div className="mt-12 rounded-xl bg-gray-50 p-6 border border-gray-100">
          <h3 className="font-semibold text-gray-900 text-sm">Important Notes</h3>
          <p className="text-xs text-gray-500 mt-1">{content.clinicalNote}</p>
        </div>
      )}
    </div>
  );
}