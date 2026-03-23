/**
 * ResortCard Component
 * Displays individual resort details with amenities, pricing, and ratings
 */

import React from 'react';
import { Resort } from '../types/index';
import { Star, DollarSign, Calendar, Wifi, UtensilsCrossed } from 'lucide-react';

interface ResortCardProps {
  resort: Resort;
}

const ResortCard: React.FC<ResortCardProps> = ({ resort }) => {
  if (!resort) return null;

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
      {/* Image Section */}
      <div className="relative overflow-hidden bg-gray-200 h-48">
        <img
          src={resort.image}
          alt={resort.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-accent text-white px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
          <Star size={16} className="fill-white" />
          <span className="font-bold text-sm">{resort.rating}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Resort Name */}
        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">{resort.name}</h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{resort.description}</p>

        {/* Best Time */}
        <div className="flex items-start gap-2 mb-3">
          <Calendar size={16} className="text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs font-semibold text-gray-700">Best Time to Visit:</p>
            <p className="text-sm text-gray-600">{resort.bestTime}</p>
          </div>
        </div>

        {/* Price Range */}
        {resort.priceRange && (
          <div className="flex items-start gap-2 mb-3 bg-secondary/10 p-2 rounded">
            <DollarSign size={16} className="text-secondary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-semibold text-gray-700">Price Range:</p>
              <p className="text-sm font-bold text-secondary">{resort.priceRange}</p>
            </div>
          </div>
        )}

        {/* Highlights */}
        {resort.highlights && resort.highlights.length > 0 && (
          <div className="mb-3">
            <p className="text-xs font-semibold text-gray-700 mb-2">Highlights:</p>
            <div className="flex flex-wrap gap-1">
              {resort.highlights.map((highlight, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-gradient-to-r from-primary to-secondary text-white px-2 py-1 rounded-full"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Facilities with Icons */}
        {resort.facilities && resort.facilities.length > 0 && (
          <div className="border-t pt-3">
            <p className="text-xs font-semibold text-gray-700 mb-2">Facilities:</p>
            <div className="space-y-1">
              {resort.facilities.map((facility, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                  {facility === 'WiFi' ? (
                    <Wifi size={14} className="text-primary" />
                  ) : facility.toLowerCase().includes('restaurant') ? (
                    <UtensilsCrossed size={14} className="text-secondary" />
                  ) : (
                    <span className="text-primary font-bold">✓</span>
                  )}
                  <span>{facility}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResortCard;
