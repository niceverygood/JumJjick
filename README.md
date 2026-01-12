# 점찍 (JUMPICK) 🌙✨

**사주 기반 데이팅 앱** - Saju-Based Dating App

A modern dating app that uses Korean Saju (Four Pillars of Destiny) for compatibility matching.

## Design Theme: "Neon Oriental Night" 🌃

The app features a unique aesthetic combining:
- Deep space violet backgrounds (#120924)
- Electric coral accents (#FF3366)
- Mystic mint highlights (#00FFC2)
- Neon glow effects for that modern oriental night vibe

## Tech Stack

- **Framework**: React Native (Expo SDK 54)
- **Routing**: Expo Router
- **Styling**: NativeWind (Tailwind CSS)
- **Animations**: React Native Reanimated
- **Gestures**: React Native Gesture Handler
- **Icons**: Lucide React Native
- **Language**: TypeScript

## Features

- 🎴 **Swipe Cards**: Tinder-style card swiping with smooth animations
- 💫 **Match System**: "딱!" (Hit) matching with celebratory animations
- 🔮 **Saju Compatibility**: Match scores based on Four Pillars analysis
- 💬 **Chat**: Message your matches
- 👤 **Profile**: View your Saju profile and stats

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI
- iOS Simulator / Android Emulator / Expo Go

### Installation

\`\`\`bash
# Clone the repository
cd JumJjick

# Install dependencies
npm install

# Start the development server
npm start
\`\`\`

### Running the App

\`\`\`bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
\`\`\`

## Project Structure

\`\`\`
JumJjick/
├── app/                    # Expo Router pages
│   ├── (tabs)/            # Tab navigation screens
│   │   ├── index.tsx      # Discover/Swipe screen
│   │   ├── matches.tsx    # Matches list
│   │   ├── chat.tsx       # Chat list
│   │   └── profile.tsx    # User profile
│   ├── _layout.tsx        # Root layout
│   └── modal.tsx          # Premium modal
├── components/
│   ├── ui/                # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── Effects.tsx
│   ├── SwipeCard.tsx      # Animated swipe card
│   ├── ActionButtons.tsx  # Like/Pass buttons
│   └── MatchModal.tsx     # Match celebration modal
├── constants/
│   └── Theme.ts           # Design system & colors
├── hooks/
│   └── useSwipe.ts        # Swipe logic hook
├── types/
│   └── index.ts           # TypeScript definitions
└── global.css             # Tailwind imports
\`\`\`

## Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Deep Space Violet | #120924 | Background |
| Electric Coral | #FF3366 | Primary actions, "점찍기" button |
| Mystic Mint | #00FFC2 | Match scores, "딱!" badge |
| Starlight White | #FFFFFF | Main text |
| Lavender Gray | #A79CB5 | Secondary text |

## Korean Terminology

- **점찍** (Jum-jjick): "To mark/pick" - App name
- **점찍기** (Jum-jjick-gi): "Like" action
- **넘기기** (Num-gi-gi): "Pass" action
- **딱!** (Ttak!): "Hit!" - Match success
- **궁합 점수** (Goong-hap Jum-soo): Compatibility score
- **만세력** (Man-se-ryuk): Saju profile

## License

MIT License

---

Made with 💜 and ✨ for meaningful connections through ancient wisdom.


