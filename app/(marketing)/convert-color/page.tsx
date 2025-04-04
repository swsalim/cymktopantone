import Link from 'next/link';

import { ExternalLinkIcon } from 'lucide-react';

import { colorModels } from '@/config/colors';
import { converters } from '@/config/converters';

import { cn } from '@/lib/utils';

import { Container } from '@/components/container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrapper } from '@/components/wrapper';

function groupConvertersBySource() {
  const grouped = converters.reduce(
    (acc, converter) => {
      if (!acc[converter.sourceColor]) {
        acc[converter.sourceColor] = [];
      }
      acc[converter.sourceColor].push(converter);
      return acc;
    },
    {} as Record<string, typeof converters>,
  );

  return grouped;
}

export default function ConvertColorsPage() {
  const groupedConverters = groupConvertersBySource();

  return (
    <>
      <Wrapper className="md:pb-12">
        <Container as="div" className="prose dark:prose-invert">
          <h1>Color Converters</h1>
          <p>
            Explore our comprehensive collection of color conversion tools. Convert between
            different color formats including CMYK, RGB, HEX, HSL, HSV, and Pantone. Each converter
            is designed to provide accurate and reliable results for your design and development
            needs.
          </p>
        </Container>
      </Wrapper>

      {Object.entries(groupedConverters).map(([sourceColor, converters], index) => (
        <>
          <Wrapper
            key={sourceColor}
            className={cn(
              'transition-colors md:py-12',
              sourceColor.toLowerCase() === 'cmyk' && 'bg-yellow-50/70 dark:bg-yellow-500/10',
              sourceColor.toLowerCase() === 'rgb' && 'bg-red-50/70 dark:bg-red-500/10',
              sourceColor.toLowerCase() === 'hex' && 'bg-violet-50/70 dark:bg-violet-500/10',
              sourceColor.toLowerCase() === 'hsl' && 'bg-blue-50/70 dark:bg-blue-500/10',
              sourceColor.toLowerCase() === 'hsv' && 'bg-green-50/70 dark:bg-green-500/10',
              sourceColor.toLowerCase() === 'pantone' && 'bg-gray-50/70 dark:bg-gray-500/10',
            )}>
            <Container as="div" className="prose dark:prose-invert">
              <h2
                className={cn(
                  'mb-6',
                  sourceColor.toLowerCase() === 'cmyk' && 'text-yellow-700 dark:text-yellow-300',
                  sourceColor.toLowerCase() === 'rgb' && 'text-red-700 dark:text-red-300',
                  sourceColor.toLowerCase() === 'hex' && 'text-violet-700 dark:text-violet-300',
                  sourceColor.toLowerCase() === 'hsl' && 'text-blue-700 dark:text-blue-300',
                  sourceColor.toLowerCase() === 'hsv' && 'text-green-700 dark:text-green-300',
                  sourceColor.toLowerCase() === 'pantone' && 'text-gray-700 dark:text-gray-300',
                )}>
                {sourceColor} Converters
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
                {converters.map((converter) => (
                  <Link key={converter.id} href={converter.url} className="not-prose">
                    <Card
                      className={cn(
                        'h-auto transition-colors',
                        sourceColor.toLowerCase() === 'cmyk' &&
                          'border-yellow-500/50 bg-yellow-100/80 hover:bg-yellow-100 dark:border-yellow-800 dark:bg-yellow-500/10 dark:hover:bg-yellow-500/30',
                        sourceColor.toLowerCase() === 'rgb' &&
                          'border-red-500/50 bg-red-100/80 hover:bg-red-100 dark:border-red-800 dark:bg-red-500/10 dark:hover:bg-red-500/30',
                        sourceColor.toLowerCase() === 'hex' &&
                          'border-violet-500/50 bg-violet-100/80 hover:bg-violet-100 dark:border-violet-800 dark:bg-violet-500/10 dark:hover:bg-violet-500/30',
                        sourceColor.toLowerCase() === 'hsl' &&
                          'border-blue-500/50 bg-blue-100/80 hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-500/10 dark:hover:bg-blue-500/30',
                        sourceColor.toLowerCase() === 'hsv' &&
                          'border-green-500/50 bg-green-100/80 hover:bg-green-100 dark:border-green-800 dark:bg-green-500/10 dark:hover:bg-green-500/30',
                        sourceColor.toLowerCase() === 'pantone' &&
                          'border-gray-500/50 bg-gray-100/80 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-500/10 dark:hover:bg-gray-500/30',
                      )}>
                      <CardContent className="group relative">
                        <div className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100">
                          <ExternalLinkIcon
                            className={cn(
                              'h-4 w-4',
                              sourceColor.toLowerCase() === 'cmyk' &&
                                'text-yellow-700 dark:text-yellow-300',
                              sourceColor.toLowerCase() === 'rgb' &&
                                'text-red-700 dark:text-red-300',
                              sourceColor.toLowerCase() === 'hex' &&
                                'text-violet-700 dark:text-violet-300',
                              sourceColor.toLowerCase() === 'hsl' &&
                                'text-blue-700 dark:text-blue-300',
                              sourceColor.toLowerCase() === 'hsv' &&
                                'text-green-700 dark:text-green-300',
                              sourceColor.toLowerCase() === 'pantone' &&
                                'text-gray-700 dark:text-gray-300',
                            )}
                          />
                        </div>
                        <CardDescription
                          className={cn(
                            'text-base font-medium',
                            sourceColor.toLowerCase() === 'cmyk' &&
                              'text-yellow-700 dark:text-yellow-300',
                            sourceColor.toLowerCase() === 'rgb' && 'text-red-700 dark:text-red-300',
                            sourceColor.toLowerCase() === 'hex' &&
                              'text-violet-700 dark:text-violet-300',
                            sourceColor.toLowerCase() === 'hsl' &&
                              'text-blue-700 dark:text-blue-300',
                            sourceColor.toLowerCase() === 'hsv' &&
                              'text-green-700 dark:text-green-300',
                            sourceColor.toLowerCase() === 'pantone' &&
                              'text-gray-700 dark:text-gray-300',
                          )}>
                          {converter.title}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </Container>
          </Wrapper>
          {index === 1 && (
            <iframe
              width="100%"
              height="250"
              frameBorder="0"
              className="ta-widget"
              data-min-height="250"
              id="67ee0a352dfc280f879388c3-6603"
              src="https://app.tinyadz.com/widgets/67ee0a352dfc280f879388c3?seed=6603&previewMode=false&showInPopup=false&theme=light"></iframe>
          )}
        </>
      ))}
    </>
  );
}
