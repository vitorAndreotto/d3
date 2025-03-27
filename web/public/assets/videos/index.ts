// Export all videos
import * as backgrounds from './backgrounds';

export const videos = {
  backgrounds,
} as const;

export type Videos = typeof videos;
