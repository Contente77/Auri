/**
 * Reader screen - read and listen to study pack content
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Platform,
  Pressable,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Button } from '../src/components/common/Button';
import { LoadingIndicator } from '../src/components/common/LoadingIndicator';
import { ErrorMessage } from '../src/components/common/ErrorMessage';
import { useSettings } from '../src/contexts/SettingsContext';
import { useTTS } from '../src/hooks/useTTS';
import { getThemeColors, Colors } from '../src/constants/Colors';
import { getFontFamily } from '../src/constants/Fonts';
import { StorageService } from '../src/services/storageService';
import { StudyPack } from '../src/models/StudyPack';

export default function ReaderScreen() {
  const router = useRouter();
  const { id = '' } = useLocalSearchParams();
  const { settings } = useSettings();
  const colors = getThemeColors(settings?.theme ?? 'light');
  const {
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
    changeSpeed,
  } = useTTS();

  const [studyPack, setStudyPack] = useState<StudyPack | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    loadStudyPack();
  }, [id]);

  useEffect(() => {
    // Load text for TTS when page changes
    if (studyPack?.pages?.[currentPage]?.text) {
      loadText(studyPack.pages[currentPage].text);
    }
  }, [studyPack, currentPage, loadText]);

  const loadStudyPack = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const pack = await StorageService.getStudyPack(id as string);
      if (pack) {
        setStudyPack(pack);
      } else {
        setError(new Error('Study pack not found'));
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const handleSpeedChange = () => {
    const speeds = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];
    const currentIndex = speeds.indexOf(speed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    changeSpeed(speeds[nextIndex] ?? 1.0);
  };

  if (isLoading) {
    return <LoadingIndicator message="Loading study pack..." />;
  }

  if (error || !studyPack) {
    return (
      <ErrorMessage
        message={error?.message ?? 'Failed to load study pack'}
        onRetry={loadStudyPack}
      />
    );
  }

  const currentPageData = studyPack.pages?.[currentPage];
  const totalPages = studyPack.pages?.length ?? 0;

  // Highlight current sentence
  const renderTextWithHighlight = () => {
    if (!currentPageData?.text) return null;

    const sentenceStart = sentences
      ?.slice(0, currentSentenceIndex)
      .join(' ').length ?? 0;
    const currentSentence = sentences?.[currentSentenceIndex] ?? '';
    const sentenceEnd = sentenceStart + currentSentence.length;

    const beforeHighlight = currentPageData.text.substring(0, sentenceStart);
    const highlighted = currentPageData.text.substring(sentenceStart, sentenceEnd);
    const afterHighlight = currentPageData.text.substring(sentenceEnd);

    const textStyle = {
      fontFamily: getFontFamily(settings?.fontFamily ?? 'openDyslexic'),
      fontSize: settings?.fontSize ?? 18,
      lineHeight: (settings?.fontSize ?? 18) * (settings?.lineSpacing ?? 1.5),
      color: colors?.text ?? '#1C1C1E',
    };

    return (
      <Text style={textStyle}>
        {beforeHighlight}
        <Text style={{ backgroundColor: colors?.highlightSentence ?? '#87CEEB' }}>
          {highlighted}
        </Text>
        {afterHighlight}
      </Text>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors?.background ?? '#FFF8E7' }]}>
      {/* Header */}
      <View style={styles.header}>
        <Button
          title="←"
          onPress={() => {
            stop();
            router.back();
          }}
          variant="secondary"
          size="small"
        />
        <Text
          style={[styles.title, { color: colors?.text ?? '#1C1C1E' }]}
          numberOfLines={1}
        >
          {studyPack.title}
        </Text>
        <View style={{ width: 60 }} />
      </View>

      {/* Page navigation */}
      <View style={styles.pageNav}>
        <Button
          title="←"
          onPress={() => setCurrentPage(Math.max(0, currentPage - 1))}
          variant="secondary"
          size="small"
          disabled={currentPage === 0}
        />
        <Text style={[styles.pageNumber, { color: colors?.textSecondary ?? '#6C6C70' }]}>
          Page {currentPage + 1} of {totalPages}
        </Text>
        <Button
          title="→"
          onPress={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
          variant="secondary"
          size="small"
          disabled={currentPage === totalPages - 1}
        />
      </View>

      {/* Text content */}
      <ScrollView
        style={styles.textContainer}
        contentContainerStyle={styles.textContent}
      >
        {renderTextWithHighlight()}
      </ScrollView>

      {/* Playback controls */}
      <View style={[styles.controls, { backgroundColor: colors?.surface ?? '#FFFFFF' }]}>
        {/* Speed control */}
        <Pressable onPress={handleSpeedChange} style={styles.speedButton}>
          <Text style={[styles.speedText, { color: colors?.text ?? '#1C1C1E' }]}>
            {speed}x
          </Text>
        </Pressable>

        {/* Skip backward */}
        <Pressable
          onPress={skipBackward}
          style={styles.controlButton}
          disabled={currentSentenceIndex === 0}
        >
          <Text style={styles.controlIcon}>⏪</Text>
        </Pressable>

        {/* Play/Pause */}
        <Pressable onPress={handlePlayPause} style={styles.playButton}>
          <Text style={styles.playIcon}>{isPlaying ? '⏸️' : '▶️'}</Text>
        </Pressable>

        {/* Skip forward */}
        <Pressable
          onPress={skipForward}
          style={styles.controlButton}
          disabled={currentSentenceIndex >= (sentences?.length ?? 0) - 1}
        >
          <Text style={styles.controlIcon}>⏩</Text>
        </Pressable>

        {/* Stop */}
        <Pressable onPress={stop} style={styles.controlButton}>
          <Text style={styles.controlIcon}>⏹️</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 0 : 20,
    paddingBottom: 12,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 12,
    textAlign: 'center',
  },
  pageNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  pageNumber: {
    fontSize: 14,
    fontWeight: '500',
  },
  textContainer: {
    flex: 1,
  },
  textContent: {
    padding: 20,
    paddingBottom: 40,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  speedButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
    backgroundColor: '#F0F0F0',
  },
  speedText: {
    fontSize: 14,
    fontWeight: '600',
  },
  controlButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlIcon: {
    fontSize: 24,
  },
  playButton: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    backgroundColor: Colors.primary,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  playIcon: {
    fontSize: 28,
  },
});
