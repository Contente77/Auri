# Auri - Master Plan & Technical Specification

**Version:** 1.0  
**Last Updated:** March 1, 2026  
**Status:** Planning & Architecture Phase

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Product Requirements](#2-product-requirements)
3. [Technical Architecture](#3-technical-architecture)
4. [Phased Implementation Plan](#4-phased-implementation-plan)
5. [API Integration Requirements](#5-api-integration-requirements)
6. [User Experience Design](#6-user-experience-design)
7. [Data Models](#7-data-models)
8. [Testing Strategy](#8-testing-strategy)
9. [Privacy & Security](#9-privacy--security)
10. [Task Breakdown](#10-task-breakdown)
11. [Future Enhancements](#11-future-enhancements)

---

## 1. Executive Summary

### 1.1 Vision

**Auri** is a mobile learning companion designed specifically for dyslexic learners, transforming static documents (photos, PDFs) into interactive, multi-sensory learning experiences. Built with React Native and Expo for iOS and iPad, Auri empowers students to learn at their own pace through reading, listening, and AI-powered explanations.

### 1.2 Core Value Proposition

- **Accessibility First:** Dyslexia-friendly fonts, high contrast, large controls, minimal cognitive load
- **Multi-Modal Learning:** Read, listen, and interact with content in multiple ways
- **AI-Powered Understanding:** Simplify complex topics, generate study materials, create engaging podcasts
- **Privacy-Focused:** Local-first storage, no ads, no trackers, user data stays private
- **Child-Friendly:** Intuitive interface designed for young learners

### 1.3 Target Users

- **Primary:** Students aged 8-18 with dyslexia or reading difficulties
- **Secondary:** Parents, educators, and any learner who benefits from multi-sensory content
- **Devices:** iPhone and iPad (iPad-first UX optimization)

### 1.4 Success Metrics

- Time to first successful scan and playback < 2 minutes
- Reading comprehension improvement (measured through study tools)
- Daily active usage and engagement with AI features
- User satisfaction with accessibility features
- Retention rate for study packs created

---

## 2. Product Requirements

### 2.1 MVP Features (Phase 1)

#### 2.1.1 Onboarding & Permissions
- **User Story:** As a new user, I want a simple onboarding flow that explains what Auri does and requests necessary permissions
- **Requirements:**
  - Welcome screens explaining core features (3-4 screens max)
  - Camera permission request with clear explanation
  - Photo library permission request
  - Skip option for returning users
  - Accessibility settings introduction
- **Acceptance Criteria:**
  - Onboarding completes in < 60 seconds
  - Permissions are requested with context
  - User can skip onboarding after first launch

#### 2.1.2 Home Screen
- **User Story:** As a user, I want quick access to my main actions: scan, import, and view my library
- **Requirements:**
  - Large, clear action buttons for:
    - "Scan Document" (camera icon)
    - "Import PDF/Photo" (upload icon)
    - "My Library" (folder icon)
  - Recent study packs preview (last 3)
  - Settings access (gear icon)
  - High contrast, dyslexia-friendly design
- **Acceptance Criteria:**
  - All buttons are touch-target compliant (min 44x44pt)
  - Icons are clear and labeled
  - Navigation is intuitive for children

#### 2.1.3 Document Scanning
- **User Story:** As a user, I want to capture clear photos of documents using my camera
- **Requirements:**
  - Camera view with edge detection overlay
  - Auto-capture when document edges detected (with manual override)
  - Flash toggle
  - Crop/adjust captured image
  - Retake option
  - Visual feedback for successful capture
- **Acceptance Criteria:**
  - Edge detection works in various lighting conditions
  - Captured images are clear and readable
  - User can adjust crop before proceeding

#### 2.1.4 Multi-Page Scanning
- **User Story:** As a user, I want to scan multiple pages into a single study pack
- **Requirements:**
  - "Add Another Page" button after each capture
  - Page counter display
  - Thumbnail preview of captured pages
  - Reorder pages (drag and drop)
  - Delete individual pages
  - "Done" button to proceed to OCR
- **Acceptance Criteria:**
  - Can scan up to 50 pages per study pack
  - Page order can be adjusted before OCR
  - Clear visual feedback for page count

#### 2.1.5 Cloud OCR Processing
- **User Story:** As a user, I want my scanned documents converted to text automatically
- **Requirements:**
  - Upload images to Google Vision API
  - Progress indicator during OCR
  - Error handling with retry option
  - Text extraction with layout preservation
  - Language detection (English primary, expandable)
  - Store extracted text with page metadata
- **Acceptance Criteria:**
  - OCR completes in < 30 seconds for single page
  - Accuracy > 95% for clear documents
  - Graceful error handling with user-friendly messages

#### 2.1.6 Reader View with TTS
- **User Story:** As a user, I want to read and listen to my documents with synchronized highlighting
- **Requirements:**
  - Clean, distraction-free reading interface
  - Text-to-speech playback with word-level highlighting
  - Sentence-level highlighting option
  - Playback controls:
    - Play/Pause (large button)
    - Speed control (0.5x - 2.0x)
    - Voice selection (male/female, accent options)
    - Skip forward/backward by sentence
    - Repeat current sentence
  - Progress indicator (% complete)
  - Auto-scroll to follow playback
- **Acceptance Criteria:**
  - TTS starts within 2 seconds of pressing play
  - Highlighting is synchronized with audio
  - Controls are accessible and responsive
  - Playback state persists across app sessions

#### 2.1.7 Text Customization
- **User Story:** As a user with dyslexia, I want to customize how text appears to make it easier to read
- **Requirements:**
  - Font selection:
    - OpenDyslexic (default)
    - Comic Sans
    - Arial
    - Verdana
  - Font size: 12pt - 32pt (slider)
  - Line spacing: 1.0x - 2.5x
  - Letter spacing: Normal, Wide, Extra Wide
  - Background themes:
    - Light (cream background)
    - Dark (dark gray background)
    - High Contrast (black on yellow)
    - Sepia
  - Preview changes in real-time
- **Acceptance Criteria:**
  - Settings apply immediately
  - Settings persist across sessions
  - All combinations are readable

#### 2.1.8 Library Management
- **User Story:** As a user, I want to organize and find my study packs easily
- **Requirements:**
  - Grid/list view toggle
  - Study pack cards showing:
    - Title (editable)
    - Thumbnail (first page)
    - Date created
    - Page count
    - Progress indicator
  - Search functionality (by title)
  - Sort options:
    - Recent
    - Alphabetical
    - Progress
  - Delete study packs (with confirmation)
  - Rename study packs
- **Acceptance Criteria:**
  - Library loads in < 2 seconds
  - Search returns results instantly
  - Deletion requires confirmation

### 2.2 V1 AI Features (Phase 2)

#### 2.2.1 Explain Tab
- **User Story:** As a user, I want AI to explain difficult concepts in simpler terms
- **Requirements:**
  - Three explanation levels:
    - **Simple:** Age-appropriate, clear language
    - **Very Simple:** ELI5 (Explain Like I'm 5) style
    - **Exam-Ready:** Detailed, comprehensive for test prep
  - Select text to explain (long-press)
  - Explain entire page option
  - Explanation appears in modal/side panel
  - Save explanations to study pack
  - Text-to-speech for explanations
- **Acceptance Criteria:**
  - Explanations generate in < 10 seconds
  - Language is appropriate for selected level
  - Explanations are factually accurate
  - User can switch between levels easily

#### 2.2.2 Podcast Tab
- **User Story:** As a user, I want to listen to my study material as an engaging conversation
- **Requirements:**
  - Generate two-speaker podcast script from content
  - Speakers:
    - Host (enthusiastic teacher)
    - Student (curious learner asking questions)
  - Script includes:
    - Introduction to topic
    - Key concepts explained conversationally
    - Examples and analogies
    - Summary and takeaways
  - Generate audio from script (different voices for each speaker)
  - Playback controls (play, pause, skip, speed)
  - Download podcast for offline listening
  - Transcript view with highlighting
- **Acceptance Criteria:**
  - Podcast script generates in < 30 seconds
  - Audio generates in < 60 seconds
  - Conversation is natural and engaging
  - Audio quality is clear and professional

#### 2.2.3 Study Tools - Summaries
- **User Story:** As a user, I want concise summaries of my study material
- **Requirements:**
  - Generate summary at three lengths:
    - Brief (2-3 sentences)
    - Standard (1 paragraph)
    - Detailed (multiple paragraphs with sections)
  - Bullet-point format option
  - Highlight key facts
  - TTS playback of summary
  - Export summary (text, PDF)
- **Acceptance Criteria:**
  - Summary captures main ideas accurately
  - Length matches selected option
  - Summary is coherent and well-structured

#### 2.2.4 Study Tools - Key Terms & Glossary
- **User Story:** As a user, I want to understand important vocabulary in my study material
- **Requirements:**
  - Auto-extract key terms from content
  - Generate definitions for each term
  - Alphabetical glossary view
  - Search within glossary
  - Tap term to see definition
  - TTS for terms and definitions
  - Quiz mode: match terms to definitions
- **Acceptance Criteria:**
  - Identifies 10-20 key terms per page
  - Definitions are accurate and age-appropriate
  - Glossary is easy to navigate

#### 2.2.5 Study Tools - Flashcards
- **User Story:** As a user, I want to practice with flashcards generated from my content
- **Requirements:**
  - Auto-generate flashcards (question/answer pairs)
  - Swipe to flip card
  - Mark as "Know" or "Review"
  - Shuffle deck
  - Progress tracking (% mastered)
  - Spaced repetition algorithm (future)
  - TTS for questions and answers
- **Acceptance Criteria:**
  - Generates 10-15 flashcards per page
  - Questions are clear and answerable
  - Answers are concise and correct
  - Swipe gestures are smooth

#### 2.2.6 Study Tools - Quizzes
- **User Story:** As a user, I want to test my understanding with quizzes
- **Requirements:**
  - Two quiz types:
    - Multiple Choice (4 options)
    - Short Answer (text input)
  - Generate 5-10 questions per study pack
  - Immediate feedback (correct/incorrect)
  - Explanations for incorrect answers
  - Score tracking (% correct)
  - Review incorrect answers
  - Retake quiz option
- **Acceptance Criteria:**
  - Questions are relevant to content
  - Difficulty is appropriate
  - Feedback is constructive
  - Quiz completes in 5-10 minutes

#### 2.2.7 Check My Understanding
- **User Story:** As a user, I want to have a conversation with AI to test my knowledge
- **Requirements:**
  - Interactive chat interface
  - AI asks follow-up questions based on content
  - User responds via text or voice
  - AI provides feedback and guidance
  - Socratic method approach (leading questions)
  - Session summary with strengths/areas to review
- **Acceptance Criteria:**
  - Conversation feels natural
  - AI adapts to user's level
  - Feedback is encouraging and constructive
  - Session lasts 5-15 minutes

### 2.3 Advanced Features (Phase 3)

#### 2.3.1 Demo Mode
- **User Story:** As a new user, I want to try Auri without scanning my own documents
- **Requirements:**
  - Pre-loaded sample study packs (3-5)
  - Topics: Science, History, Math
  - All features enabled (Read, Explain, Podcast, Study Tools)
  - "Try Demo" button on home screen
  - Clear indication that content is sample
  - Option to delete demo content
- **Acceptance Criteria:**
  - Demo content is high-quality and engaging
  - All features work with demo content
  - User can easily exit demo mode

#### 2.3.2 Advanced Testing
- **Requirements:**
  - Unit tests for all services and utilities
  - Integration tests for critical flows
  - Accessibility tests (VoiceOver, Dynamic Type)
  - Performance tests (OCR, TTS, AI generation)
  - End-to-end tests for main user journeys
- **Acceptance Criteria:**
  - Test coverage > 80%
  - All critical paths tested
  - CI/CD pipeline runs tests automatically

#### 2.3.3 Enhanced Multi-Page Support
- **Requirements:**
  - Table of contents generation
  - Chapter/section detection
  - Jump to page/section
  - Bookmarks
  - Notes and annotations
- **Acceptance Criteria:**
  - TOC is accurate for structured documents
  - Navigation is fast and intuitive

---

## 3. Technical Architecture

### 3.1 Technology Stack

#### 3.1.1 Core Framework
- **React Native:** Cross-platform mobile development
- **Expo:** Managed workflow for faster development
  - Expo SDK 52+
  - Expo Router for navigation
  - Expo Camera for document scanning
  - Expo AV for audio playback
  - Expo FileSystem for local storage
  - Expo SecureStore for API keys

#### 3.1.2 Language & Tooling
- **TypeScript:** Type-safe development
- **ESLint + Prettier:** Code quality and formatting
- **Jest:** Unit testing
- **Detox:** End-to-end testing (future)

#### 3.1.3 State Management
- **React Context + Hooks:** For simple state
- **Zustand or Redux Toolkit:** For complex state (if needed)
- **React Query:** For server state and caching

#### 3.1.4 Local Storage
- **AsyncStorage:** For settings and preferences
- **SQLite (expo-sqlite):** For study packs and structured data
- **FileSystem:** For images and audio files

#### 3.1.5 UI Components
- **React Native Paper or NativeBase:** Component library
- **Custom components:** For dyslexia-friendly design
- **React Native Reanimated:** For smooth animations
- **React Native Gesture Handler:** For swipe gestures

### 3.2 Architecture Pattern

#### 3.2.1 MVVM-Like Structure
```
src/
├── app/                    # Expo Router screens
│   ├── (tabs)/            # Tab navigation
│   ├── onboarding/        # Onboarding flow
│   ├── reader/            # Reader view
│   └── _layout.tsx        # Root layout
├── components/            # Reusable UI components
│   ├── common/           # Buttons, inputs, etc.
│   ├── reader/           # Reader-specific components
│   └── library/          # Library-specific components
├── services/             # Business logic & API calls
│   ├── ocr/             # OCR service abstraction
│   ├── tts/             # TTS service abstraction
│   ├── ai/              # AI/LLM service abstraction
│   └── storage/         # Local storage service
├── models/              # Data models & types
│   ├── StudyPack.ts
│   ├── Page.ts
│   └── Settings.ts
├── hooks/               # Custom React hooks
│   ├── useStudyPacks.ts
│   ├── useTTS.ts
│   └── useOCR.ts
├── utils/               # Helper functions
│   ├── imageProcessing.ts
│   ├── textProcessing.ts
│   └── accessibility.ts
├── constants/           # App constants
│   ├── Colors.ts
│   ├── Fonts.ts
│   └── Config.ts
└── __tests__/          # Test files
```

#### 3.2.2 Service Abstraction Pattern
All external services (OCR, TTS, AI) use a provider-agnostic interface:

```typescript
// Example: TTS Service
interface TTSProvider {
  synthesize(text: string, options: TTSOptions): Promise<AudioFile>;
  getVoices(): Promise<Voice[]>;
}

class TTSService {
  private provider: TTSProvider;
  
  constructor(provider: TTSProvider) {
    this.provider = provider;
  }
  
  async speak(text: string, options: TTSOptions) {
    return this.provider.synthesize(text, options);
  }
}

// Implementations
class ElevenLabsProvider implements TTSProvider { ... }
class GoogleTTSProvider implements TTSProvider { ... }
class AzureTTSProvider implements TTSProvider { ... }
```

### 3.3 Data Flow

#### 3.3.1 Scan → OCR → Storage Flow
```
User captures image
  → ImageProcessingService (crop, enhance)
  → OCRService.extractText(image)
  → Google Vision API
  → Parse response
  → Create Page model
  → StorageService.savePage(page)
  → SQLite + FileSystem
  → Update UI
```

#### 3.3.2 Read Aloud Flow
```
User opens reader
  → Load StudyPack from storage
  → Display text with formatting
User presses play
  → TTSService.speak(text, options)
  → Generate/retrieve audio
  → AudioPlayer.play()
  → Sync highlighting with playback
  → Update progress
```

#### 3.3.3 AI Feature Flow
```
User requests explanation
  → AIService.explain(text, level)
  → OpenAI API (or alternative)
  → Parse response
  → Display in UI
  → Option to save
  → StorageService.saveExplanation()
```

### 3.4 Offline Considerations

#### 3.4.1 MVP (Online-First)
- OCR requires internet connection
- TTS requires internet connection (or uses device TTS as fallback)
- AI features require internet connection
- Library and reader work offline once content is processed

#### 3.4.2 Future (Offline-Capable)
- On-device OCR (ML Kit, Tesseract)
- On-device TTS (iOS native)
- Cached AI responses
- Download study packs for full offline access

---

## 4. Phased Implementation Plan

### Phase 1: Core Learning Loop (MVP)
**Timeline:** 6-8 weeks  
**Goal:** Users can scan, read, and listen to documents

#### Milestones
1. **Week 1-2: Project Setup & Onboarding**
   - Initialize Expo project with TypeScript
   - Set up folder structure and architecture
   - Implement onboarding flow
   - Configure permissions (camera, photo library)
   - Set up navigation (Expo Router)

2. **Week 3-4: Scanning & OCR**
   - Implement camera view with edge detection
   - Build multi-page scanning flow
   - Integrate Google Vision API
   - Implement image processing utilities
   - Build progress indicators and error handling

3. **Week 5-6: Reader & TTS**
   - Build reader view with text rendering
   - Implement text customization (fonts, spacing, themes)
   - Integrate TTS service (ElevenLabs or Google)
   - Build playback controls
   - Implement word/sentence highlighting
   - Sync audio with text

4. **Week 7-8: Library & Storage**
   - Set up SQLite database
   - Implement storage service
   - Build library view (grid/list)
   - Implement search and sort
   - Add edit/delete functionality
   - Polish UI and fix bugs

#### Deliverables
- Working app with core features
- Users can scan → OCR → read → listen
- Local storage of study packs
- Basic accessibility features

### Phase 2: AI Study Features
**Timeline:** 6-8 weeks  
**Goal:** Add AI-powered learning tools

#### Milestones
1. **Week 1-2: AI Service Setup & Explain Feature**
   - Set up OpenAI API integration
   - Build AI service abstraction
   - Implement Explain tab with 3 levels
   - Add text selection for explanations
   - Implement explanation storage

2. **Week 3-4: Podcast Generation**
   - Build podcast script generation
   - Implement two-speaker conversation logic
   - Integrate audio generation for multiple voices
   - Build podcast player UI
   - Add transcript view with highlighting

3. **Week 5-6: Study Tools (Summaries, Glossary, Flashcards)**
   - Implement summary generation (3 lengths)
   - Build key terms extraction and glossary
   - Create flashcard generation and UI
   - Implement swipe gestures
   - Add progress tracking

4. **Week 7-8: Study Tools (Quizzes, Check Understanding)**
   - Build quiz generation (MCQ + short answer)
   - Implement quiz UI and scoring
   - Create "Check My Understanding" chat interface
   - Add voice input for chat
   - Polish AI features and fix bugs

#### Deliverables
- Full AI feature set
- Explain, Podcast, Study Tools tabs
- Interactive learning modes
- Enhanced engagement and comprehension

### Phase 3: Advanced Features & Polish
**Timeline:** 4-6 weeks  
**Goal:** Production-ready app with demo mode and comprehensive testing

#### Milestones
1. **Week 1-2: Demo Mode & Sample Content**
   - Create 3-5 high-quality sample study packs
   - Implement demo mode toggle
   - Pre-generate AI content for demos
   - Add demo indicators and exit flow

2. **Week 3-4: Advanced Testing**
   - Write unit tests for services
   - Write integration tests for critical flows
   - Implement accessibility tests
   - Set up CI/CD pipeline
   - Performance testing and optimization

3. **Week 5-6: Polish & Launch Prep**
   - UI/UX refinements
   - Accessibility audit and fixes
   - Performance optimization
   - Bug fixes
   - App Store preparation (screenshots, description)
   - Beta testing with real users

#### Deliverables
- Production-ready app
- Comprehensive test coverage
- Demo mode for new users
- App Store submission

---

## 5. API Integration Requirements

### 5.1 Google Vision API (OCR)

#### 5.1.1 Setup Instructions
1. Create Google Cloud Project
2. Enable Cloud Vision API
3. Create API key or service account
4. Set up billing (free tier: 1000 requests/month)

#### 5.1.2 Integration Details
- **Endpoint:** `https://vision.googleapis.com/v1/images:annotate`
- **Method:** POST
- **Request Format:**
  ```json
  {
    "requests": [{
      "image": {
        "content": "base64_encoded_image"
      },
      "features": [{
        "type": "DOCUMENT_TEXT_DETECTION"
      }]
    }]
  }
  ```
- **Response:** Full text annotation with bounding boxes
- **Rate Limits:** 1800 requests/minute
- **Cost:** $1.50 per 1000 images (after free tier)

#### 5.1.3 Error Handling
- Network errors: Retry with exponential backoff
- Invalid image: Show user-friendly error, allow retake
- Rate limit: Queue requests, show progress
- API key issues: Guide user to settings

### 5.2 Text-to-Speech Services

#### 5.2.1 Option A: ElevenLabs (Recommended)
- **Pros:** High-quality, natural voices; emotion control
- **Cons:** More expensive, requires account
- **Setup:**
  1. Create ElevenLabs account
  2. Get API key from dashboard
  3. Choose voices (2-3 for variety)
- **Endpoint:** `https://api.elevenlabs.io/v1/text-to-speech/{voice_id}`
- **Cost:** $5/month for 30,000 characters (Starter plan)

#### 5.2.2 Option B: Google Cloud TTS
- **Pros:** Affordable, reliable, many languages
- **Cons:** Less natural than ElevenLabs
- **Setup:**
  1. Enable Cloud Text-to-Speech API in Google Cloud
  2. Use same API key as Vision API
- **Endpoint:** `https://texttospeech.googleapis.com/v1/text:synthesize`
- **Cost:** $4 per 1 million characters (Standard voices)

#### 5.2.3 Option C: Azure Cognitive Services
- **Pros:** High quality, good language support
- **Cons:** Complex setup, Microsoft ecosystem
- **Setup:**
  1. Create Azure account
  2. Create Speech resource
  3. Get subscription key and region
- **Endpoint:** `https://{region}.tts.speech.microsoft.com/cognitiveservices/v1`
- **Cost:** $4 per 1 million characters

#### 5.2.4 Fallback: iOS Native TTS
- **Pros:** Free, offline, built-in
- **Cons:** Lower quality, less control
- **Implementation:** Use `expo-speech` or `react-native-tts`

### 5.3 AI/LLM Services

#### 5.3.1 Option A: OpenAI (Recommended)
- **Model:** GPT-4o-mini (cost-effective) or GPT-4o (higher quality)
- **Setup:**
  1. Create OpenAI account
  2. Get API key from dashboard
  3. Set up billing
- **Endpoint:** `https://api.openai.com/v1/chat/completions`
- **Cost:**
  - GPT-4o-mini: $0.15 per 1M input tokens, $0.60 per 1M output tokens
  - GPT-4o: $2.50 per 1M input tokens, $10 per 1M output tokens
- **Rate Limits:** Tier-based (start at 500 requests/day)

#### 5.3.2 Option B: Anthropic Claude
- **Model:** Claude 3.5 Sonnet or Haiku
- **Setup:**
  1. Create Anthropic account
  2. Get API key
- **Endpoint:** `https://api.anthropic.com/v1/messages`
- **Cost:**
  - Haiku: $0.25 per 1M input tokens, $1.25 per 1M output tokens
  - Sonnet: $3 per 1M input tokens, $15 per 1M output tokens

#### 5.3.3 Option C: Google Gemini
- **Model:** Gemini 1.5 Flash or Pro
- **Setup:**
  1. Enable Gemini API in Google Cloud
  2. Use API key
- **Endpoint:** `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent`
- **Cost:** Free tier available, then $0.35-$1.25 per 1M tokens

#### 5.3.4 Service Abstraction
Implement provider-agnostic interface to easily switch between services:
```typescript
interface AIProvider {
  generateText(prompt: string, options: AIOptions): Promise<string>;
  generateStructured<T>(prompt: string, schema: Schema): Promise<T>;
}
```

### 5.4 API Key Management

#### 5.4.1 Storage
- Use Expo SecureStore for API keys
- Never commit keys to version control
- Use environment variables for development

#### 5.4.2 User Configuration
- Allow users to bring their own API keys (advanced setting)
- Provide default keys for demo/trial (with rate limits)
- Guide users through API setup if needed

#### 5.4.3 Security
- Validate API keys before storing
- Encrypt keys at rest
- Use HTTPS for all API calls
- Implement request signing where supported

---

## 6. User Experience Design

### 6.1 Screen Flows

#### 6.1.1 First-Time User Flow
```
App Launch
  → Onboarding Screen 1: Welcome to Auri
  → Onboarding Screen 2: How It Works (Scan → Read → Learn)
  → Onboarding Screen 3: Accessibility Features
  → Permission Request: Camera
  → Permission Request: Photo Library
  → Home Screen
  → Demo Mode Prompt (optional)
```

#### 6.1.2 Scan & Create Flow
```
Home Screen
  → Tap "Scan Document"
  → Camera View
  → Capture Page 1
  → Preview & Crop
  → "Add Another Page" or "Done"
  → (If add) Capture Page 2, repeat
  → (If done) Processing Screen (OCR)
  → Name Your Study Pack
  → Reader View (auto-open)
```

#### 6.1.3 Reader Flow
```
Library
  → Tap Study Pack
  → Reader View (Read tab)
  → Tap Play
  → TTS playback with highlighting
  → Adjust settings (speed, voice, font)
  → Switch to Explain tab
  → Select text → Choose level → View explanation
  → Switch to Podcast tab
  → Generate podcast → Listen
  → Switch to Study Tools tab
  → Choose tool (Summary, Flashcards, Quiz)
  → Complete activity
  → Return to Library
```

### 6.2 Navigation Structure

#### 6.2.1 Tab Navigation (Home Level)
- **Home:** Main actions (Scan, Import, Library)
- **Library:** All study packs
- **Settings:** App preferences

#### 6.2.2 Reader Navigation (Study Pack Level)
- **Read:** Main reading view with TTS
- **Explain:** AI explanations
- **Podcast:** Generated audio conversation
- **Study Tools:** Summaries, Glossary, Flashcards, Quizzes

### 6.3 Accessibility Requirements

#### 6.3.1 Dyslexia-Friendly Design
- **Fonts:**
  - OpenDyslexic as default
  - Sans-serif alternatives (Comic Sans, Arial, Verdana)
  - No serif fonts
- **Spacing:**
  - Generous line spacing (1.5x minimum)
  - Letter spacing options
  - Wide margins
- **Colors:**
  - High contrast options
  - Avoid pure white backgrounds (use cream/off-white)
  - Color-blind friendly palette
- **Layout:**
  - Left-aligned text (no justified)
  - Short line lengths (50-70 characters)
  - Clear visual hierarchy

#### 6.3.2 iOS Accessibility Features
- **VoiceOver:** Full support for screen reader
- **Dynamic Type:** Respect system font size settings
- **Reduce Motion:** Disable animations if requested
- **Increase Contrast:** Enhanced contrast mode
- **Button Shapes:** Clear button boundaries

#### 6.3.3 Touch Targets
- Minimum 44x44pt for all interactive elements
- Adequate spacing between buttons (8pt minimum)
- Large, easy-to-tap controls

#### 6.3.4 Feedback
- Visual feedback for all interactions
- Haptic feedback for important actions
- Audio feedback for errors and success

### 6.4 Design System

#### 6.4.1 Color Palette
```typescript
const Colors = {
  // Primary
  primary: '#4A90E2',      // Calm blue
  primaryDark: '#2E5C8A',
  primaryLight: '#7AB8F5',
  
  // Backgrounds
  bgLight: '#FFF8E7',      // Cream
  bgDark: '#2C2C2E',       // Dark gray
  bgHighContrast: '#FFFF00', // Yellow
  
  // Text
  textPrimary: '#1C1C1E',
  textSecondary: '#6C6C70',
  textInverse: '#FFFFFF',
  
  // Semantic
  success: '#34C759',
  error: '#FF3B30',
  warning: '#FF9500',
  info: '#5AC8FA',
  
  // Highlighting
  highlightWord: '#FFD700',    // Gold
  highlightSentence: '#87CEEB', // Sky blue
};
```

#### 6.4.2 Typography
```typescript
const Typography = {
  // Fonts
  fontFamily: {
    dyslexic: 'OpenDyslexic',
    comicSans: 'Comic Sans MS',
    arial: 'Arial',
    verdana: 'Verdana',
  },
  
  // Sizes
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
  },
  
  // Weights
  fontWeight: {
    regular: '400',
    medium: '500',
    bold: '700',
  },
};
```

#### 6.4.3 Spacing
```typescript
const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};
```

### 6.5 iPad Optimization

#### 6.5.1 Layout Adaptations
- **Split View:** Reader on left, tools on right
- **Slide Over:** Quick access to library while reading
- **Multitasking:** Support for side-by-side apps
- **Keyboard Shortcuts:** Common actions (play/pause, next/prev)

#### 6.5.2 Larger Screen Utilization
- Multi-column layouts where appropriate
- Larger touch targets (more generous spacing)
- Side-by-side comparison views
- Picture-in-picture for podcast playback

---

## 7. Data Models

### 7.1 StudyPack Model

```typescript
interface StudyPack {
  id: string;                    // UUID
  title: string;                 // User-editable
  createdAt: Date;
  updatedAt: Date;
  pages: Page[];                 // Array of pages
  thumbnailUri: string;          // First page thumbnail
  progress: number;              // 0-100, reading progress
  settings: ReaderSettings;      // User preferences for this pack
  metadata: {
    totalWords: number;
    estimatedReadTime: number;   // Minutes
    language: string;            // ISO 639-1 code
    subject?: string;            // Optional categorization
  };
  aiContent?: {
    summaries?: Summary[];
    glossary?: GlossaryTerm[];
    flashcards?: Flashcard[];
    quizzes?: Quiz[];
    podcast?: Podcast;
  };
}
```

### 7.2 Page Model

```typescript
interface Page {
  id: string;                    // UUID
  studyPackId: string;           // Foreign key
  pageNumber: number;            // 1-indexed
  imageUri: string;              // Local file path
  text: string;                  // Extracted text
  textBlocks: TextBlock[];       // Structured text with positions
  ocrMetadata: {
    confidence: number;          // 0-1
    language: string;
    processedAt: Date;
  };
  audioUri?: string;             // TTS audio file path
  annotations?: Annotation[];    // User notes/highlights
}

interface TextBlock {
  id: string;
  text: string;
  boundingBox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  confidence: number;
  type: 'paragraph' | 'heading' | 'list' | 'caption';
}

interface Annotation {
  id: string;
  type: 'highlight' | 'note' | 'bookmark';
  text: string;                  // Selected text
  position: {
    start: number;               // Character index
    end: number;
  };
  note?: string;                 // User's note
  createdAt: Date;
}
```

### 7.3 Settings Model

```typescript
interface AppSettings {
  // Appearance
  theme: 'light' | 'dark' | 'highContrast' | 'sepia';
  fontFamily: 'openDyslexic' | 'comicSans' | 'arial' | 'verdana';
  fontSize: number;              // 12-32
  lineSpacing: number;           // 1.0-2.5
  letterSpacing: 'normal' | 'wide' | 'extraWide';
  
  // TTS
  ttsVoice: string;              // Voice ID
  ttsSpeed: number;              // 0.5-2.0
  ttsHighlightMode: 'word' | 'sentence' | 'both';
  ttsAutoScroll: boolean;
  
  // AI
  aiProvider: 'openai' | 'anthropic' | 'google';
  defaultExplanationLevel: 'simple' | 'verySimple' | 'examReady';
  
  // Privacy
  saveHistory: boolean;
  analyticsEnabled: boolean;
  
  // Accessibility
  reduceMotion: boolean;
  hapticFeedback: boolean;
  
  // API Keys (stored in SecureStore, not here)
  hasOCRKey: boolean;
  hasTTSKey: boolean;
  hasAIKey: boolean;
}

interface ReaderSettings {
  // Per-study-pack overrides
  fontFamily?: string;
  fontSize?: number;
  theme?: string;
  lastPosition?: {
    pageNumber: number;
    characterIndex: number;
  };
}
```

### 7.4 AI Content Models

```typescript
interface Summary {
  id: string;
  studyPackId: string;
  length: 'brief' | 'standard' | 'detailed';
  text: string;
  bulletPoints?: string[];
  generatedAt: Date;
}

interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  context?: string;              // Sentence where term appears
  pageNumber: number;
}

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  mastered: boolean;
  lastReviewed?: Date;
  reviewCount: number;
}

interface Quiz {
  id: string;
  studyPackId: string;
  questions: QuizQuestion[];
  attempts: QuizAttempt[];
  createdAt: Date;
}

interface QuizQuestion {
  id: string;
  type: 'multipleChoice' | 'shortAnswer';
  question: string;
  options?: string[];            // For MCQ
  correctAnswer: string;
  explanation: string;           // Why this is correct
}

interface QuizAttempt {
  id: string;
  startedAt: Date;
  completedAt?: Date;
  answers: {
    questionId: string;
    userAnswer: string;
    correct: boolean;
  }[];
  score: number;                 // Percentage
}

interface Podcast {
  id: string;
  studyPackId: string;
  script: PodcastScript;
  audioUri: string;              // Generated audio file
  duration: number;              // Seconds
  generatedAt: Date;
}

interface PodcastScript {
  title: string;
  speakers: {
    host: string;                // Name
    student: string;
  };
  segments: PodcastSegment[];
}

interface PodcastSegment {
  speaker: 'host' | 'student';
  text: string;
  timestamp: number;             // Start time in seconds
}
```

### 7.5 Database Schema (SQLite)

```sql
-- Study Packs
CREATE TABLE study_packs (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  thumbnail_uri TEXT,
  progress REAL DEFAULT 0,
  settings TEXT,                 -- JSON
  metadata TEXT,                 -- JSON
  ai_content TEXT                -- JSON
);

-- Pages
CREATE TABLE pages (
  id TEXT PRIMARY KEY,
  study_pack_id TEXT NOT NULL,
  page_number INTEGER NOT NULL,
  image_uri TEXT NOT NULL,
  text TEXT NOT NULL,
  text_blocks TEXT,              -- JSON
  ocr_metadata TEXT,             -- JSON
  audio_uri TEXT,
  annotations TEXT,              -- JSON
  FOREIGN KEY (study_pack_id) REFERENCES study_packs(id) ON DELETE CASCADE
);

-- Settings
CREATE TABLE settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

-- Indexes
CREATE INDEX idx_pages_study_pack ON pages(study_pack_id);
CREATE INDEX idx_study_packs_updated ON study_packs(updated_at DESC);
```

---

## 8. Testing Strategy

### 8.1 Unit Tests

#### 8.1.1 Services
- **OCRService:**
  - Test image preprocessing
  - Test API request formatting
  - Test response parsing
  - Test error handling
  - Mock API responses

- **TTSService:**
  - Test text chunking (for long texts)
  - Test audio generation
  - Test voice selection
  - Test speed adjustment
  - Mock API responses

- **AIService:**
  - Test prompt generation
  - Test response parsing
  - Test different explanation levels
  - Test structured output (flashcards, quizzes)
  - Mock API responses

- **StorageService:**
  - Test CRUD operations
  - Test data serialization/deserialization
  - Test migrations
  - Test error handling

#### 8.1.2 Utilities
- **imageProcessing:**
  - Test crop/resize functions
  - Test format conversions
  - Test compression

- **textProcessing:**
  - Test text cleaning
  - Test sentence splitting
  - Test word counting

- **accessibility:**
  - Test font size calculations
  - Test contrast ratios
  - Test touch target sizing

#### 8.1.3 Example Test
```typescript
describe('OCRService', () => {
  it('should extract text from image', async () => {
    const mockImage = 'base64_image_data';
    const mockResponse = { text: 'Hello World' };
    
    jest.spyOn(OCRService, 'callAPI').mockResolvedValue(mockResponse);
    
    const result = await OCRService.extractText(mockImage);
    
    expect(result.text).toBe('Hello World');
    expect(result.confidence).toBeGreaterThan(0.9);
  });
  
  it('should handle API errors gracefully', async () => {
    jest.spyOn(OCRService, 'callAPI').mockRejectedValue(new Error('API Error'));
    
    await expect(OCRService.extractText('invalid')).rejects.toThrow();
  });
});
```

### 8.2 Integration Tests

#### 8.2.1 Critical Flows
- **Scan to Read Flow:**
  - Capture image → OCR → Save → Display in reader
  - Verify data persistence
  - Verify UI updates

- **TTS Playback Flow:**
  - Load study pack → Start playback → Verify highlighting
  - Test pause/resume
  - Test speed changes

- **AI Generation Flow:**
  - Request explanation → Verify response → Save → Display
  - Test different levels
  - Test error states

#### 8.2.2 Example Integration Test
```typescript
describe('Scan to Read Flow', () => {
  it('should complete full flow from scan to reader', async () => {
    // 1. Capture image
    const image = await captureTestImage();
    expect(image).toBeDefined();
    
    // 2. Process OCR
    const page = await OCRService.extractText(image);
    expect(page.text).toContain('expected text');
    
    // 3. Save study pack
    const studyPack = await StorageService.createStudyPack({
      title: 'Test Pack',
      pages: [page],
    });
    expect(studyPack.id).toBeDefined();
    
    // 4. Load in reader
    const loaded = await StorageService.getStudyPack(studyPack.id);
    expect(loaded.pages).toHaveLength(1);
    expect(loaded.pages[0].text).toBe(page.text);
  });
});
```

### 8.3 Accessibility Tests

#### 8.3.1 VoiceOver Support
- All interactive elements have labels
- Navigation order is logical
- Hints are provided where needed
- Custom components are accessible

#### 8.3.2 Dynamic Type
- Text scales correctly with system settings
- Layouts adapt to larger text
- No text truncation at large sizes

#### 8.3.3 Color Contrast
- All text meets WCAG AA standards (4.5:1 for normal text)
- Interactive elements are distinguishable
- High contrast mode is available

#### 8.3.4 Touch Targets
- All buttons are at least 44x44pt
- Adequate spacing between elements
- No accidental taps

#### 8.3.5 Example Accessibility Test
```typescript
describe('Accessibility', () => {
  it('should have proper accessibility labels', () => {
    const { getByLabelText } = render(<HomeScreen />);
    
    expect(getByLabelText('Scan Document')).toBeDefined();
    expect(getByLabelText('Import PDF or Photo')).toBeDefined();
    expect(getByLabelText('My Library')).toBeDefined();
  });
  
  it('should meet contrast requirements', () => {
    const bgColor = Colors.bgLight;
    const textColor = Colors.textPrimary;
    const contrast = calculateContrast(bgColor, textColor);
    
    expect(contrast).toBeGreaterThanOrEqual(4.5);
  });
});
```

### 8.4 Performance Tests

#### 8.4.1 Metrics to Track
- **OCR Processing Time:** < 30 seconds per page
- **TTS Generation Time:** < 5 seconds for first sentence
- **AI Response Time:** < 10 seconds for explanations
- **App Launch Time:** < 3 seconds
- **Library Load Time:** < 2 seconds
- **Memory Usage:** < 200MB typical, < 500MB peak

#### 8.4.2 Performance Testing Tools
- React Native Performance Monitor
- Flipper for debugging
- Xcode Instruments for iOS profiling

### 8.5 End-to-End Tests (Future)

#### 8.5.1 Tools
- Detox for React Native E2E testing
- Maestro as alternative

#### 8.5.2 Test Scenarios
- Complete onboarding flow
- Scan and create study pack
- Read and listen to content
- Generate AI content
- Complete quiz
- Search and manage library

---

## 9. Privacy & Security

### 9.1 Data Privacy Principles

#### 9.1.1 Local-First Architecture
- All user content stored locally by default
- No cloud sync in MVP (future opt-in feature)
- User owns their data completely

#### 9.1.2 Minimal Data Collection
- No analytics in MVP (future opt-in)
- No user accounts required
- No personal information collected
- No tracking or advertising

#### 9.1.3 Transparency
- Clear privacy policy
- Explain what data is sent to APIs (images for OCR, text for AI)
- User control over features that require internet

### 9.2 API Key Security

#### 9.2.1 Storage
- Use Expo SecureStore for API keys
- Keys are encrypted at rest
- Keys never logged or exposed in UI

#### 9.2.2 Transmission
- All API calls use HTTPS
- No keys in URL parameters
- Use Authorization headers

#### 9.2.3 User-Provided Keys
- Allow users to bring their own API keys
- Validate keys before storing
- Provide clear instructions for obtaining keys

### 9.3 Content Security

#### 9.3.1 Local Storage
- Study packs stored in app's private directory
- Not accessible to other apps
- Backed up to iCloud (user can disable)

#### 9.3.2 Image Handling
- Images compressed before storage
- Original images deleted after OCR (optional)
- No images sent to third parties except OCR service

#### 9.3.3 Text Content
- Text sent to AI services for processing
- No persistent storage on third-party servers
- User can review before sending

### 9.4 Compliance

#### 9.4.1 COPPA (Children's Online Privacy Protection Act)
- No collection of personal information from children under 13
- Parental consent mechanism if needed
- Age-appropriate content and interactions

#### 9.4.2 GDPR (General Data Protection Regulation)
- Right to access data (export feature)
- Right to deletion (delete study packs)
- Right to data portability
- Clear consent for data processing

#### 9.4.3 App Store Requirements
- Privacy nutrition label
- Data collection disclosure
- Third-party SDK disclosure

### 9.5 Security Best Practices

#### 9.5.1 Code Security
- No hardcoded secrets
- Input validation for all user inputs
- Sanitize text before display
- Secure random ID generation

#### 9.5.2 Dependency Management
- Regular updates for security patches
- Audit dependencies for vulnerabilities
- Minimize third-party dependencies

#### 9.5.3 Error Handling
- No sensitive information in error messages
- Graceful degradation
- User-friendly error messages

---

## 10. Task Breakdown

### 10.1 Phase 1 Tasks (MVP)

#### 10.1.1 Project Setup (Week 1)
- [ ] Initialize Expo project with TypeScript
- [ ] Set up folder structure (app, components, services, models, utils)
- [ ] Configure ESLint and Prettier
- [ ] Set up Git repository and .gitignore
- [ ] Install core dependencies (navigation, storage, UI library)
- [ ] Configure Expo Router
- [ ] Set up environment variables
- [ ] Create README with setup instructions

#### 10.1.2 Onboarding (Week 1)
- [ ] Design onboarding screens (3-4 screens)
- [ ] Implement onboarding navigation
- [ ] Add welcome screen with app overview
- [ ] Add "How It Works" screen with illustrations
- [ ] Add accessibility features screen
- [ ] Implement camera permission request
- [ ] Implement photo library permission request
- [ ] Add skip/done buttons
- [ ] Store onboarding completion flag
- [ ] Test onboarding flow

#### 10.1.3 Home Screen (Week 1-2)
- [ ] Design home screen layout
- [ ] Create large action buttons (Scan, Import, Library)
- [ ] Add icons and labels
- [ ] Implement navigation to camera
- [ ] Implement navigation to photo picker
- [ ] Implement navigation to library
- [ ] Add recent study packs preview
- [ ] Add settings button
- [ ] Ensure accessibility (labels, touch targets)
- [ ] Test on iPhone and iPad

#### 10.1.4 Camera & Scanning (Week 2-3)
- [ ] Set up Expo Camera
- [ ] Implement camera view UI
- [ ] Add edge detection (using vision library or custom)
- [ ] Implement auto-capture on edge detection
- [ ] Add manual capture button
- [ ] Add flash toggle
- [ ] Implement image preview screen
- [ ] Add crop/adjust functionality
- [ ] Add retake button
- [ ] Implement multi-page flow
- [ ] Add "Add Another Page" button
- [ ] Show page counter
- [ ] Display page thumbnails
- [ ] Implement reorder pages (drag and drop)
- [ ] Implement delete page
- [ ] Add "Done" button to proceed
- [ ] Test scanning in various lighting conditions

#### 10.1.5 OCR Integration (Week 3-4)
- [ ] Set up Google Cloud project
- [ ] Enable Vision API
- [ ] Create API key
- [ ] Implement OCR service abstraction
- [ ] Implement Google Vision provider
- [ ] Add image preprocessing (resize, compress)
- [ ] Implement API request formatting
- [ ] Implement response parsing
- [ ] Extract text and bounding boxes
- [ ] Handle multi-page OCR
- [ ] Add progress indicator UI
- [ ] Implement error handling
- [ ] Add retry mechanism
- [ ] Test with various document types
- [ ] Optimize for performance

#### 10.1.6 Storage Service (Week 4)
- [ ] Set up SQLite database
- [ ] Create database schema (study_packs, pages, settings)
- [ ] Implement StorageService class
- [ ] Add CRUD operations for study packs
- [ ] Add CRUD operations for pages
- [ ] Implement settings storage (AsyncStorage)
- [ ] Add data serialization/deserialization
- [ ] Implement file system operations (images, audio)
- [ ] Add database migrations support
- [ ] Test all storage operations
- [ ] Add error handling

#### 10.1.7 Reader View (Week 5-6)
- [ ] Design reader screen layout
- [ ] Implement text rendering with custom fonts
- [ ] Add font selection (OpenDyslexic, Comic Sans, Arial, Verdana)
- [ ] Add font size slider (12-32pt)
- [ ] Add line spacing control (1.0-2.5x)
- [ ] Add letter spacing control
- [ ] Implement theme switching (Light, Dark, High Contrast, Sepia)
- [ ] Add settings panel/modal
- [ ] Implement real-time preview of settings
- [ ] Save reader settings per study pack
- [ ] Add page navigation (swipe, buttons)
- [ ] Implement scroll position persistence
- [ ] Test with long documents
- [ ] Ensure accessibility

#### 10.1.8 TTS Integration (Week 5-6)
- [ ] Choose TTS provider (ElevenLabs, Google, or Azure)
- [ ] Set up TTS API account and key
- [ ] Implement TTS service abstraction
- [ ] Implement chosen TTS provider
- [ ] Add text chunking for long content
- [ ] Implement audio generation
- [ ] Add audio caching (save generated audio)
- [ ] Implement audio player
- [ ] Add playback controls UI (play, pause, stop)
- [ ] Add speed control (0.5x - 2.0x)
- [ ] Add voice selection
- [ ] Implement word-level highlighting
- [ ] Implement sentence-level highlighting
- [ ] Sync highlighting with audio playback
- [ ] Add skip forward/backward by sentence
- [ ] Add repeat sentence button
- [ ] Implement auto-scroll during playback
- [ ] Add progress indicator
- [ ] Save playback position
- [ ] Test with various text lengths
- [ ] Optimize for performance

#### 10.1.9 Library (Week 7-8)
- [ ] Design library screen layout
- [ ] Implement grid view
- [ ] Implement list view
- [ ] Add view toggle button
- [ ] Create study pack card component
- [ ] Display title, thumbnail, date, page count
- [ ] Add progress indicator to cards
- [ ] Implement search functionality
- [ ] Add search bar UI
- [ ] Implement sort options (Recent, Alphabetical, Progress)
- [ ] Add sort dropdown/menu
- [ ] Implement tap to open study pack
- [ ] Add long-press menu (Rename, Delete)
- [ ] Implement rename functionality
- [ ] Implement delete with confirmation
- [ ] Add empty state (no study packs)
- [ ] Test with many study packs (performance)
- [ ] Ensure accessibility

#### 10.1.10 Polish & Bug Fixes (Week 8)
- [ ] UI/UX review and refinements
- [ ] Fix any bugs found during testing
- [ ] Optimize performance
- [ ] Add loading states
- [ ] Add error states
- [ ] Improve error messages
- [ ] Test on multiple devices
- [ ] Test edge cases
- [ ] Accessibility audit
- [ ] Code review and refactoring

### 10.2 Phase 2 Tasks (AI Features)

#### 10.2.1 AI Service Setup (Week 1)
- [ ] Choose AI provider (OpenAI, Anthropic, or Google)
- [ ] Set up API account and key
- [ ] Implement AI service abstraction
- [ ] Implement chosen AI provider
- [ ] Add prompt templates
- [ ] Implement response parsing
- [ ] Add error handling
- [ ] Test API integration

#### 10.2.2 Explain Feature (Week 1-2)
- [ ] Design Explain tab UI
- [ ] Add tab navigation to reader
- [ ] Implement text selection (long-press)
- [ ] Add "Explain This" button
- [ ] Create explanation level selector (Simple, Very Simple, Exam-Ready)
- [ ] Implement prompt generation for each level
- [ ] Add "Explain Entire Page" option
- [ ] Display explanation in modal or panel
- [ ] Add TTS for explanations
- [ ] Implement save explanation
- [ ] Add loading state
- [ ] Add error handling
- [ ] Test with various text selections
- [ ] Optimize prompts for quality

#### 10.2.3 Podcast Generation (Week 3-4)
- [ ] Design Podcast tab UI
- [ ] Add Podcast tab to reader
- [ ] Implement podcast script generation prompt
- [ ] Parse script into segments (speaker, text)
- [ ] Implement two-voice audio generation
- [ ] Combine audio segments into single file
- [ ] Create podcast player UI
- [ ] Add playback controls
- [ ] Implement transcript view
- [ ] Add highlighting sync with audio
- [ ] Add download option
- [ ] Add loading state (script + audio)
- [ ] Add error handling
- [ ] Test with various content types
- [ ] Optimize for quality and engagement

#### 10.2.4 Study Tools - Summaries (Week 5)
- [ ] Design Study Tools tab UI
- [ ] Add Study Tools tab to reader
- [ ] Create summary generation prompt (3 lengths)
- [ ] Implement summary generation
- [ ] Display summary with length selector
- [ ] Add bullet-point format option
- [ ] Add TTS for summary
- [ ] Add export option (text, PDF)
- [ ] Add loading state
- [ ] Add error handling
- [ ] Test with various content

#### 10.2.5 Study Tools - Glossary (Week 5)
- [ ] Create key terms extraction prompt
- [ ] Implement glossary generation
- [ ] Design glossary UI (alphabetical list)
- [ ] Display terms with definitions
- [ ] Add search within glossary
- [ ] Add TTS for terms and definitions
- [ ] Implement quiz mode (match terms to definitions)
- [ ] Add loading state
- [ ] Test with various content

#### 10.2.6 Study Tools - Flashcards (Week 6)
- [ ] Create flashcard generation prompt
- [ ] Implement flashcard generation
- [ ] Design flashcard UI (swipeable cards)
- [ ] Implement swipe to flip
- [ ] Add "Know" and "Review" buttons
- [ ] Implement shuffle
- [ ] Add progress tracking
- [ ] Display progress indicator
- [ ] Add TTS for questions and answers
- [ ] Add loading state
- [ ] Test with various content

#### 10.2.7 Study Tools - Quizzes (Week 7)
- [ ] Create quiz generation prompt (MCQ + short answer)
- [ ] Implement quiz generation
- [ ] Design quiz UI
- [ ] Implement MCQ question display
- [ ] Implement short answer input
- [ ] Add submit button
- [ ] Implement immediate feedback
- [ ] Show correct/incorrect with explanations
- [ ] Add score tracking
- [ ] Implement review incorrect answers
- [ ] Add retake option
- [ ] Add loading state
- [ ] Test with various content

#### 10.2.8 Check My Understanding (Week 8)
- [ ] Design chat interface UI
- [ ] Implement chat message display
- [ ] Add text input for user responses
- [ ] Add voice input option
- [ ] Implement AI conversation logic (Socratic method)
- [ ] Generate follow-up questions based on responses
- [ ] Provide feedback and guidance
- [ ] Implement session summary
- [ ] Display strengths and areas to review
- [ ] Add loading states
- [ ] Test conversation flow

#### 10.2.9 Polish & Testing (Week 8)
- [ ] UI/UX review for all AI features
- [ ] Optimize prompts for quality
- [ ] Test all AI features thoroughly
- [ ] Fix bugs
- [ ] Improve error handling
- [ ] Add rate limiting if needed
- [ ] Performance optimization
- [ ] Accessibility audit

### 10.3 Phase 3 Tasks (Advanced Features)

#### 10.3.1 Demo Mode (Week 1-2)
- [ ] Create 3-5 high-quality sample documents
- [ ] Scan and process sample documents
- [ ] Pre-generate AI content for samples
- [ ] Implement demo mode toggle
- [ ] Add "Try Demo" button on home screen
- [ ] Load demo study packs
- [ ] Add demo indicators in UI
- [ ] Implement exit demo mode
- [ ] Add option to delete demo content
- [ ] Test demo flow

#### 10.3.2 Testing (Week 3-4)
- [ ] Write unit tests for OCR service
- [ ] Write unit tests for TTS service
- [ ] Write unit tests for AI service
- [ ] Write unit tests for storage service
- [ ] Write unit tests for utilities
- [ ] Write integration tests for scan flow
- [ ] Write integration tests for reader flow
- [ ] Write integration tests for AI features
- [ ] Write accessibility tests
- [ ] Set up CI/CD pipeline
- [ ] Configure automated testing
- [ ] Achieve 80%+ test coverage

#### 10.3.3 Performance Optimization (Week 4)
- [ ] Profile app performance
- [ ] Optimize OCR processing
- [ ] Optimize TTS generation
- [ ] Optimize AI requests
- [ ] Optimize image loading
- [ ] Optimize database queries
- [ ] Reduce memory usage
- [ ] Improve app launch time
- [ ] Test on older devices

#### 10.3.4 Polish & Launch Prep (Week 5-6)
- [ ] Final UI/UX review
- [ ] Fix all known bugs
- [ ] Accessibility audit and fixes
- [ ] Test on multiple devices
- [ ] Create app icon
- [ ] Create splash screen
- [ ] Write App Store description
- [ ] Create App Store screenshots
- [ ] Create demo video
- [ ] Write privacy policy
- [ ] Write terms of service
- [ ] Prepare for App Store submission
- [ ] Beta testing with real users
- [ ] Gather feedback and iterate
- [ ] Final QA pass
- [ ] Submit to App Store

---

## 11. Future Enhancements

### 11.1 Offline Mode

#### 11.1.1 On-Device OCR
- Integrate ML Kit or Tesseract for offline OCR
- Lower accuracy than cloud, but works without internet
- Fallback to cloud OCR when available

#### 11.1.2 On-Device TTS
- Use iOS native TTS (AVSpeechSynthesizer)
- Lower quality than cloud TTS, but works offline
- Fallback to cloud TTS when available

#### 11.1.3 Cached AI Responses
- Cache common explanations and study tools
- Pre-generate content when online
- Offline mode indicator in UI

### 11.2 Cloud Sync & Backup

#### 11.2.1 iCloud Sync
- Sync study packs across user's devices
- Automatic backup to iCloud
- Restore from backup

#### 11.2.2 Cross-Platform Sync (Future)
- Optional account creation
- Sync between iOS and Android (if Android version built)
- Web dashboard for managing study packs

### 11.3 Collaboration Features

#### 11.3.1 Sharing
- Share study packs with friends/classmates
- Export as PDF with annotations
- Share AI-generated content (summaries, flashcards)

#### 11.3.2 Teacher/Parent Dashboard
- Monitor student progress
- Assign study materials
- View quiz results
- Track engagement

### 11.4 Advanced AI Features

#### 11.4.1 Personalized Learning
- Adapt explanations to user's level
- Track topics user struggles with
- Suggest review materials
- Spaced repetition for flashcards

#### 11.4.2 Multi-Modal Input
- Voice recording for notes
- Draw diagrams and annotations
- Video content support

#### 11.4.3 Advanced Study Tools
- Mind maps generation
- Timeline creation for history
- Formula explanations for math
- Code syntax highlighting for programming

### 11.5 Language Support

#### 11.5.1 Multi-Language OCR
- Support for Spanish, French, German, etc.
- Auto-detect language
- Mixed-language documents

#### 11.5.2 Translation
- Translate study packs to other languages
- Bilingual learning mode
- Vocabulary building

### 11.6 Accessibility Enhancements

#### 11.6.1 Additional Dyslexia Tools
- Colored overlays
- Reading rulers
- Word spacing adjustments
- Syllable highlighting

#### 11.6.2 Other Learning Differences
- ADHD-friendly features (focus mode, timers)
- Visual learning tools (diagrams, images)
- Auditory learning tools (audio notes)

### 11.7 Gamification

#### 11.7.1 Progress Tracking
- Streaks for daily usage
- Badges for achievements
- Progress charts and stats

#### 11.7.2 Challenges
- Daily reading goals
- Quiz challenges
- Leaderboards (optional, privacy-conscious)

### 11.8 Integration with Educational Platforms

#### 11.8.1 LMS Integration
- Import from Google Classroom
- Import from Canvas, Blackboard
- Export grades/progress

#### 11.8.2 Textbook Integration
- Partner with publishers
- Pre-loaded textbook content
- Interactive textbooks

### 11.9 Advanced Document Processing

#### 11.9.1 PDF Enhancements
- Native PDF rendering
- Preserve formatting and layout
- Interactive PDFs (forms, links)

#### 11.9.2 Handwriting Recognition
- Convert handwritten notes to text
- Support for math equations
- Diagram recognition

### 11.10 Monetization (If Needed)

#### 11.10.1 Freemium Model
- Free: Basic features (scan, read, listen)
- Premium: AI features, unlimited study packs, cloud sync
- One-time purchase or subscription

#### 11.10.2 Educational Licensing
- School/district licenses
- Volume discounts
- Teacher accounts

#### 11.10.3 Privacy-First Approach
- No ads ever
- No data selling
- Transparent pricing

---

## Appendix A: Development Resources

### A.1 Documentation Links
- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [Expo Docs](https://docs.expo.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Google Vision API](https://cloud.google.com/vision/docs)
- [OpenAI API](https://platform.openai.com/docs)
- [iOS Accessibility](https://developer.apple.com/accessibility/)

### A.2 Design Resources
- [OpenDyslexic Font](https://opendyslexic.org/)
- [Dyslexia-Friendly Style Guide](https://www.bdadyslexia.org.uk/advice/employers/creating-a-dyslexia-friendly-workplace/dyslexia-friendly-style-guide)
- [iOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)

### A.3 Community & Support
- [React Native Community](https://reactnative.dev/community/overview)
- [Expo Forums](https://forums.expo.dev/)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/react-native)

---

## Appendix B: Glossary

- **OCR:** Optical Character Recognition - technology to extract text from images
- **TTS:** Text-to-Speech - technology to convert text to spoken audio
- **LLM:** Large Language Model - AI system for natural language understanding and generation
- **MVP:** Minimum Viable Product - first version with core features
- **MVVM:** Model-View-ViewModel - architectural pattern for separating concerns
- **Expo:** Framework and platform for React Native development
- **AsyncStorage:** Simple key-value storage for React Native
- **SQLite:** Lightweight relational database
- **SecureStore:** Encrypted storage for sensitive data in Expo
- **VoiceOver:** iOS screen reader for accessibility
- **Dynamic Type:** iOS feature for user-controlled text sizing

---

## Appendix C: Contact & Contribution

### C.1 Repository
- **GitHub:** https://github.com/Contente77/Auri
- **Issues:** Report bugs and request features
- **Pull Requests:** Contributions welcome

### C.2 License
- TBD (Recommended: MIT or Apache 2.0 for open source)

### C.3 Acknowledgments
- OpenDyslexic font creators
- React Native and Expo teams
- Open source community

---

**End of Master Plan**

*This document is a living document and will be updated as the project evolves. Last updated: March 1, 2026*
