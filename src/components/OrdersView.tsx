import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, Package, Store, Sparkles, Send, CheckCircle2 } from 'lucide-react';
import { GiftTransaction } from '../types';

interface OrdersViewProps {
  giftsList: GiftTransaction[];
  onOpenStoreRedeem: (gift: GiftTransaction) => void;
  onOpenUnboxing: (gift: GiftTransaction) => void;
  onSendNewGift: () => void;
}

export const OrdersView: React.FC<OrdersViewProps> = ({
  giftsList,
  onOpenStoreRedeem,
  onOpenUnboxing,
  onSendNewGift,
}) => {
  const [filter, setFilter] = useState<'all' | 'bundles' | 'egifts'>('all');
  const [resentToast, setResentToast] = useState<string | null>(null);

  const handleResendNotification = (gift: GiftTransaction) => {
    setResentToast(`eGift notification resent to ${gift.recipientName} (${gift.recipientPhone})!`);
    setTimeout(() => {
      setResentToast(null);
    }, 3500);
  };

  const filteredGifts = giftsList.filter((g) => {
    if (filter === 'bundles') return g.itemType === 'bundle';
    if (filter === 'egifts') return g.itemType === 'drink';
    return true;
  });

  return (
    <div className="p-4 space-y-4 pb-24 relative">
      {/* Toast feedback when eGift notification is resent */}
      <AnimatePresence>
        {resentToast && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-2xl shadow-xl text-xs font-bold flex items-center gap-2 border border-slate-700 max-w-[90vw]"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="truncate">{resentToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Bento Tile */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-slate-200 shadow-sm flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">
            Wallet & Orders
          </span>
          <h2 className="text-lg font-black text-slate-900 tracking-tight leading-tight">
            Orders & Gift Vouchers
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Track sent gifts, bundle passes & store redemptions
          </p>
        </div>

        <button
          onClick={onSendNewGift}
          className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs shadow-sm flex items-center gap-1.5 transition-all shrink-0"
        >
          <Gift className="w-3.5 h-3.5 text-amber-300" />
          <span>New Gift</span>
        </button>
      </div>

      {/* Filter Bento Tabs */}
      <div className="flex gap-1.5 bg-slate-200/70 p-1.5 rounded-2xl text-xs font-black border border-slate-200">
        {[
          { id: 'all', label: 'All Vouchers' },
          { id: 'bundles', label: 'Package Bundles (10/20 Pack)' },
          { id: 'egifts', label: 'eGift Drinks' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id as any)}
            className={`flex-1 py-2 rounded-xl transition-all text-center truncate px-2 ${
              filter === tab.id
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80 font-black'
                : 'text-slate-600 hover:text-slate-900 font-bold'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-3">
        {filteredGifts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border-2 border-slate-200 p-6 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-slate-900 mx-auto flex items-center justify-center text-xl">
              🧃
            </div>
            <h4 className="font-black text-slate-900 text-sm">No vouchers found</h4>
            <p className="text-xs text-slate-500 font-medium">
              Purchase a 10/20 drink package bundle or send an eGift to a friend!
            </p>
            <button
              onClick={onSendNewGift}
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-black text-xs shadow-sm hover:bg-indigo-700"
            >
              Browse Package Bundles
            </button>
          </div>
        ) : (
          filteredGifts.map((gift) => (
            <motion.div
              key={gift.id}
              whileHover={{ scale: 1.01 }}
              className="bg-white rounded-3xl p-4 border-2 border-slate-200 shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase border ${
                      gift.itemType === 'bundle'
                        ? 'bg-amber-50 text-amber-900 border-amber-200'
                        : gift.itemType === 'reward'
                        ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                        : 'bg-rose-50 text-rose-900 border-rose-200'
                    }`}
                  >
                    {gift.itemType === 'bundle'
                      ? 'Package Pack'
                      : gift.itemType === 'reward'
                      ? 'Points Reward'
                      : 'eGift Item'}
                  </span>
                </div>
                <span className="text-[11px] font-bold text-slate-400">
                  {gift.createdAt}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                  <img
                    src={gift.itemImage}
                    alt={gift.itemTitle}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-black text-slate-900 text-sm truncate">
                    {gift.itemTitle}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium truncate mt-0.5">
                    To: <span className="font-bold text-slate-900">{gift.recipientName}</span> ({gift.recipientPhone})
                  </p>

                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-black text-slate-900">
                      ${gift.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Heartfelt message prompt preview in styled bento box */}
              <div className="p-3 bg-amber-50/60 rounded-2xl border border-amber-200 text-xs text-slate-800 font-medium italic">
                "{gift.customMessage}"
              </div>

              {/* Actions: Package Pack sent to recipient cannot be redeemed in store by sender */}
              <div className="pt-1">
                {gift.recipientName && gift.recipientName !== 'Myself' ? (
                  <button
                    type="button"
                    onClick={() => handleResendNotification(gift)}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs flex items-center justify-center gap-2 transition-colors border border-slate-800 whitespace-nowrap shadow-xs cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="whitespace-nowrap">Resend eGift Notification</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => onOpenStoreRedeem(gift)}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-700 cursor-pointer"
                  >
                    <Store className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Redeem in Store</span>
                  </button>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};
