import express, { Request, Response } from "express";
import path from "path";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Extensive Coordinate Registry of all major hubs & destinations (for physical Haversine and routing calculation)
const PLACE_COORDINATES: { [key: string]: { lat: number; lng: number; name: string } } = {
  "cochin": { lat: 9.9312, lng: 76.2673, name: "Kochi" },
  "kochi": { lat: 9.9312, lng: 76.2673, name: "Kochi" },
  "munnar": { lat: 10.0889, lng: 77.0595, name: "Munnar" },
  "thekkady": { lat: 9.6031, lng: 77.1615, name: "Thekkady" },
  "alleppey": { lat: 9.4981, lng: 76.3388, name: "Alleppey" },
  "alappuzha": { lat: 9.4981, lng: 76.3388, name: "Alleppey" },
  "alapuzha": { lat: 9.4981, lng: 76.3388, name: "Alleppey" },
  "kumarakom": { lat: 9.5916, lng: 76.4222, name: "Kumarakom" },
  "wayanad": { lat: 11.6854, lng: 76.1320, name: "Wayanad" },
  "kovalam": { lat: 8.4004, lng: 76.9784, name: "Kovalam" },
  "trivandrum": { lat: 8.5241, lng: 76.9366, name: "Trivandrum" },
  "vagamon": { lat: 9.6872, lng: 76.9038, name: "Vagamon" },
  "delhi": { lat: 28.6139, lng: 77.2090, name: "Delhi" },
  "shimla": { lat: 31.1048, lng: 77.1734, name: "Shimla" },
  "manali": { lat: 32.2396, lng: 77.1887, name: "Manali" },
  "agra": { lat: 27.1767, lng: 78.0081, name: "Agra" },
  "jaipur": { lat: 26.9124, lng: 75.7873, name: "Jaipur" },
  "dehradun": { lat: 30.3165, lng: 78.0322, name: "Dehradun" },
  "haridwar": { lat: 29.9457, lng: 78.1642, name: "Haridwar" },
  "rishikesh": { lat: 30.0869, lng: 78.2676, name: "Rishikesh" },
  "nainital": { lat: 29.3803, lng: 79.4630, name: "Nainital" },
  "dharamshala": { lat: 32.2190, lng: 76.3234, name: "Dharamshala" },
  "mussoorie": { lat: 30.4598, lng: 78.0772, name: "Mussoorie" },
  "bangalore": { lat: 12.9716, lng: 77.5946, name: "Bangalore" },
  "bengaluru": { lat: 12.9716, lng: 77.5946, name: "Bangalore" },
  "coorg": { lat: 12.4244, lng: 75.7382, name: "Coorg" },
  "mysore": { lat: 12.2958, lng: 76.6394, name: "Mysore" },
  "ooty": { lat: 11.4102, lng: 76.6950, name: "Ooty" },
  "chikmagalur": { lat: 13.3161, lng: 75.7720, name: "Chikmagalur" },
  "kabini": { lat: 11.9167, lng: 76.2500, name: "Kabini" },
  "nandi hills": { lat: 13.3702, lng: 77.6835, name: "Nandi Hills" },
  "pondicherry": { lat: 11.9416, lng: 79.8083, name: "Pondicherry" },
  "goa": { lat: 15.4909, lng: 73.8278, name: "Goa" },
  "mumbai": { lat: 19.0760, lng: 72.8777, name: "Mumbai" },
  "lonavala": { lat: 18.7543, lng: 73.4050, name: "Lonavala" },
  "mahabaleshwar": { lat: 17.9307, lng: 73.6477, name: "Mahabaleshwar" },
  "pune": { lat: 18.5204, lng: 73.8567, name: "Pune" },
  "shirdi": { lat: 19.7661, lng: 74.4762, name: "Shirdi" },
  "alibaug": { lat: 18.6584, lng: 72.8777, name: "Alibaug" },
  "chennai": { lat: 13.0827, lng: 80.2707, name: "Chennai" },
  "tirupati": { lat: 13.6288, lng: 79.4192, name: "Tirupati" },
  "yelagiri": { lat: 12.5781, lng: 78.6360, name: "Yelagiri" },
  "kodaikanal": { lat: 10.2381, lng: 77.4892, name: "Kodaikanal" }
};

