import Link from 'next/link';
import { buildBreadcrumbJsonLd } from '@/lib/structuredData';
import Seo from './Seo';

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export default function PageBreadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const trail = [{ name: 'Home', path: '/' }, ...items];
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
      <Seo jsonLd={buildBreadcrumbJsonLd(trail)} />
      <ol className="flex flex-wrap items-center gap-2">
        {trail.map((item, index) => (
          <li key={item.path} className="flex items-center gap-2">
            {index > 0 && <span aria-hidden="true">/</span>}
            {index === trail.length - 1
              ? <span aria-current="page">{item.name}</span>
              : <Link href={item.path} className="underline hover:text-teal">{item.name}</Link>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
