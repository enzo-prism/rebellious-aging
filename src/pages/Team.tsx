import React from 'react';
import ConnectCTA from '@/components/common/ConnectCTA';
import Seo from '@/components/seo/Seo';
import { getSeoRouteByPath } from '@/data/seoRoutes';

const Team = () => {
  const seoConfig = getSeoRouteByPath('/team');

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
      <section className="px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extralight tracking-wide mb-8 text-foreground">
            Team
          </h1>
        </div>
      </section>
      
      {/* Team Members Section */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24 sm:pb-32">
        <div className="max-w-5xl mx-auto">
          <div className="grid gap-16 lg:gap-24 md:grid-cols-2">
            
            {/* Photographer */}
            <div className="text-center space-y-6">
              <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-teal/20 to-teal/10 flex items-center justify-center">
                <span className="text-4xl">📸</span>
              </div>
              <div>
                <h2 className="text-3xl font-light mb-2 text-foreground">
                  Quinn Meinhardt
                </h2>
                <p className="text-muted-foreground font-light text-lg">
                  Photographer
                </p>
              </div>
            </div>
            
            {/* Photo Credits */}
            <div className="text-center space-y-6">
              <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-teal/20 to-teal/10 flex items-center justify-center">
                <span className="text-4xl">📷</span>
              </div>
              <div>
                <h2 className="text-3xl font-light mb-2 text-foreground">
                  Carson Schultz
                </h2>
                <p className="text-muted-foreground font-light text-lg">
                  Photographer
                </p>
              </div>
            </div>
            
            
          </div>
        </div>
      </section>
      
      <ConnectCTA />
    </div>
  );
};

export default Team;
