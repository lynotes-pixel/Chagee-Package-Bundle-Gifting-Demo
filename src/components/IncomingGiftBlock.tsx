import React from 'react';
import { motion } from 'motion/react';
import { PartyPopper, Sparkles } from 'lucide-react';
import { GiftTransaction } from '../types';

interface IncomingGiftBlockProps {
  gift: GiftTransaction;
  onOpenUnboxing: () => void;
  onOpenStoreRedeem?: (gift: GiftTransaction) => void;
}

export const IncomingGiftBlock: React.FC<IncomingGiftBlockProps> = ({
  gift,
  onOpenUnboxing,
}) => {
  const senderDisplay =
    gift.senderName.replace(/You\s*\(([^)]+)\)/gi, '$1').replace(/\bYou\b/gi, '').replace(/[()]/g, '').trim() || 'Alex';

  return (
    <motion.div
      initial={{ scale: 0.96, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="rounded-3xl p-4.5 shadow-sm border-2 border-blue-200/90 relative overflow-hidden bg-gradient-to-br from-[#eff6ff] via-[#f0f7ff] to-[#e6f0fd]"
    >
      {/* Top Header Tag & Time */}
      <div className="flex items-center justify-between mb-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/90 border border-blue-200 text-blue-700 text-[10px] font-black tracking-wider uppercase shadow-2xs">
          <PartyPopper className="w-3.5 h-3.5 text-blue-600" />
          <span>INCOMING GIFT</span>
        </div>
        <span className="text-[11px] font-bold text-slate-400">
          {gift.createdAt}
        </span>
      </div>

      {/* Main Content Row */}
      <div className="flex items-center gap-3.5 my-2.5">
        {/* Animated Gift Box Icon */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, -2, 2, 0],
          }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          onClick={onOpenUnboxing}
          className="w-16 h-16 rounded-2xl bg-neutral-900 border-2 border-neutral-800 p-0.5 shadow-sm flex items-center justify-center cursor-pointer shrink-0 group active:scale-95 transition-transform"
          title="Tap to unbox your gift"
        >
          <div className="w-full h-full rounded-[14px] bg-white flex flex-col items-center justify-center text-center p-1">
            <span className="text-2xl">🎁</span>
            <span className="text-[8px] font-black text-indigo-600 uppercase mt-0.5 tracking-tight">
              {gift.opened ? 'UNLOCKED' : 'TAP OPEN'}
            </span>
          </div>
        </motion.div>

        {/* Gift Information */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-black text-neutral-900 leading-tight">
            You've Got a Gift!
          </h3>
          <p className="text-xs text-neutral-600 mt-0.5 font-medium">
            From <span className="font-bold text-neutral-900">{senderDisplay}</span>
          </p>
          {gift.opened && (
            <p className="text-xs font-bold text-indigo-600 mt-0.5 line-clamp-1">
              {gift.itemTitle}
            </p>
          )}
        </div>
      </div>

      {/* Greeting Preview if Opened, or Hint if Unopened */}
      {gift.opened ? (
        <div className="mt-2.5 p-3 bg-amber-50/90 rounded-2xl border border-amber-200/80 space-y-0.5">
          <div className="text-[9px] font-black text-amber-900 uppercase tracking-widest">
            Personal Greeting:
          </div>
          <p className="text-xs font-bold text-neutral-900 italic">
            "{gift.customMessage}"
          </p>
        </div>
      ) : (
        <p className="text-xs text-neutral-500 mt-1.5 font-medium leading-relaxed">
          {senderDisplay} sent you a treat! Tap below to unbox your gift.
        </p>
      )}

      {/* Action Button */}
      <div className="mt-3.5">
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={onOpenUnboxing}
          className="w-full py-3 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs shadow-xs flex items-center justify-center gap-1.5 transition-all"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Unbox eGift</span>
        </motion.button>
      </div>
    </motion.div>
  );
};
