import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ConnectCTA from '@/components/common/ConnectCTA';

const Resources = () => {
  const books = [
    {
      title: "How Not To Die",
      author: "Dr. Michael Greger",
      description: "Discover the foods scientifically proven to prevent and reverse disease.",
      gradient: "linear-gradient(to right, #ffc3a0 0%, #ffafbd 100%)",
      category: "Longevity"
    },
    {
      title: "Prevent and Reverse Heart Disease",
      author: "Dr. Caldwell Esselstyn",
      description: "The revolutionary scientifically proven, nutrition-based cure for heart disease.",
      gradient: "linear-gradient(to top, #accbee 0%, #e7f0fd 100%)",
      category: "Longevity"
    },
    {
      title: "The Confidence Code",
      author: "Katty Kay & Claire Shipman",
      description: "The science and art of self-assurance—what women should know.",
      gradient: "linear-gradient(to top, #d299c2 0%, #fef9d7 100%)",
      category: "Confidence"
    },
    {
      title: "Aging with Style and Grace",
      author: "Alison Lester",
      description: "Redefine your personal style in the second half of life.",
      gradient: "linear-gradient(to right, #ee9ca7, #ffdde1)",
      category: "Style"
    }
  ];
  
  const documentaries = [
    {
      title: "Forks Over Knives",
      creator: "Brian Wendel",
      description: "Examines the profound claim that most degenerative diseases can be controlled by rejecting animal-based and processed foods.",
      gradient: "linear-gradient(90deg, hsla(46, 73%, 75%, 1) 0%, hsla(176, 73%, 88%, 1) 100%)",
      category: "Longevity"
    },
    {
      title: "Game Changers",
      creator: "James Cameron",
      description: "Explores the benefits of plant-based eating for athletes and active individuals.",
      gradient: "linear-gradient(90deg, hsla(139, 70%, 75%, 1) 0%, hsla(63, 90%, 76%, 1) 100%)",
      category: "Longevity"
    }
  ];
  
  const downloads = [
    {
      title: "30-Day Meal Plan",
      description: "Complete plant-based meal plans with shopping lists and recipes.",
      category: "Longevity",
      type: "PDF"
    },
    {
      title: "Daily Confidence Journal",
      description: "Printable journal prompts to build your confidence daily.",
      category: "Confidence",
      type: "PDF"
    },
    {
      title: "Capsule Wardrobe Guide",
      description: "Creating a versatile, age-positive wardrobe with fewer pieces.",
      category: "Style",
      type: "PDF"
    },
    {
      title: "Food Shopping Guide",
      description: "What to look for and what to avoid for optimal nutrition.",
      category: "Longevity",
      type: "PDF"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-teal/10 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Resources</h1>
            <p className="text-lg text-gray-700 mb-8">
              Everything you need to support your rebellious aging journey. From starter kits to books, 
              documentaries, and downloadable tools, these resources will help you age with confidence, 
              style, and vibrant health.
            </p>
          </div>
        </div>
      </section>
      
      {/* Starter Kit Section */}
      <section className="py-16" id="starter-kit">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="bg-teal p-8 md:p-12 text-white">
                  <h2 className="text-3xl font-bold mb-4">Rebellious Aging Starter Kit</h2>
                  <p className="mb-6">
                    Everything you need to begin your rebellious aging journey in one comprehensive bundle:
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center">
                      <span className="mr-2 text-lg">•</span>
                      30-Day Action Plan for all four pillars
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2 text-lg">•</span>
                      Beginner's guide to plant-based eating
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2 text-lg">•</span>
                      Confidence-building audio meditations
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2 text-lg">•</span>
                      Style exploration worksheets
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2 text-lg">•</span>
                      Access to our private online community
                    </li>
                  </ul>
                  <Button className="bg-white text-teal hover:bg-gray-100">
                    Get the Starter Kit
                  </Button>
                </div>
                <div className="p-8 md:p-12 bg-gray-50">
                  <div className="flex items-center mb-6">
                    <div className="text-3xl font-bold text-teal">$37</div>
                    <div className="ml-2 text-gray-500 line-through">$59</div>
                  </div>
                  <h3 className="text-lg font-semibold mb-3">What people are saying:</h3>
                  <blockquote className="italic text-gray-700 mb-6">
                    "The starter kit gave me a clear roadmap for my rebellious aging journey. I especially loved the daily action steps that made big changes feel manageable."
                  </blockquote>
                  <div className="flex items-center">
                    <div className="mr-4">
                      <img 
                        src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=100&h=100"
                        alt="Customer" 
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium">Margaret L.</div>
                      <div className="text-sm text-gray-500">Age 65</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Books & Documentaries */}
      <section className="py-16 bg-gray-50" id="books">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Books & Documentaries</h2>
          
          <Tabs defaultValue="books" className="max-w-5xl mx-auto">
            <TabsList className="w-full max-w-md mx-auto grid grid-cols-2 mb-8">
              <TabsTrigger value="books">Books</TabsTrigger>
              <TabsTrigger value="documentaries">Documentaries</TabsTrigger>
            </TabsList>
            
            <TabsContent value="books">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {books.map((book, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
                    <div 
                      className="h-48 overflow-hidden"
                      style={{ background: book.gradient }}
                    />
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{book.title}</CardTitle>
                      <CardDescription>{book.author}</CardDescription>
                    </CardHeader>
                    <CardContent className="py-0 flex-grow">
                      <p className="text-sm text-gray-600">{book.description}</p>
                    </CardContent>
                    <CardFooter className="pt-2">
                      <Button variant="outline" className="w-full text-teal border-teal hover:bg-teal hover:text-white">
                        Learn More
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="documentaries">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {documentaries.map((doc, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
                    <div 
                      className="h-48 overflow-hidden"
                      style={{ background: doc.gradient }}
                    />
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{doc.title}</CardTitle>
                      <CardDescription>{doc.creator}</CardDescription>
                    </CardHeader>
                    <CardContent className="py-0 flex-grow">
                      <p className="text-sm text-gray-600">{doc.description}</p>
                    </CardContent>
                    <CardFooter className="pt-2">
                      <Button variant="outline" className="w-full text-teal border-teal hover:bg-teal hover:text-white">
                        Watch Trailer
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* Downloads & Tools */}
      <section className="py-16" id="tools">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Tools & Downloads</h2>
          
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {downloads.map((item, index) => (
                <div key={index} className="flex bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 flex items-center justify-center bg-teal/10 text-teal rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold">{item.title}</h3>
                      <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">
                        {item.type}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                    <Button variant="ghost" size="sm" className="text-teal hover:text-teal-dark hover:bg-teal/10">
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-teal/10 rounded-lg p-8 mt-12 text-center">
              <h3 className="text-2xl font-bold mb-4">Need Personal Guidance?</h3>
              <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                Our resources are designed to help you on your self-guided journey, but sometimes personalized 
                support makes all the difference. Book a one-on-one consultation with one of our rebellious aging coaches.
              </p>
              <Button className="bg-coral hover:bg-coral-dark text-white">
                Book a Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <ConnectCTA />
    </div>
  );
};

export default Resources;
