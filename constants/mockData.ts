// 점찍 MVP 더미 데이터 - 오늘의 카드 + 기다리는 카드 시스템

export interface SajuUser {
  id: string;
  name: string;
  age: number;
  occupation: string;
  company?: string;
  education?: string;
  height?: number;
  location: string;
  sajuCharacter: string;
  sajuElement: '火' | '水' | '木' | '金' | '土';
  mbti: string;
  matchScore: number;
  imageUrl: string;
  images: string[];
  bio?: string;
  isVerified: boolean;
  isPremium: boolean;
  interests: string[];
  phoneNumber?: string;  // 매칭 후 공개
}

// 오늘의 카드 도착 시간
export type CardArrivalTime = '12:00' | '15:00' | '18:00' | '21:00';

// 카드 상태
export type CardStatus = 
  | 'locked'        // 아직 시간 안됨
  | 'arrived'       // 도착 (뒤집어진 상태)
  | 'revealed'      // 뒤집힘 (요약 프로필)
  | 'viewed';       // 상세 확인됨

// 오늘의 카드
export interface TodayCard {
  id: string;
  user: SajuUser;
  arrivalTime: CardArrivalTime;
  status: CardStatus;
  arrivedAt?: Date;
}

// 기다리는 카드 상태
export type WaitingCardStatus = 
  | 'pending'           // 대기중 (아무 상호작용 없음)
  | 'sent_interest'     // 호감 보냄
  | 'received_interest' // 호감 받음
  | 'mutual_interest'   // 서로 호감
  | 'sent_high_rating'  // 높은 평가 보냄 (3점+)
  | 'received_high_rating' // 높은 평가 받음
  | 'mutual_high_rating'   // 서로 높은 평가
  | 'matched';          // 매칭됨

// 기다리는 카드
export interface WaitingCard {
  id: string;
  user: SajuUser;
  status: WaitingCardStatus;
  myRating?: number;        // 내가 준 별점 (1-5)
  theirRating?: number;     // 상대가 준 별점 (1-5)
  sentInterest: boolean;    // 호감 보냄
  receivedInterest: boolean;// 호감 받음
  expiresAt: Date;          // D-7 만료
  movedAt: Date;            // 기다리는 카드로 이동된 시간
}

// 사주 오행 색상
export const SAJU_ELEMENT_COLORS = {
  '火': { bg: '#FF3366', label: '불' },
  '水': { bg: '#4D7CFF', label: '물' },
  '木': { bg: '#00FFC2', label: '나무' },
  '金': { bg: '#FFD700', label: '금' },
  '土': { bg: '#9B59FF', label: '흙' },
} as const;

// 더미 유저 데이터
export const MOCK_USERS: SajuUser[] = [
  {
    id: '1',
    name: '지수',
    age: 26,
    occupation: 'UX 디자이너',
    company: '네이버',
    education: '홍익대학교',
    height: 167,
    location: '서울 강남',
    sajuCharacter: '도도한 촛불',
    sajuElement: '火',
    mbti: 'ENFP',
    matchScore: 95,
    imageUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&h=1200&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&h=1200&fit=crop',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=1200&fit=crop',
    ],
    bio: '디자인으로 세상을 더 아름답게 ✨',
    isVerified: true,
    isPremium: true,
    interests: ['여행', '음악', '와인'],
    phoneNumber: '010-1234-5678',
  },
  {
    id: '2',
    name: '민서',
    age: 28,
    occupation: '소프트웨어 엔지니어',
    company: '카카오',
    education: '서울대학교',
    height: 163,
    location: '서울 판교',
    sajuCharacter: '유연한 버드나무',
    sajuElement: '木',
    mbti: 'INTJ',
    matchScore: 88,
    imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=1200&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=1200&fit=crop',
    ],
    bio: '코드와 커피, 그리고 고양이 🐱',
    isVerified: true,
    isPremium: false,
    interests: ['독서', '코딩', '카페'],
    phoneNumber: '010-2345-6789',
  },
  {
    id: '3',
    name: '수진',
    age: 25,
    occupation: '마케터',
    company: '삼성전자',
    education: '연세대학교',
    height: 170,
    location: '서울 청담',
    sajuCharacter: '반짝이는 보석',
    sajuElement: '金',
    mbti: 'ESFJ',
    matchScore: 82,
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=1200&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=1200&fit=crop',
    ],
    bio: '매일이 새로운 도전 💎',
    isVerified: true,
    isPremium: true,
    interests: ['운동', '요리', '여행'],
    phoneNumber: '010-3456-7890',
  },
  {
    id: '4',
    name: '예은',
    age: 27,
    occupation: '변호사',
    company: '김앤장',
    education: '고려대학교',
    height: 165,
    location: '서울 서초',
    sajuCharacter: '깊은 바다',
    sajuElement: '水',
    mbti: 'INFJ',
    matchScore: 91,
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&h=1200&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&h=1200&fit=crop',
    ],
    bio: '지적인 대화를 좋아해요 📚',
    isVerified: true,
    isPremium: true,
    interests: ['와인', '전시회', '클래식'],
    phoneNumber: '010-4567-8901',
  },
];

