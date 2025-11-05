export type CardSize = '1:1' | '9:16' | '16:9' | '3:2';

export type CardTheme = 'indigo' | 'teal' | 'rose' | 'slate';

export interface CardData {
  name: string;
  imageUrl: string | null;
  experience: string;
  summary: string;
}