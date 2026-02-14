
export enum Phase {
  GATEWAY = 0,
  HEART_OVERFLOW = 1,
  SENSORY_PATH = 2,
  PHYSICS_OF_LOVE = 3,
  SANCTUARY = 4,
  ETERNAL_LETTER = 5
}

export interface Memory {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
}

export interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

export interface AssetStatus {
  name: string;
  loaded: boolean;
  error: boolean;
}

export type AssetStore = Record<string, string>; // Maps asset ID to Base64 data string
