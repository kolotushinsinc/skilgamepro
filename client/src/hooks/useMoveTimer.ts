import { useState, useEffect, useCallback, useRef } from 'react';

export interface UseMoveTimerOptions {
    totalTime: number; // Total time for move in seconds (30)
    warningTime: number; // Time when warning should show in seconds (20)
    isMyTurn: boolean;
    isGameFinished: boolean;
    isGameStarted: boolean; // New flag to indicate if game has actually started
    hasOpponent: boolean; // Only start timer when opponent is present
    onTimeout: () => void; // Called when time runs out
    onWarning?: () => void; // Called when warning time is reached
    serverStartTime?: number; // Server timestamp when timer started
    serverTimeLimit?: number; // Server time limit in milliseconds
}

export interface MoveTimerState {
    timeLeft: number;
    isWarning: boolean;
    isActive: boolean;
    progress: number; // Percentage of time elapsed (0-100)
}

export const useMoveTimer = ({
    totalTime = 30,
    warningTime = 20,
    isMyTurn,
    isGameFinished,
    isGameStarted,
    hasOpponent,
    onTimeout,
    onWarning,
    serverStartTime,
    serverTimeLimit = 30000
}: UseMoveTimerOptions): MoveTimerState & {
    resetTimer: () => void;
    pauseTimer: () => void;
    resumeTimer: () => void;
    syncWithServer: (startTime: number, timeLimit: number) => void;
    showWarning: () => void;
} => {
    const [timeLeft, setTimeLeft] = useState(totalTime);
    const [isWarning, setIsWarning] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const hasCalledTimeout = useRef(false);

    const resetTimer = useCallback(() => {
        setTimeLeft(totalTime);
        setIsWarning(false);
        hasCalledTimeout.current = false;
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, [totalTime]);

    const pauseTimer = useCallback(() => {
        setIsActive(false);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);

    const resumeTimer = useCallback(() => {
        if (!isGameFinished && isMyTurn && hasOpponent && timeLeft > 0) {
            setIsActive(true);
        }
    }, [isGameFinished, isMyTurn, hasOpponent, timeLeft]);

    // Sync timer with server time - called when receiving server timer events
    const syncWithServer = useCallback((startTime: number, timeLimit: number) => {
        const now = Date.now();
        const elapsed = now - startTime;
        const remainingMs = Math.max(0, timeLimit - elapsed);
        const remainingSeconds = Math.ceil(remainingMs / 1000);
        
        console.log('[Timer] Syncing with server:', {
            startTime,
            timeLimit,
            elapsed,
            remainingMs,
            remainingSeconds
        });
        
        setTimeLeft(remainingSeconds);
        hasCalledTimeout.current = false;
        
        if (remainingSeconds > 0 && isMyTurn && !isGameFinished && hasOpponent) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [isMyTurn, isGameFinished, hasOpponent]);

    // Show warning - called by server event only
    const showWarning = useCallback(() => {
        console.log('[Timer] Server triggered warning');
        setIsWarning(true);
        onWarning?.();
    }, [onWarning]);

    // Start/stop timer based on turn and game state
    useEffect(() => {
        if (isGameFinished || !isGameStarted || !hasOpponent) {
            pauseTimer();
            return;
        }

        if (isMyTurn && timeLeft > 0) {
            setIsActive(true);
        } else {
            pauseTimer();
        }
    }, [isMyTurn, isGameFinished, isGameStarted, hasOpponent, timeLeft, pauseTimer]);

    // Reset timer when turn changes (only if game has started)
    useEffect(() => {
        if (isMyTurn && isGameStarted && hasOpponent && !hasCalledTimeout.current) {
            resetTimer();
        }
    }, [isMyTurn, isGameStarted, hasOpponent, resetTimer]);

    // Auto-sync with server if we have server time data
    useEffect(() => {
        if (serverStartTime && isMyTurn && isGameStarted && hasOpponent) {
            syncWithServer(serverStartTime, serverTimeLimit);
        }
    }, [serverStartTime, serverTimeLimit, isMyTurn, isGameStarted, hasOpponent, syncWithServer]);

    // Timer countdown logic with warning at exactly 10 seconds
    useEffect(() => {
        if (!isActive || timeLeft <= 0) {
            return;
        }

        intervalRef.current = setInterval(() => {
            setTimeLeft(prev => {
                const newTime = prev - 1;

                // Show warning exactly when 10 seconds remain
                if (newTime === 10 && !isWarning) {
                    console.log('[Timer] Client timer - showing warning at exactly 10 seconds remaining');
                    setIsWarning(true);
                    onWarning?.();
                }

                // Check for timeout only
                if (newTime <= 0 && !hasCalledTimeout.current) {
                    hasCalledTimeout.current = true;
                    setIsActive(false);
                    onTimeout();
                    return 0;
                }

                return newTime;
            });
        }, 1000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [isActive, timeLeft, isWarning, onTimeout, onWarning]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    const progress = ((totalTime - timeLeft) / totalTime) * 100;

    return {
        timeLeft,
        isWarning,
        isActive,
        progress,
        resetTimer,
        pauseTimer,
        resumeTimer,
        syncWithServer,
        showWarning
    };
};