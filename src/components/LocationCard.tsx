/**
 * LocationCard Component
 * Displays individual location/resort information with rating and details
 */

import React from 'react';
import { Location } from '../types/index';
import { Star, MapPin } from 'lucide-react';

interface LocationCardProps {
  location: Location;
}

const LocationCard: React.FC<LocationCardProps> = ({ location }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden bg-gray-200">
        <img
          src={location.image}
          alt={location.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-accent text-white px-3 py-1 rounded-full text-sm font-semibold">
          {location.type === 'resort' ? '🏨 Resort' : '🏔️ Location'}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5">
        {/* Title and Rating */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold text-primary pr-2 flex-1">{location.name}</h3>
          <div className="flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded-lg whitespace-nowrap">
            <Star size={16} className="text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-semibold text-yellow-700">{location.rating}</span>
          </div>
        </div>

        {/* Location Info */}
        <div className="flex items-center gap-2 text-gray-600 text-sm mb-3">
          <MapPin size={16} className="text-secondary" />
          <span>Altitude: {location.altitude}m</span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{location.description}</p>

        {/* Best Time */}
        <div className="mb-3">
          <p className="text-xs font-semibold text-primary mb-1">Best Time to Visit:</p>
          <p className="text-xs text-gray-700">{location.bestTime}</p>
        </div>

        {/* Highlights */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-primary mb-2">Highlights:</p>
          <div className="flex flex-wrap gap-1">
            {location.highlights.slice(0, 3).map((highlight, idx) => (
              <span
                key={idx}
                className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"
              >
                {highlight}
              </span>
            ))}
          </div>
        </div>

        {/* Resort-specific Info */}
        {location.type === 'resort' && (
          <div className="mb-3">
            <p className="text-xs font-semibold text-primary mb-1">Price Range:</p>
            <p className="text-sm text-accent font-bold">{location.priceRange}</p>
          </div>
        )}

        {/* Facilities for Resorts */}
        {location.facilities && location.facilities.length > 0 && (
          <div className="mb-3">
            <p className="text-xs font-semibold text-primary mb-2">Facilities:</p>
            <div className="flex flex-wrap gap-1">
              {location.facilities.slice(0, 4).map((facility, idx) => (
                <span key={idx} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {facility}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* More Info Button */}
        <button className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-colors duration-200">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default LocationCard;
