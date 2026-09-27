export const STATUSES = [
  'Без статуса',
  'Нужно сделать',
  'В работе',
  'Тестирование',
  'Готово',
];

export const TOPICS = [
  { name: 'Web Design', color: 'orange' },
  { name: 'Research', color: 'green' },
  { name: 'Copywriting', color: 'purple' },
];

export function topicColor(topic) {
  return TOPICS.find((t) => t.name === topic)?.color || 'gray';
}

export function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

export function formatDisplayDate(isoDate) {
  if (!isoDate) return '';
  const [y, m, d] = isoDate.split('-');
  if (!y || !m || !d) return isoDate;
  return `${d}.${m}.${y}`;
}
