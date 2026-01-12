import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { X, Heart, MessageCircle, Sparkles, AlertCircle } from 'lucide-react-native';
import { SajuUser } from '@/constants/mockData';
import { CURRENCY, formatCurrencyShort, hasEnoughBalance } from '@/constants/currency';

interface SendInterestModalProps {
  visible: boolean;
  user: SajuUser;
  userBalance: number;
  onClose: () => void;
  onSend: (message?: string) => void;
}

export const SendInterestModal: React.FC<SendInterestModalProps> = ({
  visible,
  user,
  userBalance,
  onClose,
  onSend,
}) => {
  const [message, setMessage] = useState('');
  const [includeMessage, setIncludeMessage] = useState(false);

  const cost = includeMessage ? CURRENCY.prices.sendInterestWithMessage : CURRENCY.prices.sendInterest;
  const canAfford = hasEnoughBalance(userBalance, cost);

  const handleSend = () => {
    if (!canAfford) return;
    onSend(includeMessage ? message : undefined);
    setMessage('');
    setIncludeMessage(false);
  };

  const handleClose = () => {
    setMessage('');
    setIncludeMessage(false);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.overlay}
      >
        <View style={styles.container}>
          {/* 헤더 */}
          <View style={styles.header}>
            <Text style={styles.title}>호감 보내기</Text>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <X size={22} color="#A79CB5" />
            </TouchableOpacity>
          </View>

          {/* 대상 유저 정보 */}
          <View style={styles.userInfo}>
            <Image source={{ uri: user.imageUrl }} style={styles.userImage} />
            <View style={styles.userDetails}>
              <Text style={styles.userName}>{user.name}, {user.age}</Text>
              <Text style={styles.userSaju}>{user.sajuCharacter}</Text>
            </View>
            <View style={styles.matchBadge}>
              <Sparkles size={12} color="#00FFC2" />
              <Text style={styles.matchScore}>{user.matchScore}점</Text>
            </View>
          </View>

          {/* 잔액 표시 */}
          <View style={styles.balanceSection}>
            <Text style={styles.balanceLabel}>내 잔액</Text>
            <View style={styles.balanceAmount}>
              <Text style={styles.balanceText}>{formatCurrencyShort(userBalance)}</Text>
            </View>
          </View>

          {/* 옵션 선택 */}
          <View style={styles.optionsSection}>
            {/* 기본 호감 */}
            <TouchableOpacity
              style={[
                styles.optionCard,
                !includeMessage && styles.optionCardSelected,
              ]}
              onPress={() => setIncludeMessage(false)}
            >
              <View style={styles.optionLeft}>
                <Heart size={20} color={!includeMessage ? '#FF3366' : '#A79CB5'} />
                <View>
                  <Text style={[
                    styles.optionTitle,
                    !includeMessage && styles.optionTitleSelected,
                  ]}>
                    호감만 보내기
                  </Text>
                  <Text style={styles.optionDesc}>상대방에게 관심을 표현해요</Text>
                </View>
              </View>
              <View style={[
                styles.costBadge,
                !includeMessage && styles.costBadgeSelected,
              ]}>
                <Text style={[
                  styles.costText,
                  !includeMessage && styles.costTextSelected,
                ]}>
                  {formatCurrencyShort(CURRENCY.prices.sendInterest)}
                </Text>
              </View>
            </TouchableOpacity>

            {/* 메시지와 함께 */}
            <TouchableOpacity
              style={[
                styles.optionCard,
                includeMessage && styles.optionCardSelected,
              ]}
              onPress={() => setIncludeMessage(true)}
            >
              <View style={styles.optionLeft}>
                <MessageCircle size={20} color={includeMessage ? '#00FFC2' : '#A79CB5'} />
                <View>
                  <Text style={[
                    styles.optionTitle,
                    includeMessage && styles.optionTitleSelected,
                  ]}>
                    메시지와 함께
                  </Text>
                  <Text style={styles.optionDesc}>첫인상을 더 좋게 만들어요</Text>
                </View>
              </View>
              <View style={[
                styles.costBadge,
                includeMessage && styles.costBadgeSelectedMint,
              ]}>
                <Text style={[
                  styles.costText,
                  includeMessage && styles.costTextSelectedMint,
                ]}>
                  {formatCurrencyShort(CURRENCY.prices.sendInterestWithMessage)}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* 메시지 입력 */}
          {includeMessage && (
            <View style={styles.messageSection}>
              <Text style={styles.messageLabel}>메시지 (선택)</Text>
              <TextInput
                style={styles.messageInput}
                placeholder="첫 인사를 남겨보세요..."
                placeholderTextColor="#4A4458"
                value={message}
                onChangeText={setMessage}
                multiline
                maxLength={100}
              />
              <Text style={styles.charCount}>{message.length}/100</Text>
            </View>
          )}

          {/* 잔액 부족 경고 */}
          {!canAfford && (
            <View style={styles.warningBox}>
              <AlertCircle size={16} color="#FF4040" />
              <Text style={styles.warningText}>
                잔액이 부족해요. {formatCurrencyShort(cost - userBalance)} 더 필요해요.
              </Text>
            </View>
          )}

          {/* 보내기 버튼 */}
          <TouchableOpacity
            style={[
              styles.sendButton,
              !canAfford && styles.sendButtonDisabled,
            ]}
            onPress={handleSend}
            disabled={!canAfford}
          >
            <Heart size={20} color="#FFFFFF" fill="#FFFFFF" />
            <Text style={styles.sendButtonText}>
              {formatCurrencyShort(cost)} 사용하여 호감 보내기
            </Text>
          </TouchableOpacity>

          {/* 충전 유도 */}
          {!canAfford && (
            <TouchableOpacity style={styles.chargeButton}>
              <Text style={styles.chargeButtonText}>찍 충전하기</Text>
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#0D0D12',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  closeButton: {
    padding: 4,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
  },
  userImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  userDetails: {
    flex: 1,
    marginLeft: 12,
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  userSaju: {
    color: '#A79CB5',
    fontSize: 13,
    marginTop: 2,
  },
  matchBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(0, 255, 194, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  matchScore: {
    color: '#00FFC2',
    fontSize: 13,
    fontWeight: '600',
  },
  balanceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  balanceLabel: {
    color: '#A79CB5',
    fontSize: 14,
  },
  balanceAmount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  balanceText: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: '700',
  },
  optionsSection: {
    gap: 10,
    marginBottom: 16,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  optionCardSelected: {
    backgroundColor: 'rgba(255, 51, 102, 0.08)',
    borderColor: 'rgba(255, 51, 102, 0.4)',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  optionTitle: {
    color: '#A79CB5',
    fontSize: 15,
    fontWeight: '600',
  },
  optionTitleSelected: {
    color: '#FFFFFF',
  },
  optionDesc: {
    color: '#4A4458',
    fontSize: 12,
    marginTop: 2,
  },
  costBadge: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  costBadgeSelected: {
    backgroundColor: 'rgba(255, 51, 102, 0.2)',
  },
  costBadgeSelectedMint: {
    backgroundColor: 'rgba(0, 255, 194, 0.2)',
  },
  costText: {
    color: '#A79CB5',
    fontSize: 14,
    fontWeight: '600',
  },
  costTextSelected: {
    color: '#FF3366',
  },
  costTextSelectedMint: {
    color: '#00FFC2',
  },
  messageSection: {
    marginBottom: 16,
  },
  messageLabel: {
    color: '#A79CB5',
    fontSize: 13,
    marginBottom: 8,
  },
  messageInput: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    padding: 14,
    color: '#FFFFFF',
    fontSize: 15,
    minHeight: 80,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 194, 0.3)',
  },
  charCount: {
    color: '#4A4458',
    fontSize: 12,
    textAlign: 'right',
    marginTop: 6,
  },
  warningBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 64, 64, 0.1)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  warningText: {
    color: '#FF4040',
    fontSize: 13,
    flex: 1,
  },
  sendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#FF3366',
    borderRadius: 16,
    paddingVertical: 16,
    shadowColor: '#FF3366',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },
  sendButtonDisabled: {
    backgroundColor: '#4A4458',
    shadowOpacity: 0,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  chargeButton: {
    alignItems: 'center',
    paddingVertical: 14,
    marginTop: 8,
  },
  chargeButtonText: {
    color: '#FFD700',
    fontSize: 15,
    fontWeight: '600',
  },
});

export default SendInterestModal;

