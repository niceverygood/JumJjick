import { Link, Stack } from 'expo-router';
import { View, Text } from 'react-native';
import { Home } from 'lucide-react-native';
import { Theme } from '@/constants/Theme';
import { Button } from '@/components/ui/Button';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: '페이지를 찾을 수 없어요' }} />
      <View className="flex-1 bg-deep-space items-center justify-center px-8">
        {/* Icon */}
        <View 
          className="w-24 h-24 rounded-full bg-deep-space-light items-center justify-center mb-8"
          style={Theme.shadows.purple}
        >
          <Text className="text-5xl">🌙</Text>
        </View>

        {/* Message */}
        <Text className="text-starlight text-2xl font-bold text-center mb-2">
          앗! 길을 잃었어요
        </Text>
        <Text className="text-lavender-gray text-center mb-8">
          요청하신 페이지를 찾을 수 없습니다
        </Text>

        {/* Back Button */}
        <Link href="/" asChild>
          <Button
            title="홈으로 돌아가기"
            onPress={() => {}}
            variant="primary"
            icon={<Home size={18} color="#fff" />}
          />
        </Link>
      </View>
    </>
  );
}
