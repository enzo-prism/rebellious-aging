import React from 'react';
import { Mail } from 'lucide-react';

const ConnectCTA: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-accent/10 p-8 md:p-12 rounded-lg border border-accent/20">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-accent/20 rounded-full">
              <Mail className="w-6 h-6 text-coral-dark" />
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">Let's Connect</h2>
              <p className="text-lg text-gray-800 mb-6 leading-relaxed">
              Whether you're just starting your rebellious aging journey or looking for specific guidance, I'm here to help. Don't hesitate to reach out!
            </p>
            <div className="space-y-2">
              <p className="text-lg font-semibold text-foreground">Email</p>
              <a 
                href="mailto:suz@rebelwithsuz.com" 
                className="text-gray-900 hover:text-teal text-lg font-medium transition-colors inline-block"
              >
                suz@rebelwithsuz.com
              </a>
              <p className="text-sm text-gray-800 mt-3">
                I typically respond within 24 hours
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConnectCTA;
