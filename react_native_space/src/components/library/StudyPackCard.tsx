/**
 * Study Pack card component for library
 */

import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Platform,
} from 'react-native';
import { StudyPack } from '../../models/StudyPack';
import { useSettings } from '../../contexts/SettingsContext';
import { getThemeColors } from '../../constants/Colors';
import { Colors } from '../../constants/Colors';

interface StudyPackCardProps {
  studyPack: StudyPack;
  onPress: () => void;
  onLongPress?: () => void;
}

export function StudyPackCard({ studyPack, onPress, onLongPress }: StudyPackCardProps) {
  const { settings } = useSettings();
  const colors = getThemeColors(settings?.theme ?? 'light');

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={({ pressed }) => [
        styles.container,
        { backgroundColor: colors?.surface ?? '#FFFFFF' },
        pressed && styles.pressed,
      ]}
      accessibilityRole="button"
      accessibilityLabel={`${studyPack?.title ?? 'Untitled'}, ${studyPack?.pages?.length ?? 0} pages`}
      accessibilityHint="Double tap to open"
    >
      {/* Thumbnail */}
      {studyPack?.thumbnailUri ? (
        <Image source={{ uri: studyPack.thumbnailUri }} style={styles.thumbnail} />
      ) : (
        <View style={[styles.thumbnail, styles.placeholderThumbnail]}>
          <Text style={styles.placeholderIcon}>📄</Text>
        </View>
      )}

      {/* Content */}
      <View style={styles.content}>
        <Text
          style={[styles.title, { color: colors?.text ?? '#1C1C1E' }]}
          numberOfLines={2}
        >
          {studyPack?.title ?? 'Untitled'}
        </Text>

        <Text style={[styles.meta, { color: colors?.textSecondary ?? '#6C6C70' }]}>
          {studyPack?.pages?.length ?? 0} pages • {formatDate(studyPack?.createdAt ?? new Date())}
        </Text>

        {studyPack?.metadata && (
          <Text style={[styles.meta, { color: colors?.textSecondary ?? '#6C6C70' }]}>
            {studyPack.metadata.estimatedReadTime} min read
          </Text>
        )}

        {/* Progress bar */}
        {(studyPack?.progress ?? 0) > 0 && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${studyPack?.progress ?? 0}%` },
                ]}
              />
            </View>
            <Text style={[styles.progressText, { color: colors?.textSecondary ?? '#6C6C70' }]}>
              {Math.round(studyPack?.progress ?? 0)}%
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  pressed: {
    opacity: 0.7,
  },
  thumbnail: {
    width: 80,
    height: 100,
    borderRadius: 8,
    marginRight: 12,
  },
  placeholderThumbnail: {
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderIcon: {
    fontSize: 32,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  meta: {
    fontSize: 14,
    marginBottom: 2,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#E5E5EA',
    borderRadius: 3,
    marginRight: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
