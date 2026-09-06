'use client';

import { Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function RecipePrintButton() {
  return <Button variant="outline" className="print:hidden" onClick={() => window.print()}><Printer className="h-4 w-4" aria-hidden="true" />Print recipe</Button>;
}

export function IngredientChecklist({ ingredients }: { ingredients: string[] }) {
  return (
    <ul className="space-y-1">
      {ingredients.map((ingredient, index) => (
        <li key={index}>
          <label className="flex min-h-12 cursor-pointer items-start gap-3 rounded-lg py-3 text-base leading-relaxed hover:bg-muted/40 print:py-1">
            <input type="checkbox" className="peer mt-1 h-5 w-5 shrink-0 accent-teal print:hidden" />
            <span className="peer-checked:line-through peer-checked:text-muted-foreground print:!text-black print:!no-underline">{ingredient}</span>
          </label>
        </li>
      ))}
    </ul>
  );
}
