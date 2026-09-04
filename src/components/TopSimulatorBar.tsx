import React from 'react';
import { Smartphone, Gift, Monitor } from 'lucide-react';

interface TopSimulatorBarProps {
  currentViewMode: 'sender' | 'recipient';
  onChangeViewMode: (mode: 'sender' | 'recipient') => void;
  isPhoneFrame: boolean;
  onTogglePhoneFrame: () => void;
  unreadGiftsCount: number;
}

export const TopSimulatorBar: React.FC<TopSimulatorBarProps> = ({
  currentViewMode,
  onChangeViewMode,
  isPhoneFrame,
  onTogglePhoneFrame,
  unreadGiftsCount,
}) => {
  return (
    <div className="w-full bg-slate-900 text-white border-b-2 border-slate-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-2.5 text-xs shadow-md z-40">
      {/* View Switcher Bento Capsule */}
      <div className="flex items-center gap-1.5 bg-slate-800/90 p-1 rounded-2xl border border-slate-700/80 shadow-inner">
        <button
          id="toggle-sender-view-btn"
          onClick={() => onChangeViewMode('sender')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all ${
            currentViewMode === 'sender'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Sender View (Alex)</span>
        </button>

        <button
          id="toggle-recipient-view-btn"
          onClick={() => onChangeViewMode('recipient')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all relative ${
            currentViewMode === 'recipient'
              ? 'bg-amber-400 text-slate-950 font-black shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Gift className="w-3.5 h-3.5" />
          <span>Recipient View (Sarah)</span>
          {unreadGiftsCount > 0 && (
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping absolute -top-0.5 -right-0.5" />
          )}
        </button>
      </div>

      {/* Frame Toggle */}
      <div className="flex items-center gap-2">
        <button
          id="toggle-phone-frame-btn"
          onClick={onTogglePhoneFrame}
          className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 text-[11px] font-bold border border-slate-700"
          title="Toggle Mobile Device Frame"
        >
          <Monitor className="w-3.5 h-3.5 text-slate-400" />
          <span className="hidden sm:inline">{isPhoneFrame ? 'Fullscreen' : 'Phone Frame'}</span>
        </button>
      </div>
    </div>
  );
};
