import { siteConfig } from '@/config/site';

import { absoluteUrl, cn } from '@/lib/utils';

import { ImageKit } from '@/components/image-kit';
import WebsiteJsonLd from '@/components/structured-data/WebsiteJsonLd';
import { buttonVariants } from '@/components/ui/button';

const projects = [
  {
    name: 'PFP Resizer',
    url: 'https://pfpresizer.com',
  },
  {
    name: 'Flip Image',
    url: 'https://www.flipanimage.xyz',
  },
];

export default function Home() {
  return (
    <section className="relative isolate grid min-h-screen place-items-center">
      <WebsiteJsonLd company={siteConfig.siteName} url={absoluteUrl()} />
      <ImageKit
        src="coming-soon-2.jpg"
        alt="Coming Soon"
        width={1000}
        height={1000}
        priority={false}
        className={cn('absolute inset-0 -z-10 size-full object-cover object-top')}
      />
      <div className="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
        <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-gray-800 sm:text-7xl">
          Coming Soon
        </h1>
        <p className="mt-6 text-pretty text-lg font-medium text-gray-800/70 sm:text-xl/8">
          Check out our other projects in the meantime
        </p>
        <ul className="mt-8 flex items-center justify-center gap-4">
          <li>
            <span className="text-4xl">👉🏻</span>
          </li>
          {projects.map((project) => (
            <li key={project.name}>
              <a
                href={project.url}
                className={cn(buttonVariants({ variant: 'default', size: 'lg' }))}
                target="_blank"
                rel="noopener noreferrer">
                {' '}
                {project.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
