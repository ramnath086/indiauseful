import { SITE_URL } from '@/lib/siteConfig';
import { createPageMetadata } from '@/lib/metadata';
import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { CALCULATORS, CATEGORIES } from '@/data/calculators';
import Breadcrumbs from '@/components/Breadcrumbs';
import AdPlaceholder from '@/components/AdPlaceholder';
import GenericEmiCalculator from '@/components/calculators/GenericEmiCalculator';
import SipCalculator from '@/components/calculators/SipCalculator';
import DepositCalculator from '@/components/calculators/DepositCalculator';
import PpfCalculator from '@/components/calculators/PpfCalculator';
import NpsCalculator from '@/components/calculators/NpsCalculator';
import GratuityCalculator from '@/components/calculators/GratuityCalculator';
import SalaryCalculator from '@/components/calculators/SalaryCalculator';
import GoldCalculator from '@/components/calculators/GoldCalculator';
import GstCalculator from '@/components/calculators/GstCalculator';
import PrepaymentCalculator from '@/components/calculators/PrepaymentCalculator';
import GenericUtilityCalculator from '@/components/calculators/GenericUtilityCalculator';
import { HelpCircle, Sparkles, ArrowRight } from 'lucide-react';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return CALCULATORS.map(calc => ({
    slug: calc.slug
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = CALCULATORS.find(c => c.slug === slug);
  if (!tool) return {};

  return createPageMetadata({
    title: tool.seoTitle,
    description: tool.seoDescription,
    path: `/calculators/${tool.slug}`,
    keywords: tool.keywords
  });
}

export default async function CalculatorDetailPage({ params }: Props) {
  const { slug } = await params;
  const tool = CALCULATORS.find(c => c.slug === slug);

  if (!tool) {
    notFound();
  }

  const category = CATEGORIES.find(c => c.id === tool.category);
  const relatedTools = CALCULATORS.filter(
    c => c.category === tool.category && c.id !== tool.id
  ).slice(0, 4);

  // Schema.org SoftwareApplication / WebApplication JSON-LD
  const softwareAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.name,
    operatingSystem: 'All',
    applicationCategory: 'FinanceApplication',
    description: tool.seoDescription,
    url: `${SITE_URL}/calculators/${tool.slug}`,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR'
    }
  };

  const faqItems = [
    {
      question: 'Is this calculator free to use?',
      answer: 'Yes. This calculator is free to use; there are no subscriptions or paywalls.'
    },
    {
      question: 'Can I rely on these numbers for a bank application or financial decision?',
      answer: 'Treat the result as an estimate, not an official quote or financial advice. It uses the inputs and simplified assumptions shown here; actual terms and amounts may vary with provider rules, timing, fees, eligibility, and applicable taxes. Verify important figures with the relevant institution or a qualified professional.'
    }
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer
      }
    }))
  };

  function renderCalculatorWidget(toolId: string) {
    switch (toolId) {
      case 'emi':
        return <GenericEmiCalculator defaultAmount={2500000} defaultRate={9.0} defaultTenureYears={15} label="Loan" />;
      case 'home-loan':
        return <GenericEmiCalculator defaultAmount={5000000} defaultRate={8.5} defaultTenureYears={20} label="Home Loan" />;
      case 'personal-loan':
        return <GenericEmiCalculator defaultAmount={300000} defaultRate={12.5} defaultTenureYears={3} label="Personal Loan" />;
      case 'car-loan':
        return <GenericEmiCalculator defaultAmount={800000} defaultRate={8.9} defaultTenureYears={5} label="Vehicle Loan" />;
      case 'loan-prepayment':
        return <PrepaymentCalculator />;
      case 'sip':
        return <SipCalculator />;
      case 'fd':
        return <DepositCalculator type="fd" />;
      case 'rd':
        return <DepositCalculator type="rd" />;
      case 'ppf':
        return <PpfCalculator />;
      case 'nps':
        return <NpsCalculator />;
      case 'gratuity':
        return <GratuityCalculator />;
      case 'salary':
        return <SalaryCalculator mode="simple" />;
      case 'ctc-inhand':
        return <SalaryCalculator mode="detailed" />;
      case 'gold-price':
        return <GoldCalculator isKeralaPavan={false} />;
      case 'kerala-gold':
        return <GoldCalculator isKeralaPavan={true} />;
      case 'gst':
        return <GstCalculator />;
      case 'percentage':
        return <GenericUtilityCalculator type="percentage" />;
      case 'age':
        return <GenericUtilityCalculator type="age" />;
      case 'date-difference':
        return <GenericUtilityCalculator type="date-difference" />;
      case 'discount':
        return <GenericUtilityCalculator type="discount" />;
      case 'bmi':
        return <GenericUtilityCalculator type="bmi" />;
      default:
        return <GenericEmiCalculator />;
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Breadcrumbs
        items={[
          { label: category?.name || 'Calculators', href: `/category/${tool.category}` },
          { label: tool.name }
        ]}
      />

      {/* Hero Title */}
      <div className="mt-4 mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="rounded bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 capitalize">
            {tool.category}
          </span>
          <span className="flex items-center gap-1 text-xs text-emerald-700 font-medium">
            <Sparkles className="h-3 w-3" /> 100% Free & Instant
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
          {tool.name}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-3xl leading-relaxed">
          {tool.shortDesc}
        </p>
      </div>

      {/* Main Calculator Interactive Area */}
      <div className="mb-10">
        {renderCalculatorWidget(tool.id)}
        <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs leading-relaxed text-amber-950">
          Planning estimate only. Results use the inputs and simplified assumptions shown in this calculator; actual amounts may vary with provider terms, timing, eligibility, fees, and applicable taxes. Verify important figures before acting.
        </p>
      </div>

      {/* In-Content Responsive Ad Placeholder */}
      <AdPlaceholder slotId={`calculator-${tool.id}-mid`} format="horizontal" />

      {/* Educational Explanation & Mathematical Formula */}
      <section className="mt-12 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 space-y-6">
        <h2 className="text-xl font-bold text-gray-900">
          Understanding {tool.name}: How It Works
        </h2>
        <div className="text-sm sm:text-base text-gray-700 leading-relaxed space-y-4">
          <p>
            The <strong>{tool.name}</strong> provides an instant planning estimate based on the values you enter and the assumptions shown in this tool. It is not an official quote, statement, or determination of eligibility.
          </p>
          <div className="rounded-xl bg-gray-50 p-4 border border-gray-100">
            <h3 className="font-semibold text-gray-900 text-sm mb-1">Key Benefits:</h3>
            <ul className="list-disc pl-5 text-xs sm:text-sm text-gray-600 space-y-1">
              <li><strong>Zero Wait Time:</strong> Built with responsive client-side React logic for instantaneous calculations as you move sliders.</li>
              <li><strong>Browser-based calculations:</strong> No login is required, and calculator inputs are processed locally by the tool. See the Privacy Policy for information about ordinary hosting logs.</li>
              <li><strong>Clear limitations:</strong> Rules, provider terms, rates, fees, eligibility, and tax treatment can change and may differ from the simplified model used here.</li>
            </ul>
          </div>
        </div>

        {/* FAQs */}
        <div className="border-t border-gray-100 pt-6">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
            <HelpCircle className="h-5 w-5 text-emerald-600" /> Frequently Asked Questions
          </h3>
          <div className="space-y-4 text-sm">
            {faqItems.map(({ question, answer }) => (
              <div key={question} className="rounded-xl border border-gray-100 p-4 bg-gray-50/50">
                <h4 className="font-bold text-gray-900">{question}</h4>
                <p className="text-gray-600 mt-1">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Related Calculators in {category?.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedTools.map(rel => (
              <Link
                key={rel.id}
                href={`/calculators/${rel.slug}`}
                className="group flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-2xs hover:border-emerald-500 hover:shadow-xs transition-all"
              >
                <div>
                  <h3 className="text-sm font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                    {rel.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{rel.shortDesc}</p>
                </div>
                <div className="mt-3 flex items-center text-xs font-semibold text-emerald-600">
                  <span>Open tool</span>
                  <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
