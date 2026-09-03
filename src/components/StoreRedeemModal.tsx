import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Store,
  MapPin,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  CupSoda,
  Flame,
  Check,
  Clock,
  Coffee,
} from 'lucide-react';
import { GiftTransaction, MenuItem } from '../types';
import { STORES_LIST, MENU_ITEMS } from '../data/menuData';

interface StoreRedeemModalProps {
  isOpen: boolean;
  onClose: () => void;
  gift: GiftTransaction | null;
  onConfirmRedeem: (
    giftId: string,
    quantity: number,
    storeName: string,
    drinkName?: string,
    sweetness?: string,
    iceLevel?: string,
    orderNumber?: string
  ) => void;
}

// Sweetness levels
const SWEETNESS_OPTIONS = [
  { id: '0', label: '0% No Sugar', chinese: '无糖', desc: 'Pure tea fragrance, 0 sugar added' },
  { id: '30', label: '30% Slight Sugar', chinese: '微糖', desc: 'Tea Master Recommended · Gentle floral finish', isRecommended: true },
  { id: '50', label: '50% Half Sugar', chinese: '半糖', desc: 'Silky, balanced honey & whole milk flavor' },
  { id: '70', label: '70% Less Sugar', chinese: '少糖', desc: 'Sweet, smooth and fragrant' },
  { id: '100', label: '100% Regular', chinese: '标准糖', desc: 'Classic traditional sweetness' },
];

// Ice levels
const ICE_OPTIONS = [
  { id: 'normal', label: 'Normal Ice', chinese: '标准冰', desc: 'Classic refreshingly crisp chill' },
  { id: 'less', label: 'Less Ice', chinese: '少冰', desc: 'Recommended · Retains richest cold brew flavor', isRecommended: true },
  { id: 'no-ice', label: 'No Ice', chinese: '去冰', desc: 'Chilled liquid tea without ice cubes' },
  { id: 'warm', label: 'Warm / Hot', chinese: '温热', desc: 'Velvety soothing heat' },
];

