import { expect, test, vi } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IngredientChecklist, RecipePrintButton } from '@/components/recipes/RecipeCookingTools';
import { BlogPostFooter } from '@/components/blog/BlogPostFooter';

test('ingredients stay readable while each checkbox toggles independently', async () => {
  const user = userEvent.setup();
  render(<IngredientChecklist ingredients={['1 cup beans', '2 ripe mangoes']} />);
  const beans = screen.getByRole('checkbox', { name: '1 cup beans' });
  await user.click(beans);
  expect(beans).toBeChecked();
  expect(screen.getByRole('checkbox', { name: '2 ripe mangoes' })).not.toBeChecked();
  expect(screen.getByText('1 cup beans')).toBeVisible();
  await user.click(beans);
  expect(beans).not.toBeChecked();
});

test('print action invokes the browser print dialog', async () => {
  const print = vi.spyOn(window, 'print').mockImplementation(() => {});
  render(<RecipePrintButton />);
  await userEvent.click(screen.getByRole('button', { name: 'Print recipe' }));
  expect(print).toHaveBeenCalledOnce();
  print.mockRestore();
});

test('latest article retains a route back to the archive', () => {
  render(<BlogPostFooter />);
  expect(screen.getByRole('link', { name: '← All articles' })).toHaveAttribute('href', '/blog');
});
