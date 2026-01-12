// JUMPICK (점찍) - Neon Oriental Night Theme
export const Theme = {
  colors: {
    // Core colors
    background: '#120924',        // Deep Space Violet
    primary: '#FF3366',           // Electric Coral
    secondary: '#00FFC2',         // Mystic Mint
    textMain: '#FFFFFF',          // Starlight White
    textSub: '#A79CB5',           // Lavender Gray
    error: '#FF4040',             // Error/Warning
    
    // Extended palette
    backgroundLight: '#1E1435',
    primaryDark: '#CC2952',
    primaryLight: '#FF5C85',
    secondaryDark: '#00CC9B',
    neonPurple: '#9B59FF',
    neonBlue: '#4D7CFF',
    
    // UI Elements
    cardBackground: '#1E1435',
    inputBackground: '#2A1F3D',
    border: '#3D2E5A',
  },
  
  // Glow effects for neon theme
  shadows: {
    coral: {
      shadowColor: '#FF3366',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 15,
      elevation: 10,
    },
    mint: {
      shadowColor: '#00FFC2',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 15,
      elevation: 10,
    },
    purple: {
      shadowColor: '#9B59FF',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 15,
      elevation: 10,
    },
    card: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 12,
      elevation: 8,
    },
  },
  
  // Border radius
  radius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    '2xl': 24,
    '3xl': 32,
    full: 9999,
  },
  
  // Spacing
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48,
  },
} as const;

// Text styles for consistency
export const TextStyles = {
  h1: 'text-3xl font-bold text-starlight',
  h2: 'text-2xl font-bold text-starlight',
  h3: 'text-xl font-semibold text-starlight',
  body: 'text-base text-starlight',
  bodySub: 'text-base text-lavender-gray',
  caption: 'text-sm text-lavender-gray',
  small: 'text-xs text-lavender-gray',
} as const;

// Korean text constants
export const Text = {
  appName: '점찍',
  appNameEn: 'JUMPICK',
  
  // Actions
  pass: '넘기기',
  like: '점찍기',
  match: '딱!',
  superLike: '완전 점찍기',
  
  // Profile
  sajuProfile: '만세력',
  matchScore: '궁합 점수',
  
  // Navigation
  home: '홈',
  discover: '발견',
  matches: '매칭',
  chat: '채팅',
  profile: '프로필',
  
  // Match
  itsAMatch: '딱! 서로 점찍었어요',
  startChat: '대화 시작하기',
  keepSwiping: '계속 둘러보기',
  
  // Profile sections
  aboutMe: '소개',
  basicInfo: '기본 정보',
  sajuAnalysis: '사주 분석',
  compatibility: '궁합 요소',
  
  // Auth
  login: '로그인',
  signup: '가입하기',
  email: '이메일',
  password: '비밀번호',
  
  // Buttons
  continue: '계속하기',
  skip: '건너뛰기',
  save: '저장',
  cancel: '취소',
  confirm: '확인',
} as const;

export type ThemeColors = typeof Theme.colors;
export type TextContent = typeof Text;


