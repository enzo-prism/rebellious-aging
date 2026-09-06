
import React from 'react';

const WhatIsWFPB = () => {
  return (
    <div className="mt-6">
      <h2 className="text-3xl font-bold mb-6">What is Whole-Food, Plant-Based Nutrition?</h2>
      <div className="prose max-w-none">
        <p className="mb-4">
          A whole-food, plant-based (WFPB) diet focuses on eating whole plant foods in their natural or minimally processed forms. Unlike typical vegetarian or vegan diets, WFPB emphasizes the quality and wholeness of foods rather than simply avoiding animal products.
        </p>
        
        <h3 className="text-xl font-bold mt-6 mb-3">Key Components of WFPB Nutrition:</h3>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>Whole foods:</strong> Foods that are unprocessed or minimally processed</li>
          <li><strong>Plant-based:</strong> Derived from plants, including vegetables, fruits, whole grains, legumes, nuts, and seeds</li>
          <li><strong>Minimally processed:</strong> Foods that retain their natural nutritional integrity</li>
          <li><strong>Avoids:</strong> Animal products, refined foods, added oils, most packaged foods, minimize sugars, oils, and salt (ideally no salt)</li>
        </ul>
        
        <p className="mb-4">
          The WFPB approach is distinct from simply being vegetarian or vegan, as it emphasizes eating whole, unprocessed foods. A person can be vegan but still consume heavily processed foods with minimal nutritional value.
        </p>
        
        <p>
          Explore the original educational resources in the{' '}
          <a href="https://nutritionstudies.org/whole-food-plant-based-diet-guide/" className="text-teal underline">
            T. Colin Campbell Center for Nutrition Studies’ whole-food, plant-based guide
          </a>{' '}
          and the{' '}
          <a href="https://esselstynfamilyfoundation.org/ef-content/uploads/2022/06/PB-jumpstart-guide.pdf" className="text-teal underline">
            Esselstyn Family Foundation’s free jumpstart booklet
          </a>.
          These resources explain their approaches in more detail and are part of Suz’s learning library.
        </p>
      </div>
    </div>
  );
};

export default WhatIsWFPB;