// Exact driving roadmap segment distance overwrites (in KM) matching standard Indian routes
const SEGMENT_OVERWRITES: { [key: string]: { [key: string]: number } } = {
  "cochin": { "munnar": 125, "thekkady": 160, "alleppey": 85, "kumarakom": 80, "wayanad": 260, "kovalam": 220, "trivandrum": 205, "vagamon": 105 },
  "kochi": { "munnar": 125, "thekkady": 160, "alleppey": 85, "kumarakom": 80, "wayanad": 260, "kovalam": 220, "trivandrum": 205, "vagamon": 105 },
  "munnar": { "thekkady": 110, "alleppey": 170, "kumarakom": 150 },
  "thekkady": { "alleppey": 140, "kumarakom": 120 },
  "alleppey": { "kumarakom": 35, "kovalam": 160, "trivandrum": 150 },
  "kumarakom": { "kovalam": 170, "trivandrum": 160 },
  "kovalam": { "trivandrum": 15 },
  "bangalore": { "mysore": 145, "coorg": 255, "ooty": 270, "wayanad": 280, "chikmagalur": 245, "kabini": 210, "pondicherry": 310, "goa": 560 },
  "mysore": { "coorg": 110, "ooty": 125, "wayanad": 130, "chikmagalur": 180, "kabini": 60 },
  "coorg": { "ooty": 225, "wayanad": 120, "chikmagalur": 140 },
  "ooty": { "wayanad": 110, "kodaikanal": 250 },
  "delhi": { "agra": 235, "jaipur": 270, "shimla": 345, "manali": 535, "dehradun": 250, "haridwar": 220, "rishikesh": 240, "nainital": 300, "dharamshala": 475 },
  "agra": { "jaipur": 240 },
  "shimla": { "manali": 250 },
  "manali": { "dharamshala": 220 },
  "haridwar": { "rishikesh": 25, "dehradun": 50 },
  "rishikesh": { "dehradun": 45 },
  "dehradun": { "mussoorie": 35 },
  "mumbai": { "lonavala": 85, "mahabaleshwar": 260, "goa": 590, "pune": 150, "shirdi": 240, "alibaug": 100 },
  "lonavala": { "pune": 65, "mahabaleshwar": 180 },
  "pune": { "mahabaleshwar": 120, "shirdi": 185 },
  "chennai": { "pondicherry": 150, "tirupati": 135, "yelagiri": 230, "kodaikanal": 530, "ooty": 550 }
};

// Parse compound strings like "Munnar - Thekkady - Alleppey" or comma-separated lists of cities
function parseRouteCities(input: string): string[] {
  const normalized = input.toLowerCase();
  const splitted = normalized.split(/[-,\+/]|\bto\b|\band\b/);
  const found: string[] = [];

  splitted.forEach(part => {
    const trimmed = part.trim();
    if (!trimmed) return;

    let matchedKey: string | null = null;
    for (const key in PLACE_COORDINATES) {
      if (trimmed === key || trimmed.includes(key)) {
        matchedKey = key;
        break;
      }
    }
    found.push(matchedKey || trimmed);
  });

  return found.length > 0 ? found : [normalized.trim()];
}

// Compute driving segment distance using actual values or precise Haversine with circuity correction
function getSegmentKM(cityA: string, cityB: string): number {
  const a = cityA.toLowerCase().trim();
  const b = cityB.toLowerCase().trim();

  if (a === b) return 0;

  // Check exact segment overwrites in our static table
  if (SEGMENT_OVERWRITES[a] && SEGMENT_OVERWRITES[a][b] !== undefined) {
    return SEGMENT_OVERWRITES[a][b];
  }
  if (SEGMENT_OVERWRITES[b] && SEGMENT_OVERWRITES[b][a] !== undefined) {
    return SEGMENT_OVERWRITES[b][a];
  }

  // Fallback: Haversine distance with circuity factor
  const coordA = PLACE_COORDINATES[a];
  const coordB = PLACE_COORDINATES[b];

  if (coordA && coordB) {
    const R = 6371; // Earth's radius in km
    const dLat = (coordB.lat - coordA.lat) * Math.PI / 180;
    const dLng = (coordB.lng - coordA.lng) * Math.PI / 180;
    const lat1 = coordA.lat * Math.PI / 180;
    const lat2 = coordB.lat * Math.PI / 180;

    const arc = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(arc), Math.sqrt(1 - arc));
    const rawDistance = R * c;

    // Circuity factor for mountain range road curves: averages 1.35x line of sight in India
    return Math.round(rawDistance * 1.35);
  }

  // Ultimate hash fallback if totally unrecognized, but very consistent
  const combined = (a + b).toLowerCase();
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    hash = combined.charCodeAt(i) + ((hash << 5) - hash);
  }
  return 120 + (Math.abs(hash) % 201); // 120km to 320km
}

