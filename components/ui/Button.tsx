import React from 'react';
import { TouchableOpacity, Text, View, ActivityIndicator } from 'react-native';
import { Theme } from '@/constants/Theme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

const variantStyles = {
  primary: 'bg-electric-coral',
  secondary: 'bg-mystic-mint',
  outline: 'bg-transparent border-2 border-electric-coral',
  ghost: 'bg-transparent',
};

const variantTextStyles = {
  primary: 'text-starlight',
  secondary: 'text-deep-space',
  outline: 'text-electric-coral',
  ghost: 'text-starlight',
};

const sizeStyles = {
  sm: 'px-4 py-2',
  md: 'px-6 py-3',
  lg: 'px-8 py-4',
};

const textSizeStyles = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
}) => {
  const isDisabled = disabled || loading;
  
  // Get the glow shadow based on variant
  const getGlowStyle = () => {
    if (isDisabled) return {};
    
    switch (variant) {
      case 'primary':
        return Theme.shadows.coral;
      case 'secondary':
        return Theme.shadows.mint;
      default:
        return {};
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
      className={`
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : 'self-start'}
        ${isDisabled ? 'opacity-50' : ''}
        rounded-3xl flex-row items-center justify-center
      `}
      style={getGlowStyle()}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'secondary' ? Theme.colors.background : Theme.colors.textMain} 
          size="small" 
        />
      ) : (
        <View className="flex-row items-center gap-2">
          {icon && iconPosition === 'left' && icon}
          <Text 
            className={`
              ${variantTextStyles[variant]} 
              ${textSizeStyles[size]} 
              font-bold text-center
            `}
          >
            {title}
          </Text>
          {icon && iconPosition === 'right' && icon}
        </View>
      )}
    </TouchableOpacity>
  );
};

// Icon Button variant for action buttons
interface IconButtonProps {
  icon: React.ReactNode;
  onPress: () => void;
  variant?: 'coral' | 'mint' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

const iconButtonSizes = {
  sm: 'w-10 h-10',
  md: 'w-14 h-14',
  lg: 'w-20 h-20',
};

const iconButtonVariants = {
  coral: 'bg-electric-coral',
  mint: 'bg-mystic-mint',
  ghost: 'bg-deep-space-light border border-lavender-gray/30',
};

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onPress,
  variant = 'coral',
  size = 'md',
  disabled = false,
}) => {
  const getGlowStyle = () => {
    if (disabled) return {};
    return variant === 'coral' ? Theme.shadows.coral : 
           variant === 'mint' ? Theme.shadows.mint : {};
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      className={`
        ${iconButtonSizes[size]}
        ${iconButtonVariants[variant]}
        ${disabled ? 'opacity-50' : ''}
        rounded-full items-center justify-center
      `}
      style={getGlowStyle()}
    >
      {icon}
    </TouchableOpacity>
  );
};


