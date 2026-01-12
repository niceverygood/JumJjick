import React from 'react';
import { View, Text, ViewStyle, TextStyle } from 'react-native';
import { Theme } from '@/constants/Theme';

// Glowing text component for emphasis
interface GlowTextProps {
  children: string;
  color?: 'coral' | 'mint' | 'purple' | 'white';
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
}

const colorStyles = {
  coral: 'text-electric-coral',
  mint: 'text-mystic-mint',
  purple: 'text-neon-purple',
  white: 'text-starlight',
};

const sizeStyles = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
};

export const GlowText: React.FC<GlowTextProps> = ({
  children,
  color = 'coral',
  size = 'md',
  className = '',
}) => {
  const getTextShadow = (): TextStyle => {
    const shadowColors = {
      coral: Theme.colors.primary,
      mint: Theme.colors.secondary,
      purple: Theme.colors.neonPurple,
      white: Theme.colors.textMain,
    };

    return {
      textShadowColor: shadowColors[color],
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 10,
    };
  };

  return (
    <Text
      className={`${colorStyles[color]} ${sizeStyles[size]} font-bold ${className}`}
      style={getTextShadow()}
    >
      {children}
    </Text>
  );
};

// Neon border wrapper component
interface NeonBorderProps {
  children: React.ReactNode;
  color?: 'coral' | 'mint' | 'purple';
  borderWidth?: number;
  className?: string;
}

export const NeonBorder: React.FC<NeonBorderProps> = ({
  children,
  color = 'coral',
  borderWidth = 2,
  className = '',
}) => {
  const borderColors = {
    coral: Theme.colors.primary,
    mint: Theme.colors.secondary,
    purple: Theme.colors.neonPurple,
  };

  const getGlowStyle = (): ViewStyle => {
    switch (color) {
      case 'coral':
        return Theme.shadows.coral;
      case 'mint':
        return Theme.shadows.mint;
      case 'purple':
        return Theme.shadows.purple;
    }
  };

  return (
    <View
      className={`rounded-3xl ${className}`}
      style={[
        {
          borderWidth,
          borderColor: borderColors[color],
        },
        getGlowStyle(),
      ]}
    >
      {children}
    </View>
  );
};

// Decorative elements
export const NeonCircle: React.FC<{
  size?: number;
  color?: 'coral' | 'mint' | 'purple';
}> = ({ size = 100, color = 'coral' }) => {
  const bgColors = {
    coral: 'bg-electric-coral/20',
    mint: 'bg-mystic-mint/20',
    purple: 'bg-neon-purple/20',
  };

  const getGlowStyle = (): ViewStyle => {
    switch (color) {
      case 'coral':
        return { ...Theme.shadows.coral, opacity: 0.5 };
      case 'mint':
        return { ...Theme.shadows.mint, opacity: 0.5 };
      case 'purple':
        return { ...Theme.shadows.purple, opacity: 0.5 };
    }
  };

  return (
    <View
      className={`${bgColors[color]} rounded-full`}
      style={[
        {
          width: size,
          height: size,
        },
        getGlowStyle(),
      ]}
    />
  );
};

// Gradient background overlay
export const GradientOverlay: React.FC<{
  direction?: 'top' | 'bottom';
  intensity?: 'light' | 'medium' | 'strong';
  className?: string;
}> = ({ 
  direction = 'bottom', 
  intensity = 'medium',
  className = '',
}) => {
  const opacities = {
    light: 0.5,
    medium: 0.75,
    strong: 0.95,
  };

  return (
    <View
      className={`absolute left-0 right-0 ${className}`}
      style={{
        [direction === 'top' ? 'top' : 'bottom']: 0,
        height: 150,
        backgroundColor: `rgba(18, 9, 36, ${opacities[intensity]})`,
      }}
    />
  );
};


