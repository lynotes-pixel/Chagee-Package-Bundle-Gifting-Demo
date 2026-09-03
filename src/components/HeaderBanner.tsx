import React from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';

interface HeaderBannerProps {
  onScanQR?: () => void;
  onViewVouchers?: () => void;
  onOpenBundle?: () => void;
  userName?: string;
  userTier?: string;
  teaLeaves?: number;
  vouchersCount?: number;
}

export const HeaderBanner: React.FC<HeaderBannerProps> = ({
  onScanQR,
  onViewVouchers,
  onOpenBundle,
  userName = 'friend',
  userTier = 'CHA Master',
  teaLeaves = 2940,
  vouchersCount = 7,
}) => {
  return (
    <div className="relative pt-2 pb-2 overflow-hidden bg-gradient-to-b from-[#fdeee9] via-[#fcf5f0] to-[#fbf7f4]">
      {/* Soft floating golden stars */}
      <div className="absolute top-4 left-6 text-amber-300 text-sm select-none opacity-80 animate-pulse">✦</div>
      <div className="absolute top-12 left-10 text-amber-200 text-xs select-none opacity-70">★</div>
      <div className="absolute top-8 right-16 text-amber-300 text-sm select-none opacity-80">✦</div>
      <div className="absolute top-24 right-8 text-amber-300 text-xs select-none opacity-70 animate-pulse">★</div>
      <div className="absolute top-28 right-12 text-amber-200 text-xs select-none opacity-80">✦</div>

      {/* Top action row: Language pill + QR button */}
      <div className="flex items-center justify-between px-4 py-1 relative z-10">
        <button
          className="flex items-center space-x-1.5 bg-white/70 backdrop-blur-md px-3 py-1 rounded-full text-slate-700 text-xs font-bold border border-white/80 shadow-xs hover:bg-white transition-all"
        >
          <span>EN</span>
          <ChevronDown className="w-3 h-3 text-slate-500" />
          <span className="text-slate-300 text-[10px]">|</span>
          <span className="text-sm" role="img" aria-label="Singapore">🇸🇬</span>
        </button>

        <button
          id="qr-scan-btn"
          onClick={onScanQR}
          className="w-8 h-8 rounded-full bg-white/70 backdrop-blur-md border border-white/80 flex items-center justify-center text-slate-600 hover:text-slate-900 shadow-xs active:scale-95 transition-all"
          title="Scan QR Code"
        >
          {/* 4 dots matrix icon */}
          <div className="grid grid-cols-2 gap-0.5 p-1">
            <div className="w-1.5 h-1.5 rounded-xs bg-slate-600" />
            <div className="w-1.5 h-1.5 rounded-xs bg-slate-600" />
            <div className="w-1.5 h-1.5 rounded-xs bg-slate-600" />
            <div className="w-1.5 h-1.5 rounded-xs bg-slate-600" />
          </div>
        </button>
      </div>

      {/* Hero Banner: Bes-Tea BrewCrew */}
      <div className="px-4 pt-1 pb-2 relative z-10">
        {/* Title & Date Pill */}
        <div className="text-center mb-2">
          <div className="inline-block relative">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#94c3ee] via-[#d5b0db] to-[#f39ea7] filter drop-shadow-[0_2px_4px_rgba(230,150,170,0.4)]">
              Bes-Tea
            </h1>
            <div className="text-xl sm:text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#8cc6eb] via-[#e5b6c8] to-[#f8abb0] -mt-1 filter drop-shadow-[0_2px_4px_rgba(230,150,170,0.4)]">
              BrewCrew
            </div>
          </div>

          <div className="mt-1">
            <span className="inline-block px-3 py-0.5 rounded-full bg-[#e45b78] text-white text-[10px] font-bold shadow-xs">
              From 24 Jul 2026
            </span>
          </div>
        </div>

        {/* Hero Visuals & Product Info */}
        <div className="flex items-center justify-between gap-3 mt-1">
          {/* Left: Drink Cup + Plushie Box */}
          <div className="relative w-36 h-36 flex items-end justify-start shrink-0 pl-1">
            {/* Chagee Signature Blue & White Cup */}
            <div className="relative z-10 w-20 h-32 flex flex-col items-center">
              {/* Cup lid */}
              <div className="w-16 h-4 bg-neutral-900 rounded-t-md shadow-xs" />
              {/* Cup body with blue porcelain floral wrap */}
              <div className="w-15 h-26 bg-gradient-to-b from-[#0e274d] via-[#133568] to-[#0d2345] rounded-b-lg p-1.5 flex flex-col items-center justify-between text-white shadow-lg border border-blue-900/40 relative overflow-hidden">
                {/* Traditional damask floral overlay */}
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:6px_6px]" />
                <div className="w-9 h-9 rounded-full border border-white/60 flex items-center justify-center p-0.5 mt-1 relative z-10">
                  <span className="text-[7px] font-serif font-black tracking-widest uppercase text-center scale-90">CHAGEE</span>
                </div>
                <div className="text-[6px] font-serif font-bold tracking-widest uppercase text-white/90 relative z-10">
                  CHAGEE
                </div>
              </div>
            </div>

            {/* Bes-Tea Plushie Mystery Box sitting next to cup */}
            <div className="absolute bottom-0 left-14 z-20 w-18 h-22 bg-gradient-to-tr from-[#faecea] to-[#f9dfdf] rounded-lg shadow-md border border-pink-200 p-1 flex flex-col items-center justify-between text-center rotate-[3deg]">
              <span className="text-[6px] font-bold text-slate-500 uppercase tracking-widest">CHAGEE</span>
              <span className="text-[9px] font-black text-rose-500 leading-tight">Bes-Tea</span>
              <div className="text-xl leading-none">🧸</div>
              <div className="text-[6px] text-slate-600 font-bold bg-white/80 rounded-xs px-1 py-0.2">
                Mystery Box
              </div>
            </div>
          </div>

          {/* Right: Text & Details */}
          <div className="flex-1 min-w-0 pr-1 text-left">
            <h3 className="text-xs sm:text-sm font-black text-[#cf5673] leading-snug">
              Bes-Tea Brew Crew Plushie Bundle
            </h3>
            
            <div className="text-lg font-black text-[#cf5673] my-0.5">
              $17.90
            </div>

            <p className="text-[10px] text-[#a0747e] font-medium leading-tight line-clamp-3 mb-2">
              Includes 1 Large Fresh Milk Tea Drink* and 1 Bes-Tea Brew Crew Plushie Box (randomly assigned)
            </p>

            <button
              id="find-out-more-btn"
              onClick={onOpenBundle}
              className="px-4 py-1.5 rounded-full bg-[#e54e74] hover:bg-[#d84067] text-white text-[11px] font-black tracking-wide shadow-sm active:scale-95 transition-all inline-block uppercase"
            >
              FIND OUT MORE
            </button>
          </div>
        </div>

        {/* Disclaimer Text at bottom of banner */}
        <p className="text-[8px] text-[#b8959d] font-normal leading-tight text-center mt-2 px-1">
          *Selected drinks only. Merchandise is available with bundle sets only, while stocks last. Plushies are randomly assigned and non-exchangeable. Pickup orders must be collected from the same store within 2 hours once marked ready for collection. Prices may vary by store. Other T&Cs apply.
        </p>
      </div>

      {/* Profile & Member Row (Matching Screenshot) */}
      <div className="px-4 pt-3 pb-2 relative z-10">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-neutral-900 tracking-tight">
                Hi, {userName}
              </h2>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#fceddc] text-[#9b682c] border border-[#ecd5bd] text-[11px] font-bold">
                <span>{userTier}</span>
                <span className="text-[9px] font-black">&gt;</span>
              </span>
            </div>

            <div className="flex items-center gap-6 mt-2">
              <div>
                <div className="text-lg font-black text-neutral-900 leading-tight">
                  {teaLeaves}<span className="text-[#3b82f6] font-bold text-xs ml-0.2">°</span>
                </div>
                <p className="text-[9px] font-bold tracking-wider text-neutral-400 uppercase">
                  TEA LEAVES
                </p>
              </div>

              <div>
                <button
                  id="view-vouchers-btn"
                  onClick={onViewVouchers}
                  className="text-left group"
                >
                  <div className="text-lg font-black text-neutral-900 leading-tight group-hover:text-[#e45b78] transition-colors">
                    {vouchersCount}<span className="text-[#3b82f6] font-bold text-xs ml-0.2">°</span>
                  </div>
                  <p className="text-[9px] font-bold tracking-wider text-neutral-400 uppercase group-hover:text-[#e45b78] transition-colors">
                    VOUCHERS
                  </p>
                </button>
              </div>
            </div>
          </div>

          {/* CHAGEE Chinese Peking Opera Mask Avatar Emblem */}
          <div className="w-14 h-14 rounded-full bg-[#e31837] p-1 shadow-md flex items-center justify-center shrink-0 border-2 border-white">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-white" aria-hidden="true">
              {/* Traditional stylized Peking Opera mask outline */}
              <path d="M50 8 C30 8 18 24 18 42 C18 64 35 88 50 94 C65 88 82 64 82 42 C82 24 70 8 50 8 Z" fill="none" stroke="white" strokeWidth="3" />
              {/* Opera Headdress elements */}
              <circle cx="28" cy="18" r="4" fill="white" />
              <circle cx="38" cy="14" r="4" fill="white" />
              <circle cx="50" cy="12" r="5" fill="white" />
              <circle cx="62" cy="14" r="4" fill="white" />
              <circle cx="72" cy="18" r="4" fill="white" />
              {/* Tassels */}
              <path d="M22 24 Q16 34 20 48 M78 24 Q84 34 80 48" stroke="white" strokeWidth="2" fill="none" />
              {/* Eyebrows & Eyes */}
              <path d="M32 38 Q40 32 46 40 M68 38 Q60 32 54 40" stroke="white" strokeWidth="2.5" fill="none" />
              <circle cx="38" cy="45" r="3" fill="white" />
              <circle cx="62" cy="45" r="3" fill="white" />
              {/* Nose & Red-white Opera face makeup */}
              <path d="M50 42 L50 58 M44 60 Q50 63 56 60" stroke="white" strokeWidth="2" fill="none" />
              {/* Lips */}
              <path d="M42 70 Q50 78 58 70 Q50 73 42 70 Z" fill="white" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

