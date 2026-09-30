import { SITE_URL } from '@/lib/siteConfig';
import { createPageMetadata } from '@/lib/metadata';
import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { CATEGORIES, CALCULATORS, ARTICLES } from '@/data/calculators';
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
        title: 'SIP vs Lump Sum: What 15 Years of Nifty 50 Data Shows',
        content: 'Why Systematic Investment Plans beat market timing for Indian salaried investors, backed by 15-year Nifty 50 rolling return data.',
        articleLink: '/articles/sip-vs-lumpsum-mutual-funds-guide',
        calculatorLinks: ['/calculators/sip-calculator', '/calculators/ppf-calculator', '/calculators/nps-calculator']
      },
      {
        title: 'PPF: 15-Year Tax-Free Guaranteed Returns',
        content: 'Public Provident Fund offers 15-year tax-free guaranteed returns under the government PPF scheme. Check maturity amount, annual tax-free interest, and tax savings under Section 80C with current Indian sovereign interest rates.',
        calculatorLinks: ['/calculators/ppf-calculator']
      },
      {
        title: 'NPS: Retirement Corpus & Monthly Pension Projection',
        content: 'Estimate your retirement corpus, lumpsum withdrawal (60%), and monthly pension payout (40% annuity) with the National Pension System. Plan your retirement corpus and monthly pension payout.',
        calculatorLinks: ['/calculators/nps-calculator']
      }
    ],
    clinicalNote: 'Projections are estimates based on assumed returns. Account for expense ratios, exit loads, capital gains tax, and inflation before making investment decisions.'
  },
  banking: {
    intro: 'Calculate EMI, loan interest, prepayment savings, and FD/RD returns across Indian banks. From home loans to vehicle financing, get precise amortization schedules and interest breakdowns.',
    keyTopics: [
      {
        title: 'How Home Loan EMI is Calculated in India',
        content: 'Indian banks use the reducing balance method. The standard formula: EMI = [P × R × (1+R)^N] / [(1+R)^N - 1]. In early years, 70-80% of each EMI goes to interest. See our detailed guide on amortization and prepayment hacks.',
        articleLink: '/articles/how-to-calculate-home-loan-emi-india',
        calculatorLinks: ['/calculators/home-loan-emi-calculator', '/calculators/loan-prepayment-calculator']
      },
      {
        title: 'FD & RD Returns with Quarterly Compounding',
        content: 'Indian banks use quarterly compounding for FDs and RDs. Senior citizens get 0.5% extra. TDS applies above ₹40,000 interest (₹50K for seniors). Calculate maturity for SBI, HDFC, ICICI, Post Office.',
        calculatorLinks: ['/calculators/fd-calculator', '/calculators/rd-calculator']
      },
      {
        title: 'Loan Prepayment: Save Lakhs in Interest',
        content: 'Interest is charged on outstanding balance, so a rupee prepaid in year 3 saves interest for ~17 more years. A ₹2L prepayment on a ₹40L loan at 8.75% for 20 years saves ~₹6.1L interest and closes ~22 months early.',
        calculatorLinks: ['/calculators/loan-prepayment-calculator']
      }
    ],
    clinicalNote: 'Results are estimates based on standard Indian banking formulas. Actual terms may vary by bank, credit profile, and loan type. Consult your bank for exact terms.'
  },
  jobs: {
    intro: 'Break down CTC into monthly take-home salary after PF, Professional Tax, and Income Tax deductions. Understand the difference between CTC, gross, and net pay under Indian labor laws.',
    keyTopics: [
      {
        title: 'CTC vs In-Hand: The Hidden Components',
        content: 'Your offer letter CTC includes non-cash items, deferred benefits, and statutory employer contributions. Employer PF (12% of Basic), Gratuity reserve (4.81%), and variable components can make monthly cash 20-30% lower than CTC/12. Understand the full breakdown.',
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
        content: 'Regime choice affects TDS, not the salary structure. Employer PF, gratuity reserve, and variable component behave the same in both regimes. Compare structure first, then tax impact.',
        calculatorLinks: ['/calculators/ctc-inhand-calculator', '/calculators/salary-calculator']
      }
    ],
    clinicalNote: 'First few payslips may differ due to mid-month joining, one-time deductions, PF start date, or tax declarations not yet submitted. Allow 2-3 payslips to settle before comparing with estimates.'
  },
  tools: {
    intro: 'Instant calculators for everyday math: GST breakdown (SGST/CGST/IGST), percentage increase/decrease/markup, chronological age for exams, date duration for project timelines, and BMI with Asian-Indian health thresholds.',
    keyTopics: [
      {
        title: 'GST Breakdown: SGST, CGST, IGST Made Simple',
        content: 'Indian GST has 4 slabs (5%, 12%, 18%, 28%). For intra-state: SGST + CGST. For inter-state: IGST. Calculate exclusive/inclusive amounts and verify invoice breakdowns instantly.',
        calculatorLinks: ['/calculators/gst-calculator']
      },
      {
        title: 'Percentage Calculator: Marks, Margins, Markups',
        content: 'Find percentage increase/decrease, marks percentage, profit margins, and markups. Useful for exam scores, business margins, markups, and everyday ratios.',
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