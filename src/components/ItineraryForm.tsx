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

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "numberOfDays" || name === "numberOfTravelers" ? parseInt(value) || 0 : value
    }));
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
      setError("Please specify a destination city.");
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

    onSubmit(formData);
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
              Destination City
            </label>
            <input
              type="text"
              name="destination"
              id="destination-input"
              placeholder="e.g. Munnar, Shimla, Jaipur, Goa"
              value={formData.destination}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-800 text-sm transition-all shadow-inner"
            />
            <p className="text-[11px] text-slate-500">The destination or route you wish to explore primarily.</p>
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
