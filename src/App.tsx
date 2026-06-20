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
  CarFront,
  Briefcase,
  Milestone,
  Percent,
  Coins,
  ShieldAlert
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

const FLEET_GUIDE_DATA = [
  {
    name: "Luxury Sedan",
    models: "Maruti Dzire, Toyota Etios, Hyundai Aura",
    capacity: "4 Passengers",
    luggage: "2-3 Medium Suitcases",
    type: "AC Sedan Class",
    features: ["Perfect for Couples / Small Families", "Highly Fuel Efficient & Cost-effective", "Compact build for winding hill roads", "Well-conditioned spacious cabin layout"],
    hourlyRateEstimate: "₹12 - ₹14 / KM",
    comfort: "Ergonomic Comfort",
    iconColor: "text-sky-500 bg-sky-50 border-sky-100"
  },
  {
    name: "Spacious Ertiga SUV",
    models: "Maruti Suzuki Ertiga",
    capacity: "6 Passengers",
    luggage: "3-4 standard bags",
    type: "6 Seater SUV Class",
    features: ["Ideal for medium families (4-6 Pax)", "Flexible folding rear seats for baggage cargo", "Dual-zone AC comfort with second row controls", "Best-in-class mileage value per tourist"],
    hourlyRateEstimate: "₹15 - ₹17 / KM",
    comfort: "Deluxe Comfort",
    iconColor: "text-purple-500 bg-purple-50 border-purple-100"
  },
  {
    name: "Toyota Innova Crysta",
    models: "Toyota Innova, Innova Crysta Premium",
    capacity: "7 Passengers",
    luggage: "4-5 Large Suitcases",
    type: "7 Seater Luxury MUV Class",
    features: ["Gold Standard of Indian tourist transport", "Shock-absorb suspension designed for long hill trails", "Plush captain seats with premium back support", "Configured individual passenger AC vents"],
    hourlyRateEstimate: "₹18 - ₹21 / KM",
    comfort: "Executive Elite",
    iconColor: "text-emerald-500 bg-emerald-50 border-emerald-100"
  },
  {
    name: "Force Traveller Luxury",
    models: "Force Traveller Executive 12/17 Seats",
    capacity: "12-16 Passengers",
    luggage: "10-12 Bags + Secure Roof Carrier",
    type: "VIP Tourist Mini-Coach",
    features: ["Configured for large joint families or groups", "Extremely spacious high-roof ceiling layout", "Premium individual pushback bucket leather seats", "Surround high-fidelity sound & integrated entertainment screen"],
    hourlyRateEstimate: "₹24 - ₹28 / KM",
    comfort: "First-Class Cabin",
    iconColor: "text-amber-500 bg-amber-50 border-amber-100"
  },
  {
    name: "Super-Luxury Force Urbania",
    models: "Force Urbania Super-Luxury 10/17 seats",
    capacity: "10-17 Passengers",
    luggage: "Fully dedicated massive rear boot",
    type: "Super Luxury Cabin",
    features: ["Next-generation aerodynamic luxury shell", "Seated USB charger ports & individual lamps", "Advanced air suspension with noiseless operations", "Extra-wide scenic sealed glass viewing apertures"],
    hourlyRateEstimate: "₹28 - ₹32 / KM",
    comfort: "Ultimate VIP Luxury",
    iconColor: "text-rose-500 bg-rose-50 border-rose-100"
  },
  {
    name: "Luxury Coach & Volvo Bus",
    models: "Volvo / Eicher Multiaxle Premium Coaches",
    capacity: "35-45 Passengers",
    luggage: "Massive separate underbelly cargo bays",
    type: "Heavy Commercial Coach",
    features: ["Tailored for grand events, weddings & corporations", "Premium climate control AC with air dampers", "Accompanied by veteran long-distance pilot drivers", "Public Address mic system for guided sightseeing"],
    hourlyRateEstimate: "₹45 - ₹55 / KM",
    comfort: "Grand Tourer Comfort",
    iconColor: "text-indigo-500 bg-indigo-50 border-indigo-100"
  }
];

