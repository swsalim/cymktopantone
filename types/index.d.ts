import React from 'react';

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type MainNavItem = NavItem;

export type SidebarNavItem = {
  title: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
} & (
  | {
      href: string;
      items?: never;
    }
  | {
      href?: string;
      items: NavLink[];
    }
);

export type SiteConfig = {
  title: string;
  description: string;
  siteName: string;
  url: URL;
  openGraph: {
    image: string;
    imageAlt: string;
    width: string;
    height: string;
  };
  creator: string;
};

export type MarketingConfig = {
  mainNav: MainNavItem[];
};

export type SocialMediaPlatform = {
  name: string;
  title: string;
  description: string;
  slug: string;
  heroHeading: string;
  heroDescription: string;
  heroFeature?: string;
  imageWidth: number;
  imageHeight: number;
  icon?: () => Promise<React.ReactElement>;
};
