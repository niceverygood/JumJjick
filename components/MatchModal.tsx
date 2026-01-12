import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Modal as RNModal, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { MessageCircle } from 'lucide-react-native';
import { Theme, Text as TextContent } from '@/constants/Theme';
import { Button } from './ui/Button';
import { HitBadge, MatchScoreBadge } from './ui/Badge';
import { ProfileData } from './ui/Card';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface MatchModalProps {
  visible: boolean;
  userProfile: ProfileData;
  matchedProfile: ProfileData;
  onChat: () => void;
  onKeepSwiping: () => void;
}

export const MatchModal: React.FC<MatchModalProps> = ({
  visible,
  userProfile,
  matchedProfile,
  onChat,
  onKeepSwiping,
}) => {
  const scale = useSharedValue(0);
  const badgeScale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const leftImageX = useSharedValue(-100);
  const rightImageX = useSharedValue(100);

  useEffect(() => {
    if (visible) {
      // Animate in sequence
      opacity.value = withTiming(1, { duration: 200 });
      
      leftImageX.value = withDelay(200, withSpring(-30, { damping: 12 }));
      rightImageX.value = withDelay(200, withSpring(30, { damping: 12 }));
      
      scale.value = withDelay(400, withSequence(
        withSpring(1.2, { damping: 8 }),
        withSpring(1, { damping: 10 })
      ));
      
      badgeScale.value = withDelay(600, withSequence(
        withSpring(1.3, { damping: 6 }),
        withSpring(1, { damping: 10 })
      ));
    } else {
      opacity.value = 0;
      scale.value = 0;
      badgeScale.value = 0;
      leftImageX.value = -100;
      rightImageX.value = 100;
    }
  }, [visible]);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const textStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const badgeStyle = useAnimatedStyle(() => ({
    transform: [{ scale: badgeScale.value }],
  }));

  const leftImageStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: leftImageX.value }, { rotate: '-10deg' }],
  }));

  const rightImageStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: rightImageX.value }, { rotate: '10deg' }],
  }));

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
    >
      <Animated.View style={[styles.overlay, containerStyle]}>
        {/* Decorative circles */}
        <View style={styles.decorCircle1} />
        <View style={styles.decorCircle2} />
        <View style={styles.decorCircle3} />

        <View style={styles.content}>
          {/* Match Badge */}
          <Animated.View style={[styles.badgeContainer, badgeStyle]}>
            <HitBadge />
          </Animated.View>

          {/* Match Text */}
          <Animated.View style={[styles.textContainer, textStyle]}>
            <Text style={styles.matchText}>
              {TextContent.itsAMatch}
            </Text>
          </Animated.View>

          {/* Profile Images */}
          <View style={styles.imagesContainer}>
            <Animated.View style={[styles.imageWrapper, styles.leftImage, leftImageStyle]}>
              <Image
                source={{ uri: userProfile.images[0] }}
                style={styles.profileImage}
              />
              <View style={styles.imageBorder} />
            </Animated.View>

            <Animated.View style={[styles.imageWrapper, styles.rightImage, rightImageStyle]}>
              <Image
                source={{ uri: matchedProfile.images[0] }}
                style={styles.profileImage}
              />
              <View style={[styles.imageBorder, { borderColor: Theme.colors.secondary }]} />
            </Animated.View>
          </View>

          {/* Match Score */}
          <View style={styles.scoreContainer}>
            <MatchScoreBadge score={matchedProfile.matchScore} size="lg" />
            <Text style={styles.scoreLabel}>궁합 점수</Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonsContainer}>
            <Button
              title={TextContent.startChat}
              onPress={onChat}
              variant="primary"
              size="lg"
              fullWidth
              icon={<MessageCircle size={20} color="#fff" />}
            />
            
            <TouchableOpacity 
              onPress={onKeepSwiping}
              style={styles.keepSwipingButton}
            >
              <Text style={styles.keepSwipingText}>
                {TextContent.keepSwiping}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(18, 9, 36, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 32,
    width: '100%',
  },
  badgeContainer: {
    marginBottom: 16,
  },
  textContainer: {
    marginBottom: 40,
  },
  matchText: {
    fontSize: 20,
    color: Theme.colors.textMain,
    textAlign: 'center',
    fontWeight: '600',
  },
  imagesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    height: 160,
  },
  imageWrapper: {
    width: 130,
    height: 130,
    borderRadius: 65,
    overflow: 'hidden',
  },
  leftImage: {
    zIndex: 1,
  },
  rightImage: {
    zIndex: 2,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 65,
  },
  imageBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 65,
    borderWidth: 3,
    borderColor: Theme.colors.primary,
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  scoreLabel: {
    color: Theme.colors.textSub,
    fontSize: 14,
    marginTop: 8,
  },
  buttonsContainer: {
    width: '100%',
    gap: 16,
  },
  keepSwipingButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  keepSwipingText: {
    color: Theme.colors.textSub,
    fontSize: 16,
  },
  // Decorative circles
  decorCircle1: {
    position: 'absolute',
    top: 80,
    left: -50,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: Theme.colors.primary,
    opacity: 0.1,
  },
  decorCircle2: {
    position: 'absolute',
    bottom: 120,
    right: -30,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Theme.colors.secondary,
    opacity: 0.1,
  },
  decorCircle3: {
    position: 'absolute',
    top: '40%',
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Theme.colors.neonPurple,
    opacity: 0.15,
  },
});

export default MatchModal;


