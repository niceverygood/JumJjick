import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme } from '@/constants/Theme';
import { MatchScoreBadge, Badge } from './Badge';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - 32;
const CARD_HEIGHT = SCREEN_HEIGHT * 0.65;

export interface ProfileData {
  id: string;
  name: string;
  age: number;
  images: string[];
  matchScore: number;
  bio?: string;
  sajuElements?: string[];
  location?: string;
  occupation?: string;
}

interface ProfileCardProps {
  profile: ProfileData;
  style?: object;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ profile, style }) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  return (
    <View
      className="bg-deep-space-light rounded-3xl overflow-hidden"
      style={[
        {
          width: CARD_WIDTH,
          height: CARD_HEIGHT,
        },
        Theme.shadows.card,
        style,
      ]}
    >
      {/* Image */}
      <View className="flex-1 relative">
        <Image
          source={{ uri: profile.images[currentImageIndex] }}
          className="w-full h-full"
          resizeMode="cover"
        />
        
        {/* Image pagination dots */}
        {profile.images.length > 1 && (
          <View className="absolute top-3 left-0 right-0 flex-row justify-center gap-1">
            {profile.images.map((_, index) => (
              <View
                key={index}
                className={`h-1 rounded-full ${
                  index === currentImageIndex
                    ? 'w-6 bg-starlight'
                    : 'w-1.5 bg-starlight/40'
                }`}
              />
            ))}
          </View>
        )}

        {/* Match Score Badge */}
        <View className="absolute top-4 right-4">
          <MatchScoreBadge score={profile.matchScore} size="md" />
        </View>

        {/* Gradient overlay for text */}
        <View className="absolute bottom-0 left-0 right-0 h-48">
          <View 
            className="flex-1"
            style={{
              backgroundColor: 'transparent',
              backgroundImage: 'linear-gradient(to top, rgba(18, 9, 36, 0.95) 0%, rgba(18, 9, 36, 0) 100%)',
            }}
          >
            {/* Use a semi-transparent overlay as fallback */}
            <View className="flex-1 bg-gradient-to-t from-deep-space to-transparent" />
          </View>
        </View>

        {/* Profile Info Overlay */}
        <View className="absolute bottom-0 left-0 right-0 p-5">
          {/* Name and Age */}
          <View className="flex-row items-baseline gap-2">
            <Text className="text-starlight text-2xl font-bold">
              {profile.name}
            </Text>
            <Text className="text-lavender-gray text-xl">
              {profile.age}
            </Text>
          </View>

          {/* Location / Occupation */}
          {(profile.location || profile.occupation) && (
            <Text className="text-lavender-gray text-sm mt-1">
              {[profile.occupation, profile.location].filter(Boolean).join(' · ')}
            </Text>
          )}

          {/* Bio */}
          {profile.bio && (
            <Text 
              className="text-starlight/90 text-sm mt-2"
              numberOfLines={2}
            >
              {profile.bio}
            </Text>
          )}

          {/* Saju Elements */}
          {profile.sajuElements && profile.sajuElements.length > 0 && (
            <View className="flex-row flex-wrap gap-2 mt-3">
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
      </View>
    </View>
  );
};

// Simple info card for various sections
interface InfoCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({ 
  title, 
  children,
  className = '',
}) => {
  return (
    <View
      className={`bg-deep-space-light rounded-3xl p-5 ${className}`}
      style={Theme.shadows.card}
    >
      {title && (
        <Text className="text-starlight text-lg font-bold mb-3">
          {title}
        </Text>
      )}
      {children}
    </View>
  );
};

// Stats card for profile stats
interface StatItemProps {
  value: string | number;
  label: string;
  color?: 'mint' | 'coral' | 'default';
}

export const StatItem: React.FC<StatItemProps> = ({ 
  value, 
  label, 
  color = 'default' 
}) => {
  const valueColors = {
    mint: 'text-mystic-mint',
    coral: 'text-electric-coral',
    default: 'text-starlight',
  };

  return (
    <View className="items-center">
      <Text className={`${valueColors[color]} text-2xl font-bold`}>
        {value}
      </Text>
      <Text className="text-lavender-gray text-sm mt-1">
        {label}
      </Text>
    </View>
  );
};


