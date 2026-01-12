import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Settings,
  Edit3,
  Heart,
  ChevronRight,
  Moon,
  Sparkles,
  Shield,
  Coins,
  BadgeCheck,
  X,
  Bell,
  Eye,
  EyeOff,
  Lock,
  Trash2,
  LogOut,
  HelpCircle,
  FileText,
  MessageCircle,
  ChevronDown,
  Plus,
  Gift,
  Clock,
} from 'lucide-react-native';
import { 
  formatCurrencyShort, 
  DEFAULT_USER_CURRENCY, 
  CURRENCY,
  CurrencyTransaction,
} from '@/constants/currency';
import { MOCK_USERS, SajuUser, SAJU_ELEMENT_COLORS } from '@/constants/mockData';

// Sample user profile
const USER_PROFILE = {
  name: '민준',
  age: 27,
  image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
  bio: '음악과 여행을 사랑하는 ENFJ입니다. 새로운 사람을 만나는 것을 좋아해요! 🎵✈️',
  occupation: '소프트웨어 개발자',
  location: '서울 성수동',
  isVerified: true,
  isPremium: false,
  sajuCharacter: '타오르는 태양',
  sajuElement: '丙火',
  sajuElements: ['화기 (火氣)', '정관 (正官)', '식신 (食神)'],
  sajuDescription: '불의 기운이 강한 열정적인 성격으로, 리더십과 창의력이 뛰어납니다.',
  stats: {
    likes: 42,
    matches: 8,
    views: 156,
  },
};

// 나를 좋아하는 사람 더미 데이터
const PEOPLE_WHO_LIKE_ME = MOCK_USERS.slice(0, 3);

// 거래 내역 더미 데이터
const MOCK_TRANSACTIONS: CurrencyTransaction[] = [
  { id: '1', type: 'earn', amount: 100, reason: '신규 가입 보너스', createdAt: new Date() },
  { id: '2', type: 'spend', amount: 15, reason: '호감 보내기 (메시지)', targetUserId: '1', createdAt: new Date() },
  { id: '3', type: 'earn', amount: 5, reason: '일일 로그인', createdAt: new Date() },
  { id: '4', type: 'earn', amount: 2, reason: '호감 받기', createdAt: new Date() },
  { id: '5', type: 'spend', amount: 10, reason: '호감 보내기', targetUserId: '2', createdAt: new Date() },
];

// 오늘의 운세 더미 데이터
const TODAY_FORTUNE = {
  overall: 85,
  love: 92,
  work: 78,
  health: 80,
  money: 75,
  luckyColor: '코랄 핑크',
  luckyNumber: 7,
  luckyDirection: '남동쪽',
  advice: '오늘은 새로운 인연을 만나기 좋은 날입니다. 적극적으로 다가가 보세요. 단, 저녁 시간에는 무리하지 말고 충분한 휴식을 취하는 것이 좋습니다.',
  loveAdvice: '진심을 담은 대화가 상대방의 마음을 움직일 수 있는 날입니다. 용기를 내어 먼저 연락해보세요.',
};

