import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Gift, Package, Plus, Sparkles, Filter } from 'lucide-react';
import { MenuItem } from '../types';
import { MENU_ITEMS, PACKAGE_BUNDLES } from '../data/menuData';

interface FullMenuScreenProps {
  onOpenBundle: () => void;
  onOpenEGift: () => void;
  onQuickGiftDrink: (drink: MenuItem) => void;
}

export const FullMenuScreen: React.FC<FullMenuScreenProps> = ({
  onOpenBundle,
  onOpenEGift,
  onQuickGiftDrink,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      (item.chineseName && item.chineseName.includes(search));
    return matchCat && matchSearch;
  });

  return (
    <div className="p-4 space-y-4 pb-24">
      {/* Search Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-neutral-900">CHAGEE Menu</h2>
          <div className="flex items-center gap-1.5">
            <button
              onClick={onOpenBundle}
              className="px-2.5 py-1 rounded-full bg-amber-500 text-white font-extrabold text-[11px] shadow-xs flex items-center gap-1"
            >
              <Package className="w-3 h-3" />
              <span>Drink Packs</span>
            </button>
            <button
              onClick={onOpenEGift}
              className="px-2.5 py-1 rounded-full bg-rose-600 text-white font-extrabold text-[11px] shadow-xs flex items-center gap-1"
            >
              <Gift className="w-3 h-3" />
              <span>eGift</span>
            </button>
          </div>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search milk tea, fresh brew, snow cap..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-rose-500/20"
          />
        </div>
      </div>

      {/* Package Bundle Highlight Banner */}
      <div
        onClick={onOpenBundle}
        className="bg-gradient-to-r from-amber-500 via-rose-500 to-amber-600 p-0.5 rounded-2xl shadow-xs cursor-pointer"
      >
        <div className="bg-white p-3.5 rounded-[14px] flex items-center justify-between">
          <div>
            <span className="text-[9px] font-black uppercase tracking-wider bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full">
              Package Bundle
            </span>
            <h4 className="text-xs font-black text-neutral-900 mt-1">
              10 Drinks @ $40 · 20 Drinks @ $75
            </h4>
            <p className="text-[11px] text-neutral-500">
              Pre-buy & send to friends via mobile contacts
            </p>
          </div>
          <span className="text-xl">🧃</span>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs font-bold">
        {[
          { id: 'all', label: 'All Items' },
          { id: 'milk-tea', label: 'Fresh Milk Tea' },
          { id: 'snow-cap', label: 'Snow Cap' },
          { id: 'fresh-brew', label: 'Fresh Brew' },
          { id: 'fruit-tea', label: 'Fruit Tea' },
          { id: 'bundle', label: 'Sets & Merch' },
        ].map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCategory(c.id)}
            className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-all ${
              selectedCategory === c.id
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Menu Item Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl p-3 border border-neutral-200 shadow-xs flex gap-3 group"
          >
            <div className="relative w-22 h-22 rounded-xl overflow-hidden bg-neutral-100 shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                referrerPolicy="no-referrer"
              />
              {item.isBestSeller && (
                <div className="absolute top-1 left-1 bg-rose-600 text-white text-[8px] font-black px-1.5 py-0.2 rounded-full">
                  TOP 1
                </div>
              )}
            </div>

            <div className="flex-1 flex flex-col justify-between min-w-0">
              <div>
                <h4 className="text-xs font-extrabold text-neutral-900 line-clamp-1">
                  {item.name}
                </h4>
                {item.chineseName && (
                  <p className="text-[10px] text-neutral-400 font-medium">
                    {item.chineseName}
                  </p>
                )}
                <p className="text-[10px] text-neutral-500 line-clamp-1 mt-0.5">
                  {item.description}
                </p>
              </div>

              <div className="flex items-center justify-between mt-2 pt-1 border-t border-neutral-100">
                <span className="text-xs font-black text-rose-600">
                  ${item.price.toFixed(2)}
                </span>

                <button
                  onClick={() => onQuickGiftDrink(item)}
                  className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 text-[10px] font-extrabold flex items-center gap-1 transition-colors"
                >
                  <Gift className="w-3 h-3" />
                  <span>Send eGift</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
