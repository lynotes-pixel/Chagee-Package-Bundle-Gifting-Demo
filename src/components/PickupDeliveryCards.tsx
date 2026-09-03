import React from 'react';
import { motion } from 'motion/react';

interface PickupDeliveryCardsProps {
  onSelectPickup: () => void;
  onSelectDelivery: () => void;
}

export const PickupDeliveryCards: React.FC<PickupDeliveryCardsProps> = ({
  onSelectPickup,
  onSelectDelivery,
}) => {
  return (
    <div className="px-4 py-2">
      <div className="grid grid-cols-2 gap-3.5">
        {/* PICKUP CARD */}
        <motion.button
          id="pickup-action-card"
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.98 }}
          onClick={onSelectPickup}
          className="relative bg-white rounded-3xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-neutral-100 flex flex-col items-center justify-center text-center overflow-hidden group hover:shadow-md transition-all"
        >
          {/* Plush Teapot & Rainbow Halo Illustration */}
          <div className="relative w-28 h-28 flex items-center justify-center mb-1">
            {/* Soft rainbow / cloud pastel ring */}
            <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-[#dbeafe]/80 via-[#fce7f3]/80 to-[#fef3c7]/80 filter blur-[1px] opacity-90 group-hover:rotate-6 transition-transform duration-500" />
            <div className="absolute inset-3 rounded-full border-4 border-white/90 shadow-inner" />

            {/* Sparkle stars */}
            <span className="absolute top-1 right-3 text-amber-300 text-xs select-none">✦</span>
            <span className="absolute bottom-2 left-3 text-amber-300 text-xs select-none animate-pulse">★</span>

            {/* Cute 3D plush blue teapot character */}
            <div className="relative z-10 flex flex-col items-center justify-center">
              {/* Teapot lid with cute knob */}
              <div className="w-5 h-2 bg-[#9ec5ee] rounded-t-full shadow-xs -mb-0.5 border border-white/40" />
              {/* Teapot body */}
              <div className="w-16 h-12 bg-gradient-to-b from-[#a4ccf4] to-[#7fb5eb] rounded-2xl flex flex-col items-center justify-center shadow-md relative border border-white/50">
                {/* Spout */}
                <div className="absolute -left-2 top-3 w-4 h-4 bg-[#7fb5eb] rounded-tl-full rotate-[-40deg] border-t border-white/40" />
                {/* Handle */}
                <div className="absolute -right-2 top-2.5 w-4 h-6 border-2 border-[#7fb5eb] rounded-r-full" />
                {/* Cute blushing face */}
                <div className="flex items-center gap-2 mb-0.5">
                  <div className="w-1 h-1.5 bg-slate-800 rounded-full" />
                  <div className="w-1 h-1.5 bg-slate-800 rounded-full" />
                </div>
                {/* Blushing cheeks & smile */}
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1 bg-pink-300 rounded-full" />
                  <div className="w-2 h-1 border-b-2 border-slate-700 rounded-full" />
                  <div className="w-1.5 h-1 bg-pink-300 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          <span className="text-sm font-black tracking-widest text-[#e45b78] uppercase">
            PICKUP
          </span>
        </motion.button>

        {/* DELIVERY CARD */}
        <motion.button
          id="delivery-action-card"
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.98 }}
          onClick={onSelectDelivery}
          className="relative bg-white rounded-3xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-neutral-100 flex flex-col items-center justify-center text-center overflow-hidden group hover:shadow-md transition-all"
        >
          {/* Blue NEW Pill Badge */}
          <div className="absolute top-2.5 right-2.5 z-20 bg-[#70b0ff] text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-xs tracking-wider">
            NEW
          </div>

          {/* Plush Matcha Cup & Rainbow Halo Illustration */}
          <div className="relative w-28 h-28 flex items-center justify-center mb-1">
            {/* Soft rainbow / cloud pastel ring */}
            <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-[#dcfce7]/80 via-[#fef9c3]/80 to-[#fce7f3]/80 filter blur-[1px] opacity-90 group-hover:-rotate-6 transition-transform duration-500" />
            <div className="absolute inset-3 rounded-full border-4 border-white/90 shadow-inner" />

            {/* Sparkle stars */}
            <span className="absolute top-1 left-3 text-amber-300 text-xs select-none">✦</span>
            <span className="absolute bottom-2 right-3 text-amber-300 text-xs select-none animate-pulse">★</span>

            {/* Cute 3D plush green matcha cup character */}
            <div className="relative z-10 flex flex-col items-center justify-center">
              {/* Cup top foam / dollop */}
              <div className="w-8 h-2 bg-[#d7ecd6] rounded-t-full shadow-xs -mb-0.5 border border-white/40" />
              {/* Matcha cup body */}
              <div className="w-15 h-13 bg-gradient-to-b from-[#bcdcb8] to-[#9fcb99] rounded-2xl flex flex-col items-center justify-center shadow-md relative border border-white/50">
                {/* Straw / decoration */}
                <div className="absolute -top-3 right-3 w-1.5 h-4 bg-slate-300 rounded-t-full rotate-[15deg]" />
                {/* Cute smiling face */}
                <div className="flex items-center gap-2 mb-0.5">
                  <div className="w-1 h-1.5 bg-slate-800 rounded-full" />
                  <div className="w-1 h-1.5 bg-slate-800 rounded-full" />
                </div>
                {/* Blushing cheeks & cute smile */}
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1 bg-pink-300 rounded-full" />
                  <div className="w-2 h-1 border-b-2 border-slate-700 rounded-full" />
                  <div className="w-1.5 h-1 bg-pink-300 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          <span className="text-sm font-black tracking-widest text-[#e45b78] uppercase">
            DELIVERY
          </span>
        </motion.button>
      </div>
    </div>
  );
};

