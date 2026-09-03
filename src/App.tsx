import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  INITIAL_CONTACTS,
  INITIAL_GIFT_TRANSACTIONS,
  PACKAGE_BUNDLES,
  MENU_ITEMS,
} from './data/menuData';
import { MobileContact, GiftTransaction, MenuItem } from './types';
import { TopSimulatorBar } from './components/TopSimulatorBar';
import { HeaderBanner } from './components/HeaderBanner';
import { PickupDeliveryCards } from './components/PickupDeliveryCards';
import { QuickActionsGrid } from './components/QuickActionsGrid';
import { PromoBanners } from './components/PromoBanners';
import { BottomNavBar } from './components/BottomNavBar';
import { PackageBundleModal } from './components/PackageBundleModal';
import { EGiftModal } from './components/EGiftModal';
import { ContactPickerModal } from './components/ContactPickerModal';
import { GiftUnboxingModal } from './components/GiftUnboxingModal';
import { StoreRedeemModal } from './components/StoreRedeemModal';
import { IncomingGiftBlock } from './components/IncomingGiftBlock';
import { OrdersView } from './components/OrdersView';
import { FullMenuScreen } from './components/FullMenuScreen';
import { MeProfileView } from './components/MeProfileView';
import { InfoModals } from './components/InfoModals';
import { RewardPreviewModal } from './components/RewardPreviewModal';
import { RewardItem } from './types';
import { Sparkles, Gift, Check, X, QrCode } from 'lucide-react';

