import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Clock, Heart, Star, Phone, ChevronRight } from 'lucide-react-native';
import { ProfileDetailModal } from './ProfileDetailModal';
import {
  WaitingCard,
  SajuUser,
  MOCK_WAITING_CARDS,
  MOCK_MATCHED_CARDS,
  getDaysRemaining,
  SAJU_ELEMENT_COLORS,
} from '@/constants/mockData';

type SubTab = 'pending' | 'inProgress' | 'matched';
type InProgressSection = 'mutual' | 'mutualHigh' | 'receivedHigh' | 'sentHigh';

interface WaitingCardsProps {
  onAcceptInterest?: (cardId: string) => void;
  onRevealPhone?: (cardId: string) => void;
}

export const WaitingCards: React.FC<WaitingCardsProps> = ({
  onAcceptInterest,
  onRevealPhone,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('pending');
  const [selectedCard, setSelectedCard] = useState<WaitingCard | null>(null);
  const [showDetail, setShowDetail] = useState(false);

  // 카드 분류
  const pendingCards = MOCK_WAITING_CARDS.filter(c => c.status === 'pending');
  const inProgressCards = MOCK_WAITING_CARDS.filter(c => 
    c.status !== 'pending' && c.status !== 'matched'
  );
  const matchedCards = MOCK_MATCHED_CARDS;

  // 진행중 카드 세부 분류
  const mutualInterestCards = inProgressCards.filter(
    c => c.sentInterest && c.receivedInterest
  );
  const mutualHighRatingCards = inProgressCards.filter(
    c => (c.myRating ?? 0) >= 3 && (c.theirRating ?? 0) >= 3
  );
  const receivedHighRatingCards = inProgressCards.filter(
    c => (c.theirRating ?? 0) >= 3 && (c.myRating ?? 0) < 3
  );
  const sentHighRatingCards = inProgressCards.filter(
    c => (c.myRating ?? 0) >= 3 && (c.theirRating ?? 0) < 3
  );

  // 데이터 있는지 체크
  const hasInProgressData = mutualInterestCards.length > 0 ||
    mutualHighRatingCards.length > 0 ||
    receivedHighRatingCards.length > 0 ||
    sentHighRatingCards.length > 0;

  const handleCardPress = (card: WaitingCard) => {
    setSelectedCard(card);
    setShowDetail(true);
  };

  const handleAcceptInterest = () => {
    if (selectedCard) {
      onAcceptInterest?.(selectedCard.id);
    }
  };

  const renderSubTabs = () => {
    const tabs: { key: SubTab; label: string; count: number }[] = [
      { key: 'pending', label: '대기중인 이성', count: pendingCards.length },
      { key: 'inProgress', label: '진행중인 이성', count: inProgressCards.length },
      { key: 'matched', label: '매칭된 이성', count: matchedCards.length },
    ];

    return (
      <View style={styles.subTabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[
              styles.subTab,
              activeSubTab === tab.key && styles.subTabActive,
            ]}
            onPress={() => setActiveSubTab(tab.key)}
          >
            <Text
              style={[
                styles.subTabText,
                activeSubTab === tab.key && styles.subTabTextActive,
              ]}
            >
              {tab.label}
            </Text>
            {tab.count > 0 && (
              <View style={[
                styles.badge,
                activeSubTab === tab.key && styles.badgeActive,
              ]}>
                <Text style={[
                  styles.badgeText,
                  activeSubTab === tab.key && styles.badgeTextActive,
                ]}>
                  {tab.count}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderPendingCards = () => (
    <View style={styles.cardList}>
      {pendingCards.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>대기중인 카드가 없어요</Text>
        </View>
      ) : (
        pendingCards.map((card) => (
          <MiniCard
            key={card.id}
            card={card}
            onPress={() => handleCardPress(card)}
            badge={`D-${getDaysRemaining(card.expiresAt)}`}
          />
        ))
      )}
    </View>
  );

  const renderInProgressCards = () => {
    if (!hasInProgressData) {
      return (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>아직 주고받은 평가가 없어요</Text>
          <Text style={styles.emptySubtext}>
            오늘의 카드에서 별점을 남겨보세요
          </Text>
        </View>
      );
    }

    return (
      <ScrollView style={styles.cardList} showsVerticalScrollIndicator={false}>
        {/* 주고받은 호감 */}
        {mutualInterestCards.length > 0 && (
          <SectionGroup title="주고받은 호감" icon="heart">
            {mutualInterestCards.map((card) => (
              <MiniCard
                key={card.id}
                card={card}
                onPress={() => handleCardPress(card)}
                badge={card.sentInterest ? '호감 보냈어요' : '호감 받았어요'}
                badgeColor={card.sentInterest ? '#FF3366' : '#00FFC2'}
              />
            ))}
          </SectionGroup>
        )}

        {/* 서로 높은 평가 */}
        {mutualHighRatingCards.length > 0 && (
          <SectionGroup title="서로 높은 평가" icon="stars">
            {mutualHighRatingCards.map((card) => (
              <MiniCard
                key={card.id}
                card={card}
                onPress={() => handleCardPress(card)}
                badge={`서로 ⭐${Math.min(card.myRating ?? 0, card.theirRating ?? 0)}+`}
                badgeColor="#FFD700"
              />
            ))}
          </SectionGroup>
        )}

        {/* 받은 높은 평가 */}
        {receivedHighRatingCards.length > 0 && (
          <SectionGroup title="받은 높은 평가" icon="star">
            {receivedHighRatingCards.map((card) => (
              <MiniCard
                key={card.id}
                card={card}
                onPress={() => handleCardPress(card)}
                badge={`⭐${card.theirRating} 받음`}
                badgeColor="#9B59FF"
              />
            ))}
          </SectionGroup>
        )}

        {/* 보낸 높은 평가 */}
        {sentHighRatingCards.length > 0 && (
          <SectionGroup title="보낸 높은 평가" icon="star">
            {sentHighRatingCards.map((card) => (
              <MiniCard
                key={card.id}
                card={card}
                onPress={() => handleCardPress(card)}
                badge={`⭐${card.myRating} 보냄`}
                badgeColor="#4D7CFF"
              />
            ))}
          </SectionGroup>
        )}
      </ScrollView>
    );
  };

  const renderMatchedCards = () => (
    <View style={styles.cardList}>
      {matchedCards.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>아직 매칭된 이성이 없어요</Text>
          <Text style={styles.emptySubtext}>
            서로 호감을 주고받으면 매칭돼요
          </Text>
        </View>
      ) : (
        matchedCards.map((card) => (
          <MatchedCard
            key={card.id}
            card={card}
            onRevealPhone={() => onRevealPhone?.(card.id)}
          />
        ))
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {renderSubTabs()}
      
      {activeSubTab === 'pending' && renderPendingCards()}
      {activeSubTab === 'inProgress' && renderInProgressCards()}
      {activeSubTab === 'matched' && renderMatchedCards()}

      {/* 프로필 상세 모달 */}
      {selectedCard && (
        <ProfileDetailModal
          visible={showDetail}
          user={selectedCard.user}
          matchScore={selectedCard.user.matchScore}
          onClose={() => setShowDetail(false)}
          onRate={() => {}}
          onSendInterest={handleAcceptInterest}
          showPhoneNumber={selectedCard.status === 'matched'}
          phoneNumber={selectedCard.user.phoneNumber}
        />
      )}
    </View>
  );
};

// 섹션 그룹 컴포넌트
const SectionGroup: React.FC<{
  title: string;
  icon: 'heart' | 'star' | 'stars';
  children: React.ReactNode;
}> = ({ title, icon, children }) => (
  <View style={styles.sectionGroup}>
    <View style={styles.sectionHeader}>
      {icon === 'heart' && <Heart size={16} color="#FF3366" />}
      {icon === 'star' && <Star size={16} color="#FFD700" />}
      {icon === 'stars' && <Star size={16} color="#FFD700" fill="#FFD700" />}
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
    {children}
  </View>
);

// 미니 카드 컴포넌트
const MiniCard: React.FC<{
  card: WaitingCard;
  onPress: () => void;
  badge?: string;
  badgeColor?: string;
}> = ({ card, onPress, badge, badgeColor = '#A79CB5' }) => {
  const elementColor = SAJU_ELEMENT_COLORS[card.user.sajuElement];

  return (
    <TouchableOpacity style={styles.miniCard} onPress={onPress} activeOpacity={0.8}>
      <Image source={{ uri: card.user.imageUrl }} style={styles.miniCardImage} />
      
      <View style={styles.miniCardInfo}>
        <View style={styles.miniCardNameRow}>
          <Text style={styles.miniCardName}>{card.user.name}</Text>
          <Text style={styles.miniCardAge}>{card.user.age}</Text>
        </View>
        <View style={styles.miniCardSajuRow}>
          <View style={[styles.miniElementBadge, { backgroundColor: elementColor.bg + '30' }]}>
            <Text style={[styles.miniElementText, { color: elementColor.bg }]}>
              {card.user.sajuElement}
            </Text>
          </View>
          <Text style={styles.miniCardSaju} numberOfLines={1}>
            {card.user.sajuCharacter}
          </Text>
        </View>
      </View>

      <View style={styles.miniCardRight}>
        {badge && (
          <View style={[styles.statusBadge, { backgroundColor: badgeColor + '20', borderColor: badgeColor }]}>
            <Text style={[styles.statusBadgeText, { color: badgeColor }]}>{badge}</Text>
          </View>
        )}
        <ChevronRight size={20} color="#4A4458" />
      </View>
    </TouchableOpacity>
  );
};

// 매칭된 카드 컴포넌트
const MatchedCard: React.FC<{
  card: WaitingCard;
  onRevealPhone: () => void;
}> = ({ card, onRevealPhone }) => {
  const [showPhone, setShowPhone] = useState(false);

  const handleReveal = () => {
    setShowPhone(true);
    onRevealPhone();
  };

  return (
    <View style={styles.matchedCard}>
      <Image source={{ uri: card.user.imageUrl }} style={styles.matchedCardImage} />
      
      <View style={styles.matchedCardInfo}>
        <Text style={styles.matchedCardName}>{card.user.name}, {card.user.age}</Text>
        <Text style={styles.matchedCardScore}>궁합 {card.user.matchScore}점 💕</Text>
      </View>

      {showPhone ? (
        <View style={styles.phoneRevealed}>
          <Text style={styles.phoneNumber}>{card.user.phoneNumber}</Text>
        </View>
      ) : (
        <TouchableOpacity style={styles.revealButton} onPress={handleReveal}>
          <Phone size={18} color="#FFFFFF" />
          <Text style={styles.revealButtonText}>번호 보기</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subTabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 8,
    gap: 8,
  },
  subTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    gap: 6,
  },
  subTabActive: {
    backgroundColor: 'rgba(0, 255, 194, 0.15)',
  },
  subTabText: {
    color: '#A79CB5',
    fontSize: 13,
    fontWeight: '500',
  },
  subTabTextActive: {
    color: '#00FFC2',
    fontWeight: '600',
  },
  badge: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  badgeActive: {
    backgroundColor: 'rgba(0, 255, 194, 0.3)',
  },
  badgeText: {
    color: '#A79CB5',
    fontSize: 11,
    fontWeight: '600',
  },
  badgeTextActive: {
    color: '#00FFC2',
  },
  cardList: {
    flex: 1,
    padding: 16,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    color: '#A79CB5',
    fontSize: 16,
    fontWeight: '500',
  },
  emptySubtext: {
    color: 'rgba(167, 156, 181, 0.6)',
    fontSize: 13,
    marginTop: 8,
  },
  sectionGroup: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  miniCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A2E',
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
  },
  miniCardImage: {
    width: 56,
    height: 56,
    borderRadius: 12,
  },
  miniCardInfo: {
    flex: 1,
    marginLeft: 12,
  },
  miniCardNameRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  miniCardName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  miniCardAge: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
  },
  miniCardSajuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  miniElementBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  miniElementText: {
    fontSize: 11,
    fontWeight: '700',
  },
  miniCardSaju: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    flex: 1,
  },
  miniCardRight: {
    alignItems: 'flex-end',
    gap: 8,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  matchedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 255, 194, 0.08)',
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 194, 0.2)',
  },
  matchedCardImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#00FFC2',
  },
  matchedCardInfo: {
    flex: 1,
    marginLeft: 12,
  },
  matchedCardName: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
  },
  matchedCardScore: {
    color: '#00FFC2',
    fontSize: 13,
    marginTop: 4,
  },
  revealButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#00FFC2',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  revealButtonText: {
    color: '#0A0A0F',
    fontSize: 14,
    fontWeight: '700',
  },
  phoneRevealed: {
    backgroundColor: 'rgba(0, 255, 194, 0.2)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },
  phoneNumber: {
    color: '#00FFC2',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 1,
  },
});

export default WaitingCards;

