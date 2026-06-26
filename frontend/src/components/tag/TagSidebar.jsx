import React, { useState } from 'react';
import TagCreateModal from './TagCreateModal';

// 【仮のモックデータ】将来的にAPIから取得するタグデータ（紐づく日記の数を含む）
const mockTags = [
  { id: 1, parent_id: null, name: '友達', color: '#FFFFFF', bg: '#378ADD', count: 15 },
  { id: 2, parent_id: 1, name: 'Aさん', color: '#FFFFFF', bg: '#378ADD', count: 5 },
  { id: 3, parent_id: 1, name: 'Bさん', color: '#FFFFFF', bg: '#378ADD', count: 10 },
  { id: 4, parent_id: null, name: '勉強', color: '#FFFFFF', bg: '#10B981', count: 8 },
  { id: 5, parent_id: 4, name: '資格', color: '#FFFFFF', bg: '#10B981', count: 3 },
  { id: 6, parent_id: null, name: '旅行', color: '#FFFFFF', bg: '#F59E0B', count: 2 },
];

export default function TagSidebar() {
  const [openParents, setOpenParents] = useState([]);    // 親タグの開閉状態（デフォルトは全て閉じた状態）
  const [isModalOpen, setIsModalOpen] = useState(false);  // モーダルの開閉状態

  // ツリー構造構築用のヘルパー関数
  const rootTags = mockTags.filter(tag => tag.parent_id === null);
  const getChildren = (parentId) => mockTags.filter(tag => tag.parent_id === parentId);

  // 開閉のトグル処理
  const toggleParent = (id) => {
    setOpenParents(prev => prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id]);
  };

  // タグ作成時のモック処理（後ほどAPI連携に置き換えます）
  const handleCreateTag = (newTagData) => {
    console.log("新規作成するタグデータ:", newTagData);
    // TODO: ここでRails APIにPOSTリクエストを送信する処理を追加します
  };

  return (
    <aside className="w-64 bg-base-100 border-r border-base-200 h-full flex flex-col">
      <div className="border-b border-base-200 p-4 lg:p-8">
        <div className="flex justify-between items-center">
          <span className="font-bold text-lg">タグ一覧</span>
        </div>
        <div className="mt-4">
          <button onClick={() => setIsModalOpen(true)}
            className="btn btn-sm w-full bg-transparent border-2 border-primary text-primary hover:bg-primary hover:border-primary hover:text-primary-content hover:shadow-none transition-all duration-200">
            ＋ 新規タグ作成
          </button>
        </div>
      </div>

      {/* タグツリー表示エリア */}
      <div className="p-2 flex-grow overflow-y-auto">
        <ul className="menu w-full px-0">
          {rootTags.map(parent => {
            const children = getChildren(parent.id);
            const hasChildren = children.length > 0;
            const isOpen = openParents.includes(parent.id);

            return (
              <li key={parent.id} className="mb-1">
                {/* 親タグの行 */}
                <div
                  className="flex items-center justify-between p-2 hover:bg-base-200 cursor-pointer rounded-md transition-colors"
                  onClick={() => hasChildren && toggleParent(parent.id)}
                >
                  <div className="flex items-center gap-2">
                    {/* 折りたたみアイコン（子がいる場合のみ表示） */}
                    <span className="w-4 flex justify-center text-xs text-base-content/40">
                      {hasChildren ? (isOpen ? '▼' : '▶') : ''}
                    </span>
                    <span
                      className="w-3 h-3 rounded-full shadow-sm"
                      style={{ backgroundColor: parent.bg }}
                    ></span>
                    <span className="font-semibold text-base-content">{parent.name}</span>
                  </div>
                  <span className="badge badge-sm badge-ghost">{parent.count}</span>
                </div>

                {/* 子タグのリスト（開いている時のみレンダリング） */}
                {hasChildren && isOpen && (
                  <ul className="ml-6 mt-1 border-l-2 border-base-200 pl-2">
                    {children.map(child => (
                      <li key={child.id} className="mt-1">
                        <div className="flex items-center justify-between p-2 hover:bg-base-200 cursor-pointer rounded-md transition-colors">
                          <div className="flex items-center gap-2">
                            {/* 子タグはドットを少し小さくして階層を表現 */}
                            <span
                              className="w-2.5 h-2.5 rounded-full opacity-80"
                              style={{ backgroundColor: child.bg }}
                            ></span>
                            <span className="text-sm text-base-content/80">{child.name}</span>
                          </div>
                          <span className="text-xs text-base-content/50 font-medium">
                            {child.count}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      
      {/* 新規作成モーダルの呼び出し */}
      <TagCreateModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onCreate={handleCreateTag}
        parentTags={rootTags} 
      />
    </aside>
  );
}
