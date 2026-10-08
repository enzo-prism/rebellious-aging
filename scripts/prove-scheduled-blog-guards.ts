import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

type Mutation = {
  name: string;
  file: string;
  apply: (source: string) => string;
  testName: string;
};

const projectRoot = resolve(process.cwd());
const results: Array<{ name: string; failedAsExpected: boolean; output: string }> = [];

const mutations: Mutation[] = [
  {
    name: 'unfiltered generateStaticParams',
    file: 'app/blog/[postId]/page.tsx',
    apply: (source) =>
      source
        .replace(
          "import {\n  getBlogPublishedDate,\n  getBlogPostSeoDescription,\n  getBlogPostSeoTitle,\n  getBlogPostById,\n  getVisibleBlogPosts,\n  isVisibleBlogPost,\n} from '@/data/blogPosts';",
          "import {\n  blogPosts,\n  getBlogPublishedDate,\n  getBlogPostSeoDescription,\n  getBlogPostSeoTitle,\n  getBlogPostById,\n  getVisibleBlogPosts,\n  isVisibleBlogPost,\n} from '@/data/blogPosts';"
        )
        .replace(
          'return getVisibleBlogPosts().map((post) => ({',
          'return blogPosts.map((post) => ({'
        ),
    testName: 'keeps generateStaticParams on the visible-post helper',
  },
  {
    name: 'removed notFound()',
    file: 'app/blog/[postId]/page.tsx',
    apply: (source) => source.replaceAll('notFound();', 'void 0;'),
    testName: 'keeps notFound calls on the post route',
  },
  {
    name: 'unfiltered sitemap/search-index/llms.txt',
    file: 'app/sitemap.ts',
    apply: (source) =>
      source
        .replace(
          "import { getPublicBlogPosts, getBlogPublishedDate } from '@/data/blogPosts';",
          "import { blogPosts, getBlogPublishedDate } from '@/data/blogPosts';"
        )
        .replace('const blogEntries = getPublicBlogPosts().map((post) => ({', 'const blogEntries = blogPosts.map((post) => ({'),
    testName: 'filters sitemap, search-index, and llms.txt',
  },
  {
    name: 'VERCEL_ENV-only fail-open read',
    file: 'src/lib/blogSchedule.ts',
    apply: (source) =>
      source.replace(
        /export const shouldIncludeUnpublishedBlogPosts = \([\s\S]*?return readEnvValue\(env\.NODE_ENV\) === 'development';\n\};/,
        `export const shouldIncludeUnpublishedBlogPosts = (
  env: NodeJS.ProcessEnv = process.env
) => {
  const vercelEnv = env.VERCEL_ENV;
  return vercelEnv !== 'production';
};`
      ),
    testName: 'does not treat a VERCEL_ENV-only production read as fail-open',
  },
  {
    name: 'removed BlogPost guard',
    file: 'src/views/BlogPost.tsx',
    apply: (source) =>
      source.replace(
        'if (!currentPost || !postContent || !isVisibleBlogPost(currentPost)) {',
        'if (!currentPost || !postContent) {'
      ),
    testName: 'keeps the BlogPost visibility guard',
  },
  {
    name: 'relative blogPosts import in Blog.tsx',
    file: 'src/views/Blog.tsx',
    apply: (source) =>
      source.replace(
        "import SubstackAnnouncement from '@/components/common/SubstackAnnouncement';",
        "import SubstackAnnouncement from '@/components/common/SubstackAnnouncement';\nimport { getVisibleBlogPosts } from '../data/blogPosts';"
      ),
    testName: 'keeps client listing views free of the catalog and schedule modules',
  },
  {
    name: 'relative blogSchedule import in Home.tsx',
    file: 'src/views/Home.tsx',
    apply: (source) =>
      source.replace(
        "import { hatImageSrcSet, hatPairImage } from '@/data/hats';",
        "import { hatImageSrcSet, hatPairImage } from '@/data/hats';\nimport { isBlogPostVisible } from '../lib/blogSchedule';"
      ),
    testName: 'keeps client listing views free of the catalog and schedule modules',
  },
];

const runTest = (testName: string) => {
  try {
    execFileSync(
      'npx',
      ['vitest', 'run', 'tests/unit/scheduled-blog-guards.test.tsx', '-t', testName],
      { cwd: projectRoot, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }
    );
    return { ok: true, output: 'unexpected pass' };
  } catch (error) {
    const output = error instanceof Error && 'stderr' in error
      ? `${(error as { stdout?: string }).stdout ?? ''}\n${(error as { stderr?: string }).stderr ?? ''}`
      : String(error);
    return { ok: false, output };
  }
};

for (const mutation of mutations) {
  const filePath = resolve(projectRoot, mutation.file);
  const original = readFileSync(filePath, 'utf8');
  const mutated = mutation.apply(original);
  if (mutated === original) {
    results.push({
      name: mutation.name,
      failedAsExpected: false,
      output: 'Mutation did not change the file; pattern may be stale.',
    });
    continue;
  }
  writeFileSync(filePath, mutated);
  try {
    const result = runTest(mutation.testName);
    results.push({
      name: mutation.name,
      failedAsExpected: !result.ok,
      output: result.output.slice(0, 2000),
    });
  } finally {
    writeFileSync(filePath, original);
  }
}

const proveExcerptOnlyPlantFails = () => {
  const outDir = resolve(projectRoot, 'out');
  const plantPath = resolve(outDir, '.excerpt-only-plant.html');
  const excerpt =
    'Suz writes that a boundary defines our own participation, not another person’s choices, and that surprise or discomfort does not turn it into an argument.';
  mkdirSync(outDir, { recursive: true });
  writeFileSync(plantPath, `<p>${excerpt}</p>`);
  try {
    execFileSync('npx', ['tsx', 'scripts/assert-scheduled-blog-export.ts'], {
      cwd: projectRoot,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    return { failedAsExpected: false, output: 'excerpt-only plant unexpectedly passed the leak grep' };
  } catch (error) {
    const output =
      error instanceof Error && 'stderr' in error
        ? `${(error as { stdout?: string }).stdout ?? ''}\n${(error as { stderr?: string }).stderr ?? ''}`
        : String(error);
    return {
      failedAsExpected: output.includes(excerpt),
      output: output.slice(0, 2000),
    };
  } finally {
    unlinkSync(plantPath);
  }
};

results.push({
  name: 'excerpt-only plant in the production export',
  ...proveExcerptOnlyPlantFails(),
});

const failed = results.filter((result) => !result.failedAsExpected);
for (const result of results) {
  const label = result.failedAsExpected ? 'FAILED as expected' : 'DID NOT FAIL';
  console.log(`${label}: ${result.name}`);
}
if (failed.length > 0) {
  for (const result of failed) {
    console.error(`\n${result.name}:\n${result.output}`);
  }
  process.exit(1);
}
console.log('\nAll scheduled-blog guard mutations failed the targeted tests.');
