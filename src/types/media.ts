// Metadata retained for unmounted design-study components, not public media controls.
export interface MediaSlotInfo {
  title: string;
  type: 'video' | 'image' | '3d' | 'audio';
  aspectRatio: string;
  recommendedSize: string;
  targetFile: string;
  description: string;
}
