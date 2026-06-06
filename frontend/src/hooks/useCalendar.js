import { useState, useMemo } from 'react';
import { startOfMonth, startOfWeek, addDays, eachDayOfInterval } from 'date-fns';

export function useCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const calendarDays = useMemo(() => {
    // 1. 表示する月の1日が属する週の日曜日を取得
    const start = startOfWeek(startOfMonth(currentDate), { weekStartsOn: 0 });
    
    // 2. 開始日から数えて41日後（合計42マス＝6週間分）を終了日とする
    const end = addDays(start, 41);
    
    // 3. その期間の日付配列を返す
    return eachDayOfInterval({ start, end });
  }, [currentDate]);

  const prevMonth = () => setCurrentDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1));

  return { currentDate, selectedDate, setSelectedDate, calendarDays, prevMonth, nextMonth };
}
