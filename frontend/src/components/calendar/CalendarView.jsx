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
    <div className="w-full h-full flex flex-col bg-base-100">
      <CalendarHeader 
        currentDate={currentDate} 
        onPrev={prevMonth} 
        onNext={nextMonth} 
      />
      <div className="flex-grow mt-4 w-full h-full">
        <CalendarGrid 
          currentDate={currentDate}
          calendarDays={calendarDays}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
      </div>
      <DiaryPopup 
        selectedDate={selectedDate} 
        onClose={handleClosePopup} 
      />
    </div>
  );
}