// Compute total multi-stop route Kilometer with local sightseeing factored in for Round Trips
function computeTotalKM(pickup: string, destination: string, tripType: string, daysCount: number): number {
  const pickupTokens = parseRouteCities(pickup);
  const pickupToken = pickupTokens[0] || pickup.toLowerCase().trim();
  const destTokens = parseRouteCities(destination);

  let totalKm = 0;
  let currentLoc = pickupToken;

  // Segment chain: Pickup -> Dest 1 -> Dest 2 -> ... -> Dest N
  destTokens.forEach(dest => {
    totalKm += getSegmentKM(currentLoc, dest);
    currentLoc = dest;
  });

  if (tripType === "Round Trip") {
    // Round trip goes back to the initial pickup location
    totalKm += getSegmentKM(currentLoc, pickupToken);
    
    // Add local sightseeing mileage: standard covers ~50 km per day of local sight tours
    totalKm += (daysCount * 50);
  }

  return Math.max(40, totalKm);
}

// Initialize GoogleGenAI SDK with useragent header as required by the system skill
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
  try {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
    console.log("GoogleGenAI initialized successfully with backend API key.");
  } catch (error) {
    console.error("Failed to initialize GoogleGenAI SDK:", error);
  }
} else {
  console.log("No valid GEMINI_API_KEY found. Utilizing high-fidelity local itinerary planner backup.");
}

