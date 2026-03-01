/**
 * Library screen - view all study packs
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TextInput,
  Platform,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { StudyPackCard } from '../src/components/library/StudyPackCard';
import { LoadingIndicator } from '../src/components/common/LoadingIndicator';
import { ErrorMessage } from '../src/components/common/ErrorMessage';
import { Button } from '../src/components/common/Button';
import { useStudyPacks } from '../src/hooks/useStudyPacks';
import { useSettings } from '../src/contexts/SettingsContext';
import { getThemeColors } from '../src/constants/Colors';
import { Colors } from '../src/constants/Colors';
import { StudyPack } from '../src/models/StudyPack';

export default function LibraryScreen() {
  const router = useRouter();
  const { studyPacks, isLoading, error, refresh, deleteStudyPack } = useStudyPacks();
  const { settings } = useSettings();
  const colors = getThemeColors(settings?.theme ?? 'light');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'alphabetical'>('recent');

  // Filter and sort study packs
  const filteredPacks = studyPacks
    ?.filter((pack) =>
      pack?.title?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    ?.sort((a, b) => {
      if (sortBy === 'alphabetical') {
        return (a?.title ?? '').localeCompare(b?.title ?? '');
      }
      return new Date(b?.updatedAt ?? 0).getTime() - new Date(a?.updatedAt ?? 0).getTime();
    }) ?? [];

  const handleDeletePack = (pack: StudyPack) => {
    Alert.alert(
      'Delete Study Pack',
      `Are you sure you want to delete "${pack?.title ?? 'this pack'}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteStudyPack(pack?.id ?? '');
            } catch (err) {
              Alert.alert('Error', 'Failed to delete study pack');
            }
          },
        },
      ]
    );
  };

  if (isLoading) {
    return <LoadingIndicator message="Loading library..." />;
  }

  if (error) {
    return <ErrorMessage message={error?.message ?? 'Failed to load library'} onRetry={refresh} />;
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors?.background ?? '#FFF8E7' }]}>
      {/* Header */}
      <View style={styles.header}>
        <Button
          title="←"
          onPress={() => router.back()}
          variant="secondary"
          size="small"
          accessibilityLabel="Go back"
        />
        <Text style={[styles.title, { color: colors?.text ?? '#1C1C1E' }]}>Library</Text>
        <View style={{ width: 60 }} />
      </View>

      {/* Search bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={[
            styles.searchInput,
            {
              backgroundColor: colors?.surface ?? '#FFFFFF',
              color: colors?.text ?? '#1C1C1E',
              borderColor: colors?.border ?? '#E5E5EA',
            },
          ]}
          placeholder="Search study packs..."
          placeholderTextColor={colors?.textSecondary ?? '#6C6C70'}
          value={searchQuery}
          onChangeText={setSearchQuery}
          accessibilityLabel="Search"
          accessibilityHint="Search your study packs"
        />
      </View>

      {/* Sort options */}
      <View style={styles.sortContainer}>
        <Text style={[styles.sortLabel, { color: colors?.textSecondary ?? '#6C6C70' }]}>
          Sort by:
        </Text>
        <Button
          title="Recent"
          onPress={() => setSortBy('recent')}
          variant={sortBy === 'recent' ? 'primary' : 'secondary'}
          size="small"
          style={styles.sortButton}
        />
        <Button
          title="A-Z"
          onPress={() => setSortBy('alphabetical')}
          variant={sortBy === 'alphabetical' ? 'primary' : 'secondary'}
          size="small"
          style={styles.sortButton}
        />
      </View>

      {/* Study packs list */}
      {filteredPacks.length > 0 ? (
        <FlatList
          data={filteredPacks}
          renderItem={({ item }) => (
            <StudyPackCard
              studyPack={item}
              onPress={() => router.push(`/reader?id=${item?.id}`)}
              onLongPress={() => handleDeletePack(item)}
            />
          )}
          keyExtractor={(item) => item?.id ?? ''}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>🔍</Text>
          <Text style={[styles.emptyText, { color: colors?.textSecondary ?? '#6C6C70' }]}>
            {searchQuery ? 'No matching study packs found' : 'No study packs yet'}
          </Text>
        </View>
      )}
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
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchInput: {
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sortLabel: {
    fontSize: 16,
    marginRight: 12,
  },
  sortButton: {
    marginRight: 8,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
  },
});