// 오늘의 카드 더미 데이터
export const MOCK_TODAY_CARDS: TodayCard[] = [
  {
    id: 'today-1',
    user: MOCK_USERS[0],
    arrivalTime: '12:00',
    status: 'arrived',
  },
  {
    id: 'today-2',
    user: MOCK_USERS[1],
    arrivalTime: '15:00',
    status: 'arrived',
  },
  {
    id: 'today-3',
    user: MOCK_USERS[2],
    arrivalTime: '18:00',
    status: 'locked',
  },
  {
    id: 'today-4',
    user: MOCK_USERS[3],
    arrivalTime: '21:00',
    status: 'locked',
  },
];

// 기다리는 카드 더미 데이터
const now = new Date();
const sevenDaysLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

export const MOCK_WAITING_CARDS: WaitingCard[] = [
  // 대기중인 이성 (아무 상호작용 없음)
  {
    id: 'waiting-1',
    user: MOCK_USERS[2],
    status: 'pending',
    sentInterest: false,
    receivedInterest: false,
    expiresAt: sevenDaysLater,
    movedAt: now,
  },
  // 호감 보낸 이성
  {
    id: 'waiting-2',
    user: MOCK_USERS[0],
    status: 'sent_interest',
    sentInterest: true,
    receivedInterest: false,
    expiresAt: sevenDaysLater,
    movedAt: now,
  },
  // 호감 받은 이성
  {
    id: 'waiting-3',
    user: MOCK_USERS[1],
    status: 'received_interest',
    sentInterest: false,
    receivedInterest: true,
    expiresAt: sevenDaysLater,
    movedAt: now,
  },
  // 서로 높은 평가
  {
    id: 'waiting-4',
    user: MOCK_USERS[3],
    status: 'mutual_high_rating',
    myRating: 4,
    theirRating: 5,
    sentInterest: false,
    receivedInterest: false,
    expiresAt: sevenDaysLater,
    movedAt: now,
  },
  // 보낸 높은 평가
  {
    id: 'waiting-5',
    user: MOCK_USERS[0],
    status: 'sent_high_rating',
    myRating: 4,
    sentInterest: false,
    receivedInterest: false,
    expiresAt: sevenDaysLater,
    movedAt: now,
  },
  // 받은 높은 평가
  {
    id: 'waiting-6',
    user: MOCK_USERS[1],
    status: 'received_high_rating',
    theirRating: 5,
    sentInterest: false,
    receivedInterest: false,
    expiresAt: sevenDaysLater,
    movedAt: now,
  },
];

// 매칭된 카드 더미 데이터
export const MOCK_MATCHED_CARDS: WaitingCard[] = [
  {
    id: 'matched-1',
    user: MOCK_USERS[0],
    status: 'matched',
    myRating: 5,
    theirRating: 4,
    sentInterest: true,
    receivedInterest: true,
    expiresAt: sevenDaysLater,
    movedAt: now,
  },
];

// 유틸리티 함수
export const getCardArrivalTimeLabel = (time: CardArrivalTime): string => {
  const labels: Record<CardArrivalTime, string> = {
    '12:00': '정오',
    '15:00': '오후 3시',
    '18:00': '오후 6시',
    '21:00': '오후 9시',
  };
  return labels[time];
};

export const getDaysRemaining = (expiresAt: Date): number => {
  const now = new Date();
  const diff = expiresAt.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};
