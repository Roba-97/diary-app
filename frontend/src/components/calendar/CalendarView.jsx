// src/components/calendar/CalendarView.jsx
import React from 'react';
import { useCalendar } from '../../hooks/useCalendar';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import DiaryPopup from '../diary/DiaryPopup';

export default function CalendarView() {
  const { 
    currentDate, 
    selectedDate, 
    setSelectedDate, 
    calendarDays, 
    prevMonth, 
    nextMonth 
  } = useCalendar();

  const handleClosePopup = () => {
    setSelectedDate(null);
  };

  return (
    <div className="flex flex-col h-full bg-base-100 p-4 rounded-box shadow-sm">
      <CalendarHeader 
        currentDate={currentDate} 
        onPrev={prevMonth} 
        onNext={nextMonth} 
      />
      <CalendarGrid 
        currentDate={currentDate}
        calendarDays={calendarDays}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />
      <DiaryPopup 
        selectedDate={selectedDate} 
        onClose={handleClosePopup} 
      />
    </div>
  );
}
