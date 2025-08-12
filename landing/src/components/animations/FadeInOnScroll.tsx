import React, { useEffect, useRef, useState, ReactNode } from 'react';

interface FadeInOnScrollProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  duration?: number;
  threshold?: number;
}

const FadeInOnScroll: React.FC<FadeInOnScrollProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  distance = 50,
  duration = 600,
  threshold = 0.1
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true);
            }, delay);
          }
        });
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [delay, threshold]);

  const getTransform = () => {
    if (isVisible) return 'translateX(0) translateY(0)';
    
    switch (direction) {
      case 'up':
        return `translateY(${distance}px)`;
      case 'down':
        return `translateY(-${distance}px)`;
      case 'left':
        return `translateX(${distance}px)`;
      case 'right':
        return `translateX(-${distance}px)`;
      default:
        return 'translateX(0) translateY(0)';
    }
  };

  const animationStyle = {
    opacity: isVisible ? 1 : 0,
    transform: getTransform(),
    transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`
  };

  return (
    <div
      ref={elementRef}
      className={className}
      style={animationStyle}
    >
      {children}
    </div>
  );
};

export default FadeInOnScroll;