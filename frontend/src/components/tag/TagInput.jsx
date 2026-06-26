import React, { useState, useRef, useEffect } from 'react';

// サイドバーのモックデータ（将来的にAPIから取得）と構造を合わせておきます
const mockAvailableTags = [
  { id: 1, parent_id: null, name: '友達', color: '#FFFFFF', bg: '#378ADD' },
  { id: 2, parent_id: 1, name: 'Aさん', color: '#FFFFFF', bg: '#378ADD' },
  { id: 3, parent_id: 1, name: 'Bさん', color: '#FFFFFF', bg: '#378ADD' },
  { id: 4, parent_id: null, name: '勉強', color: '#FFFFFF', bg: '#10B981' },
  { id: 5, parent_id: 4, name: '資格', color: '#FFFFFF', bg: '#10B981' },
  { id: 6, parent_id: null, name: '旅行', color: '#FFFFFF', bg: '#F59E0B' },
];

export default function TagInput({ selectedTags, onChange }) {
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // 親タグの名前を取得するヘルパー関数
  const getParentName = (parentId) => {
    if (!parentId) return null;
    const parent = mockAvailableTags.find(tag => tag.id === parentId);
    return parent ? parent.name : null;
  };

  // 1. すでに選択されているタグをサジェスト候補から除外
  const unselectedTags = mockAvailableTags.filter(
    (tag) => !selectedTags.some((selected) => selected.id === tag.id)
  );

  // 2. 入力された文字でさらに絞り込み
  const filteredTags = unselectedTags.filter((tag) => {
    const parentName = getParentName(tag.parent_id);
    // 検索対象の文字列として "親タグ名 子タグ名" を結合（例: "友達 Aさん"）
    const searchTarget = parentName ? `${parentName} ${tag.name}` : tag.name;
    return searchTarget.toLowerCase().includes(inputValue.toLowerCase());
  });

  // タグを選択したときの処理
  const handleSelectTag = (tag) => {
    onChange([...selectedTags, tag]);
    setInputValue(''); // 入力欄をクリア
  };

  // タグを削除したときの処理
  const handleRemoveTag = (tagId) => {
    onChange(selectedTags.filter((tag) => tag.id !== tagId));
  };

  // コンポーネントの外側をクリックしたらドロップダウンを閉じる安全策
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      <label className="label py-1">
        <span className="label-text font-semibold text-base-content/70 text-xs">タグ</span>
      </label>
      
      {/* 入力エリア */}
      <div 
        className="flex flex-wrap items-center gap-2 p-2 min-h-[48px] border border-base-300 rounded-lg bg-base-100 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all cursor-text"
        onClick={() => setIsOpen(true)}
      >
        {selectedTags.map((tag) => (
          <span
            key={tag.id}
            className="badge gap-1 px-3 py-3 font-semibold rounded-full flex items-center shadow-sm text-xs select-none"
            style={{ backgroundColor: tag.bg, color: tag.color }}
          >
            {tag.name}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveTag(tag.id);
              }}
              className="w-4 h-4 ml-1 rounded-full flex items-center justify-center hover:bg-black/20 transition-colors font-bold text-xs"
            >
              ×
            </button>
          </span>
        ))}
        
        <input
          type="text"
          className="flex-grow min-w-[140px] outline-none bg-transparent text-sm p-1 text-base-content"
          placeholder={selectedTags.length === 0 ? "既存のタグを検索・選択..." : ""}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />
      </div>

      {/* サジェストドロップダウン */}
      {isOpen && (
        <ul className="absolute z-50 w-full mt-1 bg-base-100 border border-base-300 rounded-lg shadow-xl max-h-48 overflow-y-auto p-1 py-1">
          {filteredTags.length > 0 ? (
            filteredTags.map((tag) => {
              const parentName = getParentName(tag.parent_id);
              
              return (
                <li
                  key={tag.id}
                  className="px-4 py-2.5 mx-0.5 rounded-md cursor-pointer hover:bg-base-200 flex items-center gap-2.5 text-sm transition-colors"
                  onClick={() => handleSelectTag(tag)}
                >
                  <span
                    className="w-3 h-3 rounded-full inline-block shadow-sm"
                    style={{ backgroundColor: tag.bg }}
                  ></span>
                  
                  {/* 「親タグ ＞ 子タグ」の表示部分 */}
                  <span className="font-medium text-base-content">
                    {parentName && (
                      <span className="text-base-content/50 mr-1 text-xs">
                        {parentName} ＞
                      </span>
                    )}
                    {tag.name}
                  </span>
                </li>
              );
            })
          ) : (
            <li className="px-4 py-3 text-xs text-base-content/50 text-center italic select-none">
              {unselectedTags.length === 0 
                ? "すべてのタグが選択されています" 
                : "該当するタグがありません。サイドバーから作成してください。"}
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
