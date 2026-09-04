import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Search,
  Gift,
  Users,
  ChevronRight,
  Flame,
  Coffee,
  Check,
} from 'lucide-react';
import { MenuItem, MobileContact, GiftTransaction } from '../types';
import { MENU_ITEMS } from '../data/menuData';

interface EGiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContactPicker: () => void;
  selectedContact: MobileContact | null;
  onCompleteSendGift: (gift: GiftTransaction) => void;
}

export const EGiftModal: React.FC<EGiftModalProps> = ({
  isOpen,
  onClose,
  onOpenContactPicker,
  selectedContact,
  onCompleteSendGift,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<MenuItem>(MENU_ITEMS[0]);
  const [selectedSize, setSelectedSize] = useState<'Regular' | 'Large'>('Regular');
  const [greetingMessage, setGreetingMessage] = useState<string>(
    'Happy Birthday to you! Enjoy your treat!'
  );
  const [selectedTheme, setSelectedTheme] = useState<'birthday' | 'thankyou' | 'cheers'>('birthday');
  const [isSending, setIsSending] = useState(false);

  if (!isOpen) return null;

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.chineseName && item.chineseName.includes(searchTerm));
    return matchesCategory && matchesSearch;
  });

  const basePrice = selectedItem.price + (selectedSize === 'Large' ? 1.0 : 0);

  const handleSendGift = () => {
    if (!selectedContact) {
      onOpenContactPicker();
      return;
    }

    setIsSending(true);
    setTimeout(() => {
      const newGift: GiftTransaction = {
        id: `GIFT-${Date.now()}`,
        senderName: 'Alex',
        senderPhone: '+65 9888 1234',
        recipientName: selectedContact.name.replace(/\(.*?\)/g, '').trim(),
        recipientPhone: selectedContact.phone,
        itemType: 'drink',
        itemTitle: selectedItem.name,
        itemSubtitle: `${selectedSize} Size · Handcrafted Fresh Tea`,
        itemImage: selectedItem.image,
        price: basePrice,
        totalVouchers: 1,
        remainingVouchers: 1,
        customMessage: greetingMessage || 'Happy Birthday to you! Enjoy your treat!',
        cardTheme: selectedTheme,
        giftCode: `CHG-${Math.floor(100000 + Math.random() * 900000)}`,
        createdAt: 'Just now',
        opened: false,
        redeemedHistory: [],
      };

      setIsSending(false);
      onCompleteSendGift(newGift);
      onClose();
    }, 800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        />

        {/* Modal Sheet */}
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl z-10 max-h-[92vh] flex flex-col overflow-hidden"
        >
          {/* Header Banner */}
          <div className="relative bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 text-white px-5 pt-5 pb-6 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center justify-between relative z-10 gap-3">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-xl shadow-inner shrink-0">
                  🎁
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-extrabold text-base sm:text-lg leading-tight text-white truncate">
                    CHAGEE eGift Experience
                  </h3>
                  <p className="text-xs text-rose-100 font-medium whitespace-nowrap overflow-hidden text-ellipsis mt-1 pb-1">
                    Send any menu item directly to mobile contacts.
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/30 flex items-center justify-center text-white transition-colors shrink-0 ml-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Step 1: Select Drink from Menu */}
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-neutral-500 block mb-2">
                1. Select Item From Menu
              </label>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none text-xs">
                {[
                  { id: 'all', label: 'All Items' },
                  { id: 'milk-tea', label: 'Fresh Milk Tea' },
                  { id: 'snow-cap', label: 'Snow Cap' },
                  { id: 'fresh-brew', label: 'Fresh Brew' },
                  { id: 'fruit-tea', label: 'Fruit Tea' },
                  { id: 'bundle', label: 'Plushie & Sets' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-rose-600 text-white shadow-xs'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Menu Grid */}
              <div className="grid grid-cols-2 gap-2.5 max-h-56 overflow-y-auto p-1 bg-neutral-50/70 rounded-2xl border border-neutral-200">
                {filteredItems.map((item) => {
                  const isSelected = selectedItem.id === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedItem(item)}
                      className={`p-2.5 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-rose-500 bg-white shadow-xs ring-2 ring-rose-500/20'
                          : 'border-transparent bg-white/70 hover:bg-white'
                      }`}
                    >
                      <div className="relative aspect-square w-full rounded-lg overflow-hidden mb-2 bg-neutral-100">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = '/images/chagee_tea_cup.jpg';
                          }}
                        />
                        {item.isBestSeller && (
                          <div className="absolute top-1 left-1 bg-rose-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full">
                            TOP 1
                          </div>
                        )}
                      </div>

                      <div>
                        <h5 className="font-extrabold text-neutral-900 text-xs line-clamp-1">
                          {item.name}
                        </h5>
                        {item.chineseName && (
                          <p className="text-[10px] text-neutral-400 truncate">
                            {item.chineseName}
                          </p>
                        )}
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs font-black text-rose-600">
                            ${item.price.toFixed(2)}
                          </span>
                          {isSelected && (
                            <span className="w-4 h-4 rounded-full bg-rose-600 text-white flex items-center justify-center text-[10px]">
                              ✓
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Choose Cup Size */}
            <div className="bg-neutral-50 rounded-2xl p-3.5 border border-neutral-200 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black uppercase tracking-wider text-neutral-600">
                  2. Choose Cup Size
                </label>
                <span className="text-[10px] text-neutral-400 font-medium">
                  Freshly brewed to order
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {(['Regular', 'Large'] as const).map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-between ${
                      selectedSize === size
                        ? 'border-rose-500 bg-rose-50 text-rose-700 shadow-2xs'
                        : 'border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50'
                    }`}
                  >
                    <span>{size} Cup</span>
                    <span className="text-[11px] font-black text-rose-600">
                      {size === 'Large' ? '+$1.00' : 'Included'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Select Recipient via Mobile Contact List */}
            <div className="bg-neutral-50 rounded-2xl p-3.5 border border-neutral-200">
              <label className="text-xs font-black uppercase tracking-wider text-neutral-600 block mb-2">
                3. Send to Friend via Mobile Contact List
              </label>

              {selectedContact ? (
                <div className="flex items-center justify-between bg-white p-3.5 rounded-2xl border border-rose-200 shadow-2xs gap-3">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-rose-500 to-amber-500 text-white font-bold flex items-center justify-center text-xs shadow-xs shrink-0">
                      {selectedContact.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
                        <span className="text-xs font-extrabold text-neutral-900 leading-tight">
                          {selectedContact.name}
                        </span>
                        {selectedContact.tag && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold whitespace-nowrap shrink-0">
                            {selectedContact.tag}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-neutral-500 block leading-tight font-medium">
                        {selectedContact.phone}
                      </span>
                    </div>
                  </div>

                  <button
                    id="change-contact-egift-btn"
                    onClick={onOpenContactPicker}
                    className="text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-xl transition-colors shrink-0"
                  >
                    Change
                  </button>
                </div>
              ) : (
                <button
                  id="pick-friend-contact-egift-btn"
                  onClick={onOpenContactPicker}
                  className="w-full py-3 px-4 rounded-xl border-2 border-dashed border-rose-300 bg-white hover:bg-rose-50/50 text-rose-600 flex items-center justify-between transition-all group shadow-2xs"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 group-hover:scale-110 transition-transform">
                      <Users className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <span className="text-xs font-extrabold text-neutral-800 block">
                        Select from Contact List
                      </span>
                      <span className="text-[10px] text-neutral-400">
                        Choose a friend to receive this eGift
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
                </button>
              )}
            </div>

            {/* Step 4: Greeting Card Theme & Birthday Message Prompt */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-neutral-500 block">
                4. Gift Card Theme & Message Prompt
              </label>

              <div className="flex items-center gap-2">
                {[
                  { key: 'birthday', label: '🎂 Birthday', prompt: 'Happy Birthday to you! Enjoy your treat!' },
                  { key: 'thankyou', label: '🙏 Thank You', prompt: 'A small thank you token! Have a refreshing tea on me.' },
                  { key: 'cheers', label: '🎉 Cheers', prompt: 'Cheers to you! Enjoy your handcrafted treat!' },
                ].map((t) => (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => {
                      setSelectedTheme(t.key as any);
                      setGreetingMessage(t.prompt);
                    }}
                    className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold border transition-all ${
                      selectedTheme === t.key
                        ? 'border-rose-500 bg-rose-50 text-rose-700 shadow-2xs'
                        : 'border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Message Input Box */}
              <div className="relative">
                <textarea
                  value={greetingMessage}
                  onChange={(e) => setGreetingMessage(e.target.value)}
                  rows={2}
                  placeholder="Type your message..."
                  className="w-full p-3 bg-white border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 font-medium"
                />
                <div className="text-[10px] text-neutral-400 text-right mt-0.5">
                  Recipient receives "You've Got a Gift" unboxing with this message!
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div className="p-4 bg-white border-t border-neutral-100 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-wider font-bold text-neutral-400 block">
                Total Amount
              </span>
              <span className="text-xl font-black text-neutral-900">
                ${basePrice.toFixed(2)}
              </span>
            </div>

            <motion.button
              id="confirm-send-egift-btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSending}
              onClick={handleSendGift}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-extrabold text-sm shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center gap-2"
            >
              {isSending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Sending eGift...</span>
                </>
              ) : (
                <>
                  <Gift className="w-4 h-4" />
                  <span>{selectedContact ? 'Send eGift Drink' : 'Select Friend to Send'}</span>
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
