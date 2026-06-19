import { Globe, HelpCircle, Landmark, PhoneCall } from "lucide-react";
import Logo from "./Logo";

interface NavbarProps {
  onScrollToForm: () => void;
  onScrollToFAQ: () => void;
  onScrollToDestinations: () => void;
}

export default function Navbar({ onScrollToForm, onScrollToFAQ, onScrollToDestinations }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/50 transition-all duration-300 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="p-1 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center">
              <Logo size={36} />
            </div>
            <span className="text-xl font-extrabold bg-gradient-to-r from-emerald-800 via-emerald-600 to-emerald-500 bg-clip-text text-transparent tracking-tight">
              imveloTripsIndia
            </span>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <button 
              onClick={onScrollToDestinations} 
              className="flex items-center gap-1.5 hover:text-sky-600 transition-colors py-1.5 cursor-pointer"
            >
              <Globe className="w-4 h-4 text-emerald-500" /> Curated Spots
            </button>
            <button 
              onClick={onScrollToForm} 
              className="flex items-center gap-1.5 hover:text-sky-600 transition-colors py-1.5 cursor-pointer"
            >
              <Landmark className="w-4 h-4 text-sky-500" /> Plan Trip
            </button>
            <button 
              onClick={onScrollToFAQ} 
              className="flex items-center gap-1.5 hover:text-sky-600 transition-colors py-1.5 cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-sky-400" /> FAQs
            </button>
          </div>

          {/* Action Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={onScrollToForm}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-sky-600 to-emerald-500 hover:from-sky-700 hover:to-emerald-600 rounded-xl transition-all duration-300 shadow-md shadow-sky-100 cursor-pointer hover:shadow-lg"
            >
              Create Now
            </button>
            <a
              href="#contact"
              className="p-2 text-slate-500 hover:text-slate-900 bg-slate-100 md:bg-transparent rounded-lg transition-colors"
            >
              <PhoneCall className="w-5 h-5 text-slate-500 hover:text-sky-600" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
