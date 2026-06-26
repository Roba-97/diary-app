import React from 'react';
import { format } from 'date-fns';

export default function CalendarHeader({ currentDate, onPrev, onNext }) {
  return (
    <div className="flex items-center justify-start gap-3 mb-4 pl-14 lg:pl-0">
      <h2 className="text-3xl font-bold p-2">
        {format(currentDate, 'yyyy年 MM月')}
      </h2>
      <div className="join border border-base-300 rounded-full divide-x divide-base-300 shadow-sm bg-base-100">  
        <button 
          onClick={onPrev} 
          className="btn btn-sm btn-ghost join-item px-4 text-lg hover:bg-base-200"
        >
          &lt;
        </button>
        <button
          onClick={onNext}
          className="btn btn-sm btn-ghost join-item px-4 text-lg hover:bg-base-200"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
