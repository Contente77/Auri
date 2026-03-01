/**
 * Home screen - main entry point after onboarding
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '../src/components/common/Button';
import { StudyPackCard } from '../src/components/library/StudyPackCard';
import { useStudyPacks } from '../src/hooks/useStudyPacks';
import { useSettings } from '../src/contexts/SettingsContext';
import { getThemeColors } from '../src/constants/Colors';
import { Colors } from '../src/constants/Colors';

export default function HomeScreen() {
  const router = useRouter();
  const { studyPacks } = useStudyPacks();
  const { settings } = useSettings();
  const colors = getThemeColors(settings?.theme ?? 'light');

  // Get recent study packs (last 3)
  const recentPacks = studyPacks?.slice(0, 3) ?? [];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors?.background ?? '#FFF8E7' }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors?.text ?? '#1C1C1E' }]}>Auri</Text>
          <Pressable
            onPress={() => router.push('/settings')}
            style={styles.settingsButton}
            accessibilityLabel="Settings"
            accessibilityHint="Open app settings"
            accessibilityRole="button"
          >
            <Text style={styles.settingsIcon}>⚙️</Text>
          </Pressable>
        </View>

        {/* Greeting */}
        <Text style={[styles.greeting, { color: colors?.textSecondary ?? '#6C6C70' }]}>
          What would you like to learn today?
        </Text>

        {/* Main actions */}
        <View style={styles.actionsContainer}>
          <View style={styles.actionCard}>
            <Pressable
              onPress={() => router.push('/camera')}
              style={({ pressed }) => [
                styles.actionButton,
                { backgroundColor: Colors.primary },
                pressed && styles.actionButtonPressed,
              ]}
              accessibilityLabel="Scan Document"
              accessibilityHint="Open camera to scan a document"
              accessibilityRole="button"
            >
              <Text style={styles.actionIcon}>📷</Text>
              <Text style={styles.actionText}>Scan Document</Text>
            </Pressable>
          </View>

          <View style={styles.actionCard}>
            <Pressable
              onPress={() => {
                // Will implement photo import
                alert('Photo import coming soon!');
              }}
              style={({ pressed }) => [
                styles.actionButton,
                { backgroundColor: Colors.primaryLight },
                pressed && styles.actionButtonPressed,
              ]}
              accessibilityLabel="Import Photo"
              accessibilityHint="Import a photo from your library"
              accessibilityRole="button"
            >
              <Text style={styles.actionIcon}>🖼️</Text>
              <Text style={styles.actionText}>Import Photo</Text>
            </Pressable>
          </View>

          <View style={styles.actionCard}>
            <Pressable
              onPress={() => router.push('/library')}
              style={({ pressed }) => [
                styles.actionButton,
                { backgroundColor: Colors.info },
                pressed && styles.actionButtonPressed,
              ]}
              accessibilityLabel="My Library"
              accessibilityHint="View all your study packs"
              accessibilityRole="button"
            >
              <Text style={styles.actionIcon}>📚</Text>
              <Text style={styles.actionText}>My Library</Text>
            </Pressable>
          </View>
        </View>

        {/* Recent study packs */}
        {recentPacks.length > 0 && (
          <View style={styles.recentSection}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: colors?.text ?? '#1C1C1E' }]}>
                Recent Study Packs
              </Text>
              <Pressable onPress={() => router.push('/library')}>
                <Text style={[styles.seeAllText, { color: Colors.primary }]}>See All</Text>
              </Pressable>
            </View>

            {recentPacks.map((pack) => (
              <StudyPackCard
                key={pack?.id}
                studyPack={pack}
                onPress={() => router.push(`/reader?id=${pack?.id}`)}
              />
            ))}
          </View>
        )}

        {/* Empty state */}
        {recentPacks.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📚</Text>
            <Text style={[styles.emptyTitle, { color: colors?.text ?? '#1C1C1E' }]}>
              No Study Packs Yet
            </Text>
            <Text style={[styles.emptyDescription, { color: colors?.textSecondary ?? '#6C6C70' }]}>
              Scan your first document to get started!
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 0 : 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
  },
  settingsButton: {
    padding: 8,
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsIcon: {
    fontSize: 24,
  },
  greeting: {
    fontSize: 18,
    marginBottom: 32,
  },
  actionsContainer: {
    marginBottom: 32,
  },
  actionCard: {
    marginBottom: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    minHeight: 80,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  actionButtonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  actionIcon: {
    fontSize: 36,
    marginRight: 16,
  },
  actionText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  recentSection: {
    marginTop: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
  },
  seeAllText: {
    fontSize: 16,
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 16,
    textAlign: 'center',
  },
});
