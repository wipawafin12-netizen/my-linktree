export interface PageRecord {
  id: string;
  collectionId: string;
  collectionName: string;
  user: string;
  displayName: string;
  bio: string;
  avatar: string;
  selectedTheme: string;
  selectedButton: string;
  selectedFont: string;
  customTextColor: string;
  customBgColor: string;
  customBgSecondary: string;
  selectedPattern: string;
  selectedPatternAnim: string;
  patternGlow: boolean;
  buttonAnimation: boolean;
  activeSocials: string[];
  socialUrls: Record<string, string>;
  showSubscribe: boolean;
  emailFormTitle: string;
  created: string;
  updated: string;
}

export interface LinkRecord {
  id: string;
  collectionId: string;
  collectionName: string;
  page: string;
  title: string;
  url: string;
  enabled: boolean;
  thumbnail: string;
  clicks: number;
  color: string;
  order: number;
  created: string;
  updated: string;
}

export interface AnalyticsRecord {
  id: string;
  page: string;
  type: 'view' | 'click';
  linkId?: string;
  linkTitle?: string;
  linkUrl?: string;
  created: string;
}

export interface SubscriberRecord {
  id: string;
  page: string;
  email: string;
  source: string;
  created: string;
}

export interface ShortUrlRecord {
  id: string;
  collectionId: string;
  collectionName: string;
  user: string;
  slug: string;
  originalUrl: string;
  title: string;
  enabled: boolean;
  expiresAt: string;
  clicks: number;
  platform: string;
  created: string;
  updated: string;
}

export interface ShortUrlClickRecord {
  id: string;
  collectionId: string;
  collectionName: string;
  shortUrl: string;
  referrer: string;
  userAgent: string;
  device: string;
  browser: string;
  created: string;
}

export interface LinkItem {
  id: string;
  title: string;
  url: string;
  enabled: boolean;
  thumbnail?: string;
  thumbnailFile?: File;
  thumbnailUploading?: boolean;
  clicks?: number;
  color?: string;
  order?: number;
  embedCode?: string;
}
