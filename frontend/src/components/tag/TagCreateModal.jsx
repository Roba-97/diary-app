import React, { useState } from 'react';
import { createPortal } from 'react-dom';

// 事前に用意するカラーパレット（システム提供）
const COLOR_PALETTES = [
  { id: 'blue', name: 'ブルー', bg: '#E6F1FB', color: '#378ADD' },
  { id: 'green', name: 'グリーン', bg: '#ECFDF5', color: '#10B981' },
  { id: 'yellow', name: 'イエロー', bg: '#FEF3C7', color: '#F59E0B' },
  { id: 'red', name: 'レッド', bg: '#FEE2E2', color: '#EF4444' },
  { id: 'purple', name: 'パープル', bg: '#F3E8FF', color: '#8B5CF6' },
];

export default function TagCreateModal({ isOpen, onClose, onCreate, parentTags }) {
  const [name, setName] = useState('');
  const [parentId, setParentId] = useState('');
  const [selectedColor, setSelectedColor] = useState(COLOR_PALETTES[0]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 親タグが選択されている場合は親のカラー情報を取得
    const parentTag = parentTags.find(t => t.id === Number(parentId));
    
    const newTagData = {
      name,
      parent_id: parentId ? Number(parentId) : null,
      bg: parentTag ? parentTag.bg : selectedColor.bg,
      color: parentTag ? parentTag.color : selectedColor.color,
    };

    onCreate(newTagData);

    // フォームを初期化して閉じる
    setName('');
    setParentId('');
    setSelectedColor(COLOR_PALETTES[0]);
    onClose();
  };

  return createPortal(
    <dialog className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">新規タグ作成</h3>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* タグ名入力 */}
          <div className="form-control w-full">
            <label className="label"><span className="label-text">タグ名</span></label>
            <input 
              type="text" 
              placeholder="例: 趣味、Aさん" 
              className="input input-bordered w-full" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* 親タグ選択 */}
          <div className="form-control w-full">
            <label className="label"><span className="label-text">親タグ（オプション）</span></label>
            <select 
              className="select select-bordered" 
              value={parentId} 
              onChange={(e) => setParentId(e.target.value)}
            >
              <option value="">なし（ルートタグとして作成）</option>
              {parentTags.map(tag => (
                <option key={tag.id} value={tag.id}>{tag.name}</option>
              ))}
            </select>
          </div>

          {/* カラー選択（親タグが未選択の場合のみ表示） */}
          {!parentId ? (
            <div className="form-control w-full">
              <label className="label"><span className="label-text">テーマカラー</span></label>
              <div className="flex gap-3">
                {COLOR_PALETTES.map(palette => (
                  <button
                    key={palette.id}
                    type="button"
                    onClick={() => setSelectedColor(palette)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColor.id === palette.id ? 'border-gray-500 scale-110' : 'border-transparent hover:scale-105'
                    }`}
                    style={{ backgroundColor: palette.bg }}
                    title={palette.name}
                  >
                    <div className="w-3 h-3 rounded-full mx-auto" style={{ backgroundColor: palette.color }}></div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-sm text-base-content/70 mt-2 bg-base-200 p-3 rounded-md">
              💡 親タグのカラーを自動的に継承します。
            </div>
          )}

          {/* アクションボタン */}
          <div className="modal-action">
            <button type="button" className="btn" onClick={onClose}>キャンセル</button>
            <button type="submit" className="btn btn-primary">作成する</button>
          </div>
        </form>
      </div>
      
      {/* 背景クリックで閉じる用のオーバーレイ */}
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>閉じる</button>
      </form>
    </dialog>,
    document.body
  );
}
