import { useState, useCallback } from 'react';
import { ProfileData } from '@/components/ui/Card';

interface UseSwipeResult {
  profiles: ProfileData[];
  currentProfile: ProfileData | null;
  swipeLeft: () => void;
  swipeRight: () => void;
  superLike: () => void;
  undo: () => void;
  isLoading: boolean;
  hasMore: boolean;
  matchedProfile: ProfileData | null;
  clearMatch: () => void;
}

interface SwipeHistory {
  profile: ProfileData;
  direction: 'left' | 'right' | 'super';
}

export function useSwipe(initialProfiles: ProfileData[]): UseSwipeResult {
  const [profiles, setProfiles] = useState<ProfileData[]>(initialProfiles);
  const [history, setHistory] = useState<SwipeHistory[]>([]);
  const [matchedProfile, setMatchedProfile] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const currentProfile = profiles[0] || null;
  const hasMore = profiles.length > 0;

  const swipeLeft = useCallback(() => {
    if (!currentProfile) return;
    
    setHistory(prev => [...prev, { profile: currentProfile, direction: 'left' }]);
    setProfiles(prev => prev.slice(1));
    
    // Log for analytics
    console.log('Passed:', currentProfile.name);
  }, [currentProfile]);

  const swipeRight = useCallback(() => {
    if (!currentProfile) return;
    
    setHistory(prev => [...prev, { profile: currentProfile, direction: 'right' }]);
    
    // Simulate match (in real app, this would be an API call)
    // Match happens when both users like each other
    const isMatch = Math.random() > 0.5; // 50% chance for demo
    
    if (isMatch) {
      setMatchedProfile(currentProfile);
    }
    
    setProfiles(prev => prev.slice(1));
    
    console.log('Liked:', currentProfile.name, isMatch ? '(MATCH!)' : '');
  }, [currentProfile]);

  const superLike = useCallback(() => {
    if (!currentProfile) return;
    
    setHistory(prev => [...prev, { profile: currentProfile, direction: 'super' }]);
    
    // Super likes have higher match probability
    const isMatch = Math.random() > 0.3; // 70% chance for demo
    
    if (isMatch) {
      setMatchedProfile(currentProfile);
    }
    
    setProfiles(prev => prev.slice(1));
    
    console.log('Super Liked:', currentProfile.name, isMatch ? '(MATCH!)' : '');
  }, [currentProfile]);

  const undo = useCallback(() => {
    if (history.length === 0) return;
    
    const lastAction = history[history.length - 1];
    setHistory(prev => prev.slice(0, -1));
    setProfiles(prev => [lastAction.profile, ...prev]);
    
    console.log('Undid action on:', lastAction.profile.name);
  }, [history]);

  const clearMatch = useCallback(() => {
    setMatchedProfile(null);
  }, []);

  return {
    profiles,
    currentProfile,
    swipeLeft,
    swipeRight,
    superLike,
    undo,
    isLoading,
    hasMore,
    matchedProfile,
    clearMatch,
  };
}


