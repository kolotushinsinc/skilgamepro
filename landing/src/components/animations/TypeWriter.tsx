import React, { useState, useEffect } from 'react';

interface TypeWriterProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  showCursor?: boolean;
  cursorChar?: string;
  onComplete?: () => void;
  startOnInView?: boolean;
}

const TypeWriter: React.FC<TypeWriterProps> = ({
  text,
  delay = 0,
  speed = 50,
  className = '',
  showCursor = true,
  cursorChar = '|',
  onComplete,
  startOnInView = true
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!startOnInView) {
      setTimeout(() => {
        setHasStarted(true);
      }, delay);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted) {
            setTimeout(() => {
              setHasStarted(true);
            }, delay);
          }
        });
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById(`typewriter-${text.replace(/\s+/g, '-')}`);
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [delay, startOnInView, hasStarted, text]);

  useEffect(() => {
    if (!hasStarted) return;

    if (currentIndex < text.length) {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else {
      setIsTyping(false);
      onComplete?.();
    }
  }, [currentIndex, text, speed, hasStarted]);

  const shouldShowCursor = showCursor && (isTyping || displayText.length === 0);

  return (
    <span 
      id={`typewriter-${text.replace(/\s+/g, '-')}`}
      className={className}
    >
      {displayText}
      {shouldShowCursor && (
        <span className="animate-pulse text-yellow-500">
          {cursorChar}
        </span>
      )}
    </span>
  );
};

export default TypeWriter;