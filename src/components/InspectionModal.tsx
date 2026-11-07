import React, { useState } from 'react';
import { useProperty } from '../context/PropertyContext';
import { X, Calendar, Clock, Video, UserCheck, CheckCircle2, MessageSquare } from 'lucide-react';
import { getInspectionWhatsAppUrl, formatNaira } from '../utils/formatters';

export const InspectionModal: React.FC = () => {
  const { inspectionProperty, closeInspectionModal, submitInspection } = useProperty();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('11:00 AM');
  const [inspectionType, setInspectionType] = useState<'Physical Inspection' | 'Virtual Video Tour (Diaspora)'>('Physical Inspection');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!inspectionProperty) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !preferredDate) return;

    submitInspection({
      propertyId: inspectionProperty.id,
      propertyTitle: inspectionProperty.title,
      fullName,
      email,
      phone,
      preferredDate,
      preferredTime,
      inspectionType,
      notes,
    });

    setIsSubmitted(true);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    closeInspectionModal();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h2 className="text-base font-bold text-[#0B192C]">Schedule Property Inspection</h2>
            <p className="text-xs text-slate-500">
              {inspectionProperty.neighborhood}, {inspectionProperty.city}
            </p>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center space-y-5">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 font-display">
                Inspection Request Received!
              </h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                Thank you, <strong className="text-slate-900">{fullName}</strong>. Our lead inspection officer has logged your appointment for{' '}
                <strong className="text-slate-900">{preferredDate}</strong> at <strong className="text-slate-900">{preferredTime}</strong> ({inspectionType}).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-left space-y-1.5">
              <div className="font-semibold text-slate-900">Next Step: Instant WhatsApp Confirmation</div>
              <p className="text-slate-600">
                You can immediately message our desk on WhatsApp with your booking details for priority confirmation.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={getInspectionWhatsAppUrl(
                  inspectionProperty.title,
                  preferredDate,
                  inspectionType,
                  fullName
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Confirm on WhatsApp</span>
              </a>

              <button
                onClick={handleResetAndClose}
                className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Property Summary Pill */}
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center gap-3">
              <img
                src={inspectionProperty.exteriorImages[0]?.url || '/assets/aistudio/1794068151329_65be161e.jpg'}
                alt={inspectionProperty.title}
                className="w-12 h-12 rounded object-cover shrink-0"
              />
              <div className="overflow-hidden">
                <div className="text-xs font-semibold text-slate-900 truncate">
                  {inspectionProperty.title}
                </div>
                <div className="text-[11px] text-slate-500 font-mono">
                  {formatNaira(inspectionProperty.askingPrice)} · {inspectionProperty.city}
                </div>
              </div>
            </div>

            {/* Inspection Mode Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Inspection Mode</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setInspectionType('Physical Inspection')}
                  className={`p-2.5 rounded-lg border text-xs font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                    inspectionType === 'Physical Inspection'
                      ? 'border-[#0B192C] bg-[#0B192C] text-white'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Physical On-Site</span>
                </button>

                <button
                  type="button"
                  onClick={() => setInspectionType('Virtual Video Tour (Diaspora)')}
                  className={`p-2.5 rounded-lg border text-xs font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                    inspectionType === 'Virtual Video Tour (Diaspora)'
                      ? 'border-[#0B192C] bg-[#0B192C] text-white'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Video className="w-4 h-4" />
                  <span>Virtual Video Tour</span>
                </button>
              </div>
            </div>

            {/* Client Details */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chief Babatunde Adeleke"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C8A25D] focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Phone Number (WhatsApp) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+234 803 000 0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C8A25D] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="client@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C8A25D] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Preferred Date <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C8A25D] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Preferred Time
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C8A25D] focus:border-transparent bg-white"
                  >
                    <option value="09:00 AM">Morning (09:00 AM)</option>
                    <option value="11:00 AM">Mid-Day (11:00 AM)</option>
                    <option value="02:00 PM">Afternoon (02:00 PM)</option>
                    <option value="04:30 PM">Late Afternoon (04:30 PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Special Notes or Requirements (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g., Relocating from the UK next week, prefer virtual tour first with my lawyer..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#C8A25D] focus:border-transparent"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#0B192C] hover:bg-[#152a42] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-sm uppercase tracking-wider"
              >
                Confirm Inspection Booking
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
