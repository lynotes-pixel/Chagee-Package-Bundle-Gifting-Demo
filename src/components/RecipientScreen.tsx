import React from 'react';
import { motion } from 'motion/react';
import {
  Gift,
  Sparkles,
  QrCode,
  Store,
  PartyPopper,
  ArrowLeft,
  Navigation,
} from 'lucide-react';
import { GiftTransaction } from '../types';

interface RecipientScreenProps {
  gift: GiftTransaction | null;
  onOpenUnboxing: () => void;
  onOpenStoreRedeem: (gift: GiftTransaction) => void;
  onBackToSender: () => void;
}

export const RecipientScreen: React.FC<RecipientScreenProps> = ({
  gift,
  onOpenUnboxing,
  onOpenStoreRedeem,
  onBackToSender,
}) => {
  const senderDisplay =
    gift.senderName.replace(/You\s*\(([^)]+)\)/gi, '$1').replace(/\bYou\b/gi, '').replace(/[()]/g, '').trim() || 'Alex';

  return (
    <div className="bg-slate-50 min-h-full pb-24 space-y-3.5">
      {/* Top Recipient App Bento Header */}
      <div className="bg-white border-b-2 border-slate-200 p-4 pt-3 pb-4">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={onBackToSender}
            className="flex items-center gap-1.5 text-xs font-black bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl text-slate-800 transition-colors border border-slate-200 shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Switch to Sender</span>
          </button>

          <span className="text-[10px] font-black uppercase tracking-widest bg-amber-100 text-amber-900 px-2.5 py-1 rounded-full border border-amber-200">
            Recipient Mode
          </span>
        </div>

        {/* User Bento Profile Tile */}
        <div className="flex items-center justify-between bg-slate-900 text-white p-3.5 rounded-2xl border-2 border-slate-800 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-sm shadow-xs border border-white">
              ST
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-base font-black text-white">Sarah Tan</h2>
                <span className="text-[9px] bg-slate-800 text-amber-300 border border-slate-700 px-2 py-0.5 rounded-md font-black">
                  GOLD
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">
                +65 9123 4567 · Singapore
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block">
              CHAGEE Points
            </span>
            <span className="text-sm font-black text-amber-400">1,420 pts</span>
          </div>
        </div>
      </div>

      <div className="px-4 space-y-3.5">
        {/* HERO BENTO PROMPT CARD: "You've Got a Gift" */}
        {gift && (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-5 shadow-sm border-2 border-slate-200 relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-[10px] font-black tracking-wider uppercase">
                <PartyPopper className="w-3.5 h-3.5 text-indigo-600" />
                <span>INCOMING GIFT</span>
              </div>
              <span className="text-xs font-bold text-slate-400">
                {gift.createdAt}
              </span>
            </div>

            <div className="flex items-center gap-4 my-3">
              {/* Gift Box Icon Container with animated pulse */}
              <motion.div
                animate={{
                  scale: [1, 1.06, 1],
                  rotate: [0, -3, 3, 0],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                onClick={onOpenUnboxing}
                className="w-18 h-18 rounded-2xl bg-slate-900 border-2 border-slate-800 p-0.5 shadow-sm flex items-center justify-center cursor-pointer shrink-0 group"
              >
                <div className="w-full h-full rounded-[14px] bg-white flex flex-col items-center justify-center text-center p-1">
                  <span className="text-2xl">🎁</span>
                  <span className="text-[9px] font-black text-indigo-600 uppercase mt-0.5">
                    {gift.opened ? 'UNLOCKED' : 'TAP OPEN'}
                  </span>
                </div>
              </motion.div>

              <div className="flex-1 min-w-0">
                <h3 className="text-base font-black text-slate-900 leading-tight">
                  You've Got a Gift!
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  From <span className="font-bold text-slate-900">{senderDisplay}</span>
                </p>
                {gift.opened && (
                  <p className="text-xs font-bold text-indigo-600 mt-1 line-clamp-1">
                    {gift.itemTitle}
                  </p>
                )}
              </div>
            </div>

            {/* If opened, show message preview in Bento styled container */}
            {gift.opened ? (
              <div className="mt-3 p-3.5 bg-amber-50/80 rounded-2xl border-2 border-amber-200 space-y-1">
                <div className="text-[10px] font-black text-amber-900 uppercase tracking-widest">
                  Personal Greeting:
                </div>
                <p className="text-xs font-bold text-slate-900 italic">
                  "{gift.customMessage}"
                </p>
              </div>
            ) : (
              <p className="text-xs text-slate-500 mt-2 font-medium">
                {senderDisplay} sent you a treat! Tap below to unbox your gift.
              </p>
            )}

            {/* Action Bento Button */}
            <div className="mt-4">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenUnboxing}
                className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs shadow-sm flex items-center justify-center gap-1.5 transition-all"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Unbox eGift</span>
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Recipient's Saved Vouchers Bento Wallet */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between px-1">
            <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400">
              Tea Vouchers & Passes Wallet
            </h4>
            <span className="text-xs font-black text-indigo-600">
              {gift ? `${gift.remainingVouchers} Available` : '0 Available'}
            </span>
          </div>

          {gift && (
            <div className="bg-white rounded-3xl p-4 border-2 border-slate-200 shadow-sm flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-13 h-13 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                  <img
                    src={gift.itemImage}
                    alt={gift.itemTitle}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="min-w-0">
                  <h5 className="font-black text-slate-900 text-xs truncate">
                    {gift.itemTitle}
                  </h5>
                  <p className="text-[11px] text-slate-500 font-semibold mt-0.5">
                    {gift.remainingVouchers} of {gift.totalVouchers} vouchers left
                  </p>
                  <span className="text-[9px] text-emerald-700 font-black bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full inline-block mt-1">
                    Valid across all SG outlets
                  </span>
                </div>
              </div>

              <button
                onClick={() => onOpenStoreRedeem(gift)}
                className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs shadow-2xs flex items-center gap-1 transition-colors border border-amber-300 shrink-0"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>Use</span>
              </button>
            </div>
          )}
        </div>

        {/* Nearby Stores Bento Card */}
        <div className="bg-white rounded-3xl p-4 border-2 border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-black text-slate-900">
              <Store className="w-4 h-4 text-indigo-600" />
              <span>Nearby Redemption Outlets</span>
            </div>
            <span className="text-[11px] font-bold text-slate-400">Singapore</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <p className="font-black text-slate-900">CHAGEE @ Orchard Gateway</p>
                <p className="text-[11px] text-slate-500 font-medium">0.4 km away · Open until 10:30 PM</p>
              </div>
              <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded-full flex items-center gap-1">
                <Navigation className="w-3 h-3" />
                <span>Walk 5m</span>
              </span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <p className="font-black text-slate-900">CHAGEE @ Raffles City</p>
                <p className="text-[11px] text-slate-500 font-medium">1.2 km away · Open until 10:00 PM</p>
              </div>
              <span className="text-[10px] font-black text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                1.2 km
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
