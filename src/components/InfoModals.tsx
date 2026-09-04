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
  MessageCircle,
  MessageSquare,
  Send,
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
  const [copied, setCopied] = useState(false);

  if (!type) return null;

  const currentDrink = MENU_ITEMS.find((m) => m.id === calcDrinkId) || MENU_ITEMS[0];
  const baseCalories = currentDrink.calories || 180;
  const calculatedCalories = Math.round(baseCalories * (0.6 + (calcSugar / 100) * 0.4));

  const referralCode = 'JOIN-ALEX3053';

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
          <div className="p-4 bg-neutral-50 border-b border-neutral-100 relative flex items-center justify-between min-h-[56px]">
            {type === 'refer' ? (
              <h3 className="w-full font-black text-neutral-900 text-lg md:text-xl text-center pr-8 pl-8">
                Refer Friends
              </h3>
            ) : (
              <h3 className="font-extrabold text-neutral-900 text-base pr-8">
                {type === 'story' && 'CHAGEE Heritage & Tea Story'}
                {type === 'calc' && 'Tea Calorie Calculator'}
                {type === 'stores' && 'Singapore Store Locations'}
              </h3>
            )}
            <button
              onClick={onClose}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-neutral-200/60 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 transition-colors cursor-pointer"
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

            {/* 4. REFER FRIENDS */}
            {type === 'refer' && (
              <div className="space-y-4 text-center pb-1">
                <div className="w-24 h-24 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto text-5xl shadow-sm border border-rose-200/50">
                  🎁
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-lg font-black text-neutral-900">
                    Invite Friends & Get 50% OFF Drink
                  </h4>
                  <p className="text-xs text-neutral-500 max-w-[320px] mx-auto leading-relaxed">
                    Share your referral link and invite your friend to join as a CHAGEE member. Get rewarded when your friend makes their first order.
                  </p>
                </div>

                {/* Referral Code Box */}
                <div
                  onClick={handleCopyCode}
                  className="p-3.5 bg-neutral-100/90 hover:bg-neutral-100 rounded-2xl border border-neutral-200 flex items-center justify-between px-4 cursor-pointer transition-colors group shadow-2xs"
                  title="Click to copy code"
                >
                  <span className="font-mono text-sm font-black text-neutral-900 tracking-wider select-all">
                    {referralCode}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-sans font-bold text-rose-600 group-hover:text-rose-700">
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Social Share Links (Whatsapp, SMS, Telegram) */}
                <div className="pt-1">
                  <p className="text-[11px] font-bold text-neutral-400 mb-2">Share via</p>
                  <div className="grid grid-cols-3 gap-2.5">
                    {/* Whatsapp */}
                    <a
                      href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                        'Join CHAGEE with my referral code JOIN-ALEX3053 to get 50% OFF your first drink! https://chagee.com.sg'
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center p-3 rounded-2xl bg-emerald-50/90 hover:bg-emerald-100 border border-emerald-200/80 transition-all group cursor-pointer"
                    >
                      <div className="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center mb-1.5 shadow-xs group-hover:scale-105 transition-transform">
                        <MessageCircle className="w-4.5 h-4.5 fill-current" />
                      </div>
                      <span className="text-xs font-bold text-neutral-800">Whatsapp</span>
                    </a>

                    {/* SMS */}
                    <a
                      href={`sms:?&body=${encodeURIComponent(
                        'Join CHAGEE with my referral code JOIN-ALEX3053 to get 50% OFF your first drink! https://chagee.com.sg'
                      )}`}
                      className="flex flex-col items-center justify-center p-3 rounded-2xl bg-amber-50/90 hover:bg-amber-100 border border-amber-200/80 transition-all group cursor-pointer"
                    >
                      <div className="w-9 h-9 rounded-full bg-amber-500 text-white flex items-center justify-center mb-1.5 shadow-xs group-hover:scale-105 transition-transform">
                        <MessageSquare className="w-4.5 h-4.5 fill-current" />
                      </div>
                      <span className="text-xs font-bold text-neutral-800">SMS</span>
                    </a>

                    {/* Telegram */}
                    <a
                      href={`https://t.me/share/url?url=${encodeURIComponent('https://chagee.com.sg')}&text=${encodeURIComponent(
                        'Join CHAGEE with my referral code JOIN-ALEX3053 to get 50% OFF your first drink!'
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center p-3 rounded-2xl bg-sky-50/90 hover:bg-sky-100 border border-sky-200/80 transition-all group cursor-pointer"
                    >
                      <div className="w-9 h-9 rounded-full bg-[#0088cc] text-white flex items-center justify-center mb-1.5 shadow-xs group-hover:scale-105 transition-transform">
                        <Send className="w-4 h-4 text-white -rotate-12 translate-x-0.5 -translate-y-0.5" />
                      </div>
                      <span className="text-xs font-bold text-neutral-800">Telegram</span>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