export const StoreRedeemModal: React.FC<StoreRedeemModalProps> = ({
  isOpen,
  onClose,
  gift,
  onConfirmRedeem,
}) => {
  // 5-step flow state:
  // 1: Store Location, 2: Select Drink, 3: Sweetness Level, 4: Ice Level, 5: Proceed to Redeem
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedStoreId, setSelectedStoreId] = useState<string>(STORES_LIST[0].id);
  const [selectedDrinkId, setSelectedDrinkId] = useState<string>('item-1');
  const [selectedSweetnessId, setSelectedSweetnessId] = useState<string>('30');
  const [selectedIceId, setSelectedIceId] = useState<string>('less');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [redeemSuccess, setRedeemSuccess] = useState<boolean>(false);
  const [generatedOrderNumber, setGeneratedOrderNumber] = useState<string>('A-188');

  // Filter handcrafted tea drinks from menu
  const availableDrinks = MENU_ITEMS.filter(
    (item) => item.category !== 'merch' && item.category !== 'bundle'
  );

  // Initialize or reset selections when modal opens
  useEffect(() => {
    if (isOpen && gift) {
      setCurrentStep(1);
      setRedeemSuccess(false);
      setIsSubmitting(false);

      // If gift corresponds to a specific drink in the menu, pre-select it
      const matchedDrink = availableDrinks.find(
        (d) => d.name.toLowerCase() === gift.itemTitle.toLowerCase()
      );
      if (matchedDrink) {
        setSelectedDrinkId(matchedDrink.id);
      } else {
        setSelectedDrinkId(availableDrinks[0]?.id || 'item-1');
      }
      setSelectedSweetnessId('30');
      setSelectedIceId('less');
    }
  }, [isOpen, gift]);

  if (!isOpen || !gift) return null;

  const selectedStore =
    STORES_LIST.find((s) => s.id === selectedStoreId) || STORES_LIST[0];
  const selectedDrink =
    availableDrinks.find((d) => d.id === selectedDrinkId) || availableDrinks[0];
  const selectedSweetness =
    SWEETNESS_OPTIONS.find((s) => s.id === selectedSweetnessId) || SWEETNESS_OPTIONS[1];
  const selectedIce =
    ICE_OPTIONS.find((i) => i.id === selectedIceId) || ICE_OPTIONS[1];

  const handleProceedToRedeem = () => {
    setIsSubmitting(true);
    const orderNum = `A-${Math.floor(100 + Math.random() * 900)}`;
    setGeneratedOrderNumber(orderNum);

    setTimeout(() => {
      setIsSubmitting(false);
      setRedeemSuccess(true);
      onConfirmRedeem(
        gift.id,
        1,
        selectedStore.name,
        selectedDrink.name,
        selectedSweetness.label,
        selectedIce.label,
        orderNum
      );
    }, 800);
  };

  const stepsList = [
    { num: 1, label: 'Store' },
    { num: 2, label: 'Drink' },
    { num: 3, label: 'Sweetness' },
    { num: 4, label: 'Ice' },
    { num: 5, label: 'Redeem' },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-xs"
        />

        {/* Modal Sheet */}
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 26, stiffness: 320 }}
          className="relative w-full max-w-lg bg-neutral-900 text-white rounded-t-3xl sm:rounded-3xl shadow-2xl z-10 max-h-[92vh] flex flex-col overflow-hidden border border-neutral-800"
        >
          {/* Header */}
          <div className="p-4 bg-neutral-950 border-b border-neutral-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-amber-400 text-neutral-950 flex items-center justify-center font-bold text-sm">
                  🫖
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-white">
                    Redeem In-Store
                  </h3>
                  <p className="text-[11px] text-neutral-400">
                    {gift.itemTitle} · {gift.remainingVouchers} voucher{gift.remainingVouchers > 1 ? 's' : ''} left
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Stepper Progress Bar (1 to 5) */}
            {!redeemSuccess && (
              <div className="mt-3.5 pt-2 border-t border-neutral-850">
                <div className="grid grid-cols-5 gap-1.5">
                  {stepsList.map((step) => {
                    const isPassed = currentStep > step.num;
                    const isCurrent = currentStep === step.num;
                    return (
                      <button
                        key={step.num}
                        onClick={() => setCurrentStep(step.num)}
                        className={`flex flex-col items-center gap-1 py-1 rounded-lg text-center transition-all ${
                          isCurrent
                            ? 'bg-amber-400/20 text-amber-300 font-black'
                            : isPassed
                            ? 'text-emerald-400 hover:bg-neutral-800/80 font-bold'
                            : 'text-neutral-500 hover:bg-neutral-800/40 font-medium'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                            isCurrent
                              ? 'bg-amber-400 text-neutral-950 ring-2 ring-amber-400/30'
                              : isPassed
                              ? 'bg-emerald-500 text-white'
                              : 'bg-neutral-800 text-neutral-400'
                          }`}
                        >
                          {isPassed ? <Check className="w-3 h-3" /> : step.num}
                        </div>
                        <span className="text-[10px] truncate max-w-full">
                          {step.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {!redeemSuccess ? (
              <>
                {/* STEP 1: SELECT STORE LOCATION */}
                {currentStep === 1 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-amber-400">
                        <MapPin className="w-4 h-4" />
                        <span>(1) Select Store Location</span>
                      </div>
                      <span className="text-[11px] text-neutral-400 font-bold">
                        Step 1 of 5
                      </span>
                    </div>

                    <p className="text-xs text-neutral-300">
                      Choose the CHAGEE outlet where you will collect your freshly prepared drink:
                    </p>

                    <div className="space-y-2.5">
                      {STORES_LIST.map((store) => {
                        const isSelected = selectedStoreId === store.id;
                        return (
                          <div
                            key={store.id}
                            onClick={() => setSelectedStoreId(store.id)}
                            className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 relative ${
                              isSelected
                                ? 'bg-amber-400/10 border-amber-400 ring-1 ring-amber-400 shadow-sm'
                                : 'bg-neutral-800/80 border-neutral-700 hover:border-neutral-600'
                            }`}
                          >
                            <div
                              className={`w-5 h-5 rounded-full mt-0.5 shrink-0 flex items-center justify-center border ${
                                isSelected
                                  ? 'border-amber-400 bg-amber-400 text-neutral-950'
                                  : 'border-neutral-600 bg-neutral-900'
                              }`}
                            >
                              {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2">
                                <h4 className="text-xs font-black text-white truncate">
                                  {store.name}
                                </h4>
                                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-neutral-700 text-amber-300 shrink-0">
                                  {store.distance}
                                </span>
                              </div>
                              <p className="text-[11px] text-neutral-300 mt-0.5 leading-snug">
                                {store.address}
                              </p>
                              <div className="flex items-center gap-1.5 mt-2 text-[10px] text-neutral-400 font-medium">
                                <Clock className="w-3 h-3 text-emerald-400" />
                                <span>Open daily until {store.openUntil}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 2: SELECT DRINK */}
                {currentStep === 2 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-amber-400">
                        <CupSoda className="w-4 h-4" />
                        <span>(2) Select Drink</span>
                      </div>
                      <span className="text-[11px] text-neutral-400 font-bold">
                        Step 2 of 5
                      </span>
                    </div>

                    <p className="text-xs text-neutral-300">
                      Choose which signature handcrafted tea to redeem with your voucher:
                    </p>

                    <div className="grid grid-cols-1 gap-2.5">
                      {availableDrinks.map((drink) => {
                        const isSelected = selectedDrinkId === drink.id;
                        return (
                          <div
                            key={drink.id}
                            onClick={() => setSelectedDrinkId(drink.id)}
                            className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 relative ${
                              isSelected
                                ? 'bg-amber-400/10 border-amber-400 ring-1 ring-amber-400 shadow-sm'
                                : 'bg-neutral-800/80 border-neutral-700 hover:border-neutral-600'
                            }`}
                          >
                            <div className="w-14 h-14 rounded-xl overflow-hidden bg-neutral-900 shrink-0 border border-neutral-700">
                              <img
                                src={drink.image || '/images/chagee_tea_cup.jpg'}
                                alt={drink.name}
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                                onError={(e) => {
                                  (e.currentTarget as HTMLImageElement).src =
                                    '/images/chagee_tea_cup.jpg';
                                }}
                              />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5">
                                <h4 className="text-xs font-black text-white truncate">
                                  {drink.name}
                                </h4>
                                {drink.tags && drink.tags[0] && (
                                  <span className="text-[9px] font-black px-1.5 py-0.2 rounded-sm bg-rose-500/20 text-rose-300 border border-rose-500/30 truncate">
                                    {drink.tags[0]}
                                  </span>
                                )}
                              </div>
                              {drink.chineseName && (
                                <p className="text-[11px] text-amber-300/80 font-medium">
                                  {drink.chineseName}
                                </p>
                              )}
                              <p className="text-[10px] text-neutral-400 line-clamp-1 mt-0.5">
                                {drink.description}
                              </p>
                            </div>

                            <div
                              className={`w-5 h-5 rounded-full shrink-0 flex items-center justify-center border ${
                                isSelected
                                  ? 'border-amber-400 bg-amber-400 text-neutral-950'
                                  : 'border-neutral-600 bg-neutral-900'
                              }`}
                            >
                              {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 3: SELECT SWEETNESS LEVEL */}
                {currentStep === 3 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-amber-400">
                        <Sparkles className="w-4 h-4" />
                        <span>(3) Select Sweetness Level</span>
                      </div>
                      <span className="text-[11px] text-neutral-400 font-bold">
                        Step 3 of 5
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-neutral-800/50 border border-neutral-700/60 flex items-center gap-2">
                      <Coffee className="w-4 h-4 text-amber-400 shrink-0" />
                      <span className="text-xs text-neutral-300 font-bold">
                        For: {selectedDrink.name}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {SWEETNESS_OPTIONS.map((opt) => {
                        const isSelected = selectedSweetnessId === opt.id;
                        return (
                          <div
                            key={opt.id}
                            onClick={() => setSelectedSweetnessId(opt.id)}
                            className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                              isSelected
                                ? 'bg-amber-400/10 border-amber-400 ring-1 ring-amber-400 shadow-sm'
                                : 'bg-neutral-800/80 border-neutral-700 hover:border-neutral-600'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-5 h-5 rounded-full shrink-0 flex items-center justify-center border ${
                                  isSelected
                                    ? 'border-amber-400 bg-amber-400 text-neutral-950'
                                    : 'border-neutral-600 bg-neutral-900'
                                }`}
                              >
                                {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                              </div>

                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-black text-white">
                                    {opt.label}
                                  </span>
                                  <span className="text-[10px] text-neutral-400 font-medium">
                                    ({opt.chinese})
                                  </span>
                                  {opt.isRecommended && (
                                    <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-amber-400 text-neutral-950">
                                      POPULAR
                                    </span>
                                  )}
                                </div>
                                <p className="text-[10px] text-neutral-300 mt-0.5">
                                  {opt.desc}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 4: SELECT ICE LEVEL */}
                {currentStep === 4 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-amber-400">
                        <Flame className="w-4 h-4" />
                        <span>(4) Select Ice Level</span>
                      </div>
                      <span className="text-[11px] text-neutral-400 font-bold">
                        Step 4 of 5
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-neutral-800/50 border border-neutral-700/60 flex items-center gap-2">
                      <Coffee className="w-4 h-4 text-amber-400 shrink-0" />
                      <span className="text-xs text-neutral-300 font-bold">
                        For: {selectedDrink.name} · {selectedSweetness.label}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {ICE_OPTIONS.map((opt) => {
                        const isSelected = selectedIceId === opt.id;
                        return (
                          <div
                            key={opt.id}
                            onClick={() => setSelectedIceId(opt.id)}
                            className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                              isSelected
                                ? 'bg-amber-400/10 border-amber-400 ring-1 ring-amber-400 shadow-sm'
                                : 'bg-neutral-800/80 border-neutral-700 hover:border-neutral-600'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-5 h-5 rounded-full shrink-0 flex items-center justify-center border ${
                                  isSelected
                                    ? 'border-amber-400 bg-amber-400 text-neutral-950'
                                    : 'border-neutral-600 bg-neutral-900'
                                }`}
                              >
                                {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                              </div>

                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-black text-white">
                                    {opt.label}
                                  </span>
                                  <span className="text-[10px] text-neutral-400 font-medium">
                                    ({opt.chinese})
                                  </span>
                                  {opt.isRecommended && (
                                    <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-blue-500 text-white">
                                      RECOMMENDED
                                    </span>
                                  )}
                                </div>
                                <p className="text-[10px] text-neutral-300 mt-0.5">
                                  {opt.desc}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 5: PROCEED TO REDEEM (CONFIRMATION & SUMMARY) */}
                {currentStep === 5 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-amber-400">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>(5) Review & Proceed to Redeem</span>
                      </div>
                      <span className="text-[11px] text-neutral-400 font-bold">
                        Final Step
                      </span>
                    </div>

                    {/* Full Drink & Store Review Card */}
                    <div className="bg-neutral-800/90 rounded-2xl p-4 border border-neutral-700 space-y-3.5">
                      {/* Store Header */}
                      <div className="flex items-start justify-between pb-3 border-b border-neutral-700/80">
                        <div className="flex items-center gap-2">
                          <Store className="w-4 h-4 text-amber-400 shrink-0" />
                          <div>
                            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                              Redeeming At
                            </span>
                            <h4 className="text-xs font-black text-white">
                              {selectedStore.name}
                            </h4>
                            <p className="text-[10px] text-neutral-400">
                              {selectedStore.address}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => setCurrentStep(1)}
                          className="text-[10px] font-bold text-amber-400 hover:underline shrink-0"
                        >
                          Change
                        </button>
                      </div>

                      {/* Drink Specifications */}
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-xl overflow-hidden bg-neutral-900 shrink-0 border border-neutral-700">
                          <img
                            src={selectedDrink.image || '/images/chagee_tea_cup.jpg'}
                            alt={selectedDrink.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src =
                                '/images/chagee_tea_cup.jpg';
                            }}
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-black text-white truncate">
                            {selectedDrink.name}
                          </h4>
                          <p className="text-[11px] text-amber-300/90 font-bold mt-0.5">
                            {selectedSweetness.label} · {selectedIce.label}
                          </p>
                          <p className="text-[10px] text-neutral-400 mt-0.5">
                            Size: Regular Cup (500ml)
                          </p>
                        </div>

                        <button
                          onClick={() => setCurrentStep(2)}
                          className="text-[10px] font-bold text-amber-400 hover:underline shrink-0"
                        >
                          Change
                        </button>
                      </div>

                      {/* Customization Chips */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        <span className="px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-700 text-[11px] font-bold text-neutral-200">
                          🍬 {selectedSweetness.label} ({selectedSweetness.chinese})
                        </span>
                        <span className="px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-700 text-[11px] font-bold text-neutral-200">
                          🧊 {selectedIce.label} ({selectedIce.chinese})
                        </span>
                        <span className="px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-700 text-[11px] font-bold text-neutral-200">
                          ☕ Freshly Brewed
                        </span>
                      </div>

                      {/* Payment / Voucher Deduction Info */}
                      <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-700 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-bold text-neutral-400 block">
                            VOUCHER APPLIED
                          </span>
                          <span className="text-xs font-extrabold text-emerald-400">
                            1 Voucher Deducted ($0.00 to pay)
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-neutral-400 block">
                            Vouchers Left After
                          </span>
                          <span className="text-xs font-black text-white">
                            {Math.max(0, gift.remainingVouchers - 1)} of {gift.totalVouchers}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* REDEMPTION SUCCESS / IN-STORE ORDER TICKET SCREEN */
              <div className="py-4 text-center space-y-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 15 }}
                  className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg text-2xl"
                >
                  <CheckCircle2 className="w-10 h-10" />
                </motion.div>

                <div>
                  <h4 className="text-xl font-black text-white">
                    Order Placed for In-Store Pickup!
                  </h4>
                  <p className="text-xs text-neutral-400 mt-1">
                    Your drink is being prepared at <span className="font-bold text-amber-300">{selectedStore.name}</span>
                  </p>
                </div>

                {/* Counter Pickup Ticket */}
                <div className="bg-white text-neutral-900 p-5 rounded-3xl shadow-xl text-center space-y-3">
                  <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500 block">
                    IN-STORE COLLECTION NUMBER
                  </span>
                  <div className="text-4xl font-black tracking-tight text-neutral-950 py-1">
                    #{generatedOrderNumber}
                  </div>
                  <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Est. Ready in 3-5 mins</span>
                  </div>

                  <div className="border-t border-dashed border-neutral-300 pt-3 text-left space-y-1">
                    <div className="flex justify-between text-xs font-bold text-neutral-900">
                      <span>{selectedDrink.name}</span>
                      <span>1 Cup</span>
                    </div>
                    <p className="text-[11px] text-neutral-600">
                      {selectedSweetness.label} · {selectedIce.label}
                    </p>
                    <p className="text-[10px] text-neutral-400">
                      Location: {selectedStore.name} ({selectedStore.address})
                    </p>
                  </div>
                </div>

                <p className="text-xs text-neutral-400 leading-relaxed px-4">
                  Please approach the tea bar counter when your order number <span className="text-white font-bold">#{generatedOrderNumber}</span> is called!
                </p>

                <button
                  onClick={onClose}
                  className="w-full py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black text-xs shadow-md transition-all active:scale-95"
                >
                  Done & View Wallet
                </button>
              </div>
            )}
          </div>

          {/* Footer Navigation Bar for Steps 1-5 */}
          {!redeemSuccess && (
            <div className="p-4 bg-neutral-950 border-t border-neutral-800 flex items-center gap-3">
              {currentStep > 1 && (
                <button
                  onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
                  className="py-3 px-4 rounded-2xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs flex items-center gap-1 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              )}

              {currentStep < 5 ? (
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCurrentStep((prev) => Math.min(5, prev + 1))}
                  className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-400 text-neutral-950 font-black text-xs shadow-md flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>
                    {currentStep === 1 && 'Next: Select Drink'}
                    {currentStep === 2 && 'Next: Sweetness Level'}
                    {currentStep === 3 && 'Next: Ice Level'}
                    {currentStep === 4 && 'Next: Review Order'}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              ) : (
                /* STEP 5: PROCEED TO REDEEM ACTION */
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  onClick={handleProceedToRedeem}
                  className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-neutral-950 font-black text-xs shadow-lg flex items-center justify-center gap-2 hover:brightness-105 active:scale-95 transition-all"
                >
                  {isSubmitting ? (
                    <span>Placing Redemption Order...</span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Proceed to Redeem</span>
                    </>
                  )}
                </motion.button>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