type ModalType = 'likes' | 'currency' | 'fortune' | 'privacy' | 'settings' | null;

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const [userBalance, setUserBalance] = useState(DEFAULT_USER_CURRENCY.balance);
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const closeModal = () => setActiveModal(null);

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>프로필</Text>
          <TouchableOpacity style={styles.settingsButton} onPress={() => setActiveModal('settings')}>
            <Settings size={22} color="#A79CB5" />
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileImageContainer}>
            <Image source={{ uri: USER_PROFILE.image }} style={styles.profileImage} />
            <TouchableOpacity style={styles.editButton}>
              <Edit3 size={14} color="#FFFFFF" />
            </TouchableOpacity>
            {USER_PROFILE.isVerified && (
              <View style={styles.verifiedBadge}>
                <BadgeCheck size={16} color="#00FFC2" fill="#00FFC2" />
              </View>
            )}
          </View>

          <View style={styles.profileInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>{USER_PROFILE.name}</Text>
              <Text style={styles.age}>{USER_PROFILE.age}</Text>
            </View>
            <Text style={styles.occupation}>{USER_PROFILE.occupation}</Text>
            <Text style={styles.location}>📍 {USER_PROFILE.location}</Text>
          </View>

          <Text style={styles.bio}>{USER_PROFILE.bio}</Text>

          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileText}>프로필 수정</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsCard}>
          <StatItem value={USER_PROFILE.stats.likes} label="받은 좋아요" color="#FF3366" />
          <View style={styles.statDivider} />
          <StatItem value={USER_PROFILE.stats.matches} label="매칭" color="#00FFC2" />
          <View style={styles.statDivider} />
          <StatItem value={USER_PROFILE.stats.views} label="프로필 조회" color="#FFFFFF" />
        </View>

        {/* Saju Profile */}
        <View style={styles.sajuCard}>
          <Text style={styles.sectionTitle}>만세력</Text>
          
          <View style={styles.sajuBadges}>
            {USER_PROFILE.sajuElements.map((element, index) => (
              <View
                key={index}
                style={[
                  styles.sajuBadge,
                  {
                    backgroundColor:
                      index === 0
                        ? 'rgba(255, 51, 102, 0.15)'
                        : index === 1
                        ? 'rgba(0, 255, 194, 0.15)'
                        : 'rgba(155, 89, 255, 0.15)',
                    borderColor:
                      index === 0 ? '#FF3366' : index === 1 ? '#00FFC2' : '#9B59FF',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.sajuBadgeText,
                    {
                      color: index === 0 ? '#FF3366' : index === 1 ? '#00FFC2' : '#9B59FF',
                    },
                  ]}
                >
                  {element}
                </Text>
              </View>
            ))}
          </View>

          <Text style={styles.sajuDescription}>{USER_PROFILE.sajuDescription}</Text>

          <TouchableOpacity style={styles.sajuDetailButton}>
            <Sparkles size={16} color="#00FFC2" />
            <Text style={styles.sajuDetailText}>사주 분석 자세히 보기</Text>
          </TouchableOpacity>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          <MenuItem
            icon={<Heart size={20} color="#FF3366" />}
            title="나를 좋아하는 사람"
            subtitle={`${USER_PROFILE.stats.likes}명이 당신에게 관심이 있어요`}
            onPress={() => setActiveModal('likes')}
          />
          <MenuItem
            icon={<Coins size={20} color="#FFD700" />}
            title="내 찍"
            subtitle={`${formatCurrencyShort(userBalance)} 보유 중`}
            onPress={() => setActiveModal('currency')}
            rightElement={
              <View style={styles.chargeButton}>
                <Text style={styles.chargeButtonText}>충전</Text>
              </View>
            }
          />
          <MenuItem
            icon={<Moon size={20} color="#9B59FF" />}
            title="오늘의 운세"
            subtitle="일일 사주 분석"
            onPress={() => setActiveModal('fortune')}
          />
          <MenuItem
            icon={<Shield size={20} color="#A79CB5" />}
            title="프라이버시 설정"
            onPress={() => setActiveModal('privacy')}
          />
          <MenuItem
            icon={<Settings size={20} color="#A79CB5" />}
            title="앱 설정"
            onPress={() => setActiveModal('settings')}
          />
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* 나를 좋아하는 사람 모달 */}
      <LikesModal 
        visible={activeModal === 'likes'} 
        onClose={closeModal}
        users={PEOPLE_WHO_LIKE_ME}
        totalCount={USER_PROFILE.stats.likes}
      />

      {/* 내 찍 모달 */}
      <CurrencyModal
        visible={activeModal === 'currency'}
        onClose={closeModal}
        balance={userBalance}
        transactions={MOCK_TRANSACTIONS}
      />

      {/* 오늘의 운세 모달 */}
      <FortuneModal
        visible={activeModal === 'fortune'}
        onClose={closeModal}
        fortune={TODAY_FORTUNE}
        userName={USER_PROFILE.name}
        sajuCharacter={USER_PROFILE.sajuCharacter}
      />

      {/* 프라이버시 설정 모달 */}
      <PrivacyModal
        visible={activeModal === 'privacy'}
        onClose={closeModal}
      />

      {/* 앱 설정 모달 */}
      <SettingsModal
        visible={activeModal === 'settings'}
        onClose={closeModal}
      />
    </SafeAreaView>
  );
}

// === 컴포넌트들 ===

interface StatItemProps {
  value: number;
  label: string;
  color: string;
}

