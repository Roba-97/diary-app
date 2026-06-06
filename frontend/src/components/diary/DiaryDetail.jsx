// frontend/src/components/diary/DiaryDetail.jsx
import React from 'react';

export default function DiaryDetail({ diary, onEdit, onClose }) {
  return (
    <div className="flex flex-col gap-4 mt-4">
      {/* 日記の本文表示エリア */}
      <div className="p-4 bg-base-200 rounded-lg min-h-[10rem] whitespace-pre-wrap">
        {diary.body}
      </div>

      {/* 将来的にここへタグ表示UIを追加 */}
      <div className="flex gap-2">
        <span className="badge badge-primary">モックタグ</span>
      </div>

      {/* アクションボタン */}
      <div className="modal-action mt-4">
        <button type="button" className="btn" onClick={onClose}>
          閉じる
        </button>
        {/* 編集モードへ切り替えるボタン */}
        <button type="button" className="btn btn-secondary" onClick={onEdit}>
          編集する
        </button>
      </div>
    </div>
  );
}
