
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import ConnectCTA from '@/components/common/ConnectCTA';
import { FACEBOOK_GROUP_URL, handleFacebookGroupNavigation } from '@/lib/facebook';
import Seo from '@/components/seo/Seo';
import { getSeoRouteByPath } from '@/data/seoRoutes';
import { buildOrganizationJsonLd } from '@/lib/structuredData';

const WelcomeLetter = () => {
  const seoConfig = getSeoRouteByPath('/welcome-letter');

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {seoConfig && (
        <Seo
          title={seoConfig.title}
          description={seoConfig.description}
          canonicalPath={seoConfig.path}
          jsonLd={buildOrganizationJsonLd()}
        />
      )}
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">💚</div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Welcome Letter from Suz
            </h1>
          </div>
          
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            <p>Welcome, you’ve just stepped into a space that celebrates aging as the boldest adventure yet.</p>

            <p>
              This space was created for women 55 - 105, who are ready to rewrite their story, by learning more about the
              transformative, medicinal and weight stabilizing power of dining on plants, gaining confidence, embracing authentic
              style, and sharing experiences.
            </p>

            <div className="bg-teal-50 p-6 rounded-lg border-l-4 border-teal-400">
              <h2 className="text-xl font-bold text-teal-800 mb-3">Join the Private Facebook Group</h2>
              <p className="text-teal-700">
                I am excited to let you know that we can continue our conversations more robustly, if you will join my private FB
                GROUP.
              </p>
              <p className="text-teal-700">
                This will be a safe, inspiring place where we can learn, connect between posts, swap stories, share tips, ask
                questions and cheer one another on.
              </p>
              <div className="mt-4 flex justify-center">
                <Button asChild className="bg-teal text-white hover:bg-teal-dark">
                  <a
                    href={FACEBOOK_GROUP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleFacebookGroupNavigation}
                  >
                    Continue the Conversation on Facebook
                  </a>
                </Button>
              </div>
            </div>

            <p>
              Hi, I am so happy you are here. I am Suzanne, (Suz). I have created this FB GROUP Place to connect to FB Group as a
              way to create an awareness in women so that they are emboldened to rewrite the story of aging. This is our time to be
              bold, be authentic, be confident, implement self care, realize our dreams and LIVE LOUD!
            </p>

            <h2 className="text-2xl font-bold text-teal-600">A Note From my Heart</h2>
            <p>
              I know that everyone is not blessed with perfect health, extreme confidence and amazing resources, and support as they
              age. We each carry a different story, different challenges. Regardless, I believe deeply, that it is never too late or
              too soon to begin making choices that nourish your body, lift your spirit and bring joy. Please know that wherever you
              are on your aging life path you are welcome here.
            </p>

            <p>
              So whenever you are ready to take the next step, share a dream, or simply sit with someone who understands join me at{' '}
              <a
                className="text-teal-600 font-semibold hover:underline"
                href={FACEBOOK_GROUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleFacebookGroupNavigation}
              >
                the Facebook Group
              </a>
              .
            </p>

            <p>
              This is only the beginning, I have so many exciting ideas, tools, and stories to share as Rebellious Aging continues to
              grow. I would love you to be a part of it.
            </p>

            <p>Remember aging is not about fading, it is about flipping the script, embracing our power, and sparkling brighter than ever.</p>

            <p>This is just the beginning.</p>

            <p className="font-semibold text-teal-700">Suz</p>

            <div className="bg-gray-50 border border-teal-200 p-6 rounded-lg">
              <p className="font-semibold text-teal-800">
                PS. If you are not comfortable joining my private FB community but you are interested in my content please share
                your email here so that you will receive important updates as Rebellious Aging grows.
              </p>
              <p className="mt-2 text-teal-700">(I will not share your email).</p>
              <div className="mt-4 flex justify-center">
                <Button asChild className="bg-teal text-white hover:bg-teal-dark">
                  <a
                    href="https://fxuqp40sseh.typeform.com/to/DbY1YJrs"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Share Your Email for Updates
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <ConnectCTA />
    </div>
  );
};

export default WelcomeLetter;
