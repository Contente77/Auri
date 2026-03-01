/**
 * OCR Service - Google Cloud Vision API integration
 * Extracts text from images
 */

import * as SecureStore from 'expo-secure-store';
import { Page, TextBlock, OCRMetadata } from '../models/StudyPack';
import { v4 as uuidv4 } from 'react-native-uuid';

interface OCRResponse {
  responses: {
    fullTextAnnotation?: {
      text: string;
      pages: any[];
    };
    textAnnotations?: Array<{
      description: string;
      boundingPoly: {
        vertices: Array<{ x: number; y: number }>;
      };
    }>;
    error?: {
      message: string;
    };
  }[];
}

export class OCRService {
  private static async getAPIKey(): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync('GOOGLE_VISION_API_KEY');
    } catch (error) {
      console.error('Failed to get OCR API key:', error);
      return null;
    }
  }

  /**
   * Extract text from an image using Google Cloud Vision API
   */
  static async extractText(
    imageUri: string,
    studyPackId: string,
    pageNumber: number
  ): Promise<Page> {
    const apiKey = await this.getAPIKey();
    
    if (!apiKey) {
      throw new Error('Google Vision API key not configured. Please add it in Settings.');
    }

    try {
      // Convert image to base64
      const base64Image = await this.imageToBase64(imageUri);

      // Call Google Vision API
      const response = await fetch(
        `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            requests: [
              {
                image: {
                  content: base64Image,
                },
                features: [
                  {
                    type: 'DOCUMENT_TEXT_DETECTION',
                  },
                ],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`OCR API error: ${response.status} ${response.statusText}`);
      }

      const data: OCRResponse = await response.json();

      if (data?.responses?.[0]?.error) {
        throw new Error(data.responses[0].error.message);
      }

      const fullText = data?.responses?.[0]?.fullTextAnnotation?.text ?? '';
      const textAnnotations = data?.responses?.[0]?.textAnnotations ?? [];

      // Create text blocks from annotations
      const textBlocks: TextBlock[] = textAnnotations.slice(1).map((annotation) => ({
        id: uuidv4(),
        text: annotation.description,
        boundingBox: this.getBoundingBox(annotation.boundingPoly?.vertices ?? []),
        confidence: 0.95, // Google doesn't provide per-word confidence
        type: 'paragraph' as const,
      }));

      // Create page object
      const page: Page = {
        id: uuidv4(),
        studyPackId,
        pageNumber,
        imageUri,
        text: fullText,
        textBlocks,
        ocrMetadata: {
          confidence: 0.95,
          language: 'en',
          processedAt: new Date(),
        },
      };

      return page;
    } catch (error) {
      console.error('OCR extraction failed:', error);
      throw error;
    }
  }

  /**
   * Convert image URI to base64
   */
  private static async imageToBase64(imageUri: string): Promise<string> {
    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = reader.result as string;
          // Remove data URL prefix (e.g., "data:image/jpeg;base64,")
          const base64Data = base64.split(',')[1];
          resolve(base64Data ?? '');
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Failed to convert image to base64:', error);
      throw error;
    }
  }

  /**
   * Calculate bounding box from vertices
   */
  private static getBoundingBox(vertices: Array<{ x: number; y: number }>) {
    if (!vertices || vertices.length === 0) {
      return { x: 0, y: 0, width: 0, height: 0 };
    }

    const xs = vertices.map((v) => v?.x ?? 0);
    const ys = vertices.map((v) => v?.y ?? 0);

    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);

    return {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY,
    };
  }

  /**
   * Validate API key by making a test request
   */
  static async validateAPIKey(apiKey: string): Promise<boolean> {
    try {
      // Create a small test image (1x1 white pixel)
      const testImage = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==';

      const response = await fetch(
        `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            requests: [
              {
                image: { content: testImage },
                features: [{ type: 'TEXT_DETECTION' }],
              },
            ],
          }),
        }
      );

      return response.ok;
    } catch (error) {
      console.error('API key validation failed:', error);
      return false;
    }
  }
}
