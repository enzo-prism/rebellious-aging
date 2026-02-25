'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimation';
import { useScrollAnimationTrigger } from '@/hooks/useScrollAnimationTrigger';
import ConnectCTA from '@/components/common/ConnectCTA';
import Seo from '@/components/seo/Seo';
import { getSeoRouteByPath } from '@/data/seoRoutes';
import { buildOrganizationJsonLd } from '@/lib/structuredData';

const suzTimeline = [
  {
    year: '1964',
    title: 'B.A. Biochemistry',
  },
  {
    year: '1998',
    title: 'Transitioned to a vegetarian lifestyle',
  },
  {
    year: '2018',
    title: 'Transitioned to a vegan lifestyle',
  },
  {
    year: '2020',
    title: 'Whole Food Plant Based awakening',
    description: 'Became deeply curious about how a whole food plant based lifestyle could transform long-term health and vitality.',
    highlights: [
      'Documentary: Forks Over Knives',
      'Books: The China Study (Dr. T. Colin Campbell) & Prevent and Reverse Heart Disease (Dr. Caldwell Esselstyn)',
      'Transitioned fully to a whole food plant based lifestyle guided by leading research',
    ],
  },
  {
    year: '2021',
    title: 'Plant Based Nutrition Certificate, eCornell',
  },
  {
    year: '2021 - Present',
    title: 'Moderator, Whole Communities, T. Colin Campbell Center for Nutrition Studies',
  },
  {
    year: '2023',
    title: 'Jay Shetty Certified Life and Success Coach',
    description: 'Accredited by the Association for Coaches.',
  },
  {
    year: '2024',
    title: 'Women Rocking Business Graduate & Food and Sustainability Certificate',
    description: "Completed Sage Lavine's Women Rocking Business course and earned the Food and Sustainability Certificate from the T. Colin Campbell Center for Nutrition Studies.",
  },
];

