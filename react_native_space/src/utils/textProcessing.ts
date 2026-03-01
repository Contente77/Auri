/**
 * Text processing utilities
 */

/**
 * Split text into sentences
 */
export function splitIntoSentences(text: string): string[] {
  if (!text) return [];
  
  // Split on sentence boundaries
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s?.trim() ?? '')
    .filter((s) => s.length > 0);
}

/**
 * Split text into words
 */
export function splitIntoWords(text: string): string[] {
  if (!text) return [];
  
  return text
    .split(/\s+/)
    .map((w) => w?.trim() ?? '')
    .filter((w) => w.length > 0);
}

/**
 * Count words in text
 */
export function countWords(text: string): number {
  return splitIntoWords(text).length;
}

/**
 * Estimate read time in minutes
 */
export function estimateReadTime(text: string, wordsPerMinute = 200): number {
  const wordCount = countWords(text);
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Clean text (remove extra whitespace, etc.)
 */
export function cleanText(text: string): string {
  if (!text) return '';
  
  return text
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .replace(/\n{3,}/g, '\n\n') // Replace multiple newlines with double newline
    .trim();
}

/**
 * Truncate text to a maximum length
 */
export function truncateText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text;
  
  return text.substring(0, maxLength - 3) + '...';
}

/**
 * Highlight text within a string
 */
export function highlightText(
  text: string,
  start: number,
  end: number
): { before: string; highlighted: string; after: string } {
  if (!text) {
    return { before: '', highlighted: '', after: '' };
  }
  
  return {
    before: text.substring(0, start),
    highlighted: text.substring(start, end),
    after: text.substring(end),
  };
}
