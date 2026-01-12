import React from 'react';
import { View, StyleSheet } from 'react-native';
import { X, Heart, Star, RotateCcw } from 'lucide-react-native';
import { IconButton } from './ui/Button';
import { Theme } from '@/constants/Theme';

interface ActionButtonsProps {
  onPass: () => void;
  onLike: () => void;
  onSuperLike?: () => void;
  onUndo?: () => void;
  disabled?: boolean;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onPass,
  onLike,
  onSuperLike,
  onUndo,
  disabled = false,
}) => {
  return (
    <View style={styles.container}>
      {/* Undo Button (optional) */}
      {onUndo && (
        <IconButton
          icon={<RotateCcw size={22} color={Theme.colors.textSub} />}
          onPress={onUndo}
          variant="ghost"
          size="sm"
          disabled={disabled}
        />
      )}

      {/* Pass Button */}
      <IconButton
        icon={<X size={32} color={Theme.colors.error} />}
        onPress={onPass}
        variant="ghost"
        size="lg"
        disabled={disabled}
      />

      {/* Super Like Button (optional) */}
      {onSuperLike && (
        <IconButton
          icon={<Star size={24} color={Theme.colors.neonPurple} />}
          onPress={onSuperLike}
          variant="ghost"
          size="md"
          disabled={disabled}
        />
      )}

      {/* Like Button */}
      <IconButton
        icon={<Heart size={32} color="#fff" fill="#fff" />}
        onPress={onLike}
        variant="coral"
        size="lg"
        disabled={disabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
});

export default ActionButtons;