const Movement = () => {
  const heroRef = useScrollAnimation<HTMLElement>({ threshold: 0.3 });
  const { ref: titleRef, isInView: titleInView, getItemStyle } = useStaggeredAnimation<HTMLDivElement>(2, { threshold: 0.5 });
  const seoConfig = getSeoRouteByPath('/our-story');
  
  // Initialize scroll animation triggers
  useScrollAnimationTrigger();

  return <div className="min-h-screen gpu-accelerated">
      {seoConfig && (
        <Seo
          title={seoConfig.title}
          description={seoConfig.description}
          canonicalPath={seoConfig.path}
          jsonLd={buildOrganizationJsonLd()}
        />
      )}
      {/* Hero Section */}
      <section 
        ref={heroRef.ref}
        className={`bg-gradient-to-br from-teal/10 to-coral/5 py-12 sm:py-16 lg:py-20 parallax-bg transition-all duration-1000 ${heroRef.isInView ? 'animate-scale-fade-in' : 'opacity-0'}`}
      >
        <div className="container mx-auto px-4">
          <div 
            ref={titleRef}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 
              className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight transition-all duration-800 ${titleInView ? 'animate-slide-up-fade' : 'opacity-0 translate-y-12'}`}
              style={getItemStyle(0)}
            >
              About Rebellious Aging
            </h1>
            <p 
              className={`text-base sm:text-lg lg:text-xl text-gray-700 mb-6 sm:mb-8 leading-relaxed px-2 transition-all duration-800 ${titleInView ? 'animate-slide-up-fade' : 'opacity-0 translate-y-12'}`}
              style={getItemStyle(1)}
            >
              Rebellious Aging is more than a lifestyle—it's a movement challenging outdated notions of what it means to grow older in today's world.
            </p>
          </div>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Text Content */}
              <div className="order-2 lg:order-1 animate-on-scroll">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center lg:text-left animate-slide-left">
                  Our Story
                </h2>
                
                {/* New inspirational text */}
                <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-r from-teal/10 to-coral/10 rounded-lg border-l-4 border-teal animate-scale-fade">
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed italic">
                    If you are reading this, you already feel it. That quiet fire. That gentle nudge. That rebellious urge to shout WT_? "This is my time to stop holding back". Allow the "YOU", ya know, the person you always wanted to be to explode from within and join the aging revolution.
                  </p>
                </div>

                <div className="space-y-4 sm:space-y-5 text-gray-700 text-sm sm:text-base leading-relaxed animate-on-scroll">
                  <p>
                    Hi, I'm Suz — a passionate advocate for Rebellious Aging. My journey began in my 50s when I faced a health challenge — a high cholesterol diagnosis. Like many, I was presented with the typical path: medication. But something inside me said there had to be a better way. I wasn't interested in a lifetime of prescriptions; I wanted to heal my body naturally.
                  </p>
                  <p>
                    Through extensive research, I discovered the incredible power of a whole-food, plant-based diet. I immersed myself in the works of pioneers like Dr. Caldwell Esselstyn and Dr. T. Colin Campbell, whose groundbreaking studies showed how food can prevent and even reverse chronic disease.
                  </p>
                  <p>What started as a personal experiment quickly became a transformative experience — for my body, mind, and outlook on life. This powerful shift from the Standard American Diet (Sad) to a plant-based lifestyle is central to my story. Not only did my cholesterol numbers become acceptable, my weight stabilized without ever giving it a second thought, the arthritis in my hands vanished, my energy accelerated and I remain, at 83, vibrant and drug free. Going from accepting the status quo to challenging it, is the essence of Rebellious Aging.</p>
                  <h2 className="text-2xl sm:text-3xl font-bold text-teal">
                    Rebellious Aging
                  </h2>
                  <p>I am not here to fade quietly into the background and I definitely do not want you to either. Rebellious Aging is a call to crush outdated beliefs about aging and celebrate a brave new chapter built on three vibrant pillars: radiant health, confident living, and unapologetic personal style.</p>
                  
                  <p>Since I was a little girl draping myself in my mom's scarfs, and pearls, and proudly strutting in her fancy shoes, I've believed that style isn't just decoration—it's declaration. It is your calling card, your identity, the inner you shining through without apology.</p>

                  <p>And CONFIDENCE? It is definitely not about having it all figured out. It's about showing up, speaking up, and daring to sparkle in your way.</p>

                  <p>I am passionate about the power of plants and the simple brilliance of Hippocrates' wisdom: let food be thy medicine. I think you will enjoy learning more about plant power, never any judgement from me. My goal is to create awareness and plant a seed.</p>

                  <p>My approach to health and aging is grounded in science, and no one has shaped that understanding more than Dr. T. Colin Campbell, PhD. His decades of rigorous research, culminated in the China Study, one of the most comprehensive studies of nutrition. This study illuminates the powerful relationship between diet and disease. His work not only changed the conversation around food but also inspired the founding of the Center for Nutrition Studies, where I am honored to contribute through Whole Communities.</p>

                  <p>I also hold a deep respect for Dr. Caldwell Esselstyn, whose clinical work in preventing and reversing heart disease has brought Dr. Campbell's findings to life in profound ways. His protocol, centered on nutrient- dense, oil-free whole plant foods, demonstrates the healing potential of food when applied with precision and commitment.</p>

                  <p>Together, their work forms the scientific and clinical backbone of my Whole Food, Plant-Based knowledge and conviction and philosophy—one rooted in evidence, compassion, and the belief that aging can be vibrant, purposeful, and full of possibility.</p>

                  <p>I am here to inspire and encourage women 55-105 to rebel against any societal aging limitations, reclaim their vitality and become the healthy, bold, beautiful, brilliant, confident, vibrant, version of themselves that they have always envisioned.</p>
                </div>
              </div>
              
              {/* Image */}
              <div className="order-1 lg:order-2 w-full animate-slide-right">
                <div className="rounded-xl overflow-hidden shadow-lg mx-auto max-w-md lg:max-w-none transition-transform duration-700 hover:scale-105">
                  <img
                    src="https://i.imgur.com/p1YPvQo.jpg"
                    alt="Suz smiling confidently, embodying the Rebellious Aging lifestyle"
                    className="w-full h-auto object-cover aspect-square sm:aspect-[4/5] lg:aspect-auto lg:h-full"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Rebellious Spirit Lives On */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-coral/5 to-teal/10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Image */}
              <div className="order-1 lg:order-1 w-full animate-slide-left">
                <div className="rounded-xl overflow-hidden shadow-lg mx-auto max-w-md lg:max-w-none transition-transform duration-700 hover:scale-105">
                  <img 
                    src="/lovable-uploads/a4255d73-0f3b-4b18-ac0d-cd1e985f3292.png" 
                    alt="Framed vintage French FAVOR motorbike poster with elegant woman on yellow background - 'simple pratique élégant' - the actual poster from the author's personal collection embodying rebellious spirit" 
                    className="w-full h-auto object-cover rounded-xl"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
              
              {/* Text Content */}
              <div className="order-2 lg:order-2 animate-on-scroll">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center lg:text-left animate-slide-right">
                  The Rebellious Spirit Lives On
                </h2>
                
                <div className="space-y-4 sm:space-y-5 text-gray-700 text-sm sm:text-base leading-relaxed animate-on-scroll">
                  <p>
                    I feel like this vintage poster depicts a younger me. In 1960, during Spring Break from college, I went to Bermuda with a bunch of girlfriends. We rented motor bikes and the rest is history.
                  </p>
                  
                  <div className="bg-white rounded-lg p-4 sm:p-6 border-l-4 border-coral shadow-sm animate-scale-fade">
                    <p className="italic text-coral font-medium">
                      I believe it is still me in 2025.
                    </p>
                  </div>
                  
                  <p>
                    That adventurous spirit, that willingness to embrace the unknown, that joy in breaking away from the expected path—it hasn't dimmed with age. If anything, it has grown stronger, more intentional, more rebellious.
                  </p>
                  
                  <p>
                    This is what Rebellious Aging is all about: recognizing that the spark within you doesn't fade with the passing years. It evolves, it deepens, it becomes more authentic. The woman who dared to rent that motorbike in 1960 is the same woman who dares to challenge aging stereotypes today.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Suz's CV */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-10">
            <div className="space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed animate-on-scroll">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-teal-600 font-semibold mb-2">Suz's CV</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">In Case You Are Curious</h2>
              </div>
              <p>My journey has been fuelled by curiosity. Curiosity about how food, mindset, style, and movement shape the way we age and thrive. Over the years, that curiosity led me from a degree in biochemistry to exploring mindfulness, coaching, sustainability, and the power of plants to transform health and confidence.</p>
              <p>I have spent the past 7 years deeply immersed in reading, listening, studying, and taking courses on the value of a plant-strong lifestyle, blending science, healing compassion, and personal growth.</p>
            </div>

            <div className="relative">
              <div className="hidden sm:block absolute left-4 top-0 bottom-0 w-px bg-teal/20" aria-hidden="true" />
              <ul className="space-y-6 sm:space-y-8">
                {suzTimeline.map((item, index) => (
                  <li
                    key={`${item.year}-${index}`}
                    className="bg-white border border-teal/20 rounded-lg shadow-sm p-6 sm:p-8 relative animate-on-scroll"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:gap-6">
                      <div className="flex items-center gap-3 mb-4 sm:mb-0">
                        <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-teal/10 text-teal font-semibold">
                          {index + 1}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-teal uppercase tracking-wide">{item.year}</p>
                          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{item.title}</h3>
                        </div>
                      </div>
                      <div className="flex-1 space-y-3 text-gray-700 text-sm sm:text-base">
                        {item.description && <p>{item.description}</p>}
                        {item.highlights && (
                          <ul className="space-y-2">
                            {item.highlights.map((highlight, highlightIndex) => (
                              <li key={highlightIndex} className="flex items-start gap-2">
                                <span className="mt-1 h-2 w-2 rounded-full bg-teal" />
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-5 bg-teal/5 border border-teal/20 rounded-lg p-6 sm:p-8 text-gray-700 text-base sm:text-lg leading-relaxed animate-on-scroll">
              <p>My adventure continues. I love my work as a moderator at the T. Colin Campbell Center for Nutrition Studies, Whole Communities. I co-host two Zoom events each month: "Getting Your Project Started" with the newly added "Coaches Corner" and "Wisdom in Action" (a group for all members of CNS 70+).</p>
              <p>Twice a month I post articles in Whole Communities regarding food access and food justice, keeping the conversation grounded in real-world impact.</p>
              <p>I love to share the transformation I have seen in my own health as I transitioned toward plants. My journey has been long. My slips were abundant, my eventual success astounding. No judgement ever from me. Just a passion to share what I know transformed me into a healthy, lively, vibrant, engaged human. I will point you to science-backed evidence, how to begin the lifestyle, programs to jumpstart the process, books to read, documentaries to watch, people to chat with, recipes to try—the rest is up to you.</p>
              <p className="font-semibold text-teal-800">My goal: create awareness.</p>
            </div>
          </div>
        </div>
      </section>

      {/* A Rebellious Introduction to Aging */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-teal/5 parallax-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center lg:text-left leading-tight animate-on-scroll">
              A Rebellious Introduction to Aging/<br className="hidden sm:block" />
              <span className="text-teal">Living Boldly Outside the Box</span>
            </h2>
            
            <div className="space-y-5 sm:space-y-6 text-gray-700 text-sm sm:text-base leading-relaxed">
              <p className="animate-on-scroll">
                Maybe up until now, you've lived neatly inside the lines—checking the boxes, doing what is expected, following the rules. But that box? It's getting cramped. And guess what? It was never really yours to begin with.
              </p>
              
              <p className="animate-on-scroll">
                Now is the time to break out, break free, and become the woman you were always meant to be.
              </p>
              
              <div className="bg-white rounded-lg p-6 sm:p-8 text-center my-8 shadow-sm border border-teal/10 animate-scale-fade hover:shadow-lg transition-all duration-300">
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-teal leading-relaxed">
                  Rebel. Reinvent. Reignite.<br />
                  <span className="text-coral">Sparkle fiercely, vibrantly, loudly and boldly.</span>
                </p>
              </div>
              
              <p className="animate-on-scroll">
                Aging sneaks up in unexpected ways. One day you are just living your life…and suddenly the mailbox is filled with AARP invitations. Medicare enrollment packets appear like clockwork. Social Security whispers. Senior discounts pop up at the movies, the bus, the train, in grocery stores and restaurants. People offer you their seat on the bus or subway. Friends pass away. You are told you "look good for your age." And during a global pandemic? You found yourself classified as high risk, just for existing.
              </p>
              
              <p className="text-center font-medium text-base sm:text-lg italic text-gray-600 animate-on-scroll">
                Creepy, right?
              </p>
              
              <div className="bg-teal/5 rounded-lg p-4 sm:p-6 border-l-4 border-teal animate-scale-fade">
                <p className="font-bold text-base sm:text-lg text-teal">
                  But here is the truth: None of that defines YOU.
                </p>
              </div>
              
              <p className="animate-on-scroll">
                You are not a number. Not a statistic. Not a stereotype.
              </p>
              
              <p className="animate-on-scroll">
                If you are reading this, you already feel it. That quiet fire. That gentle nudge. That rebellious urge to say: <span className="font-bold text-coral">WTF</span>.
              </p>
              
              <p className="font-medium animate-on-scroll">
                At Rebellious Aging, we are not slowing down—we are showing up.
              </p>
              
              <p className="animate-on-scroll">
                We defy the narrative that aging is about DECLINE. We embrace the idea that these are our glory years—our time to glow brighter, live louder and love harder. We say yes to vibrant health, bold confidence and unapologetic style.
              </p>
              
              <p className="animate-on-scroll">
                So if you ever felt dismissed, overlooked, or boxed in, consider this your permission to rise.
              </p>
              
              <div className="bg-coral/10 rounded-lg p-6 sm:p-8 text-center my-8 border border-coral/20 animate-scale-fade hover:scale-105 transition-transform duration-300">
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-coral">
                  DO NOT LET THE OLD LADY IN.
                </p>
              </div>
              
              <p className="animate-on-scroll">
                Instead, let these so-called reminders of age ignite your determination. Let them fuel your curiosity, your wisdom and your spark. Let's reinvent what it means to grow older. Let's reignite our passion for living healthy, confident and authentic lives—on our own terms.
              </p>
              
              <div className="bg-gradient-to-r from-teal to-coral text-white rounded-lg p-6 sm:p-8 text-center mt-8 animate-scale-fade hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                <p className="text-lg sm:text-xl lg:text-2xl font-bold leading-relaxed">
                  Because Rebels do not retire.<br />
                  <span className="text-yellow-200">They reignite.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <ConnectCTA />
    </div>;
};

export default Movement;
