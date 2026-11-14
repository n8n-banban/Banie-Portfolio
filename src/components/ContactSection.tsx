import React, { useState, useEffect, useMemo } from 'react';
import { PERSONAL_INFO, SERVICES } from '../data/portfolioData';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Copy,
  Check,
  Video,
  Globe,
  Download,
  ExternalLink,
  ArrowLeft,
  ArrowRight,
  CalendarPlus
} from 'lucide-react';

interface ContactSectionProps {
  initialService?: string;
  initialMessage?: string;
}

interface TimeSlotOption {
  id: string;
  hourPht: number;
  minutePht: number;
  labelPht: string;
  period: 'Morning' | 'Afternoon' | 'Evening';
}

interface BookedAppointment {
  id: string;
  dateKey: string; // YYYY-MM-DD in PHT
  slotId: string;
  startUtcIso: string;
  endUtcIso: string;
  labelPht: string;
  dateFormatted: string;
  localTimeFormatted: string;
  name: string;
  email: string;
  company: string;
  service: string;
  meetingType: 'Google Meet' | 'Zoom' | 'Phone / WhatsApp';
  notes: string;
}

const STORAGE_KEY = 'banie-booked-appointments-v1';

// Available 30-minute strategy call slots in Manila Time (PHT / UTC+8)
// Covers APAC daytime and US/EU overlap hours
const TIME_SLOTS: TimeSlotOption[] = [
  { id: '09:00', hourPht: 9, minutePht: 0, labelPht: '09:00 AM', period: 'Morning' },
  { id: '10:30', hourPht: 10, minutePht: 30, labelPht: '10:30 AM', period: 'Morning' },
  { id: '13:30', hourPht: 13, minutePht: 30, labelPht: '01:30 PM', period: 'Afternoon' },
  { id: '15:00', hourPht: 15, minutePht: 0, labelPht: '03:00 PM', period: 'Afternoon' },
  { id: '16:30', hourPht: 16, minutePht: 30, labelPht: '04:30 PM', period: 'Afternoon' },
  { id: '19:30', hourPht: 19, minutePht: 30, labelPht: '07:30 PM', period: 'Evening' },
  { id: '21:00', hourPht: 21, minutePht: 0, labelPht: '09:00 PM', period: 'Evening' },
  { id: '22:00', hourPht: 22, minutePht: 0, labelPht: '10:00 PM', period: 'Evening' }
];

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

function getManilaNowParts() {
  const now = new Date();
  const phtMs = now.getTime() + 8 * 60 * 60 * 1000;
  const pht = new Date(phtMs);
  return {
    year: pht.getUTCFullYear(),
    month: pht.getUTCMonth(),
    day: pht.getUTCDate(),
    hour: pht.getUTCHours(),
    minute: pht.getUTCMinutes()
  };
}

function toDateKey(year: number, month: number, day: number): string {
  const mm = String(month + 1).padStart(2, '0');
  const dd = String(day).padStart(2, '0');
  return `${year}-${mm}-${dd}`;
}

function parseDateKey(dateKey: string): { year: number; month: number; day: number } {
  const [y, m, d] = dateKey.split('-').map(Number);
  return { year: y, month: m - 1, day: d };
}

function getSlotUtcDate(dateKey: string, hourPht: number, minutePht: number): Date {
  const { year, month, day } = parseDateKey(dateKey);
  return new Date(Date.UTC(year, month, day, hourPht - 8, minutePht, 0));
}

function formatDateKeyPretty(dateKey: string): string {
  const { year, month, day } = parseDateKey(dateKey);
  const utcDate = new Date(Date.UTC(year, month, day, 12, 0, 0));
  return utcDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC'
  });
}

function formatIcsUtc(isoString: string): string {
  return isoString.replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
}

