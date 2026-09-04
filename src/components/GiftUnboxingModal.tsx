import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  X,
  Sparkles,
  QrCode,
  Store,
  Calendar,
  PartyPopper,
  CheckCircle2,
} from 'lucide-react';
import { GiftTransaction } from '../types';

interface GiftUnboxingModalProps {
  isOpen: boolean;
  onClose: () => void;
  gift: GiftTransaction | null;
  onOpenStoreRedeem: (gift: GiftTransaction) => void;
}

export const GiftUnboxingModal: React.FC<GiftUnboxingModalProps> = ({
  isOpen,
  onClose,
  gift,
  onOpenStoreRedeem,
}) => {
  const [isOpened, setIsOpened] = useState(gift?.opened || false);
  const [isOpening, setIsOpening] = useState(false);

  if (!isOpen || !gift) return null;

  const senderDisplay =
    gift.senderName.replace(/You\s*\(([^)]+)\)/gi, '$1').replace(/\bYou\b/gi, '').replace(/[()]/g, '').trim() || 'Alex';

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4f46e5', '#fbbf24', '#06b6d4', '#f43f5e', '#10b981'],
      });
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        });
      }, 200);
    } catch (e) {
      console.log('Confetti effect', e);
    }
  };

  const handleOpenGift = () => {
    setIsOpening(true);
    triggerConfetti();

    setTimeout(() => {
      setIsOpening(false);
      setIsOpened(true);
      gift.opened = true;
    }, 700);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
        />

        {/* Modal Bento Container */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-md bg-gradient-to-b from-[#1a0826] via-[#14081f] to-[#0d0414] rounded-3xl shadow-2xl z-10 overflow-hidden text-white border-2 border-rose-500/30"
        >
          {/* Decorative ambient background sparkles & excitement aura */}
          <div className="absolute -top-20 -right-20 w-56 h-56 bg-gradient-to-br from-rose-500/30 to-amber-500/30 rounded-full blur-3xl pointer-events-none animate-pulse" />
          <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-gradient-to-tr from-fuchsia-600/25 to-pink-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(244,63,94,0.15),_transparent_70%)] pointer-events-none" />

          {/* Close button */}
          <button
            id="close-unboxing-modal-btn"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-rose-200 hover:text-white transition-colors border border-white/20 backdrop-blur-xs cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {!isOpened ? (
            /* STATE 1: UNOPENED GIFT BOX VISUAL */
            <div className="p-6 text-center flex flex-col items-center justify-center min-h-[440px] relative z-10">
              {/* Top Badge */}
              <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-rose-500/30 via-fuchsia-500/30 to-amber-500/30 text-rose-200 text-xs font-black tracking-wider uppercase border border-rose-400/40 shadow-sm shadow-rose-950/40 mb-4"
              >
                <PartyPopper className="w-3.5 h-3.5 text-amber-300 animate-bounce" />
                <span>Special Delivery</span>
              </motion.div>

              {/* Header Prompt: "You've Got a Gift" */}
              <motion.h2
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="text-2xl sm:text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-100 to-amber-200 drop-shadow-sm"
              >
                You've Got a Gift! 🎁
              </motion.h2>

              <p className="text-xs text-rose-200/80 mt-1 font-medium max-w-xs">
                From <span className="font-bold text-amber-300">{senderDisplay}</span>
                {gift.senderPhone && ` (${gift.senderPhone})`}
              </p>

              {/* 3D Animated Bento Gift Box Visual */}
              <div className="relative my-8 flex items-center justify-center">
                {/* Glowing pulsating multi-color radiant aura */}
                <motion.div
                  animate={{
                    scale: [1, 1.25, 1],
                    opacity: [0.5, 0.85, 0.5],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute w-52 h-52 rounded-full bg-gradient-to-r from-rose-500/40 via-amber-400/40 to-fuchsia-500/40 blur-2xl pointer-events-none"
                />

                {/* Gift Box with Lid */}
                <motion.div
                  animate={
                    isOpening
                      ? { y: [0, -30, 0], scale: [1, 1.25, 0.85], rotate: [0, -12, 12, 0] }
                      : { y: [0, -10, 0], rotate: [-1.5, 1.5, -1.5] }
                  }
                  transition={
                    isOpening
                      ? { duration: 0.6 }
                      : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }
                  }
                  className="relative cursor-pointer select-none group"
                  onClick={handleOpenGift}
                >
                  {/* Vibrant Luxury Ruby/Crimson Gift Box with Gold Trim */}
                  <div className="w-36 h-36 rounded-3xl bg-gradient-to-br from-rose-600 via-red-600 to-rose-900 shadow-2xl p-1 border-2 border-amber-300/60 flex items-center justify-center relative overflow-hidden shadow-rose-950/80">
                    {/* Inner sheen highlight */}
                    <div className="absolute -top-10 -left-10 w-24 h-24 bg-white/20 rounded-full blur-md pointer-events-none" />

                    {/* Luxurious Gold Satin Cross Ribbons */}
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-7 bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 shadow-md border-y border-amber-200/50" />
                    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-7 bg-gradient-to-b from-amber-300 via-yellow-200 to-amber-400 shadow-md border-x border-amber-200/50" />
                    
                    {/* Golden Ribbon Center Ring & Bow */}
                    <div className="relative z-10 flex items-center justify-center">
                      <div className="text-5xl filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)] transform group-hover:scale-110 transition-transform">
                        🎀
                      </div>
                    </div>
                  </div>

                  {/* Sparkle Floating Icons */}
                  <motion.div
                    animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -top-3 -right-3 text-amber-300 drop-shadow-md"
                  >
                    <Sparkles className="w-7 h-7 fill-amber-300" />
                  </motion.div>
                  <motion.div
                    animate={{ rotate: -360, scale: [0.9, 1.15, 0.9] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -bottom-2 -left-2 text-rose-300 drop-shadow-md"
                  >
                    <Sparkles className="w-5 h-5 fill-rose-300" />
                  </motion.div>
                </motion.div>
              </div>

              {/* Tap on "Open" button */}
              <motion.button
                id="unveil-open-gift-btn"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleOpenGift}
                disabled={isOpening}
                className="w-full max-w-xs py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 hover:from-amber-300 hover:to-yellow-200 text-slate-950 font-black text-sm shadow-xl shadow-amber-950/40 active:scale-95 transition-all flex items-center justify-center gap-2 border-2 border-amber-100 cursor-pointer"
              >
                {isOpening ? (
                  <span className="font-extrabold tracking-wide">Unveiling Gift...</span>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-slate-950 fill-slate-950" />
                    <span className="tracking-wider font-black">TAP TO OPEN</span>
                  </>
                )}
              </motion.button>
              <p className="text-[11px] text-rose-200/70 mt-2.5 font-medium">
                Tap anywhere on the box or button to unveil
              </p>
            </div>
          ) : (
            /* STATE 2: UNVEILED GIFT CARD & BIRTHDAY MESSAGE PROMPT */
            <div className="p-5 flex flex-col max-h-[85vh] overflow-y-auto space-y-3.5">
              {/* Header */}
              <div className="text-center mb-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-black uppercase border border-emerald-500/30">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Gift Unveiled!</span>
                </div>
                <h3 className="text-xl font-black text-white mt-1">
                  You've Received a Treat!
                </h3>
              </div>

              {/* The Heartfelt Birthday Message Prompt Bento Card */}
              <motion.div
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-white rounded-3xl p-4 text-slate-900 shadow-sm border-2 border-slate-200 relative overflow-hidden"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-xl bg-amber-100 flex items-center justify-center text-sm border border-amber-200">
                    🎂
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                      Message from {senderDisplay}
                    </span>
                    <span className="text-xs font-black text-indigo-600">
                      Celebration Greeting
                    </span>
                  </div>
                </div>

                {/* THE EXACT REQUESTED MESSAGE PROMPT */}
                <div className="p-3.5 bg-amber-50 rounded-2xl border-2 border-amber-200">
                  <p className="text-sm sm:text-base font-black text-slate-900 leading-snug italic">
                    "{gift.customMessage || 'Happy Birthday to you! Enjoy your treat!'}"
                  </p>
                </div>
              </motion.div>

              {/* Gifted Item Details Bento Card */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-slate-800 rounded-3xl p-4 border-2 border-slate-700"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-slate-900 shrink-0 border border-slate-700">
                    <img
                      src={gift.itemImage || '/images/chagee_tea_cup.jpg'}
                      alt={gift.itemTitle}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/images/chagee_tea_cup.jpg';
                      }}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-black text-indigo-400 uppercase tracking-wider block">
                      {gift.itemType === 'bundle' ? 'Drink Voucher Pack' : 'Single Drink eGift'}
                    </span>
                    <h4 className="text-sm font-black text-white truncate">
                      {gift.itemTitle}
                    </h4>
                    <p className="text-xs text-slate-400 font-medium truncate mt-0.5">
                      {gift.itemSubtitle}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* In-Store Redemption Action Button */}
              <motion.button
                id="open-in-store-redeem-btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  onClose();
                  onOpenStoreRedeem(gift);
                }}
                className="w-full py-3.5 px-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2 border-2 border-white"
              >
                <QrCode className="w-5 h-5 text-slate-950" />
                <span>REDEEM IN-STORE NOW</span>
              </motion.button>

              <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400 pt-1 font-medium">
                <span className="flex items-center gap-1">
                  <Store className="w-3.5 h-3.5 text-amber-400" />
                  All CHAGEE Outlets
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  Valid for 180 days
                </span>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
