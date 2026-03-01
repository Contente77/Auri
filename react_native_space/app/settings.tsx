/**
 * Settings screen - app configuration and API keys
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  Switch,
  Platform,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { Button } from '../src/components/common/Button';
import { useSettings } from '../src/contexts/SettingsContext';
import { getThemeColors } from '../src/constants/Colors';
import { Colors } from '../src/constants/Colors';
import { OCRService } from '../src/services/ocrService';

export default function SettingsScreen() {
  const router = useRouter();
  const { settings, updateSettings } = useSettings();
  const colors = getThemeColors(settings?.theme ?? 'light');
  
  const [ocrApiKey, setOcrApiKey] = useState('');
  const [isSavingKey, setIsSavingKey] = useState(false);

  const handleSaveOCRKey = async () => {
    if (!ocrApiKey?.trim()) {
      Alert.alert('Error', 'Please enter a valid API key');
      return;
    }

    setIsSavingKey(true);

    try {
      // Validate the API key
      const isValid = await OCRService.validateAPIKey(ocrApiKey.trim());

      if (!isValid) {
        Alert.alert('Invalid API Key', 'The API key you entered is not valid. Please check and try again.');
        setIsSavingKey(false);
        return;
      }

      // Save to secure storage
      await SecureStore.setItemAsync('GOOGLE_VISION_API_KEY', ocrApiKey.trim());
      
      // Update settings to reflect key is saved
      await updateSettings({ hasOCRKey: true });

      Alert.alert('Success', 'API key saved successfully!');
      setOcrApiKey('');
    } catch (error) {
      Alert.alert('Error', 'Failed to save API key. Please try again.');
      console.error('Failed to save API key:', error);
    } finally {
      setIsSavingKey(false);
    }
  };

  const handleThemeChange = async (theme: 'light' | 'dark' | 'highContrast' | 'sepia') => {
    await updateSettings({ theme });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors?.background ?? '#FFF8E7' }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Button
            title="←"
            onPress={() => router.back()}
            variant="secondary"
            size="small"
            accessibilityLabel="Go back"
          />
          <Text style={[styles.title, { color: colors?.text ?? '#1C1C1E' }]}>Settings</Text>
          <View style={{ width: 60 }} />
        </View>

        {/* API Keys Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors?.text ?? '#1C1C1E' }]}>
            API Configuration
          </Text>
          <Text style={[styles.sectionDescription, { color: colors?.textSecondary ?? '#6C6C70' }]}>
            Configure your API keys for OCR and text-to-speech services.
          </Text>

          {/* OCR API Key */}
          <View style={styles.settingItem}>
            <Text style={[styles.settingLabel, { color: colors?.text ?? '#1C1C1E' }]}>
              Google Vision API Key (OCR)
            </Text>
            <Text style={[styles.settingHint, { color: colors?.textSecondary ?? '#6C6C70' }]}>
              Get your key from: https://console.cloud.google.com/
            </Text>
            <View style={styles.keyInputContainer}>
              <TextInput
                style={[
                  styles.keyInput,
                  {
                    backgroundColor: colors?.surface ?? '#FFFFFF',
                    color: colors?.text ?? '#1C1C1E',
                    borderColor: colors?.border ?? '#E5E5EA',
                  },
                ]}
                placeholder="Enter your API key"
                placeholderTextColor={colors?.textSecondary ?? '#6C6C70'}
                value={ocrApiKey}
                onChangeText={setOcrApiKey}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
              <Button
                title="Save"
                onPress={handleSaveOCRKey}
                variant="primary"
                size="small"
                disabled={isSavingKey || !ocrApiKey?.trim()}
                style={styles.saveButton}
              />
            </View>
            {settings?.hasOCRKey && (
              <Text style={[styles.keyStatus, { color: Colors.success }]}>
                ✓ API key configured
              </Text>
            )}
          </View>
        </View>

        {/* Appearance Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors?.text ?? '#1C1C1E' }]}>
            Appearance
          </Text>

          {/* Theme selector */}
          <View style={styles.settingItem}>
            <Text style={[styles.settingLabel, { color: colors?.text ?? '#1C1C1E' }]}>
              Theme
            </Text>
            <View style={styles.themeButtons}>
              <Button
                title="Light"
                onPress={() => handleThemeChange('light')}
                variant={settings?.theme === 'light' ? 'primary' : 'secondary'}
                size="small"
                style={styles.themeButton}
              />
              <Button
                title="Dark"
                onPress={() => handleThemeChange('dark')}
                variant={settings?.theme === 'dark' ? 'primary' : 'secondary'}
                size="small"
                style={styles.themeButton}
              />
              <Button
                title="High Contrast"
                onPress={() => handleThemeChange('highContrast')}
                variant={settings?.theme === 'highContrast' ? 'primary' : 'secondary'}
                size="small"
                style={styles.themeButton}
              />
              <Button
                title="Sepia"
                onPress={() => handleThemeChange('sepia')}
                variant={settings?.theme === 'sepia' ? 'primary' : 'secondary'}
                size="small"
                style={styles.themeButton}
              />
            </View>
          </View>

          {/* Font family */}
          <View style={styles.settingItem}>
            <Text style={[styles.settingLabel, { color: colors?.text ?? '#1C1C1E' }]}>
              Font
            </Text>
            <View style={styles.themeButtons}>
              <Button
                title="OpenDyslexic"
                onPress={() => updateSettings({ fontFamily: 'openDyslexic' })}
                variant={settings?.fontFamily === 'openDyslexic' ? 'primary' : 'secondary'}
                size="small"
                style={styles.themeButton}
              />
              <Button
                title="Arial"
                onPress={() => updateSettings({ fontFamily: 'arial' })}
                variant={settings?.fontFamily === 'arial' ? 'primary' : 'secondary'}
                size="small"
                style={styles.themeButton}
              />
            </View>
          </View>
        </View>

        {/* Accessibility Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors?.text ?? '#1C1C1E' }]}>
            Accessibility
          </Text>

          <View style={styles.settingItem}>
            <View style={styles.switchRow}>
              <Text style={[styles.settingLabel, { color: colors?.text ?? '#1C1C1E' }]}>
                Reduce Motion
              </Text>
              <Switch
                value={settings?.reduceMotion ?? false}
                onValueChange={(value) => updateSettings({ reduceMotion: value })}
                trackColor={{ false: '#D1D1D6', true: Colors.primary }}
              />
            </View>
          </View>

          <View style={styles.settingItem}>
            <View style={styles.switchRow}>
              <Text style={[styles.settingLabel, { color: colors?.text ?? '#1C1C1E' }]}>
                Haptic Feedback
              </Text>
              <Switch
                value={settings?.hapticFeedback ?? true}
                onValueChange={(value) => updateSettings({ hapticFeedback: value })}
                trackColor={{ false: '#D1D1D6', true: Colors.primary }}
              />
            </View>
          </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors?.text ?? '#1C1C1E' }]}>
            About
          </Text>
          <Text style={[styles.aboutText, { color: colors?.textSecondary ?? '#6C6C70' }]}>
            Auri - Learning Companion for Dyslexic Learners
          </Text>
          <Text style={[styles.aboutText, { color: colors?.textSecondary ?? '#6C6C70' }]}>
            Version 1.0.0
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
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
  section: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20,
  },
  settingItem: {
    marginBottom: 20,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  settingHint: {
    fontSize: 12,
    marginBottom: 8,
    lineHeight: 16,
  },
  keyInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  keyInput: {
    flex: 1,
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    fontSize: 14,
    marginRight: 8,
  },
  saveButton: {
    minWidth: 80,
  },
  keyStatus: {
    fontSize: 14,
    marginTop: 8,
    fontWeight: '500',
  },
  themeButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  themeButton: {
    marginRight: 8,
    marginBottom: 8,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  aboutText: {
    fontSize: 14,
    marginBottom: 4,
  },
});
