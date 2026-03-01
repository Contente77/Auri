/**
 * App Settings data model
 */

export interface AppSettings {
  // Appearance
  theme: 'light' | 'dark' | 'highContrast' | 'sepia';
  fontFamily: 'openDyslexic' | 'comicSans' | 'arial' | 'verdana';
  fontSize: number; // 12-32
  lineSpacing: number; // 1.0-2.5
  letterSpacing: 'normal' | 'wide' | 'extraWide';
  
  // TTS
  ttsVoice: string;
  ttsSpeed: number; // 0.5-2.0
  ttsHighlightMode: 'word' | 'sentence' | 'both';
  ttsAutoScroll: boolean;
  
  // AI
  aiProvider: 'openai' | 'anthropic' | 'google';
  defaultExplanationLevel: 'simple' | 'verySimple' | 'examReady';
  
  // Privacy
  saveHistory: boolean;
  analyticsEnabled: boolean;
  
  // Accessibility
  reduceMotion: boolean;
  hapticFeedback: boolean;
  
  // API Keys status (actual keys stored in SecureStore)
  hasOCRKey: boolean;
  hasTTSKey: boolean;
  hasAIKey: boolean;
  
  // Onboarding
  onboardingCompleted: boolean;
}

export const defaultSettings: AppSettings = {
  theme: 'light',
  fontFamily: 'openDyslexic',
  fontSize: 18,
  lineSpacing: 1.5,
  letterSpacing: 'normal',
  ttsVoice: 'default',
  ttsSpeed: 1.0,
  ttsHighlightMode: 'sentence',
  ttsAutoScroll: true,
  aiProvider: 'openai',
  defaultExplanationLevel: 'simple',
  saveHistory: true,
  analyticsEnabled: false,
  reduceMotion: false,
  hapticFeedback: true,
  hasOCRKey: false,
  hasTTSKey: false,
  hasAIKey: false,
  onboardingCompleted: false,
};
