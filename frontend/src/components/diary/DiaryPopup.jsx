// frontend/src/components/diary/DiaryPopup.jsx
import React from 'react';
import { format } from 'date-fns';

export default function DiaryPopup({ selectedDate, onClose }) {
  // 日付が選択されていなければ何も表示しない
  if (!selectedDate) return null;

  return (
    <dialog className={`modal ${selectedDate ? 'modal-open' : ''}`}>
      <div className="modal-box">
        {/* モーダルヘッダー */}
        <h3 className="font-bold text-lg border-b pb-2 mb-4">
          {format(selectedDate, 'yyyy年 MM月 dd日')} の日記
        </h3>
        
        {/* モーダルコンテンツ (将来的にはここに DiaryDetail や DiaryEditor が入ります) */}
        <div className="py-4 text-center text-base-content/70">
          <p>ここに日記のプレビューやエディタが表示されます。</p>
        </div>
      </div>
      
      {/* モーダルの外側（背景）をクリックした時に閉じるためのオーバーレイ */}
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
}
