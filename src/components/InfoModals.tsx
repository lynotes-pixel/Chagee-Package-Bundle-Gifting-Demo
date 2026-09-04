import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  MapPin,
  Calculator,
  Users,
  Sparkles,
  Navigation,
  Award,
  Copy,
  Check,
} from 'lucide-react';
import { STORES_LIST, MENU_ITEMS } from '../data/menuData';

interface InfoModalProps {
  type: 'story' | 'calc' | 'stores' | 'refer' | null;
  onClose: () => void;
  onSelectDrink?: (drinkId: string) => void;
}

export const InfoModals: React.FC<InfoModalProps> = ({ type, onClose }) => {
  const [calcDrinkId, setCalcDrinkId] = useState(MENU_ITEMS[0].id);
  const [calcSugar, setCalcSugar] = useState(50); // 50%
  const [calcIce, setCalcIce] = useState('less');
  const [copiedCode, setCopiedCode] = useState(false);
  const [shareToast, setShareToast] = useState<string | null>(null);

  if (!type) return null;

  const currentDrink = MENU_ITEMS.find((m) => m.id === calcDrinkId) || MENU_ITEMS[0];
  const baseCalories = currentDrink.calories || 180;
  const calculatedCalories = Math.round(baseCalories * (0.6 + (calcSugar / 100) * 0.4));

  const referralCode = 'JOIN-ALEX3053';
  const shareMessage = `Join CHAGEE with my referral code ${referralCode} to get 50% OFF your first drink! https://chagee.com.sg/join/${referralCode}`;

  const handleCopyCode = () => {
    try {
      navigator.clipboard.writeText(referralCode);
    } catch {
      // Fallback
    }
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleShareClick = (platformName: string) => {
    setShareToast(`Opening ${platformName}...`);
    setTimeout(() => setShareToast(null), 2500);
  };

  const shareChannels = [
    {
      name: 'Whatsapp',
      id: 'whatsapp',
      renderIcon: () => (
        <svg viewBox="0 0 32 32" className="w-8 h-8 sm:w-9 sm:h-9 drop-shadow-2xs" fill="none">
          <path
            fill="#25D366"
            d="M16 2.5C8.54 2.5 2.5 8.54 2.5 16c0 2.45.65 4.75 1.79 6.74L2.8 29.2l6.63-1.74A13.43 13.43 0 0016 29.5c7.46 0 13.5-6.04 13.5-13.5S23.46 2.5 16 2.5z"
          />
          <path
            fill="#FFFFFF"
            d="M23.3 19.3c-.4-.2-2.3-1.1-2.7-1.3-.4-.1-.6-.2-.9.2-.3.4-1 1.3-1.2 1.5-.2.3-.5.3-.9.1-.4-.2-1.7-.6-3.2-1.9-1.2-1.1-2-2.4-2.2-2.8-.2-.4 0-.6.2-.8.2-.2.4-.5.6-.7.2-.2.3-.4.4-.7.1-.3.1-.5 0-.7-.1-.2-.9-2.2-1.2-3-.3-.8-.7-.7-.9-.7h-.8c-.3 0-.7.1-1.1.5-.4.4-1.4 1.4-1.4 3.4 0 2 1.5 3.9 1.7 4.2.2.3 2.9 4.4 7 6.2 1 .4 1.7.7 2.3.9 1 .3 1.9.3 2.6.2.8-.1 2.4-1 2.8-2 .3-.9.3-1.8.2-2-.1-.1-.4-.2-.8-.4z"
          />
        </svg>
      ),
      bg: 'bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E]',
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`,
    },
    {
      name: 'SMS',
      id: 'sms',
      renderIcon: () => (
        <svg viewBox="0 0 32 32" className="w-8 h-8 sm:w-9 sm:h-9 drop-shadow-2xs" fill="none">
          <rect width="32" height="32" rx="8" fill="#007AFF" />
          <path
            fill="#FFFFFF"
            d="M16 7.5C10.8 7.5 6.5 11.1 6.5 15.5c0 2.5 1.4 4.8 3.6 6.2l-1 3.5c-.1.4.3.7.6.5l4-2.2c.7.2 1.5.3 2.3.3 5.2 0 9.5-3.6 9.5-8s-4.3-8.3-9.5-8.3z"
          />
          <circle cx="11.8" cy="15.5" r="1.3" fill="#007AFF" />
          <circle cx="16" cy="15.5" r="1.3" fill="#007AFF" />
          <circle cx="20.2" cy="15.5" r="1.3" fill="#007AFF" />
        </svg>
      ),
      bg: 'bg-blue-50/90 hover:bg-blue-100 text-blue-700',
      url: `sms:?&body=${encodeURIComponent(shareMessage)}`,
    },
    {
      name: 'Telegram',
      id: 'telegram',
      renderIcon: () => (
        <svg viewBox="0 0 32 32" className="w-8 h-8 sm:w-9 sm:h-9 drop-shadow-2xs" fill="none">
          <circle cx="16" cy="16" r="16" fill="#24A1DE" />
          <path
            fill="#FFFFFF"
            d="m7.8 15.6 15.6-6.4c.7-.3 1.3.2 1.1.9l-2.6 12.4c-.2.9-.7 1.1-1.5.7l-4.1-3-2 1.9c-.2.2-.4.4-.8.4l.3-4.2 7.7-7c.3-.3-.1-.5-.5-.2L11.3 17.5l-4.1-1.3c-.9-.3-.9-.9.6-.6z"
          />
        </svg>
      ),
      bg: 'bg-sky-50/90 hover:bg-sky-100 text-sky-700',
      url: `https://t.me/share/url?url=${encodeURIComponent(`https://chagee.com.sg/join/${referralCode}`)}&text=${encodeURIComponent(`Join CHAGEE with my referral code ${referralCode} to get 50% OFF your first drink!`)}`,
    },
    {
      name: 'KaKao',
      id: 'kakao',
      renderIcon: () => (
        <svg viewBox="0 0 32 32" className="w-8 h-8 sm:w-9 sm:h-9 drop-shadow-2xs" fill="none">
          <rect width="32" height="32" rx="8" fill="#FEE500" />
          <path
            fill="#3C1E1E"
            d="M16 8c-5.2 0-9.5 3.3-9.5 7.4 0 2.6 1.8 4.9 4.5 6.2l-1.1 4.1c-.1.4.3.7.6.5l4.8-3.2c.2 0 .5.1.7.1 5.2 0 9.5-3.3 9.5-7.4C25.5 11.3 21.2 8 16 8z"
          />
          <text
            x="16"
            y="15.8"
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="5.2"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
            fill="#FEE500"
            letterSpacing="-0.3"
          >
            TALK
          </text>
        </svg>
      ),
      bg: 'bg-[#FEE500]/20 hover:bg-[#FEE500]/35 text-amber-950',
      url: `https://sharer.kakao.com/talk/friends/picker/link?app_key=&url=${encodeURIComponent(`https://chagee.com.sg/join/${referralCode}`)}&text=${encodeURIComponent(shareMessage)}`,
    },
    {
      name: 'Line',
      id: 'line',
      renderIcon: () => (
        <svg viewBox="0 0 32 32" className="w-8 h-8 sm:w-9 sm:h-9 drop-shadow-2xs" fill="none">
          <rect width="32" height="32" rx="8" fill="#06C755" />
          <path
            fill="#FFFFFF"
            d="M16 8c-5.2 0-9.5 3.3-9.5 7.4 0 2.6 1.8 4.9 4.5 6.2l-1.1 4.1c-.1.4.3.7.6.5l4.8-3.2c.2 0 .5.1.7.1 5.2 0 9.5-3.3 9.5-7.4C25.5 11.3 21.2 8 16 8z"
          />
          <text
            x="16"
            y="15.8"
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="5"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
            fill="#06C755"
            letterSpacing="-0.2"
          >
            LINE
          </text>
        </svg>
      ),
      bg: 'bg-emerald-50/90 hover:bg-emerald-100 text-emerald-800',
      url: `https://line.me/R/msg/text/?${encodeURIComponent(shareMessage)}`,
    },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        />

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl z-10 overflow-hidden max-h-[85vh] flex flex-col"
        >
          {/* Header */}
          <div className="p-4 bg-neutral-50 border-b border-neutral-100 flex items-center justify-between relative">
            <h3
              className={`font-black text-neutral-900 ${
                type === 'refer'
                  ? 'w-full text-center text-xl sm:text-2xl pr-8 pl-8 tracking-tight'
                  : 'text-base font-extrabold'
              }`}
            >
              {type === 'story' && 'CHAGEE Heritage & Tea Story'}
              {type === 'calc' && 'Tea Calorie Calculator'}
              {type === 'stores' && 'Singapore Store Locations'}
              {type === 'refer' && 'Invite Friends'}
            </h3>
            <button
              id="close-info-modal-btn"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-neutral-200/60 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 transition-colors absolute right-4 top-4"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-5 overflow-y-auto flex-1 space-y-4 text-xs text-neutral-700">
            {/* 1. CHAGEE STORY */}
            {type === 'story' && (
              <div className="space-y-3">
                <div className="aspect-video w-full rounded-2xl overflow-hidden relative">
                  <img
                    src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80"
                    alt="Tea Plantation"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3 text-white font-serif">
                    <p className="text-sm font-bold">霸王茶姬 · 东方新茶饮</p>
                  </div>
                </div>
                <p className="leading-relaxed">
                  Founded in Yunnan, the birthplace of world tea culture, CHAGEE represents the revival of traditional oriental tea through modern whole-leaf brewing and pure fresh milk.
                </p>
                <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-900 font-medium">
                  🌟 100% Genuine Whole Leaf Tea · No Artificial Creamer · Fresh Farm Milk Daily.
                </div>
              </div>
            )}

            {/* 2. CALORIE CALCULATOR */}
            {type === 'calc' && (
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-4 rounded-2xl border border-emerald-200 text-center">
                  <span className="text-[10px] font-black tracking-wider uppercase text-emerald-800">
                    Estimated Calorie Count
                  </span>
                  <div className="text-3xl font-black text-emerald-700 my-1">
                    {calculatedCalories} <span className="text-sm font-bold text-emerald-600">kcal</span>
                  </div>
                  <p className="text-[11px] text-emerald-600 font-medium">
                    {calculatedCalories < 120 ? '✨ Guilt-Free & Light' : '🌿 Perfect balance of richness & aroma'}
                  </p>
                </div>

                <div>
                  <label className="font-bold text-neutral-800 block mb-1">Select Beverage:</label>
                  <select
                    value={calcDrinkId}
                    onChange={(e) => setCalcDrinkId(e.target.value)}
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-semibold"
                  >
                    {MENU_ITEMS.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name} (~{item.calories} kcal)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <div className="flex justify-between font-bold text-neutral-800 mb-1">
                    <span>Sugar Level:</span>
                    <span className="text-rose-600 font-extrabold">{calcSugar}% Sugar</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="25"
                    value={calcSugar}
                    onChange={(e) => setCalcSugar(Number(e.target.value))}
                    className="w-full accent-rose-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-neutral-400 font-medium mt-1">
                    <span>0% (Free)</span>
                    <span>25%</span>
                    <span>50%</span>
                    <span>75%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
            )}

            {/* 3. STORE LOCATIONS */}
            {type === 'stores' && (
              <div className="space-y-3">
                {STORES_LIST.map((store) => (
                  <div key={store.id} className="p-3 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-extrabold text-neutral-900 text-xs">{store.name}</h4>
                      <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                        {store.distance}
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-500">{store.address}</p>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] text-emerald-600 font-semibold">Open · {store.openUntil}</span>
                      <button className="text-[11px] font-bold text-neutral-800 flex items-center gap-1 hover:text-rose-600">
                        <Navigation className="w-3 h-3" />
                        <span>Directions</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 4. INVITE FRIENDS */}
            {type === 'refer' && (
              <div className="space-y-4 text-center py-1">
                {/* 3D Gift Box (Previous size, no outline) */}
                <div className="relative mx-auto my-1 flex items-center justify-center">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-b from-rose-50 via-[#FFF0F3] to-[#FFE8ED] flex items-center justify-center select-none hover:scale-105 transition-transform duration-200">
                    <svg
                      viewBox="0 0 160 160"
                      className="w-22 h-22 sm:w-24 sm:h-24 drop-shadow-sm"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        {/* 3D Yellow Body Gradient */}
                        <linearGradient id="gbBodyGrad" x1="0.2" y1="0" x2="0.8" y2="1">
                          <stop offset="0%" stopColor="#FED736" />
                          <stop offset="50%" stopColor="#FBBF14" />
                          <stop offset="100%" stopColor="#E5A609" />
                        </linearGradient>

                        {/* 3D Yellow Lid Gradient */}
                        <linearGradient id="gbLidGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#FFF066" />
                          <stop offset="40%" stopColor="#FDCB24" />
                          <stop offset="100%" stopColor="#EAA808" />
                        </linearGradient>

                        {/* 3D Red Ribbon Gradient */}
                        <linearGradient id="gbRibbonGrad" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#B31238" />
                          <stop offset="35%" stopColor="#E11D48" />
                          <stop offset="70%" stopColor="#F43F5E" />
                          <stop offset="100%" stopColor="#9F1239" />
                        </linearGradient>

                        {/* Bow Left Loop Gradient */}
                        <linearGradient id="gbBowLeft" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="#FB7185" />
                          <stop offset="45%" stopColor="#E11D48" />
                          <stop offset="100%" stopColor="#9F1239" />
                        </linearGradient>

                        {/* Bow Right Loop Gradient */}
                        <linearGradient id="gbBowRight" x1="1" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#FB7185" />
                          <stop offset="45%" stopColor="#E11D48" />
                          <stop offset="100%" stopColor="#9F1239" />
                        </linearGradient>

                        {/* Bow Center Knot */}
                        <linearGradient id="gbKnotGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#F43F5E" />
                          <stop offset="60%" stopColor="#E11D48" />
                          <stop offset="100%" stopColor="#881337" />
                        </linearGradient>

                        {/* Soft Lid Shadow */}
                        <filter id="gbLidShadow" x="-15%" y="-10%" width="130%" height="150%">
                          <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#78350F" floodOpacity="0.22" />
                        </filter>
                      </defs>

                      {/* Soft base shadow */}
                      <ellipse cx="80" cy="144" rx="42" ry="7" fill="#E11D48" fillOpacity="0.12" />

                      {/* Box Body */}
                      <g>
                        <rect x="42" y="76" width="76" height="58" rx="14" fill="url(#gbBodyGrad)" />
                        {/* Center Ribbon on Body */}
                        <clipPath id="bodyClip">
                          <rect x="42" y="76" width="76" height="58" rx="14" />
                        </clipPath>
                        <rect x="71" y="76" width="18" height="58" fill="url(#gbRibbonGrad)" clipPath="url(#bodyClip)" />
                        {/* Body subtle highlight */}
                        <rect x="46" y="80" width="8" height="48" rx="4" fill="#FFFFFF" fillOpacity="0.18" />
                      </g>

                      {/* Box Lid (with subtle shadow on body) */}
                      <g filter="url(#gbLidShadow)">
                        <rect x="36" y="54" width="88" height="24" rx="9" fill="url(#gbLidGrad)" />
                        {/* Center Ribbon on Lid */}
                        <clipPath id="lidClip">
                          <rect x="36" y="54" width="88" height="24" rx="9" />
                        </clipPath>
                        <rect x="71" y="54" width="18" height="24" fill="url(#gbRibbonGrad)" clipPath="url(#lidClip)" />
                        {/* Top sheen line */}
                        <path d="M42 58 Q80 55 118 58" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.45" />
                      </g>

                      {/* Bow Left Loop */}
                      <g transform="rotate(-15 62 48)">
                        <ellipse cx="62" cy="48" rx="16" ry="11" fill="url(#gbBowLeft)" />
                        <ellipse cx="62" cy="48" rx="7" ry="4.5" fill="#881337" opacity="0.35" />
                      </g>

                      {/* Bow Right Loop */}
                      <g transform="rotate(15 98 48)">
                        <ellipse cx="98" cy="48" rx="16" ry="11" fill="url(#gbBowRight)" />
                        <ellipse cx="98" cy="48" rx="7" ry="4.5" fill="#881337" opacity="0.35" />
                      </g>

                      {/* Bow Center Knot (plump vertical pill that bridges down into the ribbon) */}
                      <rect x="71.5" y="42" width="17" height="26" rx="8.5" fill="url(#gbKnotGrad)" />
                      <ellipse cx="78" cy="48" rx="3.5" ry="5.5" fill="#FFFFFF" opacity="0.3" />
                    </svg>
                  </div>
                </div>

                {/* Text under gift box: Centralized & Large */}
                <h4 className="text-2xl sm:text-3xl font-black text-neutral-900 text-center tracking-tight">
                  Get 50% OFF Drink
                </h4>

                {/* Fine print */}
                <p className="text-xs sm:text-sm text-neutral-600 font-medium text-center max-w-sm mx-auto leading-relaxed px-2">
                  Share your referral link and invite your friend to join as a CHAGEE member. Get rewarded when your friend makes their first order.
                </p>

                {/* Referral Code Box */}
                <div className="bg-neutral-50/90 border border-neutral-200 rounded-2xl p-3.5 space-y-1.5 text-center">
                  <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block">
                    Your Referral Code
                  </span>
                  <div className="flex items-center justify-between bg-white border border-neutral-200 rounded-xl px-4 py-2.5 shadow-2xs">
                    <span className="font-mono text-base sm:text-lg font-black tracking-widest text-neutral-900 select-all">
                      {referralCode}
                    </span>
                    <button
                      id="copy-referral-code-btn"
                      onClick={handleCopyCode}
                      className="flex items-center gap-1.5 text-xs font-black bg-rose-50 text-rose-700 hover:bg-rose-100 px-3 py-1.5 rounded-lg border border-rose-200/80 transition-all active:scale-95 cursor-pointer"
                    >
                      {copiedCode ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Sharing Links: Whatsapp, SMS, Telegram, KaKao, Line */}
                <div className="pt-1 space-y-2">
                  <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider text-center">
                    Share via
                  </div>

                  <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                    {shareChannels.map((channel) => (
                      <a
                        key={channel.id}
                        id={`share-${channel.id}-link`}
                        href={channel.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleShareClick(channel.name)}
                        className={`flex flex-col items-center justify-center py-2 px-1 sm:px-2 rounded-2xl transition-all active:scale-95 group ${channel.bg}`}
                      >
                        <div className="mb-1.5 flex items-center justify-center group-hover:scale-108 transition-transform">
                          {channel.renderIcon()}
                        </div>
                        <span className="text-[11px] sm:text-xs font-black leading-none text-neutral-900 whitespace-nowrap">
                          {channel.name}
                        </span>
                      </a>
                    ))}
                  </div>

                  {shareToast && (
                    <div className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 py-1 px-3 rounded-full inline-block animate-fade-in">
                      {shareToast}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
