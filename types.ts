
export interface User {
  uid: string;
  email: string;
  businessName: string;
  businessSlug: string;
}

export enum HelpOptionType {
  CALL = 'CALL',
  SIZE_EXCHANGE = 'SIZE_EXCHANGE',
  PRODUCT_EXCHANGE = 'PRODUCT_EXCHANGE',
}

export interface HelpOption {
  id: string;
  type: HelpOptionType;
  label: string;
  enabled: boolean;
}

export interface BusinessConfig {
  buttonColor: string;
  panelColor: string;
  helpOptions: HelpOption[];
}

export interface FootwearSize {
    id: string;
    region: string;
    size: string; // e.g., US, EU, UK
}

export interface TopSize {
    id: string;
    size: string; // e.g., S, M, L
    chest: string;
    waist: string;
}

export interface BottomSize {
    id: string;
    size: string; // e.g., 28, 30, 32
    waist: string;
    inseam: string;
}

export type SizeEntry = FootwearSize | TopSize | BottomSize;

export interface SizeChart {
    footwear: FootwearSize[];
    tops: TopSize[];
    bottoms: BottomSize[];
}

export type SizeCategory = keyof SizeChart;


export interface AnalyticsData {
  sizeChanges: { name: string; value: number }[];
  productChanges: { name: string; value: number }[];
  mostSearchedSizes: { name: string; value: number }[];
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => void;
}

export interface BusinessDataContextType {
  config: BusinessConfig;
  sizes: SizeChart;
  analytics: AnalyticsData;
  loading: boolean;
  getPublicConfig: (slug: string) => Promise<BusinessConfig | null>;
  updateConfig: (newConfig: Partial<BusinessConfig>) => Promise<void>;
  addSize: (category: SizeCategory, size: Omit<FootwearSize, 'id'> | Omit<TopSize, 'id'> | Omit<BottomSize, 'id'>) => Promise<void>;
  removeSize: (category: SizeCategory, id: string) => Promise<void>;
}
