/**
 * Text processing utility tests
 */

import {
  splitIntoSentences,
  splitIntoWords,
  countWords,
  cleanText,
  truncateText,
} from '../utils/textProcessing';

describe('Text Processing Utilities', () => {
  describe('splitIntoSentences', () => {
    it('should split text into sentences', () => {
      const text = 'Hello world. This is a test. How are you?';
      const sentences = splitIntoSentences(text);
      expect(sentences).toHaveLength(3);
      expect(sentences[0]).toBe('Hello world.');
      expect(sentences[1]).toBe('This is a test.');
      expect(sentences[2]).toBe('How are you?');
    });

    it('should handle empty text', () => {
      expect(splitIntoSentences('')).toEqual([]);
    });

    it('should handle text with only one sentence', () => {
      const text = 'This is one sentence.';
      const sentences = splitIntoSentences(text);
      expect(sentences).toHaveLength(1);
      expect(sentences[0]).toBe('This is one sentence.');
    });
  });

  describe('splitIntoWords', () => {
    it('should split text into words', () => {
      const text = 'Hello world from testing';
      const words = splitIntoWords(text);
      expect(words).toHaveLength(4);
      expect(words).toEqual(['Hello', 'world', 'from', 'testing']);
    });

    it('should handle empty text', () => {
      expect(splitIntoWords('')).toEqual([]);
    });

    it('should handle multiple spaces', () => {
      const text = 'Hello    world';
      const words = splitIntoWords(text);
      expect(words).toHaveLength(2);
    });
  });

  describe('countWords', () => {
    it('should count words correctly', () => {
      expect(countWords('Hello world')).toBe(2);
      expect(countWords('One')).toBe(1);
      expect(countWords('')).toBe(0);
    });
  });

  describe('cleanText', () => {
    it('should remove extra whitespace', () => {
      const text = 'Hello    world   test';
      const cleaned = cleanText(text);
      expect(cleaned).toBe('Hello world test');
    });

    it('should remove extra newlines', () => {
      const text = 'Hello\n\n\n\nworld';
      const cleaned = cleanText(text);
      expect(cleaned).toBe('Hello\n\nworld');
    });

    it('should trim leading and trailing whitespace', () => {
      const text = '  Hello world  ';
      const cleaned = cleanText(text);
      expect(cleaned).toBe('Hello world');
    });
  });

  describe('truncateText', () => {
    it('should truncate text that exceeds max length', () => {
      const text = 'This is a long text that needs to be truncated';
      const truncated = truncateText(text, 20);
      expect(truncated).toBe('This is a long te...');
      expect(truncated.length).toBe(20);
    });

    it('should not truncate text shorter than max length', () => {
      const text = 'Short text';
      const truncated = truncateText(text, 20);
      expect(truncated).toBe('Short text');
    });

    it('should handle empty text', () => {
      expect(truncateText('', 10)).toBe('');
    });
  });
});
