/**
 * Study Pack data model
 * Represents a collection of pages (scanned documents) with associated content
 */

export interface StudyPack {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  pages: Page[];
  thumbnailUri: string;
  progress: number; // 0-100
  settings: ReaderSettings;
  metadata: StudyPackMetadata;
  aiContent?: AIContent;
}

export interface Page {
  id: string;
  studyPackId: string;
  pageNumber: number;
  imageUri: string;
  text: string;
  textBlocks: TextBlock[];
  ocrMetadata: OCRMetadata;
  audioUri?: string;
  annotations?: Annotation[];
}

export interface TextBlock {
  id: string;
  text: string;
  boundingBox: BoundingBox;
  confidence: number;
  type: 'paragraph' | 'heading' | 'list' | 'caption';
}

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface OCRMetadata {
  confidence: number;
  language: string;
  processedAt: Date;
}

export interface Annotation {
  id: string;
  type: 'highlight' | 'note' | 'bookmark';
  text: string;
  position: {
    start: number;
    end: number;
  };
  note?: string;
  createdAt: Date;
}

export interface StudyPackMetadata {
  totalWords: number;
  estimatedReadTime: number;
  language: string;
  subject?: string;
}

export interface ReaderSettings {
  fontFamily?: string;
  fontSize?: number;
  theme?: string;
  lineSpacing?: number;
  letterSpacing?: string;
  lastPosition?: {
    pageNumber: number;
    characterIndex: number;
  };
}

export interface AIContent {
  summaries?: Summary[];
  glossary?: GlossaryTerm[];
  flashcards?: Flashcard[];
  quizzes?: Quiz[];
  podcast?: Podcast;
}

export interface Summary {
  id: string;
  studyPackId: string;
  length: 'brief' | 'standard' | 'detailed';
  text: string;
  bulletPoints?: string[];
  generatedAt: Date;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  context?: string;
  pageNumber: number;
}

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  mastered: boolean;
  lastReviewed?: Date;
  reviewCount: number;
}

export interface Quiz {
  id: string;
  studyPackId: string;
  questions: QuizQuestion[];
  attempts: QuizAttempt[];
  createdAt: Date;
}

export interface QuizQuestion {
  id: string;
  type: 'multipleChoice' | 'shortAnswer';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
}

export interface QuizAttempt {
  id: string;
  startedAt: Date;
  completedAt?: Date;
  answers: {
    questionId: string;
    userAnswer: string;
    correct: boolean;
  }[];
  score: number;
}

export interface Podcast {
  id: string;
  studyPackId: string;
  script: PodcastScript;
  audioUri: string;
  duration: number;
  generatedAt: Date;
}

export interface PodcastScript {
  title: string;
  speakers: {
    host: string;
    student: string;
  };
  segments: PodcastSegment[];
}

export interface PodcastSegment {
  speaker: 'host' | 'student';
  text: string;
  timestamp: number;
}
