# Auri - Learning Companion for Dyslexic Learners

Auri is a mobile learning companion designed specifically for dyslexic learners, transforming static documents (photos, PDFs) into interactive, multi-sensory learning experiences.

## Features (Phase 1 - MVP)

### Core Learning Loop
- 📷 **Document Scanning**: Capture documents with your camera
- 🔍 **OCR Processing**: Extract text using Google Cloud Vision API
- 🔊 **Text-to-Speech**: Listen to documents with synchronized highlighting
- 🎨 **Customization**: Dyslexia-friendly fonts, adjustable font size, line spacing, and themes
- 📚 **Library Management**: Save, organize, and search your study packs

### Accessibility Features
- OpenDyslexic font (default)
- High contrast themes
- Large touch targets (44x44pt minimum)
- Adjustable text size (12-32pt)
- Line spacing control (1.0x - 2.5x)
- Multiple theme options (Light, Dark, High Contrast, Sepia)

## Technology Stack

- **Framework**: React Native with Expo SDK 54
- **Language**: TypeScript
- **Navigation**: Expo Router (file-based routing)
- **State Management**: React Context + Hooks
- **Storage**: AsyncStorage + FileSystem
- **UI Components**: React Native Paper + Custom Components
- **APIs**: 
  - Google Cloud Vision API (OCR)
  - Expo Speech (Text-to-Speech)

## Prerequisites

- Node.js 18+ and Yarn
- iOS Simulator (Mac only) or Android Emulator
- Google Cloud Vision API key (for OCR functionality)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Contente77/Auri.git
cd Auri/react_native_space
```

### 2. Install Dependencies

```bash
yarn install
```

### 3. Configure API Keys

You'll need a Google Cloud Vision API key for OCR functionality:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Cloud Vision API**
4. Create credentials (API Key)
5. In the app, go to **Settings** and enter your API key

**Note**: API keys are stored securely using Expo SecureStore and never committed to the repository.

### 4. Run the App

#### iOS Simulator (Mac only)

```bash
yarn ios
```

#### Android Emulator

```bash
yarn android
```

#### Web Preview

```bash
yarn web
```

**Note**: Camera functionality is not available in web preview. Use iOS/Android for full functionality.

### 5. Test on Physical Device

1. Install **Expo Go** app on your iOS or Android device
2. Scan the QR code displayed in your terminal after running:

```bash
yarn start
```

## Project Structure

```
react_native_space/
├── app/                      # Expo Router screens (file-based routing)
│   ├── _layout.tsx           # Root layout with providers
│   ├── index.tsx             # App entry point (redirects based on onboarding)
│   ├── onboarding.tsx        # Onboarding flow
│   ├── home.tsx              # Home screen (main actions)
│   ├── camera.tsx            # Document scanning
│   ├── library.tsx           # Study packs library
│   ├── reader.tsx            # Reader view with TTS
│   └── settings.tsx          # App settings
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── common/          # Common components (Button, Loading, Error)
│   │   └── library/         # Library-specific components
│   ├── contexts/            # React Context providers
│   │   └── SettingsContext.tsx
│   ├── hooks/               # Custom React hooks
│   │   ├── useStudyPacks.ts
│   │   ├── useTTS.ts
│   │   └── useOCR.ts
│   ├── services/            # Business logic & API integrations
│   │   ├── ocrService.ts    # Google Vision API integration
│   │   ├── ttsService.ts    # Text-to-Speech service
│   │   └── storageService.ts # Local data persistence
│   ├── models/              # TypeScript data models
│   │   ├── StudyPack.ts
│   │   └── Settings.ts
│   ├── constants/           # App constants
│   │   ├── Colors.ts
│   │   ├── Fonts.ts
│   │   └── Config.ts
│   └── utils/               # Helper functions
│       └── textProcessing.ts
└── assets/                  # Images, fonts, etc.
```

## Usage Guide

### First Launch

1. **Onboarding**: Complete the 3-step onboarding flow
2. **Permissions**: Grant camera and photo library permissions
3. **API Setup**: Go to Settings and add your Google Vision API key

### Scanning a Document

1. From the home screen, tap **"Scan Document"**
2. Point your camera at the document
3. Tap the capture button to take a photo
4. Tap **"Add Another Page"** to scan multiple pages, or **"Done"** to process
5. Enter a name for your study pack
6. Wait for OCR processing (takes ~5-30 seconds per page)
7. The reader view will open automatically

### Using the Reader

1. **Play/Pause**: Tap the play button to start text-to-speech
2. **Speed Control**: Tap the speed indicator (e.g., "1.0x") to adjust playback speed
3. **Skip**: Use ⏪ and ⏩ buttons to skip backward/forward by sentence
4. **Stop**: Tap ⏹️ to stop and reset playback
5. **Page Navigation**: Use ← and → buttons to switch between pages
6. **Highlighting**: The current sentence is highlighted as it's being read

### Customizing Appearance

1. Go to **Settings**
2. Choose a theme: Light, Dark, High Contrast, or Sepia
3. Select a font: OpenDyslexic (recommended) or Arial
4. Adjust settings to your preference

### Managing Your Library

1. From home, tap **"My Library"** or view recent study packs
2. **Search**: Type in the search bar to filter study packs
3. **Sort**: Choose "Recent" or "A-Z" sorting
4. **Delete**: Long-press a study pack card and confirm deletion

## Troubleshooting

### Camera not working
- Ensure camera permissions are granted in device settings
- Restart the app after granting permissions

### OCR fails
- Check that you've entered a valid Google Vision API key in Settings
- Ensure you have an internet connection
- Try with a clearer, well-lit document

### Text-to-Speech not working
- Check device volume settings
- Ensure text-to-speech is enabled in device accessibility settings
- Try restarting the app

### App crashes on startup
- Clear app data and cache
- Reinstall the app
- Check for iOS/Android system updates

## Development

### Running Tests

```bash
yarn test
```

### Linting

```bash
yarn lint
```

### Type Checking

```bash
yarn tsc --noEmit
```

### Building for Production

#### iOS

```bash
eas build --platform ios
```

#### Android

```bash
eas build --platform android
```

**Note**: You need an Expo account and EAS CLI configured for production builds.

## Roadmap

### Phase 2: AI Features (Coming Soon)
- 🧠 AI-powered explanations (Simple, Very Simple, Exam-Ready)
- 🎧 Podcast generation (two-speaker conversation)
- 📝 Study tools (Summaries, Flashcards, Quizzes)
- 💬 Interactive "Check My Understanding" chat

### Phase 3: Advanced Features
- 📱 Demo mode with sample content
- 🌐 Multi-language support
- ☁️ Cloud sync (optional)
- 📄 PDF import
- 📊 Progress tracking and analytics

## Contributing

This is a learning project for dyslexic students. Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Privacy

- All data is stored locally on your device
- API keys are stored securely using Expo SecureStore
- Images and text are sent to Google Cloud Vision API for OCR processing only
- No personal data is collected or shared
- No analytics or tracking (Phase 1)

## License

MIT License - See LICENSE file for details

## Support

For issues or questions:
- Open an issue on GitHub
- Email: support@auri.app (placeholder)

## Acknowledgments

- OpenDyslexic font by Abelardo Gonzalez
- Google Cloud Vision API
- Expo and React Native communities
- All contributors and testers

---

**Made with ❤️ for dyslexic learners**
