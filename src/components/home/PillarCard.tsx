
import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface PillarCardProps {
  title: string;
  description: string;
  icon: string;
  link: string;
}

const PillarCard: React.FC<PillarCardProps> = ({ title, description, icon, link }) => {
  return (
    <Card className="pillar-card card-lift group h-full">
      <CardHeader className="pb-4">
        <div className="icon-pop w-16 h-16 lg:w-20 lg:h-20 mb-4 lg:mb-6 text-4xl lg:text-5xl flex items-center justify-center text-teal bg-teal/10 group-hover:bg-teal/20 rounded-full">
          {icon}
        </div>
        <CardTitle className="text-2xl lg:text-3xl transition-colors group-hover:text-teal">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-gray-600 text-base lg:text-lg leading-relaxed">{description}</p>
      </CardContent>
      <CardFooter className="pt-6">
        <Link
          href={link}
          className="text-teal font-medium hover:text-teal-dark group-hover:underline transition-all text-base lg:text-lg"
        >
          Learn more <span className="arrow-nudge">→</span>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default PillarCard;
