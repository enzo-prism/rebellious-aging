import Link from 'next/link';
import { ArrowRight, type LucideIcon } from 'lucide-react';

interface PillarCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  link: string;
}

export default function PillarCard({ title, description, icon: Icon, link }: PillarCardProps) {
  return (
    <Link href={link} className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 transition-colors hover:border-teal hover:bg-teal/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal">
      <Icon className="mb-4 h-7 w-7 text-teal" aria-hidden="true" />
      <h3 className="text-2xl font-semibold text-gray-900">{title}</h3>
      <p className="mb-5 mt-3 flex-1 text-base leading-relaxed text-gray-600">{description}</p>
      <span className="flex items-center gap-2 font-medium text-teal">Explore {title.toLowerCase()} <ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
    </Link>
  );
}
