import { useState, useCallback } from 'react';

export const useTerminalHistory = () => {
  const [history, setHistory] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const addToHistory = useCallback((command: string) => {
    setHistory(prev => {
      // Don't add duplicate consecutive commands
      if (prev[prev.length - 1] === command) {
        return prev;
      }
      // Keep only last 50 commands
      const newHistory = [...prev, command];
      return newHistory.slice(-50);
    });
  }, []);

  const navigateHistory = useCallback((direction: 'up' | 'down') => {
    setCurrentIndex(prev => {
      if (direction === 'up') {
        return Math.min(prev + 1, history.length - 1);
      } else {
        return Math.max(prev - 1, -1);
      }
    });
  }, [history.length]);

  const resetNavigation = useCallback(() => {
    setCurrentIndex(-1);
  }, []);

  const getCurrentCommand = useCallback(() => {
    if (currentIndex === -1) return '';
    return history[history.length - 1 - currentIndex];
  }, [currentIndex, history]);

  return {
    history,
    currentIndex,
    addToHistory,
    navigateHistory,
    resetNavigation,
    getCurrentCommand,
  };
};
