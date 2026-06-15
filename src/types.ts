export interface OlfactoryNote {
  id: string;
  name: string;
  ingredients: string;
  description: string;
  intensity: string;
  hue: string;
}

export interface PerfumeBottleSize {
  id: string;
  size: string;
  price: number;
  description: string;
  badge?: string;
}

export type SillageLevel = 'Sutil' | 'Magnética' | 'Imperial';

export interface CheckoutFormState {
  email: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  cardName: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvv: string;
}