function getNextAvailableDateKey(): string {
  const nowPht = getManilaNowParts();
  for (let offset = 0; offset < 14; offset++) {
    const candidate = new Date(Date.UTC(nowPht.year, nowPht.month, nowPht.day + offset));
    const dayOfWeek = candidate.getUTCDay();
    if (dayOfWeek === 0) continue; // Sundays closed
    const y = candidate.getUTCFullYear();
    const m = candidate.getUTCMonth();
    const d = candidate.getUTCDate();
    if (offset === 0) {
      // Check if any slot today is at least 60 minutes from now
      const hasOpenSlotToday = TIME_SLOTS.some((slot) => {
        const slotMins = slot.hourPht * 60 + slot.minutePht;
        const nowMins = nowPht.hour * 60 + nowPht.minute + 60;
        return slotMins > nowMins;
      });
      if (!hasOpenSlotToday) continue;
    }
    return toDateKey(y, m, d);
  }
  return toDateKey(nowPht.year, nowPht.month, nowPht.day + 1);
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialService = '',
  initialMessage = ''
}) => {
  const manilaNow = useMemo(() => getManilaNowParts(), []);
  const visitorTimeZone = useMemo(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Manila',
    []
  );

  const [viewYear, setViewYear] = useState<number>(() => {
    const initialKey = getNextAvailableDateKey();
    return parseDateKey(initialKey).year;
  });
  const [viewMonth, setViewMonth] = useState<number>(() => {
    const initialKey = getNextAvailableDateKey();
    return parseDateKey(initialKey).month;
  });
  const [selectedDateKey, setSelectedDateKey] = useState<string>(() => getNextAvailableDateKey());
  const [selectedSlotId, setSelectedSlotId] = useState<string>('');
  const [step, setStep] = useState<'calendar' | 'details' | 'confirmed'>('calendar');

  const [bookedAppointments, setBookedAppointments] = useState<BookedAppointment[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? (JSON.parse(saved) as BookedAppointment[]) : [];
    } catch {
      return [];
    }
  });
  const [latestBooking, setLatestBooking] = useState<BookedAppointment | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: initialService || SERVICES[0].title,
    meetingType: 'Google Meet' as 'Google Meet' | 'Zoom' | 'Phone / WhatsApp',
    notes: initialMessage || ''
  });

  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, service: initialService }));
      if (step === 'confirmed') {
        setStep('calendar');
      }
    }
  }, [initialService]);

  useEffect(() => {
    if (initialMessage) {
      setFormData((prev) => ({ ...prev, notes: initialMessage }));
      if (step === 'confirmed') {
        setStep('calendar');
      }
    }
  }, [initialMessage]);

  const persistBookings = (next: BookedAppointment[]) => {
    setBookedAppointments(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Ignore storage quota errors
    }
  };

  const copyToClipboard = (text: string, type: 'phone' | 'email') => {
    navigator.clipboard.writeText(text);
    if (type === 'phone') {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } else {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  // Calendar grid generation for current viewMonth / viewYear
  const calendarDays = useMemo(() => {
    const firstDayOfMonth = new Date(Date.UTC(viewYear, viewMonth, 1)).getUTCDay();
    const daysInMonth = new Date(Date.UTC(viewYear, viewMonth + 1, 0)).getUTCDate();

    const todayKey = toDateKey(manilaNow.year, manilaNow.month, manilaNow.day);
    const maxDate = new Date(Date.UTC(manilaNow.year, manilaNow.month + 3, manilaNow.day));

    const cells: Array<{
      day: number | null;
      dateKey: string;
      isPast: boolean;
      isSunday: boolean;
      isTooFar: boolean;
      isToday: boolean;
      isDisabled: boolean;
      bookedCount: number;
    }> = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      cells.push({
        day: null,
        dateKey: `empty-${i}`,
        isPast: false,
        isSunday: false,
        isTooFar: false,
        isToday: false,
        isDisabled: true,
        bookedCount: 0
      });
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const dateKey = toDateKey(viewYear, viewMonth, d);
      const cellDate = new Date(Date.UTC(viewYear, viewMonth, d));
      const dayOfWeek = cellDate.getUTCDay();
      const isSunday = dayOfWeek === 0;
      const isPast = dateKey < todayKey;
      const isTooFar = cellDate > maxDate;
      const isToday = dateKey === todayKey;

      const bookedCount = bookedAppointments.filter((b) => b.dateKey === dateKey).length;
      const allSlotsTakenOrPassed =
        bookedCount >= TIME_SLOTS.length ||
        (isToday &&
          TIME_SLOTS.every((slot) => {
            const slotMins = slot.hourPht * 60 + slot.minutePht;
            const nowMins = manilaNow.hour * 60 + manilaNow.minute + 60;
            return slotMins <= nowMins;
          }));

      cells.push({
        day: d,
        dateKey,
        isPast,
        isSunday,
        isTooFar,
        isToday,
        isDisabled: isPast || isSunday || isTooFar || allSlotsTakenOrPassed,
        bookedCount
      });
    }

    return cells;
  }, [viewYear, viewMonth, manilaNow, bookedAppointments]);

  const canGoPrevMonth =
    viewYear > manilaNow.year || (viewYear === manilaNow.year && viewMonth > manilaNow.month);

  const maxViewMonthDate = new Date(Date.UTC(manilaNow.year, manilaNow.month + 3, 1));
  const currentViewMonthDate = new Date(Date.UTC(viewYear, viewMonth, 1));
  const canGoNextMonth = currentViewMonthDate < maxViewMonthDate;

  const handlePrevMonth = () => {
    if (!canGoPrevMonth) return;
    if (viewMonth === 0) {
      setViewYear((y) => y - 1);
      setViewMonth(11);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (!canGoNextMonth) return;
    if (viewMonth === 11) {
      setViewYear((y) => y + 1);
      setViewMonth(0);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const isSlotUnavailable = (dateKey: string, slot: TimeSlotOption): boolean => {
    const isAlreadyBooked = bookedAppointments.some(
      (b) => b.dateKey === dateKey && b.slotId === slot.id
    );
    if (isAlreadyBooked) return true;

    const todayKey = toDateKey(manilaNow.year, manilaNow.month, manilaNow.day);
    if (dateKey === todayKey) {
      const slotMins = slot.hourPht * 60 + slot.minutePht;
      const nowMins = manilaNow.hour * 60 + manilaNow.minute + 60;
      if (slotMins <= nowMins) return true;
    }
    return false;
  };

  const selectedSlot = useMemo(
    () => TIME_SLOTS.find((s) => s.id === selectedSlotId) || null,
    [selectedSlotId]
  );

  const selectedSlotLocalPreview = useMemo(() => {
    if (!selectedSlot || !selectedDateKey) return '';
    const instant = getSlotUtcDate(selectedDateKey, selectedSlot.hourPht, selectedSlot.minutePht);
    return instant.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZoneName: 'short'
    });
  }, [selectedDateKey, selectedSlot]);

  const handleSelectDate = (dateKey: string) => {
    setSelectedDateKey(dateKey);
    // Clear slot if it's unavailable on the new date
    if (selectedSlotId) {
      const slotObj = TIME_SLOTS.find((s) => s.id === selectedSlotId);
      if (slotObj && isSlotUnavailable(dateKey, slotObj)) {
        setSelectedSlotId('');
      }
    }
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot || !formData.name.trim() || !formData.email.trim()) return;

    const startInstant = getSlotUtcDate(
      selectedDateKey,
      selectedSlot.hourPht,
      selectedSlot.minutePht
    );
    const endInstant = new Date(startInstant.getTime() + 30 * 60 * 1000);
    const dateFormatted = formatDateKeyPretty(selectedDateKey);
    const refCode = `BN-${selectedDateKey.replace(/-/g, '')}-${selectedSlot.id.replace(':', '')}`;

    const newBooking: BookedAppointment = {
      id: refCode,
      dateKey: selectedDateKey,
      slotId: selectedSlot.id,
      startUtcIso: startInstant.toISOString(),
      endUtcIso: endInstant.toISOString(),
      labelPht: selectedSlot.labelPht,
      dateFormatted,
      localTimeFormatted: selectedSlotLocalPreview,
      name: formData.name.trim(),
      email: formData.email.trim(),
      company: formData.company.trim(),
      service: formData.service,
      meetingType: formData.meetingType,
      notes: formData.notes.trim()
    };

    const nextList = [
      ...bookedAppointments.filter(
        (b) => !(b.dateKey === newBooking.dateKey && b.slotId === newBooking.slotId)
      ),
      newBooking
    ];
    persistBookings(nextList);
    setLatestBooking(newBooking);
    setStep('confirmed');
  };

  const handleDownloadIcs = (booking: BookedAppointment) => {
    const description = [
      `Strategy Consultation with ${PERSONAL_INFO.name}`,
      `Reference: ${booking.id}`,
      `Client: ${booking.name} (${booking.email})`,
      booking.company ? `Company: ${booking.company}` : '',
      `Topic: ${booking.service}`,
      `Format: ${booking.meetingType}`,
      booking.notes ? `Notes: ${booking.notes}` : ''
    ]
      .filter(Boolean)
      .join('\\n');

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Banie Necesario Portfolio//Strategy Booking//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:${booking.id}@banienecesario.com`,
      `DTSTAMP:${formatIcsUtc(new Date().toISOString())}`,
      `DTSTART:${formatIcsUtc(booking.startUtcIso)}`,
      `DTEND:${formatIcsUtc(booking.endUtcIso)}`,
      `SUMMARY:AI & Workflow Strategy Call — ${booking.name}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${booking.meetingType}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `strategy-consultation-${booking.dateKey}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getGoogleCalendarUrl = (booking: BookedAppointment): string => {
    const start = formatIcsUtc(booking.startUtcIso);
    const end = formatIcsUtc(booking.endUtcIso);
    const details = [
      `Booking Ref: ${booking.id}`,
      `Topic: ${booking.service}`,
      `Format: ${booking.meetingType}`,
      `Client: ${booking.name} (${booking.email})`,
      booking.company ? `Company: ${booking.company}` : '',
      booking.notes ? `\nAgenda / Notes:\n${booking.notes}` : ''
    ]
      .filter(Boolean)
      .join('\n');

    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: `Strategy Consultation with Banie Necesario — ${booking.service}`,
      dates: `${start}/${end}`,
      details,
      location: booking.meetingType,
      add: PERSONAL_INFO.email
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };

  const getBookingMailtoUrl = (booking: BookedAppointment): string => {
    const subject = `Appointment Confirmation (${booking.id}): ${booking.dateFormatted} at ${booking.labelPht} PHT`;
    const body = [
      `Hi Banie,`,
      ``,
      `I just booked a 30-minute Strategy Consultation through your portfolio calendar:`,
      ``,
      `• Reference ID: ${booking.id}`,
      `• Date: ${booking.dateFormatted}`,
      `• Time: ${booking.labelPht} PHT (GMT+8)`,
      `• My Local Time: ${booking.localTimeFormatted}`,
      `• Format: ${booking.meetingType}`,
      `• Topic: ${booking.service}`,
      `• Name: ${booking.name}`,
      `• Email: ${booking.email}`,
      `• Company: ${booking.company || 'N/A'}`,
      ``,
      `Notes / Workflow Goals:`,
      `${booking.notes || 'Looking forward to discussing automation workflows.'}`,
      ``,
      `Best regards,`,
      `${booking.name}`
    ].join('\n');

    return `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleBookAnother = () => {
    setSelectedSlotId('');
    setStep('calendar');
  };

  const handleReleaseSlot = (bookingId: string) => {
    const remaining = bookedAppointments.filter((b) => b.id !== bookingId);
    persistBookings(remaining);
    setLatestBooking(null);
    setSelectedSlotId('');
    setStep('calendar');
  };

  return (
    <section
      id="contact"
      className="py-20 md:py-28 bg-[#F4F7FB] dark:bg-[#060D1A] relative border-t border-slate-200 dark:border-blue-950 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left 5 Cols: Direct Contact Info & Availability */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2 font-semibold">
                05. Get In Touch &amp; Book
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-4 [text-wrap:balance]">
                Let's automate your repetitive operations.
              </h2>
              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Pick a convenient date and time on the booking calendar to schedule a 30-minute discovery call, or reach out directly via phone or email.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-4">
              {/* Phone Card */}
              <div className="p-4 rounded-xl bg-white dark:bg-[#0B1830] border border-slate-200/90 dark:border-blue-900/50 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 text-blue-600 dark:text-blue-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Direct Mobile / WhatsApp</div>
                    <a
                      href={`tel:${PERSONAL_INFO.phone}`}
                      className="text-sm sm:text-base font-mono font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {PERSONAL_INFO.phoneFormatted}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => copyToClipboard(PERSONAL_INFO.phone, 'phone')}
                  className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#0E2040] transition-colors active:scale-90"
                  title="Copy Phone Number"
                  aria-label="Copy Phone Number"
                >
                  {copiedPhone ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Email Card */}
              <div className="p-4 rounded-xl bg-white dark:bg-[#0B1830] border border-slate-200/90 dark:border-blue-900/50 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 text-blue-600 dark:text-blue-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Direct Email Address</div>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="text-sm sm:text-base font-mono font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => copyToClipboard(PERSONAL_INFO.email, 'email')}
                  className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#0E2040] transition-colors active:scale-90"
                  title="Copy Email Address"
                  aria-label="Copy Email Address"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Location Card */}
              <div className="p-4 rounded-xl bg-white dark:bg-[#0B1830] border border-slate-200/90 dark:border-blue-900/50 flex items-center gap-3.5 shadow-sm">
                <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-[#0E2040] text-blue-600 dark:text-blue-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Base Location &amp; Timezone</div>
                  <div className="text-xs sm:text-sm font-medium text-slate-900 dark:text-white">
                    {PERSONAL_INFO.location}
                  </div>
                </div>
              </div>

              {/* Consultation Availability Card */}
              <div className="p-4 rounded-xl bg-white dark:bg-[#0B1830] border border-slate-200/90 dark:border-blue-900/50 flex items-center gap-3.5 shadow-sm">
                <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-[#0E2040] text-emerald-600 dark:text-emerald-400">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Appointment Hours</div>
                  <div className="text-xs sm:text-sm font-medium text-slate-900 dark:text-white">
                    Mon – Sat · 09:00 AM – 10:30 PM PHT (GMT+8)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right 7 Cols: Interactive Appointment Booking Calendar */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-white dark:bg-[#0B1830] border border-slate-200/90 dark:border-blue-900/50 p-5 sm:p-8 shadow-xl shadow-blue-950/5 dark:shadow-2xl relative">
              {/* Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-6 border-b border-slate-200 dark:border-blue-950">
                <div>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                      Book a Strategy Consultation
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    30-minute 1-on-1 workflow audit · Free &amp; no commitment required
                  </p>
                </div>

                {step !== 'confirmed' && (
                  <div className="flex items-center gap-1.5 text-[11px] font-mono">
                    <span
                      className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                        step === 'calendar'
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 dark:bg-[#0E2040] text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      1. Date &amp; Time
                    </span>
                    <span className="text-slate-400">→</span>
                    <span
                      className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                        step === 'details'
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 dark:bg-[#0E2040] text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      2. Your Details
                    </span>
                  </div>
                )}
              </div>

              {/* STEP 1: INTERACTIVE CALENDAR + TIME SLOTS */}
              {step === 'calendar' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Calendar Grid (7 cols) */}
                    <div className="md:col-span-7 bg-slate-50/80 dark:bg-[#071324] border border-slate-200 dark:border-blue-950 rounded-xl p-4">
                      {/* Month Switcher */}
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          {MONTH_NAMES[viewMonth]} {viewYear}
                        </h4>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={handlePrevMonth}
                            disabled={!canGoPrevMonth}
                            aria-label="Previous month"
                            className="p-1.5 rounded-lg border border-slate-200 dark:border-blue-900/60 bg-white dark:bg-[#0B1830] text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-[#112346] disabled:opacity-35 disabled:pointer-events-none transition-colors active:scale-95"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={handleNextMonth}
                            disabled={!canGoNextMonth}
                            aria-label="Next month"
                            className="p-1.5 rounded-lg border border-slate-200 dark:border-blue-900/60 bg-white dark:bg-[#0B1830] text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-[#112346] disabled:opacity-35 disabled:pointer-events-none transition-colors active:scale-95"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Weekday Headers */}
                      <div className="grid grid-cols-7 gap-1 mb-2 text-center">
                        {WEEKDAYS.map((day) => (
                          <div
                            key={day}
                            className={`text-[11px] font-mono font-semibold py-1 ${
                              day === 'Sun'
                                ? 'text-slate-400 dark:text-slate-600'
                                : 'text-slate-500 dark:text-slate-400'
                            }`}
                          >
                            {day}
                          </div>
                        ))}
                      </div>

                      {/* Day Cells */}
                      <div className="grid grid-cols-7 gap-1">
                        {calendarDays.map((cell) => {
                          if (cell.day === null) {
                            return <div key={cell.dateKey} className="h-9 sm:h-10" />;
                          }

                          const isSelected = selectedDateKey === cell.dateKey;

                          return (
                            <button
                              key={cell.dateKey}
                              type="button"
                              disabled={cell.isDisabled}
                              onClick={() => handleSelectDate(cell.dateKey)}
                              aria-label={`Select ${formatDateKeyPretty(cell.dateKey)}`}
                              aria-pressed={isSelected}
                              className={`relative h-9 sm:h-10 rounded-lg text-xs sm:text-sm font-medium flex flex-col items-center justify-center transition-all duration-150 ${
                                isSelected
                                  ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30 scale-[1.03]'
                                  : cell.isDisabled
                                    ? 'text-slate-300 dark:text-slate-700 cursor-not-allowed'
                                    : 'text-slate-800 dark:text-slate-200 bg-white dark:bg-[#0B1830] border border-slate-200/80 dark:border-blue-900/40 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 active:scale-95'
                              }`}
                            >
                              <span className="tabular-nums leading-none">{cell.day}</span>
                              {cell.isToday && (
                                <span
                                  className={`w-1 h-1 rounded-full mt-0.5 ${
                                    isSelected ? 'bg-white' : 'bg-blue-500'
                                  }`}
                                />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Legend */}
                      <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-blue-950 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" />
                          Available (Mon–Sat)
                        </span>
                        <span className="flex items-center gap-1.5 font-mono">
                          <Globe className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                          GMT+8 (Manila)
                        </span>
                      </div>
                    </div>

                    {/* Time Slots Panel (5 cols) */}
                    <div className="md:col-span-5 flex flex-col">
                      <div className="mb-3">
                        <div className="text-[11px] font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 font-semibold">
                          Select Time (PHT / GMT+8)
                        </div>
                        <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                          {formatDateKeyPretty(selectedDateKey)}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-1 gap-2 flex-1 max-h-[280px] overflow-y-auto pr-1">
                        {TIME_SLOTS.map((slot) => {
                          const unavailable = isSlotUnavailable(selectedDateKey, slot);
                          const isSelected = selectedSlotId === slot.id;
                          return (
                            <button
                              key={slot.id}
                              type="button"
                              disabled={unavailable}
                              onClick={() => setSelectedSlotId(slot.id)}
                              className={`w-full px-3 py-2.5 rounded-xl border text-left flex items-center justify-between transition-all duration-150 ${
                                unavailable
                                  ? 'bg-slate-100 dark:bg-[#071120] border-slate-200/60 dark:border-blue-950/60 text-slate-400 dark:text-slate-600 cursor-not-allowed line-through'
                                  : isSelected
                                    ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-600/25 font-semibold'
                                    : 'bg-slate-50 dark:bg-[#071324] border-slate-200 dark:border-blue-900/50 text-slate-800 dark:text-slate-200 hover:border-blue-500 hover:bg-blue-50/60 dark:hover:bg-[#0E2245] active:scale-[0.98]'
                              }`}
                            >
                              <span className="text-xs sm:text-sm font-mono tabular-nums">
                                {slot.labelPht}
                              </span>
                              <span
                                className={`text-[10px] font-mono uppercase ${
                                  unavailable
                                    ? 'text-slate-400 dark:text-slate-600 no-underline'
                                    : isSelected
                                      ? 'text-blue-100'
                                      : 'text-slate-500 dark:text-slate-400'
                                }`}
                              >
                                {unavailable ? 'Booked' : slot.period}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Selected Slot Preview + Continue CTA */}
                  <div className="pt-4 border-t border-slate-200 dark:border-blue-950 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="text-xs text-slate-600 dark:text-slate-300">
                      {selectedSlot ? (
                        <div>
                          <div className="font-semibold text-slate-900 dark:text-white">
                            Selected: {formatDateKeyPretty(selectedDateKey)} at {selectedSlot.labelPht} PHT
                          </div>
                          {visitorTimeZone !== 'Asia/Manila' && (
                            <div className="text-[11px] text-blue-600 dark:text-blue-400 font-mono mt-0.5">
                              Your local time ({visitorTimeZone}): {selectedSlotLocalPreview}
                            </div>
                          )}
                        </div>
                      ) : (
                        <span>Choose an available date and time slot to proceed.</span>
                      )}
                    </div>

                    <button
                      type="button"
                      disabled={!selectedSlot}
                      onClick={() => setStep('details')}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 disabled:bg-slate-300 dark:disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed rounded-xl transition-all shadow-md shadow-blue-600/20 disabled:shadow-none active:scale-95 shrink-0"
                    >
                      <span>Continue to Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: CLIENT DETAILS FORM */}
              {step === 'details' && selectedSlot && (
                <form onSubmit={handleConfirmBooking} className="space-y-4">
                  {/* Selected Appointment Summary Bar */}
                  <div className="p-3.5 rounded-xl bg-blue-50/90 dark:bg-[#0E2245] border border-blue-200 dark:border-blue-800/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-blue-600 text-white shrink-0">
                        <CalendarIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                          {formatDateKeyPretty(selectedDateKey)} · {selectedSlot.labelPht} PHT (30 min)
                        </div>
                        {visitorTimeZone !== 'Asia/Manila' && (
                          <div className="text-[11px] font-mono text-blue-700 dark:text-blue-300">
                            Local ({visitorTimeZone}): {selectedSlotLocalPreview}
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setStep('calendar')}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 dark:text-blue-300 hover:underline shrink-0 self-start sm:self-center"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Change Slot</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="booking-name" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Your Full Name *
                      </label>
                      <input
                        id="booking-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Mercer"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#071324] border border-slate-300 dark:border-blue-950 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="booking-email" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Work Email Address *
                      </label>
                      <input
                        id="booking-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#071324] border border-slate-300 dark:border-blue-950 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="booking-company" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Company or Project Name
                      </label>
                      <input
                        id="booking-company"
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. Apex Media Labs"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#071324] border border-slate-300 dark:border-blue-950 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="booking-service" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Consultation Topic
                      </label>
                      <select
                        id="booking-service"
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#071324] border border-slate-300 dark:border-blue-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                      >
                        {SERVICES.map((s) => (
                          <option key={s.id} value={s.title} className="bg-white dark:bg-[#0B1830] text-slate-900 dark:text-white">
                            {s.title}
                          </option>
                        ))}
                        <option value="Custom API / Webhook Integration" className="bg-white dark:bg-[#0B1830] text-slate-900 dark:text-white">
                          Custom API / Webhook Integration
                        </option>
                        <option value="Full-Time Operations / Automation Role" className="bg-white dark:bg-[#0B1830] text-slate-900 dark:text-white">
                          Full-Time Operations / Automation Role
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Preferred Meeting Platform */}
                  <div>
                    <span className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      Preferred Meeting Platform
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {(['Google Meet', 'Zoom', 'Phone / WhatsApp'] as const).map((platform) => {
                        const active = formData.meetingType === platform;
                        return (
                          <button
                            key={platform}
                            type="button"
                            onClick={() => setFormData({ ...formData, meetingType: platform })}
                            className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border text-xs font-semibold transition-all active:scale-95 ${
                              active
                                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                                : 'bg-slate-50 dark:bg-[#071324] border-slate-300 dark:border-blue-950 text-slate-700 dark:text-slate-300 hover:border-blue-400'
                            }`}
                          >
                            {platform === 'Phone / WhatsApp' ? (
                              <Phone className="w-3.5 h-3.5 shrink-0" />
                            ) : (
                              <Video className="w-3.5 h-3.5 shrink-0" />
                            )}
                            <span className="truncate">{platform}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="booking-notes" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      What would you like to automate or discuss?
                    </label>
                    <textarea
                      id="booking-notes"
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Share your current tools (e.g. n8n, Zapier, Make, GHL, Asana) and workflow goals..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#071324] border border-slate-300 dark:border-blue-950 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      onClick={() => setStep('calendar')}
                      className="sm:w-1/3 py-3 px-4 text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-[#0E2040] hover:bg-slate-200 dark:hover:bg-blue-900/60 rounded-xl transition-colors active:scale-95"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="sm:w-2/3 flex items-center justify-center gap-2 py-3 px-6 text-xs font-semibold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-xl transition-all shadow-md shadow-blue-600/20 active:scale-95 duration-150"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Confirm Appointment Booking</span>
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 3: BOOKING CONFIRMED */}
              {step === 'confirmed' && latestBooking && (
                <div className="py-4 space-y-6">
                  <div className="text-center space-y-2">
                    <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-400/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                      Appointment Confirmed!
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                      Your 30-minute strategy call is reserved. Save it to your calendar below or send the confirmation directly to Banie.
                    </p>
                  </div>

                  {/* Structured Appointment Card */}
                  <div className="rounded-xl bg-slate-50 dark:bg-[#071324] border border-slate-200 dark:border-blue-900/60 p-4 sm:p-5 space-y-3 text-sm">
                    <div className="flex items-center justify-between pb-2.5 border-b border-slate-200 dark:border-blue-950">
                      <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Booking Reference
                      </span>
                      <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                        {latestBooking.id}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <div className="text-slate-500 dark:text-slate-400 mb-0.5">Date &amp; Time (PHT)</div>
                        <div className="font-semibold text-slate-900 dark:text-white">
                          {latestBooking.dateFormatted} · {latestBooking.labelPht}
                        </div>
                        {visitorTimeZone !== 'Asia/Manila' && (
                          <div className="text-[11px] font-mono text-blue-600 dark:text-blue-400 mt-0.5">
                            Your time: {latestBooking.localTimeFormatted}
                          </div>
                        )}
                      </div>

                      <div>
                        <div className="text-slate-500 dark:text-slate-400 mb-0.5">Meeting Format</div>
                        <div className="font-semibold text-slate-900 dark:text-white">
                          {latestBooking.meetingType} (30 minutes)
                        </div>
                      </div>

                      <div>
                        <div className="text-slate-500 dark:text-slate-400 mb-0.5">Booked By</div>
                        <div className="font-semibold text-slate-900 dark:text-white">
                          {latestBooking.name}
                        </div>
                        <div className="text-slate-500 dark:text-slate-400">{latestBooking.email}</div>
                      </div>

                      <div>
                        <div className="text-slate-500 dark:text-slate-400 mb-0.5">Consultation Topic</div>
                        <div className="font-semibold text-slate-900 dark:text-white">
                          {latestBooking.service}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Calendar Export + Email Actions */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <a
                      href={getGoogleCalendarUrl(latestBooking)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all active:scale-95"
                    >
                      <CalendarPlus className="w-4 h-4 shrink-0" />
                      <span>Google Calendar</span>
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>

                    <button
                      type="button"
                      onClick={() => handleDownloadIcs(latestBooking)}
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-[#0E2040] hover:bg-slate-200 dark:hover:bg-blue-900/70 border border-slate-200 dark:border-blue-800/70 rounded-xl transition-all active:scale-95"
                    >
                      <Download className="w-4 h-4 shrink-0 text-blue-600 dark:text-blue-400" />
                      <span>Download .ICS</span>
                    </button>

                    <a
                      href={getBookingMailtoUrl(latestBooking)}
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-[#0E2040] hover:bg-slate-200 dark:hover:bg-blue-900/70 border border-slate-200 dark:border-blue-800/70 rounded-xl transition-all active:scale-95"
                    >
                      <Mail className="w-4 h-4 shrink-0 text-blue-600 dark:text-blue-400" />
                      <span>Email Banie</span>
                    </a>
                  </div>

                  {/* Bottom Reschedule / New Booking Controls */}
                  <div className="pt-3 border-t border-slate-200 dark:border-blue-950 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <button
                      type="button"
                      onClick={() => handleReleaseSlot(latestBooking.id)}
                      className="text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 font-medium transition-colors"
                    >
                      Cancel &amp; Reschedule Slot
                    </button>
                    <button
                      type="button"
                      onClick={handleBookAnother}
                      className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                    >
                      Book Another Appointment →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
