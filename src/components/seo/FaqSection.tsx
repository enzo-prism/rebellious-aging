import Link from 'next/link';
import type { FaqItem } from '@/data/faqs';
import { buildFaqJsonLd } from '@/lib/structuredData';
import Seo from './Seo';

export default function FaqSection({ title, questions }: { title: string; questions: FaqItem[] }) {
  return (
    <section className="container mx-auto px-4 py-12">
      <Seo jsonLd={buildFaqJsonLd(questions)} />
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-8 text-3xl font-bold">{title}</h2>
        <div className="space-y-8">
          {questions.map(({ question, answer, link }) => (
            <div key={question}>
              <h3 className="mb-3 text-xl font-semibold">{question}</h3>
              <p className="leading-relaxed text-gray-700">{answer}</p>
              {link && <Link href={link.href} className="mt-3 inline-block font-medium text-teal underline">{link.label}</Link>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
