import React from 'react';
import CalendarView from './components/calendar/CalendarView';
import AppLayout from './components/layout/AppLayout';

function App() {
  return (
    <AppLayout>
      <CalendarView />
    </AppLayout>
  );
}

export default App;
