import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal, TouchableOpacity } from 'react-native';
import { X } from 'lucide-react-native';
import { FlipCard } from './FlipCard';
import { ProfileDetailModal } from './ProfileDetailModal';
import { TodayCard, MOCK_TODAY_CARDS } from '@/constants/mockData';
import { DEFAULT_USER_CURRENCY } from '@/constants/currency';

interface TodayCardsProps {
  userBalance?: number;
  onRateCard?: (cardId: string, rating: number) => void;
  onSendInterest?: (cardId: string, message?: string) => void;
  onBalanceChange?: (newBalance: number) => void;
}

export const TodayCards: React.FC<TodayCardsProps> = ({
  userBalance = DEFAULT_USER_CURRENCY.balance,
  onRateCard,
  onSendInterest,
  onBalanceChange,
}) => {
  const [cards, setCards] = useState<TodayCard[]>(MOCK_TODAY_CARDS);
  const [selectedCard, setSelectedCard] = useState<TodayCard | null>(null);
  const [showDetail, setShowDetail] = useState(false);

  const handleReveal = (cardId: string) => {
    setCards(prev =>
      prev.map(card =>
        card.id === cardId ? { ...card, status: 'revealed' as const } : card
      )
    );
  };

  const handleViewDetail = (cardId: string) => {
    const card = cards.find(c => c.id === cardId);
    if (card) {
      setSelectedCard(card);
      setShowDetail(true);
    }
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
    setSelectedCard(null);
  };

  const handleRate = (rating: number) => {
    if (selectedCard) {
      onRateCard?.(selectedCard.id, rating);
      // 별점 주면 기다리는 카드로 이동 처리
    }
  };

  const handleSendInterest = (message?: string) => {
    if (selectedCard) {
      onSendInterest?.(selectedCard.id, message);
    }
  };

  // 도착한 카드 수
  const arrivedCount = cards.filter(c => c.status !== 'locked').length;
  const totalCount = cards.length;

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.subtitle}>
          오늘 받은 카드 <Text style={styles.countHighlight}>{arrivedCount}</Text>/{totalCount}
        </Text>
        <Text style={styles.hint}>
          오전 11:30에 기다리는 카드로 이동해요
        </Text>
      </View>

      {/* 카드 그리드 */}
      <View style={styles.grid}>
        {cards.map((card) => (
          <FlipCard
            key={card.id}
            card={card}
            onReveal={handleReveal}
            onViewDetail={handleViewDetail}
          />
        ))}
      </View>

      {/* 안내 문구 */}
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          💡 정오, 오후 3시, 6시, 9시에 새 카드가 도착해요
        </Text>
      </View>

      {/* 프로필 상세 모달 */}
      {selectedCard && (
        <ProfileDetailModal
          visible={showDetail}
          user={selectedCard.user}
          matchScore={selectedCard.user.matchScore}
          onClose={handleCloseDetail}
          onRate={handleRate}
          onSendInterest={handleSendInterest}
          userBalance={userBalance}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  subtitle: {
    color: '#A79CB5',
    fontSize: 14,
  },
  countHighlight: {
    color: '#00FFC2',
    fontWeight: '700',
  },
  hint: {
    color: 'rgba(167, 156, 181, 0.6)',
    fontSize: 12,
    marginTop: 4,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'space-between',
  },
  infoBox: {
    marginTop: 24,
    backgroundColor: 'rgba(0, 255, 194, 0.08)',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 194, 0.2)',
  },
  infoText: {
    color: '#A79CB5',
    fontSize: 13,
    textAlign: 'center',
  },
});

export default TodayCards;
