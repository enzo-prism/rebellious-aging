
import React from 'react';

const NewsletterSignup = () => {

  return (
    <section className="bg-teal/10 section-padding">
      <div className="container mx-auto container-padding">
        <div className="max-w-3xl mx-auto text-center text-spacing">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Join the Rebellious Aging Movement</h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            More rebellious content in the works! Get exclusive tips, resources, and inspiration delivered straight to your inbox.
            We'll help you navigate the journey of aging with purpose and vitality.
          </p>
          
          <div className="max-w-lg mx-auto">
            <iframe
              src="https://fxuqp40sseh.typeform.com/to/DbY1YJrs"
              width="100%"
              height="500"
              frameBorder="0"
              allow="camera; microphone; encrypted-media;"
              scrolling="no"
              title="Newsletter Signup"
              className="rounded-lg shadow-lg"
            />
          </div>
          
          <p className="text-sm text-gray-500">
            We respect your privacy and will never share your information.
            You can unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
