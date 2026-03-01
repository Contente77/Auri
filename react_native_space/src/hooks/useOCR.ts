/**
 * Custom hook for OCR functionality
 */

import { useState, useCallback } from 'react';
import { OCRService } from '../services/ocrService';
import { Page } from '../models/StudyPack';

export function useOCR() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<Error | null>(null);

  const processImages = useCallback(
    async (imageUris: string[], studyPackId: string): Promise<Page[]> => {
      setIsProcessing(true);
      setProgress(0);
      setError(null);

      const pages: Page[] = [];

      try {
        for (let i = 0; i < imageUris.length; i++) {
          const imageUri = imageUris[i];
          if (!imageUri) continue;

          const page = await OCRService.extractText(
            imageUri,
            studyPackId,
            i + 1
          );
          pages.push(page);

          // Update progress
          setProgress(((i + 1) / imageUris.length) * 100);
        }

        return pages;
      } catch (err) {
        setError(err as Error);
        throw err;
      } finally {
        setIsProcessing(false);
        setProgress(0);
      }
    },
    []
  );

  const validateAPIKey = useCallback(async (apiKey: string): Promise<boolean> => {
    try {
      return await OCRService.validateAPIKey(apiKey);
    } catch (err) {
      console.error('API key validation failed:', err);
      return false;
    }
  }, []);

  return {
    isProcessing,
    progress,
    error,
    processImages,
    validateAPIKey,
  };
}
