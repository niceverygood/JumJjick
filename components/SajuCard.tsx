import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  Dimensions, 
  StyleSheet, 
  TouchableOpacity,
  Pressable 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  BadgeCheck, 
  Crown, 
  MapPin, 
  Briefcase, 
  GraduationCap,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from 'lucide-react-native';
import { SajuUser, SAJU_ELEMENT_COLORS } from '@/constants/mockData';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// 풀스크린에 가까운 카드 (골드스푼 스타일)
const CARD_WIDTH = SCREEN_WIDTH;
const CARD_HEIGHT = SCREEN_HEIGHT * 0.78;

interface SajuCardProps {
  user: SajuUser;
  onTapLeft?: () => void;
  onTapRight?: () => void;
}

export const SajuCard: React.FC<SajuCardProps> = ({ user, onTapLeft, onTapRight }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const elementColor = SAJU_ELEMENT_COLORS[user.sajuElement];

  const handleTap = (event: any) => {
    const x = event.nativeEvent.locationX;
    if (x < CARD_WIDTH / 3) {
      // 왼쪽 탭 - 이전 이미지
      if (currentImageIndex > 0) {
        setCurrentImageIndex(prev => prev - 1);
      }
    } else if (x > (CARD_WIDTH * 2) / 3) {
      // 오른쪽 탭 - 다음 이미지
      if (currentImageIndex < user.images.length - 1) {
        setCurrentImageIndex(prev => prev + 1);
      }
    }
  };

  return (
    <Pressable style={styles.cardContainer} onPress={handleTap}>
      {/* 배경 이미지 */}
      <Image
        source={{ uri: user.images[currentImageIndex] || user.imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />

      {/* 이미지 인디케이터 (상단) */}
      {user.images.length > 1 && (
        <View style={styles.imageIndicatorContainer}>
          {user.images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.imageIndicator,
                index === currentImageIndex && styles.imageIndicatorActive,
              ]}
            />
          ))}
        </View>
      )}

      {/* 상단 배지 영역 */}
      <View style={styles.topBadges}>
        {/* 프리미엄 배지 */}
        {user.isPremium && (
          <View style={styles.premiumBadge}>
            <Crown size={12} color="#FFD700" fill="#FFD700" />
          </View>
        )}
      </View>

      {/* 궁합 점수 뱃지 (우측 상단) */}
      <View style={styles.matchScoreBadge}>
        <Sparkles size={14} color="#00FFC2" style={{ marginBottom: 2 }} />
        <Text style={styles.matchScoreText}>{user.matchScore}</Text>
        <Text style={styles.matchScoreLabel}>궁합</Text>
      </View>

      {/* 하단 그라데이션 */}
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.85)', 'rgba(0,0,0,0.95)']}
        locations={[0, 0.3, 0.7, 1]}
        style={styles.gradient}
      />

      {/* 프로필 정보 영역 */}
      <View style={styles.profileInfo}>
        {/* 이름, 나이, 인증 배지 */}
        <View style={styles.nameRow}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.age}>{user.age}</Text>
          {user.isVerified && (
            <BadgeCheck size={22} color="#00FFC2" fill="#00FFC2" style={styles.verifiedBadge} />
          )}
        </View>

        {/* 사주 캐릭터 */}
        <View style={styles.sajuRow}>
          <View style={[styles.sajuBadge, { backgroundColor: elementColor.bg + '30', borderColor: elementColor.bg }]}>
            <Text style={[styles.sajuElementText, { color: elementColor.bg }]}>
              {user.sajuElement}
            </Text>
          </View>
          <Text style={styles.sajuCharacter}>{user.sajuCharacter}</Text>
        </View>

        {/* 직장/학력 정보 */}
        <View style={styles.infoRow}>
          {user.company && (
            <View style={styles.infoItem}>
              <Briefcase size={14} color="rgba(255,255,255,0.7)" />
              <Text style={styles.infoText}>{user.company}</Text>
            </View>
          )}
          {user.education && (
            <View style={styles.infoItem}>
              <GraduationCap size={14} color="rgba(255,255,255,0.7)" />
              <Text style={styles.infoText}>{user.education}</Text>
            </View>
          )}
        </View>

        {/* 위치 */}
        <View style={styles.locationRow}>
          <MapPin size={14} color="rgba(255,255,255,0.6)" />
          <Text style={styles.locationText}>{user.location}</Text>
          {user.height && (
            <>
              <Text style={styles.divider}>•</Text>
              <Text style={styles.locationText}>{user.height}cm</Text>
            </>
          )}
        </View>

        {/* 관심사 태그 */}
        <View style={styles.interestsRow}>
          {user.interests.slice(0, 3).map((interest, index) => (
            <View key={index} style={styles.interestTag}>
              <Text style={styles.interestText}>{interest}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* 좌우 탭 가이드 (살짝 보이게) */}
      {user.images.length > 1 && (
        <>
          {currentImageIndex > 0 && (
            <View style={styles.tapGuideLeft}>
              <ChevronLeft size={24} color="rgba(255,255,255,0.3)" />
            </View>
          )}
          {currentImageIndex < user.images.length - 1 && (
            <View style={styles.tapGuideRight}>
              <ChevronRight size={24} color="rgba(255,255,255,0.3)" />
            </View>
          )}
        </>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: '#1A1A2E',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  // 이미지 인디케이터
  imageIndicatorContainer: {
    position: 'absolute',
    top: 12,
    left: 16,
    right: 16,
    flexDirection: 'row',
    gap: 4,
    zIndex: 10,
  },
  imageIndicator: {
    flex: 1,
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
  },
  imageIndicatorActive: {
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  // 상단 배지
  topBadges: {
    position: 'absolute',
    top: 24,
    left: 16,
    flexDirection: 'row',
    gap: 8,
    zIndex: 10,
  },
  premiumBadge: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  // 궁합 점수 뱃지
  matchScoreBadge: {
    position: 'absolute',
    top: 20,
    right: 16,
    backgroundColor: 'rgba(0, 255, 194, 0.12)',
    borderWidth: 1.5,
    borderColor: '#00FFC2',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    alignItems: 'center',
    zIndex: 10,
    // 네온 글로우
    shadowColor: '#00FFC2',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 6,
  },
  matchScoreText: {
    color: '#00FFC2',
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 26,
  },
  matchScoreLabel: {
    color: '#00FFC2',
    fontSize: 10,
    opacity: 0.9,
    marginTop: 1,
  },
  // 그라데이션
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: CARD_HEIGHT * 0.55,
  },
  // 프로필 정보
  profileInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: 24,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  name: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  age: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 26,
    fontWeight: '400',
  },
  verifiedBadge: {
    marginLeft: 4,
  },
  // 사주 정보
  sajuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
  },
  sajuBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
  },
  sajuElementText: {
    fontSize: 14,
    fontWeight: '700',
  },
  sajuCharacter: {
    color: 'rgba(255,255,255,0.95)',
    fontSize: 16,
    fontWeight: '600',
  },
  // 직장/학력
  infoRow: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoText: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 14,
    fontWeight: '500',
  },
  // 위치
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 10,
  },
  locationText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 13,
  },
  divider: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 13,
  },
  // 관심사
  interestsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 14,
  },
  interestTag: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  interestText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 13,
    fontWeight: '500',
  },
  // 탭 가이드
  tapGuideLeft: {
    position: 'absolute',
    left: 8,
    top: '45%',
    opacity: 0.5,
  },
  tapGuideRight: {
    position: 'absolute',
    right: 8,
    top: '45%',
    opacity: 0.5,
  },
});

export default SajuCard;
