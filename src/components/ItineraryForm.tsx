import React, { useState } from "react";
import { 
  MapPin, 
  Calendar, 
  Users, 
  Car, 
  Compass, 
  ArrowRightLeft, 
  Sparkles, 
  MessageSquare,
  AlertCircle
} from "lucide-react";
import { ItineraryRequest } from "../types";

interface ItineraryFormProps {
  onSubmit: (data: ItineraryRequest) => void;
  loading: boolean;
  onSelectPreset: (preset: ItineraryRequest) => void;
}

const VEHICLES = [
  { id: "Sedan", label: "Sedan (4 Seater - Dzire/Etios)", capacity: "1-4 Pax" },
  { id: "Ertiga", label: "Ertiga (6 Seater)", capacity: "4-6 Pax" },
  { id: "Innova", label: "Innova (7 Seater)", capacity: "4-7 Pax" },
  { id: "Innova Crysta", label: "Innova Crysta (Premium 7 Seater)", capacity: "4-7 Pax" },
  { id: "Traveller", label: "Force Traveller (12-16 Seater Luxury)", capacity: "8-16 Pax" },
  { id: "Urbania", label: "Force Urbania (Super Luxury 10-17 Seater)", capacity: "8-17 Pax" },
  { id: "Mini Bus", label: "Mini Bus (20-25 Seater COMFORT)", capacity: "15-25 Pax" },
  { id: "Bus", label: "Volvo Luxury Coach Bus (35-45 Seater)", capacity: "30-45 Pax" }
];

