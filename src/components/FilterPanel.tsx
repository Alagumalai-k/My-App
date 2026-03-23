/**
 * FilterPanel Component
 * Displays state selector, location filter, and Places/Resorts toggle
 */

import React from 'react';
import { StateType, FilterType } from '../types/index';
import { Filter, MapPin, Mountain, Hotel } from 'lucide-react';

interface FilterPanelProps {
  selectedState: StateType;
  selectedLocation: string | null;
  selectedType: FilterType;
  availableLocations: { id: string; name: string }[];
  onStateChange: (state: StateType) => void;
  onLocationChange: (locationId: string | null) => void;
  onTypeChange: (type: FilterType) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  selectedState,
  selectedLocation,
  selectedType,
  availableLocations,
  onStateChange,
  onLocationChange,
  onTypeChange,
}) => {
  const handleStateChange = (newState: StateType) => {
    onStateChange(newState);
    onLocationChange(null); // Reset location when state changes
  };

  const handleLocationChange = (locationId: string | null) => {
    onLocationChange(locationId);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex items-center gap-2 mb-6">
        <Filter size={24} className="text-primary" />
        <h2 className="text-2xl font-bold text-primary">Select Your Destination</h2>
      </div>

      {/* State and Location Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* State Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <MapPin size={18} className="text-primary" />
            Select State:
          </label>
          <select
            value={selectedState}
            onChange={(e) => handleStateChange(e.target.value as StateType)}
            className="w-full px-4 py-2 border-2 border-primary rounded-lg focus:outline-none focus:border-secondary transition-colors duration-200 bg-white font-semibold"
          >
            <option value="tamil-nadu">Tamil Nadu</option>
            <option value="kerala">Kerala</option>
            <option value="karnataka">Karnataka</option>
          </select>
        </div>

        {/* Location Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <MapPin size={18} className="text-secondary" />
            Select Location:
          </label>
          <select
            value={selectedLocation || ''}
            onChange={(e) => handleLocationChange(e.target.value || null)}
            disabled={availableLocations.length === 0}
            className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none transition-colors duration-200 font-semibold ${
              availableLocations.length === 0
                ? 'border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed'
                : 'border-secondary bg-white focus:border-primary'
            }`}
          >
            <option value="">
              {availableLocations.length === 0 ? 'No locations available' : 'Choose a location...'}
            </option>
            {availableLocations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Places/Resorts Toggle - Shows only when location is selected */}
      {selectedLocation && (
        <div className="border-t pt-6">
          <label className="block text-sm font-semibold text-gray-700 mb-4">
            What would you like to explore?
          </label>
          <div className="flex gap-6">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="type"
                value="location"
                checked={selectedType === 'location'}
                onChange={(e) => onTypeChange(e.target.value as FilterType)}
                className="w-4 h-4 text-primary cursor-pointer"
              />
              <span className="flex items-center gap-2 font-semibold text-gray-700 group-hover:text-primary transition-colors">
                <Mountain size={20} className="text-primary" />
                Places & Attractions
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="type"
                value="resort"
                checked={selectedType === 'resort'}
                onChange={(e) => onTypeChange(e.target.value as FilterType)}
                className="w-4 h-4 text-secondary cursor-pointer"
              />
              <span className="flex items-center gap-2 font-semibold text-gray-700 group-hover:text-secondary transition-colors">
                <Hotel size={20} className="text-secondary" />
                Resorts & Stays
              </span>
            </label>    
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;

