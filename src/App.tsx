import React, { useState, useRef } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ItineraryForm from "./components/ItineraryForm";
import ItineraryView from "./components/ItineraryView";
import { ItineraryRequest, ItineraryResponse } from "./types";
import { 
  Compass, 
  MapPin, 
  Users, 
  Car, 
  Clock, 
  ArrowRight,
  ShieldCheck, 
  Sparkles, 
  TrendingUp, 
  Star,
  Layers,
  Award,
  ThumbsUp,
  Heart,
  ChevronDown,
  Mail,
  Phone,
  HelpCircle
} from "lucide-react";

const CURATED_DESTINATIONS = [
  {
    title: "Shimla & Manali Resort Loop",
    subtitle: "High-Altitude Snowpeaks",
    days: "5 Days / 4 Nights",
    passengers: "4 Guests",
    vehicle: "Innova Crysta",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=400",
    pickup: "New Delhi",
    dest: "Shimla-Manali Retreat",
    tripType: "Round Trip" as const,
    request: "Scenic photography points, pure local Himachali lunch places",
    rating: "4.9",
    reviews: "320"
  },
  {
    title: "Munnar & Spice Hills Getaway",
    subtitle: "Emerald Tea Garden Retreat",
    days: "3 Days / 2 Nights",
    passengers: "2 Guests",
    vehicle: "Sedan",
    image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80&w=400",
    pickup: "Cochin Airport",
    dest: "Munnar Tea Hills",
    tripType: "Round Trip" as const,
    request: "Looking for tranquil waterfalls and premium spice garden tours",
    rating: "4.8",
    reviews: "185"
  },
  {
    title: "Coorg Valley Coffee Trails",
    subtitle: "Mist Rivers & Plantations",
    days: "4 Days / 3 Nights",
    passengers: "6 Guests",
    vehicle: "Ertiga",
    image: "https://images.unsplash.com/photo-1588612140660-fbf8f58b8f2c?auto=format&fit=crop&q=80&w=400",
    pickup: "Bangalore",
    dest: "Coorg Coffee Estate",
    tripType: "Round Trip" as const,
    request: "Include trekking suggestions, plantation tour",
    rating: "4.9",
    reviews: "250"
  },
  {
    title: "Jaipur Cultural Heritage Tour",
    subtitle: "Kingdoms & Pink Fortresses",
    days: "3 Days / 2 Nights",
    passengers: "4 Guests",
    vehicle: "Innova",
    image: "https://images.unsplash.com/photo-1477584308802-e9c37c6a4120?auto=format&fit=crop&q=80&w=400",
    pickup: "New Delhi",
    dest: "Jaipur",
    tripType: "Round Trip" as const,
    request: "Traditional Rajasthani cultural dining at evening, visit Amber Fort early",
    rating: "4.9",
    reviews: "410"
  }
];

const FAQS = [
  {
    question: "How does the AI Itinerary Generator calculate driving time and distance?",
    answer: "Our engine uses geographical distance models combined with smart local transit metrics between your specified Pickup Location and Destination to estimate physical road distance and average driving hours safely."
  },
  {
    question: "Are the private vehicle chauffeured models actually bookable?",
    answer: "Yes, our designs are future-ready to plug directly into live CRM booking channels. The suggested passenger limits correspond strictly to authorized regional commercial fleet standards (Sedan, Innova, Traveller, Urbania)."
  },
  {
    question: "Can I customize the generated AI schedule afterwards?",
    answer: "Absolutely! You can use the 'Export PDF / Print' feature, copy the shareable link, or write custom instructions in the 'Special Requests' textarea before generation to re-align sights, culinary choices, and timings dynamically."
  },
  {
    question: "Which destinations are currently optimized under imveloTripsIndia?",
    answer: "We support worldwide route modeling with special focus on regional hotspots including mountain loops, coastal drives, heritage tours, and wildlife circuits. Standard regional breakfast and dinner recommendations are matched based on your route query."
  },
  {
    question: "Do you support multi-city multi-stop itineraries?",
    answer: "For complex multi-city schedules, you can specify individual intermediate locations in the 'Special Requests' input box and our model will align the daily sightseeing sequence chronologically."
  }
];

