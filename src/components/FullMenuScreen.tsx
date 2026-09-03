import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin,
  Store,
  ChevronRight,
  Plus,
  Minus,
  Check,
  Sparkles,
  ShoppingBag,
  Coffee,
  X,
  Gift,
  Search,
} from 'lucide-react';
import { MenuItem } from '../types';
import { MENU_ITEMS } from '../data/menuData';
import { ChageeCupVisual } from './ChageeCupVisual';

interface FullMenuScreenProps {
  onOpenBundle: () => void;
  onOpenEGift: () => void;
  onQuickGiftDrink: (drink: MenuItem) => void;
}

interface CartItem {
  item: MenuItem;
  size: 'Regular' | 'Large';
  sugar: string;
  ice: string;
  quantity: number;
}

export const FullMenuScreen: React.FC<FullMenuScreenProps> = ({
  onOpenBundle,
  onOpenEGift,
  onQuickGiftDrink,
}) => {
  const [orderType, setOrderType] = useState<'DELIVERY' | 'PICKUP'>('DELIVERY');
  const [activeCategory, setActiveCategory] = useState<string>('milk-tea');
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [selectedSize, setSelectedSize] = useState<'Regular' | 'Large'>('Regular');
  const [selectedSugar, setSelectedSugar] = useState<string>('50% (Standard)');
  const [selectedIce, setSelectedIce] = useState<string>('Less Ice');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showOrderSuccessToast, setShowOrderSuccessToast] = useState<string | null>(null);

  // Categories corresponding to the left sidebar in the reference screenshot
  const categories = [
    {
      id: 'deals',
      label: 'Special\nDeals',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none stroke-[1.8]">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
          <text x="12" y="16" fontSize="5" textAnchor="middle" fill="currentColor" fontWeight="bold">CC</text>
        </svg>
      ),
      hasBadge: false,
    },
    {
      id: 'milk-tea',
      label: 'Fresh Milk\nTea',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none stroke-[1.8]">
          <path d="M6 8h12l-1.5 13a2 2 0 0 1-2 1.8H9.5a2 2 0 0 1-2-1.8L6 8z" />
          <path d="M5 8h14" />
          <line x1="14" y1="2" x2="11" y2="8" />
          <circle cx="12" cy="14" r="2.5" />
          <text x="12" y="15" fontSize="3" textAnchor="middle" fill="currentColor" fontWeight="bold">C</text>
        </svg>
      ),
      hasBadge: true, // Red dot indicator as seen in screenshot
    },
    {
      id: 'brewed-tea',
      label: 'Brewed\nTea',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none stroke-[1.8]">
          <path d="M4 11h14a3 3 0 0 1 3 3v2a3 3 0 0 1-3 3H7a4 4 0 0 1-4-4v-3a1 1 0 0 1 1-1z" />
          <path d="M9 7c1-2 3-2 4-2s3 0 4 2" />
          <path d="M19 12h2a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-2" />
        </svg>
      ),
      hasBadge: false,
    },
    {
      id: 'fruit-tea',
      label: 'Fresh Fruit\nTea',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none stroke-[1.8]">
          <path d="M6 8h10l-1.2 12a2 2 0 0 1-2 1.8H8.5a2 2 0 0 1-2-1.8L6 8z" />
          <line x1="13" y1="3" x2="10.5" y2="8" />
          {/* Lemon slice icon */}
          <circle cx="17.5" cy="14.5" r="4.5" strokeWidth="1.5" />
          <line x1="17.5" y1="11" x2="17.5" y2="18" strokeWidth="1" />
          <line x1="14" y1="14.5" x2="21" y2="14.5" strokeWidth="1" />
        </svg>
      ),
      hasBadge: false,
    },
    {
      id: 'cake',
      label: 'Cake',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none stroke-[1.8]">
          <path d="M3 17h18v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2z" />
          <path d="M4 17V12a8 8 0 0 1 16 0v5" />
          <circle cx="12" cy="7" r="1.5" fill="currentColor" />
        </svg>
      ),
      hasBadge: false,
    },
    {
      id: 'merch',
      label: 'Merchandis\ne',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none stroke-[1.8]">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <polygon points="12 11 13.2 13.5 16 14 14 16 14.5 19 12 17.5 9.5 19 10 16 8 14 10.8 13.5 12 11" fill="none" strokeWidth="1.2" />
        </svg>
      ),
      hasBadge: false,
    },
  ];

  const currentCategoryTitle = {
    'deals': 'Special Deals',
    'milk-tea': 'Fresh Milk Tea',
    'brewed-tea': 'Brewed Tea',
    'fruit-tea': 'Fresh Fruit Tea',
    'cake': 'Cake & Desserts',
    'merch': 'Merchandise & Gifts',
  }[activeCategory] || 'Fresh Milk Tea';

  const categoryItems = MENU_ITEMS.filter((item) => item.category === activeCategory);

  const handleOpenCustomize = (item: MenuItem) => {
    setCustomizingItem(item);
    setSelectedSize('Regular');
    setSelectedSugar('50% (Standard)');
    setSelectedIce('Less Ice');
  };

  const handleAddToCart = () => {
    if (!customizingItem) return;
    const finalPrice = selectedSize === 'Large' ? customizingItem.price + 0.8 : customizingItem.price;

    setCart((prev) => {
      const existing = prev.find(
        (c) =>
          c.item.id === customizingItem.id &&
          c.size === selectedSize &&
          c.sugar === selectedSugar &&
          c.ice === selectedIce
      );
      if (existing) {
        return prev.map((c) =>
          c === existing ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [
        ...prev,
        {
          item: { ...customizingItem, price: finalPrice },
          size: selectedSize,
          sugar: selectedSugar,
          ice: selectedIce,
          quantity: 1,
        },
      ];
    });

    const itemName = customizingItem.name;
    setCustomizingItem(null);
    setShowOrderSuccessToast(`Added ${itemName} to cart`);
    setTimeout(() => setShowOrderSuccessToast(null), 2500);
  };

  const totalCartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalCartPrice = cart.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);

  return (
    <div className="bg-white min-h-full flex flex-col relative pb-20 select-none">
      {/* ================= 1. TOP HEADER & PICKUP/DELIVERY TOGGLE ================= */}
      <div className="relative bg-white pt-2 pb-2 px-4 border-b border-neutral-100 overflow-hidden shrink-0">
        {/* Subtle Traditional Peking Opera Mask Watermark in the background right */}
        <div className="absolute -right-2 -top-3 w-28 h-28 opacity-[0.07] pointer-events-none select-none">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-neutral-900 stroke-neutral-900">
            <circle cx="50" cy="50" r="40" fill="none" strokeWidth="2" />
            <path d="M30 40 Q50 25 70 40" fill="none" strokeWidth="2.5" />
            <path d="M35 55 Q50 70 65 55" fill="none" strokeWidth="2.5" />
            <circle cx="40" cy="45" r="4" />
            <circle cx="60" cy="45" r="4" />
            <path d="M50 35 L50 55" strokeWidth="2" />
            <path d="M25 30 Q50 15 75 30" fill="none" strokeWidth="3" />
          </svg>
        </div>

        {/* Pickup vs Delivery Navigation Tabs */}
        <div className="flex items-center gap-6 relative z-10">
          <button
            onClick={() => setOrderType('PICKUP')}
            className={`pb-1 text-xs font-bold tracking-wider uppercase transition-colors relative ${
              orderType === 'PICKUP'
                ? 'text-[#0e274d] font-extrabold text-sm'
                : 'text-neutral-500 hover:text-neutral-800'
            }`}
          >
            PICKUP
            {orderType === 'PICKUP' && (
              <motion.div
                layoutId="orderTypeIndicator"
                className="w-7 h-[3px] bg-[#d93043] rounded-full mt-1 mx-auto"
              />
            )}
          </button>

          <button
            onClick={() => setOrderType('DELIVERY')}
            className={`pb-1 text-xs font-bold tracking-wider uppercase transition-colors relative ${
              orderType === 'DELIVERY'
                ? 'text-[#0e274d] font-extrabold text-sm'
                : 'text-neutral-500 hover:text-neutral-800'
            }`}
          >
            DELIVERY
            {orderType === 'DELIVERY' && (
              <motion.div
                layoutId="orderTypeIndicator"
                className="w-7 h-[3px] bg-[#d93043] rounded-full mt-1 mx-auto"
              />
            )}
          </button>
        </div>

        {/* Address / Location Line */}
        <div className="mt-2.5 space-y-0.5 relative z-10">
          {orderType === 'DELIVERY' ? (
            <>
              {/* Deliver to address */}
              <div className="flex items-center gap-1.5 text-neutral-900 group cursor-pointer">
                <MapPin className="w-3.5 h-3.5 fill-[#0e274d] text-[#0e274d] shrink-0" />
                <span className="text-[13px] font-extrabold text-[#0e274d] tracking-tight">
                  Deliver to: 487080
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
              </div>

              {/* Store source */}
              <div className="flex items-center gap-1 text-[11px] text-neutral-600 pl-5 cursor-pointer">
                <Store className="w-3 h-3 text-neutral-500" />
                <span className="font-medium text-neutral-700">
                  Sceneca Square (Tanah Merah)
                </span>
                <span className="text-neutral-300">|</span>
                <span className="text-neutral-500 font-mono text-[10px]">904.42m</span>
                <ChevronRight className="w-3 h-3 text-neutral-400" />
              </div>
            </>
          ) : (
            <>
              {/* Pickup store */}
              <div className="flex items-center gap-1.5 text-neutral-900 group cursor-pointer">
                <Store className="w-3.5 h-3.5 fill-[#0e274d] text-[#0e274d] shrink-0" />
                <span className="text-[13px] font-extrabold text-[#0e274d] tracking-tight">
                  Sceneca Square (Tanah Merah)
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
              </div>

              {/* Distance and Pickup Time */}
              <div className="flex items-center gap-1 text-[11px] text-neutral-600 pl-5">
                <span className="text-emerald-700 font-semibold">Ready in ~10-15 mins</span>
                <span className="text-neutral-300">·</span>
                <span className="text-neutral-500 font-mono text-[10px]">904.42m away</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ================= 2. MAIN TWO-COLUMN LAYOUT ================= */}
      <div className="flex flex-1 min-h-0 bg-white">
        {/* LEFT SIDEBAR CATEGORIES */}
        <aside className="w-[78px] shrink-0 bg-[#f9f9fa] border-r border-neutral-200/70 flex flex-col py-1 overflow-y-auto">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative py-3.5 px-1 flex flex-col items-center justify-center text-center transition-all ${
                  isActive
                    ? 'bg-white text-[#0e274d] font-black shadow-2xs'
                    : 'text-neutral-600 hover:text-neutral-900 font-normal hover:bg-neutral-100/60'
                }`}
              >
                {/* Category Icon */}
                <div
                  className={`w-7 h-7 flex items-center justify-center mb-1 transition-transform ${
                    isActive ? 'scale-105 text-[#0e274d]' : 'text-neutral-500'
                  }`}
                >
                  {cat.icon}
                </div>

                {/* Category Label (2 lines) */}
                <span className="text-[10px] leading-tight whitespace-pre-line px-1 text-center font-bold">
                  {cat.label}
                </span>

                {/* Active indicator bar on right edge */}
                {isActive && (
                  <div className="absolute right-0 top-0 bottom-0 w-[2.5px] bg-[#d93043]" />
                )}

                {/* Red dot badge as shown in screenshot next to active Fresh Milk Tea */}
                {cat.hasBadge && (
                  <div className="absolute right-0.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#d93043] rounded-full shadow-xs" />
                )}
              </button>
            );
          })}
        </aside>

        {/* RIGHT CONTENT: MENU ITEMS LIST */}
        <main className="flex-1 overflow-y-auto px-3.5 py-3">
          {/* Category Header Title */}
          <div className="mb-3">
            <h3 className="text-sm font-black text-neutral-900 tracking-tight">
              {currentCategoryTitle}
            </h3>
          </div>

          {/* Items List */}
          <div className="space-y-4">
            {categoryItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-2.5 pb-3 border-b border-neutral-100 last:border-0"
              >
                {/* Left: Chagee Cup Artwork Visual with Botanicals and Nutri-Grade Badge */}
                <div className="shrink-0">
                  <ChageeCupVisual
                    theme={item.ingredientTheme || 'jasmine'}
                    nutriGrade={item.nutriGrade || { grade: 'B', sugarPct: '4%' }}
                    size="md"
                  />
                </div>

                {/* Center: Details & Metadata */}
                <div className="flex-1 min-w-0 pr-1">
                  {/* English Name */}
                  <h4 className="text-[13px] font-bold text-[#0e274d] leading-snug line-clamp-1">
                    {item.name}
                  </h4>

                  {/* Subtitle with Chinese name and flavor notes (as in screenshot) */}
                  <p className="text-[11px] text-neutral-500 font-normal leading-tight mt-0.5 line-clamp-1">
                    {item.subTitle || item.description}
                  </p>

                  {/* Badge: e.g. Bestseller or Recommended */}
                  {item.badge && (
                    <div className="mt-1">
                      <span className="inline-flex items-center gap-0.5 text-[9.5px] font-bold text-[#b38446] bg-[#fcf5eb] px-1.5 py-0.5 rounded-xs">
                        <span className="text-[9px]">★</span> {item.badge}
                      </span>
                    </div>
                  )}

                  {/* Price */}
                  <div className="mt-1.5 flex items-baseline gap-1.5">
                    <span className="text-xs font-black text-[#0e274d]">
                      $ {item.price.toFixed(2)}
                    </span>
                    {item.originalPrice && (
                      <span className="text-[10px] text-neutral-400 line-through">
                        ${item.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Right: Add '+' Button (Dark Navy Rounded Square) */}
                <div className="shrink-0 flex items-center">
                  <button
                    onClick={() => handleOpenCustomize(item)}
                    className="w-6 h-6 rounded-[5px] bg-[#0e274d] text-white flex items-center justify-center shadow-xs active:scale-90 hover:bg-[#123366] transition-all cursor-pointer"
                    title="Add to order"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Quick banner for drink packs & gifting */}
          {activeCategory === 'deals' && (
            <div className="mt-4 p-3 bg-amber-50 rounded-xl border border-amber-200/80">
              <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">
                Did you know?
              </span>
              <p className="text-[11px] text-amber-950 mt-0.5 font-medium leading-relaxed">
                Drink vouchers can be transferred anytime to friends and family directly using their phone number!
              </p>
              <button
                onClick={onOpenBundle}
                className="mt-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 px-3 py-1.5 rounded-lg shadow-xs flex items-center gap-1.5"
              >
                <span>Browse Packs (10/20 Drinks)</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          )}
        </main>
      </div>

      {/* ================= 3. FLOATING ACTIVE ORDER BAR (IF ITEMS IN CART) ================= */}
      {totalCartCount > 0 && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="absolute bottom-2 inset-x-3 bg-[#0e274d] text-white rounded-2xl p-2.5 shadow-xl flex items-center justify-between z-30 border border-blue-900/50"
        >
          <div className="flex items-center gap-2.5 pl-1.5">
            <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center relative">
              <ShoppingBag className="w-4 h-4 text-white" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#d93043] text-white text-[9px] font-bold flex items-center justify-center shadow-xs">
                {totalCartCount}
              </span>
            </div>
            <div>
              <span className="text-xs font-extrabold text-white block">
                ${totalCartPrice.toFixed(2)}
              </span>
              <span className="text-[9px] text-blue-200">
                {totalCartCount} {totalCartCount === 1 ? 'drink' : 'drinks'} in order
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                setShowOrderSuccessToast('Order submitted to store!');
                setCart([]);
                setTimeout(() => setShowOrderSuccessToast(null), 2500);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-[#d93043] hover:bg-[#c2283a] text-white font-bold text-xs shadow-xs transition-colors"
            >
              Checkout
            </button>
          </div>
        </motion.div>
      )}

      {/* ================= 4. ITEM CUSTOMIZATION MODAL / BOTTOM SHEET ================= */}
      <AnimatePresence>
        {customizingItem && (
          <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCustomizingItem(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Modal Sheet */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 280 }}
              className="relative w-full max-w-md bg-white rounded-t-[28px] sm:rounded-3xl shadow-2xl z-10 overflow-hidden max-h-[85vh] flex flex-col"
            >
              {/* Header with Drink Info */}
              <div className="p-4 border-b border-neutral-150 flex items-start justify-between bg-slate-50/70">
                <div className="flex items-center gap-3">
                  <ChageeCupVisual
                    theme={customizingItem.ingredientTheme || 'jasmine'}
                    nutriGrade={customizingItem.nutriGrade || { grade: 'B', sugarPct: '4%' }}
                    size="sm"
                  />
                  <div>
                    <h3 className="text-sm font-extrabold text-[#0e274d]">
                      {customizingItem.name}
                    </h3>
                    <p className="text-[11px] text-neutral-500 font-medium">
                      {customizingItem.subTitle || customizingItem.description}
                    </p>
                    <span className="text-xs font-black text-[#0e274d] mt-1 block">
                      ${customizingItem.price.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setCustomizingItem(null)}
                  className="p-1 rounded-full bg-neutral-200/70 text-neutral-600 hover:bg-neutral-300 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Customization Options */}
              <div className="p-4 space-y-4 overflow-y-auto flex-1 text-xs">
                {/* 1. Size */}
                <div>
                  <span className="font-bold text-neutral-800 block mb-1.5 text-[11px] uppercase tracking-wider">
                    Cup Size
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { size: 'Regular' as const, label: 'Regular (500ml)', price: '+$0.00' },
                      { size: 'Large' as const, label: 'Large (700ml)', price: '+$0.80' },
                    ].map((s) => (
                      <button
                        key={s.size}
                        onClick={() => setSelectedSize(s.size)}
                        className={`py-2 px-3 rounded-xl border text-left flex justify-between items-center transition-all ${
                          selectedSize === s.size
                            ? 'border-[#0e274d] bg-[#0e274d]/5 font-bold text-[#0e274d]'
                            : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                        }`}
                      >
                        <span>{s.label}</span>
                        <span className="text-[10px] text-neutral-400">{s.price}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Sugar Level */}
                <div>
                  <span className="font-bold text-neutral-800 block mb-1.5 text-[11px] uppercase tracking-wider">
                    Sweetness Level
                  </span>
                  <div className="grid grid-cols-3 gap-1.5">
                    {['0% (No Sugar)', '30% (Light)', '50% (Standard)', '70% (Less)', '100% (Regular)'].map(
                      (sugar) => (
                        <button
                          key={sugar}
                          onClick={() => setSelectedSugar(sugar)}
                          className={`py-1.5 px-2 rounded-lg border text-center transition-all ${
                            selectedSugar === sugar
                              ? 'border-[#0e274d] bg-[#0e274d] text-white font-bold'
                              : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                          }`}
                        >
                          <span className="text-[10px]">{sugar}</span>
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* 3. Ice Level */}
                <div>
                  <span className="font-bold text-neutral-800 block mb-1.5 text-[11px] uppercase tracking-wider">
                    Ice Temperature
                  </span>
                  <div className="grid grid-cols-3 gap-1.5">
                    {['Normal Ice', 'Less Ice', 'No Ice', 'Warm'].map((ice) => (
                      <button
                        key={ice}
                        onClick={() => setSelectedIce(ice)}
                        className={`py-1.5 px-2 rounded-lg border text-center transition-all ${
                          selectedIce === ice
                            ? 'border-[#0e274d] bg-[#0e274d] text-white font-bold'
                            : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                        }`}
                      >
                        <span className="text-[10px]">{ice}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons: Add to Cart or Send as eGift */}
              <div className="p-3.5 border-t border-neutral-150 bg-white flex items-center gap-2">
                <button
                  onClick={() => {
                    const item = customizingItem;
                    setCustomizingItem(null);
                    onQuickGiftDrink(item);
                  }}
                  className="px-3.5 py-2.5 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 font-bold text-xs flex items-center justify-center gap-1.5 border border-rose-200/70 transition-colors"
                >
                  <Gift className="w-3.5 h-3.5" />
                  <span>Send eGift</span>
                </button>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-[#0e274d] text-white hover:bg-[#123366] font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Add to Order</span>
                  <span className="text-white/80 font-mono">
                    ($
                    {(
                      customizingItem.price + (selectedSize === 'Large' ? 0.8 : 0)
                    ).toFixed(2)}
                    )
                  </span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= 5. SUCCESS TOAST ================= */}
      <AnimatePresence>
        {showOrderSuccessToast && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-neutral-900 text-white text-xs font-bold px-4 py-2 rounded-full shadow-xl flex items-center gap-2 border border-neutral-700"
          >
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>{showOrderSuccessToast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
