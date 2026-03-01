/**
 * Camera screen for document scanning
 */

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Platform,
  Alert,
  TextInput,
  Modal,
} from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { Button } from '../src/components/common/Button';
import { LoadingIndicator } from '../src/components/common/LoadingIndicator';
import { Colors } from '../src/constants/Colors';
import { useOCR } from '../src/hooks/useOCR';
import { StorageService } from '../src/services/storageService';
import { v4 as uuidv4 } from 'react-native-uuid';

export default function CameraScreen() {
  const router = useRouter();
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showNameModal, setShowNameModal] = useState(false);
  const [packTitle, setPackTitle] = useState('');
  const { processImages } = useOCR();

  if (!permission) {
    return <LoadingIndicator message="Loading camera..." />;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionText}>Camera permission is required to scan documents</Text>
          <Button
            title="Grant Permission"
            onPress={requestPermission}
            variant="primary"
            size="large"
          />
          <Button
            title="Go Back"
            onPress={() => router.back()}
            variant="secondary"
            size="medium"
            style={{ marginTop: 12 }}
          />
        </View>
      </SafeAreaView>
    );
  }

  const handleCapture = async () => {
    if (!cameraRef.current) return;

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
      });

      if (photo?.uri) {
        // Save image to app storage
        const savedUri = await StorageService.saveImage(photo.uri);
        setCapturedImages([...capturedImages, savedUri]);
        Alert.alert('Success', 'Page captured!\nCapture another page or tap Done to process.');
      }
    } catch (error) {
      console.error('Failed to capture photo:', error);
      Alert.alert('Error', 'Failed to capture photo. Please try again.');
    }
  };

  const handleDone = () => {
    if (capturedImages.length === 0) {
      Alert.alert('No pages captured', 'Please capture at least one page.');
      return;
    }
    setShowNameModal(true);
  };

  const handleProcessImages = async () => {
    if (!packTitle.trim()) {
      Alert.alert('Error', 'Please enter a name for your study pack.');
      return;
    }

    setShowNameModal(false);
    setIsProcessing(true);

    try {
      const studyPackId = uuidv4();
      
      // Process images with OCR
      const pages = await processImages(capturedImages, studyPackId);

      // Create study pack
      const studyPack = await StorageService.createStudyPack(packTitle.trim(), pages);

      Alert.alert('Success', 'Study pack created!', [
        {
          text: 'OK',
          onPress: () => router.replace(`/reader?id=${studyPack.id}`),
        },
      ]);
    } catch (error) {
      console.error('Failed to process images:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      Alert.alert(
        'Processing Failed',
        errorMessage,
        [
          {
            text: 'OK',
            onPress: () => {
              setIsProcessing(false);
              setShowNameModal(true);
            },
          },
        ]
      );
    }
  };

  if (isProcessing) {
    return (
      <LoadingIndicator message={`Processing ${capturedImages.length} page(s)...\nThis may take a moment.`} />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Camera view */}
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing="back"
      >
        {/* Header overlay */}
        <View style={styles.header}>
          <Button
            title="Cancel"
            onPress={() => router.back()}
            variant="secondary"
            size="small"
          />
          <Text style={styles.pageCount}>
            Pages: {capturedImages.length}
          </Text>
        </View>

        {/* Bottom controls */}
        <View style={styles.controls}>
          {capturedImages.length > 0 && (
            <Button
              title="Done"
              onPress={handleDone}
              variant="primary"
              size="medium"
              style={styles.doneButton}
            />
          )}
          
          <Pressable
            onPress={handleCapture}
            style={styles.captureButton}
            accessibilityLabel="Capture"
            accessibilityHint="Capture the current page"
            accessibilityRole="button"
          >
            <View style={styles.captureButtonInner} />
          </Pressable>
          
          <View style={{ width: 80 }} />
        </View>
      </CameraView>

      {/* Name input modal */}
      <Modal
        visible={showNameModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowNameModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Name Your Study Pack</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="e.g., Biology Chapter 3"
              value={packTitle}
              onChangeText={setPackTitle}
              autoFocus
              maxLength={50}
            />
            <View style={styles.modalButtons}>
              <Button
                title="Cancel"
                onPress={() => setShowNameModal(false)}
                variant="secondary"
                size="medium"
                style={{ flex: 1, marginRight: 8 }}
              />
              <Button
                title="Process"
                onPress={handleProcessImages}
                variant="primary"
                size="medium"
                style={{ flex: 1 }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  permissionText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 32,
    color: Colors.light.text,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  pageCount: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  controls: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  doneButton: {
    minWidth: 80,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  captureButtonInner: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#FFFFFF',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
  },
});
