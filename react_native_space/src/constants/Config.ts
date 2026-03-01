/**
 * App configuration constants
 */

import Constants from 'expo-constants';

export const Config = {
  // App info
  appName: 'Auri',
  appVersion: Constants.expoConfig?.version ?? '1.0.0',
  
  // API endpoints
  apiUrl: process.env.EXPO_PUBLIC_API_URL ?? 'https://929af6675.preview.abacusai.app/',
  
  // OCR settings
  ocr: {
    maxImageSize: 4 * 1024 * 1024, // 4MB
    compressionQuality: 0.8,
    maxPagesPerPack: 50,
  },
  
  // TTS settings
  tts: {
    minSpeed: 0.5,
    maxSpeed: 2.0,
    defaultSpeed: 1.0,
  },
  
  // Reader settings
  reader: {
    minFontSize: 12,
    maxFontSize: 32,
    defaultFontSize: 18,
    minLineSpacing: 1.0,
    maxLineSpacing: 2.5,
    defaultLineSpacing: 1.5,
  },
  
  // Storage
  storage: {
    studyPacksKey: 'study_packs',
    settingsKey: 'app_settings',
  },
  
  // Accessibility
  accessibility: {
    minTouchTarget: 44, // iOS HIG minimum
    minSpacing: 8,
  },
};
