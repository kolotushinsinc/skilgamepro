import React, { useState, useEffect, useRef } from 'react';

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  startOnInView?: boolean;
  decimals?: number;
}

const CountUp: React.FC<CountUpProps> = ({
  end,
  duration = 2000,
  suffix = '',
  prefix = '',
  className = '',
  startOnInView = true,
  decimals = 0
}) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true);
            startCounting();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (startOnInView) {
      observer.observe(element);
    } else {
      startCounting();
    }

    return () => {
      if (startOnInView && element) {
        observer.unobserve(element);
      }
    };
  }, [hasStarted, startOnInView]);

  const startCounting = () => {
    const startTime = Date.now();
    const startValue = 0;

    const easeOutQuart = (t: number): number => {
      return 1 - Math.pow(1 - t, 4);
    };

    const updateCount = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easedProgress = easeOutQuart(progress);
      const currentValue = startValue + (end - startValue) * easedProgress;
      
      setCount(Number(currentValue.toFixed(decimals)));

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  };

  const formatNumber = (num: number): string => {
    if (decimals > 0) {
      return num.toFixed(decimals);
    }
    return Math.floor(num).toLocaleString();
  };

  return (
    <span ref={elementRef} className={className}>
      {prefix}{formatNumber(count)}{suffix}
    </span>
  );
};

export default CountUp;