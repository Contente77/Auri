/**
 * Text-to-Speech Service
 * Uses Expo Speech as primary TTS provider with fallback to native
 */

import * as Speech from 'expo-speech';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

export interface TTSOptions {
  voice?: string;
  rate?: number; // 0.5 - 2.0
  pitch?: number; // 0.5 - 2.0
}

export interface TTSVoice {
  identifier: string;
  name: string;
  quality: string;
  language: string;
}

export class TTSService {
  private static currentSound: Audio.Sound | null = null;
  private static isSpeaking = false;

  /**
   * Speak text using native TTS
   */
  static async speak(text: string, options: TTSOptions = {}): Promise<void> {
    try {
      // Stop any ongoing speech
      await this.stop();

      this.isSpeaking = true;

      await Speech.speak(text, {
        language: 'en-US',
        pitch: options.pitch ?? 1.0,
        rate: options.rate ?? 1.0,
        voice: options.voice,
        onDone: () => {
          this.isSpeaking = false;
        },
        onStopped: () => {
          this.isSpeaking = false;
        },
        onError: (error) => {
          console.error('TTS error:', error);
          this.isSpeaking = false;
        },
      });
    } catch (error) {
      console.error('Failed to speak:', error);
      this.isSpeaking = false;
      throw error;
    }
  }

  /**
   * Stop current speech
   */
  static async stop(): Promise<void> {
    try {
      if (this.isSpeaking) {
        await Speech.stop();
        this.isSpeaking = false;
      }
      
      if (this.currentSound) {
        await this.currentSound.stopAsync();
        await this.currentSound.unloadAsync();
        this.currentSound = null;
      }
    } catch (error) {
      console.error('Failed to stop TTS:', error);
    }
  }

  /**
   * Pause current speech
   */
  static async pause(): Promise<void> {
    try {
      if (this.isSpeaking) {
        await Speech.pause();
      }
      
      if (this.currentSound) {
        await this.currentSound.pauseAsync();
      }
    } catch (error) {
      console.error('Failed to pause TTS:', error);
    }
  }

  /**
   * Resume paused speech
   */
  static async resume(): Promise<void> {
    try {
      if (this.currentSound) {
        await this.currentSound.playAsync();
      }
      // Note: expo-speech doesn't have a resume method, need to re-speak
    } catch (error) {
      console.error('Failed to resume TTS:', error);
    }
  }

  /**
   * Get available voices
   */
  static async getAvailableVoices(): Promise<TTSVoice[]> {
    try {
      const voices = await Speech.getAvailableVoicesAsync();
      return voices.map((voice) => ({
        identifier: voice.identifier,
        name: voice.name,
        quality: voice.quality,
        language: voice.language,
      }));
    } catch (error) {
      console.error('Failed to get voices:', error);
      return [];
    }
  }

  /**
   * Check if currently speaking
   */
  static isSpeakingNow(): boolean {
    return this.isSpeaking;
  }

  /**
   * Split text into sentences for better control
   */
  static splitIntoSentences(text: string): string[] {
    // Simple sentence splitting (can be improved with NLP library)
    return text
      .split(/(?<=[.!?])\s+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
  }
}
