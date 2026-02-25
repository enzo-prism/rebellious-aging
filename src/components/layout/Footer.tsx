'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Mail, Heart, ArrowRight } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { FACEBOOK_GROUP_URL, handleFacebookGroupNavigation } from '@/lib/facebook';

const Footer = () => {
  const [showSocialDialog, setShowSocialDialog] = useState(false);

  const handleSocialClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowSocialDialog(true);
  };
  return (
    <footer className="bg-gradient-to-br from-teal/5 to-coral/5 pt-20 pb-8">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-10 mb-14">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-2xl font-bold text-teal">Rebellious Aging</h3>
            <p className="text-gray-600 leading-relaxed">
              Breaking stereotypes and redefining what it means to age gracefully. Join a community of vibrant women living boldly at every
              stage.
            </p>
            <div className="flex items-center gap-2 text-coral font-medium">
              <Heart size={18} className="fill-current" />
              <span>Age boldly, live vibrantly</span>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleSocialClick}
                className="w-10 h-10 bg-teal/10 hover:bg-teal hover:text-white text-teal rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Facebook size={18} />
                <span className="sr-only">Facebook</span>
              </button>
              <button
                onClick={handleSocialClick}
                className="w-10 h-10 bg-teal/10 hover:bg-teal hover:text-white text-teal rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Instagram size={18} />
                <span className="sr-only">Instagram</span>
              </button>
              <a
                href="mailto:suz@rebelwithsuz.com"
                className="w-10 h-10 bg-coral/10 hover:bg-coral hover:text-white text-coral rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Mail size={18} />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>

          {/* Pillar Columns */}
          <div className="space-y-4">
            <h4 className="font-bold text-foreground text-lg flex items-center gap-2">
              <span className="text-xl">🌟</span> Confidence
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/pillars/confidence" className="flex items-center gap-2 text-gray-600 hover:text-teal transition-colors group">
                  <span className="group-hover:translate-x-1 transition-transform">Confidence Pillar</span>
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-foreground text-lg flex items-center gap-2">
              <span className="text-xl">👗</span> Style
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/pillars/style" className="flex items-center gap-2 text-gray-600 hover:text-teal transition-colors group">
                  <span className="group-hover:translate-x-1 transition-transform">Style Pillar</span>
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-foreground text-lg flex items-center gap-2">
              <span className="text-xl">🌱</span> Health
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/pillars/health" className="flex items-center gap-2 text-gray-600 hover:text-teal transition-colors group">
                  <span className="group-hover:translate-x-1 transition-transform">Health Pillar</span>
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/nutrition?tab=what-is-wfpb"
                  className="flex items-center gap-2 text-gray-600 hover:text-teal transition-colors group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">What is WFPB?</span>
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/pillars/health/nutrition-guide"
                  className="flex items-center gap-2 text-gray-600 hover:text-teal transition-colors group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">Nutrition Guide</span>
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/pillars/health/resource-guide"
                  className="flex items-center gap-2 text-gray-600 hover:text-teal transition-colors group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">Resource Guide</span>
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/nutrition" className="flex items-center gap-2 text-gray-600 hover:text-teal transition-colors group">
                  <span className="group-hover:translate-x-1 transition-transform">Nutrition (WFPB)</span>
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/nutrition?tab=benefits" className="flex items-center gap-2 text-gray-600 hover:text-teal transition-colors group">
                  <span className="group-hover:translate-x-1 transition-transform">Benefits</span>
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/nutrition?tab=protocol" className="flex items-center gap-2 text-gray-600 hover:text-teal transition-colors group">
                  <span className="group-hover:translate-x-1 transition-transform">Dr. Esselstyn's Protocol</span>
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/nutrition?tab=dr-campbell" className="flex items-center gap-2 text-gray-600 hover:text-teal transition-colors group">
                  <span className="group-hover:translate-x-1 transition-transform">Dr. T. Colin Campbell</span>
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/nutrition?tab=foods" className="flex items-center gap-2 text-gray-600 hover:text-teal transition-colors group">
                  <span className="group-hover:translate-x-1 transition-transform">Why &amp; How</span>
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/recipes" className="flex items-center gap-2 text-gray-600 hover:text-teal transition-colors group">
                  <span className="group-hover:translate-x-1 transition-transform">Recipes</span>
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-foreground text-lg flex items-center gap-2">
              <span className="text-xl">💖</span> Gratitude
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/pillars/gratitude" className="flex items-center gap-2 text-gray-600 hover:text-teal transition-colors group">
                  <span className="group-hover:translate-x-1 transition-transform">Gratitude Pillar</span>
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-foreground text-lg">More Suz</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/contact" className="flex items-center gap-2 text-gray-600 hover:text-teal transition-colors group">
                  <span className="group-hover:translate-x-1 transition-transform">Get in Touch</span>
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/our-story" className="flex items-center gap-2 text-gray-600 hover:text-teal transition-colors group">
                  <span className="group-hover:translate-x-1 transition-transform">Our Story</span>
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/welcome-letter" className="flex items-center gap-2 text-gray-600 hover:text-teal transition-colors group">
                  <span className="group-hover:translate-x-1 transition-transform">Welcome Letter</span>
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <a
                  href={FACEBOOK_GROUP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-600 hover:text-teal transition-colors group"
                  onClick={handleFacebookGroupNavigation}
                >
                  <span className="group-hover:translate-x-1 transition-transform">Facebook Group</span>
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <Link href="/blog" className="flex items-center gap-2 text-gray-600 hover:text-teal transition-colors group">
                  <span className="group-hover:translate-x-1 transition-transform">Blog</span>
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link href="/video-series" className="flex items-center gap-2 text-gray-600 hover:text-teal transition-colors group">
                  <span className="group-hover:translate-x-1 transition-transform">Video Series</span>
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 pt-8">
          <div className="text-center lg:text-left lg:flex lg:justify-between lg:items-center">
            <div className="mb-6 lg:mb-0">
              <p className="text-gray-500 text-sm mb-2">
                <strong>Medical Disclaimer:</strong> The information provided on this website is for educational purposes only and is not intended as medical advice. 
                Always consult with a qualified healthcare professional before making significant changes to your diet or lifestyle.
              </p>
            </div>
            
            <div className="text-center lg:text-right">
              <p className="text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} Rebellious Aging. All rights reserved.
              </p>
              <p className="text-teal text-sm font-medium mt-1">
                Designed with 💚 for the rebels
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Social Media Coming Soon Dialog */}
      <AlertDialog open={showSocialDialog} onOpenChange={setShowSocialDialog}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">Social Media Coming Soon!</AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              We're working on bringing you amazing content on Facebook and Instagram. 
              Subscribe to our email list so you don't miss out when we go live on social media!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-col sm:flex-row gap-2">
            <AlertDialogAction 
              onClick={() => setShowSocialDialog(false)}
              className="bg-teal hover:bg-teal/90"
            >
              Got it!
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </footer>
  );
};

export default Footer;
