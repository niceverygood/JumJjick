import React, { useCallback } from 'react';
import { Dimensions, StyleSheet, View, Text } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { SajuCard } from './SajuCard';
import { SajuUser } from '@/constants/mockData';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;

interface SwipeableCardProps {
  user: SajuUser;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  isFirst: boolean;
}

export const SwipeableCard: React.FC<SwipeableCardProps> = ({
  user,
  onSwipeLeft,
  onSwipeRight,
  isFirst,
}) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotation = useSharedValue(0);
  const scale = useSharedValue(isFirst ? 1 : 0.95);

  const handleSwipeComplete = useCallback((direction: 'left' | 'right') => {
    if (direction === 'left') {
      onSwipeLeft();
    } else {
      onSwipeRight();
    }
  }, [onSwipeLeft, onSwipeRight]);

  const resetPosition = useCallback(() => {
    translateX.value = withSpring(0, { damping: 20, stiffness: 200 });
    translateY.value = withSpring(0, { damping: 20, stiffness: 200 });
    rotation.value = withSpring(0, { damping: 20, stiffness: 200 });
  }, []);

  const gesture = Gesture.Pan()
    .enabled(isFirst)
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY * 0.4;
      rotation.value = interpolate(
        event.translationX,
        [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        [-12, 0, 12],
        Extrapolation.CLAMP
      );
    })
    .onEnd((event) => {
      if (Math.abs(event.translationX) > SWIPE_THRESHOLD) {
        const direction = event.translationX > 0 ? 'right' : 'left';
        const targetX = direction === 'right' ? SCREEN_WIDTH * 1.5 : -SCREEN_WIDTH * 1.5;
        const targetRotation = direction === 'right' ? 20 : -20;

        translateX.value = withTiming(targetX, { duration: 250 });
        rotation.value = withTiming(targetRotation, { duration: 250 });
        
        // Callback after animation
        setTimeout(() => {
          runOnJS(handleSwipeComplete)(direction);
        }, 200);
      } else {
        runOnJS(resetPosition)();
      }
    });

  const animatedCardStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotation.value}deg` },
        { scale: scale.value },
      ],
    };
  });

  // LIKE 인디케이터
  const likeOpacity = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        translateX.value,
        [0, SWIPE_THRESHOLD],
        [0, 1],
        Extrapolation.CLAMP
      ),
    };
  });

  // NOPE 인디케이터
  const nopeOpacity = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        translateX.value,
        [-SWIPE_THRESHOLD, 0],
        [1, 0],
        Extrapolation.CLAMP
      ),
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.cardWrapper, animatedCardStyle]}>
        <SajuCard user={user} />
        
        {/* 점찍기 인디케이터 */}
        <Animated.View style={[styles.likeIndicator, likeOpacity]}>
          <Text style={styles.likeText}>점찍기</Text>
        </Animated.View>

        {/* 넘기기 인디케이터 */}
        <Animated.View style={[styles.nopeIndicator, nopeOpacity]}>
          <Text style={styles.nopeText}>넘기기</Text>
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    position: 'absolute',
    width: '100%',
  },
  likeIndicator: {
    position: 'absolute',
    top: 80,
    left: 24,
    backgroundColor: 'rgba(0, 255, 194, 0.15)',
    borderWidth: 3,
    borderColor: '#00FFC2',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    transform: [{ rotate: '-15deg' }],
    // 글로우
    shadowColor: '#00FFC2',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
  },
  likeText: {
    color: '#00FFC2',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 2,
  },
  nopeIndicator: {
    position: 'absolute',
    top: 80,
    right: 24,
    backgroundColor: 'rgba(167, 156, 181, 0.15)',
    borderWidth: 3,
    borderColor: '#A79CB5',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    transform: [{ rotate: '15deg' }],
  },
  nopeText: {
    color: '#A79CB5',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 2,
  },
});

export default SwipeableCard;


