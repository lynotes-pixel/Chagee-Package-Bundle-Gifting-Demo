import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  CheckCircle2,
  ShieldCheck,
  Flame,
  CreditCard,
  Sparkles,
} from 'lucide-react';
import { GiftTransaction } from '../types';
import { PACKAGE_BUNDLES } from '../data/menuData';

interface PackageBundleModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedBundleId?: string;
  onCompleteSendBundle: (gift: GiftTransaction) => void;
}

export const PackageBundleModal: React.FC<PackageBundleModalProps> = ({
  isOpen,
  onClose,
  selectedBundleId = 'bundle-10',
  onCompleteSendBundle,
}) => {
  const [activeBundleId, setActiveBundleId] = useState<string>(selectedBundleId);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const currentBundle =
    PACKAGE_BUNDLES.find((b) => b.id === activeBundleId) || PACKAGE_BUNDLES[0];

  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const newPurchase: GiftTransaction = {
        id: `BUNDLE-${Date.now()}`,
        senderName: 'Alex',
        senderPhone: '+65 9888 1234',
        recipientName: 'You (Alex)',
        recipientPhone: '+65 9888 1234',
        itemType: 'bundle',
        itemTitle: currentBundle.name,
        itemSubtitle: `${currentBundle.drinksCount} Handcrafted Regular Tea Vouchers ($${currentBundle.price.toFixed(2)})`,
        itemImage: currentBundle.image,
        price: currentBundle.price,
        totalVouchers: currentBundle.drinksCount,
        remainingVouchers: currentBundle.drinksCount,
        customMessage: 'Self-purchased saver drink passes.',
        cardTheme: 'cheers',
        giftCode: `CHG-${Math.floor(100000 + Math.random() * 900000)}`,
        createdAt: 'Just now',
        opened: true,
        redeemedHistory: [],
      };

      setIsProcessing(false);
      onCompleteSendBundle(newPurchase);
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
          className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl z-10 max-h-[90vh] flex flex-col overflow-hidden"
        >
          {/* Top banner header */}
          <div className="relative bg-gradient-to-r from-amber-600 via-rose-600 to-amber-700 text-white px-5 pt-5 pb-6 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center justify-between relative z-10 gap-3">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-xl shadow-inner shrink-0">
                  🧃
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-extrabold text-base sm:text-lg leading-tight text-white truncate">
                    CHAGEE Package Bundles
                  </h3>
                  <p className="text-xs text-amber-100 font-medium whitespace-nowrap overflow-hidden text-ellipsis mt-1 pb-1">
                    Pre-purchased drink coupons with savings.
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
            {/* Choose Bundle Tier */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-black uppercase tracking-wider text-neutral-500">
                  Choose Your Bundle Tier
                </label>
                <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                  Valid 180 Days
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PACKAGE_BUNDLES.map((bundle) => {
                  const isSelected = activeBundleId === bundle.id;
                  return (
                    <div
                      key={bundle.id}
                      onClick={() => setActiveBundleId(bundle.id)}
                      className={`relative p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-rose-500 bg-rose-50/40 shadow-sm'
                          : 'border-neutral-200 bg-white hover:border-neutral-300'
                      }`}
                    >
                      {bundle.bestValue && (
                        <div className="absolute -top-2.5 right-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-xs flex items-center gap-0.5">
                          <Flame className="w-2.5 h-2.5" />
                          <span>BEST VALUE</span>
                        </div>
                      )}
                      {bundle.popular && !bundle.bestValue && (
                        <div className="absolute -top-2.5 right-3 bg-rose-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-xs">
                          POPULAR
                        </div>
                      )}

                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-extrabold text-neutral-900 text-sm">
                            {bundle.name}
                          </h4>
                          <div className="flex items-baseline gap-2 mt-1">
                            <span className="text-lg font-black text-rose-600">
                              ${bundle.price.toFixed(2)}
                            </span>
                            <span className="text-xs text-neutral-400 line-through font-medium">
                              ${bundle.originalPrice.toFixed(2)}
                            </span>
                          </div>
                        </div>

                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            isSelected
                              ? 'border-rose-500 bg-rose-500 text-white'
                              : 'border-neutral-300'
                          }`}
                        >
                          {isSelected && <CheckCircle2 className="w-4 h-4" />}
                        </div>
                      </div>

                      <div className="mt-2.5 pt-2.5 border-t border-neutral-100 flex items-center justify-between text-[10px]">
                        <span className="text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded-md">
                          Save ${bundle.savings.toFixed(2)} (${(bundle.price / bundle.drinksCount).toFixed(2)}/drink)
                        </span>
                        <span className="text-neutral-500 font-medium">
                          {bundle.drinksCount} Vouchers
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Payment Methods Summary */}
            <div className="bg-neutral-50 rounded-2xl p-3.5 border border-neutral-200/80 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-700">Payment Method</span>
                <span className="text-[11px] font-extrabold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                  Apple Pay / Credit Card
                </span>
              </div>
              <div className="flex items-center gap-2 pt-1 border-t border-neutral-200/60 text-xs text-neutral-600">
                <CreditCard className="w-4 h-4 text-neutral-500" />
                <span>Instant 1-Click Secure Checkout</span>
              </div>
            </div>

            {/* Bundle Perks Summary */}
            <div className="bg-amber-50/70 rounded-2xl p-3.5 border border-amber-200/60 text-xs space-y-1.5 text-neutral-700">
              <div className="font-extrabold text-amber-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>Bundle Guarantee & Redemption Terms</span>
              </div>
              <ul className="text-[11px] text-neutral-600 list-disc list-inside space-y-1">
                <li>Vouchers automatically credited to your CHAGEE Wallet instantly.</li>
                <li>Redeemable across all CHAGEE physical outlets in Singapore.</li>
                <li>Redeem 1 drink or multiple drinks simultaneously at any time.</li>
                <li>Valid for 180 days from the date of purchase.</li>
              </ul>
            </div>
          </div>

          {/* Bottom Action / Checkout Bar */}
          <div className="p-4 bg-white border-t border-neutral-100 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-wider font-bold text-neutral-400 block">
                Total Amount
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-black text-neutral-900">
                  ${currentBundle.price.toFixed(2)}
                </span>
                <span className="text-[11px] text-emerald-600 font-bold">
                  (Save ${currentBundle.savings.toFixed(2)})
                </span>
              </div>
            </div>

            <motion.button
              id="proceed-payment-bundle-btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isProcessing}
              onClick={handleCheckout}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-amber-600 text-white font-extrabold text-sm shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center gap-2"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Processing Payment...</span>
                </>
              ) : (
                <>
                  <CreditCard className="w-4 h-4" />
                  <span>Proceed to Payment</span>
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