export default function App() {
  // Navigation & View perspective states
  const [currentViewMode, setCurrentViewMode] = useState<'sender' | 'recipient'>('sender');
  const [activeTab, setActiveTab] = useState<'home' | 'order' | 'orders' | 'me'>('home');
  const [isPhoneFrame, setIsPhoneFrame] = useState<boolean>(true);

  // Points & Rewards state
  const [userPoints, setUserPoints] = useState<number>(2940);
  const [vouchersCount, setVouchersCount] = useState<number>(7);
  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false);
  const [selectedRewardId, setSelectedRewardId] = useState<string>('reward-tea');

  // Data states
  const [contacts, setContacts] = useState<MobileContact[]>(INITIAL_CONTACTS);
  const [selectedContact, setSelectedContact] = useState<MobileContact | null>(INITIAL_CONTACTS[0]);
  const [giftsList, setGiftsList] = useState<GiftTransaction[]>(INITIAL_GIFT_TRANSACTIONS);

  // Modals state
  const [isBundleModalOpen, setIsBundleModalOpen] = useState(false);
  const [selectedBundleId, setSelectedBundleId] = useState('bundle-10');
  const [isEGiftModalOpen, setIsEGiftModalOpen] = useState(false);
  const [isContactPickerOpen, setIsContactPickerOpen] = useState(false);
  const [contactPickerTarget, setContactPickerTarget] = useState<'bundle' | 'egift'>('bundle');
  
  // Unboxing & Redemption states
  const [isUnboxingModalOpen, setIsUnboxingModalOpen] = useState(false);
  const [activeGiftForUnboxing, setActiveGiftForUnboxing] = useState<GiftTransaction | null>(
    INITIAL_GIFT_TRANSACTIONS[0]
  );
  const [isStoreRedeemModalOpen, setIsStoreRedeemModalOpen] = useState(false);
  const [activeGiftForRedeem, setActiveGiftForRedeem] = useState<GiftTransaction | null>(
    INITIAL_GIFT_TRANSACTIONS[0]
  );

  // Secondary info modals
  const [infoModalType, setInfoModalType] = useState<'story' | 'calc' | 'stores' | 'refer' | null>(null);

  // Toast banner for live simulation notification
  const [toastNotification, setToastNotification] = useState<{
    id: string;
    title: string;
    message: string;
    gift: GiftTransaction;
  } | null>(null);

  // Trigger when a new gift or bundle is sent
  const handleCompleteSendGift = (newGift: GiftTransaction) => {
    setGiftsList((prev) => [newGift, ...prev]);
    setActiveGiftForUnboxing(newGift);
    setActiveGiftForRedeem(newGift);

    // Show live notification toast
    setToastNotification({
      id: `toast-${Date.now()}`,
      title: "🎁 Gift Sent to Friend's Phone!",
      message: `${newGift.itemTitle} sent to ${newGift.recipientName} (${newGift.recipientPhone}). Tap to preview recipient unboxing!`,
      gift: newGift,
    });

    // Auto dismiss toast after 8 seconds
    setTimeout(() => {
      setToastNotification(null);
    }, 8000);
  };

  const handleOpenContactPickerFor = (target: 'bundle' | 'egift') => {
    setContactPickerTarget(target);
    setIsContactPickerOpen(true);
  };

  const handleSelectContact = (contact: MobileContact) => {
    setSelectedContact(contact);
    setIsContactPickerOpen(false);
  };

  const handleAddNewContact = (contact: MobileContact) => {
    setContacts((prev) => [contact, ...prev]);
    setSelectedContact(contact);
  };

  const handleTriggerUnboxing = (gift: GiftTransaction) => {
    setActiveGiftForUnboxing(gift);
    setIsUnboxingModalOpen(true);
  };

  const handleOpenStoreRedeem = (gift: GiftTransaction) => {
    setActiveGiftForRedeem(gift);
    setIsStoreRedeemModalOpen(true);
  };

  const handleConfirmRedeem = (
    giftId: string,
    quantity: number,
    storeName: string,
    drinkName?: string,
    sweetness?: string,
    iceLevel?: string,
    orderNumber?: string
  ) => {
    setGiftsList((prev) =>
      prev.map((g) => {
        if (g.id === giftId) {
          const remaining = Math.max(0, g.remainingVouchers - quantity);
          return {
            ...g,
            remainingVouchers: remaining,
            redeemedHistory: [
              ...g.redeemedHistory,
              {
                date: new Date().toLocaleDateString(),
                storeName,
                quantity,
                drinkName,
                sweetness,
                iceLevel,
                orderNumber,
              },
            ],
          };
        }
        return g;
      })
    );
  };

  const handleConfirmRedeemReward = (reward: RewardItem) => {
    setUserPoints((prev) => Math.max(0, prev - reward.pointsCost));
    setVouchersCount((prev) => prev + 1);

    const newVoucher: GiftTransaction = {
      id: `REWARD-${Date.now()}`,
      senderName: 'CHAGEE Rewards Club',
      senderPhone: 'Points Redemption',
      recipientName: 'You (Alex)',
      recipientPhone: '+65 9888 1234',
      itemType: 'reward',
      itemTitle: reward.name,
      itemSubtitle: `${reward.indicativeValue} · Redeemed with ${reward.pointsCost} pts`,
      itemImage: reward.image,
      price: 0,
      totalVouchers: 1,
      remainingVouchers: 1,
      customMessage: `Redeemed with ${reward.pointsCost} Tea Leaves. Valid across all outlets.`,
      cardTheme: 'cheers',
      giftCode: `CHG-RWD-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: 'Just now',
      opened: true,
      redeemedHistory: [],
    };

    setGiftsList((prev) => [newVoucher, ...prev]);

    setToastNotification({
      id: `toast-${Date.now()}`,
      title: '🎉 Points Reward Claimed!',
      message: `${reward.name} redeemed for ${reward.pointsCost} pts. Added to your Wallet!`,
      gift: newVoucher,
    });
  };

  const unreadGiftsCount = giftsList.filter((g) => !g.opened).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-900 flex flex-col items-center justify-start antialiased font-sans">
      {/* Top Simulator perspective switcher */}
      <TopSimulatorBar
        currentViewMode={currentViewMode}
        onChangeViewMode={(mode) => setCurrentViewMode(mode)}
        activeGift={activeGiftForUnboxing}
        onOpenGiftBox={() => {
          if (activeGiftForUnboxing) {
            setIsUnboxingModalOpen(true);
          }
        }}
        isPhoneFrame={isPhoneFrame}
        onTogglePhoneFrame={() => setIsPhoneFrame(!isPhoneFrame)}
        unreadGiftsCount={unreadGiftsCount}
      />

      {/* Interactive Simulation Toast Notification */}
      <AnimatePresence>
        {toastNotification && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="fixed top-14 z-50 max-w-md w-11/12 mx-auto bg-slate-900 text-white p-4 rounded-3xl shadow-2xl border-2 border-slate-700 flex items-center justify-between gap-3"
          >
            <div
              className="flex-1 cursor-pointer"
              onClick={() => {
                setCurrentViewMode('recipient');
                setIsUnboxingModalOpen(true);
                setToastNotification(null);
              }}
            >
              <div className="flex items-center gap-1.5 font-black text-xs text-amber-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{toastNotification.title}</span>
              </div>
              <p className="text-[11px] text-slate-300 mt-0.5 leading-snug line-clamp-2">
                {toastNotification.message}
              </p>
              <span className="text-[10px] font-black text-indigo-400 hover:text-indigo-300 underline mt-1 inline-block">
                Switch to Sarah's phone to open gift →
              </span>
            </div>

            <button
              onClick={() => setToastNotification(null)}
              className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white shrink-0 border border-slate-700"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main App Container (Mobile Frame or Clean Responsive View) */}
      <main
        className={`w-full transition-all duration-300 flex flex-col ${
          isPhoneFrame
            ? 'max-w-[420px] h-[844px] max-h-[calc(100vh-60px)] my-2 sm:my-4 rounded-[44px] shadow-2xl overflow-hidden border-[8px] border-slate-800 bg-slate-50 relative'
            : 'max-w-md my-0 sm:my-4 bg-slate-50 min-h-screen relative shadow-lg'
        }`}
      >
        {/* Dynamic Island / Top Speaker Bar for Mobile Frame */}
        {isPhoneFrame && (
          <div className="bg-slate-900 h-8 w-full flex items-center justify-between px-7 text-white text-[11px] font-bold select-none z-30 shrink-0">
            <span>9:41</span>
            <div className="w-24 h-4 bg-black rounded-full mx-auto" />
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-[10px]">5G</span>
              <span>📶</span>
              <span>🔋</span>
            </div>
          </div>
        )}

        {/* UNIFIED CHAGEE APP SCROLLABLE CONTENT (Sender and Recipient share identical UI) */}
        <div className="flex-1 overflow-y-auto overscroll-contain bg-slate-50 flex flex-col">
          {activeTab === 'home' && (
            <>
              {/* Header Banner with Profile & Bes-Tea BrewCrew Banner */}
              <HeaderBanner
                onScanQR={() => setInfoModalType('stores')}
                onViewVouchers={() => setActiveTab('orders')}
                onOpenBundle={() => {
                  setSelectedBundleId('bundle-10');
                  setIsBundleModalOpen(true);
                }}
                userName={currentViewMode === 'recipient' ? 'Sarah' : 'Alex'}
                userTier={currentViewMode === 'recipient' ? 'CHA Pioneer' : 'CHA Master'}
                teaLeaves={currentViewMode === 'recipient' ? 1420 : userPoints}
                vouchersCount={currentViewMode === 'recipient' ? giftsList.length : vouchersCount}
              />

              {/* INCOMING GIFT BLOCK: Only difference in Recipient View */}
              {currentViewMode === 'recipient' && giftsList[0] && (
                <div className="px-4 pt-3 pb-1">
                  <IncomingGiftBlock
                    gift={giftsList[0]}
                    onOpenUnboxing={() => {
                      setActiveGiftForUnboxing(giftsList[0]);
                      setIsUnboxingModalOpen(true);
                    }}
                    onOpenStoreRedeem={(g) => handleOpenStoreRedeem(g)}
                  />
                </div>
              )}

              {/* Pickup & Delivery Action Cards */}
              <PickupDeliveryCards
                onSelectPickup={() => setActiveTab('order')}
                onSelectDelivery={() => setActiveTab('order')}
              />

              {/* Quick Actions Grid Featuring "Package Bundle" & "eGift" Icons */}
              <QuickActionsGrid
                onOpenPackageBundle={() => {
                  setSelectedBundleId('bundle-10');
                  setIsBundleModalOpen(true);
                }}
                onOpenEGift={() => setIsEGiftModalOpen(true)}
                onOpenStory={() => setInfoModalType('story')}
                onOpenRefer={() => setInfoModalType('refer')}
                onOpenStores={() => setInfoModalType('stores')}
                onOpenCalculator={() => setInfoModalType('calc')}
                userPoints={currentViewMode === 'recipient' ? 1420 : userPoints}
                onPreviewReward={(rewardId) => {
                  setSelectedRewardId(rewardId);
                  setIsRewardModalOpen(true);
                }}
              />

              {/* Promotional Banners & 10/20 Drink Packs Saver Banner */}
              <PromoBanners
                onOrderDelivery={() => setActiveTab('order')}
                onOpenBundle={() => {
                  setSelectedBundleId('bundle-20');
                  setIsBundleModalOpen(true);
                }}
                onOpenTumbler={() => setIsEGiftModalOpen(true)}
              />
            </>
          )}

          {/* TAB 2: FULL MENU */}
          {activeTab === 'order' && (
            <FullMenuScreen
              onOpenBundle={() => {
                setSelectedBundleId('bundle-10');
                setIsBundleModalOpen(true);
              }}
              onOpenEGift={() => setIsEGiftModalOpen(true)}
              onQuickGiftDrink={(drink) => {
                setIsEGiftModalOpen(true);
              }}
            />
          )}

          {/* TAB 3: ORDERS & SENT/RECEIVED GIFTS */}
          {activeTab === 'orders' && (
            <OrdersView
              giftsList={giftsList}
              onOpenStoreRedeem={handleOpenStoreRedeem}
              onOpenUnboxing={handleTriggerUnboxing}
              onSendNewGift={() => {
                setSelectedBundleId('bundle-10');
                setIsBundleModalOpen(true);
              }}
            />
          )}

          {/* TAB 4: ME PROFILE */}
          {activeTab === 'me' && (
            <MeProfileView
              onOpenBundle={() => {
                setSelectedBundleId('bundle-10');
                setIsBundleModalOpen(true);
              }}
              onOpenEGift={() => setIsEGiftModalOpen(true)}
              onViewOrders={() => setActiveTab('orders')}
            />
          )}
        </div>

        {/* Embedded Bottom Navigation Bar within mobile frame */}
        <BottomNavBar
          activeTab={activeTab}
          onChangeTab={setActiveTab}
          ordersBadgeCount={giftsList.length}
          isPhoneFrame={isPhoneFrame}
        />
      </main>

      {/* ================= MODALS & OVERLAYS ================= */}

      {/* 1. Package Bundle Modal: Purchase 10 Pack ($40) & 20 Pack ($75) */}
      <PackageBundleModal
        isOpen={isBundleModalOpen}
        onClose={() => setIsBundleModalOpen(false)}
        selectedBundleId={selectedBundleId}
        onCompleteSendBundle={handleCompleteSendGift}
      />

      {/* 2. eGift Modal: Send Any Menu Item via Contact List */}
      <EGiftModal
        isOpen={isEGiftModalOpen}
        onClose={() => setIsEGiftModalOpen(false)}
        onOpenContactPicker={() => handleOpenContactPickerFor('egift')}
        selectedContact={selectedContact}
        onCompleteSendGift={handleCompleteSendGift}
      />

      {/* 3. Mobile Contact List Picker */}
      <ContactPickerModal
        isOpen={isContactPickerOpen}
        onClose={() => setIsContactPickerOpen(false)}
        contacts={contacts}
        onSelectContact={handleSelectContact}
        onAddNewContact={handleAddNewContact}
      />

      {/* 4. Recipient Experience: "You've Got a Gift" Animated Box & Birthday Message */}
      <GiftUnboxingModal
        isOpen={isUnboxingModalOpen}
        onClose={() => setIsUnboxingModalOpen(false)}
        gift={activeGiftForUnboxing}
        onOpenStoreRedeem={(g) => {
          setIsUnboxingModalOpen(false);
          handleOpenStoreRedeem(g);
        }}
      />

      {/* 5. In-Store Voucher Barcode/QR Code Redemption */}
      <StoreRedeemModal
        isOpen={isStoreRedeemModalOpen}
        onClose={() => setIsStoreRedeemModalOpen(false)}
        gift={activeGiftForRedeem}
        onConfirmRedeem={handleConfirmRedeem}
      />

      {/* 6. Info Modals (Story, Calorie Calc, Store Locations, Referrals) */}
      <InfoModals
        type={infoModalType}
        onClose={() => setInfoModalType(null)}
      />

      {/* 7. Reward Preview & Points Redemption Modal */}
      <RewardPreviewModal
        isOpen={isRewardModalOpen}
        onClose={() => setIsRewardModalOpen(false)}
        selectedRewardId={selectedRewardId}
        userPoints={userPoints}
        onConfirmRedeem={handleConfirmRedeemReward}
        onViewVouchers={() => {
          setActiveTab('orders');
        }}
      />
    </div>
  );
}
