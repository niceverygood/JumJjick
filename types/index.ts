// JUMPICK - Type Definitions

export interface SajuElement {
  korean: string;      // 화기, 목기, 토기, 금기, 수기
  english: string;     // Fire, Wood, Earth, Metal, Water
  description: string;
}

export interface SajuProfile {
  elements: SajuElement[];
  dayMaster: string;           // 일간 (갑, 을, 병, 정, 무, 기, 경, 신, 임, 계)
  compatibility: string[];     // 궁합이 좋은 사주 특성
  personality: string;         // 성격 분석
}

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  images: string[];
  bio?: string;
  occupation?: string;
  location?: string;
  
  // Saju related
  birthDate: string;           // YYYY-MM-DD
  birthTime?: string;          // HH:mm (선택적)
  sajuProfile: SajuProfile;
  
  // App related
  createdAt: string;
  lastActive: string;
  isPremium: boolean;
}

export interface Match {
  id: string;
  user1Id: string;
  user2Id: string;
  matchScore: number;          // 0-100
  matchedAt: string;
  sajuCompatibility: {
    overall: number;           // 전체 궁합
    love: number;              // 연애 궁합
    communication: number;     // 소통 궁합
    future: number;            // 미래 궁합
  };
  status: 'pending' | 'matched' | 'chatting' | 'archived';
}

export interface Message {
  id: string;
  matchId: string;
  senderId: string;
  content: string;
  type: 'text' | 'image' | 'saju_tip';
  createdAt: string;
  readAt?: string;
}

export interface Swipe {
  id: string;
  swiperId: string;
  swipedId: string;
  direction: 'left' | 'right' | 'super';
  createdAt: string;
}

// Saju Elements Constants
export const SAJU_ELEMENTS = {
  fire: {
    korean: '화기 (火氣)',
    english: 'Fire',
    traits: ['열정적', '리더십', '적극적', '창의적'],
    color: '#FF3366',
  },
  wood: {
    korean: '목기 (木氣)',
    english: 'Wood',
    traits: ['성장', '인내심', '유연함', '창조적'],
    color: '#00FFC2',
  },
  earth: {
    korean: '토기 (土氣)',
    english: 'Earth',
    traits: ['안정적', '신뢰감', '현실적', '포용력'],
    color: '#9B59FF',
  },
  metal: {
    korean: '금기 (金氣)',
    english: 'Metal',
    traits: ['결단력', '정의감', '강인함', '섬세함'],
    color: '#4D7CFF',
  },
  water: {
    korean: '수기 (水氣)',
    english: 'Water',
    traits: ['지혜', '적응력', '소통력', '직관적'],
    color: '#00D4FF',
  },
} as const;

// Ten Heavenly Stems (천간)
export const HEAVENLY_STEMS = [
  { korean: '갑', english: 'Gap', element: 'wood', yin_yang: 'yang' },
  { korean: '을', english: 'Eul', element: 'wood', yin_yang: 'yin' },
  { korean: '병', english: 'Byung', element: 'fire', yin_yang: 'yang' },
  { korean: '정', english: 'Jung', element: 'fire', yin_yang: 'yin' },
  { korean: '무', english: 'Mu', element: 'earth', yin_yang: 'yang' },
  { korean: '기', english: 'Gi', element: 'earth', yin_yang: 'yin' },
  { korean: '경', english: 'Gyung', element: 'metal', yin_yang: 'yang' },
  { korean: '신', english: 'Shin', element: 'metal', yin_yang: 'yin' },
  { korean: '임', english: 'Im', element: 'water', yin_yang: 'yang' },
  { korean: '계', english: 'Gye', element: 'water', yin_yang: 'yin' },
] as const;

// Common Saju Tags for profiles
export const SAJU_TAGS = [
  '정관', '편관', '정인', '편인', '비견', '겁재',
  '식신', '상관', '정재', '편재',
] as const;


