/**
 * Custom hook for managing study packs
 */

import { useState, useEffect, useCallback } from 'react';
import { StudyPack, Page } from '../models/StudyPack';
import { StorageService } from '../services/storageService';

export function useStudyPacks() {
  const [studyPacks, setStudyPacks] = useState<StudyPack[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadStudyPacks = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const packs = await StorageService.getAllStudyPacks();
      setStudyPacks(packs ?? []);
    } catch (err) {
      setError(err as Error);
      console.error('Failed to load study packs:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStudyPacks();
  }, [loadStudyPacks]);

  const createStudyPack = async (title: string, pages: Page[]): Promise<StudyPack> => {
    try {
      const pack = await StorageService.createStudyPack(title, pages);
      await loadStudyPacks(); // Refresh list
      return pack;
    } catch (err) {
      throw err;
    }
  };

  const deleteStudyPack = async (id: string): Promise<void> => {
    try {
      await StorageService.deleteStudyPack(id);
      await loadStudyPacks(); // Refresh list
    } catch (err) {
      throw err;
    }
  };

  const updateStudyPack = async (
    id: string,
    updates: Partial<StudyPack>
  ): Promise<void> => {
    try {
      await StorageService.updateStudyPack(id, updates);
      await loadStudyPacks(); // Refresh list
    } catch (err) {
      throw err;
    }
  };

  return {
    studyPacks,
    isLoading,
    error,
    refresh: loadStudyPacks,
    createStudyPack,
    deleteStudyPack,
    updateStudyPack,
  };
}
