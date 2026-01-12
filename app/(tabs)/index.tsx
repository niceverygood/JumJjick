import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Sparkles, Clock, Coins } from 'lucide-react-native';
import { TodayCards } from '@/components/TodayCards';
import { WaitingCards } from '@/components/WaitingCards';
import { DEFAULT_USER_CURRENCY, CURRENCY, formatCurrencyShort } from '@/constants/currency';

type MainTab = 'today' | 'waiting';

export default function DiscoverScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<MainTab>('today');
  const [userBalance, setUserBalance] = useState(DEFAULT_USER_CURRENCY.balance);

  const handleRateCard = (cardId: string, rating: number) => {
    console.log('Rating:', cardId, rating);
    // 평가 보상 지급
    setUserBalance(prev => prev + CURRENCY.rewards.rateProfile);
  };

  const handleSendInterest = (cardId: string, message?: string) => {
    const cost = message 
      ? CURRENCY.prices.sendInterestWithMessage 
      : CURRENCY.prices.sendInterest;
    
    if (userBalance >= cost) {
      setUserBalance(prev => prev - cost);
      console.log('Interest sent:', cardId, message);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      {/* 헤더 */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Sparkles size={20} color="#00FFC2" />
          <Text style={styles.logo}>점찍</Text>
        </View>
        
        {/* 잔액 표시 */}
        <TouchableOpacity style={styles.balanceButton}>
          <Coins size={16} color="#FFD700" />
          <Text style={styles.balanceText}>{formatCurrencyShort(userBalance)}</Text>
          <View style={styles.plusBadge}>
            <Text style={styles.plusText}>+</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* 메인 탭 */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'today' && styles.tabActive]}
          onPress={() => setActiveTab('today')}
        >
          <Sparkles 
            size={18} 
            color={activeTab === 'today' ? '#00FFC2' : '#4A4458'} 
          />
          <Text style={[
            styles.tabText,
            activeTab === 'today' && styles.tabTextActive,
          ]}>
            오늘의 카드
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'waiting' && styles.tabActive]}
          onPress={() => setActiveTab('waiting')}
        >
          <Clock 
            size={18} 
            color={activeTab === 'waiting' ? '#00FFC2' : '#4A4458'} 
          />
          <Text style={[
            styles.tabText,
            activeTab === 'waiting' && styles.tabTextActive,
          ]}>
            기다리는 카드
          </Text>
        </TouchableOpacity>
      </View>

      {/* 컨텐츠 */}
      <View style={styles.content}>
        {activeTab === 'today' ? (
          <TodayCards
            userBalance={userBalance}
            onRateCard={handleRateCard}
            onSendInterest={handleSendInterest}
          />
        ) : (
          <WaitingCards
            onAcceptInterest={(cardId) => {
              console.log('Accept interest:', cardId);
            }}
            onRevealPhone={(cardId) => {
              if (userBalance >= CURRENCY.prices.revealPhone) {
                setUserBalance(prev => prev - CURRENCY.prices.revealPhone);
                console.log('Reveal phone:', cardId);
              }
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0F',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logo: {
    fontSize: 24,
    fontWeight: '800',
    color: '#00FFC2',
    letterSpacing: 1,
    textShadowColor: '#00FFC2',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  balanceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  balanceText: {
    color: '#FFD700',
    fontSize: 15,
    fontWeight: '700',
  },
  plusBadge: {
    backgroundColor: '#FFD700',
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 2,
  },
  plusText: {
    color: '#0A0A0F',
    fontSize: 14,
    fontWeight: '800',
    lineHeight: 18,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  tabActive: {
    backgroundColor: 'rgba(0, 255, 194, 0.1)',
    borderColor: 'rgba(0, 255, 194, 0.3)',
  },
  tabText: {
    color: '#4A4458',
    fontSize: 15,
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#00FFC2',
  },
  content: {
    flex: 1,
    marginTop: 8,
  },
});