export default function App() {
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");
  const [itinerary, setItinerary] = useState<ItineraryResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const formRef = useRef<HTMLDivElement>(null);
  const destinationsRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectPreset = (preset: ItineraryRequest) => {
    scrollToSection(formRef);
  };

  const handleFormSubmit = async (requestData: ItineraryRequest) => {
    setLoading(true);
    setError(null);
    setItinerary(null);
    
    // Smooth custom interval steps to make the loading feel authentic and premium
    const steps = [
      "Securing regional safety advisories...",
      "Mapping optimal flight & highway routes...",
      "Consulting regional dining guidelines with Gemini AI...",
      "Evaluating premium chauffeur fleet compatibility...",
      "Completing day-by-day sightseeing timeline..."
    ];

    let stepIdx = 0;
    setLoadingStep(steps[stepIdx]);
    const stepInterval = setInterval(() => {
      if (stepIdx < steps.length - 1) {
        stepIdx++;
        setLoadingStep(steps[stepIdx]);
      }
    }, 1200);

    try {
      const response = await fetch("/api/generate-itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        throw new Error("Failed to consult the AI Travel Planner.");
      }

      const data = await response.json();
      setItinerary(data);

      // Smooth scroll to the result section after a short layout cycle
      setTimeout(() => {
        const resultSec = document.getElementById("itinerary-result-section");
        if (resultSec) {
          resultSec.scrollIntoView({ behavior: "smooth" });
        }
      }, 400);

    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Something went wrong. Utilizing fallback itinerary planner.");
    } finally {
      clearInterval(stepInterval);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mesh-bg relative pb-12 antialiased">
      
      {/* 1. Global Navigation */}
      <Navbar 
        onScrollToForm={() => scrollToSection(formRef)}
        onScrollToFAQ={() => scrollToSection(faqRef)}
        onScrollToDestinations={() => scrollToSection(destinationsRef)}
      />

      {/* 2. Primary Hero Header */}
      <Hero onScrollToForm={() => scrollToSection(formRef)} />

      {/* Main Body Layout Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        
        {/* Why Choose Us Section */}
        <section className="bg-white/40 backdrop-blur-md rounded-3xl p-8 border border-white/30 grid grid-cols-1 md:grid-cols-3 gap-8 shadow-sm no-print">
          <div className="flex gap-4 items-start">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl border border-indigo-100">
              <ShieldCheck className="w-6 h-6 shrink-0" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">Verified Chauffeur Fleets</h3>
              <p className="text-xs text-slate-500 leading-relaxed mt-1">
                Every customized itinerary suggestions match standards approved for our luxury sedans and premium tourist coaches.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start border-y md:border-y-0 md:border-x border-slate-200/50 py-6 md:py-0 md:px-6">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100">
              <Sparkles className="w-6 h-6 shrink-0" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">AI Spot Recommendation</h3>
              <p className="text-xs text-slate-500 leading-relaxed mt-1">
                Get real-time optimal timings for spectacular overlooks, monument photoshoots, and genuine local organic dining.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="p-3 bg-sky-50 text-sky-600 rounded-2xl border border-sky-100">
              <TrendingUp className="w-6 h-6 shrink-0" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">Budget Optimization</h3>
              <p className="text-xs text-slate-500 leading-relaxed mt-1">
                Receive pricing guidelines representing accurate package expenditures to avoid commercial agent overpricing.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Popular Presets Curated Destinations */}
        <section ref={destinationsRef} className="space-y-6 scroll-mt-24 no-print">
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-[10px] bg-sky-100 text-sky-700 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
              Handpicked Sightseeing Sights
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Pre-Optimized Dream Packages
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
              Click any package to pre-fill the parameters and edit to match your schedule.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CURATED_DESTINATIONS.map((dest, i) => (
              <div 
                key={i}
                onClick={() => {
                  scrollToSection(formRef);
                  // Load preset values through custom triggers in the Form
                  const formEl = document.getElementById("itinerary-form-section");
                  if (formEl) {
                    const pickInp = document.getElementById("pickupLocation-input") as HTMLInputElement;
                    const destInp = document.getElementById("destination-input") as HTMLInputElement;
                    const daysSel = document.getElementById("numberOfDays-select") as HTMLSelectElement;
                    const tInp = document.getElementById("numberOfTravelers-input") as HTMLInputElement;
                    const vSel = document.getElementById("vehicleType-select") as HTMLSelectElement;
                    const reqTxt = document.getElementById("specialRequests-textarea") as HTMLTextAreaElement;
                    
                    if (pickInp) pickInp.value = dest.pickup;
                    if (destInp) destInp.value = dest.dest;
                    if (daysSel) daysSel.value = dest.days.split(" ")[0];
                    if (tInp) tInp.value = dest.passengers.split(" ")[0];
                    if (vSel) vSel.value = dest.vehicle;
                    if (reqTxt) reqTxt.value = dest.request;

                    // Trigger normal state callback in the form via dispatching input events
                    [pickInp, destInp, daysSel, tInp, vSel, reqTxt].forEach(el => {
                      if (el) {
                        el.dispatchEvent(new Event('change', { bubbles: true }));
                      }
                    });
                  }
                }}
                className="group cursor-pointer bg-white/70 backdrop-blur-md border border-slate-200/60 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Visual Cover */}
                <div className="relative h-44 overflow-hidden">
                  <img 
                    src={dest.image} 
                    alt={dest.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent" />
                  
                  {/* Rating Label */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-xl text-[10px] font-black text-slate-800 flex items-center gap-1 border border-slate-200/40">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    {dest.rating}
                  </div>
                </div>

                {/* Cover Details */}
                <div className="p-5 space-y-3">
                  <div>
                    <span className="text-[10px] font-bold text-sky-600 uppercase tracking-widest block">
                      {dest.subtitle}
                    </span>
                    <h3 className="text-sm font-bold text-slate-800 mt-0.5 group-hover:text-sky-600 transition-colors">
                      {dest.title}
                    </h3>
                  </div>

                  {/* Route parameters summary */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-semibold">
                    <span>{dest.days}</span>
                    <span>&bull;</span>
                    <span>{dest.vehicle}</span>
                  </div>

                  <button className="w-full mt-1.5 py-2 bg-slate-50 hover:bg-sky-50 text-sky-700 text-xs font-bold rounded-xl border border-slate-200/50 group-hover:border-sky-200 transition-all flex items-center justify-center gap-1.5">
                    Load Parameters <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Interactive Planner Form Section */}
        <section ref={formRef} className="scroll-mt-24 space-y-6 no-print">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight text-center sm:text-left hidden">
              Configure Your Unique Journey
            </h2>
            <p className="text-xs text-slate-500 text-center sm:text-left hidden">
              Your pickup location, dates, traveler constraints, and optional preferences.
            </p>
            
            <ItineraryForm 
              onSubmit={handleFormSubmit} 
              loading={loading}
              onSelectPreset={(p) => console.log("Preset loaded:", p.destination)}
            />
          </div>
        </section>

        {/* 5. Custom Live Loader */}
        {loading && (
          <div className="max-w-2xl mx-auto py-12 px-6 bg-white/70 backdrop-blur-xl border border-slate-200 rounded-3xl shadow-xl flex flex-col items-center text-center space-y-4 no-print">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-4 border-slate-100 border-t-sky-600 animate-spin" />
              <Compass className="w-8 h-8 text-emerald-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin-slow" />
            </div>
            
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-slate-800">imveloTripsIndia Consulting Engine</h3>
              <p className="text-xs text-emerald-600 font-bold tracking-wide animate-pulse">{loadingStep}</p>
              <p className="text-[11px] text-slate-500 max-w-md">
                We're generating physical route estimations, selecting top regional lunch hotspots, and planning precise traveler guidelines. Please hang tight!
              </p>
            </div>
          </div>
        )}

        {/* 6. Live Active Itinerary Result */}
        {itinerary && !loading && (
          <section className="animate-fade-in">
            <ItineraryView itinerary={itinerary} onReset={() => setItinerary(null)} />
          </section>
        )}

        {/* 7. Frequently Asked Questions (FAQ) */}
        <section ref={faqRef} className="max-w-4xl mx-auto scroll-mt-24 space-y-6 no-print">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Expert Travel FAQs
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
              Clear answers to common questions about our smart route generator and vehicle class booking.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="bg-white/50 backdrop-blur-md rounded-2xl p-5 border border-slate-200/50 space-y-2 hover:bg-white transition-all">
                <h4 className="font-bold text-sm sm:text-base text-slate-800 flex items-start gap-2">
                  <HelpCircle className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
                  {faq.question}
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed pl-7">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* 8. Contact & Footer */}
      <footer id="contact" className="mt-16 bg-slate-900 text-slate-400 py-12 border-t border-slate-800 scroll-mt-24 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Branding Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-sky-600 rounded-xl text-white">
                  <Compass className="w-5 h-5" />
                </div>
                <span className="text-lg font-extrabold text-white">imveloTripsIndia</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                State-of-the-art travel itinerary design mapping custom routes instantly for luxury tourist coaches and chauffeured cars.
              </p>
            </div>

            {/* Curated Sights Column */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-widest">Popular Sights</h4>
              <ul className="text-xs space-y-2 font-medium">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Shimla-Manali Hills</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Munnar Tea Hills</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Coorg Valley Resorts</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Goa Beaches Route</a></li>
              </ul>
            </div>

            {/* Quick Sights Column */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-widest">Fleet Categories</h4>
              <ul className="text-xs space-y-2">
                <li>Toyota Innova Crysta</li>
                <li>Sedan (Dzire/Etios)</li>
                <li>Force Traveller 16 Seater</li>
                <li>Volvo Coach (35-45 Pax)</li>
              </ul>
            </div>

            {/* Help / Contact Info */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-widest">Support Office</h4>
              <div className="space-y-2 text-xs font-medium">
                <p className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-sky-400" />
                  support@imvelotripsindia.com
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  +91 9895712912
                </p>
                <p className="text-[10px] text-slate-500">
                  Active 24/7 assisting private tourists &amp; commercial logistics.
                </p>
              </div>
            </div>

          </div>

          {/* Core metadata alignment */}
          <div className="pt-8 mt-8 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-500 gap-4">
            <p>&copy; {new Date().getFullYear()} imveloTripsIndia. Designed exclusively with modern glassmorphic theme.</p>
            <div className="flex gap-4">
              <span className="hover:text-slate-300 transition-colors">Privacy Charter</span>
              <span>&bull;</span>
              <span className="hover:text-slate-300 transition-colors">Transit Agreements</span>
              <span>&bull;</span>
              <span className="hover:text-slate-300 transition-colors">Toll Guidelines</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
