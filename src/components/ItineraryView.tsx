import React, { useState, FormEvent } from "react";
import { 
  Calendar, 
  MapPin, 
  Users, 
  Car, 
  Compass, 
  Clock, 
  Navigation, 
  Coffee, 
  Utensils, 
  Moon, 
  CheckCircle2, 
  AlertCircle, 
  Printer, 
  Share2, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight,
  TrendingUp,
  DollarSign,
  Phone,
  MessageSquare
} from "lucide-react";
import { ItineraryResponse } from "../types";

interface ItineraryViewProps {
  itinerary: ItineraryResponse;
  onReset: () => void;
}

// Map some key search keywords to beautiful travel images
const DESTINATION_IMAGES: { [key: string]: string } = {
  "shimla": "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=800",
  "manali": "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=800",
  "munnar": "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80&w=800",
  "coorg": "https://images.unsplash.com/photo-1588612140660-fbf8f58b8f2c?auto=format&fit=crop&q=80&w=800",
  "jaipur": "https://images.unsplash.com/photo-1477584308802-e9c37c6a4120?auto=format&fit=crop&q=80&w=800",
  "goa": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800",
  "kerala": "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80&w=800",
  "agra": "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=800",
  "delhi": "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=800"
};

export default function ItineraryView({ itinerary, onReset }: ItineraryViewProps) {
  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  const [copiedLink, setCopiedLink] = useState(false);
  const [exportedPdfStatus, setExportedPdfStatus] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [whatsappPhone, setWhatsappPhone] = useState("");
  const [whatsappSent, setWhatsappSent] = useState(false);

  const getWhatsAppMessage = () => {
    let message = `*🌟 imveloTripsIndia Custom Itinerary 🌟*\n\n`;
    message += `*Route:* ${itinerary.pickupLocation} ➡️ ${itinerary.destination}\n`;
    message += `*Duration:* ${itinerary.days.length} Days / ${itinerary.days.length - 1} Nights\n`;
    message += `*Vehicle Class:* ${itinerary.vehicleType}\n`;
    if (itinerary.estimatedCostRange) {
      message += `*Est. Package Cost:* ₹${new Intl.NumberFormat('en-IN').format(itinerary.estimatedCostRange.min)} - ₹${new Intl.NumberFormat('en-IN').format(itinerary.estimatedCostRange.max)} INR\n`;
    }
    message += `\n*TRIP SUMMARY:*\n${itinerary.tripSummary}\n\n`;
    
    message += `*DAILY BREAKDOWN:*\n`;
    itinerary.days.forEach((day: any) => {
      message += `📅 *Day ${day.dayNumber} - ${day.title}*\n`;
      message += `• Morning: ${day.morningActivity.activityName}\n`;
      message += `• Afternoon: ${day.afternoonActivity.activityName}\n`;
      message += `• Night Stay: ${day.nightStay}\n\n`;
    });
    
    if (itinerary.tips && itinerary.tips.length > 0) {
      message += `*PRO TRAVEL TIPS:*\n`;
      itinerary.tips.forEach((tip: string, id: number) => {
        message += `${id + 1}. ${tip}\n`;
      });
      message += `\n`;
    }
    
    message += `📞 *Book/Inquire Now:* +919895712912\n`;
    message += `🔗 *View Interactive Live Itinerary:* ${window.location.href}`;
    return message;
  };

  // Determine beautiful backdrop image
  const getDestinationImage = () => {
    const destLower = itinerary.destination.toLowerCase();
    for (const key in DESTINATION_IMAGES) {
      if (destLower.includes(key)) {
        return DESTINATION_IMAGES[key];
      }
    }
    // Elegant fallback nature/scenic photo
    return "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800";
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 400);
  };

  const handleExportPDF = () => {
    setExportedPdfStatus(true);
    setIsPrinting(true);
    setTimeout(() => {
      setExportedPdfStatus(false);
      window.print();
      setIsPrinting(false);
    }, 600);
  };

  const toggleDayExpansion = (dayNum: number) => {
    setExpandedDay(expandedDay === dayNum ? null : dayNum);
  };

  return (
    <div id="itinerary-result-section" className="space-y-6 scroll-mt-24">
      
      {/* Exclusive Print-Only Header Branding */}
      <div className="hidden print:flex items-center justify-between border-b-2 border-slate-200 pb-5 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-sm">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-black text-slate-800 tracking-tight">
              imveloTripsIndia
            </span>
            <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">Premium Chauffeured Travel Services</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-black tracking-widest text-[#0e7490] bg-[#f0f9ff] border border-[#bae6fd] px-3 py-1 rounded-md">
            PRIVATE TOUR PLAN
          </span>
          <p className="text-[9px] text-slate-400 mt-1.5 font-semibold">Chauffeur Allowance &amp; Fuel Covered</p>
        </div>
      </div>
      
      {/* 1. Header Hero Card with Frosted Glass Overlay */}
      <div className="relative rounded-3xl overflow-hidden h-[260px] sm:h-[320px] shadow-xl border border-white/20">
        <img 
          src={getDestinationImage()} 
          alt={itinerary.destination} 
          className="w-full h-full object-cover absoulte inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-900/10" />
        
        {/* Absolute top action triggers */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10 no-print">
          <button
            onClick={onReset}
            className="px-4 py-2 bg-slate-900/40 hover:bg-slate-900/60 backdrop-blur-md text-white text-xs font-bold rounded-xl border border-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            &larr; Search Different Route
          </button>
          
          <div className="flex gap-2">
            <button
              onClick={handleCopyLink}
              className="p-2 sm:px-3 sm:py-2 bg-white/15 hover:bg-white/25 backdrop-blur-md text-white rounded-xl border border-white/15 transition-all text-xs font-bold whitespace-nowrap flex items-center gap-1 cursor-pointer"
              title="Copy link"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{copiedLink ? "Link Copied!" : "Share Link"}</span>
            </button>
            <button
              onClick={handleExportPDF}
              className="p-2 sm:px-3 sm:py-2 bg-emerald-600/90 hover:bg-emerald-600 backdrop-blur-md text-white rounded-xl border border-emerald-500/30 transition-all text-xs font-bold flex items-center gap-1 cursor-pointer shadow-lg"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{exportedPdfStatus ? "Preparing PDF..." : "Export PDF / Print"}</span>
            </button>
          </div>
        </div>

        {/* Heading details inside image cover */}
        <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 bg-emerald-500/20 backdrop-blur-md text-emerald-300 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-500/20">
              💎 Premium AI Plan
            </span>
            <span className="px-2.5 py-0.5 bg-sky-500/20 backdrop-blur-md text-sky-300 text-[10px] font-black uppercase tracking-widest rounded-full border border-sky-500/20">
              {itinerary.tripType}
            </span>
          </div>
          
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Ultimate {itinerary.destination} Getaway
          </h1>
          
          <p className="text-slate-200/95 text-xs sm:text-sm max-w-2xl flex flex-wrap items-center gap-y-1 gap-x-3 font-medium">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
              From {itinerary.pickupLocation}
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4 text-sky-400 shrink-0" />
              Departs {itinerary.travelDate}
            </span>
            <span>&bull;</span>
            <span className="bg-white/10 px-2 py-0.5 rounded-md font-mono text-[11px] text-white">
              {itinerary.days.length} Days / {itinerary.days.length - 1} Nights
            </span>
          </p>
        </div>
      </div>

      {/* 2. Main Page Layout Grid (Left: Day Schedules, Right: Premium Cabin Info, Metrics) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Days timeline and summary */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Trip Intro summary card */}
          <div className="glass-panel p-5 sm:p-6 rounded-3xl space-y-3">
            <h3 className="text-xs font-black text-sky-700 uppercase tracking-widest flex items-center gap-1.5">
              <Compass className="w-4 h-4 animate-spin-slow text-sky-500" />
              Route Overview &amp; Premium Travel Guide
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              {itinerary.tripSummary}
            </p>
          </div>

          {/* WhatsApp Sharing Card */}
          <div className="glass-panel p-5 sm:p-6 rounded-3xl space-y-4 border border-emerald-500/20 bg-emerald-500/[0.02] no-print">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                <MessageSquare className="w-5 h-5 shrink-0" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800">Send Itinerary directly to Customer via WhatsApp</h3>
                <p className="text-[11px] text-slate-500">Input customer's WhatsApp number to quickly compile and open the chat with pre-written schedule.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">+91</span>
                <input
                  type="tel"
                  placeholder="Enter 10-digit customer phone number"
                  value={whatsappPhone}
                  onChange={(e) => setWhatsappPhone(e.target.value)}
                  className="w-full pl-12 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-semibold"
                />
              </div>
              {whatsappPhone.replace(/\D/g, "").length >= 10 ? (
                <a
                  href={`https://api.whatsapp.com/send?phone=${
                    whatsappPhone.replace(/\D/g, "").length === 10
                      ? "91" + whatsappPhone.replace(/\D/g, "")
                      : whatsappPhone.replace(/\D/g, "")
                  }&text=${encodeURIComponent(getWhatsAppMessage())}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    setWhatsappSent(true);
                    setTimeout(() => setWhatsappSent(false), 5000);
                  }}
                  className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-emerald-50 shrink-0 text-center"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{whatsappSent ? "Opened!" : "Compile & Send"}</span>
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className="px-5 py-2.5 bg-slate-100 text-slate-400 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shrink-0 cursor-not-allowed border border-slate-200"
                  title="Please enter a valid phone number"
                >
                  <MessageSquare className="w-4 h-4 text-slate-300" />
                  <span>Compile &amp; Send</span>
                </button>
              )}
            </div>
          </div>

          {/* Day By Day interactive schedules */}
          <div className="space-y-4">
            <div className="flex justify-between items-center px-1">
              <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest">
                Daily Sightseeing Program
              </h4>
              <span className="text-xs text-sky-600 font-semibold">
                Click day cards to view full transit &amp; dining schedules
              </span>
            </div>

            {itinerary.days.map((day) => {
              const isOpen = isPrinting || expandedDay === day.dayNumber;
              return (
                <div 
                  key={day.dayNumber}
                  className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
                    isOpen 
                      ? "bg-white border-sky-200 shadow-md" 
                      : "bg-white/60 hover:bg-white border-slate-200/60 shadow-sm"
                  }`}
                >
                  {/* Collapsible Header */}
                  <button
                    onClick={() => toggleDayExpansion(day.dayNumber)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      {/* Round bullet badge */}
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 shadow-sm transition-all ${
                        isOpen 
                          ? "bg-sky-600 text-white ring-4 ring-sky-100" 
                          : "bg-slate-100 text-slate-500"
                      }`}>
                        D{day.dayNumber}
                      </div>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-base sm:text-lg font-bold text-slate-800 leading-tight">
                            {day.title}
                          </h3>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5 flex flex-wrap items-center gap-2">
                          <span className="font-semibold text-sky-600">Transit limit: {day.estimatedTravelTime}</span>
                          &bull;
                          <span>Stay: {day.nightStay}</span>
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 text-slate-400 hover:text-slate-700 p-1 bg-slate-50 rounded-xl transition-all no-print">
                      {isOpen ? <ChevronUp className="w-5 h-5 text-sky-600" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                    </div>
                  </button>

                  {/* Collapsible Body Content with transition */}
                  {isOpen && (
                    <div className="p-6 pt-0 border-t border-slate-100 bg-slate-50/40 space-y-6">
                      
                      {/* Top Highlights bullet dots */}
                      <div className="pt-4 flex flex-wrap gap-2">
                        {day.highlights.map((hlt, idx) => (
                          <span 
                            key={idx}
                            className="bg-sky-50 text-sky-700 text-xs px-3 py-1 rounded-full font-semibold border border-sky-100 flex items-center gap-1"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                            {hlt}
                          </span>
                        ))}
                      </div>

                      {/* Main Sightseeing Timeline */}
                      <div className="space-y-4">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                          Curated Hourly Sightseeing Activity
                        </h4>

                        <div className="relative border-l border-sky-100 pl-4 ml-2 space-y-6">
                          {day.activities.map((act, index) => (
                            <div key={index} className="relative space-y-1">
                              {/* Left colored dot connector */}
                              <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-sky-500 ring-4 ring-white" />
                              
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                <span className="text-xs font-black text-sky-600 font-mono bg-sky-100/70 px-2 py-0.5 rounded-md self-start sm:-translate-x-1 sm:translate-y-0 text-[10px]">
                                  {act.time}
                                </span>
                                <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                                  <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                                  {act.location}
                                </span>
                              </div>
                              
                              <h5 className="text-sm font-bold text-slate-800">
                                {act.title}
                              </h5>
                              <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">
                                {act.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Sightseeing order shortcut */}
                      <div className="p-3 bg-white border border-slate-100 rounded-xl">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                          <Navigation className="w-3.5 h-3.5 text-emerald-500" /> RECOMMENDED TRANSIT ORDER
                        </div>
                        <div className="flex flex-wrap items-center gap-y-1.5 gap-x-2 text-xs font-semibold text-slate-700">
                          {day.sightseeingOrder.map((spot, spIdx) => (
                            <span key={spIdx} className="flex items-center gap-2">
                              {spIdx > 0 && <ArrowRight className="w-3.5 h-3.5 text-slate-300" />}
                              <span className="px-2 py-1 bg-slate-100 hover:bg-sky-50 transition-colors rounded-lg border border-slate-200/50">
                                {spot}
                              </span>
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Meal recommendations */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-2xl space-y-1.5">
                          <span className="text-[10px] font-bold text-amber-700 uppercase tracking-widest flex items-center gap-1">
                            <Coffee className="w-3.5 h-3.5 text-amber-600" /> Breakfast
                          </span>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {day.meals.breakfast}
                          </p>
                        </div>

                        <div className="p-4 bg-sky-500/5 border border-sky-500/10 rounded-2xl space-y-1.5">
                          <span className="text-[10px] font-bold text-sky-700 uppercase tracking-widest flex items-center gap-1">
                            <Utensils className="w-3.5 h-3.5 text-sky-600" /> Lunch
                          </span>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {day.meals.lunch}
                          </p>
                        </div>

                        <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl space-y-1.5">
                          <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest flex items-center gap-1">
                            <Moon className="w-3.5 h-3.5 text-emerald-600" /> Dinner
                          </span>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {day.meals.dinner}
                          </p>
                        </div>
                      </div>

                      {/* Night stay recommendation */}
                      <div className="p-3.5 bg-emerald-50/50 border border-emerald-100 rounded-2xl flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                            <Moon className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="block text-[10px] font-bold text-emerald-700 uppercase leading-none">Recommend Accommodation</span>
                            <span className="text-xs font-bold text-slate-800 mt-1 block">{day.nightStay}</span>
                          </div>
                        </div>
                        <span className="text-[10px] font-semibold bg-emerald-100/70 text-emerald-800 border border-emerald-200/50 px-2 py-0.5 rounded">
                          Tax-included stay suggested
                        </span>
                      </div>

                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Return Journey Card */}
          <div className="p-5 sm:p-6 bg-slate-900 text-slate-100 rounded-3xl border border-slate-800 space-y-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 rounded-full blur-2xl" />
            <h3 className="text-xs font-black text-rose-400 uppercase tracking-widest">
              Closing &amp; Return Journey Execution
            </h3>
            <p className="text-sm text-slate-200/90 leading-relaxed">
              {itinerary.returnJourneyDetails}
            </p>
            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 text-sky-400" />
              Drop off will be coordinated with the driver category {itinerary.vehicleType} on final return day window.
            </div>
          </div>

        </div>

        {/* Right Side: Key stats, Price guideline, Custom vehicle parameters */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Key metrics Glass card */}
          <div className="glass-panel p-5 sm:p-6 rounded-3xl space-y-4">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest pb-3 border-b border-white/20">
              Trip Analytics &amp; Distance Estimator
            </h3>

            <div className="space-y-4">
              
              <div className="flex items-center justify-between gap-4 py-1">
                <span className="text-xs text-slate-500 font-medium">Vehicle Selected</span>
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
                  <Car className="w-3.5 h-3.5 text-sky-500" />
                  {itinerary.vehicleType}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 py-1">
                <span className="text-xs text-slate-500 font-medium">Estimated Distance</span>
                <span className="text-xs font-black text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-100">
                  {itinerary.estimatedDistanceKm || "N/A"}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 py-1">
                <span className="text-xs text-slate-500 font-medium">Avg. Driving Time</span>
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {itinerary.estimatedDrivingTime || "N/A"}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 py-1">
                <span className="text-xs text-slate-500 font-medium">Traveler Headcount</span>
                <span className="text-xs font-bold text-slate-800">
                  {itinerary.numberOfTravelers} Passengers
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 py-1">
                <span className="text-xs text-slate-500 font-medium">Self-Drive Permitted</span>
                <span className="text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200 px-1.5 py-0.5 rounded">
                  No (Chauffeur Included)
                </span>
              </div>

            </div>
          </div>

          {/* Pricing estimation widget */}
          {itinerary.estimatedCostRange && (
            <div className="p-5 sm:p-6 bg-gradient-to-tr from-sky-900 to-slate-900 rounded-3xl text-white space-y-4 border border-sky-800/20 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-sky-300 uppercase tracking-widest flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> Budget Estimate
                </span>
                <span className="text-[9px] font-bold bg-white/10 text-white border border-white/20 px-2 py-0.5 rounded-full">
                  All-Inclusive
                </span>
              </div>

              <div>
                <span className="text-xs text-slate-300 block font-semibold uppercase tracking-wider">Est. Fleet Package Cost</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl sm:text-3xl font-black text-white">
                    ₹{new Intl.NumberFormat('en-IN').format(itinerary.estimatedCostRange.min)} - ₹{new Intl.NumberFormat('en-IN').format(itinerary.estimatedCostRange.max)}
                  </span>
                  <span className="text-xs text-slate-300 uppercase block font-semibold">INR</span>
                </div>
              </div>

              <p className="text-[10px] text-slate-300/90 leading-normal">
                Includes private customized vehicle class, standard fuel surcharge, parking tolls, driver allowance, and basic package guidelines. Accommodations and actual entry tickets not included unless specified.
              </p>
            </div>
          )}

          {/* Direct Booking & Support Call Buttons */}
          <div className="p-5 sm:p-6 bg-white border border-slate-200 rounded-3xl space-y-4 shadow-sm no-print">
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-sky-500" />
              Confirm Your Booking
            </h4>
            
            <p className="text-xs text-slate-500 leading-relaxed font-semibold">
              Ready to secure your fleet class with chauffeured driver allowance? Contact our customer care desk to block your vehicle &amp; dates.
            </p>

            <div className="grid grid-cols-1 gap-2.5">
              <a
                href={`https://wa.me/919895712912?text=Hello%20imveloTripsIndia%2C%20I%20would%20like%20to%20confidently%20book%20my%20trip%20to%20${encodeURIComponent(itinerary.destination)}%20starting%20on%20${itinerary.travelDate}%20for%20${itinerary.days.length}%20days.%20Selected%20vehicle%20class:%20${itinerary.vehicleType}.`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white rounded-2xl text-xs font-black tracking-wide text-center flex items-center justify-center gap-2 shadow-md shadow-emerald-100/70 transition-all duration-300 animate-pulse hover:animate-none"
              >
                <MessageSquare className="w-4 h-4" />
                BOOK TRIP NOW VIA WHATSAPP
              </a>

              <a
                href="tel:+919895712912"
                className="w-full py-3 bg-slate-50 border border-slate-200 text-slate-800 hover:bg-slate-100 rounded-2xl text-xs font-black tracking-wide text-center flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Phone className="w-4 h-4 text-sky-500" />
                CALL NOW: +91 9895712912
              </a>
            </div>
            
            <p className="text-[9px] text-slate-400 text-center leading-normal">
              *Instant booking callback generated during normal hours. Zero credit card prepayment required.
            </p>
          </div>

          {/* Expert Travel Guidelines tips */}
          <div className="p-5 sm:p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-3xl space-y-4">
            <h4 className="text-xs font-black text-emerald-800 uppercase tracking-widest flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Pro Travel Guidelines
            </h4>
            
            <ul className="space-y-2.5 text-xs text-slate-600 font-medium font-sans">
              {itinerary.tips.map((tip, index) => (
                <li key={index} className="flex gap-2 leading-relaxed">
                  <span className="text-emerald-600 font-black shrink-0">{index + 1}.</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Center widget */}
          <div className="p-4 bg-white border border-slate-200/80 rounded-3xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center shrink-0">
              <Compass className="w-5 h-5 text-sky-600 animate-spin-slow" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">Support Chat Active</p>
              <p className="text-[10px] text-slate-500">Need customizations? Ping your dedicated travel driver anytime.</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
