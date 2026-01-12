import React from 'react';
import { View, Text } from 'react-native';
import { Theme } from '@/constants/Theme';

type BadgeVariant = 'mint' | 'coral' | 'purple' | 'default';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  text: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  glow?: boolean;
}

const variantStyles = {
  mint: 'bg-mystic-mint/20 border-mystic-mint',
  coral: 'bg-electric-coral/20 border-electric-coral',
  purple: 'bg-neon-purple/20 border-neon-purple',
  default: 'bg-lavender-gray/20 border-lavender-gray',
};

const variantTextStyles = {
  mint: 'text-mystic-mint',
  coral: 'text-electric-coral',
  purple: 'text-neon-purple',
  default: 'text-lavender-gray',
};

const sizeStyles = {
  sm: 'px-2 py-0.5',
  md: 'px-3 py-1',
  lg: 'px-4 py-2',
};

const textSizeStyles = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

export const Badge: React.FC<BadgeProps> = ({
  text,
  variant = 'default',
  size = 'md',
  glow = false,
}) => {
  const getGlowStyle = () => {
    if (!glow) return {};
    
    switch (variant) {
      case 'mint':
        return Theme.shadows.mint;
      case 'coral':
        return Theme.shadows.coral;
      case 'purple':
        return Theme.shadows.purple;
      default:
        return {};
    }
  };

  return (
    <View
      className={`
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        rounded-full border self-start
      `}
      style={glow ? getGlowStyle() : undefined}
    >
      <Text 
        className={`
          ${variantTextStyles[variant]}
          ${textSizeStyles[size]}
          font-semibold
        `}
      >
        {text}
      </Text>
    </View>
  );
};

// Match Score Badge with special styling
interface MatchScoreBadgeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
}

const scoreSizeStyles = {
  sm: { container: 'w-12 h-12', text: 'text-sm', subtext: 'text-xs' },
  md: { container: 'w-16 h-16', text: 'text-lg', subtext: 'text-xs' },
  lg: { container: 'w-24 h-24', text: 'text-2xl', subtext: 'text-sm' },
};

export const MatchScoreBadge: React.FC<MatchScoreBadgeProps> = ({
  score,
  size = 'md',
}) => {
  // Determine color based on score
  const getScoreColor = () => {
    if (score >= 90) return 'mint';
    if (score >= 70) return 'coral';
    return 'purple';
  };

  const colorVariant = getScoreColor();
  const styles = scoreSizeStyles[size];

  const bgColors = {
    mint: 'bg-mystic-mint/20 border-mystic-mint',
    coral: 'bg-electric-coral/20 border-electric-coral',
    purple: 'bg-neon-purple/20 border-neon-purple',
  };

  const textColors = {
    mint: 'text-mystic-mint',
    coral: 'text-electric-coral',
    purple: 'text-neon-purple',
  };

  const getGlowStyle = () => {
    switch (colorVariant) {
      case 'mint':
        return Theme.shadows.mint;
      case 'coral':
        return Theme.shadows.coral;
      default:
        return Theme.shadows.purple;
    }
  };

  return (
    <View
      className={`
        ${styles.container}
        ${bgColors[colorVariant]}
        rounded-full border-2 items-center justify-center
      `}
      style={getGlowStyle()}
    >
      <Text className={`${textColors[colorVariant]} ${styles.text} font-bold`}>
        {score}
      </Text>
      <Text className={`${textColors[colorVariant]} ${styles.subtext}`}>
        점
      </Text>
    </View>
  );
};

// Hit Badge for when there's a match
export const HitBadge: React.FC = () => {
  return (
    <View
      className="bg-mystic-mint px-6 py-3 rounded-full"
      style={Theme.shadows.mint}
    >
      <Text className="text-deep-space text-2xl font-bold">
        딱!
      </Text>
    </View>
  );
};


