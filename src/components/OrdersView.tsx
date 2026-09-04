import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Gift,
  Package,
  Store,
  Sparkles,
  Send,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  QrCode,
  ShieldCheck,
  Tag,
  Info,
  ExternalLink,
} from 'lucide-react';
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
  const [filter, setFilter] = useState<'all' | 'active' | 'bundles' | 'egifts'>('all');
  const [expandedVoucherId, setExpandedVoucherId] = useState<string | null>(
    giftsList[0]?.id || null
  );
  const [resentToast, setResentToast] = useState<string | null>(null);

  const handleToggleExpand = (id: string) => {
    setExpandedVoucherId((prev) => (prev === id ? null : id));
  };

  const handleResendNotification = (gift: GiftTransaction, e: React.MouseEvent) => {
    e.stopPropagation();
    setResentToast(`eGift notification resent to ${gift.recipientName} (${gift.recipientPhone})!`);
    setTimeout(() => {
      setResentToast(null);
    }, 3500);
  };

  const filteredGifts = giftsList.filter((g) => {
    if (filter === 'active') return g.remainingVouchers > 0;
    if (filter === 'bundles') return g.itemType === 'bundle';
    if (filter === 'egifts') return g.itemType === 'drink' || g.itemType === 'reward';
    return true;
  });

  const activePassesCount = giftsList.filter((g) => g.remainingVouchers > 0).length;

  return (
    <div className="p-4 space-y-4 pb-28 relative">
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

      {/* Header Bento Tile: Vouchers Wallet */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white rounded-3xl p-4 sm:p-5 border-2 border-slate-800 shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-36 h-36 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-black uppercase tracking-wider border border-amber-400/30 mb-1.5">
              <Sparkles className="w-3 h-3" />
              <span>Vouchers Wallet</span>
            </div>
            <h2 className="text-xl font-black text-white tracking-tight leading-tight">
              My Vouchers & Passes
            </h2>
            <p className="text-xs text-slate-300 font-medium mt-0.5">
              Tap any voucher below to expand high-res visuals & terms.
            </p>
          </div>

          {/* Active Passes Count Pill */}
          <div className="bg-white/10 backdrop-blur-xs border border-white/20 px-3.5 py-2 rounded-2xl text-center shrink-0">
            <div className="text-xl font-black text-amber-400 leading-none">
              {activePassesCount}
            </div>
            <div className="text-[9px] font-extrabold uppercase tracking-wider text-slate-300 mt-1">
              Active Passes
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bento Tabs */}
      <div className="grid grid-cols-4 gap-1 bg-slate-200/80 p-1.5 rounded-2xl text-[11px] font-black border border-slate-200">
        {[
          { id: 'all', label: `All (${giftsList.length})` },
          { id: 'active', label: `Active (${activePassesCount})` },
          { id: 'bundles', label: 'Bundles' },
          { id: 'egifts', label: 'eGifts' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id as any)}
            className={`py-2 rounded-xl transition-all text-center truncate px-1 cursor-pointer ${
              filter === tab.id
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80 font-black'
                : 'text-slate-600 hover:text-slate-900 font-bold'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Vouchers List: Listed one by one in horizontal blocks */}
      <div id="orders-list-section" className="space-y-3">
        {filteredGifts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border-2 border-slate-200 p-6 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-slate-900 mx-auto flex items-center justify-center text-xl">
              🎟️
            </div>
            <h4 className="font-black text-slate-900 text-sm">No vouchers in this filter</h4>
            <p className="text-xs text-slate-500 font-medium max-w-[260px] mx-auto leading-relaxed">
              Explore rewards with your Tea Leaves Points or grab a 10-Drink Package Bundle.
            </p>
            <button
              onClick={onSendNewGift}
              className="px-4 py-2.5 rounded-xl bg-slate-900 text-white font-black text-xs shadow-sm hover:bg-slate-800 cursor-pointer transition-colors"
            >
              Explore Packages
            </button>
          </div>
        ) : (
          filteredGifts.map((gift) => {
            const isExpanded = expandedVoucherId === gift.id;
            const isForMyself = !gift.recipientName || gift.recipientName === 'Myself' || gift.recipientName.includes('You');
            const hasPassesRemaining = gift.remainingVouchers > 0;

            return (
              <motion.div
                key={gift.id}
                layout
                className={`bg-white rounded-3xl border-2 transition-all overflow-hidden shadow-xs cursor-pointer ${
                  isExpanded
                    ? 'border-indigo-500 shadow-md ring-2 ring-indigo-500/10'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
                onClick={() => handleToggleExpand(gift.id)}
              >
                {/* Horizontal Block Header / Row */}
                <div className="p-3.5 sm:p-4 flex items-center justify-between gap-3">
                  {/* Left: Thumbnail & Badge */}
                  <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                    <img
                      src={gift.itemImage}
                      alt={gift.itemTitle}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-1 left-1">
                      <span
                        className={`text-[8px] font-black px-1.5 py-0.5 rounded-md uppercase tracking-wider shadow-2xs ${
                          gift.itemType === 'bundle'
                            ? 'bg-amber-500 text-slate-950 font-black'
                            : gift.itemType === 'reward'
                            ? 'bg-emerald-600 text-white font-black'
                            : 'bg-rose-600 text-white font-black'
                        }`}
                      >
                        {gift.itemType === 'bundle'
                          ? 'Pass'
                          : gift.itemType === 'reward'
                          ? 'Reward'
                          : 'Gift'}
                      </span>
                    </div>
                  </div>

                  {/* Middle: Title, Subtitle & Expiry */}
                  <div className="flex-1 min-w-0 pr-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm line-clamp-1">
                        {gift.itemTitle}
                      </h4>
                    </div>

                    <p className="text-[11px] text-slate-500 font-medium line-clamp-1 mt-0.5">
                      {gift.itemSubtitle}
                    </p>

                    <div className="flex items-center gap-2 mt-1.5 text-[10px] text-slate-400 font-semibold">
                      <span className="flex items-center gap-1 text-slate-600 font-bold">
                        <Clock className="w-3 h-3 text-amber-500 shrink-0" />
                        <span>{gift.expiryDate || 'Valid till 31 Dec 2026'}</span>
                      </span>
                      <span>·</span>
                      <span className="text-indigo-600 font-black">
                        {gift.remainingVouchers} left
                      </span>
                    </div>
                  </div>

                  {/* Right: Expand indicator & Action status */}
                  <div className="flex flex-col items-end justify-between shrink-0 h-16 py-0.5">
                    <span className="text-xs font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded-lg">
                      {gift.price > 0 ? `$${gift.price.toFixed(2)}` : 'FREE'}
                    </span>

                    <div className="flex items-center gap-1 text-[11px] font-bold text-indigo-600">
                      <span>{isExpanded ? 'Hide' : 'T&Cs'}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </div>
                  </div>
                </div>

                {/* EXPANDABLE SECTION: Visuals, Full Details, T&Cs, and Redemption Bar */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="border-t border-slate-100 bg-slate-50/80 px-4 py-4 space-y-3.5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Expanded Visual Hero with Brand Card Details */}
                      <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-2xs">
                        <div className="h-32 sm:h-36 w-full relative overflow-hidden bg-slate-900">
                          <img
                            src={gift.itemImage}
                            alt={gift.itemTitle}
                            className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-700"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                          {/* Overlay voucher badge */}
                          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-slate-900 text-[10px] font-black border border-white">
                            <Tag className="w-3 h-3 text-indigo-600" />
                            <span>Voucher Code: {gift.giftCode}</span>
                          </div>

                          <div className="absolute bottom-2.5 left-3 right-3 text-white">
                            <h3 className="text-sm sm:text-base font-black leading-tight drop-shadow-xs">
                              {gift.itemTitle}
                            </h3>
                            <p className="text-[11px] text-amber-300 font-bold mt-0.5 drop-shadow-2xs">
                              {gift.itemSubtitle}
                            </p>
                          </div>
                        </div>

                        {/* Custom Message if Present */}
                        {gift.customMessage && (
                          <div className="p-3 bg-amber-50/70 border-b border-amber-200/70 text-xs text-slate-800 italic flex items-start gap-2">
                            <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                            <span>"{gift.customMessage}"</span>
                          </div>
                        )}

                        {/* Metadata Grid */}
                        <div className="grid grid-cols-2 gap-2 p-3 bg-white text-xs border-b border-slate-100">
                          <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                              Recipient
                            </span>
                            <span className="font-extrabold text-slate-900 text-xs">
                              {gift.recipientName} ({gift.recipientPhone})
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                              Validity
                            </span>
                            <span className="font-extrabold text-emerald-700 text-xs">
                              {gift.expiryDate || 'Valid till 31 Dec 2026'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Terms & Conditions (T&Cs) Section */}
                      <div className="bg-white rounded-2xl p-3.5 border border-slate-200 space-y-2">
                        <div className="flex items-center gap-1.5 text-xs font-black text-slate-900 uppercase tracking-wider">
                          <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                          <span>Terms & Conditions (T&Cs)</span>
                        </div>
                        <ul className="space-y-1.5 text-[11px] text-slate-600 pl-1">
                          {(gift.terms && gift.terms.length > 0
                            ? gift.terms
                            : [
                                'Valid for 1 redemption across all Singapore CHAGEE outlets.',
                                'Present digital QR voucher code at cashier counter prior to ordering.',
                                'Not exchangeable for cash or store credit.',
                                'Non-stackable with other platform vouchers or external third-party promos.',
                              ]
                          ).map((term, i) => (
                            <li key={i} className="flex items-start gap-1.5 leading-relaxed">
                              <span className="text-indigo-500 font-black">•</span>
                              <span>{term}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Action Button: In-Store Redemption or eGift Resend */}
                      <div className="pt-1">
                        {isForMyself ? (
                          <button
                            type="button"
                            disabled={!hasPassesRemaining}
                            onClick={() => onOpenStoreRedeem(gift)}
                            className={`w-full py-3 px-4 rounded-xl font-black text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm ${
                              hasPassesRemaining
                                ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                            }`}
                          >
                            <Store className="w-4 h-4 text-amber-300 shrink-0" />
                            <span>
                              {hasPassesRemaining
                                ? 'Present QR to Redeem in Store'
                                : 'Fully Redeemed'}
                            </span>
                          </button>
                        ) : (
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={(e) => handleResendNotification(gift, e)}
                              className="flex-1 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                            >
                              <Send className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                              <span>Resend eGift Notification</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => onOpenUnboxing(gift)}
                              className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-200 cursor-pointer"
                            >
                              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                              <span>Preview</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
};