const LANDMARKS_REGISTRY: { [key: string]: { name: string; spots: string[] } } = {
  "athirappilly": {
    name: "Athirappilly",
    spots: ["Athirappilly Waterfalls", "Vazhachal Waterfalls", "Charpa Falls", "Thumboormuzhy Dam & Butterfly Garden"]
  },
  "athirapilly": {
    name: "Athirappilly",
    spots: ["Athirappilly Waterfalls", "Vazhachal Waterfalls", "Charpa Falls", "Thumboormuzhy Dam & Butterfly Garden"]
  },
  "kochi": {
    name: "Kochi",
    spots: ["Fort Kochi Chinese Fishing Nets", "Mattancherry Dutch Palace", "Paradesi Jewish Synagogue", "Marine Drive Promenade", "Lulu Shopping Mall"]
  },
  "cochin": {
    name: "Kochi",
    spots: ["Fort Kochi Chinese Fishing Nets", "Mattancherry Dutch Palace", "Paradesi Jewish Synagogue", "Marine Drive Promenade", "Lulu Shopping Mall"]
  },
  "kerala": {
    name: "Kerala",
    spots: ["Munnar Tea Gardens", "Alleppey Houseboat Backwaters", "Athirappilly Waterfalls", "Thekkady Periyar Wildlife Sanctuary", "Kovalam Lighthouse Beach"]
  },
  "munnar": {
    name: "Munnar",
    spots: ["Eravikulam National Park", "Mattupetty Dam", "Tea Museum & Gardens", "Echo Point", "Kundala Lake"]
  },
  "thekkady": {
    name: "Thekkady",
    spots: ["Periyar National Park Safari", "Periyar Lake Boating", "Spices Plantation Tour", "Elephant Junction", "Kadathanadan Martial Arts"]
  },
  "alleppey": {
    name: "Alleppey",
    spots: ["Vembanad Lake Houseboat Cruise", "Alappuzha Beach & Lighthouse", "Kuttanad Backwaters", "Pathiramanal Island"]
  },
  "alappuzha": {
    name: "Alleppey",
    spots: ["Vembanad Lake Houseboat Cruise", "Alappuzha Beach & Lighthouse", "Kuttanad Backwaters", "Pathiramanal Island"]
  },
  "alapuzha": {
    name: "Alleppey",
    spots: ["Vembanad Lake Houseboat Cruise", "Alappuzha Beach & Lighthouse", "Kuttanad Backwaters", "Pathiramanal Island"]
  },
  "kumarakom": {
    name: "Kumarakom",
    spots: ["Kumarakom Bird Sanctuary", "Vembanad Lake Sunset Cruise", "Aruvikkuzhi Waterfall"]
  },
  "wayanad": {
    name: "Wayanad",
    spots: ["Banasura Sagar Dam", "Edakkal Caves & Carvings", "Chembra Peak Trek", "Pookode Lake Boating", "Soochipara Waterfalls"]
  },
  "kovalam": {
    name: "Kovalam",
    spots: ["Lighthouse Beach", "Hawa Beach & Samudra Beach", "Halcyon Castle & Vizhinjam Marine Aquarium"]
  },
  "trivandrum": {
    name: "Trivandrum",
    spots: ["Sree Padmanabhaswamy Temple", "Napier Museum & Zoo", "Shangumugham Beach Sunset"]
  },
  "vagamon": {
    name: "Vagamon",
    spots: ["Pine Valley Forest", "Kurisumala Ashram & Hill", "Vagamon Meadows & Lake"]
  },
  "shimla": {
    name: "Shimla",
    spots: ["The Ridge & Mall Road", "Jakhoo Monkey Temple", "Kufri Adventure Park", "Christ Church Heritage"]
  },
  "manali": {
    name: "Manali",
    spots: ["Solang Valley Adventure", "Hadimba Temple", "Rohtang Pass Snow View", "Jogini Waterfall Trek", "Old Manali Cafes"]
  },
  "agra": {
    name: "Agra",
    spots: ["The Majestic Taj Mahal", "Agra Fort", "Fatehpur Sikri Royal Complex", "Mehtab Bagh Views"]
  },
  "jaipur": {
    name: "Jaipur",
    spots: ["Amer Fort", "Hawa Mahal (Palace of Winds)", "City Palace Museum", "Jantar Mantar Observatory", "Chokhi Dhani Ethnic Village"]
  },
  "delhi": {
    name: "Delhi",
    spots: ["Red Fort", "Qutub Minar", "India Gate", "Lotus Temple", "Humayun's Tomb", "Akshardham Temple"]
  },
  "dehradun": {
    name: "Dehradun",
    spots: ["Robber's Cave (Guchhupani)", "Sahastradhara Natural Sulphur Springs", "Mindrolling Buddhist Monastery"]
  },
  "haridwar": {
    name: "Haridwar",
    spots: ["Har Ki Pauri Ganga Aarti", "Mansa Devi Temple Cable Car", "Chandi Devi Temple"]
  },
  "rishikesh": {
    name: "Rishikesh",
    spots: ["Laxman Jhula & Ram Jhula", "Triveni Ghat Evening Aarti", "Beatles Ashram", "White Water River Rafting"]
  },
  "nainital": {
    name: "Nainital",
    spots: ["Naini Lake Yachting", "Naina Peak Views", "Snow View Point Cable Car", "Tiffin Top Sunset"]
  },
  "dharamshala": {
    name: "Dharamshala",
    spots: ["Dalai Lama Temple Complex", "Bhagsunag Waterfall & Temple", "McLeod Ganj Tibetan Cafe Trail", "HPCA Cricket Stadium"]
  },
  "mussoorie": {
    name: "Mussoorie",
    spots: ["Kempty Falls", "Mall Road Promenade", "Lal Tibba Scenic View", "Gun Hill Ropeway"]
  },
  "bangalore": {
    name: "Bangalore",
    spots: ["Lalbagh Botanical Garden", "Cubbon Park Walkways", "Bangalore Palace Tour", "Nandi Hills Sunrise"]
  },
  "bengaluru": {
    name: "Bangalore",
    spots: ["Lalbagh Botanical Garden", "Cubbon Park Walkways", "Bangalore Palace Tour", "Nandi Hills Sunrise"]
  },
  "coorg": {
    name: "Coorg",
    spots: ["Abbey Falls", "Raja's Seat Gardens", "Golden Temple (Namdroling)", "Dubare Elephant Camp"]
  },
  "mysore": {
    name: "Mysore",
    spots: ["Mysore Palace Illumination", "Chamundi Hill & Nandi", "Brindavan Gardens Fountain Show", "Mysore Zoo Heritage"]
  },
  "ooty": {
    name: "Ooty",
    spots: ["Botanical Gardens", "Ooty Lake Boating", "Doddabetta Peak Views", "Rose Garden Botanical Exhibits"]
  },
  "chikmagalur": {
    name: "Chikmagalur",
    spots: ["Mullayanagiri Peak (Highest in Karnataka)", "Baba Budangiri Heritage", "Hebbe Falls", "Kemmangundi Hill Resort"]
  },
  "pondicherry": {
    name: "Pondicherry",
    spots: ["Promenade Beach Walking", "Auroville Matrimandir", "French Quarter Colonial Walk", "Paradise Beach Island"]
  },
  "goa": {
    name: "Goa",
    spots: ["Calangute & Baga Beaches", "Basilica of Bom Jesus (UNESCO)", "Fort Aguada", "Dudhsagar Waterfalls Trail"]
  },
  "mumbai": {
    name: "Mumbai",
    spots: ["Gateway of India", "Marine Drive Promenade", "Elephanta Caves ferry ride", "Siddhivinayak Temple", "Juhu Beach Street Food"]
  },
  "pune": {
    name: "Pune",
    spots: ["Shaniwar Wada Palace Fort", "Aga Khan Palace Museum", "Sinhagad Fort Hill Trek"]
  },
  "lonavala": {
    name: "Lonavala",
    spots: ["Tiger's Leap Gorge", "Bhushi Dam Cascades", "Karla Caves & Ekvira Temple"]
  },
  "mahabaleshwar": {
    name: "Mahabaleshwar",
    spots: ["Arthur's Seat Viewpoint", "Mapro Garden Strawberry Tasting", "Venna Lake Boating"]
  }
};

