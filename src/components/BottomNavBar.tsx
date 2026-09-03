import React from 'react';
import { Home, Receipt, User } from 'lucide-react';

interface BottomNavBarProps {
  activeTab: 'home' | 'order' | 'orders' | 'me';
  onChangeTab: (tab: 'home' | 'order' | 'orders' | 'me') => void;
  ordersBadgeCount?: number;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onChangeTab,
  ordersBadgeCount = 0,
}) => {
  return (
    <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-neutral-200/70 py-1.5 px-6 flex items-center justify-around z-30 shadow-[0_-4px_16px_rgba(0,0,0,0.03)] max-w-md mx-auto">
      {/* 1. HOME */}
      <button
        id="nav-tab-home"
        onClick={() => onChangeTab('home')}
        className={`flex flex-col items-center justify-center transition-all ${
          activeTab === 'home'
            ? 'text-neutral-900 font-bold'
            : 'text-[#8e8e93] hover:text-neutral-700 font-normal'
        }`}
      >
        <div className="relative flex flex-col items-center">
          <Home className="w-5 h-5 stroke-[1.8]" />
          {activeTab === 'home' ? (
            <div className="w-3.5 h-[2.5px] bg-[#e45b78] rounded-full mt-0.5" />
          ) : (
            <div className="w-3.5 h-[2.5px] bg-transparent mt-0.5" />
          )}
        </div>
        <span className="text-[10px]">Home</span>
      </button>

      {/* 2. ORDER (Chagee Signature Cup Image/Graphic) */}
      <button
        id="nav-tab-order"
        onClick={() => onChangeTab('order')}
        className={`flex flex-col items-center justify-center transition-all ${
          activeTab === 'order'
            ? 'text-neutral-900 font-bold'
            : 'text-[#8e8e93] hover:text-neutral-700 font-normal'
        }`}
      >
        {/* Tall Chagee Blue Cup Graphic */}
        <div className="w-7 h-8 flex flex-col items-center justify-center -mt-1 relative">
          <div className="w-5 h-1.5 bg-neutral-900 rounded-t-xs" />
          <div className="w-4.5 h-6 bg-gradient-to-b from-[#0e274d] to-[#12315d] rounded-b-xs p-0.5 flex flex-col items-center justify-center border border-blue-900/50 shadow-xs">
            <span className="text-[4.5px] text-white font-serif font-bold uppercase">CHA</span>
          </div>
          {/* Straw */}
          <div className="absolute -top-1 right-2 w-0.5 h-2 bg-neutral-800 rotate-[12deg]" />
        </div>
        <span className="text-[10px] mt-0.5">Order</span>
      </button>

      {/* 3. ORDERS */}
      <button
        id="nav-tab-orders"
        onClick={() => onChangeTab('orders')}
        className={`flex flex-col items-center justify-center transition-all relative ${
          activeTab === 'orders'
            ? 'text-neutral-900 font-bold'
            : 'text-[#8e8e93] hover:text-neutral-700 font-normal'
        }`}
      >
        <div className="relative flex flex-col items-center">
          <Receipt className="w-5 h-5 stroke-[1.8]" />
          {ordersBadgeCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-[#e45b78] text-white text-[9px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-xs">
              {ordersBadgeCount}
            </span>
          )}
          {activeTab === 'orders' ? (
            <div className="w-3.5 h-[2.5px] bg-[#e45b78] rounded-full mt-0.5" />
          ) : (
            <div className="w-3.5 h-[2.5px] bg-transparent mt-0.5" />
          )}
        </div>
        <span className="text-[10px]">Orders</span>
      </button>

      {/* 4. ME */}
      <button
        id="nav-tab-me"
        onClick={() => onChangeTab('me')}
        className={`flex flex-col items-center justify-center transition-all ${
          activeTab === 'me'
            ? 'text-neutral-900 font-bold'
            : 'text-[#8e8e93] hover:text-neutral-700 font-normal'
        }`}
      >
        <div className="relative flex flex-col items-center">
          <User className="w-5 h-5 stroke-[1.8]" />
          {activeTab === 'me' ? (
            <div className="w-3.5 h-[2.5px] bg-[#e45b78] rounded-full mt-0.5" />
          ) : (
            <div className="w-3.5 h-[2.5px] bg-transparent mt-0.5" />
          )}
        </div>
        <span className="text-[10px]">Me</span>
      </button>
    </div>
  );
};

