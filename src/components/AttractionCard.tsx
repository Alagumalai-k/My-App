/**
 * AttractionCard Component
 * Displays individual attraction/place information
 */

import React from 'react';
import { Attraction } from '../types/index';
import { DollarSign, Calendar } from 'lucide-react';

interface AttractionCardProps {
  attraction: Attraction;
}

const AttractionCard: React.FC<AttractionCardProps> = ({ attraction }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
      {/* Image Section */}
      <div className="relative h-40 overflow-hidden bg-gray-200">
        <img
          src={attraction.image}
          alt={attraction.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Title */}
        <h4 className="text-base font-bold text-primary mb-2">{attraction.name}</h4>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-1">{attraction.description}</p>

        {/* Divider */}
        <div className="border-t pt-3 space-y-2">
          {/* Entry Fee */}
          {attraction.entryFee && (
            <div className="flex items-center gap-2 text-sm">
              <DollarSign size={16} className="text-accent" />
              <span className="text-gray-700 font-semibold">{attraction.entryFee}</span>
            </div>
          )}

          {/* Best Time */}
          {attraction.bestTime && (
            <div className="flex items-center gap-2 text-sm">
              <Calendar size={16} className="text-secondary" />
              <span className="text-gray-700">{attraction.bestTime}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttractionCard;
