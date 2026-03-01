/**
 * Storage service tests
 */

import { StorageService } from '../services/storageService';
import { defaultSettings } from '../models/Settings';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

// Mock FileSystem
jest.mock('expo-file-system', () => ({
  documentDirectory: '/mock/documents/',
  getInfoAsync: jest.fn(),
  makeDirectoryAsync: jest.fn(),
  readAsStringAsync: jest.fn(),
  writeAsStringAsync: jest.fn(),
  deleteAsync: jest.fn(),
  copyAsync: jest.fn(),
}));

describe('StorageService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Settings', () => {
    it('should get default settings when no settings exist', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
      
      const settings = await StorageService.getSettings();
      
      expect(settings).toEqual(defaultSettings);
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('app_settings');
    });

    it('should save settings successfully', async () => {
      const newSettings = {
        ...defaultSettings,
        theme: 'dark' as const,
        fontSize: 20,
      };

      await StorageService.saveSettings(newSettings);

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        'app_settings',
        JSON.stringify(newSettings)
      );
    });

    it('should update specific settings', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
        JSON.stringify(defaultSettings)
      );

      const updates = { theme: 'dark' as const, fontSize: 22 };
      const result = await StorageService.updateSettings(updates);

      expect(result.theme).toBe('dark');
      expect(result.fontSize).toBe(22);
      expect(AsyncStorage.setItem).toHaveBeenCalled();
    });
  });

  describe('Study Packs', () => {
    it('should return empty array when no study packs exist', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
      
      const packs = await StorageService.getAllStudyPacks();
      
      expect(packs).toEqual([]);
    });

    it('should count words correctly', () => {
      const pages = [
        {
          id: '1',
          studyPackId: 'pack1',
          pageNumber: 1,
          imageUri: '/test.jpg',
          text: 'Hello world test',
          textBlocks: [],
          ocrMetadata: {
            confidence: 0.95,
            language: 'en',
            processedAt: new Date(),
          },
        },
      ];

      // Access private method through reflection for testing
      const wordCount = (StorageService as any).countWords(pages);
      expect(wordCount).toBe(3);
    });
  });
});
