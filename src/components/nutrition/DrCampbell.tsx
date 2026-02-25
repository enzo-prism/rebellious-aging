import React from 'react';

const DrCampbell = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Dr. T. Colin Campbell, PhD</h2>
      
      <div className="prose max-w-none space-y-6">
        <p className="text-lg leading-relaxed">
          Dr. T. Colin Campbell, PhD, Cornell University, Professor Emeritus of Nutritional Biochemistry and co-author of The China Study. He is a biochemist who specializes in the effect of nutrition on long-term health. He is well known for The China Study, the largest study of diet and health ever conducted. In his work he reveals the power of a WFPB diet to prevent and even reverse chronic disease. A truth that inspires my own journey and fuels my passion for sharing this lifestyle.
        </p>
        
        <div className="space-y-6 mb-8">
          <h3 className="text-xl font-bold mb-3">Dr. Campbell's Important Videos</h3>
          
          <div className="bg-teal/10 p-6 rounded-lg border-l-4 border-teal">
            <p className="text-gray-700 mb-4">
              Watch Dr. T. Colin Campbell discuss his groundbreaking research and the principles of whole-food, plant-based nutrition.
            </p>
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/WxEzPwu0nWs"
                title="Dr. T. Colin Campbell on Plant-Based Nutrition"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>
          </div>
          
          <div className="bg-teal/10 p-6 rounded-lg border-l-4 border-teal">
            <p className="text-gray-700 mb-4">
              Additional insights from Dr. Campbell on The China Study and nutritional research.
            </p>
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/cto8hAz8RrI"
                title="Dr. T. Colin Campbell on The China Study"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>
          </div>
        </div>
        
        <div className="bg-teal/10 p-6 rounded-lg border-l-4 border-teal">
          <blockquote className="text-lg italic leading-relaxed mb-4">
            "The people who ate the most animal-based foods got the most chronic disease... People who ate the most plant-based foods were the healthiest and tended to avoid chronic disease. These results could not be ignored."
          </blockquote>
          <cite className="text-right text-gray-600">— Dr. T. Colin Campbell</cite>
        </div>
        
        <div>
          <h3 className="text-2xl font-bold mb-4">The 8 Principles of Dr. Campbell's Work</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-teal">
              <p className="text-gray-700">
                <strong>1.</strong> Nutrition represents the combined activities of countless food substances, not individual nutrients.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-teal">
              <p className="text-gray-700">
                <strong>2.</strong> Nutrients work together. The whole is greater than the sum of its parts.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-teal">
              <p className="text-gray-700">
                <strong>3.</strong> Good nutrition creates health in all areas of our existence.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-teal">
              <p className="text-gray-700">
                <strong>4.</strong> A WFPB diet can prevent and even reverse chronic disease.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-teal">
              <p className="text-gray-700">
                <strong>5.</strong> Genes do not determine disease on their own. Nutrition plays a critical role in whether genes are expressed.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-teal">
              <p className="text-gray-700">
                <strong>6.</strong> Nutrition can control the negative effects of harmful chemicals.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-teal">
              <p className="text-gray-700">
                <strong>7.</strong> The same diet that prevents disease in its early stages can also halt or reverse it in later stages.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-teal">
              <p className="text-gray-700">
                <strong>8.</strong> Good nutrition supports overall health and well-being, not just disease prevention.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrCampbell;