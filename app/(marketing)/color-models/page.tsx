import Link from 'next/link';

import { ExternalLinkIcon } from 'lucide-react';

import { colorModels } from '@/config/colors';
import { converters } from '@/config/converters';

import { cn } from '@/lib/utils';

import { Container } from '@/components/container';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Wrapper } from '@/components/wrapper';

export default function ColorModelsPage() {
  return (
    <Wrapper>
      <Container as="section" className="prose pb-12 dark:prose-invert md:pb-24">
        <h1 className="mb-6">Color Models</h1>
        <p className="mb-8">
          Learn about different color models and how they represent colors in various contexts. Each
          model has its unique characteristics and applications in design and development.
        </p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {colorModels.map((model) => (
            <Link key={model.title} href={model.href} className="not-prose">
              <Card
                className={cn(
                  'h-augo transition-colors hover:bg-gray-100/80',
                  model.title.toLowerCase() === 'cmyk' &&
                    'border-yellow-200 bg-yellow-50/80 hover:bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-500/10 dark:hover:bg-yellow-500/30',
                  model.title.toLowerCase() === 'rgb' &&
                    'border-red-200 bg-red-50/80 hover:bg-red-50 dark:border-red-800 dark:bg-red-500/10 dark:hover:bg-red-500/30',
                  model.title.toLowerCase() === 'hex' &&
                    'border-violet-200 bg-violet-50/80 hover:bg-violet-50 dark:border-violet-800 dark:bg-violet-500/10 dark:hover:bg-violet-500/30',
                  model.title.toLowerCase() === 'hsl' &&
                    'border-blue-200 bg-blue-50/80 hover:bg-blue-50 dark:border-blue-800 dark:bg-blue-500/10 dark:hover:bg-blue-500/30',
                )}>
                <CardContent
                  className={cn(
                    'group relative text-base font-medium',
                    model.title.toLowerCase() === 'cmyk' && 'text-yellow-700 dark:text-yellow-300',
                    model.title.toLowerCase() === 'rgb' && 'text-red-700 dark:text-red-300',
                    model.title.toLowerCase() === 'hex' && 'text-violet-700 dark:text-violet-300',
                    model.title.toLowerCase() === 'hsl' && 'text-blue-700 dark:text-blue-300',
                  )}>
                  <div className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <ExternalLinkIcon className="h-4 w-4" />
                  </div>
                  <CardTitle className="mb-2 text-lg">{model.title}</CardTitle>
                  <CardDescription
                    className={cn(
                      model.title.toLowerCase() === 'cmyk' &&
                        'text-yellow-700 dark:text-yellow-300',
                      model.title.toLowerCase() === 'rgb' && 'text-red-700 dark:text-red-300',
                      model.title.toLowerCase() === 'hex' && 'text-violet-700 dark:text-violet-300',
                      model.title.toLowerCase() === 'hsl' && 'text-blue-700 dark:text-blue-300',
                    )}>
                    {model.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
      <Container>
        <iframe
          width="100%"
          height="250"
          frameBorder="0"
          className="ta-widget"
          data-min-height="250"
          id="67ee0a352dfc280f879388c3-6603"
          src="https://app.tinyadz.com/widgets/67ee0a352dfc280f879388c3?seed=6603&previewMode=false&showInPopup=false&theme=light"></iframe>
      </Container>
    </Wrapper>
  );
}
