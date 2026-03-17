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

export interface LinkItem {
  id: string;
  title: string;
  url: string;
  enabled: boolean;
  thumbnail?: string;
  clicks?: number;
  color?: string;
  order?: number;
}
