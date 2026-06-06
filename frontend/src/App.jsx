// frontend/src/App.jsx
import React from 'react';
import CalendarView from './components/calendar/CalendarView';

function App() {
  return (
    // 画面全体を覆うベースの背景色と高さを指定
    <div className="min-h-screen bg-base-200 p-4 md:p-8">
      {/* カレンダーの最大幅を制限し、中央に配置 */}
      <div className="max-w-[95vw] mx-auto h-[95vh]">
        <CalendarView />
      </div>
    </div>
  );
}

export default App;
