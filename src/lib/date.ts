import {
  addDays as _addDays,
  addMonths as _addMonths,
  differenceInWeeks as _differenceInWeeks,
  eachDayOfInterval as _eachDayOfInterval,
  endOfWeek as _endOfWeek,
  format as _format,
  isSameDay as _isSameDay,
  startOfMonth as _startOfMonth,
  startOfWeek as _startOfWeek,
  subWeeks as _subWeeks,
} from "date-fns";

import { de, enGB, enUS, es, fr, it, pt, ru } from 'date-fns/locale';

const LOCALE_MAP = {
  'es': es,
  'es-ES': es,
  'en-US': enUS,
  'en-GB': enGB,
  'fr': fr,
  'de': de,
  'it': it,
  'pt': pt,
  'ru': ru,
};

function getDateFnsLocale(lang = navigator.language) {
  return LOCALE_MAP[lang] ?? LOCALE_MAP[lang.split('-')[0]] ?? enUS;
}

const locale = getDateFnsLocale();

export function addDays(date: Date, days: number) {
  return _addDays(date, days);
}

export function addMonths(date: Date, months: number) {
  return _addMonths(date, months);
}

export function differenceInWeeks(date1: Date, date2: Date) {
  return _differenceInWeeks(date1, date2);
}

export function eachDayOfInterval(interval: { start: Date; end: Date }) {
  return _eachDayOfInterval(interval);
}

export function endOfWeek(date: Date) {
  return _endOfWeek(date, { locale });
}

export function format(date: Date, format: string) {
  return _format(date, format, { locale });
}

export function isSameDay(date1: Date, date2: Date) {
  return _isSameDay(date1, date2);
}

export function startOfMonth(date: Date) {
  return _startOfMonth(date);
}

export function startOfWeek(date: Date) {
  return _startOfWeek(date, { locale });
}

export function subWeeks(date: Date, weeks: number) {
  return _subWeeks(date, weeks);
}
