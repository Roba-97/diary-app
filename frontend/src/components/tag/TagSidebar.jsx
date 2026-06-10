import React from 'react';

// 【仮のモックデータ】将来的にAPIから取得するタグデータ（紐づく日記の数を含む）
const mockTags = [
  { id: 1, name: '旅行', color: '#FFFFFF', bg: '#378ADD', count: 5 },
  { id: 2, name: '勉強', color: '#FFFFFF', bg: '#E6F1FB', count: 12 },
  { id: 3, name: '仕事', color: '#FFFFFF', bg: '#F87171', count: 8 },
];

export default function TagSidebar() {
  return (
    <div className="p-4 lg:p-8 w-64 min-h-full bg-base-200 text-base-content">
      <h2 className="text-xl font-bold mb-6">タグ一覧</h2>
      <ul className="menu bg-base-100 w-full rounded-box">
        {mockTags.map((tag) => (
          <li key={tag.id}>
            <a className="flex justify-between items-center py-2">
              <div className="flex items-center gap-2">
                {/* タグのカラーを示すドット */}
                <span 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: tag.bg }}
                ></span>
                <span>{tag.name}</span>
              </div>
              {/* 日記の紐づけ数 */}
              <div className="badge badge-sm">{tag.count}</div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
