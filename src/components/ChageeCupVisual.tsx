import React from 'react';

interface ChageeCupVisualProps {
  theme?: 'jasmine' | 'peach' | 'dahongpao' | 'osmanthus' | 'hojicha' | 'lemon' | 'watermelon' | 'cake' | 'deal' | 'tea';
  nutriGrade?: {
    grade: 'A' | 'B' | 'C' | 'D';
    sugarPct: string;
  };
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ChageeCupVisual: React.FC<ChageeCupVisualProps> = ({
  theme = 'jasmine',
  nutriGrade = { grade: 'B', sugarPct: '4%' },
  className = '',
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'w-16 h-18',
    md: 'w-20 h-22',
    lg: 'w-24 h-28',
  }[size];

  return (
    <div className={`relative flex items-center justify-center shrink-0 select-none ${sizeClasses} ${className}`}>
      {/* 1. BACKGROUND BOTANICAL/INGREDIENT ELEMENTS */}
      {theme === 'jasmine' && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Jasmine petals around the cup */}
          {/* Left top flower */}
          <div className="absolute -left-1 top-3 flex items-center justify-center">
            <svg viewBox="0 0 40 40" className="w-9 h-9 drop-shadow-xs opacity-95">
              <circle cx="20" cy="11" r="7" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.8" />
              <circle cx="11" cy="20" r="7" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.8" />
              <circle cx="29" cy="20" r="7" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.8" />
              <circle cx="15" cy="28" r="7" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.8" />
              <circle cx="25" cy="28" r="7" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.8" />
              <circle cx="20" cy="20" r="3" fill="#fef08a" />
            </svg>
          </div>
          {/* Right flower */}
          <div className="absolute -right-2 top-6 flex items-center justify-center">
            <svg viewBox="0 0 40 40" className="w-8 h-8 drop-shadow-xs opacity-90">
              <circle cx="20" cy="12" r="6" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.8" />
              <circle cx="12" cy="20" r="6" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.8" />
              <circle cx="28" cy="20" r="6" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.8" />
              <circle cx="16" cy="27" r="6" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.8" />
              <circle cx="24" cy="27" r="6" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.8" />
              <circle cx="20" cy="20" r="2.5" fill="#fde047" />
            </svg>
          </div>
        </div>
      )}

