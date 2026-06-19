import { Globe, Compass, Landmark, PhoneCall, CarFront } from "lucide-react";
import Logo from "./Logo";

interface NavbarProps {
  currentTab: "explore" | "planner" | "itinerary" | "fleet";
  onChangeTab: (tab: "explore" | "planner" | "itinerary" | "fleet") => void;
  hasItinerary: boolean;
}

export default function Navbar({ currentTab, onChangeTab, hasItinerary }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 transition-all duration-300 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => onChangeTab("explore")}
          >
            <div className="p-1 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center animate-pulse-slow">
              <Logo size={36} />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-black bg-gradient-to-r from-emerald-800 via-emerald-600 to-emerald-500 bg-clip-text text-transparent tracking-tight leading-none">
                imveloTripsIndia
              </span>
              <span className="text-[9px] text-slate-400 font-extrabold tracking-widest uppercase">
                AI Concierge
              </span>
            </div>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-6 text-sm font-semibold">
            <button 
              onClick={() => onChangeTab("explore")} 
              className={`flex items-center gap-1.5 transition-all py-1.5 relative cursor-pointer ${
                currentTab === "explore" 
                  ? "text-sky-600" 
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Globe className={`w-4 h-4 ${currentTab === "explore" ? "text-emerald-500 animate-spin-slow" : "text-slate-400"}`} /> 
              <span>Explore Sights</span>
              {currentTab === "explore" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-sky-500 to-emerald-500 rounded" />
              )}
            </button>

            <button 
              onClick={() => onChangeTab("planner")} 
              className={`flex items-center gap-1.5 transition-all py-1.5 relative cursor-pointer ${
                currentTab === "planner" 
                  ? "text-sky-600" 
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Landmark className={`w-4 h-4 ${currentTab === "planner" ? "text-sky-500 animate-bounce" : "text-slate-400"}`} /> 
              <span>AI Planner</span>
              {currentTab === "planner" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-sky-500 to-emerald-500 rounded" />
              )}
            </button>

            <button 
              onClick={() => onChangeTab("itinerary")} 
              className={`flex items-center gap-1.5 transition-all py-1.5 relative cursor-pointer ${
                currentTab === "itinerary" 
                  ? "text-sky-600" 
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Compass className={`w-4 h-4 ${currentTab === "itinerary" ? "text-emerald-500 animate-pulse" : "text-slate-400"}`} /> 
              <span className="flex items-center gap-1">
                Active Itinerary
                {hasItinerary && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
                )}
              </span>
              {hasItinerary && (
                <span className="text-[9px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded-full border border-emerald-200">
                  Ready
                </span>
              )}
              {currentTab === "itinerary" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-sky-500 to-emerald-500 rounded" />
              )}
            </button>

            <button 
              onClick={() => onChangeTab("fleet")} 
              className={`flex items-center gap-1.5 transition-all py-1.5 relative cursor-pointer ${
                currentTab === "fleet" 
                  ? "text-sky-600" 
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <CarFront className={`w-4 h-4 ${currentTab === "fleet" ? "text-sky-500" : "text-slate-400"}`} /> 
              <span>Fleet &amp; Pricing</span>
              {currentTab === "fleet" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-sky-500 to-emerald-500 rounded" />
              )}
            </button>
          </div>

          {/* Action Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onChangeTab("planner")}
              className="hidden sm:inline-flex items-center gap-2 px-4.5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-sky-600 to-emerald-500 hover:from-sky-700 hover:to-emerald-600 rounded-xl transition-all duration-300 shadow-md shadow-sky-100 cursor-pointer hover:shadow-lg active:scale-95"
            >
              Plan Your Trip
            </button>
            <a
              href="#contact"
              onClick={(e) => {
                const el = document.getElementById("contact");
                if (el) {
                  e.preventDefault();
                  el.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="p-2 text-slate-500 hover:text-sky-600 bg-slate-100/80 hover:bg-sky-50 rounded-xl transition-all"
              title="Contact Office"
            >
              <PhoneCall className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Mobile Navigation bar - Highly visual on mobile screens */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-slate-100 -mx-4 px-2">
          <button 
            onClick={() => onChangeTab("explore")}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-bold ${
              currentTab === "explore" ? "text-sky-600" : "text-slate-500"
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Explore</span>
          </button>
          
          <button 
            onClick={() => onChangeTab("planner")}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-bold ${
              currentTab === "planner" ? "text-sky-600" : "text-slate-500"
            }`}
          >
            <Landmark className="w-4 h-4" />
            <span>AI Planner</span>
          </button>

          <button 
            onClick={() => onChangeTab("itinerary")}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-bold relative ${
              currentTab === "itinerary" ? "text-sky-600" : "text-slate-500"
            }`}
          >
            {hasItinerary && (
              <span className="absolute top-0 right-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            )}
            <Compass className="w-4 h-4" />
            <span>Itinerary</span>
          </button>

          <button 
            onClick={() => onChangeTab("fleet")}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-bold ${
              currentTab === "fleet" ? "text-sky-600" : "text-slate-500"
            }`}
          >
            <CarFront className="w-4 h-4" />
            <span>Fleet</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
