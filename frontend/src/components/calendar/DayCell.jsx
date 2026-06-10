import React from 'react';
import { format, isSameMonth, isToday } from 'date-fns';

export default function DayCell({ date, currentDate, isSelected, onClick }) {
  // 表示中の月と同じ月かどうか（違う場合はグレーアウト用）
  const isCurrentMonth = isSameMonth(date, currentDate);
  const isDateToday = isToday(date);

  // ※将来的には useEntries.js などのフックからこの日付に該当する日記・タグデータを取得します
  // 今回はモックデータとしてダミータグを用意
  const mockTags = isDateToday ? [
    { id: 1, name: '旅行', color: '#FFFFFF', bg: '#378ADD' },
    { id: 2, name: '勉強', color: '#FFFFFF', bg: '#E6F1FB' }
  ] : [];

  return (
    <div 
      onClick={onClick}
      className={`
        p-2 border border-base-200 rounded-md cursor-pointer transition-colors
        flex flex-col gap-1 overflow-hidden w-full h-full
        ${!isCurrentMonth ? 'opacity-40 bg-base-200/50' : 'bg-base-100 hover:bg-base-200'}
        ${isSelected ? 'ring-2 ring-primary ring-inset' : ''}
      `}
    >
      {/* 日付ヘッダー */}
      <div className={`
        text-sm font-semibold w-7 h-7 flex items-center justify-center rounded-full
        ${isDateToday ? 'bg-primary text-primary-content' : 'text-base-content'}
      `}>
        {format(date, 'd')}
      </div>

      {/* タグ表示エリア（インラインスタイルで動的カラーを適用） */}
      <div className="flex flex-wrap gap-1 mt-1">
        {mockTags.map(tag => (
          <span 
            key={tag.id}
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: tag.bg }} // 動的カラーの適用
            title={tag.name}
          />
        ))}
      </div>
      
      {/* 日記プレビュー等のテキストエリア（モック） */}
      {isDateToday && (
        <div className="text-xs text-base-content/80 truncate mt-auto">
          今日はReactの開発を...
        </div>
      )}
    </div>
  );
}
