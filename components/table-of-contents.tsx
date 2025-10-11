'use client';

import { TableOfContents as TocData } from '@/lib/toc';

import { LazyAdsSquare } from '@/components/ads/lazy-ads-square';

interface TocItemProps {
  item: {
    title: string;
    url: string;
    items?: Array<{
      title: string;
      url: string;
      items?: Array<{
        title: string;
        url: string;
      }>;
    }>;
  };
}

function TocItem({ item }: TocItemProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = item.url.substring(1); // Remove the #
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      // Get navbar height (assuming it's around 64px, adjust as needed)
      const navbarHeight = 80; // Adjust this value based on your navbar height
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div>
      <a
        href={item.url}
        onClick={handleClick}
        className="block py-1 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
        {item.title}
      </a>
      {item.items && item.items.length > 0 && (
        <div className="ml-4 mt-1 space-y-1">
          {item.items.map((subItem, index) => (
            <TocItem key={index} item={subItem} />
          ))}
        </div>
      )}
    </div>
  );
}

interface TableOfContentsProps {
  toc: TocData;
}

export default function TableOfContents({ toc }: TableOfContentsProps) {
  if (!toc.items || toc.items.length === 0) {
    return null;
  }

  return (
    <aside className="mt-12 hidden lg:col-span-4 lg:mt-0 lg:block">
      <div className="sticky top-20">
        <nav className="space-y-2">
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
            Table of Contents
          </h2>
          {toc.items.map((item, index) => (
            <TocItem key={index} item={item} />
          ))}
        </nav>

        <div className="mx-auto">
          <LazyAdsSquare />
        </div>
      </div>
    </aside>
  );
}
