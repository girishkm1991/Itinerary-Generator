export interface ItineraryRequest {
  pickupLocation: string;
  destination: string;
  travelDate: string;
  numberOfDays: number;
  numberOfTravelers: number;
  vehicleType: string;
  tripType: 'One Way' | 'Round Trip';
  specialRequests?: string;
}

export interface MealSuggestions {
  breakfast: string;
  lunch: string;
  dinner: string;
}

export interface Activity {
  time: string;
  title: string;
  description: string;
  location: string;
}

export interface DayItinerary {
  dayNumber: number;
  title: string;
  highlights: string[];
  sightseeingOrder: string[];
  activities: Activity[];
  meals: MealSuggestions;
  estimatedTravelTime: string;
  nightStay: string;
  dailyHighlight: string;
}

export interface ItineraryResponse {
  tripSummary: string;
  pickupLocation: string;
  destination: string;
  travelDate: string;
  vehicleType: string;
  numberOfTravelers: number;
  tripType: string;
  totalDurationDays: number;
  estimatedDistanceKm: string;
  estimatedDrivingTime: string;
  days: DayItinerary[];
  returnJourneyDetails: string;
  tips: string[];
  estimatedCostRange?: {
    min: number;
    max: number;
    currency: string;
  };
}
