import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

const projectRoot = resolve(process.cwd());
const outDir = join(projectRoot, 'out');
const rollout = process.argv.includes('--rollout');

const scheduled = [
  {
    id: 'a-boundary-is-not-an-argument',
    title: 'A Boundary is NOT An Argument',
    blogNumber: 110,
  },
  {
    id: 'are-your-boundaries-protecting-your-peace-or-protecting-your-fear',
    title: 'Are Your Boundaries Protecting Your Peace or Protecting Your Fear?',
    blogNumber: 111,
  },
  {
    id: 'enough-according-to-whom',
    title: 'Enough. According to Whom?',
    blogNumber: 112,
  },
] as const;

const walkFiles = (directory: string, collected: string[] = []): string[] => {
  if (!existsSync(directory)) {
    return collected;
  }
  for (const entry of readdirSync(directory)) {
    const fullPath = join(directory, entry);
    if (statSync(fullPath).isDirectory()) {
      walkFiles(fullPath, collected);
      continue;
    }
    collected.push(fullPath);
  }
  return collected;
};

const collectHits = (needles: string[]) => {
  const files = walkFiles(outDir);
  const hits: Array<{ file: string; needle: string }> = [];
  for (const file of files) {
    const contents = readFileSync(file, 'utf8');
    for (const needle of needles) {
      if (contents.includes(needle)) {
        hits.push({ file: relative(projectRoot, file), needle });
      }
    }
  }
  return hits;
};

if (!existsSync(outDir)) {
  console.error(`Missing production export at ${outDir}. Run a production build first.`);
  process.exit(1);
}

if (rollout) {
  const published = scheduled[0];
  const stillHidden = scheduled.slice(1);
  const publishedHits = collectHits([published.id, published.title]);
  const leakedHits = collectHits(stillHidden.flatMap((post) => [post.id, post.title]));
  const blogHtmlPath = existsSync(join(outDir, 'blog.html'))
    ? join(outDir, 'blog.html')
    : join(outDir, 'blog', 'index.html');
  const blogHtml = readFileSync(blogHtmlPath, 'utf8');
  const homeHtml = readFileSync(join(outDir, 'index.html'), 'utf8');

  const errors: string[] = [];
  if (publishedHits.length === 0) {
    errors.push(`Expected ${published.id} / ${published.title} in the Nov 10 export.`);
  }
  if (!blogHtml.includes('110 article') && !blogHtml.includes('#110')) {
    errors.push('Expected /blog to mention article #110 after the Nov 10 build.');
  }
  if (!homeHtml.includes(`Blog #${published.blogNumber}`) && !homeHtml.includes(published.title)) {
    errors.push('Expected the homepage to surface #110 after the Nov 10 build.');
  }
  if (leakedHits.length > 0) {
    errors.push(
      `Nov 10 export still leaked later posts:\n${leakedHits
        .map((hit) => `  ${hit.needle} -> ${hit.file}`)
        .join('\n')}`
    );
  }

  if (errors.length > 0) {
    console.error(errors.join('\n'));
    process.exit(1);
  }

  console.log(`Nov 10 export shows #110 (${publishedHits.length} hits) and hides #111/#112 (0 hits).`);
  process.exit(0);
}

const hits = collectHits(scheduled.flatMap((post) => [post.id, post.title]));
if (hits.length > 0) {
  console.error(
    `Production export leaked scheduled blog metadata:\n${hits
      .map((hit) => `  ${hit.needle} -> ${hit.file}`)
      .join('\n')}`
  );
  process.exit(1);
}

console.log('Production export leak grep: 0 hits for scheduled slugs and titles.');
