import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { Clock, Lock, Sparkles, BadgeCheck } from 'lucide-react-native';
import { TodayCard, CardStatus, getCardArrivalTimeLabel, SAJU_ELEMENT_COLORS } from '@/constants/mockData';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = (SCREEN_WIDTH - 48) / 2;
const CARD_HEIGHT = CARD_WIDTH * 1.4;

interface FlipCardProps {
  card: TodayCard;
  onReveal: (cardId: string) => void;
  onViewDetail: (cardId: string) => void;
}

export const FlipCard: React.FC<FlipCardProps> = ({ card, onReveal, onViewDetail }) => {
  const flipProgress = useSharedValue(card.status === 'arrived' ? 0 : 1);
  const [isFlipped, setIsFlipped] = useState(card.status !== 'arrived');

  const handlePress = () => {
    if (card.status === 'locked') return;

    if (!isFlipped) {
      // 첫 번째 탭: 카드 뒤집기
      flipProgress.value = withTiming(1, { duration: 600 });
      setIsFlipped(true);
      onReveal(card.id);
    } else {
      // 두 번째 탭: 상세 보기
      onViewDetail(card.id);
    }
  };

  const frontAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(
      flipProgress.value,
      [0, 1],
      [0, 180],
      Extrapolation.CLAMP
    );
    return {
      transform: [{ perspective: 1000 }, { rotateY: `${rotateY}deg` }],
      backfaceVisibility: 'hidden',
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(
      flipProgress.value,
      [0, 1],
      [180, 360],
      Extrapolation.CLAMP
    );
    return {
      transform: [{ perspective: 1000 }, { rotateY: `${rotateY}deg` }],
      backfaceVisibility: 'hidden',
    };
  });

  const elementColor = SAJU_ELEMENT_COLORS[card.user.sajuElement];

  return (
    <TouchableOpacity
      activeOpacity={card.status === 'locked' ? 1 : 0.9}
      onPress={handlePress}
      style={styles.container}
    >
      {/* 뒷면 (뒤집어진 상태 - 처음에 보임) */}
      <Animated.View style={[styles.card, styles.cardBack, frontAnimatedStyle]}>
        {card.status === 'locked' ? (
          <>
            <Lock size={32} color="#4A4458" />
            <Text style={styles.timeLabel}>{getCardArrivalTimeLabel(card.arrivalTime)}</Text>
            <Text style={styles.lockedText}>도착 예정</Text>
          </>
        ) : (
          <>
            <View style={styles.sparkleContainer}>
              <Sparkles size={28} color="#00FFC2" />
            </View>
            <Text style={styles.timeLabel}>{getCardArrivalTimeLabel(card.arrivalTime)}</Text>
            <Text style={styles.arrivedText}>카드 도착!</Text>
            <Text style={styles.tapHint}>탭하여 확인</Text>
          </>
        )}
      </Animated.View>

      {/* 앞면 (요약 프로필) */}
      <Animated.View style={[styles.card, styles.cardFront, backAnimatedStyle]}>
        <Image
          source={{ uri: card.user.imageUrl }}
          style={styles.profileImage}
        />
        
        {/* 궁합 점수 */}
        <View style={styles.matchBadge}>
          <Text style={styles.matchScore}>{card.user.matchScore}</Text>
        </View>

        {/* 하단 정보 */}
        <View style={styles.infoOverlay}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{card.user.name}</Text>
            <Text style={styles.age}>{card.user.age}</Text>
            {card.user.isVerified && (
              <BadgeCheck size={14} color="#00FFC2" fill="#00FFC2" />
            )}
          </View>
          <View style={styles.sajuRow}>
            <View style={[styles.elementBadge, { backgroundColor: elementColor.bg + '40' }]}>
              <Text style={[styles.elementText, { color: elementColor.bg }]}>
                {card.user.sajuElement}
              </Text>
            </View>
            <Text style={styles.sajuCharacter} numberOfLines={1}>
              {card.user.sajuCharacter}
            </Text>
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },
  card: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 16,
    overflow: 'hidden',
  },
  cardBack: {
    backgroundColor: '#1A1A2E',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  cardFront: {
    backgroundColor: '#1A1A2E',
  },
  sparkleContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(0, 255, 194, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    // 글로우
    shadowColor: '#00FFC2',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  timeLabel: {
    color: '#A79CB5',
    fontSize: 13,
    marginTop: 8,
  },
  lockedText: {
    color: '#4A4458',
    fontSize: 12,
    marginTop: 4,
  },
  arrivedText: {
    color: '#00FFC2',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
  },
  tapHint: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 11,
    marginTop: 8,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  matchBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 255, 194, 0.2)',
    borderWidth: 1.5,
    borderColor: '#00FFC2',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    shadowColor: '#00FFC2',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
  },
  matchScore: {
    color: '#00FFC2',
    fontSize: 14,
    fontWeight: 'bold',
  },
  infoOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 10,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  name: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  age: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  sajuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  elementBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  elementText: {
    fontSize: 11,
    fontWeight: '700',
  },
  sajuCharacter: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    flex: 1,
  },
});

export default FlipCard;

