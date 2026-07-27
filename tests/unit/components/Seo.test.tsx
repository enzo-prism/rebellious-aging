import { render } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';

import { Seo, serializeJsonLd } from '@/components/seo/Seo';

describe('Seo', () => {
  it('escapes characters that can break out of a JSON-LD script', () => {
    const payload = {
      '@context': 'https://schema.org',
      description: '</script><img src=x onerror=alert(1)>',
      separator: '\u2028',
    };

    const serialized = serializeJsonLd(payload);

    expect(serialized).not.toContain('</script>');
    expect(serialized).not.toContain('<img');
    expect(JSON.parse(serialized)).toEqual(payload);
  });

  it('renders each schema in its own safe JSON-LD script', () => {
    const schemas = [
      { '@type': 'Organization', name: 'Rebellious Aging' },
      { '@type': 'WebSite', description: '</script><script>bad()</script>' },
    ];

    const { container } = render(<Seo jsonLd={schemas} />);
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');

    expect(scripts).toHaveLength(2);
    expect(container.querySelectorAll('script')).toHaveLength(2);
    expect(JSON.parse(scripts[1].textContent ?? '')).toEqual(schemas[1]);
  });
});
