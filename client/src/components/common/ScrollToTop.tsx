import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Исключаем игровые страницы из автоматической прокрутки
    // чтобы не мешать отображению модальных окон результатов игры
    if (pathname.startsWith('/game/')) {
      return;
    }

    // Скролл к верху при изменении маршрута
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;