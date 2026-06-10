import React from 'react';
import TagSidebar from '../tag/TagSidebar';

export default function AppLayout({ children }) {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      
      {/* 修正点: items-center を外し、背景色を統一 */}
      <div className="drawer-content flex flex-col min-h-screen bg-base-100 relative">
        
        {/* モバイル表示用のハンバーガーメニューボタン */}
        <div className="absolute top-6 left-6 lg:hidden z-10">
          <label htmlFor="my-drawer" className="btn btn-square btn-ghost drawer-button">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </label>
        </div>
        
        {/* 修正点: max-w-5xl を外し、w-full と flex-grow で縦横いっぱいに広げる。余白も微調整 */}
        <div className="w-full flex-grow p-4 lg:p-8 flex flex-col">
          {children}
        </div>
      </div> 
      
      <div className="drawer-side z-50">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <TagSidebar />
      </div>
    </div>
  );
}
