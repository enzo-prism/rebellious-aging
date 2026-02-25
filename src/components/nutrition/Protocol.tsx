
import React from 'react';

const Protocol = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Dr. Caldwell Esselstyn's Protocol</h2>
      
      <div className="prose max-w-none space-y-6">
        <p className="text-lg leading-relaxed">
          Dr. Caldwell Esselstyn's work has transformed our understanding of heart disease. A distinguished surgeon and researcher at the Cleveland Clinic, he has conducted a long running study on the effects of nutrition on heart health. His findings are remarkable: a Whole Food, Plant-Based, oil free diet not only can prevent the progression of coronary heart disease, it can actually reverse it.
        </p>
        
        <p className="leading-relaxed">
          By eliminating meat, dairy, oils, and highly processed foods, and focusing instead on nutrient-dense plant foods, especially leafy greens, Dr. Esselstyn's patients have restored blood flow, reduced inflammation, and, in many cases, avoided the need for surgery or medication. His message is clear and compelling: the most powerful tool for protecting your heart is your daily food choices. It is not a quick fix, it is a lifestyle, and one that offers the potential for profound healing and vitality.
        </p>
        
        <div className="bg-teal/10 p-6 rounded-lg border-l-4 border-teal">
          <p className="leading-relaxed">
            At Rebellious Aging, I deeply honor Dr Esselstyn's evidence-based approach and incorporate his principles and guidance into my lifestyle. While each of us has unique needs, I believe his work offers a powerful foundation for anyone seeking long term health and vitality, especially as we age. Embracing a WFPB lifestyle is not about restriction, it is about liberation.
          </p>
        </div>
        
        <p className="leading-relaxed">
          It is about reclaiming our health, protecting our clarity and purpose. Whether you are taking your first step or fine tuning your path, this way of eating can help you thrive from the inside out.
        </p>
        
        <div className="bg-coral/10 p-6 rounded-lg border-l-4 border-coral">
          <p className="font-medium leading-relaxed">
            I follow his protocol myself and it has been life changing. This way of eating has brought my cholesterol levels down without meds, vanished the arthritis in my hands and fingers, stabilized my weight, re-energized me and gives me the peace of mind knowing I am supporting my heart and a peaceful life with every bite.
          </p>
        </div>
        
        <div className="bg-gradient-to-r from-teal/20 to-coral/20 p-6 rounded-lg text-center">
          <p className="text-lg font-bold leading-relaxed">
            This lifestyle is not about DEPRIVATION. It is about freedom: freedom from chronic illness, from fear, from food confusion. It is never too late to nourish your body, protect your health, and feel truly alive again.
          </p>
        </div>
        
        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4">Dr. Esselstyn's Important Videos</h3>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-teal">
              <p className="text-gray-700 mb-4">
                Watch Dr. Esselstyn's important presentation about heart disease prevention and reversal through whole-food, plant-based nutrition.
              </p>
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/EqKNfyUPzoU"
                  title="Dr. Esselstyn on Heart Disease Prevention"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-teal">
              <p className="text-gray-700 mb-4">
                Additional insights from Dr. Esselstyn on cardiovascular health and plant-based nutrition.
              </p>
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/ZC3wRx4vV7g"
                  title="Dr. Esselstyn on Cardiovascular Prevention"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
          </div>
          
          <h3 className="text-2xl font-bold mb-4">Dr. Esselstyn's Attention Grabbers</h3>
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-coral">
              <blockquote className="text-lg italic leading-relaxed">
                "Heart disease is a food borne illness."
              </blockquote>
              <cite className="block text-right mt-2 text-gray-600">— Dr. Caldwell Esselstyn</cite>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-coral">
              <blockquote className="text-lg italic leading-relaxed">
                "The truth be told, coronary artery disease is a toothless paper tiger that needs to never exist and if it does exist, it need never progress."
              </blockquote>
              <cite className="block text-right mt-2 text-gray-600">— Dr. Caldwell Esselstyn</cite>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-coral">
              <blockquote className="text-lg italic leading-relaxed">
                "Some people think the WFPB diet is extreme. Half a million people a year will have their chest opened up and a vein taken from their leg and sewn onto their coronary artery. Some people would call that extreme."
              </blockquote>
              <cite className="block text-right mt-2 text-gray-600">— Dr. Caldwell Esselstyn</cite>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Protocol;
