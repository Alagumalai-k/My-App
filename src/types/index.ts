/**
 * Type definitions for the Go With Travel application
 */

export interface Attraction {
  id: string;
  name: string;
  description: string;
  entryFee?: string;
  bestTime?: string;
  image: string;
}

export interface Resort {
  id: string;
  name: string;
  rating: number;
  description: string;
  highlights: string[];
  bestTime: string;
  facilities: string[];
  priceRange: string;
  image: string;
}

export interface Location {
  id: string;
  name: string;
  state: string;
  type: 'location' | 'resort';
  altitude: number;
  rating: number;
  description: string;
  highlights: string[];
  bestTime: string;
  image: string;
  attractions?: Attraction[];
  resorts?: Resort[];
  facilities?: string[];
  priceRange?: string;
}

export type StateType = 'tamil-nadu' | 'kerala' | 'karnataka';
export type FilterType = 'location' | 'resort';
