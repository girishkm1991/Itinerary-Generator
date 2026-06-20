import React, { useState, FormEvent, useMemo } from "react";
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
import { motion, AnimatePresence } from "motion/react";
import { ItineraryResponse } from "../types";
import Logo from "./Logo";

interface ItineraryViewProps {
  itinerary: ItineraryResponse;
  onReset: () => void;
}

interface RouteStopItem {
  spot: string;
  scheduledTime: string;
  activityTitle: string;
  description: string;
  location: string;
}

// Get beautiful imagery category based on spot/landmark name
const getSpotImage = (spotName: string) => {
  const name = spotName.toLowerCase();
  if (name.includes("palace") || name.includes("mysore") || name.includes("monument")) {
    return "https://images.unsplash.com/photo-1590050752117-238cb0612b1b?auto=format&fit=crop&q=80&w=400";
  }
  if (name.includes("falls") || name.includes("waterfall") || name.includes("cascade")) {
    return "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=400";
  }
  if (name.includes("lake") || name.includes("boating") || name.includes("houseboat") || name.includes("backwater") || name.includes("river") || name.includes("dam")) {
    return "https://images.unsplash.com/photo-1602216056096-3c40cc0c9944?auto=format&fit=crop&q=80&w=400";
  }
  if (name.includes("tea") || name.includes("estate") || name.includes("munnar") || name.includes("garden") || name.includes("hill") || name.includes("view") || name.includes("peak")) {
    return "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80&w=400";
  }
  if (name.includes("temple") || name.includes("church") || name.includes("ashram") || name.includes("monastery") || name.includes("cultural") || name.includes("tomb") || name.includes("minar") || name.includes("sightseeing")) {
    return "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=400";
  }
  if (name.includes("safari") || name.includes("national park") || name.includes("sanctuary") || name.includes("elephant") || name.includes("zoo") || name.includes("jungle") || name.includes("camp")) {
    return "https://images.unsplash.com/photo-1588523315752-ef1d3ff3b0fe?auto=format&fit=crop&q=80&w=400";
  }
  if (name.includes("beach") || name.includes("lighthouse") || name.includes("coast") || name.includes("sea")) {
    return "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=400";
  }
  if (name.includes("fort") || name.includes("mahal") || name.includes("gate")) {
    return "https://images.unsplash.com/photo-1477584308802-e9c37c6a4120?auto=format&fit=crop&q=80&w=400";
  }
  if (name.includes("coorg") || name.includes("plantation") || name.includes("forest") || name.includes("park") || name.includes("nature")) {
    return "https://images.unsplash.com/photo-1588612140660-fbf8f58b8f2c?auto=format&fit=crop&q=80&w=400";
  }
  // Fallback high quality nature landscape
  return "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=400";
};

