import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import { Theme } from '@/constants/Theme';

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  error?: string;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  icon?: React.ReactNode;
  multiline?: boolean;
  numberOfLines?: number;
}

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  error,
  autoCapitalize = 'none',
  keyboardType = 'default',
  icon,
  multiline = false,
  numberOfLines = 1,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const showPassword = secureTextEntry && !isPasswordVisible;

  return (
    <View className="mb-4">
      {label && (
        <Text className="text-lavender-gray text-sm mb-2 font-medium">
          {label}
        </Text>
      )}
      
      <View
        className={`
          bg-deep-space-light rounded-2xl px-4 py-3 flex-row items-center
          border-2 
          ${isFocused 
            ? 'border-electric-coral' 
            : error 
              ? 'border-error' 
              : 'border-transparent'
          }
        `}
        style={isFocused ? Theme.shadows.coral : undefined}
      >
        {icon && (
          <View className="mr-3">
            {icon}
          </View>
        )}
        
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={Theme.colors.textSub}
          secureTextEntry={showPassword}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={numberOfLines}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="flex-1 text-starlight text-base"
          style={{
            minHeight: multiline ? numberOfLines * 24 : undefined,
            textAlignVertical: multiline ? 'top' : 'center',
          }}
        />
        
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            className="ml-2 p-1"
          >
            {isPasswordVisible ? (
              <EyeOff size={20} color={Theme.colors.textSub} />
            ) : (
              <Eye size={20} color={Theme.colors.textSub} />
            )}
          </TouchableOpacity>
        )}
      </View>
      
      {error && (
        <Text className="text-error text-sm mt-1">
          {error}
        </Text>
      )}
    </View>
  );
};


