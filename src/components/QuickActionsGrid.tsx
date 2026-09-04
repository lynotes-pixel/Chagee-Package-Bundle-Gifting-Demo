import React from 'react';
import {
  FileText,
  Users,
  Store,
  Calculator,
  Gift,
  Package,
  ChevronRight,
  Award,
  Sparkles,
  Coins,
} from 'lucide-react';
import { REWARDS_LIST } from '../data/menuData';

interface QuickActionsGridProps {
  onOpenPackageBundle: () => void;
  onOpenEGift: () => void;
  onOpenStory?: () => void;
  onOpenRefer?: () => void;
  onOpenStores?: () => void;
  onOpenCalculator?: () => void;
  userPoints?: number;
  onPreviewReward?: (rewardId: string) => void;
}

export const QuickActionsGrid: React.FC<QuickActionsGridProps> = ({
  onOpenPackageBundle,
  onOpenEGift,
  onOpenStory,
  onOpenRefer,
  onOpenStores,
  onOpenCalculator,
  userPoints = 2940,
  onPreviewReward,
}) => {
  return (
    <div className="px-4 py-2 space-y-3">
      {/* 4-Action Minimalist Outlined Row (Matching Screenshot UI) */}
      <div className="bg-white rounded-2xl py-3 px-1 shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-neutral-100">
        <div className="grid grid-cols-4 gap-1 text-center">
          {/* 1. CHAGEE Story */}
          <button
            id="quick-story-btn"
            onClick={onOpenStory}
            className="flex flex-col items-center justify-center p-1 group hover:opacity-80 active:scale-95 transition-all"
          >
            <div className="w-8 h-8 flex items-center justify-center text-[#8e7a75] mb-1.5 group-hover:text-[#e45b78] transition-colors">
              <FileText className="w-6 h-6 stroke-[1.5]" />
            </div>
            <span className="text-[11px] font-medium text-neutral-600 group-hover:text-neutral-900 leading-tight">
              CHAGEE<br />Story
            </span>
          </button>

          {/* 2. Refer Friends */}
          <button
            id="quick-refer-btn"
            onClick={onOpenRefer}
            className="flex flex-col items-center justify-center p-1 group hover:opacity-80 active:scale-95 transition-all"
          >
            <div className="w-8 h-8 flex items-center justify-center text-[#8e7a75] mb-1.5 group-hover:text-[#e45b78] transition-colors">
              <Users className="w-6 h-6 stroke-[1.5]" />
            </div>
            <span className="text-[11px] font-medium text-neutral-600 group-hover:text-neutral-900 leading-tight">
              Refer<br />Friends
            </span>
          </button>

          {/* 3. Store Location */}
          <button
            id="quick-stores-btn"
            onClick={onOpenStores}
            className="flex flex-col items-center justify-center p-1 group hover:opacity-80 active:scale-95 transition-all"
          >
            <div className="w-8 h-8 flex items-center justify-center text-[#8e7a75] mb-1.5 group-hover:text-[#e45b78] transition-colors">
              <Store className="w-6 h-6 stroke-[1.5]" />
            </div>
            <span className="text-[11px] font-medium text-neutral-600 group-hover:text-neutral-900 leading-tight">
              Store<br />Location
            </span>
          </button>

          {/* 4. Calorie Calculator */}
          <button
            id="quick-calc-btn"
            onClick={onOpenCalculator}
            className="flex flex-col items-center justify-center p-1 group hover:opacity-80 active:scale-95 transition-all"
          >
            <div className="w-8 h-8 flex items-center justify-center text-[#8e7a75] mb-1.5 group-hover:text-[#e45b78] transition-colors">
              <div className="relative">
                <Calculator className="w-6 h-6 stroke-[1.5]" />
                <span className="absolute -top-1 -right-1 text-[9px]">🍃</span>
              </div>
            </div>
            <span className="text-[11px] font-medium text-neutral-600 group-hover:text-neutral-900 leading-tight">
              Calorie<br />Calculator
            </span>
          </button>
        </div>
      </div>

      {/* 2 Aligned Action Badges (Drink Bundles, Send eGift) */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* Badge 1: Drink Bundles (Amber/Orange) */}
        <button
          id="package-bundle-main-btn"
          onClick={onOpenPackageBundle}
          className="bg-gradient-to-br from-[#fef6ed] to-[#fdeddf] p-3 rounded-2xl border border-[#fae2cb] text-left flex flex-col justify-between hover:opacity-95 active:scale-98 transition-all group shadow-xs min-h-[86px]"
        >
          <div className="flex items-center justify-between w-full">
            <div className="w-7 h-7 rounded-xl bg-[#e49b38] text-white flex items-center justify-center shadow-xs">
              <Package className="w-3.5 h-3.5" />
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-amber-600 group-hover:translate-x-0.5 transition-transform" />
          </div>
          <div className="mt-2">
            <div className="text-xs sm:text-sm font-black text-neutral-900 leading-tight">
              Drink Bundles
            </div>
            <div className="text-[11px] text-amber-800 font-bold leading-tight mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
              Save up to $20
            </div>
          </div>
        </button>

        {/* Badge 2: Send eGift (Rose/Pink) */}
        <button
          id="egift-main-btn"
          onClick={onOpenEGift}
          className="bg-gradient-to-br from-[#fdf2f4] to-[#fbe8eb] p-3 rounded-2xl border border-[#f7d3d8] text-left flex flex-col justify-between hover:opacity-95 active:scale-98 transition-all group shadow-xs min-h-[86px]"
        >
          <div className="flex items-center justify-between w-full">
            <div className="w-7 h-7 rounded-xl bg-[#e45b78] text-white flex items-center justify-center shadow-xs">
              <Gift className="w-3.5 h-3.5" />
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-rose-600 group-hover:translate-x-0.5 transition-transform" />
          </div>
          <div className="mt-2">
            <div className="text-xs sm:text-sm font-black text-neutral-900 leading-tight">
              Send eGift
            </div>
            <div className="text-[11px] text-rose-800 font-bold leading-tight mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
              & Share a Cup
            </div>
          </div>
        </button>
      </div>

      {/* "Redeem your Points" Segment (Below the blocks) */}
      <div className="bg-white rounded-3xl p-4 shadow-[0_2px_14px_rgba(0,0,0,0.03)] border border-neutral-100/90 space-y-3">
        {/* Section Header with Line-by-Line Layout */}
        <div className="space-y-1.5">
          {/* Line 1: Title & Icon */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-2xs shrink-0">
              <Award className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-sm font-black text-neutral-900 leading-none">
              Redeem your Points
            </h3>
          </div>

          {/* Line 2: Fine Print Text */}
          <p className="text-xs text-neutral-500 font-medium leading-normal">
            Turn your Tea Leaves into drinks & exclusive merch
          </p>

          {/* Line 3: 1-Liner with Points Balance on left and View All button on right */}
          <div className="flex items-center justify-between pt-1.5 border-t border-neutral-100 gap-2">
            <div className="flex items-center gap-1.5 text-xs text-neutral-700 min-w-0">
              <span className="font-semibold text-neutral-500 whitespace-nowrap">Points balance:</span>
              <span className="font-black text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 whitespace-nowrap">
                {userPoints.toLocaleString()} pts
              </span>
            </div>

            <button
              id="view-all-rewards-btn"
              onClick={() => onPreviewReward && onPreviewReward(REWARDS_LIST[0].id)}
              className="text-xs font-extrabold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100/80 px-2.5 py-1 rounded-full transition-colors flex items-center gap-0.5 group shrink-0 cursor-pointer"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5 text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Preview of up to 3 Rewards with indicative points required for redemption */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          {REWARDS_LIST.slice(0, 3).map((reward) => (
            <button
              key={reward.id}
              id={`preview-reward-${reward.id}`}
              onClick={() => onPreviewReward && onPreviewReward(reward.id)}
              className="group flex flex-col bg-neutral-50/80 hover:bg-emerald-50/40 rounded-2xl p-2 border border-neutral-200/70 hover:border-emerald-400/80 transition-all text-left relative overflow-hidden active:scale-96 shadow-2xs hover:shadow-xs"
            >
              {/* Image thumbnail with CHAGEE drink cup, badge and indicative value */}
              <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-neutral-100 mb-2">
                <img
                  src={reward.image}
                  alt={reward.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                {/* Top Badge */}
                {reward.badge && (
                  <span
                    className={`absolute top-1 left-1 text-[8px] font-black px-1.5 py-0.5 rounded-md shadow-xs ${
                      reward.badgeColor || 'bg-emerald-600 text-white'
                    }`}
                  >
                    {reward.badge}
                  </span>
                )}

                {/* Bottom Indicative Value Tag */}
                <span className="absolute bottom-1 right-1 text-[8px] font-bold px-1.5 py-0.5 rounded-md bg-black/65 text-white backdrop-blur-xs">
                  {reward.indicativeValue}
                </span>
              </div>

              {/* Liner 1: Text */}
              <div className="text-[11px] font-extrabold text-neutral-900 leading-tight truncate w-full group-hover:text-emerald-950">
                {reward.name}
              </div>

              {/* Liner 2: Points Balance */}
              <div className="mt-1.5 flex items-center w-full">
                <span className="text-[10px] font-black text-emerald-900 bg-emerald-100/90 px-2 py-0.5 rounded-md border border-emerald-200/80 whitespace-nowrap">
                  {reward.pointsCost.toLocaleString()} pts
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};


