'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { PillarContent } from '@/data/pillarContent';
import { supabase } from '@/integrations/supabase/client';

interface QuizSectionProps {
  content: PillarContent;
  pillarId: string;
}

declare global {
  interface Window {
    tf?: {
      load?: () => void;
      reload?: () => void;
    };
  }
}

const QuizSection: React.FC<QuizSectionProps> = ({ content, pillarId }) => {
  const typeformEmbeds: Record<string, string> = {
    confidence: '01K7MB2JPFFBBQYR354JVHSAZP',
    style: '01K7MBJYZ6KNAJAYPS2P1364PN',
    health: '01K7MBQQJ3SQJKTM3T3SPQKZC3',
  };

  const typeformId = pillarId ? typeformEmbeds[pillarId] : undefined;

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isQuizVisible, setIsQuizVisible] = useState(false);

  useEffect(() => {
    const target = sectionRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsQuizVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!typeformId || !isQuizVisible) return;

    const scriptSrc = "https://embed.typeform.com/next/embed.js";
    const ensureTypeformLoaded = () => {
      if (window.tf && typeof window.tf.load === 'function') {
        window.tf.load();
      }
    };

    const existingScript = document.querySelector<HTMLScriptElement>(`script[src="${scriptSrc}"]`);

    if (existingScript) {
      if (window.tf && typeof window.tf.load === 'function') {
        ensureTypeformLoaded();
        return;
      }

      const handleExistingLoad = () => {
        ensureTypeformLoaded();
      };

      existingScript.addEventListener('load', handleExistingLoad, { once: true });

      return () => {
        existingScript.removeEventListener('load', handleExistingLoad);
      };
    }

    const script = document.createElement('script');
    script.src = scriptSrc;
    script.async = true;

    const handleNewLoad = () => {
      ensureTypeformLoaded();
    };

    script.addEventListener('load', handleNewLoad, { once: true });
    document.body.appendChild(script);

    return () => {
      script.removeEventListener('load', handleNewLoad);
    };
  }, [typeformId, isQuizVisible]);

  const [formData, setFormData] = useState({
    rating: '',
    challenge: '',
    goals: '',
    userEmail: '',
    userName: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.rating) {
      toast({
        title: "Please complete the quiz",
        description: "Please select a rating for the first question.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.userEmail || !formData.userEmail.trim()) {
      toast({
        title: "Email Required",
        description: "Please provide your email address so Suz can follow up with personalized advice.",
        variant: "destructive",
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.userEmail)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Get the pillar type from URL params (confidence, style, health)
      const pillarType = pillarId || 'confidence';
      
      const requestData = {
        pillarType,
        rating: parseInt(formData.rating),
        challenge: formData.challenge,
        goals: formData.goals,
        userEmail: formData.userEmail.trim(),
        userName: formData.userName || undefined,
      };
      
      console.log('Submitting quiz with data:', requestData);
      
      // Submit quiz to Supabase edge function
      const { data, error } = await supabase.functions.invoke('submit-quiz', {
        body: requestData
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      toast({
        title: "Quiz Submitted Successfully!",
        description: "Thank you for completing the quiz. Suz will personally review your responses and get back to you with personalized advice via email within 24-48 hours.",
      });
      
      // Reset form
      setFormData({
        rating: '',
        challenge: '',
        goals: '',
        userEmail: '',
        userName: ''
      });
      
    } catch (error) {
      console.error('Quiz submission error:', error);
      
      let errorMessage = "There was an error submitting your quiz. Please try again.";
      
      // Provide more specific error messages
      if (error && typeof error === 'object' && 'message' in error) {
        const errorStr = String(error.message);
        if (errorStr.includes('pillar_type')) {
          errorMessage = "Invalid pillar type. Please refresh the page and try again.";
        } else if (errorStr.includes('rating')) {
          errorMessage = "Please select a rating before submitting.";
        }
      }
      
      toast({
        title: "Submission Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-gray-50" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">{content.quizTitle}</h2>
          <p className="text-lg text-gray-700 mb-8">
            {content.quizDescription}
          </p>
          
          <div className="bg-white p-8 rounded-lg shadow-sm">
            {typeformId ? (
              isQuizVisible ? (
                <div className="space-y-6">
                  <div
                    data-tf-live={typeformId}
                    className="w-full min-h-[600px]"
                  />
                  <p className="text-sm text-muted-foreground text-center">
                    The self-assessment opens above. Complete the prompts to receive personalized guidance from Suz.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4 text-center py-8">
                  <p className="text-muted-foreground max-w-md">
                    Tap the button below to load the interactive quiz when you&apos;re ready.
                  </p>
                  <Button onClick={() => setIsQuizVisible(true)} className="bg-teal text-white hover:bg-teal/90">
                    Load Quiz
                  </Button>
                </div>
              )
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <label className="block font-medium mb-2">
                      1. How would you rate your current level of {content.title.toLowerCase()}?
                    </label>
                    <div className="space-y-2">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <div key={value} className="flex items-center">
                          <input 
                            type="radio" 
                            id={`q1-${value}`} 
                            name="question1" 
                            value={value}
                            checked={formData.rating === value.toString()}
                            onChange={(e) => setFormData(prev => ({ ...prev, rating: e.target.value }))}
                            className="mr-3 h-4 w-4 text-teal focus:ring-teal"
                          />
                          <label htmlFor={`q1-${value}`}>
                            {value} - {value === 1 ? 'Very Low' : value === 5 ? 'Very High' : ''}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block font-medium mb-2">
                      2. What is your biggest challenge related to {content.title.toLowerCase()}?
                    </label>
                    <Textarea 
                      value={formData.challenge}
                      onChange={(e) => setFormData(prev => ({ ...prev, challenge: e.target.value }))}
                      rows={4}
                    />
                  </div>
                  
                  <div>
                    <label className="block font-medium mb-2">
                      3. What would improving your {content.title.toLowerCase()} allow you to do or experience?
                    </label>
                    <Textarea 
                      value={formData.goals}
                      onChange={(e) => setFormData(prev => ({ ...prev, goals: e.target.value }))}
                      rows={4}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium mb-2">
                        Your Name (Optional)
                      </label>
                      <Input 
                        type="text"
                        value={formData.userName}
                        onChange={(e) => setFormData(prev => ({ ...prev, userName: e.target.value }))}
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <label className="block font-medium mb-2">
                        Your Email <span className="text-red-500">*</span>
                      </label>
                      <Input 
                        type="email"
                        value={formData.userEmail}
                        onChange={(e) => setFormData(prev => ({ ...prev, userEmail: e.target.value }))}
                        placeholder="Enter your email for personalized follow-up"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-teal hover:bg-teal-dark text-white w-full md:w-auto"
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                  <p className="text-sm text-muted-foreground mt-3 text-center md:text-left">
                    Suz will personally review your results and get back to you with personalized advice via email
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuizSection;
