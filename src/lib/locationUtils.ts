import { ExpertProfile } from "@/types/expert";

export function getFormattedLocation(expert: ExpertProfile): string {
  // Try to get location from various possible sources in order of preference
  const location = expert.location || 
                  expert.userLocation || 
                  expert.body?.data?.profile?.userLocation;

  if (!location) {
    return "Location not specified";
  }

  // If location is an object with city and country
  if (typeof location === 'object' && location !== null) {
    const city = (location as any).city || '';
    const country = (location as any).country || '';
    
    if (city && country) {
      return `${city}, ${country}`;
    } else if (city) {
      return city;
    } else if (country) {
      return country;
    }
  }

  // If location is a string, try to parse it
  const locationStr = location.toString();
  
  // Check if it's already in "city, country" format
  if (locationStr.includes(',')) {
    return locationStr;
  }
  
  // If it's just a city or country, return as is
  return locationStr;
}

export function getLocationDetails(expert: ExpertProfile): {
  city?: string;
  country?: string;
  fullAddress?: string;
} {
  const location = expert.location || 
                  expert.userLocation || 
                  expert.body?.data?.profile?.userLocation;

  if (!location) {
    return {};
  }

  // If location is an object
  if (typeof location === 'object' && location !== null) {
    return {
      city: (location as any).city,
      country: (location as any).country,
      fullAddress: (location as any).fullAddress
    };
  }

  // If location is a string, try to parse it
  const locationStr = location.toString();
  
  // Check if it's in "city, country" format
  if (locationStr.includes(',')) {
    const parts = locationStr.split(',').map(part => part.trim());
    return {
      city: parts[0],
      country: parts[1],
      fullAddress: locationStr
    };
  }
  
  // If it's just a city or country
  return {
    city: locationStr,
    fullAddress: locationStr
  };
} 