const LANDMARKS_REGISTRY: { [key: string]: { name: string; spots: string[] } } = {
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

// Helper to generate a highly structured mock itinerary when key is missing or fails
function generateMockItinerary(reqBody: any): any {
  const {
    pickupLocation,
    destination,
    travelDate,
    numberOfDays,
    numberOfTravelers,
    vehicleType,
    tripType,
    specialRequests,
    selectedPlaces = []
  } = reqBody;

  const daysCount = parseInt(numberOfDays) || 3;
  const travelers = parseInt(numberOfTravelers) || 2;
  const vehicle = vehicleType || "Sedan";

  // Calculate high-fidelity distance parameters using our path computer
  const distance = computeTotalKM(pickupLocation, destination, tripType, daysCount);
  const drivingTimeStr = `${(distance / 50).toFixed(1)} hours${tripType === "Round Trip" ? " (includes local sightseeing)" : ""}`;

  // Realistic billing based on premium rates for different classes of vehicle
  const rates: { [key: string]: number } = {
    "Sedan": 14,
    "Ertiga": 17,
    "Innova": 21,
    "Innova Crysta": 24,
    "Traveller": 28,
    "Urbania": 36,
    "Mini Bus": 48,
    "Bus": 65
  };
  const rate = rates[vehicle] || 14;
  const baseCost = distance * rate;
  const driverCharge = daysCount * 450;

  // Enforce customer's selected places under MANDATORY constraints
  let spotsToUse: string[] = [];
  if (selectedPlaces && selectedPlaces.length > 0) {
    spotsToUse = [...selectedPlaces];
  } else {
    // Re-resolve matching spots in case none passed
    const destLower = destination.toLowerCase();
    const matchedKey = Object.keys(LANDMARKS_REGISTRY).find(key => destLower.includes(key));
    if (matchedKey) {
      spotsToUse = [...LANDMARKS_REGISTRY[matchedKey].spots];
    } else {
      spotsToUse = ["Local Scenic Highlights", "Famous Town Center", "Traditional Crafts Market"];
    }
  }

  // Distribute spots intelligently across active days: cluster by city to avoid back-and-forth travel
  const getSpotCity = (spotName: string): string => {
    const sLower = spotName.toLowerCase().trim();
    for (const key in LANDMARKS_REGISTRY) {
      if (LANDMARKS_REGISTRY[key].spots.some(rs => {
        const rsLower = rs.toLowerCase();
        return rsLower === sLower || sLower.includes(rsLower) || rsLower.includes(sLower);
      })) {
        return LANDMARKS_REGISTRY[key].name;
      }
    }
    for (const key in LANDMARKS_REGISTRY) {
      if (sLower.includes(key)) {
        return LANDMARKS_REGISTRY[key].name;
      }
    }
    return "Other";
  };

  const cityGroups: { [city: string]: string[] } = {};
  const cityOrder: string[] = [];
  spotsToUse.forEach(spot => {
    const city = getSpotCity(spot);
    if (!cityGroups[city]) {
      cityGroups[city] = [];
      cityOrder.push(city);
    }
    cityGroups[city].push(spot);
  });

  const sequentialSpots: string[] = [];
  cityOrder.forEach(city => {
    sequentialSpots.push(...cityGroups[city]);
  });

  const daysSpots: string[][] = Array.from({ length: daysCount }, () => []);
  const spotsPerDay = Math.ceil(sequentialSpots.length / daysCount);
  sequentialSpots.forEach((spot, idx) => {
    const dayIdx = Math.min(daysCount - 1, Math.floor(idx / spotsPerDay));
    daysSpots[dayIdx].push(spot);
  });

  const mockDays = [];
  for (let i = 1; i <= daysCount; i++) {
    const daySpots = daysSpots[i - 1] || [];

    const highlights = daySpots.length > 0
      ? daySpots.map(spot => `Guided tour of ${spot}`)
      : [`Relax and explore local town streets in ${destination}`, "Savor fine regional hospitality options"];

    if (highlights.length < 3) {
      highlights.push(`Taste authentic premium dining dishes matching your flavor requests`);
      highlights.push(`Smooth local travel managed by your dedicated ${vehicle} chauffeur`);
    }

    const activities = daySpots.map((spot, spotIdx) => {
      return {
        time: `Stop ${spotIdx + 1}`,
        title: `Sightseeing at ${spot}`,
        description: `Explore the magnificent architecture, stunning vistas, and local historical facets of ${spot}. Spend quality time enjoying activities.`,
        location: spot
      };
    });

    if (activities.length === 0) {
      activities.push({
        time: "Stop 1",
        title: "Leisure Exploration & Shopping",
        description: `Dedicated leisure day window in ${destination}. Stroll across regional craft boutiques and enjoy local street flavors at your absolute pacing preference.`,
        location: `${destination} Town Center`
      });
    }

    // Determine day cities to construct simple location-specific title for each day
    const dayCities = Array.from(new Set(daySpots.map(spot => getSpotCity(spot)).filter(c => c !== "Other")));
    let dayLocationStr = dayCities.join(" & ");
    if (!dayLocationStr) {
      dayLocationStr = destination;
    }

    mockDays.push({
      dayNumber: i,
      title: `Exploring ${dayLocationStr}`,
      highlights: highlights.slice(0, 3),
      sightseeingOrder: daySpots.length > 0 ? daySpots : [`${destination} Leisure Window`],
      activities,
      meals: {
        breakfast: `Healthy local organic breakfast buffet at your ${destination} premium lodging`,
        lunch: `Tailored local lunch catering to your requests near your active sightseeing points`,
        dinner: `Authentic traditional dinner serving regional specialties at high-class venue`
      },
      estimatedTravelTime: `${Math.floor(1 + Math.random() * 2)}.5 hours of active local road travel`,
      nightStay: `Luxury Hotel or Resort in ${dayLocationStr}`,
      dailyHighlight: daySpots.length > 0 
        ? `Memorable evening exploring the iconic landmarks of ${daySpots[daySpots.length - 1]}.`
        : `A relaxing evening enjoying the grand hospitality and premium atmosphere in ${dayLocationStr}.`
    });
  }

  return {
    tripSummary: `A beautiful personalized travel itinerary starting from ${pickupLocation} and taking you through the exquisite sightseeing spots in ${destination}. Perfectly arranged for ${travelers} travelers driving in a comfortable private chauffeured ${vehicle} for ${daysCount} complete days.`,
    pickupLocation,
    destination,
    travelDate,
    vehicleType: vehicle,
    numberOfTravelers: travelers,
    tripType,
    totalDurationDays: daysCount,
    estimatedDistanceKm: `${distance} km`,
    estimatedDrivingTime: drivingTimeStr,
    days: mockDays,
    returnJourneyDetails: tripType === "Round Trip" 
      ? `After scenic afternoon visits, check out from the hotel and begin your comfortable return travel back to ${pickupLocation} in your private ${vehicle}.`
      : `Complete your comfortable final day-out and check-out, with standard drop-off at your central ${destination} transit hub.`,
    tips: [
      "Carry comfortable, supportive walking footwear for outdoor exploration.",
      "Stay hydrated during sightseeing excursions to beat fatigue.",
      "Inform your professional driver of any changes to scheduled stops early."
    ],
    estimatedCostRange: {
      min: Math.round(baseCost + driverCharge),
      max: Math.round((baseCost * 1.15) + driverCharge + 1000),
      currency: "INR"
    }
  };
}

// Endpoint to generate Itinerary
app.post("/api/generate-itinerary", async (req: Request, res: Response) => {
  try {
    const { 
      pickupLocation, 
      destination, 
      travelDate, 
      numberOfDays, 
      numberOfTravelers, 
      vehicleType, 
      tripType, 
      specialRequests,
      selectedPlaces = []
    } = req.body;

    // Validate inputs
    if (!pickupLocation || !destination || !travelDate || !numberOfDays || !numberOfTravelers || !vehicleType || !tripType) {
       res.status(400).json({ error: "Missing required fields in the booking request." });
       return;
    }

    if (!ai) {
      // Graceful fallback to rich structured mock calculation
      console.log("Using backup local planner for:", destination);
      const mockResult = generateMockItinerary(req.body);
      res.json(mockResult);
      return;
    }

    const sysPrompt = `You are a world-class premier travel planner and concierge service. Your job is to generate a comprehensive, highly customized, and visually impressive day-wise travel itinerary from a "Pickup Location" to a "Destination" for a specified number of travel days, travelers, and vehicle type.
You MUST adhere strictly to the list of user-selected sightseeing places. Do NOT invent or include generic sightseeing attractions under any circumstances. Every sightseeing location in the itinerary days must map elements from the user's selected list.
Your response MUST comply strictly with the JSON schema requested. Do not return any extra markdown text outside the valid JSON object.`;

    const userPrompt = `Please plan an amazing, highly customized travel itinerary with these parameters:
- Pickup Location: ${pickupLocation}
- Destination: ${destination}
- Travel Date: ${travelDate}
- Duration: ${numberOfDays} days
- Number of Travelers: ${numberOfTravelers} adults
- Private Vehicle Selected: ${vehicleType}
- Journey Type: ${tripType}
- Selected Sightseeing Places to Visit: ${JSON.stringify(selectedPlaces)}
- Custom preferences/requests: ${specialRequests || "None"}.

ABSOLUTE MANDATORY RULES FOR PLACES AND SIGHTSEEING:
1. You MUST use the EXACT Selected Sightseeing Places list: ${JSON.stringify(selectedPlaces)}.
2. Every place mentioned in the weekly highlights, daily "sightseeingOrder" list, and daily "activities" MUST come from this provided list.
3. Each of the customer's selected places should appear exactly once across the entire multi-day itinerary. Do not repeat the same attraction on different days.
4. Arrange the sightseeing order for each day optimally by driving distance, road connectivity, starting from breakfast and staying near the last sightseeing landmark of the day.
5. NEVER replace the customer's selected places under any circumstances.
6. NEVER invent generic landmarks or sightseeing locations (e.g., do NOT generate "Grand City Palace", "Beautiful Scenic Overlook", "Heritage Museum", "Adventure Sports Arena", "Mystic Botanical Gardens", "Sunset View Point", "Cultural Village", "Scenic Lake", or "Historic Fort").
7. GEOGRAPHICAL GROUPING RULE: You MUST cluster the selected places by city/region/sub-area. For example, if some selected places are in Munnar and others are in Thekkady, make sure Munnar places are scheduled together on one day (e.g. Day 1), and Thekkady places are scheduled together on a different day (e.g. Day 2). DO NOT mix places from different remote cities/areas on the same day. Each day should be dedicated to a single main city/region.

Make sure to estimate travel distance (KM) and total driving time realistically based on the route between ${pickupLocation} and ${destination}. Suggest Breakfast, Lunch, Dinner, optimized daily sightseeing order, sequential visit stops (e.g. "Stop 1", "Stop 2" in order of visit), activities, daily highlights, night stay locations, return journey on the final day, and three helpful travel tips. Provide an estimated cost range in INR (Indian Rupees) representing the total package feel.`;

    console.log("Sending itinerary request to Gemini API...");
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: sysPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tripSummary: { type: Type.STRING, description: "Elegant personalized introductory paragraph of the trip" },
            pickupLocation: { type: Type.STRING },
            destination: { type: Type.STRING },
            travelDate: { type: Type.STRING },
            vehicleType: { type: Type.STRING },
            numberOfTravelers: { type: Type.INTEGER },
            tripType: { type: Type.STRING },
            totalDurationDays: { type: Type.INTEGER },
            estimatedDistanceKm: { type: Type.STRING, description: "Estimated physical road travel distance between pickup and destination e.g. '380 km'" },
            estimatedDrivingTime: { type: Type.STRING, description: "Estimated driving time e.g. '7.5 hours'" },
            returnJourneyDetails: { type: Type.STRING, description: "Details of drop-off or closing return trip on the final evening" },
            tips: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3 expert traveler guidelines for these locations"
            },
            days: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  dayNumber: { type: Type.INTEGER },
                  title: { type: Type.STRING, description: "Theme/region being toured today, formatted simply e.g., 'Exploring Munnar' or 'Exploring Munnar & Thekkady'. Identify which cities/sights are being visited today and include them. Avoid generic words like 'Transit', 'Curated', 'Grand', 'Core', 'Program', or 'Detailed'. Keep it simple and natural for travelers." },
                  highlights: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "3 quick visual bullets for this day"
                  },
                  sightseeingOrder: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "List of sightseeing locations in their recommended visiting sequence"
                  },
                  activities: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        time: { type: Type.STRING, description: "Sequential step name e.g., 'Stop 1' or 'Stop 2' indicating visit sequence" },
                        title: { type: Type.STRING, description: "Short title of activity" },
                        description: { type: Type.STRING, description: "Detailed summary of what they will see or do" },
                        location: { type: Type.STRING, description: "Name of the spot/place" }
                      },
                      required: ["time", "title", "description", "location"]
                    }
                  },
                  meals: {
                    type: Type.OBJECT,
                    properties: {
                      breakfast: { type: Type.STRING },
                      lunch: { type: Type.STRING },
                      dinner: { type: Type.STRING }
                    },
                    required: ["breakfast", "lunch", "dinner"]
                  },
                  estimatedTravelTime: { type: Type.STRING, description: "Estimated day's driving and touring duration, e.g., '2.5 hours of driving'" },
                  nightStay: { type: Type.STRING, description: "Specific overnight accommodation recommendations" },
                  dailyHighlight: { type: Type.STRING, description: "Main memorable moment of this specific day" }
                },
                required: [
                  "dayNumber", "title", "highlights", "sightseeingOrder", 
                  "activities", "meals", "estimatedTravelTime", "nightStay", "dailyHighlight"
                ]
              }
            },
            estimatedCostRange: {
              type: Type.OBJECT,
              properties: {
                min: { type: Type.INTEGER },
                max: { type: Type.INTEGER },
                currency: { type: Type.STRING }
              },
              required: ["min", "max", "currency"]
            }
          },
          required: [
            "tripSummary", "pickupLocation", "destination", "travelDate", "vehicleType",
            "numberOfTravelers", "tripType", "totalDurationDays", "estimatedDistanceKm",
            "estimatedDrivingTime", "days", "returnJourneyDetails", "tips"
          ]
        }
      }
    });

    const textOutput = response.text;
    if (!textOutput) {
      throw new Error("No text output received from Gemini API");
    }

    const parsedItinerary = JSON.parse(textOutput.trim());
    
    // Normalize and calibrate the response distance, driving time, and pricing to match our exact Indian cab math
    const finalDist = computeTotalKM(pickupLocation, destination, tripType, parseInt(numberOfDays) || 3);
    const computedTimeStr = `${(finalDist / 50).toFixed(1)} hours${tripType === "Round Trip" ? " (includes local sightseeing)" : ""}`;

    parsedItinerary.estimatedDistanceKm = `${finalDist} km`;
    parsedItinerary.estimatedDrivingTime = computedTimeStr;

    // Recalculate cost ranges to be realistic to Indian cab pricing models per km
    const rates: { [key: string]: number } = {
      "Sedan": 14,
      "Ertiga": 17,
      "Innova": 21,
      "Innova Crysta": 24,
      "Traveller": 28,
      "Urbania": 36,
      "Mini Bus": 48,
      "Bus": 65
    };
    const rate = rates[vehicleType] || 14;
    const baseCost = finalDist * rate;
    const driverCharge = (parseInt(numberOfDays) || 3) * 450;
    
    parsedItinerary.estimatedCostRange = {
      min: Math.round(baseCost + driverCharge),
      max: Math.round((baseCost * 1.15) + driverCharge + 1000),
      currency: "INR"
    };

    res.json(parsedItinerary);

  } catch (error) {
    console.error("Gemini API Error. Falling back to rich local planner. Details:", error);
    // Graceful fallback to ensure excellent user experience
    const mockResult = generateMockItinerary(req.body);
    res.json(mockResult);
  }
});

// Setup Vite & static serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Setting up Express in development mode with Vite HMR disabled proxy");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Setting up Express in production mode serving compiled static files");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server started successfully. Running on http://localhost:${PORT}`);
  });
}

startServer();
