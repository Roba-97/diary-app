// frontend/src/components/diary/DiaryPopup.jsx
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import DiaryDetail from './DiaryDetail';
import DiaryEditor from './DiaryEditor';

// 【仮のモックデータ】将来的に useEntries(API) に置き換わる部分
const mockDiaries = [
  { date: '2026-06-10', body: '今日はReactのコンポーネント設計を学んだ。とても有意義だった！' },
];

export default function DiaryPopup({ selectedDate, onClose }) {
  // 表示モードを管理する状態 ('view' または 'edit')
  const [mode, setMode] = useState('view');
  // 該当日の日記データを保持する状態
  const [currentDiary, setCurrentDiary] = useState(null);

  // selectedDate が変わるたびに、データが存在するかチェックする
  useEffect(() => {
    if (!selectedDate) return;

    // クリックされた日付を 'yyyy-MM-dd' 形式に変換
    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    
    // モックデータから該当する日記を探す
    const foundDiary = mockDiaries.find(d => d.date === dateStr);

    if (foundDiary) {
      // データがあれば閲覧モードにし、データをセット
      setCurrentDiary(foundDiary);
      setMode('view');
    } else {
      // データがなければ新規作成（編集）モードにする
      setCurrentDiary(null);
      setMode('edit');
    }
  }, [selectedDate]);

  // 日付が選択されていなければ何も表示しない
  if (!selectedDate) return null;

  return (
    <dialog className={`modal ${selectedDate ? 'modal-open' : ''}`}>
      <div className="modal-box">
        {/* モーダルヘッダー */}
        <h3 className="font-bold text-lg border-b pb-2 mb-4">
          {format(selectedDate, 'yyyy年 MM月 dd日')} の日記
        </h3>
        
        {/* モードに応じてコンポーネントを出し分ける */}
        {mode === 'view' && currentDiary ? (
          <DiaryDetail 
            diary={currentDiary} 
            onEdit={() => setMode('edit')} // 編集ボタンが押されたらモード変更
            onClose={onClose}
          />
        ) : (
          <DiaryEditor 
            date={selectedDate} 
            initialData={currentDiary} // 既存データがあれば初期値として渡す
            onCancel={() => currentDiary ? setMode('view') : onClose()} // キャンセル時の挙動
          />
        )}
      </div>
      
      {/* モーダルの外側（背景）をクリックした時に閉じるためのオーバーレイ */}
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
}
