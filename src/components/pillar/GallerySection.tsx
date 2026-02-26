'use client';

import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { PillarContent } from '@/data/pillarContent';

interface GallerySectionProps {
  content: PillarContent;
}

const GallerySection: React.FC<GallerySectionProps> = ({ content }) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            gallery
          </h2>
          <div className="relative">
            <Carousel 
              className="w-full" 
              setApi={setApi}
              opts={{
                align: "center",
                loop: true,
              }}
            >
              <CarouselContent>
                {content.galleryImages.map((image, index) => (
                  <CarouselItem key={index} className="basis-full">
                    <div className="text-center">
                      <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md mx-auto max-w-lg">
                        <AspectRatio ratio={4 / 3}>
                          <img
                            src={image.src}
                            alt={image.description}
                            className="w-full h-full object-contain"
                          />
                        </AspectRatio>
                      </div>
                      <p className="text-gray-600 text-sm mt-4 italic font-light max-w-md mx-auto">
                        {image.description}
                      </p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              
              {/* Navigation buttons */}
              <CarouselPrevious className="left-4 h-10 w-10 bg-white/90 hover:bg-white border-2 shadow-lg" />
              <CarouselNext className="right-4 h-10 w-10 bg-white/90 hover:bg-white border-2 shadow-lg" />
            </Carousel>

            {/* Dot indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {content.galleryImages.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    current - 1 === index
                      ? 'bg-teal w-6'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to gallery image ${index + 1}`}
                  aria-pressed={current - 1 === index}
                  onClick={() => {
                    if (api) {
                      api.scrollTo(index);
                    }
                  }}
                />
              ))}
            </div>

            {/* Current image indicator */}
            <div className="flex justify-center mt-4">
              <span className="text-gray-500 text-sm">
                {current} of {count}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