      {theme === 'peach' && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Juicy Blushed Peach on the left */}
          <div className="absolute -left-1.5 top-3 w-10 h-10 flex items-center justify-center">
            <div className="relative w-9 h-9">
              {/* Peach Fruit */}
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#fca5a5] via-[#fecdd3] to-[#fed7aa] shadow-xs flex items-center justify-center relative">
                <div className="w-3 h-5 bg-[#fda4af]/40 rounded-full blur-[1px]" />
              </div>
              {/* Green leaf */}
              <div className="absolute -top-1.5 right-1 w-4 h-2.5 bg-[#4ade80] rounded-tl-full rounded-br-full -rotate-45 shadow-2xs" />
            </div>
          </div>
          {/* Fresh Green Leaf on right */}
          <div className="absolute -right-1 top-4 w-4 h-7 bg-[#22c55e] rounded-tr-full rounded-bl-full rotate-45 opacity-80" />
        </div>
      )}

      {theme === 'dahongpao' && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Tea Leaves behind cup */}
          <div className="absolute -left-2 top-2 flex flex-col items-center rotate-[-25deg]">
            <div className="w-5 h-8 bg-gradient-to-b from-[#15803d] to-[#166534] rounded-tl-full rounded-br-full shadow-xs" />
          </div>
          <div className="absolute -right-1.5 top-4 flex flex-col items-center rotate-[30deg]">
            <div className="w-4.5 h-7 bg-gradient-to-b from-[#16a34a] to-[#15803d] rounded-tr-full rounded-bl-full shadow-xs" />
          </div>
        </div>
      )}

      {theme === 'osmanthus' && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Golden Yellow Osmanthus Sprays */}
          <div className="absolute -left-2 top-2 w-9 h-14 flex flex-wrap gap-1 items-center justify-center opacity-90">
            <div className="w-2.5 h-2.5 bg-[#facc15] rounded-full shadow-2xs" />
            <div className="w-2 h-2 bg-[#eab308] rounded-full" />
            <div className="w-3 h-3 bg-[#fde047] rounded-full shadow-2xs" />
            <div className="w-2 h-2 bg-[#facc15] rounded-full" />
            <div className="w-2.5 h-2.5 bg-[#ca8a04] rounded-full" />
          </div>
          <div className="absolute -right-1.5 top-5 w-8 h-12 flex flex-wrap gap-1 items-center justify-center opacity-90">
            <div className="w-2.5 h-2.5 bg-[#facc15] rounded-full shadow-2xs" />
            <div className="w-2 h-2 bg-[#fde047] rounded-full" />
            <div className="w-3 h-3 bg-[#ca8a04] rounded-full" />
            <div className="w-2 h-2 bg-[#facc15] rounded-full" />
          </div>
        </div>
      )}

      {theme === 'hojicha' && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Roasted Tea leaves & Genmai grains */}
          <div className="absolute -left-2.5 top-3 w-8 h-14 flex flex-col gap-1 items-center opacity-85">
            <div className="w-4 h-1.5 bg-[#78350f] rounded-full rotate-12" />
            <div className="w-3.5 h-1.5 bg-[#92400e] rounded-full -rotate-25" />
            <div className="w-4 h-1 bg-[#451a03] rounded-full rotate-45" />
            <div className="w-2.5 h-2 bg-[#fde68a] rounded-xs rotate-12 shadow-2xs" />
          </div>
          <div className="absolute -right-2 top-4 w-7 h-12 flex flex-col gap-1 items-center opacity-85">
            <div className="w-3.5 h-1.5 bg-[#78350f] rounded-full -rotate-12" />
            <div className="w-4 h-1.5 bg-[#92400e] rounded-full rotate-25" />
            <div className="w-2.5 h-2 bg-[#fde68a] rounded-xs -rotate-12 shadow-2xs" />
          </div>
        </div>
      )}

      {theme === 'watermelon' && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="absolute -left-2 top-4 w-7 h-7 bg-red-500 rounded-full flex items-center justify-center opacity-90">
            <div className="w-6 h-6 bg-red-400 rounded-full flex items-center justify-center">
              <span className="text-xs">🍉</span>
            </div>
          </div>
        </div>
      )}

      {theme === 'lemon' && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="absolute -left-2 top-4 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center shadow-xs">
            <span className="text-xs">🍋</span>
          </div>
        </div>
      )}

      {theme === 'cake' && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="absolute -left-2 top-4 w-6 h-6 flex items-center justify-center">
            <span className="text-sm">🍰</span>
          </div>
        </div>
      )}

      {theme === 'deal' && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="absolute -left-2 top-4 w-6 h-6 flex items-center justify-center">
            <span className="text-sm">🎁</span>
          </div>
        </div>
      )}

      {/* 2. ICONIC CHAGEE BLUE PORCELAIN CUP (Vector SVG) */}
      <div className="relative z-10 w-11 h-17 flex flex-col items-center drop-shadow-md">
        {/* Lid Top */}
        <div className="w-9 h-1.5 bg-[#171717] rounded-t-xs flex items-center justify-center relative">
          <div className="w-2 h-0.5 bg-[#383838] rounded-full" />
          {/* Straw sip hole */}
          <div className="absolute right-1.5 top-0.5 w-1 h-0.5 bg-black rounded-xs" />
        </div>

        {/* Cup Body with Chagee Royal Navy & White Chinoiserie Pattern */}
        <div
          className="w-8 h-15 bg-[#0e274d] relative overflow-hidden flex flex-col items-center justify-between"
          style={{
            clipPath: 'polygon(5% 0%, 95% 0%, 82% 100%, 18% 100%)',
          }}
        >
          {/* Subtle Porcelain Texture Grid */}
          <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:4px_4px]" />

          {/* Top Decorative Band */}
          <div className="w-full h-1.5 bg-[#1e3a6a] border-b border-white/20 mt-1" />

          {/* Central Chagee Ribbon Badge */}
          <div className="w-full bg-white/95 py-0.5 px-0.5 flex flex-col items-center justify-center shadow-2xs z-10 border-y border-neutral-300">
            <span className="text-[4.5px] font-serif font-black tracking-widest text-[#0e274d] uppercase leading-tight">
              CHAGEE
            </span>
          </div>

          {/* Bottom Royal Pattern Accent */}
          <div className="w-full h-2 bg-[#091b36] mb-0.5 border-t border-white/10 flex items-center justify-center">
            <div className="w-3 h-0.5 bg-amber-300/40 rounded-full" />
          </div>
        </div>
      </div>

      {/* 3. OFFICIAL NUTRI-GRADE SINGAPORE BADGE (On lower right corner of the cup) */}
      {nutriGrade && (
        <div
          className="absolute right-0 bottom-0.5 z-20 flex items-center bg-white rounded-full p-0.5 shadow-xs border border-neutral-300"
          title={`Nutri-Grade ${nutriGrade.grade} (${nutriGrade.sugarPct} sugar)`}
        >
          {/* Green Nutri-Grade Grade Circle */}
          <div
            className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[7.5px] font-black text-white ${
              nutriGrade.grade === 'A'
                ? 'bg-[#15803d]'
                : nutriGrade.grade === 'B'
                ? 'bg-[#22c55e]'
                : nutriGrade.grade === 'C'
                ? 'bg-[#eab308]'
                : 'bg-[#ef4444]'
            }`}
          >
            {nutriGrade.grade}
          </div>
          {/* Sugar Percentage Pill */}
          <span className="text-[6.5px] font-bold text-neutral-700 px-0.5 leading-none">
            {nutriGrade.sugarPct}
          </span>
        </div>
      )}
    </div>
  );
};
