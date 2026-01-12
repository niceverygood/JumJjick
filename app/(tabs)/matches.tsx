import React from 'react';
import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Sparkles } from 'lucide-react-native';
import { Theme, Text as TextContent } from '@/constants/Theme';
import { GlowText } from '@/components/ui/Effects';
import { MatchScoreBadge } from '@/components/ui/Badge';

interface MatchData {
  id: string;
  name: string;
  age: number;
  image: string;
  matchScore: number;
  matchedAt: string;
  isNew: boolean;
}

const SAMPLE_MATCHES: MatchData[] = [
  {
    id: '1',
    name: '지수',
    age: 26,
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400',
    matchScore: 95,
    matchedAt: '방금 전',
    isNew: true,
  },
  {
    id: '2',
    name: '수진',
    age: 24,
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400',
    matchScore: 88,
    matchedAt: '1시간 전',
    isNew: true,
  },
  {
    id: '3',
    name: '민서',
    age: 28,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    matchScore: 82,
    matchedAt: '어제',
    isNew: false,
  },
  {
    id: '4',
    name: '하은',
    age: 25,
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400',
    matchScore: 91,
    matchedAt: '2일 전',
    isNew: false,
  },
];

export default function MatchesScreen() {
  return (
    <SafeAreaView className="flex-1 bg-deep-space">
      {/* Header */}
      <View className="px-6 pt-4 pb-4 flex-row items-center justify-between">
        <GlowText color="coral" size="2xl">
          {TextContent.matches}
        </GlowText>
        <View className="flex-row items-center gap-1">
          <Sparkles size={18} color={Theme.colors.secondary} />
          <Text className="text-mystic-mint font-bold">
            {SAMPLE_MATCHES.length}
          </Text>
        </View>
      </View>

      <ScrollView 
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
      >
        {/* New Matches Section */}
        {SAMPLE_MATCHES.some(m => m.isNew) && (
          <View className="mb-6">
            <Text className="text-lavender-gray text-sm font-semibold mb-3 px-2">
              새로운 매칭
            </Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              className="pb-2"
            >
              {SAMPLE_MATCHES.filter(m => m.isNew).map((match) => (
                <NewMatchCard key={match.id} match={match} />
              ))}
            </ScrollView>
          </View>
        )}

        {/* All Matches */}
        <View className="pb-8">
          <Text className="text-lavender-gray text-sm font-semibold mb-3 px-2">
            모든 매칭
          </Text>
          {SAMPLE_MATCHES.map((match) => (
            <MatchListItem key={match.id} match={match} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// New match circular card
function NewMatchCard({ match }: { match: MatchData }) {
  return (
    <TouchableOpacity 
      className="mr-4 items-center"
      activeOpacity={0.8}
    >
      <View 
        className="relative"
        style={Theme.shadows.coral}
      >
        <Image
          source={{ uri: match.image }}
          className="w-20 h-20 rounded-full"
        />
        <View 
          className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-electric-coral items-center justify-center"
          style={Theme.shadows.coral}
        >
          <Text className="text-white text-xs font-bold">
            {match.matchScore}
          </Text>
        </View>
        {/* Neon ring */}
        <View 
          className="absolute inset-0 rounded-full border-2 border-electric-coral"
          style={{ margin: -2 }}
        />
      </View>
      <Text className="text-starlight text-sm font-semibold mt-2">
        {match.name}
      </Text>
      <Text className="text-lavender-gray text-xs">
        {match.matchedAt}
      </Text>
    </TouchableOpacity>
  );
}

// Match list item
function MatchListItem({ match }: { match: MatchData }) {
  return (
    <TouchableOpacity 
      className="flex-row items-center p-3 mb-3 bg-deep-space-light rounded-2xl"
      style={Theme.shadows.card}
      activeOpacity={0.8}
    >
      <View className="relative">
        <Image
          source={{ uri: match.image }}
          className="w-16 h-16 rounded-full"
        />
        {match.isNew && (
          <View className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-mystic-mint" />
        )}
      </View>
      
      <View className="flex-1 ml-4">
        <View className="flex-row items-baseline gap-2">
          <Text className="text-starlight text-lg font-bold">
            {match.name}
          </Text>
          <Text className="text-lavender-gray text-sm">
            {match.age}세
          </Text>
        </View>
        <Text className="text-lavender-gray text-sm mt-0.5">
          매칭됨 · {match.matchedAt}
        </Text>
      </View>

      <MatchScoreBadge score={match.matchScore} size="sm" />
    </TouchableOpacity>
  );
}


