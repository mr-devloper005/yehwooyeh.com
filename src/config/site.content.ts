import type { TaskKey } from '@/lib/site-config'

export const siteContent = {
  navbar: {
    tagline: 'Property listings & management',
  },
  footer: {
    tagline: 'Property listings & management',
  },
  hero: {
    badge: 'Property search',
    title: ['Find the right', 'property with confidence.'],
    description: 'Browse verified listings, schedule tours, and get support for renting, buying, or management.',
    primaryCta: {
      label: 'Browse listings',
      href: '/listings',
    },
    secondaryCta: {
      label: 'Contact us',
      href: '/contact',
    },
    searchPlaceholder: 'Search listings by area, property type, or keyword',
    focusLabel: 'Focus',
    featureCardBadge: 'latest cover rotation',
    featureCardTitle: 'Latest posts shape the visual identity of the homepage.',
    featureCardDescription:
      'Recent images and stories stay at the center of the experience without changing any core platform behavior.',
  },
  home: {
    metadata: {
      title: 'Property listings, rentals, and management',
      description: 'Browse properties for sale and rent, schedule tours, and get management support in one place.',
      openGraphTitle: 'Property listings, rentals, and management',
      openGraphDescription: 'Find homes and commercial spaces, with clear details and a team ready to help.',
      keywords: [
        'property listings',
        'rentals',
        'homes for sale',
        'property management',
        'real estate',
      ],
    },
    introBadge: 'About the platform',
    introTitle: 'A calmer way to find and manage property.',
    introParagraphs: [
      'Listings are presented with the details you need to compare options, shortlist spaces, and move forward with confidence.',
      'Whether you are renting, buying, or looking for full-service management, the experience stays focused on property—without unrelated feeds or clutter.',
    ],
    sideBadge: 'At a glance',
    sidePoints: [
      'Search-first flow with property cards, addresses, and key stats.',
      'Sections for featured listings, tours, and inquiries.',
      'Consistent blue-and-white visual system for trust and clarity.',
    ],
    primaryLink: {
      label: 'Browse listings',
      href: '/listings',
    },
    secondaryLink: {
      label: 'Contact',
      href: '/contact',
    },
  },
  cta: {
    badge: 'Start exploring',
    title: 'Explore property listings and get the support you need.',
    description: 'Find your next home or commercial space, or talk to us about management and showings.',
    primaryCta: {
      label: 'Browse listings',
      href: '/listings',
    },
    secondaryCta: {
      label: 'Contact us',
      href: '/contact',
    },
  },
  taskSectionHeading: 'Latest {label}',
  taskSectionDescriptionSuffix: 'Browse the newest posts in this section.',
} as const

export const taskPageMetadata: Record<Exclude<TaskKey, 'comment' | 'org' | 'social'>, { title: string; description: string }> = {
  article: {
    title: 'Articles and stories',
    description: 'A Listing site for Yehwooyeh, built for clean discovery and structured publishing.',
  },
  listing: {
    title: 'Listings and discoverable pages',
    description: 'A Listing site for Yehwooyeh, built for clean discovery and structured publishing.',
  },
  classified: {
    title: 'Classifieds and announcements',
    description: 'A Listing site for Yehwooyeh, built for clean discovery and structured publishing.',
  },
  image: {
    title: 'Images and visual posts',
    description: 'A Listing site for Yehwooyeh, built for clean discovery and structured publishing.',
  },
  profile: {
    title: 'Profiles and public pages',
    description: 'A Listing site for Yehwooyeh, built for clean discovery and structured publishing.',
  },
  sbm: {
    title: 'Curated links and saved resources',
    description: 'A Listing site for Yehwooyeh, built for clean discovery and structured publishing.',
  },
  pdf: {
    title: 'PDFs and downloadable resources',
    description: 'A Listing site for Yehwooyeh, built for clean discovery and structured publishing.',
  },
}

export const taskIntroCopy: Record<
  TaskKey,
  { title: string; paragraphs: string[]; links: { label: string; href: string }[] }
