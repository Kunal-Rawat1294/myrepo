import { Country, WikipediaSummary, UnsplashImage } from '../types/country';

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY || 
                           'your-unsplash-access-key';

export const apiService = {
  async fetchAllCountries(): Promise<Country[]> {
    const response = await fetch('https://restcountries.com/v3.1/all');
    if (!response.ok) {
      throw new Error('Failed to fetch countries');
    }
    return response.json();
  },

  async fetchWikipediaSummary(countryName: string): Promise<WikipediaSummary> {
    const response = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(countryName)}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch Wikipedia summary');
    }
    return response.json();
  },

  async fetchUnsplashImages(query: string, perPage: number = 3): Promise<UnsplashImage[]> {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${perPage}&client_id=${UNSPLASH_ACCESS_KEY}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch images from Unsplash');
    }
    const data = await response.json();
    return data.results;
  }
};
