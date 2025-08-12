# План обновления футера для социальных сетей

## Анализ текущего состояния

В файле `landing/src/components/Footer.tsx` есть проблемы с отображением социальных сетей:

1. **Строка 3**: Импорт содержит `Facebook, Twitter` но отсутствует подходящая иконка для Telegram
2. **Строки 34-38**: В массиве `socialLinks` для Telegram используется неправильная иконка (`Twitter`)

## Необходимые изменения

### 1. Обновить импорт иконок (строка 3)
```typescript
// Текущий импорт:
import { Mail, Phone, MapPin, Facebook, Twitter } from 'lucide-react';

// Новый импорт:
import { Mail, Phone, MapPin, Facebook, Twitter, MessageCircle } from 'lucide-react';
```

### 2. Исправить массив socialLinks (строки 34-38)
```typescript
// Текущий код:
const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'X' },
  { icon: Twitter, href: '#', label: 'Telegram' }  // ПРОБЛЕМА: неправильная иконка
];

// Исправленный код:
const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'X' },
  { icon: MessageCircle, href: '#', label: 'Telegram' }
];
```

### 3. Дополнительные улучшения (опционально)
- Добавить реальные ссылки вместо '#'
- Добавить `target="_blank"` для внешних ссылок

## Результат
После внесения изменений в футере будут корректно отображаться три социальные сети:
- Facebook (с иконкой Facebook)
- X (с иконкой Twitter) 
- Telegram (с иконкой MessageCircle)

## Файлы для изменения
- `landing/src/components/Footer.tsx`