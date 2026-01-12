import { Tabs } from 'expo-router';
import { View, StyleSheet, Platform } from 'react-native';
import { Sparkles, User } from 'lucide-react-native';

// 브랜드 컬러
const COLORS = {
  background: '#0A0A0F',
  tabBar: '#0D0D12',
  active: '#00FFC2',
  inactive: '#4A4458',
  border: 'rgba(255,255,255,0.05)',
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.active,
        tabBarInactiveTintColor: COLORS.inactive,
        tabBarStyle: {
          backgroundColor: COLORS.tabBar,
          borderTopColor: COLORS.border,
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 88 : 70,
          paddingTop: 8,
          paddingBottom: Platform.OS === 'ios' ? 28 : 12,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginBottom: -4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '발견',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon focused={focused}>
              <Sparkles size={24} color={color} />
            </TabIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'MY',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon focused={focused}>
              <User size={24} color={color} />
            </TabIcon>
          ),
        }}
      />
      {/* 숨김 처리된 탭들 */}
      <Tabs.Screen
        name="matches"
        options={{
          href: null, // 탭바에서 숨김
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          href: null, // 탭바에서 숨김
        }}
      />
    </Tabs>
  );
}

function TabIcon({
  children,
  focused,
}: {
  children: React.ReactNode;
  focused: boolean;
}) {
  return (
    <View style={[styles.iconContainer, focused && styles.iconContainerActive]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    padding: 4,
    borderRadius: 12,
  },
  iconContainerActive: {
    shadowColor: '#00FFC2',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 4,
  },
});
