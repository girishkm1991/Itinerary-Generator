import { CalendarRange, Sparkles, MapPin, CheckCircle2, ShieldCheck } from "lucide-react";

interface HeroProps {
  onScrollToForm: () => void;
}

export default function Hero({ onScrollToForm }: HeroProps) {
  return (
    <div className="relative overflow-hidden bg-slate-50 py-16 sm:py-24 border-b border-slate-200/40 no-print">
      {/* Decorative gradient glowing spheres */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-sky-200/30 blur-3xl" />
      <div className="absolute bottom-10 right-1/4 translate-x-1/2 w-[450px] h-[450px] rounded-full bg-emerald-200/30 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-100/20 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text panel */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-50 border border-sky-200 rounded-full text-sky-800 text-xs font-semibold uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-sky-500 animate-pulse" />
              Next-Gen AI Travel Concierge
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Craft Your Perfect <br />
              <span className="bg-gradient-to-r from-sky-600 via-sky-500 to-emerald-500 bg-clip-text text-transparent">
                Day-by-Day Journey
              </span> <br />
              Instantly with AI
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Plan custom multi-day custom routes using our commercial-grade travel AI. Easily input your path, date, traveler counts, and preferred vehicle to generate fully detailed sightseeing schedules, expert meal suggestions, and optimized routes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
              <button
                onClick={onScrollToForm}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-sky-600 to-emerald-500 hover:from-sky-700 hover:to-emerald-600 text-white font-bold rounded-2xl transition-all duration-300 shadow-lg shadow-sky-100 hover:shadow-sky-200 hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-3"
              >
                <CalendarRange className="w-5 h-5" /> Start Generating
              </button>
              <a
                href="#how-it-works"
                className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-2xl transition-all duration-300 border border-slate-200 text-center cursor-pointer"
              >
                Learn More
              </a>
            </div>

            {/* Micro Highlights */}
            <div className="pt-4 grid grid-cols-3 gap-4 border-t border-slate-200/50 max-w-lg mx-auto lg:mx-0">
              <div>
                <span className="block text-2xl font-black text-sky-600">12K+</span>
                <span className="text-xs text-slate-500 font-medium">Trips Planned</span>
              </div>
              <div className="border-x border-slate-200">
                <span className="block text-2xl font-black text-slate-800">4.9/5</span>
                <span className="text-xs text-slate-500 font-medium">User Rating</span>
              </div>
              <div>
                <span className="block text-2xl font-black text-emerald-600">100%</span>
                <span className="text-xs text-slate-500 font-medium font-mono">Secure API Data</span>
              </div>
            </div>
          </div>

          {/* Graphical Mockup Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm sm:max-w-md bg-white/70 backdrop-blur-xl border border-slate-200/50 p-6 rounded-3xl shadow-2xl space-y-6">
              
              {/* Card Header decoration */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Selected Fleet Category</span>
                    <span className="text-sm font-semibold text-slate-800">Toyota Innova Crysta</span>
                  </div>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">Active Taxi</span>
              </div>

              {/* Sample route preview */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex flex-col items-center mt-1">
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-sky-500 bg-white" />
                    <div className="w-0.5 h-8 bg-slate-200" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-slate-400 font-bold uppercase">Pickup Point</span>
                    <span className="text-sm font-bold text-slate-800">New Delhi Int'l Airport</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex flex-col items-center mt-1">
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-emerald-500 bg-white" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-slate-400 font-bold uppercase">Ultimate Destination</span>
                    <span className="text-sm font-bold text-slate-800">Shimla Mall Road, HP</span>
                  </div>
                </div>
              </div>

              {/* Quick statistics decoration */}
              <div className="bg-slate-50/50 rounded-2xl p-4 border border-slate-100 grid grid-cols-2 gap-4">
                <div>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase">Total Distance</span>
                  <span className="text-sm font-black text-slate-800">346 KM</span>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase">Avg. Drive Time</span>
                  <span className="text-sm font-black text-slate-800">7.2 Hours</span>
                </div>
              </div>

              {/* Verified Badge */}
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 pt-2 border-t border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Verified Commercial Route Generator
              </div>
            </div>

            {/* Background floating decor tags */}
            <div className="absolute -top-4 -right-4 bg-sky-500 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg shadow-sky-200/50 rotate-6 hidden sm:block">
              🏔️ Mountain Getaways
            </div>
            <div className="absolute -bottom-4 -left-4 bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg shadow-emerald-200/50 -rotate-3 hidden sm:block">
              🌴 Coastal Paradises
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
