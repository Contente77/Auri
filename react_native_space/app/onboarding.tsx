/**
 * Onboarding flow
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { Button } from '../src/components/common/Button';
import { Colors } from '../src/constants/Colors';
import { useSettings } from '../src/contexts/SettingsContext';

export default function OnboardingScreen() {
  const router = useRouter();
  const { updateSettings } = useSettings();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: 'Welcome to Auri',
      description:
        'Your personal learning companion that transforms documents into interactive reading experiences.',
      emoji: '🌟',
    },
    {
      title: 'Scan & Listen',
      description:
        'Capture any document with your camera and listen to it read aloud with real-time highlighting.',
      emoji: '📷',
    },
    {
      title: 'Dyslexia-Friendly',
      description:
        'Customize fonts, colors, and spacing to make reading easier and more comfortable for you.',
      emoji: '✨',
    },
  ];

  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Request permissions and complete onboarding
      await requestPermissions();
    }
  };

  const requestPermissions = async () => {
    try {
      // Request camera permission
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      
      // Request photo library permission
      const mediaLibraryPermission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      // Mark onboarding as completed
      await updateSettings({ onboardingCompleted: true });

      // Navigate to home
      router.replace('/home');
    } catch (error) {
      console.error('Failed to request permissions:', error);
      // Still navigate to home even if permissions fail
      await updateSettings({ onboardingCompleted: true });
      router.replace('/home');
    }
  };

  const handleSkip = async () => {
    await updateSettings({ onboardingCompleted: true });
    router.replace('/home');
  };

  const currentStepData = steps[currentStep];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Skip button */}
        {currentStep < steps.length - 1 && (
          <View style={styles.skipContainer}>
            <Button
              title="Skip"
              onPress={handleSkip}
              variant="secondary"
              size="small"
            />
          </View>
        )}

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.emoji}>{currentStepData?.emoji ?? ''}</Text>
          <Text style={styles.title}>{currentStepData?.title ?? ''}</Text>
          <Text style={styles.description}>{currentStepData?.description ?? ''}</Text>
        </View>

        {/* Progress indicators */}
        <View style={styles.progressContainer}>
          {steps.map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressDot,
                index === currentStep && styles.progressDotActive,
              ]}
            />
          ))}
        </View>

        {/* Next button */}
        <View style={styles.buttonContainer}>
          <Button
            title={currentStep < steps.length - 1 ? 'Next' : 'Get Started'}
            onPress={handleNext}
            variant="primary"
            size="large"
            style={styles.nextButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 32,
    paddingTop: Platform.OS === 'ios' ? 20 : 40,
    paddingBottom: 40,
  },
  skipContainer: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emoji: {
    fontSize: 80,
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.light.text,
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 18,
    color: Colors.light.textSecondary,
    textAlign: 'center',
    lineHeight: 26,
    paddingHorizontal: 20,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D1D1D6',
    marginHorizontal: 4,
  },
  progressDotActive: {
    width: 24,
    backgroundColor: Colors.primary,
  },
  buttonContainer: {
    width: '100%',
  },
  nextButton: {
    width: '100%',
  },
});
