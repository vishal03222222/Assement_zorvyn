import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface Photo {
  id: string;
  title: string;
  owner: string;
}

interface ImageGridProps {
  photos: Photo[];
  getImageUrl: (photo: Photo) => string;
  isLoading: boolean;
}

const ImageCard = ({ 
  photo, 
  imageUrl 
}: { 
  photo: Photo; 
  imageUrl: string;
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="group relative overflow-hidden rounded-lg bg-muted aspect-square">
      {!isImageLoaded && !hasError && (
        <Skeleton className="absolute inset-0 w-full h-full" />
      )}
      
      {hasError ? (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <span className="text-muted-foreground text-sm">Failed to load</span>
        </div>
      ) : (
        <img
          src={imageUrl}
          alt={photo.title || 'Flickr photo'}
          className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${
            isImageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsImageLoaded(true)}
          onError={() => setHasError(true)}
          loading="lazy"
        />
      )}
      
      {photo.title && (
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-white text-sm font-medium line-clamp-2">
            {photo.title}
          </p>
        </div>
      )}
    </div>
  );
};

export const ImageGrid = ({ photos, getImageUrl, isLoading }: ImageGridProps) => {
  if (isLoading && photos.length === 0) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton key={i} className="aspect-square rounded-lg" />
        ))}
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">No images available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {photos.map((photo) => (
        <ImageCard
          key={photo.id}
          photo={photo}
          imageUrl={getImageUrl(photo)}
        />
      ))}
    </div>
  );
};
