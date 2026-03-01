/**
 * Custom hook for Text-to-Speech functionality
 */

import { useState, useCallback, useEffect } from 'react';
import { TTSService, TTSOptions } from '../services/ttsService';
import { splitIntoSentences } from '../utils/textProcessing';

export function useTTS() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [sentences, setSentences] = useState<string[]>([]);
  const [speed, setSpeed] = useState(1.0);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      TTSService.stop();
    };
  }, []);

  const loadText = useCallback((text: string) => {
    const sentenceList = splitIntoSentences(text);
    setSentences(sentenceList ?? []);
    setCurrentSentenceIndex(0);
  }, []);

  const play = useCallback(async () => {
    if (!sentences || sentences.length === 0) return;

    setIsPlaying(true);

    try {
      for (let i = currentSentenceIndex; i < sentences.length; i++) {
        setCurrentSentenceIndex(i);
        const sentence = sentences[i];
        if (sentence) {
          await TTSService.speak(sentence, { rate: speed });
        }

        // Check if stopped during playback
        if (!TTSService.isSpeakingNow()) {
          break;
        }
      }
    } catch (error) {
      console.error('TTS playback error:', error);
    } finally {
      setIsPlaying(false);
    }
  }, [sentences, currentSentenceIndex, speed]);

  const pause = useCallback(async () => {
    await TTSService.stop();
    setIsPlaying(false);
  }, []);

  const stop = useCallback(async () => {
    await TTSService.stop();
    setIsPlaying(false);
    setCurrentSentenceIndex(0);
  }, []);

  const skipForward = useCallback(() => {
    if (currentSentenceIndex < (sentences?.length ?? 0) - 1) {
      TTSService.stop();
      setCurrentSentenceIndex(currentSentenceIndex + 1);
      setIsPlaying(false);
    }
  }, [currentSentenceIndex, sentences]);

  const skipBackward = useCallback(() => {
    if (currentSentenceIndex > 0) {
      TTSService.stop();
      setCurrentSentenceIndex(currentSentenceIndex - 1);
      setIsPlaying(false);
    }
  }, [currentSentenceIndex]);

  const repeatSentence = useCallback(async () => {
    const sentence = sentences?.[currentSentenceIndex];
    if (sentence) {
      await TTSService.stop();
      setIsPlaying(true);
      await TTSService.speak(sentence, { rate: speed });
      setIsPlaying(false);
    }
  }, [sentences, currentSentenceIndex, speed]);

  const changeSpeed = useCallback((newSpeed: number) => {
    setSpeed(Math.max(0.5, Math.min(2.0, newSpeed)));
  }, []);

  return {
    isPlaying,
    currentSentenceIndex,
    sentences,
    speed,
    loadText,
    play,
    pause,
    stop,
    skipForward,
    skipBackward,
    repeatSentence,
    changeSpeed,
  };
}
