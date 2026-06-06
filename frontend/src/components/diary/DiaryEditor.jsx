import React, { useState, useEffect} from 'react';

export default function DiaryEditor({ date, initialData, onCancel }) {
  // 日記本文の状態管理
  const [body, setBody] = useState(initialData ? initialData.body : '');

  // ※重要：別の日の日付をクリックした等で initialData が外から変わった場合、エディタ内の表示も確実に更新させるための処理
  useEffect(() => {
    setBody(initialData ? initialData.body : '');
  }, [initialData]);

  // 保存ボタンが押された時の処理
  const handleSubmit = (e) => {
    e.preventDefault(); // フォームのデフォルトのページリロードを防ぐ
    
    // TODO: 今後はここでRails APIへの保存処理（useEntriesフックなど）を呼び出します
    console.log('保存するデータ:', { 
      date: date, 
      body: body 
    });
    
    // 保存処理の完了を想定してモーダルを閉じる
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
      {/* 本文入力エリア */}
      <div className="form-control w-full">
        <textarea
          className="textarea textarea-bordered h-50 w-full text-base leading-relaxed"
          placeholder="今日のできごとや、書き留めたいことを入力してください..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        ></textarea>
      </div>

      {/* 将来的にここへタグ選択UI（TagInput.jsx）を組み込みます */}
      <div className="text-sm text-base-content/60 border border-dashed border-base-300 p-2 text-center rounded">
        ※ここにタグ選択UIが追加されます
      </div>

      {/* アクションボタン */}
      <div className="modal-action mt-2">
        <button type="button" className="btn" onClick={onCancel}>
          キャンセル
        </button>
        <button type="submit" className="btn btn-primary">
          保存する
        </button>
      </div>
    </form>
  );
}
