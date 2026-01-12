import React from 'react';
import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import { MessageSquare } from 'lucide-react-native';
import { Theme, Text as TextContent } from '@/constants/Theme';
import { GlowText } from '@/components/ui/Effects';
import { Badge } from '@/components/ui/Badge';

interface ChatData {
  id: string;
  name: string;
  image: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
}

const SAMPLE_CHATS: ChatData[] = [
  {
    id: '1',
    name: '지수',
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400',
    lastMessage: '안녕하세요! 반가워요 ☺️',
    timestamp: '방금',
    unreadCount: 2,
    isOnline: true,
  },
  {
    id: '2',
    name: '수진',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400',
    lastMessage: '이번 주 토요일에 시간 어떠세요?',
    timestamp: '10분 전',
    unreadCount: 1,
    isOnline: true,
  },
  {
    id: '3',
    name: '민서',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    lastMessage: '좋은 하루 보내세요! 🌸',
    timestamp: '어제',
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: '4',
    name: '하은',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400',
    lastMessage: '사주 궁합이 진짜 잘 맞는 것 같아요',
    timestamp: '3일 전',
    unreadCount: 0,
    isOnline: false,
  },
];

export default function ChatScreen() {
  const hasChats = SAMPLE_CHATS.length > 0;

  return (
    <SafeAreaView className="flex-1 bg-deep-space">
      {/* Header */}
      <View className="px-6 pt-4 pb-4 flex-row items-center justify-between">
        <GlowText color="coral" size="2xl">
          {TextContent.chat}
        </GlowText>
        <View className="flex-row items-center gap-1">
          <MessageSquare size={18} color={Theme.colors.textSub} />
          <Text className="text-lavender-gray font-medium">
            {SAMPLE_CHATS.filter(c => c.unreadCount > 0).length}
          </Text>
        </View>
      </View>

      {hasChats ? (
        <ScrollView 
          className="flex-1 px-4"
          showsVerticalScrollIndicator={false}
        >
          {SAMPLE_CHATS.map((chat) => (
            <ChatListItem key={chat.id} chat={chat} />
          ))}
        </ScrollView>
      ) : (
        <View className="flex-1 items-center justify-center px-8">
          <View 
            className="w-20 h-20 rounded-full bg-deep-space-light items-center justify-center mb-6"
            style={Theme.shadows.purple}
          >
            <MessageSquare size={36} color={Theme.colors.neonPurple} />
          </View>
          <Text className="text-starlight text-xl font-bold text-center mb-2">
            아직 대화가 없어요
          </Text>
          <Text className="text-lavender-gray text-center">
            매칭된 상대와 대화를 시작해보세요!
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

function ChatListItem({ chat }: { chat: ChatData }) {
  return (
    <TouchableOpacity 
      className="flex-row items-center p-3 mb-3 bg-deep-space-light rounded-2xl"
      style={Theme.shadows.card}
      activeOpacity={0.8}
    >
      {/* Profile Image */}
      <View className="relative">
        <Image
          source={{ uri: chat.image }}
          className="w-14 h-14 rounded-full"
        />
        {chat.isOnline && (
          <View 
            className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-mystic-mint border-2 border-deep-space-light"
            style={Theme.shadows.mint}
          />
        )}
      </View>
      
      {/* Chat Info */}
      <View className="flex-1 ml-3">
        <View className="flex-row items-center justify-between">
          <Text className="text-starlight text-base font-bold">
            {chat.name}
          </Text>
          <Text className="text-lavender-gray text-xs">
            {chat.timestamp}
          </Text>
        </View>
        <Text 
          className={`text-sm mt-1 ${
            chat.unreadCount > 0 ? 'text-starlight font-medium' : 'text-lavender-gray'
          }`}
          numberOfLines={1}
        >
          {chat.lastMessage}
        </Text>
      </View>

      {/* Unread Badge */}
      {chat.unreadCount > 0 && (
        <View 
          className="ml-2 w-6 h-6 rounded-full bg-electric-coral items-center justify-center"
          style={Theme.shadows.coral}
        >
          <Text className="text-white text-xs font-bold">
            {chat.unreadCount}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}


