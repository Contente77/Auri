/**
 * Storage Service - Local data persistence
 * Uses AsyncStorage for settings and file system for study packs
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import { StudyPack, Page } from '../models/StudyPack';
import { AppSettings, defaultSettings } from '../models/Settings';
import { Config } from '../constants/Config';
import { v4 as uuidv4 } from 'react-native-uuid';

const STUDY_PACKS_DIR = `${FileSystem.documentDirectory}study_packs/`;
const IMAGES_DIR = `${FileSystem.documentDirectory}images/`;
const AUDIO_DIR = `${FileSystem.documentDirectory}audio/`;

export class StorageService {
  /**
   * Initialize storage directories
   */
  static async initialize(): Promise<void> {
    try {
      // Create directories if they don't exist
      const dirs = [STUDY_PACKS_DIR, IMAGES_DIR, AUDIO_DIR];
      
      for (const dir of dirs) {
        const dirInfo = await FileSystem.getInfoAsync(dir);
        if (!dirInfo.exists) {
          await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
        }
      }
    } catch (error) {
      console.error('Failed to initialize storage:', error);
    }
  }

  // ============= Settings =============

  /**
   * Get app settings
   */
  static async getSettings(): Promise<AppSettings> {
    try {
      const settingsJson = await AsyncStorage.getItem(Config.storage.settingsKey);
      if (settingsJson) {
        return JSON.parse(settingsJson);
      }
      return defaultSettings;
    } catch (error) {
      console.error('Failed to get settings:', error);
      return defaultSettings;
    }
  }

  /**
   * Save app settings
   */
  static async saveSettings(settings: AppSettings): Promise<void> {
    try {
      await AsyncStorage.setItem(
        Config.storage.settingsKey,
        JSON.stringify(settings)
      );
    } catch (error) {
      console.error('Failed to save settings:', error);
      throw error;
    }
  }

  /**
   * Update specific settings
   */
  static async updateSettings(
    updates: Partial<AppSettings>
  ): Promise<AppSettings> {
    try {
      const currentSettings = await this.getSettings();
      const newSettings = { ...currentSettings, ...updates };
      await this.saveSettings(newSettings);
      return newSettings;
    } catch (error) {
      console.error('Failed to update settings:', error);
      throw error;
    }
  }

  // ============= Study Packs =============

  /**
   * Get all study packs (metadata only)
   */
  static async getAllStudyPacks(): Promise<StudyPack[]> {
    try {
      const packsJson = await AsyncStorage.getItem(Config.storage.studyPacksKey);
      if (packsJson) {
        const packs = JSON.parse(packsJson);
        // Convert date strings back to Date objects
        return packs.map((pack: any) => ({
          ...pack,
          createdAt: new Date(pack.createdAt),
          updatedAt: new Date(pack.updatedAt),
        }));
      }
      return [];
    } catch (error) {
      console.error('Failed to get study packs:', error);
      return [];
    }
  }

  /**
   * Get a single study pack by ID (with full pages data)
   */
  static async getStudyPack(id: string): Promise<StudyPack | null> {
    try {
      const packPath = `${STUDY_PACKS_DIR}${id}.json`;
      const packInfo = await FileSystem.getInfoAsync(packPath);
      
      if (!packInfo.exists) {
        return null;
      }

      const packJson = await FileSystem.readAsStringAsync(packPath);
      const pack = JSON.parse(packJson);
      
      // Convert date strings back to Date objects
      return {
        ...pack,
        createdAt: new Date(pack.createdAt),
        updatedAt: new Date(pack.updatedAt),
      };
    } catch (error) {
      console.error('Failed to get study pack:', error);
      return null;
    }
  }

  /**
   * Save a study pack
   */
  static async saveStudyPack(pack: StudyPack): Promise<void> {
    try {
      // Save full pack to file system
      const packPath = `${STUDY_PACKS_DIR}${pack.id}.json`;
      await FileSystem.writeAsStringAsync(packPath, JSON.stringify(pack));

      // Update metadata list in AsyncStorage
      const packs = await this.getAllStudyPacks();
      const existingIndex = packs.findIndex((p) => p?.id === pack.id);
      
      const metadata = {
        id: pack.id,
        title: pack.title,
        createdAt: pack.createdAt,
        updatedAt: pack.updatedAt,
        thumbnailUri: pack.thumbnailUri,
        progress: pack.progress,
        metadata: pack.metadata,
      };

      if (existingIndex >= 0) {
        packs[existingIndex] = metadata as StudyPack;
      } else {
        packs.push(metadata as StudyPack);
      }

      await AsyncStorage.setItem(
        Config.storage.studyPacksKey,
        JSON.stringify(packs)
      );
    } catch (error) {
      console.error('Failed to save study pack:', error);
      throw error;
    }
  }

  /**
   * Delete a study pack
   */
  static async deleteStudyPack(id: string): Promise<void> {
    try {
      // Delete pack file
      const packPath = `${STUDY_PACKS_DIR}${id}.json`;
      await FileSystem.deleteAsync(packPath, { idempotent: true });

      // Delete associated images and audio
      // (In a real implementation, track these in the pack and delete them)

      // Update metadata list
      const packs = await this.getAllStudyPacks();
      const updatedPacks = packs.filter((p) => p?.id !== id);
      await AsyncStorage.setItem(
        Config.storage.studyPacksKey,
        JSON.stringify(updatedPacks)
      );
    } catch (error) {
      console.error('Failed to delete study pack:', error);
      throw error;
    }
  }

  /**
   * Create a new study pack
   */
  static async createStudyPack(
    title: string,
    pages: Page[]
  ): Promise<StudyPack> {
    try {
      const now = new Date();
      const pack: StudyPack = {
        id: uuidv4(),
        title,
        createdAt: now,
        updatedAt: now,
        pages,
        thumbnailUri: pages[0]?.imageUri ?? '',
        progress: 0,
        settings: {},
        metadata: {
          totalWords: this.countWords(pages),
          estimatedReadTime: this.estimateReadTime(pages),
          language: 'en',
        },
      };

      await this.saveStudyPack(pack);
      return pack;
    } catch (error) {
      console.error('Failed to create study pack:', error);
      throw error;
    }
  }

  /**
   * Update study pack
   */
  static async updateStudyPack(
    id: string,
    updates: Partial<StudyPack>
  ): Promise<StudyPack | null> {
    try {
      const pack = await this.getStudyPack(id);
      if (!pack) {
        return null;
      }

      const updatedPack: StudyPack = {
        ...pack,
        ...updates,
        updatedAt: new Date(),
      };

      await this.saveStudyPack(updatedPack);
      return updatedPack;
    } catch (error) {
      console.error('Failed to update study pack:', error);
      throw error;
    }
  }

  // ============= Utilities =============

  /**
   * Count total words in pages
   */
  private static countWords(pages: Page[]): number {
    return pages.reduce((total, page) => {
      const words = page?.text?.split(/\s+/).filter((w) => w.length > 0) ?? [];
      return total + words.length;
    }, 0);
  }

  /**
   * Estimate read time in minutes
   */
  private static estimateReadTime(pages: Page[]): number {
    const totalWords = this.countWords(pages);
    const wordsPerMinute = 200; // Average reading speed
    return Math.ceil(totalWords / wordsPerMinute);
  }

  /**
   * Copy image to app's document directory
   */
  static async saveImage(sourceUri: string): Promise<string> {
    try {
      const filename = `${uuidv4()}.jpg`;
      const destUri = `${IMAGES_DIR}${filename}`;
      await FileSystem.copyAsync({ from: sourceUri, to: destUri });
      return destUri;
    } catch (error) {
      console.error('Failed to save image:', error);
      throw error;
    }
  }

  /**
   * Save audio file
   */
  static async saveAudio(sourceUri: string): Promise<string> {
    try {
      const filename = `${uuidv4()}.mp3`;
      const destUri = `${AUDIO_DIR}${filename}`;
      await FileSystem.copyAsync({ from: sourceUri, to: destUri });
      return destUri;
    } catch (error) {
      console.error('Failed to save audio:', error);
      throw error;
    }
  }
}