export default function ItineraryForm({ onSubmit, loading, onSelectPreset }: ItineraryFormProps) {
  const [formData, setFormData] = useState<ItineraryRequest>({
    pickupLocation: "",
    destination: "",
    travelDate: new Date().toISOString().split("T")[0],
    numberOfDays: 3,
    numberOfTravelers: 2,
    vehicleType: "Sedan",
    tripType: "Round Trip",
    specialRequests: ""
  });

  const [selectedPlaces, setSelectedPlaces] = useState<string[]>([]);
  const [customPlaceInput, setCustomPlaceInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Derive suggested landmarks based on the destination input
  const getSuggestedSpots = () => {
    const destString = formData.destination.toLowerCase();
    if (!destString.trim()) return [];
    
    const foundSpots: string[] = [];
    const phrases = destString.split(/[-,\+/]|\bto\b|\band\b/);
    const matchedKeys = new Set<string>();

    phrases.forEach(phrase => {
      const trimmed = phrase.trim();
      if (!trimmed) return;
      
      for (const key in LANDMARKS_REGISTRY) {
        if (trimmed.includes(key) && !matchedKeys.has(key)) {
          matchedKeys.add(key);
          foundSpots.push(...LANDMARKS_REGISTRY[key].spots);
        }
      }
    });

    if (foundSpots.length === 0) {
      for (const key in LANDMARKS_REGISTRY) {
        if (destString.includes(key) && !matchedKeys.has(key)) {
          matchedKeys.add(key);
          foundSpots.push(...LANDMARKS_REGISTRY[key].spots);
        }
      }
    }
    return foundSpots;
  };

  const suggestedSpots = getSuggestedSpots();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setError(null);
    setFormData(prev => {
      const updated = {
        ...prev,
        [name]: name === "numberOfDays" || name === "numberOfTravelers" ? parseInt(value) || 0 : value
      };
      
      // Auto-populate sightseeing places if destination matches our LANDMARKS_REGISTRY
      if (name === "destination") {
        const destLower = value.toLowerCase().trim();
        if (destLower) {
          const matchedSpots: string[] = [];
          for (const key in LANDMARKS_REGISTRY) {
            if (destLower.includes(key)) {
              matchedSpots.push(...LANDMARKS_REGISTRY[key].spots);
            }
          }
          if (matchedSpots.length > 0) {
            setSelectedPlaces(prevSpots => {
              const merged = new Set([...prevSpots, ...matchedSpots]);
              return Array.from(merged);
            });
          }
        } else {
          setSelectedPlaces([]);
        }
      }
      return updated;
    });
  };

  const handleTripTypeChange = (type: 'One Way' | 'Round Trip') => {
    setFormData(prev => ({ ...prev, tripType: type }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Dynamic field validation
    if (!formData.pickupLocation.trim()) {
      setError("Please specify a Pickup Location.");
      return;
    }
    if (!formData.destination.trim()) {
      setError(formData.tripType === "One Way" ? "Please specify a destination address or city." : "Please specify destination(s) to visit.");
      return;
    }
    if (formData.numberOfDays <= 0 || formData.numberOfDays > 15) {
      setError("Please specify travel duration between 1 and 15 days.");
      return;
    }
    if (formData.numberOfTravelers <= 0) {
      setError("Please specify at least 1 traveler.");
      return;
    }

    let finalPlaces = [...selectedPlaces];
    
    // Automatically include custom typed place if they forgot to click add
    if (customPlaceInput.trim() && !finalPlaces.includes(customPlaceInput.trim())) {
      finalPlaces.push(customPlaceInput.trim());
    }

    // Automatically synchronize/fallback to destination entries if they didn't select custom ones
    if (finalPlaces.length === 0) {
      const items = formData.destination
        .split(/[,;&]|\band\b|\bto\b/)
        .map(s => s.trim())
        .filter(Boolean);
      if (items.length > 0) {
        finalPlaces = items;
      }
    }

    // If still empty (practically impossible because destination is not empty)
    if (finalPlaces.length === 0) {
      setError("Please select or add at least 1 sightseeing place to visit.");
      return;
    }

    onSubmit({
      ...formData,
      selectedPlaces: finalPlaces
    });
  };

  const getPresetSpots = (destString: string) => {
    const destLower = destString.toLowerCase();
    const foundSpots: string[] = [];
    for (const key in LANDMARKS_REGISTRY) {
      if (destLower.includes(key)) {
        foundSpots.push(...LANDMARKS_REGISTRY[key].spots);
      }
    }
    return foundSpots;
  };

  const loadPreset = (pickup: string, dest: string, days: number, travelers: number, vehicle: string, trip: 'One Way' | 'Round Trip', request: string = "") => {
    const presetData: ItineraryRequest = {
      pickupLocation: pickup,
      destination: dest,
      travelDate: new Date(Date.now() + 86400000 * 7).toISOString().split("T")[0], // 1 week from now
      numberOfDays: days,
      numberOfTravelers: travelers,
      vehicleType: vehicle,
      tripType: trip,
      specialRequests: request
    };
    setFormData(presetData);
    
    // Auto populate the selected places corresponding to preset destination
    const spots = getPresetSpots(dest);
    setSelectedPlaces(spots);
    
    onSelectPreset(presetData);
  };

  return (
    <div id="itinerary-form-section" className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden scroll-mt-24 transition-all duration-300">
      
      {/* Container Header Banner */}
      <div className="bg-gradient-to-r from-sky-700 via-sky-600 to-emerald-600 px-6 py-6 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
            <Compass className="w-6 h-6 text-emerald-300 animate-spin-slow" />
            Plan Your Scenic Fleet Journey
          </h2>
          <p className="text-slate-100 text-xs sm:text-sm mt-1">
            Input travel details to generate an instant premium schedule and route metrics.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {/* Quick interactive shortcuts to pre-populate */}
          <button 
            type="button"
            onClick={() => loadPreset("New Delhi", "Shimla-Manali Retreat", 5, 4, "Innova Crysta", "Round Trip", "Scenic photography points, pure local Himachali lunch places")}
            className="px-3 py-1.5 text-[11px] font-bold bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors cursor-pointer"
          >
            🏔️ Shimla Preset
          </button>
          <button 
            type="button"
            onClick={() => loadPreset("Cochin Airport", "Munnar Tea Hills", 3, 2, "Sedan", "Round Trip", "Looking for tranquil waterfalls and premium spice garden tours")}
            className="px-3 py-1.5 text-[11px] font-bold bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors cursor-pointer"
          >
            🌿 Munnar Preset
          </button>
          <button 
            type="button"
            onClick={() => loadPreset("Bangalore", "Coorg Coffee Estate", 4, 6, "Ertiga", "Round Trip", "Include trekking suggestions, plantation tour")}
            className="px-3 py-1.5 text-[11px] font-bold bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors cursor-pointer"
          >
            ☕ Coorg Preset
          </button>
        </div>
      </div>

      <form onSubmit={handleFormSubmit} className="p-6 sm:p-8 space-y-6">
        
        {/* Error prompt */}
        {error && (
          <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 text-sm rounded-2xl flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}

        {/* 1. Trip Type Switch */}
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold text-slate-700">Trip Mode:</span>
          <div className="bg-slate-100 p-1 rounded-xl flex items-center border border-slate-200">
            <button
              type="button"
              onClick={() => handleTripTypeChange("Round Trip")}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                formData.tripType === "Round Trip"
                  ? "bg-white text-sky-700 shadow-sm border border-slate-200/50"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              🔄 Round Trip
            </button>
            <button
              type="button"
              onClick={() => handleTripTypeChange("One Way")}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                formData.tripType === "One Way"
                  ? "bg-white text-sky-700 shadow-sm border border-slate-200/50"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              ➡️ One Way
            </button>
          </div>
        </div>

        {/* 2. Form Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Pickup Location */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-sky-500" />
              Pickup Location
            </label>
            <div className="relative">
              <input
                type="text"
                name="pickupLocation"
                id="pickupLocation-input"
                placeholder="City name, airport or hotel pickup"
                value={formData.pickupLocation}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-800 text-sm transition-all shadow-inner"
              />
            </div>
            <p className="text-[11px] text-slate-500">Provide any starting hub name (e.g. Cochin, Delhi, Mumbai)</p>
          </div>

          {/* Destination */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-500" />
              {formData.tripType === "One Way" ? "Destination Address / City" : "Places to visit"}
            </label>
            <input
              type="text"
              name="destination"
              id="destination-input"
              placeholder={formData.tripType === "One Way" ? "e.g. Munnar, Shimla, Jaipur, Goa" : "e.g. Munnar - Thekkady - Alleppey"}
              value={formData.destination}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-800 text-sm transition-all shadow-inner"
            />
            <p className="text-[11px] text-slate-500">
              {formData.tripType === "One Way"
                ? "The destination address or city where you wish to be dropped off."
                : "The primary list of highlights, local spots, or town route you want to explore."}
            </p>
          </div>

          {/* Travel Date */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-emerald-500" />
              Departure Date
            </label>
            <input
              type="date"
              name="travelDate"
              id="travelDate-input"
              value={formData.travelDate}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-800 text-sm transition-all"
            />
          </div>

          {/* Duration Days */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-sky-500" />
              Trip Duration (Days)
            </label>
            <select
              name="numberOfDays"
              id="numberOfDays-select"
              value={formData.numberOfDays}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-800 text-sm transition-all"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15].map(day => (
                <option key={day} value={day}>{day} {day === 1 ? 'Day' : 'Days'}</option>
              ))}
            </select>
          </div>

          {/* Number of Travelers */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-sky-500" />
              Total Passengers
            </label>
            <input
              type="number"
              name="numberOfTravelers"
              id="numberOfTravelers-input"
              min="1"
              max="50"
              value={formData.numberOfTravelers}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-800 text-sm transition-all"
            />
          </div>

          {/* Vehicle type */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
              <Car className="w-4 h-4 text-emerald-500" />
              Vehicle Class Selection
            </label>
            <select
              name="vehicleType"
              id="vehicleType-select"
              value={formData.vehicleType}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-800 text-sm transition-all"
            >
              {VEHICLES.map(vehicle => (
                <option key={vehicle.id} value={vehicle.id}>{vehicle.label} – {vehicle.capacity}</option>
              ))}
            </select>
          </div>

        </div>

        {/* 2.5. Selected Places Checklist / Manual Input Segment (MANDATORY) */}
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
            <div>
              <label className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-emerald-600 animate-spin-slow" />
                Select Sightseeing Places to Visit <span className="text-rose-500 font-extrabold">*</span>
              </label>
              <p className="text-[11px] text-slate-500 mt-0.5">Pick matching real spots below, or type custom places. Selected list is mandatory.</p>
            </div>
            {suggestedSpots.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  // Select all suggested spots
                  const uniqueList = Array.from(new Set([...selectedPlaces, ...suggestedSpots]));
                  setSelectedPlaces(uniqueList);
                }}
                className="text-[10px] font-black bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-lg border border-emerald-200 transition-colors uppercase tracking-wider"
              >
                ✓ Select All Suggested
              </button>
            )}
          </div>

          {/* Preset/Suggested Places for the typed destination */}
          {suggestedSpots.length > 0 && (
            <div className="space-y-2">
              <span className="text-[10px] bg-sky-50 text-sky-700 px-2 py-0.5 rounded font-black uppercase tracking-wider">Suggested from {formData.destination} Registry</span>
              <div className="flex flex-wrap gap-2 pt-1">
                {suggestedSpots.map((spot, i) => {
                  const isSelected = selectedPlaces.includes(spot);
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        if (isSelected) {
                          setSelectedPlaces(selectedPlaces.filter(s => s !== spot));
                        } else {
                          setSelectedPlaces([...selectedPlaces, spot]);
                        }
                      }}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition-all flex items-center gap-1 cursor-pointer ${
                        isSelected
                          ? "bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-500 shadow-sm"
                          : "bg-white hover:bg-slate-100 text-slate-700 border-slate-200"
                      }`}
                    >
                      {isSelected ? "✓ " : "+ "}
                      {spot}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Selected Places display checklist */}
          <div className="space-y-2.5">
            <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-black uppercase tracking-wider">Active Selected Places ({selectedPlaces.length})</span>
            {selectedPlaces.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-sans">
                {selectedPlaces.map((spot, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200 shadow-sm">
                    <span className="text-xs font-medium text-slate-800 break-all">{spot}</span>
                    <button
                      type="button"
                      onClick={() => setSelectedPlaces(selectedPlaces.filter(s => s !== spot))}
                      className="text-slate-400 hover:text-rose-600 p-1 rounded-lg hover:bg-rose-50 transition-all cursor-pointer font-bold text-xs"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 border border-dashed border-slate-200 bg-white rounded-2xl text-xs text-slate-400 font-medium">
                No spots selected yet. Try typing a destination (like 'Munnar' or 'Coorg') to view options, or add custom places below.
              </div>
            )}
          </div>

          {/* Custom place insertion field */}
          <div className="space-y-1.5 pt-2 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <input
              type="text"
              placeholder="Type any other real place name (e.g. Abbey Falls) and click Add"
              value={customPlaceInput}
              onChange={(e) => setCustomPlaceInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  if (customPlaceInput.trim()) {
                    if (!selectedPlaces.includes(customPlaceInput.trim())) {
                      setSelectedPlaces([...selectedPlaces, customPlaceInput.trim()]);
                    }
                    setCustomPlaceInput("");
                  }
                }
              }}
              className="flex-1 px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-800 text-xs font-medium"
            />
            <button
              type="button"
              onClick={() => {
                if (customPlaceInput.trim()) {
                  if (!selectedPlaces.includes(customPlaceInput.trim())) {
                    setSelectedPlaces([...selectedPlaces, customPlaceInput.trim()]);
                  }
                  setCustomPlaceInput("");
                }
              }}
              className="px-4 py-2.5 bg-slate-850 hover:bg-slate-900 text-white text-xs font-bold rounded-xl transition-all cursor-pointer shrink-0 text-center"
            >
              + Add Place
            </button>
          </div>
        </div>

        {/* 3. Special Requests */}
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4 text-slate-400" />
            Special Requests & Diet Preferences (Optional)
          </label>
          <textarea
            name="specialRequests"
            id="specialRequests-textarea"
            rows={3}
            placeholder="e.g., Include local vegetarian meal hot spots, avoid long trekking, focus on family leisure, include early morning visits to temples."
            value={formData.specialRequests}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-800 text-sm transition-all resize-none"
          />
        </div>

        {/* Form Submission Button */}
        <button
          type="submit"
          id="submit-button"
          disabled={loading}
          className={`w-full py-4 rounded-xl font-bold text-white text-base transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-xl ${
            loading 
              ? "bg-slate-400 cursor-not-allowed" 
              : "bg-gradient-to-r from-sky-600 via-sky-500 to-emerald-500 hover:from-sky-700 hover:to-emerald-600"
          }`}
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Analyzing Travel Route with Gemini AI...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
              <span>Generate AI Day-by-Day Itinerary</span>
            </>
          )}
        </button>

      </form>
    </div>
  );
}
