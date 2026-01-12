// 점찍 인앱 화폐 시스템 - "찍"

export const CURRENCY = {
  name: '찍',
  symbol: '✧',
  
  // 가격표
  prices: {
    sendInterest: 10,        // 호감 보내기
    sendInterestWithMessage: 15,  // 메시지와 함께 호감 보내기
    superInterest: 30,       // 슈퍼 호감
    revealPhone: 50,         // 번호 공개
    undoPass: 20,            // 넘기기 취소
  },
  
  // 획득 방법
  rewards: {
    dailyLogin: 5,           // 일일 로그인
    completeProfile: 20,     // 프로필 완성
    receiveInterest: 2,      // 호감 받기
    mutualMatch: 10,         // 매칭 성공
    rateProfile: 1,          // 프로필 평가
    inviteFriend: 30,        // 친구 초대
  },
  
  // 충전 패키지
  packages: [
    { id: 'pack1', amount: 50, price: 5000, bonus: 0 },
    { id: 'pack2', amount: 120, price: 10000, bonus: 20 },
    { id: 'pack3', amount: 300, price: 22000, bonus: 80 },
    { id: 'pack4', amount: 600, price: 40000, bonus: 200 },
  ],
} as const;

// 유저 화폐 상태
export interface UserCurrency {
  balance: number;
  totalEarned: number;
  totalSpent: number;
  lastDailyReward?: Date;
}

// 기본 화폐 상태
export const DEFAULT_USER_CURRENCY: UserCurrency = {
  balance: 100,  // 신규 가입 보너스
  totalEarned: 100,
  totalSpent: 0,
};

// 거래 기록
export interface CurrencyTransaction {
  id: string;
  type: 'earn' | 'spend';
  amount: number;
  reason: string;
  targetUserId?: string;
  createdAt: Date;
}

// 잔액 확인
export const hasEnoughBalance = (balance: number, cost: number): boolean => {
  return balance >= cost;
};

// 포맷팅
export const formatCurrency = (amount: number): string => {
  return `${CURRENCY.symbol}${amount}${CURRENCY.name}`;
};

export const formatCurrencyShort = (amount: number): string => {
  return `${amount}${CURRENCY.name}`;
};

