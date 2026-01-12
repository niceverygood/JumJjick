import { StatusBar } from 'expo-status-bar';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { X, Sparkles, Heart, Star } from 'lucide-react-native';
import { Theme, Text as TextContent } from '@/constants/Theme';
import { Button, IconButton } from '@/components/ui/Button';
import { NeonBorder, GlowText } from '@/components/ui/Effects';
import { Badge } from '@/components/ui/Badge';

export default function PremiumModal() {
  const router = useRouter();

  const features = [
    {
      icon: <Heart size={24} color={Theme.colors.primary} fill={Theme.colors.primary} />,
      title: '무제한 좋아요',
      description: '하루 제한 없이 마음껏 점찍기',
    },
    {
      icon: <Star size={24} color={Theme.colors.secondary} />,
      title: '슈퍼 점찍기',
      description: '관심 있는 상대에게 특별하게 어필',
    },
    {
      icon: <Sparkles size={24} color={Theme.colors.neonPurple} />,
      title: '고급 사주 분석',
      description: '더 정확한 궁합 분석과 조언',
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-deep-space">
      <StatusBar style="light" />
      
      {/* Close Button */}
      <View className="absolute top-12 right-4 z-10">
        <IconButton
          icon={<X size={20} color={Theme.colors.textSub} />}
          onPress={() => router.back()}
          variant="ghost"
          size="sm"
        />
      </View>

      <ScrollView 
        className="flex-1 px-6"
        contentContainerStyle={{ paddingTop: 60, paddingBottom: 40 }}
      >
        {/* Header */}
        <View className="items-center mb-8">
          <Badge text="PREMIUM" variant="coral" size="md" glow />
          <GlowText color="coral" size="2xl" className="mt-4">
            점찍 프리미엄
          </GlowText>
          <Text className="text-lavender-gray text-center mt-2">
            더 많은 인연을 만나보세요
          </Text>
        </View>

        {/* Features */}
        <View className="mb-8">
          {features.map((feature, index) => (
            <NeonBorder 
              key={index} 
              color={index === 0 ? 'coral' : index === 1 ? 'mint' : 'purple'}
              className="p-4 mb-4 bg-deep-space-light"
            >
              <View className="flex-row items-center">
                <View className="w-12 h-12 rounded-full bg-deep-space items-center justify-center">
                  {feature.icon}
                </View>
                <View className="flex-1 ml-4">
                  <Text className="text-starlight font-bold text-lg">
                    {feature.title}
                  </Text>
                  <Text className="text-lavender-gray text-sm mt-1">
                    {feature.description}
                  </Text>
                </View>
              </View>
            </NeonBorder>
          ))}
        </View>

        {/* Pricing */}
        <View className="items-center mb-8">
          <View className="flex-row items-baseline">
            <Text className="text-starlight text-4xl font-bold">
              ₩9,900
            </Text>
            <Text className="text-lavender-gray text-lg ml-1">
              /월
            </Text>
          </View>
          <Text className="text-lavender-gray text-sm mt-2">
            언제든 구독 취소 가능
          </Text>
        </View>

        {/* CTA Button */}
        <Button
          title="프리미엄 시작하기"
          onPress={() => {}}
          variant="primary"
          size="lg"
          fullWidth
        />

        <Text className="text-lavender-gray/60 text-xs text-center mt-4">
          구매 시 이용약관 및 개인정보 처리방침에 동의하는 것으로 간주됩니다
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