const RouteStopCard = ({ item, index }: { item: RouteStopItem; index: number; key?: any }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const words = item.description.split(" ");
  // Choose key short sentence or limit words for ease of understanding without showing a wall of text
  const shortDescription = words.slice(0, 8).join(" ") + (words.length > 8 ? "..." : "");

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: Math.min(index * 0.05, 0.3), duration: 0.35, ease: "easeOut" }}
      className="relative space-y-2 p-4 rounded-2xl bg-white hover:bg-sky-50/[0.02] border border-slate-100 shadow-sm hover:shadow transition-all duration-300 group"
    >
      {/* Left colored dot connector */}
      <div className="absolute -left-[2px] -translate-x-[21px] top-6 w-2.5 h-2.5 rounded-full bg-sky-500 ring-4 ring-white group-hover:bg-emerald-500 group-hover:scale-125 transition-all duration-300" />
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pt-0.5">
        <span className="text-[10px] font-black text-sky-600 font-mono bg-sky-50 px-2.5 py-0.5 rounded-lg border border-sky-100/60 self-start tracking-wide">
          {item.scheduledTime}
        </span>
        <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1 self-start sm:self-auto">
          <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
          {item.location}
        </span>
      </div>
      
      <h5 className="text-[13px] sm:text-sm font-extrabold text-slate-800 tracking-tight group-hover:text-sky-700 transition-colors">
        {item.activityTitle}
      </h5>

      <div className="text-[12px] text-slate-500 leading-relaxed font-medium">
        <p className="inline text-slate-600">
          {isExpanded ? item.description : shortDescription}
        </p>

        {words.length > 8 && (
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="ml-2 inline-flex items-center gap-0.5 text-[10px] font-black text-sky-600 hover:text-sky-700 transition-colors uppercase cursor-pointer select-none bg-sky-50 border border-sky-100/50 hover:bg-sky-100 px-1.5 py-0.5 rounded-md"
          >
            <span>{isExpanded ? "Hide Description" : "Read Guide"}</span>
            <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isExpanded ? "rotate-180 text-sky-700" : "text-sky-500"}`} />
          </button>
        )}
      </div>
    </motion.div>
  );
};

// Map some key search keywords to beautiful travel images
const DESTINATION_IMAGES: { [key: string]: string } = {
  "shimla": "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=1200",
  "manali": "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=1200",
  "munnar": "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80&w=1200",
  "coorg": "https://images.unsplash.com/photo-1588612140660-fbf8f58b8f2c?auto=format&fit=crop&q=80&w=1200",
  "jaipur": "https://images.unsplash.com/photo-1477584308802-e9c37c6a4120?auto=format&fit=crop&q=80&w=1200",
  "goa": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200",
  "kerala": "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80&w=1200",
  "agra": "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=1200",
  "delhi": "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=1200",
  "mysore": "https://images.unsplash.com/photo-1590050752117-238cb0612b1b?auto=format&fit=crop&q=80&w=1200",
  "wayanad": "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=1200",
  "alleppey": "https://images.unsplash.com/photo-1602216056096-3c40cc0c9944?auto=format&fit=crop&q=80&w=1200",
  "alappuzha": "https://images.unsplash.com/photo-1602216056096-3c40cc0c9944?auto=format&fit=crop&q=80&w=1200",
  "thekkady": "https://images.unsplash.com/photo-1588523315752-ef1d3ff3b0fe?auto=format&fit=crop&q=80&w=1200",
  "ooty": "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=1200",
  "chikmagalur": "https://images.unsplash.com/photo-1595818944605-77983693fb04?auto=format&fit=crop&q=80&w=1200",
  "pondicherry": "https://images.unsplash.com/photo-1589410990333-eaf6e1df6500?auto=format&fit=crop&q=80&w=1200",
  "bangalore": "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&q=80&w=1200",
  "bengaluru": "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&q=80&w=1200",
  "kovalam": "https://images.unsplash.com/photo-1602216056096-3c40cc0c9944?auto=format&fit=crop&q=80&w=1200",
  "rishikesh": "https://images.unsplash.com/photo-1542856391-010fb87dcfed?auto=format&fit=crop&q=80&w=1200",
  "haridwar": "https://images.unsplash.com/photo-1542856391-010fb87dcfed?auto=format&fit=crop&q=80&w=1200",
  "kumarakom": "https://images.unsplash.com/photo-1602216056096-3c40cc0c9944?auto=format&fit=crop&q=80&w=1200"
};

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

export default function ItineraryView({ itinerary, onReset }: ItineraryViewProps) {
  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  const [copiedLink, setCopiedLink] = useState(false);
  const [exportedPdfStatus, setExportedPdfStatus] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [whatsappPhone, setWhatsappPhone] = useState("");
  const [whatsappSent, setWhatsappSent] = useState(false);
  const [activeDayPage, setActiveDayPage] = useState<number | "all">(1);

  const getRouteDestinations = () => {
    const destString = itinerary.destination.toLowerCase();
    const found: { name: string; spots: string[] }[] = [];
    const phrases = destString.split(/[-,\+/]|\bto\b|\band\b/);
    const matchedKeys = new Set<string>();

    phrases.forEach(phrase => {
      const trimmed = phrase.trim();
      if (!trimmed) return;
      
      for (const key in LANDMARKS_REGISTRY) {
        if (trimmed.includes(key) && !matchedKeys.has(key)) {
          matchedKeys.add(key);
          found.push(LANDMARKS_REGISTRY[key]);
        }
      }
    });

    if (found.length === 0) {
      for (const key in LANDMARKS_REGISTRY) {
        if (destString.includes(key) && !matchedKeys.has(key)) {
          matchedKeys.add(key);
          found.push(LANDMARKS_REGISTRY[key]);
        }
      }
    }
    return found;
  };

  const attractionsByDay = useMemo(() => {
    const dayMap: { [key: number]: { spot: string; scheduledTime: string; activityTitle: string; description: string; location: string }[] } = {};

    if (!itinerary || !itinerary.days) return dayMap;

    itinerary.days.forEach((day: any) => {
      dayMap[day.dayNumber] = [];
      
      if (day.activities && day.activities.length > 0) {
        day.activities.forEach((act: any) => {
          const actTitleLower = act.title.toLowerCase();
          const isUtilityActivity = 
            actTitleLower.includes("breakfast") || 
            actTitleLower.includes("lunch") || 
            actTitleLower.includes("dinner") || 
            actTitleLower.includes("check in") || 
            actTitleLower.includes("hotel") || 
            actTitleLower.includes("resort");

          if (!isUtilityActivity) {
            let spotName = act.location || act.title;
            // Clean up spot name and activity title to eliminate 'curated' and 'transit'
            spotName = spotName.replace(/curated\s+sightseeing\s+at\s+/gi, "");
            spotName = spotName.replace(/curated\s+sightseeing\s+in\s+/gi, "");
            spotName = spotName.replace(/curated\s+tour\s+of\s+/gi, "");
            spotName = spotName.replace(/curated\s+/gi, "");
            spotName = spotName.replace(/visit\s+/gi, "");

            let actTitle = act.title || "";
            actTitle = actTitle.replace(/curated\s+sightseeing\s+at\s+/gi, "Sightseeing at ");
            actTitle = actTitle.replace(/curated\s+sightseeing\s+in\s+/gi, "Sightseeing in ");
            actTitle = actTitle.replace(/curated\s+tour\s+of\s+/gi, "Tour of ");
            actTitle = actTitle.replace(/curated\s+/gi, "");

            let timeClean = act.time || "10:00 AM";
            timeClean = timeClean.replace(/Transit\s+Stop/gi, "Stop");
            timeClean = timeClean.replace(/Transit/gi, "");

            dayMap[day.dayNumber].push({
              spot: spotName,
              scheduledTime: timeClean,
              activityTitle: actTitle,
              description: act.description || `Discover the beautiful scenery and highlights of ${spotName}.`,
              location: act.location || itinerary.destination
            });
          }
        });
      }
    });

    return dayMap;
  }, [itinerary]);

  const getDayAttractions = (day: any) => {
    return attractionsByDay[day.dayNumber] || [];
  };

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
      const firstAct = day.activities?.[0]?.title || day.sightseeingOrder?.[0] || "Exploring Local Spot";
      const secondAct = day.activities?.[1]?.title || day.sightseeingOrder?.[1] || "Sightseeing Excursion";
      message += `• Activity 1: ${firstAct}\n`;
      message += `• Activity 2: ${secondAct}\n`;
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

  // Get unique key popular spots/landmarks in the entire itinerary
  const getItineraryLandmarks = () => {
    const spots = new Set<string>();
    if (!itinerary || !itinerary.days) return [];
    
    // Check custom landmarks matching
    itinerary.days.forEach((day: any) => {
      day.sightseeingOrder?.forEach((s: string) => {
        if (s && s.trim().length > 2) {
          spots.add(s.trim());
        }
      });
    });

    // Fallback directly to registry spots if empty
    if (spots.size === 0) {
      const destLower = itinerary.destination.toLowerCase();
      for (const key in LANDMARKS_REGISTRY) {
        if (destLower.includes(key)) {
          LANDMARKS_REGISTRY[key].spots.forEach((s) => spots.add(s));
        }
      }
    }
    
    return Array.from(spots).slice(0, 3); // top 3 for elegant balance
  };

  // Note: getSpotImage helper moved to file-level scope for multi-component reuse

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
          <div className="p-1 bg-white border border-slate-100 rounded-xl shadow-sm flex items-center justify-center">
            <Logo size={42} />
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
      <div className="relative rounded-3xl overflow-hidden h-[280px] sm:h-[340px] shadow-xl border border-white/20">
        <img 
          src={getDestinationImage()} 
          alt={itinerary.destination} 
          className="w-full h-full object-cover absolute inset-0"
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
        <div className="absolute bottom-6 left-6 right-6 text-white text-left">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 bg-emerald-500/20 backdrop-blur-md text-emerald-300 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-500/20">
                💎 Premium AI Plan
              </span>
              <span className="px-2.5 py-0.5 bg-sky-500/20 backdrop-blur-md text-sky-300 text-[10px] font-black uppercase tracking-widest rounded-full border border-sky-500/20">
                {itinerary.tripType}
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight capitalize drop-shadow-sm">
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
                <div className="flex gap-2 shrink-0">
                  <a
                    href={`https://api.whatsapp.com/send?phone=${
                      whatsappPhone.replace(/\D/g, "").length === 10
                        ? "91" + whatsappPhone.replace(/\D/g, "")
                        : whatsappPhone.replace(/\D/g, "")
                    }&text=${encodeURIComponent(getWhatsAppMessage())}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      navigator.clipboard.writeText(getWhatsAppMessage());
                      setWhatsappSent(true);
                      setTimeout(() => setWhatsappSent(false), 5000);
                    }}
                    className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-emerald-50 shrink-0 text-center"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{whatsappSent ? "Copied & Opened!" : "Compile & Send"}</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(getWhatsAppMessage());
                      setWhatsappSent(true);
                      setTimeout(() => setWhatsappSent(false), 5000);
                    }}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
                    title="Copy compiled itinerary text to clipboard"
                  >
                    <span>Copy Text</span>
                  </button>
                </div>
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
              <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest">
                Daily Sightseeing Program
              </h4>
              <span className="text-xs text-sky-600 font-semibold no-print">
                {activeDayPage === "all" ? "Click day cards to view full details" : "Use pages or tabs above to flip pages"}
              </span>
            </div>

            {/* Pagination Tabs Bar */}
            <div className="bg-slate-100 p-1.5 rounded-2xl flex flex-wrap items-center gap-1 border border-slate-200 no-print">
              <button
                type="button"
                onClick={() => {
                  setExpandedDay(1);
                  setActiveDayPage("all");
                }}
                className={`flex-1 min-w-[100px] text-center py-2 px-3 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  activeDayPage === "all"
                    ? "bg-slate-800 text-white shadow font-black"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-semibold"
                }`}
              >
                📄 All Days (Single View)
              </button>
              {itinerary.days.map((day) => (
                <button
                  key={day.dayNumber}
                  type="button"
                  onClick={() => {
                    setExpandedDay(day.dayNumber);
                    setActiveDayPage(day.dayNumber);
                  }}
                  className={`flex-1 min-w-[70px] text-center py-2 px-3 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                    activeDayPage === day.dayNumber
                      ? "bg-sky-600 text-white shadow-sm ring-2 ring-sky-100 font-black"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-semibold"
                  }`}
                >
                  📆 Day {day.dayNumber}
                </button>
              ))}
            </div>

            {itinerary.days
              .filter(day => isPrinting || activeDayPage === "all" || activeDayPage === day.dayNumber)
              .map((day) => {
                const isOpen = isPrinting || activeDayPage !== "all" || expandedDay === day.dayNumber;
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
                      onClick={() => {
                        if (activeDayPage === "all") {
                          setExpandedDay(expandedDay === day.dayNumber ? null : day.dayNumber);
                        }
                      }}
                      className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                    >
                    <div className="flex items-center gap-4">
                      {/* Pill style badge */}
                      <div className={`px-4 py-2 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 shadow-sm transition-all whitespace-nowrap ${
                        isOpen 
                          ? "bg-sky-600 text-white ring-4 ring-sky-100" 
                          : "bg-slate-100 text-slate-500"
                      }`}>
                        Day {day.dayNumber}
                      </div>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-base sm:text-lg font-bold text-slate-800 leading-tight">
                            {day.title}
                          </h3>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5 flex flex-wrap items-center gap-2">
                          <span className="font-semibold text-sky-600">Local travel time: {day.estimatedTravelTime}</span>
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
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="overflow-hidden border-t border-slate-100"
                      >
                        <div className="p-6 bg-slate-50/40 space-y-6">
                          
                          {/* Top Highlights bullet dots */}
                          <div className="flex flex-wrap gap-2">
                            {day.highlights.map((hlt, idx) => (
                              <span 
                                key={idx}
                                className="bg-sky-50 text-sky-700 text-xs px-3 py-1 rounded-full font-semibold border border-sky-100 flex items-center gap-1 shadow-sm"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                                {hlt}
                              </span>
                            ))}
                          </div>

                          {/* Main Sightseeing Timeline & Landmarks (Merged) */}
                          {getDayAttractions(day).length > 0 ? (
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-1">
                              {/* Left / Main Column: Route timeline */}
                              <div className="lg:col-span-7 space-y-4">
                                <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-1.5 border-b border-slate-100 pb-2">
                                  <Navigation className="w-4 h-4 text-sky-500" /> Route Visiting Order (Sequential Stops)
                                </h4>

                                <div className="relative border-l border-sky-100 pl-4 ml-2 space-y-4 pt-2">
                                  {getDayAttractions(day).map((item, index) => (
                                    <RouteStopCard key={index} item={item} index={index} />
                                  ))}
                                </div>
                              </div>

                              {/* Right Column: Key attractions checklist targeting this specific day */}
                              <div className="lg:col-span-5 space-y-4 bg-slate-50 border border-slate-150 rounded-2xl p-4 sm:p-5">
                                <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-1.5 pb-2 border-b border-slate-200">
                                  <Compass className="w-4 h-4 text-emerald-500 animate-spin-slow" /> Day's Key Attractions Checked
                                </h4>
                                <p className="text-[10px] text-slate-500 leading-normal font-medium">
                                  verified landmarks visited during today's schedule:
                                </p>

                                <ul className="space-y-2 text-[11px] text-slate-600 font-semibold font-sans pt-1">
                                  {getDayAttractions(day).map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-2.5 bg-white border border-slate-100 rounded-xl p-2.5 shadow-sm transition-all hover:border-sky-200/60 hover:bg-sky-50/[0.05]">
                                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                      <div className="space-y-0.5">
                                        <span className="text-slate-800 text-xs font-bold block">{item.spot}</span>
                                        <span className="text-[9px] bg-slate-100 border border-slate-200 text-slate-600 px-1.5 py-0.5 rounded font-mono font-black uppercase">
                                          {item.scheduledTime}
                                        </span>
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          ) : (
                            /* Simple Fallback when no attractions map to the day */
                            <div className="space-y-4">
                              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                Route Visiting Order (Sequential Stops)
                              </h4>

                              <div className="relative border-l border-sky-100 pl-4 ml-2 space-y-4">
                                {getDayAttractions(day).map((item, index) => (
                                  <RouteStopCard key={index} item={item} index={index} />
                                ))}
                              </div>
                            </div>
                          )}

                           {/* Sightseeing order shortcut */}
                           <div className="p-3 bg-white border border-slate-100 rounded-xl">
                             <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                               <Navigation className="w-3.5 h-3.5 text-emerald-500" /> RECOMMENDED VISITING ORDER
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

                          {/* Day Pagers / Page Turners */}
                          {activeDayPage !== "all" && (
                            <div className="pt-5 border-t border-slate-150 flex items-center justify-between no-print gap-4">
                              <button
                                type="button"
                                disabled={day.dayNumber === 1}
                                onClick={() => {
                                  const prev = day.dayNumber - 1;
                                  setExpandedDay(prev);
                                  setActiveDayPage(prev);
                                }}
                                className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                              >
                                ← Day {day.dayNumber - 1}
                              </button>
                              <span className="text-[11px] text-slate-400 font-bold font-mono">
                                Page {day.dayNumber} of {itinerary.days.length}
                              </span>
                              <button
                                type="button"
                                disabled={day.dayNumber === itinerary.days.length}
                                onClick={() => {
                                  const next = day.dayNumber + 1;
                                  setExpandedDay(next);
                                  setActiveDayPage(next);
                                }}
                                className="px-4 py-2 bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-100 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                              >
                                Day {day.dayNumber + 1} →
                              </button>
                            </div>
                          )}

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
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