> = {
  listing: {
    title: 'Listings, services, and structured pages',
    paragraphs: [
      'Explore listings, services, brands, and discoverable pages across categories. Each entry is organized to make browsing clearer and help visitors quickly understand what a post offers.',
      'Listings are the core of the platform—use filters and search to compare options, shortlist properties, and plan next steps.',
      'Browse by category to compare posts in context and find the right fit for your budget and timeline.',
    ],
    links: [
      { label: 'All listings', href: '/listings' },
      { label: 'Search', href: '/search' },
      { label: 'Help', href: '/help' },
    ],
  },
  article: {
    title: 'Articles, stories, and long-form reading',
    paragraphs: [
      'This section is built for stories, explainers, guides, and long-form reading across topics and interests.',
      'Articles connect with listings, images, resources, and other content types so deeper reading can lead naturally into related discovery.',
      'Use this section to browse thoughtful posts, revisit useful writing, and move into supporting content when you want more context.',
    ],
    links: [
      { label: 'Explore listings', href: '/listings' },
      { label: 'Open images', href: '/images' },
      { label: 'Browse resources', href: '/pdf' },
    ],
  },
  classified: {
    title: 'Classifieds, offers, and timely updates',
    paragraphs: [
      'Classified posts help surface offers, notices, deals, and time-sensitive opportunities in a faster-scanning format.',
      'They work well alongside articles, listings, and profiles, making it easier to connect short-term posts with more structured content.',
      'Browse by category to find announcements quickly, then continue into related sections when you need more detail.',
    ],
    links: [
      { label: 'Business listings', href: '/listings' },
      { label: 'Read articles', href: '/articles' },
      { label: 'View profiles', href: '/profile' },
    ],
  },
  image: {
    title: 'Image-led posts and visual stories',
    paragraphs: [
      'Images take the lead in this section through galleries, visual posts, and story-led content where imagery carries the experience.',
      'These posts connect with articles, listings, and other sections so visuals can act as entry points into deeper content.',
      'Browse the latest visual updates, then continue into related stories or supporting pages for more context.',
    ],
    links: [
      { label: 'Read articles', href: '/articles' },
      { label: 'Explore listings', href: '/listings' },
      { label: 'Open classifieds', href: '/classifieds' },
    ],
  },
  profile: {
    title: 'Profiles, identities, and public pages',
    paragraphs: [
      'Profiles capture the identity behind a business, creator, brand, or project and help visitors understand who is behind the content they are exploring.',
      'These pages work as trust anchors across the site and connect naturally with stories, listings, documents, and other post types.',
      'Browse profiles to understand people and brands more clearly, then continue into related content from the same source.',
    ],
    links: [
      { label: 'Open listings', href: '/listings' },
      { label: 'Read articles', href: '/articles' },
      { label: 'Browse images', href: '/images' },
    ],
  },
  sbm: {
    title: 'Curated links and bookmarked resources',
    paragraphs: [
      'This section collects useful links, references, tools, and saved resources in a text-first browsing format.',
      'Bookmarks stay connected to the rest of the platform, making it easier to move from a saved link into related stories, listings, or resources.',
      'Use this section to organize helpful sources and discover connected content without leaving the broader site experience.',
    ],
    links: [
      { label: 'Browse articles', href: '/articles' },
      { label: 'Explore listings', href: '/listings' },
      { label: 'Open PDFs', href: '/pdf' },
    ],
  },
  pdf: {
    title: 'PDFs, documents, and downloadable files',
    paragraphs: [
      'The PDF library hosts reports, guides, downloadable files, and longer-form document resources that support reading and discovery.',
      'These resources work alongside stories, listings, and profiles, helping document-style content stay connected to the rest of the platform.',
      'Browse by category to find relevant files quickly, then continue into related sections when you want more context.',
    ],
    links: [
      { label: 'Read articles', href: '/articles' },
      { label: 'See listings', href: '/listings' },
      { label: 'Explore profiles', href: '/profile' },
    ],
  },
  social: {
    title: 'Short updates and community signals',
    paragraphs: [
      'Short updates add quick signals that keep activity flowing across the platform.',
      'They work well with stories, listings, and resources by helping visitors move from brief updates into deeper content.',
      'Use these posts as lightweight entry points into the broader site experience.',
    ],
    links: [
      { label: 'Open listings', href: '/listings' },
      { label: 'Read articles', href: '/articles' },
      { label: 'View PDFs', href: '/pdf' },
    ],
  },
  comment: {
    title: 'Comments and contextual responses',
    paragraphs: [
      'Comments surface responses connected directly to articles and help keep discussion close to the writing it belongs to.',
      'This layer adds perspective and reaction without needing a separate standalone content format.',
      'Use comments as supporting context beneath stories, then continue exploring related content from the same topic area.',
    ],
    links: [
      { label: 'Explore articles', href: '/articles' },
      { label: 'View listings', href: '/listings' },
      { label: 'See classifieds', href: '/classifieds' },
    ],
  },
  org: {
    title: 'Organizations, teams, and structured entities',
    paragraphs: [
      'Organization pages provide structured identity surfaces for teams, brands, communities, and agencies.',
      'Used with listings, stories, profiles, and resources, they help create stronger structure across the platform.',
      'Connect organization pages with related content to build a clearer and more unified site presence.',
    ],
    links: [
      { label: 'Business listings', href: '/listings' },
      { label: 'Read articles', href: '/articles' },
      { label: 'PDF library', href: '/pdf' },
    ],
  },
}
