import React from 'react';
import { VideoCard } from '@/components/home/VideoCard';
import { videoSeriesData, videoSeriesInfo } from '@/data/videoSeries';
import ConnectCTA from '@/components/common/ConnectCTA';
import Seo from '@/components/seo/Seo';
import { getSeoRouteByPath } from '@/data/seoRoutes';

const VideoSeries = () => {
  const seoConfig = getSeoRouteByPath('/video-series');

  return (
    <div className="min-h-screen bg-background">
      {seoConfig && (
        <Seo
          title={seoConfig.title}
          description={seoConfig.description}
          canonicalPath={seoConfig.path}
        />
      )}
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight mb-6 text-foreground">
            {videoSeriesInfo.title}
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground font-light leading-relaxed max-w-3xl mx-auto">
            {videoSeriesInfo.description}
          </p>
        </div>
      </section>
      
      {/* Video Series Grid */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-8 sm:gap-10 lg:gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {videoSeriesData.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
          
          {/* Coming Soon - Subtle */}
          <div className="mt-20 sm:mt-24 text-center">
            <div className="inline-flex items-center gap-3 text-muted-foreground font-light">
              <div className="w-8 h-px bg-border"></div>
              <span className="text-sm">More episodes coming soon</span>
              <div className="w-8 h-px bg-border"></div>
            </div>
          </div>
        </div>
      </section>
      
      <ConnectCTA />
    </div>
  );
};

export default VideoSeries;
