export interface PlantCare {
  light: string;
  water: string;
  humidity: string;
  difficulty: 'Easy' | 'Moderate' | 'Expert';
  petFriendly: boolean;
}

export interface Plant {
  id: string;
  name: string;
  scientificName: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  category: 'all' | 'air-purifying' | 'low-light' | 'pet-friendly' | 'rare' | 'bestsellers';
  description: string;
  longDescription?: string;
  care: PlantCare;
  inStock: boolean;
  badge?: 'Bestseller' | 'Sale' | 'New' | 'Rare' | 'Air Purifier';
  sizes?: { name: 'Small' | 'Medium' | 'Large'; priceMultiplier: number; height: string }[];
  potImages?: Record<string, string>;
}

export interface CartItem {
  plant: Plant;
  quantity: number;
  selectedSize: 'Small' | 'Medium' | 'Large';
  selectedPotColor: string;
  pricePerUnit: number;
}
