// Export all images
import * as backgrounds from './backgrounds';
import * as logos from './logos';

export const images = {
  backgrounds,
  logos,
} as const;

export type Images = typeof images;
