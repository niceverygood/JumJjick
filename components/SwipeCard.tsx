import React, { useCallback } from 'react';
import { View, Text, Image, Dimensions, StyleSheet } from 'react-native';
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
import { Theme } from '@/constants/Theme';
import { MatchScoreBadge, Badge } from './ui/Badge';
import { ProfileData } from './ui/Card';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - 32;
const CARD_HEIGHT = SCREEN_HEIGHT * 0.65;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;
const ROTATION_ANGLE = 15;

interface SwipeCardProps {
  profile: ProfileData;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  isFirst: boolean;
}

export const SwipeCard: React.FC<SwipeCardProps> = ({
  profile,
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

  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      if (!isFirst) return;
      
      translateX.value = event.translationX;
      translateY.value = event.translationY * 0.5;
      rotation.value = interpolate(
        event.translationX,
        [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        [-ROTATION_ANGLE, 0, ROTATION_ANGLE],
        Extrapolation.CLAMP
      );
    })
    .onEnd((event) => {
      if (!isFirst) return;

      if (Math.abs(event.translationX) > SWIPE_THRESHOLD) {
        const direction = event.translationX > 0 ? 'right' : 'left';
        const targetX = direction === 'right' ? SCREEN_WIDTH * 1.5 : -SCREEN_WIDTH * 1.5;
        
        translateX.value = withTiming(targetX, { duration: 300 }, () => {
          runOnJS(handleSwipeComplete)(direction);
        });
        translateY.value = withTiming(event.translationY * 2, { duration: 300 });
        rotation.value = withTiming(direction === 'right' ? 30 : -30, { duration: 300 });
      } else {
        translateX.value = withSpring(0, { damping: 15 });
        translateY.value = withSpring(0, { damping: 15 });
        rotation.value = withSpring(0, { damping: 15 });
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotation.value}deg` },
        { scale: scale.value },
      ],
    };
  });

  // Like/Nope indicator styles
  const likeIndicatorStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [0, SWIPE_THRESHOLD],
      [0, 1],
      Extrapolation.CLAMP
    );
    return { opacity };
  });

  const nopeIndicatorStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [-SWIPE_THRESHOLD, 0],
      [1, 0],
      Extrapolation.CLAMP
    );
    return { opacity };
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[
          styles.container,
          animatedStyle,
          Theme.shadows.card,
        ]}
      >
        {/* Profile Image */}
        <Image
          source={{ uri: profile.images[0] }}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Like Indicator */}
        <Animated.View style={[styles.indicator, styles.likeIndicator, likeIndicatorStyle]}>
          <View 
            style={[styles.indicatorBadge, { borderColor: Theme.colors.secondary }]}
          >
            <Text style={[styles.indicatorText, { color: Theme.colors.secondary }]}>
              점찍기
            </Text>
          </View>
        </Animated.View>

        {/* Nope Indicator */}
        <Animated.View style={[styles.indicator, styles.nopeIndicator, nopeIndicatorStyle]}>
          <View 
            style={[styles.indicatorBadge, { borderColor: Theme.colors.error }]}
          >
            <Text style={[styles.indicatorText, { color: Theme.colors.error }]}>
              넘기기
            </Text>
          </View>
        </Animated.View>

        {/* Match Score */}
        <View style={styles.matchScore}>
          <MatchScoreBadge score={profile.matchScore} size="md" />
        </View>

        {/* Gradient Overlay */}
        <View style={styles.gradientOverlay} />

        {/* Profile Info */}
        <View style={styles.profileInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{profile.name}</Text>
            <Text style={styles.age}>{profile.age}</Text>
          </View>

          {(profile.location || profile.occupation) && (
            <Text style={styles.subtitle}>
              {[profile.occupation, profile.location].filter(Boolean).join(' · ')}
            </Text>
          )}

          {profile.bio && (
            <Text style={styles.bio} numberOfLines={2}>
              {profile.bio}
            </Text>
          )}

          {profile.sajuElements && profile.sajuElements.length > 0 && (
            <View style={styles.tagsContainer}>
              {profile.sajuElements.map((element, index) => (
                <Badge
                  key={index}
                  text={element}
                  variant={index === 0 ? 'mint' : index === 1 ? 'coral' : 'purple'}
                  size="sm"
                />
              ))}
            </View>
          )}
        </View>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: Theme.colors.cardBackground,
    position: 'absolute',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  indicator: {
    position: 'absolute',
    top: 50,
    zIndex: 10,
  },
  likeIndicator: {
    left: 20,
    transform: [{ rotate: '-15deg' }],
  },
  nopeIndicator: {
    right: 20,
    transform: [{ rotate: '15deg' }],
  },
  indicatorBadge: {
    borderWidth: 3,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(18, 9, 36, 0.8)',
  },
  indicatorText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  matchScore: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: 'rgba(18, 9, 36, 0.85)',
  },
  profileInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Theme.colors.textMain,
  },
  age: {
    fontSize: 22,
    color: Theme.colors.textSub,
  },
  subtitle: {
    fontSize: 14,
    color: Theme.colors.textSub,
    marginTop: 4,
  },
  bio: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 8,
    lineHeight: 20,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
});

export default SwipeCard;


