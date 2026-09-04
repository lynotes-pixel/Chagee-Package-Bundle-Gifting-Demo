import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Sparkles,
  Award,
  CheckCircle2,
  Clock,
  ShieldCheck,
  QrCode,
  ArrowRight,
  Gift,
  Coins,
} from 'lucide-react';
import { RewardItem } from '../types';
import { REWARDS_LIST } from '../data/menuData';

interface RewardPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRewardId?: string;
  userPoints: number;
  onConfirmRedeem: (reward: RewardItem) => void;
  onViewVouchers?: () => void;
}

export const RewardPreviewModal: React.FC<RewardPreviewModalProps> = ({
  isOpen,
  onClose,
  selectedRewardId,
  userPoints,
  onConfirmRedeem,
  onViewVouchers,
}) => {
  const [activeId, setActiveId] = useState<string>(
    selectedRewardId || REWARDS_LIST[0].id
  );
  const [redeemedReward, setRedeemedReward] = useState<RewardItem | null>(null);
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  React.useEffect(() => {
    if (selectedRewardId) {
      setActiveId(selectedRewardId);
    }
  }, [selectedRewardId]);

  React.useEffect(() => {
    if (isOpen) {
      setRedeemedReward(null);
      setGeneratedCode('');
      setIsProcessing(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentReward =
    REWARDS_LIST.find((r) => r.id === activeId) || REWARDS_LIST[0];

  const hasEnoughPoints = userPoints >= currentReward.pointsCost;
  const remainingPoints = userPoints - currentReward.pointsCost;

  const handleRedeem = () => {
    if (!hasEnoughPoints) return;
    setIsProcessing(true);

    setTimeout(() => {
      const code = `CHG-RWD-${Math.floor(100000 + Math.random() * 900000)}`;
      setGeneratedCode(code);
      setRedeemedReward(currentReward);
      setIsProcessing(false);
      onConfirmRedeem(currentReward);
    }, 700);
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

        {/* Modal Container */}
        <motion.div
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 50, opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl z-10 max-h-[92vh] flex flex-col overflow-hidden"
        >
          {/* Header Banner */}
          <div className="relative bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 text-white px-5 pt-5 pb-8 sm:pb-9 overflow-hidden">
            <div className="absolute top-0 right-0 w-36 h-36 bg-white/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-start justify-between relative z-10 gap-3">
              <div className="flex items-start gap-3 min-w-0 flex-1">
                {/* Same Award Badge Icon as shown on Homepage */}
                <div className="w-10 h-10 rounded-xl bg-emerald-600 border border-emerald-400/40 text-white flex items-center justify-center shadow-md shadow-black/10 shrink-0 mt-0.5">
                  <Award className="w-5 h-5 text-white drop-shadow-xs" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <h3 className="font-extrabold text-base sm:text-lg leading-snug text-white whitespace-normal">
                      Redeem your Points
                    </h3>
                    <span className="text-[10px] font-black bg-emerald-400 text-emerald-950 px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">
                      Rewards
                    </span>
                  </div>
                  <p className="text-xs text-emerald-100/90 font-medium whitespace-normal mt-2 pb-1">
                    Your Balance: <strong className="text-white font-bold">{userPoints.toLocaleString()} Tea Leaves</strong>
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                aria-label="Close modal"
                className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/30 flex items-center justify-center text-white transition-colors shrink-0 ml-1 mt-0.5 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 2-Column Rewards List with Indicating Points Required */}
          {!redeemedReward && (
            <div className="bg-neutral-100/90 px-3.5 py-2.5 border-b border-neutral-200">
              <div className="text-[11px] font-bold text-neutral-600 uppercase tracking-wider mb-2 px-0.5">
                Select Reward ({REWARDS_LIST.length} Available):
              </div>
              <div className="grid grid-cols-2 gap-2 max-h-56 sm:max-h-64 overflow-y-auto pr-1">
                {REWARDS_LIST.map((reward) => {
                  const isSelected = reward.id === activeId;
                  const canAfford = userPoints >= reward.pointsCost;
                  return (
                    <button
                      key={reward.id}
                      id={`select-reward-${reward.id}`}
                      onClick={() => setActiveId(reward.id)}
                      className={`p-2 sm:p-2.5 rounded-2xl text-left transition-all border flex items-center gap-2.5 relative group ${
                        isSelected
                          ? 'bg-white border-emerald-600 text-neutral-900 shadow-sm ring-2 ring-emerald-500/25'
                          : 'bg-white/80 border-neutral-200/90 text-neutral-700 hover:bg-white hover:border-neutral-300'
                      }`}
                    >
                      {/* Image Thumbnail */}
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-neutral-100 shrink-0 border border-black/5">
                        <img
                          src={reward.image}
                          alt={reward.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        {reward.badge && (
                          <span
                            className={`absolute top-0.5 left-0.5 text-[7px] font-black px-1 rounded-xs ${
                              reward.badgeColor || 'bg-emerald-600 text-white'
                            }`}
                          >
                            {reward.badge}
                          </span>
                        )}
                      </div>

                      {/* Info & Points Required */}
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-black text-neutral-900 truncate leading-tight">
                          {reward.name}
                        </div>
                        <div className="text-[10px] text-neutral-500 font-semibold truncate mt-0.5">
                          {reward.indicativeValue}
                        </div>
                        <div className="mt-1 flex items-center gap-1">
                          <span
                            className={`text-[10px] font-black px-1.5 py-0.5 rounded-md leading-none ${
                              isSelected
                                ? 'bg-emerald-600 text-white'
                                : canAfford
                                ? 'bg-emerald-100 text-emerald-900'
                                : 'bg-neutral-100 text-neutral-600'
                            }`}
                          >
                            {reward.pointsCost.toLocaleString()} pts
                          </span>
                        </div>
                      </div>

                      {/* Active indicator */}
                      {isSelected && (
                        <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-600" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Scrollable Content Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {redeemedReward ? (
              /* SUCCESS STATE UPON REDEMPTION */
              <div className="text-center py-4 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto shadow-inner text-3xl">
                  🎉
                </div>

                <div>
                  <span className="text-[11px] font-black text-emerald-600 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    Redemption Successful!
                  </span>
                  <h4 className="text-lg font-black text-neutral-900 mt-2">
                    {redeemedReward.name}
                  </h4>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Your voucher has been generated and added to your CHAGEE Wallet.
                  </p>
                </div>

                {/* Voucher Barcode & QR Simulation */}
                <div className="bg-neutral-50 p-4 rounded-3xl border border-neutral-200 max-w-xs mx-auto space-y-3">
                  <div className="bg-white p-3 rounded-2xl border border-neutral-200 inline-block shadow-2xs">
                    <QrCode className="w-28 h-28 text-neutral-900 mx-auto" />
                  </div>

                  <div>
                    <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                      Voucher Code
                    </div>
                    <div className="text-base font-mono font-black text-neutral-900 tracking-wider">
                      {generatedCode}
                    </div>
                  </div>

                  <p className="text-[10px] text-neutral-500">
                    Show this QR code or mention voucher code to the barista in-store.
                  </p>
                </div>

                {/* Points Balance Notice */}
                <div className="bg-emerald-50/80 p-3 rounded-2xl border border-emerald-200/80 text-xs text-emerald-900 font-medium flex items-center justify-between max-w-xs mx-auto">
                  <span>Points Deducted: -{redeemedReward.pointsCost} pts</span>
                  <span className="font-bold">New Balance: {userPoints.toLocaleString()} pts</span>
                </div>

                <div className="flex gap-2 max-w-xs mx-auto pt-2">
                  <button
                    onClick={() => {
                      if (onViewVouchers) {
                        onViewVouchers();
                      }
                      onClose();
                    }}
                    className="flex-1 py-3 px-4 rounded-2xl bg-neutral-900 hover:bg-neutral-800 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>View in My Vouchers</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setRedeemedReward(null)}
                    className="py-3 px-4 rounded-2xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-extrabold text-xs transition-all"
                  >
                    Browse More
                  </button>
                </div>
              </div>
            ) : (
              /* PREVIEW STATE */
              <>
                {/* Reward Card Hero */}
                <div className="relative rounded-3xl overflow-hidden border border-neutral-200 shadow-xs bg-white">
                  <div className="h-44 w-full relative overflow-hidden bg-neutral-100">
                    <img
                      src={currentReward.image}
                      alt={currentReward.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      {currentReward.badge && (
                        <span
                          className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm ${
                            currentReward.badgeColor || 'bg-amber-500 text-white'
                          }`}
                        >
                          {currentReward.badge}
                        </span>
                      )}
                      <span className="text-[10px] font-extrabold px-2 py-1 rounded-full bg-white/90 text-neutral-900 backdrop-blur-xs shadow-sm">
                        {currentReward.indicativeValue}
                      </span>
                    </div>

                    {/* Bottom Title on Image */}
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="text-[11px] font-serif text-emerald-200 block">
                        {currentReward.chineseName}
                      </span>
                      <h4 className="text-lg font-black leading-tight drop-shadow-xs">
                        {currentReward.name}
                      </h4>
                    </div>
                  </div>

                  {/* Description Box */}
                  <div className="p-4 bg-white space-y-2">
                    <p className="text-xs text-neutral-600 leading-relaxed font-medium">
                      {currentReward.description}
                    </p>
                  </div>
                </div>

                {/* Points Calculation Breakdown */}
                <div className="bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/60 rounded-2xl p-4 border border-emerald-200/70 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-neutral-600 flex items-center gap-1.5">
                      <Coins className="w-4 h-4 text-emerald-600" />
                      <span>Points Required for Redemption</span>
                    </span>
                    <span className="text-base font-black text-emerald-800 bg-emerald-100/90 px-3 py-1 rounded-xl border border-emerald-300">
                      {currentReward.pointsCost.toLocaleString()} pts
                    </span>
                  </div>

                  <div className="space-y-1.5 pt-1 text-xs border-t border-emerald-200/50">
                    <div className="flex items-center justify-between text-neutral-600 font-medium">
                      <span>Your Tea Leaves Balance:</span>
                      <span className="font-bold text-neutral-900">{userPoints.toLocaleString()} pts</span>
                    </div>
                    <div className="flex items-center justify-between text-neutral-600 font-medium">
                      <span>Points to Deduct:</span>
                      <span className="font-bold text-rose-600">-{currentReward.pointsCost.toLocaleString()} pts</span>
                    </div>
                    <div className="flex items-center justify-between text-neutral-900 font-extrabold pt-1 border-t border-dashed border-emerald-200">
                      <span>Balance After Redemption:</span>
                      <span className={remainingPoints >= 0 ? 'text-emerald-700' : 'text-rose-600'}>
                        {remainingPoints >= 0 ? `${remainingPoints.toLocaleString()} pts` : 'Insufficient Points'}
                      </span>
                    </div>
                  </div>

                  {hasEnoughPoints ? (
                    <div className="bg-emerald-50 text-emerald-800 p-2.5 rounded-xl border border-emerald-200 text-[11px] font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>You have sufficient points to redeem this reward now!</span>
                    </div>
                  ) : (
                    <div className="bg-rose-50 text-rose-800 p-2.5 rounded-xl border border-rose-200 text-[11px] font-bold">
                      You need {(currentReward.pointsCost - userPoints).toLocaleString()} more points to redeem.
                    </div>
                  )}
                </div>

                {/* Terms & Conditions Accordion */}
                <div className="bg-neutral-50 rounded-2xl p-3.5 border border-neutral-200 text-xs space-y-1.5">
                  <div className="font-extrabold text-neutral-800 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-neutral-600" />
                    <span>Redemption Terms & Validity</span>
                  </div>
                  <ul className="text-[11px] text-neutral-600 list-disc list-inside space-y-1 pl-1">
                    {currentReward.terms.map((term, i) => (
                      <li key={i}>{term}</li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>

          {/* Bottom Action Bar */}
          {!redeemedReward && (
            <div className="p-4 bg-white border-t border-neutral-200 flex items-center justify-between gap-3 shadow-lg">
              <div>
                <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">
                  Required Points
                </span>
                <div className="text-xl font-black text-neutral-900 flex items-baseline gap-1">
                  <span className="text-emerald-700">{currentReward.pointsCost}</span>
                  <span className="text-xs text-neutral-500 font-bold">pts</span>
                  <span className="text-[10px] font-normal text-neutral-400 ml-1">
                    ({currentReward.indicativeValue})
                  </span>
                </div>
              </div>

              <motion.button
                id="confirm-redeem-reward-btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={!hasEnoughPoints || isProcessing}
                onClick={handleRedeem}
                className={`px-6 py-3 rounded-2xl font-extrabold text-sm shadow-md transition-all flex items-center gap-2 ${
                  hasEnoughPoints
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white hover:brightness-105 active:scale-95'
                    : 'bg-neutral-200 text-neutral-400 cursor-not-allowed shadow-none'
                }`}
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Redeeming...</span>
                  </>
                ) : (
                  <>
                    <Award className="w-4 h-4 text-emerald-200" />
                    <span>{hasEnoughPoints ? `Redeem Reward` : 'Insufficient Points'}</span>
                  </>
                )}
              </motion.button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
