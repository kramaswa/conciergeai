export interface TestCase {
  name: string;
  query: string;
  expected: {
    city?: string;
    ratings?: number[];
    breakfast?: boolean;
    pool?: boolean;
    gym?: boolean;
    wifi?: boolean;
    freeCancellation?: boolean;
    maxPrice?: number;
    minReviewScore?: number;
  };
}

export interface AmbiguityTestCase {
  name: string;
  query: string;
  expected: { needsClarification: boolean };
}

export const searchTestCases: TestCase[] = [
  {
    name: "Exact Star Rating",
    query: "4 star hotels in London",
    expected: { city: "London", ratings: [4] }
  },
  {
    name: "Star Rating or Better",
    query: "4 star or better hotels in Paris",
    expected: { city: "Paris", ratings: [4, 5] }
  },
  {
    name: "Price Constraint",
    query: "Hotels in NYC below $250/night",
    expected: { city: "New York City", maxPrice: 250 }
  },
  {
    name: "Multiple Amenities",
    query: "Tokyo hotels with pool, gym and free breakfast",
    expected: { city: "Tokyo", pool: true, gym: true, breakfast: true }
  },
  {
    name: "Review Score: Excellent",
    query: "Excellent hotels in Rome",
    expected: { city: "Rome", minReviewScore: 8.5 }
  },
  {
    name: "Review Score: Very Good",
    query: "Very good hotels in Barcelona",
    expected: { city: "Barcelona", minReviewScore: 8.0 }
  },
  {
    name: "Complex Query",
    query: "3 star or better hotels in Seoul with a pool below $150",
    expected: { city: "Seoul", ratings: [3, 4, 5], pool: true, maxPrice: 150 }
  },
  {
    name: "Beach City Inference",
    query: "beachfront hotels in Thailand",
    expected: { city: "Phuket" }
  },
  {
    name: "Free Cancellation",
    query: "hotels with free cancellation in Dubai",
    expected: { city: "Dubai", freeCancellation: true }
  },
  {
    name: "Free WiFi Filter",
    query: "hotels with free wifi in Amsterdam under $200",
    expected: { city: "Amsterdam", wifi: true, maxPrice: 200 }
  },
  {
    name: "5-Star Luxury",
    query: "5 star hotels in Singapore with a pool",
    expected: { city: "Singapore", ratings: [5], pool: true }
  }
];

export const ambiguityTestCases: AmbiguityTestCase[] = [
  {
    name: "No City or Context",
    query: "I want something relaxing",
    expected: { needsClarification: true }
  },
  {
    name: "Vague Mood, No Location",
    query: "a nice place to stay",
    expected: { needsClarification: true }
  },
  {
    name: "Beach With No Country or City",
    query: "beach vacation",
    expected: { needsClarification: true }
  },
  {
    name: "Clear Query — No Clarification Needed",
    query: "4 star hotels in Tokyo with a pool",
    expected: { needsClarification: false }
  },
  {
    name: "City + Amenity — No Clarification Needed",
    query: "budget hotels in Berlin with free breakfast",
    expected: { needsClarification: false }
  }
];
