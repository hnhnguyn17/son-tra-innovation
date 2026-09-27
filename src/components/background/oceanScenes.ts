import type { OceanArtworkName } from './OceanArtwork';

export interface OceanScene {
  artwork: OceanArtworkName;
  artworkStrength: number;
  sky: string;
  sea: string;
  light: string;
  boats: number;
  basket: boolean;
  whale: boolean;
  particles: number;
  waveOpacity: number;
}

export const OCEAN_SCENES: Record<string, OceanScene> = {
  'vung-thung': { artwork: 'coast', artworkStrength: 1, sky: '#fff4e6', sea: '#bedbd3', light: '#ffddb1', boats: 1, basket: false, whale: false, particles: 0.7, waveOpacity: 0.3 },
  'tri-thuc-so': { artwork: 'coast', artworkStrength: 0.14, sky: '#f0faf8', sea: '#d4eeeb', light: '#d0fff0', boats: 0, basket: false, whale: false, particles: 0.25, waveOpacity: 0.16 },
  'chuyen-nguoi-bien': { artwork: 'coast', artworkStrength: 0.28, sky: '#fff5e9', sea: '#dbe5d4', light: '#ffe0b9', boats: 0, basket: true, whale: false, particles: 0.4, waveOpacity: 0.22 },
  'au-thuyen': { artwork: 'harbor', artworkStrength: 1, sky: '#edf6fb', sea: '#add8e5', light: '#c3eaff', boats: 2, basket: false, whale: false, particles: 0.6, waveOpacity: 0.36 },
  'di-san': { artwork: 'whale', artworkStrength: 1, sky: '#f1f4ff', sea: '#c9deee', light: '#dcdcff', boats: 0, basket: false, whale: true, particles: 0.8, waveOpacity: 0.24 },
  'khong-gian-trai-nghiem': { artwork: 'coast', artworkStrength: 0.35, sky: '#fff0e8', sea: '#cfdfcd', light: '#ffc7a5', boats: 0, basket: false, whale: false, particles: 0.5, waveOpacity: 0.28 },
  'mang-theo-cau-chuyen': { artwork: 'coast', artworkStrength: 0.14, sky: '#f8fbfc', sea: '#e0eff1', light: '#e4f7fa', boats: 0, basket: false, whale: false, particles: 0.15, waveOpacity: 0.1 },
};
