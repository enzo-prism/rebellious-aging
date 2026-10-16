import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

const projectRoot = resolve(process.cwd());
const outDir = resolve(process.env.BLOG_EXPORT_DIR ?? join(projectRoot, 'out'));
const rollout = process.argv.includes('--rollout');

const scheduled = [
  {
    id: 'a-boundary-is-not-an-argument',
    title: 'A Boundary is NOT An Argument',
    blogNumber: 110,
    excerpt:
      'Suz writes that a boundary defines our own participation, not another person’s choices, and that surprise or discomfort does not turn it into an argument.',
    bodySentence: 'A boundary is a decision, NOT an opening statement in a debate.',
  },
  {
    id: 'are-your-boundaries-protecting-your-peace-or-protecting-your-fear',
    title: 'Are Your Boundaries Protecting Your Peace or Protecting Your Fear?',
    blogNumber: 111,
    excerpt:
      'Suz wonders whether a no is protecting peace or protecting fear, and reminds us that a boundary gate can close and also open.',
    bodySentence: 'I want my boundaries to make room for me, including the parts that still want to grow.',
  },
  {
    id: 'enough-according-to-whom',
    title: 'Enough. According to Whom?',
    blogNumber: 112,
    excerpt:
      'Suz sits with the wish “I wish you enough,” and asks who decides when we have done enough, or when we ourselves are enough.',
    bodySentence: 'The unfinished “things” are running the meeting.',
  },
] as const;

const leakNeedles = (post: (typeof scheduled)[number]) => [
  post.id,
  post.title,
  post.excerpt,
  post.bodySentence,
  `Blog #${post.blogNumber}`,
  `Blog #<!-- -->${post.blogNumber}`,
];

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
  const readExport = (path: string) => readFileSync(join(outDir, path), 'utf8');
  const blogHtml = readExport(existsSync(join(outDir, 'blog.html')) ? 'blog.html' : 'blog/index.html');
  const homeHtml = readExport('index.html');
  const sitemap = readExport('sitemap.xml');
  const search = readExport('search-index.json');
  const llms = readExport('llms.txt');
  const errors: string[] = [];

  for (const post of scheduled) {
    const articleFile = existsSync(join(outDir, 'blog', `${post.id}.html`))
      ? `blog/${post.id}.html`
      : `blog/${post.id}/index.html`;
    if (!existsSync(join(outDir, articleFile))) {
      errors.push(`Missing published route for #${post.blogNumber}: ${post.id}`);
      continue;
    }
    const article = readExport(articleFile);
    if (!article.includes(post.bodySentence) || article.includes('Blog Post Not Found')) {
      errors.push(`Missing readable article content for #${post.blogNumber}.`);
    }
    for (const [name, contents] of Object.entries({ blogHtml, homeHtml, sitemap, search, llms })) {
      if (!contents.includes(post.id)) errors.push(`${name} is missing #${post.blogNumber}.`);
    }
    if (!article.includes('2026-10-16')) {
      errors.push(`Article #${post.blogNumber} is missing its website publication date.`);
    }
  }
  const searchDocs = JSON.parse(search) as Array<{ type: string }>;
  if (searchDocs.filter((doc) => doc.type === 'blog').length !== 112) {
    errors.push('Expected all 112 articles in the exported search index.');
  }
  if (errors.length > 0) {
    console.error(errors.join('\n'));
    process.exit(1);
  }
  console.log('October 16 website release exports all 112 searchable posts and surfaces #110–112 in HTML, homepage, sitemap, search, and llms.txt.');
  process.exit(0);
}

const hits = collectHits(scheduled.flatMap(leakNeedles));
if (hits.length > 0) {
  console.error(
    `Production export leaked scheduled blog metadata:\n${hits
      .map((hit) => `  ${hit.needle} -> ${hit.file}`)
      .join('\n')}`
  );
  process.exit(1);
}

console.log('Production export leak grep: 0 hits for scheduled slugs, titles, excerpts, body sentences, and Blog #110/#111/#112.');
