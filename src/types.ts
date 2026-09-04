export interface MenuItem {
  id: string;
  name: string;
  chineseName?: string;
  subTitle?: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  calories?: number;
  image?: string;
  badge?: string;
  badgeType?: 'bestseller' | 'recommended' | 'new';
  nutriGrade?: {
    grade: 'A' | 'B' | 'C' | 'D';
    sugarPct: string;
  };
  ingredientTheme?: 'jasmine' | 'peach' | 'dahongpao' | 'osmanthus' | 'hojicha' | 'lemon' | 'watermelon' | 'cake' | 'deal' | 'tea';
  description: string;
  tags?: string[];
  isBestSeller?: boolean;
  isNew?: boolean;
}

export interface PackageBundleOption {
  id: string;
  name: string;
  drinksCount: number;
  price: number;
  originalPrice: number;
  savings: number;
  popular?: boolean;
  bestValue?: boolean;
  description: string;
  validityDays: number;
  image: string;
}

export interface RewardItem {
  id: string;
  name: string;
  chineseName?: string;
  pointsCost: number;
  indicativeValue: string;
  category: 'drink' | 'voucher' | 'merch' | 'dessert' | 'event' | 'deal';
  image: string;
  badge?: string;
  badgeColor?: string;
  description: string;
  terms: string[];
}

export interface MobileContact {
  id: string;
  name: string;
  phone: string;
  avatar?: string;
  initials: string;
  isRecent?: boolean;
  tag?: string;
}

export interface GiftTransaction {
  id: string;
  senderName: string;
  senderPhone: string;
  recipientName: string;
  recipientPhone: string;
  itemType: 'bundle' | 'drink' | 'reward';
  itemTitle: string;
  itemSubtitle: string;
  itemImage: string;
  price: number;
  totalVouchers: number;
  remainingVouchers: number;
  customMessage: string;
  cardTheme: 'birthday' | 'thankyou' | 'cheers' | 'custom';
  giftCode: string;
  createdAt: string;
  opened: boolean;
  redeemedHistory: Array<{
    date: string;
    storeName: string;
    quantity: number;
    drinkName?: string;
    sweetness?: string;
    iceLevel?: string;
    orderNumber?: string;
  }>;
}
