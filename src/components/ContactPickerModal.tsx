import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Search,
  UserPlus,
  Phone,
  Check,
  Smartphone,
  Sparkles,
} from 'lucide-react';
import { MobileContact } from '../types';

interface ContactPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  contacts: MobileContact[];
  onSelectContact: (contact: MobileContact) => void;
  onAddNewContact: (newContact: MobileContact) => void;
}

export const ContactPickerModal: React.FC<ContactPickerModalProps> = ({
  isOpen,
  onClose,
  contacts,
  onSelectContact,
  onAddNewContact,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');

  if (!isOpen) return null;

  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm)
  );

  const handleNativeContactPicker = async () => {
    if ('contacts' in navigator && 'ContactsManager' in window) {
      try {
        const props = ['name', 'tel'];
        const opts = { multiple: false };
        // @ts-expect-error - Contact Picker API
        const selected = await navigator.contacts.select(props, opts);
        if (selected && selected[0]) {
          const item = selected[0];
          const name = item.name ? item.name[0] : 'Friend';
          const tel = item.tel ? item.tel[0] : '+65 9123 0000';
          const customContact: MobileContact = {
            id: `c-native-${Date.now()}`,
            name,
            phone: tel,
            initials: name.substring(0, 2).toUpperCase(),
            tag: 'Device Contact',
          };
          onAddNewContact(customContact);
          onSelectContact(customContact);
        }
      } catch (err) {
        console.log('Native contact selection cancelled or failed', err);
      }
    } else {
      setShowAddForm(true);
    }
  };

  const handleCreateContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newPhone.trim()) return;
    const newContact: MobileContact = {
      id: `c-custom-${Date.now()}`,
      name: newName.trim(),
      phone: newPhone.trim().startsWith('+') ? newPhone.trim() : `+65 ${newPhone.trim()}`,
      initials: newName.substring(0, 2).toUpperCase(),
      tag: 'New Contact',
    };
    onAddNewContact(newContact);
    onSelectContact(newContact);
    setShowAddForm(false);
    setNewName('');
    setNewPhone('');
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

        {/* Bottom sheet / Modal */}
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl z-10 max-h-[88vh] flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="p-4 border-b border-neutral-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-neutral-900 text-base">
                  Select Mobile Contact
                </h3>
                <p className="text-[11px] text-neutral-500">
                  Send tea & package bundles directly to their phone
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-500 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Search bar & Native Phone Sync button */}
          <div className="p-4 bg-neutral-50/70 border-b border-neutral-100 space-y-2">
            <div className="relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by friend's name or mobile number..."
                className="w-full pl-10 pr-4 py-2 bg-white border border-neutral-200 rounded-xl text-xs text-neutral-900 placeholder-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                id="native-contact-sync-btn"
                onClick={handleNativeContactPicker}
                className="flex-1 py-1.5 px-3 rounded-lg bg-white border border-neutral-200 text-[11px] font-bold text-neutral-700 hover:bg-neutral-100 active:scale-98 transition-all flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <Smartphone className="w-3.5 h-3.5 text-rose-500" />
                <span>Import from Device Contacts</span>
              </button>

              <button
                id="manual-add-contact-btn"
                onClick={() => setShowAddForm(!showAddForm)}
                className="py-1.5 px-3 rounded-lg bg-rose-50 border border-rose-200 text-[11px] font-bold text-rose-700 hover:bg-rose-100 transition-colors flex items-center justify-center gap-1"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>{showAddForm ? 'Cancel' : 'New Contact'}</span>
              </button>
            </div>
          </div>

          {/* Optional Add Contact Form */}
          {showAddForm && (
            <form
              onSubmit={handleCreateContact}
              className="p-4 bg-amber-50/50 border-b border-amber-200/60 space-y-2.5 animate-fadeIn"
            >
              <div className="text-xs font-bold text-amber-900 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-600" />
                <span>Add Contact Manually</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  required
                  placeholder="Friend's Name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="px-3 py-1.5 bg-white border border-neutral-200 rounded-lg text-xs"
                />
                <input
                  type="tel"
                  required
                  placeholder="Mobile (e.g. 9123 4567)"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="px-3 py-1.5 bg-white border border-neutral-200 rounded-lg text-xs"
                />
              </div>
              <button
                type="submit"
                className="w-full py-1.5 bg-rose-600 text-white rounded-lg text-xs font-bold hover:bg-rose-700 shadow-xs"
              >
                Save & Select Recipient
              </button>
            </form>
          )}

          {/* Contact List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2 divide-y divide-neutral-100">
            {filteredContacts.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-full bg-neutral-100 text-neutral-400 mx-auto flex items-center justify-center mb-2">
                  <Search className="w-5 h-5" />
                </div>
                <p className="text-xs font-semibold text-neutral-600">No contacts found</p>
                <p className="text-[11px] text-neutral-400 mt-0.5">
                  Try another search or add a new mobile number
                </p>
              </div>
            ) : (
              filteredContacts.map((contact) => (
                <motion.div
                  key={contact.id}
                  whileHover={{ backgroundColor: 'rgba(255, 241, 242, 0.5)' }}
                  onClick={() => onSelectContact(contact)}
                  className="pt-2 pb-2 flex items-center justify-between cursor-pointer rounded-xl px-2 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-500 to-amber-500 text-white font-bold flex items-center justify-center text-xs shadow-xs">
                      {contact.initials}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs font-extrabold text-neutral-900 group-hover:text-rose-600 transition-colors">
                          {contact.name}
                        </h4>
                        {contact.tag && (
                          <span
                            className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${
                              contact.tag.includes('Birthday')
                                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                : 'bg-neutral-100 text-neutral-600'
                            }`}
                          >
                            {contact.tag}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-neutral-500 flex items-center gap-1 mt-0.5">
                        <Phone className="w-3 h-3 text-neutral-400" />
                        <span>{contact.phone}</span>
                      </p>
                    </div>
                  </div>

                  <div className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-300 group-hover:border-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-all shadow-2xs">
                    <Check className="w-4 h-4" />
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
