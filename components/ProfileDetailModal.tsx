import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import {
  X,
  Heart,
  Star,
  MapPin,
  Briefcase,
  GraduationCap,
  BadgeCheck,
  Sparkles,
} from 'lucide-react-native';
import { SajuUser, SAJU_ELEMENT_COLORS } from '@/constants/mockData';
import { SendInterestModal } from './SendInterestModal';
import { CURRENCY, formatCurrencyShort } from '@/constants/currency';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface ProfileDetailModalProps {
  visible: boolean;
  user: SajuUser;
  matchScore: number;
  onClose: () => void;
  onRate: (rating: number) => void;
  onSendInterest: (message?: string) => void;
  showPhoneNumber?: boolean;
  phoneNumber?: string;
  initialRating?: number;  // 이미 평가한 경우
  userBalance?: number;    // 유저 잔액
}

export const ProfileDetailModal: React.FC<ProfileDetailModalProps> = ({
  visible,
  user,
  matchScore,
  onClose,
  onRate,
  onSendInterest,
  showPhoneNumber = false,
  phoneNumber,
  initialRating = 0,
  userBalance = 100,
}) => {
  const [selectedRating, setSelectedRating] = useState<number>(initialRating);
  const [hasRated, setHasRated] = useState(initialRating > 0);
  const [hasSentInterest, setHasSentInterest] = useState(false);
  const [showInterestModal, setShowInterestModal] = useState(false);

  const elementColor = SAJU_ELEMENT_COLORS[user.sajuElement];

  const handleRate = (rating: number) => {
    if (hasRated) return;  // 이미 평가했으면 무시
    setSelectedRating(rating);
  };

  const handleConfirmRating = () => {
    if (selectedRating > 0 && !hasRated) {
      onRate(selectedRating);
      setHasRated(true);
    }
  };

  const handleOpenInterestModal = () => {
    setShowInterestModal(true);
  };

  const handleSendInterest = (message?: string) => {
    onSendInterest(message);
    setHasSentInterest(true);
    setShowInterestModal(false);
  };

  return (
    <>
      <Modal
        visible={visible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={onClose}
      >
        <View style={styles.container}>
          {/* 헤더 */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* 프로필 이미지 */}
            <View style={styles.imageContainer}>
              <Image source={{ uri: user.imageUrl }} style={styles.profileImage} />
              
              {/* 궁합 점수 */}
              <View style={styles.matchBadge}>
                <Sparkles size={14} color="#00FFC2" />
                <Text style={styles.matchScoreText}>{matchScore}</Text>
                <Text style={styles.matchLabel}>궁합</Text>
              </View>
            </View>

            {/* 기본 정보 */}
            <View style={styles.infoSection}>
              <View style={styles.nameRow}>
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.age}>{user.age}</Text>
                {user.isVerified && (
                  <BadgeCheck size={20} color="#00FFC2" fill="#00FFC2" />
                )}
              </View>

              {/* 사주 정보 */}
              <View style={styles.sajuRow}>
                <View style={[styles.elementBadge, { backgroundColor: elementColor.bg + '30', borderColor: elementColor.bg }]}>
                  <Text style={[styles.elementText, { color: elementColor.bg }]}>
                    {user.sajuElement}
                  </Text>
                </View>
                <Text style={styles.sajuCharacter}>{user.sajuCharacter}</Text>
              </View>

              {/* 직장/학력/위치 */}
              <View style={styles.detailsGrid}>
                {user.company && (
                  <View style={styles.detailItem}>
                    <Briefcase size={16} color="#A79CB5" />
                    <Text style={styles.detailText}>{user.company}</Text>
                  </View>
                )}
                {user.education && (
                  <View style={styles.detailItem}>
                    <GraduationCap size={16} color="#A79CB5" />
                    <Text style={styles.detailText}>{user.education}</Text>
                  </View>
                )}
                <View style={styles.detailItem}>
                  <MapPin size={16} color="#A79CB5" />
                  <Text style={styles.detailText}>
                    {user.location} {user.height && `· ${user.height}cm`}
                  </Text>
                </View>
              </View>

              {/* 자기소개 */}
              {user.bio && (
                <View style={styles.bioSection}>
                  <Text style={styles.sectionTitle}>소개</Text>
                  <Text style={styles.bioText}>{user.bio}</Text>
                </View>
              )}

              {/* 관심사 */}
              <View style={styles.interestsSection}>
                <Text style={styles.sectionTitle}>관심사</Text>
                <View style={styles.interestTags}>
                  {user.interests.map((interest, index) => (
                    <View key={index} style={styles.interestTag}>
                      <Text style={styles.interestText}>{interest}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>

            {/* 전화번호 공개 (매칭된 경우) */}
            {showPhoneNumber && phoneNumber && (
              <View style={styles.phoneSection}>
                <Text style={styles.phoneSectionTitle}>🎉 매칭 성공!</Text>
                <Text style={styles.phoneNumber}>{phoneNumber}</Text>
                <Text style={styles.phoneHint}>탭하여 전화번호 복사</Text>
              </View>
            )}
          </ScrollView>

          {/* 하단 액션 버튼 */}
          {!showPhoneNumber && (
            <View style={styles.actionSection}>
              {/* 별점 평가 */}
              <View style={styles.ratingSection}>
                <Text style={styles.ratingTitle}>
                  {hasRated ? '평가 완료' : '이 분은 어떠세요?'}
                </Text>
                <View style={styles.starsRow}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <TouchableOpacity
                      key={star}
                      onPress={() => handleRate(star)}
                      style={[
                        styles.starButton,
                        hasRated && styles.starButtonDisabled,
                      ]}
                      disabled={hasRated}
                    >
                      <Star
                        size={36}
                        color={star <= selectedRating ? '#FFD700' : hasRated ? '#2A2A35' : '#4A4458'}
                        fill={star <= selectedRating ? '#FFD700' : 'transparent'}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
                {selectedRating > 0 && !hasRated && (
                  <TouchableOpacity
                    style={styles.confirmRatingButton}
                    onPress={handleConfirmRating}
                  >
                    <Text style={styles.confirmRatingText}>평가 완료</Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* 호감 보내기 */}
              {!hasSentInterest ? (
                <TouchableOpacity
                  style={styles.interestButton}
                  onPress={handleOpenInterestModal}
                >
                  <Heart size={22} color="#FFFFFF" fill="#FFFFFF" />
                  <Text style={styles.interestButtonText}>호감 보내기</Text>
                  <View style={styles.costIndicator}>
                    <Text style={styles.costIndicatorText}>
                      {formatCurrencyShort(CURRENCY.prices.sendInterest)}~
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <View style={styles.sentInterestButton}>
                  <Heart size={22} color="#FF3366" fill="#FF3366" />
                  <Text style={styles.sentInterestText}>호감을 보냈어요</Text>
                </View>
              )}
            </View>
          )}
        </View>
      </Modal>

      {/* 호감 보내기 모달 */}
      <SendInterestModal
        visible={showInterestModal}
        user={user}
        userBalance={userBalance}
        onClose={() => setShowInterestModal(false)}
        onSend={handleSendInterest}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0F',
  },
  header: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.5,
    position: 'relative',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  matchBadge: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'rgba(0, 255, 194, 0.15)',
    borderWidth: 1.5,
    borderColor: '#00FFC2',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    alignItems: 'center',
    shadowColor: '#00FFC2',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  matchScoreText: {
    color: '#00FFC2',
    fontSize: 24,
    fontWeight: 'bold',
  },
  matchLabel: {
    color: '#00FFC2',
    fontSize: 10,
  },
  infoSection: {
    padding: 20,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  name: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '700',
  },
  age: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 26,
  },
  sajuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 12,
  },
  elementBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
  elementText: {
    fontSize: 14,
    fontWeight: '700',
  },
  sajuCharacter: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 16,
    fontWeight: '600',
  },
  detailsGrid: {
    marginTop: 16,
    gap: 10,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    color: '#A79CB5',
    fontSize: 14,
  },
  bioSection: {
    marginTop: 24,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  bioText: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 15,
    lineHeight: 22,
  },
  interestsSection: {
    marginTop: 24,
  },
  interestTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  interestTag: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  interestText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
  },
  phoneSection: {
    backgroundColor: 'rgba(0, 255, 194, 0.1)',
    margin: 20,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 194, 0.3)',
  },
  phoneSectionTitle: {
    color: '#00FFC2',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  phoneNumber: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: 2,
  },
  phoneHint: {
    color: '#A79CB5',
    fontSize: 12,
    marginTop: 8,
  },
  actionSection: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#0D0D12',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
  },
  ratingSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  ratingTitle: {
    color: '#A79CB5',
    fontSize: 14,
    marginBottom: 12,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  starButton: {
    padding: 4,
  },
  starButtonDisabled: {
    opacity: 0.6,
  },
  confirmRatingButton: {
    marginTop: 16,
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.5)',
  },
  confirmRatingText: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: '600',
  },
  interestButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#FF3366',
    paddingVertical: 16,
    borderRadius: 30,
    shadowColor: '#FF3366',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
  },
  interestButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  costIndicator: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  costIndicatorText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  sentInterestButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: 'rgba(255, 51, 102, 0.15)',
    paddingVertical: 16,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(255, 51, 102, 0.5)',
  },
  sentInterestText: {
    color: '#FF3366',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ProfileDetailModal;
