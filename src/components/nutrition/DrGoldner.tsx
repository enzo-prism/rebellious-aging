import React from 'react';

const DrGoldner = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Dr. Brooke Goldner, MD</h2>

      <div className="prose max-w-none space-y-6">
        <p className="text-lg leading-relaxed">
          Dr. Brooke Goldner, MD is a board-certified physician, integrative psychiatrist, disease-reversal specialist and an acclaimed
          advocate for whole food plant based living. She is the creator of the Hyper Nourishing Healing Protocol and founder of
          GoodbyeLupus.com.
        </p>

        <p>
          Brooke was diagnosed with Lupus, a severe autoimmune disease, as a teenager and told she might not survive. She defied the odds by
          using optimal nutrition and lifestyle to reclaim her health.
        </p>

        <p>
          Her work blends rigorous medical training with the healing power of whole-food plant-based nutrition. She works with patients
          worldwide and speaks globally about reversing chronic disease through lifestyle.
        </p>

        <p>
          She is the best selling author of several books including <em>Goodbye Lupus</em> and <em>Goodbye Autoimmune Disease</em>. Her works
          focus on plant-based healing and green-smoothie nutrition. Her story continues to inspire thousands to transform their health
          through the power of food.
        </p>

        <div className="bg-teal/10 p-6 rounded-lg border-l-4 border-teal">
          <h3 className="text-xl font-semibold mb-3">Why her approach matters</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Proves food as medicine with her own reversal of Lupus and decades of patient success stories.</li>
            <li>Pairs medical rigor with practical, high-nourishment protocols (greens, hydration, whole foods).</li>
            <li>Centers empowerment—showing patients they have influence over chronic disease trajectories.</li>
            <li>Advocates a compassionate, accessible path to healing that complements medical care.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DrGoldner;