function StatItem({ value, label, color }: StatItemProps) {
  return (
    <View style={styles.statItem}>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

interface MenuItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
}

function MenuItem({ icon, title, subtitle, onPress, rightElement }: MenuItemProps) {
  return (
    <TouchableOpacity style={styles.menuItem} activeOpacity={0.7} onPress={onPress}>
      <View style={styles.menuIconContainer}>{icon}</View>
      <View style={styles.menuContent}>
        <Text style={styles.menuTitle}>{title}</Text>
        {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
      </View>
      {rightElement || <ChevronRight size={20} color="#4A4458" />}
    </TouchableOpacity>
  );
}

// === 모달들 ===

// 나를 좋아하는 사람 모달
function LikesModal({ 
  visible, 
  onClose, 
  users,
  totalCount,
}: { 
  visible: boolean; 
  onClose: () => void;
  users: SajuUser[];
  totalCount: number;
}) {
  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>나를 좋아하는 사람</Text>
          <TouchableOpacity onPress={onClose} style={styles.modalCloseButton}>
            <X size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <Text style={styles.likesCount}>
          <Text style={styles.likesCountHighlight}>{totalCount}명</Text>이 당신에게 관심을 보였어요
        </Text>

        <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
          {users.map((user) => {
            const elementColor = SAJU_ELEMENT_COLORS[user.sajuElement];
            return (
              <TouchableOpacity key={user.id} style={styles.likeUserCard}>
                <Image source={{ uri: user.imageUrl }} style={styles.likeUserImage} />
                <View style={styles.likeUserInfo}>
                  <View style={styles.likeUserNameRow}>
                    <Text style={styles.likeUserName}>{user.name}</Text>
                    <Text style={styles.likeUserAge}>{user.age}</Text>
                    {user.isVerified && <BadgeCheck size={14} color="#00FFC2" fill="#00FFC2" />}
                  </View>
                  <View style={styles.likeUserSajuRow}>
                    <View style={[styles.miniElementBadge, { backgroundColor: elementColor.bg + '30' }]}>
                      <Text style={[styles.miniElementText, { color: elementColor.bg }]}>{user.sajuElement}</Text>
                    </View>
                    <Text style={styles.likeUserSaju}>{user.sajuCharacter}</Text>
                  </View>
                  <Text style={styles.likeUserLocation}>{user.location}</Text>
                </View>
                <View style={styles.matchScoreBadge}>
                  <Sparkles size={12} color="#00FFC2" />
                  <Text style={styles.matchScoreText}>{user.matchScore}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
          
          <View style={styles.moreUsersHint}>
            <Text style={styles.moreUsersText}>
              +{totalCount - users.length}명이 더 있어요
            </Text>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

// 내 찍 모달
function CurrencyModal({ 
  visible, 
  onClose, 
  balance,
  transactions,
}: { 
  visible: boolean; 
  onClose: () => void;
  balance: number;
  transactions: CurrencyTransaction[];
}) {
  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>내 찍</Text>
          <TouchableOpacity onPress={onClose} style={styles.modalCloseButton}>
            <X size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* 잔액 표시 */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>보유 찍</Text>
          <View style={styles.balanceRow}>
            <Coins size={28} color="#FFD700" />
            <Text style={styles.balanceAmount}>{formatCurrencyShort(balance)}</Text>
          </View>
          <TouchableOpacity style={styles.chargeMainButton}>
            <Plus size={18} color="#0A0A0F" />
            <Text style={styles.chargeMainText}>찍 충전하기</Text>
          </TouchableOpacity>
        </View>

        {/* 획득 방법 */}
        <View style={styles.earnSection}>
          <Text style={styles.earnTitle}>찍 획득 방법</Text>
          <View style={styles.earnGrid}>
            <EarnItem icon={<Gift size={16} color="#FFD700" />} label="일일 로그인" amount={CURRENCY.rewards.dailyLogin} />
            <EarnItem icon={<Heart size={16} color="#FF3366" />} label="호감 받기" amount={CURRENCY.rewards.receiveInterest} />
            <EarnItem icon={<Sparkles size={16} color="#00FFC2" />} label="매칭 성공" amount={CURRENCY.rewards.mutualMatch} />
            <EarnItem icon={<Edit3 size={16} color="#9B59FF" />} label="프로필 평가" amount={CURRENCY.rewards.rateProfile} />
          </View>
        </View>

        {/* 거래 내역 */}
        <View style={styles.transactionSection}>
          <Text style={styles.transactionTitle}>최근 내역</Text>
          <ScrollView style={styles.transactionList} showsVerticalScrollIndicator={false}>
            {transactions.map((tx) => (
              <View key={tx.id} style={styles.transactionItem}>
                <View style={styles.transactionLeft}>
                  <View style={[
                    styles.transactionIcon,
                    { backgroundColor: tx.type === 'earn' ? 'rgba(0, 255, 194, 0.15)' : 'rgba(255, 51, 102, 0.15)' }
                  ]}>
                    {tx.type === 'earn' ? (
                      <Plus size={16} color="#00FFC2" />
                    ) : (
                      <Clock size={16} color="#FF3366" />
                    )}
                  </View>
                  <Text style={styles.transactionReason}>{tx.reason}</Text>
                </View>
                <Text style={[
                  styles.transactionAmount,
                  { color: tx.type === 'earn' ? '#00FFC2' : '#FF3366' }
                ]}>
                  {tx.type === 'earn' ? '+' : '-'}{tx.amount}찍
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

function EarnItem({ icon, label, amount }: { icon: React.ReactNode; label: string; amount: number }) {
  return (
    <View style={styles.earnItem}>
      {icon}
      <Text style={styles.earnLabel}>{label}</Text>
      <Text style={styles.earnAmount}>+{amount}찍</Text>
    </View>
  );
}

// 오늘의 운세 모달
function FortuneModal({ 
  visible, 
  onClose,
  fortune,
  userName,
  sajuCharacter,
}: { 
  visible: boolean; 
  onClose: () => void;
  fortune: typeof TODAY_FORTUNE;
  userName: string;
  sajuCharacter: string;
}) {
  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>오늘의 운세</Text>
          <TouchableOpacity onPress={onClose} style={styles.modalCloseButton}>
            <X size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
          {/* 사주 정보 */}
          <View style={styles.fortuneHeader}>
            <Moon size={32} color="#9B59FF" />
            <Text style={styles.fortuneUserName}>{userName}님의 오늘</Text>
            <Text style={styles.fortuneSaju}>{sajuCharacter}</Text>
          </View>

          {/* 총운 */}
          <View style={styles.overallFortuneCard}>
            <Text style={styles.overallLabel}>오늘의 총운</Text>
            <View style={styles.overallScoreContainer}>
              <Text style={styles.overallScore}>{fortune.overall}</Text>
              <Text style={styles.overallScoreUnit}>점</Text>
            </View>
            <View style={styles.overallBar}>
              <View style={[styles.overallBarFill, { width: `${fortune.overall}%` }]} />
            </View>
          </View>

          {/* 세부 운세 */}
          <View style={styles.fortuneGrid}>
            <FortuneItem label="연애운" score={fortune.love} color="#FF3366" emoji="💕" />
            <FortuneItem label="직장운" score={fortune.work} color="#4D7CFF" emoji="💼" />
            <FortuneItem label="건강운" score={fortune.health} color="#00FFC2" emoji="💪" />
            <FortuneItem label="금전운" score={fortune.money} color="#FFD700" emoji="💰" />
          </View>

          {/* 행운 정보 */}
          <View style={styles.luckySection}>
            <Text style={styles.luckyTitle}>오늘의 행운</Text>
            <View style={styles.luckyGrid}>
              <View style={styles.luckyItem}>
                <Text style={styles.luckyLabel}>행운의 색</Text>
                <Text style={styles.luckyValue}>{fortune.luckyColor}</Text>
              </View>
              <View style={styles.luckyItem}>
                <Text style={styles.luckyLabel}>행운의 숫자</Text>
                <Text style={styles.luckyValue}>{fortune.luckyNumber}</Text>
              </View>
              <View style={styles.luckyItem}>
                <Text style={styles.luckyLabel}>행운의 방향</Text>
                <Text style={styles.luckyValue}>{fortune.luckyDirection}</Text>
              </View>
            </View>
          </View>

          {/* 조언 */}
          <View style={styles.adviceSection}>
            <Text style={styles.adviceTitle}>💫 오늘의 조언</Text>
            <Text style={styles.adviceText}>{fortune.advice}</Text>
          </View>

          <View style={styles.loveAdviceSection}>
            <Text style={styles.adviceTitle}>💕 연애 조언</Text>
            <Text style={styles.adviceText}>{fortune.loveAdvice}</Text>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

function FortuneItem({ label, score, color, emoji }: { label: string; score: number; color: string; emoji: string }) {
  return (
    <View style={styles.fortuneItem}>
      <Text style={styles.fortuneEmoji}>{emoji}</Text>
      <Text style={styles.fortuneLabel}>{label}</Text>
      <Text style={[styles.fortuneScore, { color }]}>{score}</Text>
      <View style={styles.fortuneBar}>
        <View style={[styles.fortuneBarFill, { width: `${score}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
}

// 프라이버시 설정 모달
function PrivacyModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const [showOnline, setShowOnline] = useState(true);
  const [showDistance, setShowDistance] = useState(true);
  const [showAge, setShowAge] = useState(true);
  const [incognitoMode, setIncognitoMode] = useState(false);

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>프라이버시 설정</Text>
          <TouchableOpacity onPress={onClose} style={styles.modalCloseButton}>
            <X size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
          <ToggleSetting
            icon={<Eye size={20} color="#00FFC2" />}
            title="온라인 상태 표시"
            subtitle="다른 사람에게 접속 상태를 보여줍니다"
            value={showOnline}
            onToggle={() => setShowOnline(!showOnline)}
          />
          <ToggleSetting
            icon={<MapPin size={20} color="#4D7CFF" />}
            title="거리 표시"
            subtitle="프로필에 상대방과의 거리를 표시합니다"
            value={showDistance}
            onToggle={() => setShowDistance(!showDistance)}
          />
          <ToggleSetting
            icon={<Clock size={20} color="#9B59FF" />}
            title="나이 표시"
            subtitle="프로필에 나이를 공개합니다"
            value={showAge}
            onToggle={() => setShowAge(!showAge)}
          />
          <ToggleSetting
            icon={<EyeOff size={20} color="#FF3366" />}
            title="시크릿 모드"
            subtitle="내 프로필을 숨기고 내가 좋아요한 사람만 볼 수 있습니다"
            value={incognitoMode}
            onToggle={() => setIncognitoMode(!incognitoMode)}
          />

          <View style={styles.dangerSection}>
            <Text style={styles.dangerTitle}>계정 관리</Text>
            <TouchableOpacity style={styles.dangerItem}>
              <Lock size={20} color="#A79CB5" />
              <Text style={styles.dangerItemText}>비밀번호 변경</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dangerItem}>
              <Trash2 size={20} color="#FF4040" />
              <Text style={[styles.dangerItemText, { color: '#FF4040' }]}>계정 삭제</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

// MapPin 아이콘 컴포넌트 추가
function MapPin({ size, color }: { size: number; color: string }) {
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color, fontSize: size * 0.8 }}>📍</Text>
    </View>
  );
}

function ToggleSetting({ 
  icon, 
  title, 
  subtitle, 
  value, 
  onToggle 
}: { 
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  value: boolean;
  onToggle: () => void;
}) {
  return (
    <TouchableOpacity style={styles.toggleSetting} onPress={onToggle}>
      <View style={styles.toggleLeft}>
        {icon}
        <View style={styles.toggleContent}>
          <Text style={styles.toggleTitle}>{title}</Text>
          <Text style={styles.toggleSubtitle}>{subtitle}</Text>
        </View>
      </View>
      <View style={[styles.toggle, value && styles.toggleActive]}>
        <View style={[styles.toggleKnob, value && styles.toggleKnobActive]} />
      </View>
    </TouchableOpacity>
  );
}

// 앱 설정 모달
function SettingsModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const [notifications, setNotifications] = useState(true);
  const [sounds, setSounds] = useState(true);
  const [vibration, setVibration] = useState(true);

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>앱 설정</Text>
          <TouchableOpacity onPress={onClose} style={styles.modalCloseButton}>
            <X size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.settingsSection}>알림 설정</Text>
          <ToggleSetting
            icon={<Bell size={20} color="#FFD700" />}
            title="푸시 알림"
            subtitle="새로운 매칭과 메시지 알림을 받습니다"
            value={notifications}
            onToggle={() => setNotifications(!notifications)}
          />
          <ToggleSetting
            icon={<MessageCircle size={20} color="#00FFC2" />}
            title="소리"
            subtitle="알림 소리를 재생합니다"
            value={sounds}
            onToggle={() => setSounds(!sounds)}
          />
          <ToggleSetting
            icon={<Sparkles size={20} color="#9B59FF" />}
            title="진동"
            subtitle="알림 시 진동을 울립니다"
            value={vibration}
            onToggle={() => setVibration(!vibration)}
          />

          <Text style={styles.settingsSection}>지원</Text>
          <TouchableOpacity style={styles.settingsItem}>
            <HelpCircle size={20} color="#A79CB5" />
            <Text style={styles.settingsItemText}>고객센터</Text>
            <ChevronRight size={20} color="#4A4458" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsItem}>
            <FileText size={20} color="#A79CB5" />
            <Text style={styles.settingsItemText}>이용약관</Text>
            <ChevronRight size={20} color="#4A4458" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsItem}>
            <Shield size={20} color="#A79CB5" />
            <Text style={styles.settingsItemText}>개인정보 처리방침</Text>
            <ChevronRight size={20} color="#4A4458" />
          </TouchableOpacity>

          <View style={styles.logoutSection}>
            <TouchableOpacity style={styles.logoutButton}>
              <LogOut size={20} color="#FF4040" />
              <Text style={styles.logoutText}>로그아웃</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.versionText}>점찍 v1.0.0</Text>
        </ScrollView>
      </View>
    </Modal>
  );
}

// === 스타일 ===

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0F',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#00FFC2',
    textShadowColor: '#00FFC2',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1A1A2E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileCard: {
    marginHorizontal: 16,
    backgroundColor: '#1A1A2E',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 51, 102, 0.3)',
  },
  profileImageContainer: {
    alignSelf: 'flex-start',
    position: 'relative',
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 20,
  },
  editButton: {
    position: 'absolute',
    bottom: -6,
    right: -6,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FF3366',
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifiedBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#0A0A0F',
    borderRadius: 10,
    padding: 2,
  },
  profileInfo: {
    marginTop: 16,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  name: {
    fontSize: 26,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  age: {
    fontSize: 22,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  occupation: {
    fontSize: 14,
    color: '#A79CB5',
    marginTop: 4,
  },
  location: {
    fontSize: 14,
    color: '#A79CB5',
    marginTop: 2,
  },
  bio: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.85)',
    lineHeight: 20,
    marginTop: 16,
  },
  editProfileButton: {
    marginTop: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
  },
  editProfileText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  statsCard: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: '#1A1A2E',
    borderRadius: 16,
    padding: 20,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 12,
    color: '#A79CB5',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignSelf: 'center',
  },
  sajuCard: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: '#1A1A2E',
    borderRadius: 16,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  sajuBadges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  sajuBadge: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  sajuBadgeText: {
    fontSize: 13,
    fontWeight: '600',
  },
  sajuDescription: {
    fontSize: 14,
    color: '#A79CB5',
    lineHeight: 20,
  },
  sajuDetailButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    paddingVertical: 10,
    gap: 8,
  },
  sajuDetailText: {
    fontSize: 14,
    color: '#00FFC2',
    fontWeight: '600',
  },
  menuSection: {
    marginHorizontal: 16,
    marginTop: 16,
    gap: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A2E',
    borderRadius: 16,
    padding: 14,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0A0A0F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuContent: {
    flex: 1,
    marginLeft: 12,
  },
  menuTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  menuSubtitle: {
    fontSize: 12,
    color: '#A79CB5',
    marginTop: 2,
  },
  chargeButton: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
  },
  chargeButtonText: {
    color: '#0A0A0F',
    fontSize: 13,
    fontWeight: '700',
  },

  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#0A0A0F',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  modalCloseButton: {
    padding: 4,
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },

  // Likes Modal
  likesCount: {
    fontSize: 15,
    color: '#A79CB5',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  likesCountHighlight: {
    color: '#FF3366',
    fontWeight: '700',
  },
  likeUserCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A2E',
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
  },
  likeUserImage: {
    width: 60,
    height: 60,
    borderRadius: 14,
  },
  likeUserInfo: {
    flex: 1,
    marginLeft: 12,
  },
  likeUserNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  likeUserName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  likeUserAge: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.7)',
  },
  likeUserSajuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  miniElementBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  miniElementText: {
    fontSize: 10,
    fontWeight: '700',
  },
  likeUserSaju: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
  },
  likeUserLocation: {
    fontSize: 12,
    color: '#A79CB5',
    marginTop: 2,
  },
  matchScoreBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(0,255,194,0.15)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  matchScoreText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#00FFC2',
  },
  moreUsersHint: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  moreUsersText: {
    fontSize: 14,
    color: '#A79CB5',
  },

  // Currency Modal
  balanceCard: {
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    borderRadius: 20,
    padding: 24,
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  balanceLabel: {
    fontSize: 14,
    color: '#A79CB5',
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 8,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: '800',
    color: '#FFD700',
  },
  chargeMainButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFD700',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
    marginTop: 16,
  },
  chargeMainText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0A0A0F',
  },
  earnSection: {
    padding: 20,
  },
  earnTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  earnGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  earnItem: {
    width: '48%',
    backgroundColor: '#1A1A2E',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  earnLabel: {
    flex: 1,
    fontSize: 13,
    color: '#FFFFFF',
  },
  earnAmount: {
    fontSize: 13,
    fontWeight: '600',
    color: '#00FFC2',
  },
  transactionSection: {
    paddingHorizontal: 20,
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  transactionList: {
    flex: 1,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  transactionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  transactionReason: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  transactionAmount: {
    fontSize: 15,
    fontWeight: '600',
  },

  // Fortune Modal
  fortuneHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  fortuneUserName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 12,
  },
  fortuneSaju: {
    fontSize: 14,
    color: '#9B59FF',
    marginTop: 4,
  },
  overallFortuneCard: {
    backgroundColor: 'rgba(155, 89, 255, 0.1)',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(155, 89, 255, 0.3)',
  },
  overallLabel: {
    fontSize: 14,
    color: '#A79CB5',
  },
  overallScoreContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 8,
  },
  overallScore: {
    fontSize: 48,
    fontWeight: '800',
    color: '#9B59FF',
  },
  overallScoreUnit: {
    fontSize: 18,
    color: '#9B59FF',
    marginLeft: 4,
  },
  overallBar: {
    width: '100%',
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 4,
    marginTop: 16,
    overflow: 'hidden',
  },
  overallBarFill: {
    height: '100%',
    backgroundColor: '#9B59FF',
    borderRadius: 4,
  },
  fortuneGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  fortuneItem: {
    width: '47%',
    backgroundColor: '#1A1A2E',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  fortuneEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  fortuneLabel: {
    fontSize: 13,
    color: '#A79CB5',
  },
  fortuneScore: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 4,
  },
  fortuneBar: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    marginTop: 8,
    overflow: 'hidden',
  },
  fortuneBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  luckySection: {
    backgroundColor: '#1A1A2E',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  luckyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  luckyGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  luckyItem: {
    alignItems: 'center',
  },
  luckyLabel: {
    fontSize: 12,
    color: '#A79CB5',
  },
  luckyValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFD700',
    marginTop: 4,
  },
  adviceSection: {
    backgroundColor: '#1A1A2E',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  loveAdviceSection: {
    backgroundColor: 'rgba(255, 51, 102, 0.1)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 51, 102, 0.2)',
  },
  adviceTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  adviceText: {
    fontSize: 14,
    color: '#A79CB5',
    lineHeight: 22,
  },

  // Privacy & Settings
  toggleSetting: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1A1A2E',
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
  },
  toggleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  toggleContent: {
    flex: 1,
  },
  toggleTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  toggleSubtitle: {
    fontSize: 12,
    color: '#A79CB5',
    marginTop: 2,
  },
  toggle: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#2A2A35',
    padding: 2,
  },
  toggleActive: {
    backgroundColor: '#00FFC2',
  },
  toggleKnob: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  toggleKnobActive: {
    transform: [{ translateX: 22 }],
  },
  dangerSection: {
    marginTop: 24,
  },
  dangerTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#A79CB5',
    marginBottom: 12,
  },
  dangerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  dangerItemText: {
    fontSize: 15,
    color: '#FFFFFF',
  },
  settingsSection: {
    fontSize: 14,
    fontWeight: '600',
    color: '#A79CB5',
    marginBottom: 12,
    marginTop: 16,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A2E',
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    gap: 12,
  },
  settingsItemText: {
    flex: 1,
    fontSize: 15,
    color: '#FFFFFF',
  },
  logoutSection: {
    marginTop: 24,
    alignItems: 'center',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FF4040',
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#4A4458',
    marginTop: 24,
    marginBottom: 40,
  },
});
