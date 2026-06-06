// src/components/calendar/CalendarGrid.jsx
import React from 'react';
import DayCell from './DayCell';

const WEEK_DAYS = ['日', '月', '火', '水', '木', '金', '土'];

export default function CalendarGrid({ currentDate, calendarDays, selectedDate, onSelectDate }) {
  return (
    <div className="flex-1 flex flex-col">
      {/* 曜日ヘッダー */}
      <div className="grid grid-cols-7 gap-1 mb-2 text-center font-bold text-sm text-base-content/70">
        {WEEK_DAYS.map((day, index) => (
          <div key={day} className={index === 0 ? 'text-red-500' : index === 6 ? 'text-blue-500' : ''}>
            {day}
          </div>
        ))}
      </div>

      {/* カレンダーのマス目 */}
      <div className="grid grid-cols-7 grid-rows-6 gap-1 flex-1">
        {calendarDays.map((date, index) => (
          <DayCell 
            key={index} 
            date={date} 
            currentDate={currentDate}
            isSelected={selectedDate?.getTime() === date.getTime()}
            onClick={() => onSelectDate(date)}
          />
        ))}
      </div>
    </div>
  );
}
