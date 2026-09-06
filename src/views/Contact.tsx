'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, MessageCircle } from 'lucide-react';
import Seo from '@/components/seo/Seo';
import PageShareButton from '@/components/share/PageShareButton';
import PageTopUtilityRow from '@/components/share/PageTopUtilityRow';
import { getSeoRouteByPath } from '@/data/seoRoutes';
import { FACEBOOK_GROUP_URL } from '@/lib/constants';

const Contact = () => {
  const seoConfig = getSeoRouteByPath('/contact');
  const [showForm, setShowForm] = React.useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {seoConfig && (
        <Seo
          title={seoConfig.title}
          description={seoConfig.description}
          canonicalPath={seoConfig.path}
        />
      )}
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-r from-teal/10 to-coral/10">
        <div className="container mx-auto px-4 text-center">
          <PageTopUtilityRow className="mx-auto max-w-2xl">
            <PageShareButton />
          </PageTopUtilityRow>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Get in Touch with Suz
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions about the Rebellious Aging movement? Need personalized advice? 
            I'd love to hear from you and support you on your journey.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            
            {/* Typeform Embed */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Get in Touch</CardTitle>
              </CardHeader>
              <CardContent>
                {showForm ? (
                  <iframe
                    src="https://fxuqp40sseh.typeform.com/to/DbY1YJrs"
                    width="100%"
                    height="600"
                    frameBorder="0"
                    allow="encrypted-media;"
                    title="Contact Form"
                    className="rounded-lg"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                ) : (
                  <div className="flex flex-col items-center text-center gap-4 py-12">
                    <p className="text-muted-foreground max-w-md">
                      Send Suz a message using the contact form, or email her directly below.
                    </p>
                    <button
                      onClick={() => setShowForm(true)}
                      className="px-6 py-3 rounded-full bg-teal text-white font-semibold hover:bg-teal/90 transition-colors"
                    >
                      Open Contact Form
                    </button>
                  </div>
                )}
                <p className="mt-4 text-center text-base text-gray-600">
                  Prefer a separate window?{' '}
                  <a href="https://fxuqp40sseh.typeform.com/to/DbY1YJrs" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-teal underline underline-offset-4">
                    Open the contact form in a new tab
                  </a>
                </p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6">Let's Connect</h2>
                <p className="text-gray-600 text-lg mb-8">
                  Whether you're just starting your rebellious aging journey or looking for specific guidance, 
                  I'm here to help. Don't hesitate to reach out!
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-teal/10 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-teal" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Email</h3>
                    <a href="mailto:suz@rebelwithsuz.com" className="inline-flex min-h-11 items-center text-lg text-teal underline underline-offset-4 break-all">suz@rebelwithsuz.com</a>
                    <p className="text-sm text-gray-500 mt-1">
                      I typically respond within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-coral/10 p-3 rounded-full">
                    <MessageCircle className="h-6 w-6 text-coral" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Find your community</h3>
                    <p className="text-gray-600">Connect with fellow rebellious agers.</p>
                    <a href={FACEBOOK_GROUP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-teal underline underline-offset-4">
                      Join the Facebook group<span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </div>
                </div>
              </div>

              <Card className="bg-gradient-to-r from-teal/5 to-coral/5 border-teal/20">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-3">Professional Contact Form</h3>
                  <p className="text-gray-700 mb-4">
                    Use the contact form to share your question or tell Suz what you have in mind.
                  </p>
                  <p className="text-gray-600">
                    You can also email Suz directly using the email link above.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
