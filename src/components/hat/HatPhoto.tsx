import { cn } from '@/lib/utils';
import { hatImageSrcSet, type HatImage } from '@/data/hats';

interface HatPhotoProps {
  image: HatImage;
  sizes: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
}

/**
 * A real hat photo on a warm "studio" tile with a soft floor shadow so the
 * cut-out cap reads as a product shot instead of floating on the page.
 */
const HatPhoto = ({ image, sizes, priority = false, className, imageClassName }: HatPhotoProps) => (
  <div
    className={cn(
      'relative isolate flex items-center justify-center overflow-hidden rounded-[2rem] bg-[radial-gradient(ellipse_at_50%_35%,#ffffff_0%,#f6f1e7_55%,#ece4d4_100%)]',
      className
    )}
  >
    <div
      className="absolute bottom-[9%] left-1/2 -z-10 h-[9%] w-[62%] -translate-x-1/2 rounded-[50%] bg-black/25 blur-2xl"
      aria-hidden="true"
    />
    <img
      src={image.large}
      srcSet={hatImageSrcSet(image)}
      sizes={sizes}
      width={image.width}
      height={image.height}
      alt={image.alt}
      loading={priority ? 'eager' : 'lazy'}
      // React 18 has no camelCase fetchPriority; pass the raw attribute.
      {...(priority ? { fetchpriority: 'high' } : {})}
      decoding="async"
      className={cn('h-auto max-h-full w-auto max-w-full object-contain drop-shadow-xl', imageClassName)}
    />
  </div>
);

export default HatPhoto;
