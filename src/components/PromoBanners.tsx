import React from 'react';
import { motion } from 'motion/react';

interface PromoBannersProps {
  onOrderDelivery: () => void;
  onOpenBundle: () => void;
  onOpenTumbler: () => void;
}

export const PromoBanners: React.FC<PromoBannersProps> = ({
  onOrderDelivery,
  onOpenBundle,
  onOpenTumbler,
}) => {
  return (
    <div className="px-4 py-2 space-y-4 pb-24">
      {/* 1. DELIVERY NOW AVAILABLE BANNER (Deep Navy Blue Porcelain Pattern) */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        onClick={onOrderDelivery}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0d1c38] via-[#14284d] to-[#0f203e] text-white p-4 sm:p-5 shadow-md cursor-pointer group border border-blue-950/40"
      >
        {/* Damask porcelain background pattern overlay */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:8px_8px]" />
        
        {/* Sparkles */}
        <span className="absolute top-6 right-24 text-amber-300 text-xs select-none opacity-80">✦</span>
        <span className="absolute bottom-8 right-6 text-amber-200 text-xs select-none opacity-70">★</span>

        <div className="flex items-center justify-between gap-2 relative z-10">
          <div className="flex-1 pr-1">
            <h3 className="text-base sm:text-lg font-black tracking-tight text-white leading-tight">
              Delivery<br />Now Available
            </h3>
            
            <p className="text-[11px] text-blue-200/90 font-medium leading-tight mt-1 mb-2.5 max-w-[180px]">
              Now delivering to selected areas near our store(s)*.
            </p>

            <button
              id="delivery-order-now-btn"
              onClick={(e) => {
                e.stopPropagation();
                onOrderDelivery();
              }}
              className="px-3.5 py-1.5 rounded-full bg-white text-[#0d1c38] text-[10px] font-black tracking-wider uppercase shadow-sm hover:bg-blue-50 active:scale-95 transition-all"
            >
              ORDER NOW
            </button>

            <p className="text-[8px] text-blue-300/70 mt-2 font-normal">
              *T&Cs apply.
            </p>
          </div>

          {/* Right Visual: Cup + Cake + Map Pin */}
          <div className="relative w-32 h-28 flex items-center justify-end shrink-0">
            {/* Chagee Signature Tall Blue Cup */}
            <div className="w-14 h-24 bg-gradient-to-b from-[#0a1e3b] to-[#122e5a] rounded-lg p-1 flex flex-col items-center justify-between text-white shadow-lg border border-blue-400/30 relative z-10 rotate-[-4deg]">
              <div className="w-12 h-3 bg-neutral-900 rounded-t-sm" />
              <span className="text-[7px] font-serif font-black tracking-widest uppercase">CHAGEE</span>
              <div className="w-6 h-6 rounded-full border border-white/50 flex items-center justify-center text-[8px]">
                🪭
              </div>
              <span className="text-[5px] uppercase font-mono opacity-80">FRESH TEA</span>
            </div>

            {/* Cake Slice visual */}
            <div className="absolute bottom-1 right-0 z-20 w-14 h-12 bg-[#fdf3e2] rounded-md shadow-md border border-[#e8d5b8] p-1 flex flex-col items-center justify-center text-center rotate-[6deg]">
              <span className="text-xs">🍰</span>
              <span className="text-[6px] font-bold text-amber-900">Crepe Cake</span>
            </div>

            {/* Gold Map Location Pin */}
            <div className="absolute top-2 right-4 z-20 w-6 h-6 rounded-full bg-[#d4af37] text-neutral-950 flex items-center justify-center font-serif font-black text-[10px] shadow-md border border-white">
              C
            </div>
          </div>
        </div>
      </motion.div>

      {/* 2. PET ADVENTURE CAMP BANNER (Blush Pink Merchandise Banner) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#fae7e9] via-[#f9e2e5] to-[#fbebed] p-4 sm:p-5 shadow-md border border-pink-200/80">
        {/* Starburst badge top right */}
        <div className="absolute top-2.5 right-3 z-20 bg-[#8c2236] text-white text-[8px] font-black px-2 py-1 rounded-lg rotate-[8deg] shadow-xs text-center leading-tight">
          6 Designs<br />to Collect!
        </div>

        <div className="flex items-start justify-between gap-2 relative z-10">
          <div className="flex-1 pr-1">
            {/* Title with pet illustration */}
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-base">🐾</span>
              <span className="text-sm font-black text-[#8c2236] tracking-tight font-serif italic">
                Pet Adventure Camp
              </span>
            </div>

            <div className="mb-1.5">
              <span className="inline-block px-2 py-0.5 rounded-full bg-[#8c2236] text-white text-[7.5px] font-bold uppercase tracking-wide">
                POP-UP STORE EXCLUSIVE | FROM 28 AUG 2026
              </span>
            </div>

            <h4 className="text-xs font-bold text-[#8c2236] leading-snug">
              Singapore Exclusive
            </h4>
            <h3 className="text-xs sm:text-sm font-black text-[#8c2236] leading-snug">
              Paws Plush Pendant
            </h3>

            <div className="text-base font-black text-[#8c2236] my-1">
              $16.90
            </div>
          </div>

          {/* Plush pendants visual */}
          <div className="relative w-32 h-26 flex items-center justify-end shrink-0 pt-3">
            <div className="flex items-center gap-1">
              <div className="text-2xl animate-bounce">🐶</div>
              <div className="text-2xl">🐱</div>
              <div className="text-2xl">🧸</div>
            </div>
          </div>
        </div>

        <p className="text-[7.5px] text-[#ab737e] font-normal leading-tight mt-2">
          *T&Cs apply. Merchandise is only available while stocks last. Plushies are randomly assigned and non-exchangeable.
        </p>
      </div>

      {/* 3. PAWS TUMBLER BUNDLE BANNER (Blush Pink Tumbler Banner) */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        onClick={onOpenTumbler}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#fae7e9] via-[#f7dee2] to-[#f9e9ec] p-4 sm:p-5 shadow-md border border-pink-200/80 cursor-pointer"
      >
        {/* Right circular badge */}
        <div className="absolute top-2.5 right-3 z-20 flex flex-col items-center">
          <div className="bg-[#8c2236] text-white text-[7px] font-black p-1.5 rounded-full text-center leading-none w-14 h-14 flex items-center justify-center shadow-xs">
            Available for<br />Pickup &<br />Delivery
          </div>
          <span className="text-[6.5px] text-[#8c2236] font-bold mt-0.5">*Choose 1 design</span>
        </div>

        <div className="relative z-10 pr-16">
          <div className="mb-1.5">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-white text-[#8c2236] text-[8px] font-bold shadow-xs">
              7 Aug - 3 Sep 2026
            </span>
          </div>

          <h3 className="text-sm sm:text-base font-black text-[#422026] leading-snug">
            Paws Tumbler Bundle
          </h3>

          <div className="text-base font-black text-[#422026] my-0.5">
            $36.90
          </div>

          <p className="text-[9.5px] text-[#784c54] font-medium leading-tight mb-2">
            Includes 1 Large Drink & 1 Paws Tumbler
          </p>

          <button
            id="learn-more-tumbler-btn"
            onClick={(e) => {
              e.stopPropagation();
              onOpenTumbler();
            }}
            className="px-4 py-1 rounded-full bg-[#8c2236] text-white text-[9px] font-black tracking-wider uppercase shadow-xs hover:bg-[#73192a] active:scale-95 transition-all"
          >
            LEARN MORE
          </button>
        </div>

        {/* 3 Tumblers visual preview */}
        <div className="flex items-center gap-2 mt-3 pt-2 border-t border-pink-200/60">
          <div className="flex items-center gap-1.5 text-lg">
            <span title="Chagee Signature Cup">🥤</span>
            <span title="Cat Tumbler">🐱</span>
            <span title="Mint Tumbler">🧋</span>
            <span title="Pink Tumbler">🌸</span>
          </div>
          <p className="text-[7.5px] text-[#ab737e] font-normal">
            *T&Cs apply.
          </p>
        </div>
      </motion.div>

      {/* Slogan at bottom matching screenshot */}
      <div className="text-center pt-4 pb-2">
        <p className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#b8c7db] uppercase select-none">
          CHAGEE TOGETHER
        </p>
      </div>
    </div>
  );
};

