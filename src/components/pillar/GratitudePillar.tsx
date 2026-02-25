'use client';

import React from 'react';
import Seo from '@/components/seo/Seo';
import { Button } from '@/components/ui/button';

const gratitudePractices = [
  {
    title: 'Before your feet hit the floor',
    description: 'Before you get out of bed, name one thing you are grateful for. A soft pillow counts. So does waking up.'
  },
  {
    title: 'A 10-minute gratitude stroll',
    description: 'Take a short walk and silently thank your body, the trees, the sky—anything that catches your eye. No pressure to feel a certain way. Just notice.'
  },
  {
    title: 'The bedside notebook ritual',
    description: 'Keep a small notebook nearby and jot down three things that made your day better. A warm cup of tea or a text from a friend absolutely qualifies.'
  },
  {
    title: 'Say it now, not later',
    description: 'Call or text someone and tell them exactly what you appreciate about them. Gratitude is most powerful when it is shared in real time.'
  },
  {
    title: 'Flip the script on your aches',
    description: 'When joints complain after gardening, try “I am grateful I am strong enough to dig in the dirt and grow beautiful things.”'
  }
];

const GratitudePillar = () => {
  const canonicalPath = '/pillars/gratitude';

  const scrollToPractices = React.useCallback(() => {
    const section = document.getElementById('gratitude-practices');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="bg-background min-h-screen">
      <Seo
        title="Gratitude"
        description="Gratitude is the quiet superpower of the rebellious soul—fueling joy, resilience, and bold aging through everyday practices."
        canonicalPath={canonicalPath}
      />

      <section className="bg-gradient-to-b from-teal/20 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Gratitude</h1>
            <p className="text-xl text-teal font-semibold mb-6">The Quiet Superpower of the Rebellious Soul</p>
            <div className="space-y-4 text-lg text-gray-700 text-left">
              <p>
                Gratitude isn’t about being nice, polite, or pretending everything is fine. It’s a daily decision to notice what is still
                beautiful, still possible, and still alive in you—even when your knees creak a little louder and life feels messy.
              </p>
              <p>
                For the rebellious ager, gratitude is not a trend. It is transformation. It turns “Why me?” into “What now?” and “I used to…”
                into “I get to.”
              </p>
            </div>
            <Button
              type="button"
              size="lg"
              className="mt-8 bg-teal text-white hover:bg-teal-dark"
              onClick={scrollToPractices}
            >
              Start Your Gratitude Practice
            </Button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 space-y-16">
        <section className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold">What Gratitude Really Is (for Rebels)</h2>
          <div className="space-y-4 text-lg text-gray-700">
            <p>
              Gratitude is often confused with manners. “Say thank you.” “Write your thank-you note.” “Go around the table and list what you’re
              thankful for.” All of that has its place. But here at Rebellious Aging, gratitude is something deeper, and much more powerful.
            </p>
            <p>Gratitude is a way of seeing.</p>
            <p>
              It is the choice to pay attention to what is good and worthy—even in the middle of chaos, change, or another reminder from your
              body that you are not 25 anymore. Real gratitude doesn’t deny reality, sugar-coat loss, grief, or frustration, or ask you to be
              positive all the time.
            </p>
            <p>
              Instead, it says: “This is my life, exactly as it is right now—and there is still so much here to love, learn from, and say yes to.”
              That’s rebellious.
            </p>
          </div>
        </section>

        <section className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold">Why Gratitude Matters as We Age</h2>
          <div className="space-y-4 text-lg text-gray-700">
            <p>
              When we’re younger, gratitude can feel optional—something nice if you have time. As we age, it becomes essential. It anchors us
              when things change, softens the sting of losses without pretending they don’t hurt, brings perspective to the curveballs and the
              mundane, and reminds us we’re still here—still learning, loving, and making an impact.
            </p>
            <p>
              In a culture that whispers (or shouts) that aging is decline, gratitude is a firm, clear “No, thank you. I’m writing a different
              story.”
            </p>
            <div>
              <p className="font-semibold">Gratitude helps you say:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Not “I used to do so much more,” but “I get to choose how I spend my energy now.”</li>
                <li>Not “Everything is slipping away,” but “Look at what I still get to experience, create, and enjoy.”</li>
              </ul>
            </div>
            <div className="space-y-2">
              <p className="font-semibold">It supports every other pillar:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Confidence:</strong> You stop defining yourself by what you’ve lost and start standing in who you still are.</li>
                <li><strong>Style:</strong> You dress a body you appreciate, not one you’re constantly at war with.</li>
                <li><strong>Health:</strong> You move, eat, and rest from a place of care, not punishment.</li>
              </ul>
            </div>
            <p>Gratitude doesn’t erase the hard. It gives you the strength, perspective, and stubborn hope to keep going.</p>
          </div>
        </section>

        <section className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold">Where Sparkle Meets Science</h2>
          <div className="space-y-4 text-lg text-gray-700">
            <p>This isn’t just feel-good talk. Your brain actually changes when you practice gratitude.</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Boosts dopamine and serotonin—the feel-good chemicals that keep spirits lifted.</li>
              <li>Strengthens neural pathways related to emotional regulation and empathy.</li>
              <li>Makes it easier, over time, to notice joy, connection, and peace.</li>
            </ul>
            <p>
              Translation: the more you practice gratitude, the more natural it becomes to feel grounded, hopeful, and connected—even on imperfect
              days.
            </p>
            <p>
              In one study from UC Davis, people who kept a simple gratitude journal for just ten weeks felt more optimistic, exercised more, and
              went to the doctor less often than those who focused on daily hassles. No miracle supplement. No overnight fix. Just a few minutes of
              attention each day. Gratitude really is a quiet superpower.
            </p>
          </div>
        </section>

        <section id="gratitude-practices" className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold">Everyday Gratitude Practices (Without Making It a Chore)</h2>
          <p className="text-lg text-gray-700">
            Gratitude doesn’t need to be dramatic or time-consuming. Start small. Start where you are. Let it be imperfect and real. Here are some
            simple ways to weave gratitude into your day:
          </p>
          <ol className="space-y-6">
            {gratitudePractices.map((practice) => (
              <li key={practice.title} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <p className="font-semibold text-xl mb-2">{practice.title}</p>
                <p className="text-gray-700 text-lg">{practice.description}</p>
              </li>
            ))}
          </ol>
          <p className="text-lg text-gray-700">
            These practices are not about pretending everything is great. They are about gently training your brain to see the whole picture—including
            the parts that are still good.
          </p>
        </section>

        <section className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold">Gratitude as Quiet Rebellion</h2>
          <div className="space-y-4 text-lg text-gray-700">
            <p>In a youth-obsessed culture, it’s easy to buy into the story that aging is just a slow fade-out. Gratitude says otherwise.</p>
            <p>
              Every time you choose to notice what’s still working, still beautiful, still meaningful, you are refusing the narrative of decline,
              claiming your right to joy, connection, and purpose, and rising—with health, confidence, grace, style, and gumption.
            </p>
            <p>
              Gratitude is not about denying the hard parts of aging. It is about refusing to let them have the last word. For the rebellious ager,
              gratitude becomes a daily act of defiance, a form of self-respect, and a steady companion as you navigate each new decade.
            </p>
          </div>
        </section>

        <section className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold">Your Next Step: Make Gratitude Your Daily Rebellion</h2>
          <div className="space-y-4 text-lg text-gray-700">
            <p>You don’t need a perfect journal, a retreat, or a big life change to start.</p>
            <p>Choose one simple practice and try it for the next seven days:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>One thing you’re grateful for before you get out of bed.</li>
              <li>A 10-minute gratitude walk.</li>
              <li>Three things in a notebook at night.</li>
            </ul>
            <p>Notice what shifts—in your mood, your energy, your outlook.</p>
            <p>When you’re ready to go deeper:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <a
                  href="https://rebelwithsuz.com/welcome-letter"
                  className="text-teal hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read the Welcome Letter
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/groups/1497629461551095/"
                  className="text-teal hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join the Facebook Community
                </a>
              </li>
              <li>
                <a
                  href="https://rebelwithsuz.com/contact"
                  className="text-teal hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Reach out to Suz for guidance
                </a>
              </li>
            </ul>
            <p>
              Gratitude doesn’t ask you to be perfect. It simply invites you to show up, as you are, and remember how rich your life truly is.
            </p>
            <div>
              <p className="font-semibold">Sparkle on,</p>
              <p><strong>Suz</strong></p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default GratitudePillar;
