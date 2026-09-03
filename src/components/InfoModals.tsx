import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, Calculator, Users, Sparkles, Navigation, Award } from 'lucide-react';
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

  if (!type) return null;

  const currentDrink = MENU_ITEMS.find((m) => m.id === calcDrinkId) || MENU_ITEMS[0];
  const baseCalories = currentDrink.calories || 180;
  const calculatedCalories = Math.round(baseCalories * (0.6 + (calcSugar / 100) * 0.4));

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
          <div className="p-4 bg-neutral-50 border-b border-neutral-100 flex items-center justify-between">
            <h3 className="font-extrabold text-neutral-900 text-base">
              {type === 'story' && 'CHAGEE Heritage & Tea Story'}
              {type === 'calc' && 'Tea Calorie Calculator'}
              {type === 'stores' && 'Singapore Store Locations'}
              {type === 'refer' && 'Refer Friends & Earn Free Tea'}
            </h3>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-neutral-200/60 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 transition-colors"
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
              <div className="space-y-3 text-center">
                <div className="w-14 h-14 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto text-2xl">
                  🎁
                </div>
                <h4 className="text-base font-black text-neutral-900">
                  Invite Friends & Get $5 Voucher
                </h4>
                <p className="text-xs text-neutral-500">
                  Share your referral link. When your friend makes their first order or receives an eGift bundle, you both get 500 Tea Leaves!
                </p>
                <div className="p-3 bg-neutral-100 rounded-xl font-mono text-xs font-bold text-neutral-800 select-all border border-neutral-200">
                  CHAGEE-FRIEND-ALEX2026
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
