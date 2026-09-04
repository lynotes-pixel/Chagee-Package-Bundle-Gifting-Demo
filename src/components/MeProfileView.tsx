import React from 'react';
import {
  Gift,
  Award,
  CreditCard,
  HelpCircle,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface MeProfileViewProps {
  onOpenBundle?: () => void;
  onOpenEGift?: () => void;
  onViewOrders: () => void;
  onOpenRewards?: () => void;
  teaLeaves?: number;
  activePassesCount?: number;
}

export const MeProfileView: React.FC<MeProfileViewProps> = ({
  onViewOrders,
  onOpenRewards,
  teaLeaves = 2940,
  activePassesCount = 7,
}) => {
  return (
    <div className="p-4 space-y-3.5 pb-24">
      {/* Profile Bento Header Tile */}
      <div className="bg-slate-900 text-white p-5 rounded-3xl shadow-sm border-2 border-slate-800 relative overflow-hidden">
        <div className="flex items-center gap-3.5 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-950 border-2 border-white flex items-center justify-center text-2xl font-black shadow-sm">
            AC
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-black text-white">Alex Chen</h2>
              <span className="text-[9px] font-black bg-slate-800 text-amber-300 border border-slate-700 px-2 py-0.5 rounded-md">
                CHA Master
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">+65 9888 1234</p>
            <p className="text-[10px] text-indigo-300 mt-1 flex items-center gap-1 font-semibold">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>Next tier: Grand Master (60 pts to unlock)</span>
            </p>
          </div>
        </div>

        {/* Tappable Tea Leaves Points & Active Passes Cards */}
        <div className="grid grid-cols-2 gap-2.5 mt-4 pt-3.5 border-t border-slate-800 text-center">
          <button
            type="button"
            id="me-tea-leaves-points-btn"
            onClick={onOpenRewards}
            className="group bg-slate-800/80 hover:bg-slate-800 p-2.5 rounded-2xl border border-slate-700 hover:border-amber-400/50 transition-all text-center cursor-pointer active:scale-98 shadow-xs"
          >
            <div className="text-lg font-black text-amber-400 group-hover:scale-105 transition-transform flex items-center justify-center gap-1">
              <span>{teaLeaves.toLocaleString()}°</span>
              <ChevronRight className="w-3.5 h-3.5 text-amber-400/70 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 group-hover:text-amber-300 transition-colors">
              Tea Leaves Points
            </div>
          </button>

          <button
            type="button"
            id="me-active-passes-btn"
            onClick={onViewOrders}
            className="group bg-slate-800/80 hover:bg-slate-800 p-2.5 rounded-2xl border border-slate-700 hover:border-indigo-400/50 transition-all text-center cursor-pointer active:scale-98 shadow-xs"
          >
            <div className="text-lg font-black text-white group-hover:text-indigo-300 group-hover:scale-105 transition-transform flex items-center justify-center gap-1">
              <span>{activePassesCount}</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 group-hover:text-indigo-300 transition-all" />
            </div>
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 group-hover:text-indigo-200 transition-colors">
              Active Passes
            </div>
          </button>
        </div>
      </div>

      {/* Settings & Options Bento list */}
      <div className="bg-white rounded-3xl p-3 border-2 border-slate-200 shadow-sm divide-y divide-slate-100 text-xs font-black">
        <button
          onClick={onViewOrders}
          className="w-full py-3.5 px-2.5 flex items-center justify-between text-slate-800 hover:text-indigo-600 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <Gift className="w-4 h-4 text-indigo-600" />
            <span>My Gifting History & Passes</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        <div className="w-full py-3.5 px-2.5 flex items-center justify-between text-slate-800">
          <div className="flex items-center gap-2.5">
            <Award className="w-4 h-4 text-amber-500" />
            <span>Member Benefits & Tier Rules</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>

        <div className="w-full py-3.5 px-2.5 flex items-center justify-between text-slate-800">
          <div className="flex items-center gap-2.5">
            <CreditCard className="w-4 h-4 text-slate-700" />
            <span>Payment Methods & Top Up</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>

        <div className="w-full py-3.5 px-2.5 flex items-center justify-between text-slate-800">
          <div className="flex items-center gap-2.5">
            <HelpCircle className="w-4 h-4 text-emerald-600" />
            <span>Help Center & In-Store FAQ</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>
      </div>
    </div>
  );
};
