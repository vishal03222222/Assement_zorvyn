import { useState, useEffect, useCallback } from 'react';

interface FlickrPhoto {
  id: string;
  owner: string;
  secret: string;
  server: string;
  farm: number;
  title: string;
  url_s?: string;
}

interface FlickrResponse {
  photos: {
    page: number;
    pages: number;
    perpage: number;
    total: number;
    photo: FlickrPhoto[];
  };
  stat: string;
}

interface CachedData {
  photos: FlickrPhoto[];
  timestamp: number;
  hash: string;
}

const FLICKR_API_URL = 'https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=20&page=1&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s';
const CACHE_KEY = 'flickr_images_cache';

const generateHash = (data: FlickrPhoto[]): string => {
  return data.map(p => p.id).join('-');
};

export const useFlickrImages = () => {
  const [photos, setPhotos] = useState<FlickrPhoto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const loadCachedData = useCallback((): CachedData | null => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        return JSON.parse(cached);
      }
    } catch (e) {
      console.error('Error loading cache:', e);
    }
    return null;
  }, []);

  const saveCachedData = useCallback((data: FlickrPhoto[]) => {
    try {
      const cacheData: CachedData = {
        photos: data,
        timestamp: Date.now(),
        hash: generateHash(data),
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
    } catch (e) {
      console.error('Error saving cache:', e);
    }
  }, []);

  const fetchImages = useCallback(async () => {
    const cachedData = loadCachedData();

    // If offline, use cached data
    if (!navigator.onLine) {
      setIsOffline(true);
      if (cachedData) {
        setPhotos(cachedData.photos);
        setLastUpdated(new Date(cachedData.timestamp));
        setIsLoading(false);
        return;
      }
      setError('No internet connection and no cached data available.');
      setIsLoading(false);
      return;
    }

    setIsOffline(false);

    try {
      const response = await fetch(FLICKR_API_URL);
      if (!response.ok) throw new Error('Failed to fetch images');
      
      const data: FlickrResponse = await response.json();
      
      if (data.stat !== 'ok') {
        throw new Error('Flickr API error');
      }

      const newPhotos = data.photos.photo;
      const newHash = generateHash(newPhotos);

      // Only update if data has changed
      if (!cachedData || cachedData.hash !== newHash) {
        setPhotos(newPhotos);
        saveCachedData(newPhotos);
        setLastUpdated(new Date());
      } else {
        // Use cached data if same
        setPhotos(cachedData.photos);
        setLastUpdated(new Date(cachedData.timestamp));
      }

      setError(null);
    } catch (e) {
      console.error('Fetch error:', e);
      // Fall back to cache on error
      if (cachedData) {
        setPhotos(cachedData.photos);
        setLastUpdated(new Date(cachedData.timestamp));
      } else {
        setError('Failed to fetch images. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [loadCachedData, saveCachedData]);

  useEffect(() => {
    // Load cached data immediately for instant display
    const cachedData = loadCachedData();
    if (cachedData) {
      setPhotos(cachedData.photos);
      setLastUpdated(new Date(cachedData.timestamp));
    }

    // Then fetch fresh data
    fetchImages();

    // Handle online/offline events
    const handleOnline = () => {
      setIsOffline(false);
      fetchImages();
    };

    const handleOffline = () => {
      setIsOffline(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [fetchImages, loadCachedData]);

  const getImageUrl = (photo: FlickrPhoto): string => {
    if (photo.url_s) return photo.url_s;
    return `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_m.jpg`;
  };

  return {
    photos,
    isLoading,
    isOffline,
    error,
    lastUpdated,
    refetch: fetchImages,
    getImageUrl,
  };
};