export default function App() {
  const [currentTab, _setCurrentTab] = useState<"explore" | "planner" | "itinerary" | "fleet">("explore");
  const [tabHistory, setTabHistory] = useState<("explore" | "planner" | "itinerary" | "fleet")[]>(["explore"]);

  const setCurrentTab = (newTab: "explore" | "planner" | "itinerary" | "fleet") => {
    _setCurrentTab(newTab);
    setTabHistory((prev) => {
      // Avoid pushing duplicates next to each other
      if (prev[prev.length - 1] === newTab) return prev;
      return [...prev, newTab];
    });
  };

  const handleGoBack = () => {
    if (tabHistory.length > 1) {
      const newHistory = [...tabHistory];
      newHistory.pop(); // Remove current tab
      const previousTab = newHistory[newHistory.length - 1]; // Get prior tab
      setTabHistory(newHistory);
      _setCurrentTab(previousTab);
      // Smooth scroll if returning home
      if (previousTab === "explore") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");
  const [itinerary, setItinerary] = useState<ItineraryResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const destinationsRef = useRef<HTMLDivElement>(null);

  const handleSelectPreset = (preset: ItineraryRequest) => {
    setCurrentTab("planner");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFormSubmit = async (requestData: ItineraryRequest) => {
    setLoading(true);
    setError(null);
    setItinerary(null);
    
    // Switch to active scheduling page dynamically to let users track progress seamlessly
    setCurrentTab("itinerary");
    window.scrollTo({ top: 0, behavior: "smooth" });
    
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
        currentTab={currentTab}
        onChangeTab={(tab) => {
          setCurrentTab(tab);
          // Wait for tab switch, then handle scroll if home screen
          if (tab === "explore") {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }}
        hasItinerary={!!itinerary}
        canGoBack={tabHistory.length > 1}
        onBack={handleGoBack}
      />

      {/* Main Pages Body Layout Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-16">
        
        {/* TAB 1: EXPLORE HOME PAGE */}
        {currentTab === "explore" && (
          <div className="space-y-16 animate-fade-in">
            {/* Primary Hero Header */}
            <Hero onScrollToForm={() => {
              setCurrentTab("planner");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }} />

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

            {/* Curated Sights Presets */}
            <section ref={destinationsRef} className="space-y-6 scroll-mt-24 no-print">
              <div className="space-y-2 text-center sm:text-left">
                <span className="text-[10px] bg-sky-100 text-sky-700 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                  Handpicked Sightseeing Sights
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Pre-Optimized Dream Packages
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
                  Click any package to auto-fill variables, swap parameters, and generate an AI itinerary.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {CURATED_DESTINATIONS.map((dest, i) => (
                  <div 
                    key={i}
                    onClick={() => {
                      setCurrentTab("planner");
                      setTimeout(() => {
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

                          [pickInp, destInp, daysSel, tInp, vSel, reqTxt].forEach(el => {
                            if (el) {
                              el.dispatchEvent(new Event('change', { bubbles: true }));
                            }
                          });
                        }
                      }, 120);
                    }}
                    className="group cursor-pointer bg-white/70 backdrop-blur-md border border-slate-200/60 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Visual Cover */}
                    <div className="relative h-44 overflow-hidden">
                      <img 
                        src={dest.image} 
                        alt={dest.title} 
                        referrerPolicy="no-referrer"
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

          </div>
        )}

        {/* TAB 2: DEDICATED PLANNER SECTION */}
        {currentTab === "planner" && (
          <div className="max-w-3xl mx-auto space-y-8 animate-fade-in no-print">
            <div className="text-center space-y-2">
              <span className="text-[10px] bg-sky-100 text-sky-800 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                Tailor-Made Tour Generator
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Design Your Custom Scheduled Route
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
                Provide your custom trip duration, local departures, passenger limitations and let Gemini AI arrange the perfect itinerary map.
              </p>
            </div>

            <ItineraryForm 
              onSubmit={handleFormSubmit} 
              loading={loading}
              onSelectPreset={(p) => console.log("Preset initialized across form")}
            />
          </div>
        )}

        {/* TAB 3: DEDICATED ITINERARY VIEW */}
        {currentTab === "itinerary" && (
          <div className="animate-fade-in">
            {/* If loading state is active, render beautiful consult panel */}
            {loading && (
              <div className="max-w-2xl mx-auto py-16 px-6 bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl shadow-xl flex flex-col items-center text-center space-y-6 no-print">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full border-4 border-slate-100 border-t-sky-600 animate-spin" />
                  <Compass className="w-8 h-8 text-emerald-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-bounce" />
                </div>
                
                <div className="space-y-1.5">
                  <h3 className="text-lg font-black text-slate-800">imveloTripsIndia Consulting Engine</h3>
                  <p className="text-xs text-emerald-600 font-bold tracking-wide animate-pulse">{loadingStep}</p>
                  <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed mt-2">
                    We're consulting regional database layers, estimating route highway kilometers and organizing local sightseeing spot distributions. Please hang tight!
                  </p>
                </div>
              </div>
            )}

            {!loading && itinerary && (
              <ItineraryView 
                itinerary={itinerary} 
                onReset={() => {
                  setItinerary(null);
                  setCurrentTab("planner");
                }} 
              />
            )}

            {!loading && !itinerary && (
              <div className="max-w-lg mx-auto py-16 px-8 bg-white/70 backdrop-blur-md rounded-3xl border border-slate-200/60 shadow-xl flex flex-col items-center text-center space-y-6 no-print">
                <div className="p-5 bg-sky-50 text-sky-600 rounded-3xl border border-sky-100 shadow-sm animate-pulse">
                  <Compass className="w-12 h-12 text-sky-600" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-900">No Active Tour Sights Loaded</h3>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                    You haven't structured or computed any AI day-by-day itineraries yet. Head to our Planner to generate yours.
                  </p>
                </div>
                <button
                  onClick={() => setCurrentTab("planner")}
                  className="px-6 py-3 bg-gradient-to-r from-sky-600 to-emerald-500 hover:from-sky-700 hover:to-emerald-600 text-white text-xs font-bold rounded-xl transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-1.5"
                >
                  Configure AI Planner <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: FLEET SPECS & PRICING PARAMETERS */}
        {currentTab === "fleet" && (
          <div className="space-y-12 animate-fade-in no-print">
            <div className="text-center space-y-2">
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                Fleet Capacity &amp; Tariff Guidelines
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Our Premium Chauffeured Vehicles
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
                Review available private vehicle options. The AI itinerary optimizer handles timing computations based on target speeds for these categories.
              </p>
            </div>

            {/* Fleet bento grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {FLEET_GUIDE_DATA.map((fleet, i) => (
                <div 
                  key={i} 
                  className="bg-white/80 backdrop-blur-md border border-slate-200/50 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl border ${fleet.iconColor} flex items-center justify-center`}>
                          <CarFront className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-800">{fleet.name}</h4>
                          <span className="text-[10px] text-slate-400 font-bold block">{fleet.type}</span>
                        </div>
                      </div>
                      <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded-md">
                        {fleet.comfort}
                      </span>
                    </div>

                    {/* Description details */}
                    <div className="text-[11px] text-slate-500 font-semibold space-y-1">
                      <p className="text-slate-700">Models: <span className="font-normal">{fleet.models}</span></p>
                      <p className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-sky-500" /> Seating: {fleet.capacity}</p>
                      <p className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5 text-emerald-500" /> Luggage Space: {fleet.luggage}</p>
                    </div>

                    {/* Highlights bullet point list */}
                    <ul className="space-y-1.5 pt-1.5">
                      {fleet.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 text-xs text-slate-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Estimation label */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700">
                    <span className="text-[10px] text-slate-400 uppercase">Est. Outstation Rate:</span>
                    <span className="text-emerald-700 font-black text-sm">{fleet.hourlyRateEstimate}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Translucent Pricing Guidelines Panel */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl relative overflow-hidden space-y-8">
              {/* glowing background globe decor */}
              <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-sky-500/10 blur-3xl -z-10" />
              <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl -z-10" />

              <div className="space-y-2">
                <span className="text-[10px] text-sky-400 font-extrabold uppercase tracking-widest flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> Outstation Logistics Protocol
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Transparent Pricing &amp; Mileage Guidelines
                </h3>
                <p className="text-xs text-slate-400 max-w-xl">
                  We maintain honest and direct operations. Understand how regional commercial outstation taxi packages compute pricing estimates.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-2">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4.5 space-y-1.5">
                  <div className="p-2 w-fit bg-sky-500/10 text-sky-400 rounded-xl border border-sky-500/20">
                    <Milestone className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-bold text-white">Daily Minimum Run</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Outstation bookings assume a minimum of 250 KM to 300 KM per day average calculation. Any lower usage will be charged at standard daily minimal rates.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-4.5 space-y-1.5">
                  <div className="p-2 w-fit bg-rose-500/10 text-rose-400 rounded-xl border border-rose-500/20">
                    <Percent className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-bold text-white">Tolls &amp; Border Fees</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    National highway tolls, destination municipal road taxes, and state border permit charges are calculated actuals based on your transit routes.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-4.5 space-y-1.5">
                  <div className="p-2 w-fit bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
                    <Coins className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-bold text-white">Driver DA Allowance</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Outstation schedules require driver food &amp; lodging allowance (typically ₹300 - ₹500 per day). Night allowances apply for driving after 10:00 PM.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-4.5 space-y-1.5">
                  <div className="p-2 w-fit bg-amber-500/10 text-amber-500 rounded-xl border border-amber-500/20">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-bold text-white">Clean Air &amp; Safety</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    All fleet operations adhere strictly to COVID-19 hygiene regulations. Vehicles are fully sanitized and come with commercial driver coverage.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* 5. Contact & Footer */}
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
                <li><button onClick={() => setCurrentTab("explore")} className="hover:text-emerald-400 transition-colors text-left">Shimla-Manali Hills</button></li>
                <li><button onClick={() => setCurrentTab("explore")} className="hover:text-emerald-400 transition-colors text-left">Munnar Tea Hills</button></li>
                <li><button onClick={() => setCurrentTab("explore")} className="hover:text-emerald-400 transition-colors text-left">Coorg Valley Resorts</button></li>
                <li><button onClick={() => setCurrentTab("explore")} className="hover:text-emerald-400 transition-colors text-left">Goa Beaches Route</button></li>
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
