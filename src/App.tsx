/**
 * Main App Component
 * Manages state and displays the complete application with cascading filter system
 */

import React, { useState, useMemo } from 'react';
import './index.css';
import Header from './components/Header';
import FilterPanel from './components/FilterPanel';
import AttractionCard from './components/AttractionCard';
import ResortCard from './components/ResortCard';
import { hillsData } from './data/locations';
import { StateType, FilterType, Location, Attraction, Resort } from './types/index';
import { Mountain, Hotel } from 'lucide-react';

/**
 * Main App Component
 *
 * State Management:
 * - selectedState: Currently selected state (Tamil Nadu, Kerala, Karnataka)
 * - selectedLocation: Currently selected location ID
 * - selectedType: Filter type (location=places, resort=resorts)
 *
 * Logic:
 * - Filters locations based on selected state
 * - Displays places or resorts based on selectedType
 * - Shows attractions for selected place or resorts in that location
 *
 * Features:
 * - Cascading dropdown system: State → Location → [Places/Resorts]
 * - Professional UI with Tailwind CSS
 * - Responsive grid layout
 * - Dynamic filtering with disabled state
 */
const App: React.FC = () => {
  // State management
  const [selectedState, setSelectedState] = useState<StateType>('tamil-nadu');
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<FilterType>('location');

  /**
   * Get available locations for the selected state
   * Only includes locations (not resorts)
   */
  const availableLocations = useMemo(() => {
    return hillsData
      .filter((item: Location) => item.state === selectedState && item.type === 'location')
      .map((item: Location) => ({
        id: item.id,
        name: item.name,
      }));
  }, [selectedState]);

  /**
   * Get the selected location object with its details and attractions
   */
  const selectedLocationData = useMemo(() => {
    if (!selectedLocation) return null;
    return hillsData.find((item: Location) => item.id === selectedLocation);
  }, [selectedLocation]);

  /**
   * Extract attractions from the selected location
   */
  const attractions = useMemo(() => {
    return selectedLocationData?.attractions || [];
  }, [selectedLocationData]);

  /**
   * Get resorts in the selected location
   * Filters resorts with rating >= 3.7 and sorts by rating (high to low)
   */
  const resortsInLocation = useMemo(() => {
    return (selectedLocationData?.resorts || [])
      .filter((resort: Resort) => resort.rating >= 3.7)
      .sort((a: Resort, b: Resort) => b.rating - a.rating);
  }, [selectedLocationData]);

  const handleStateChange = (state: StateType) => {
    setSelectedState(state);
    setSelectedLocation(null); // Reset location when state changes
    setSelectedType('location'); // Reset to places view
  };

  const handleLocationChange = (locationId: string | null) => {
    setSelectedLocation(locationId);
    if (locationId) {
      setSelectedType('location'); // Default to places view when location is selected
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Panel */}
        <FilterPanel
          selectedState={selectedState}
          selectedLocation={selectedLocation}
          selectedType={selectedType}
          availableLocations={availableLocations}
          onStateChange={handleStateChange}
          onLocationChange={handleLocationChange}
          onTypeChange={setSelectedType}
        />

        {/* Results Section - Places & Attractions */}
        {selectedLocation && selectedLocationData && selectedType === 'location' && attractions.length > 0 && (
          <div className="mt-12">
            {/* Results Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <Mountain className="text-primary" size={28} />
                <h2 className="text-3xl font-bold text-gray-800">
                  {selectedLocationData.name} - Attractions & Places
                </h2>
              </div>
              <p className="text-gray-600 text-lg">
                Explore {attractions.length} amazing attractions and places to visit in {selectedLocationData.name}, {selectedState.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
              </p>
            </div>

            {/* Attractions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {attractions.map((attraction: Attraction) => (
                <AttractionCard key={attraction.id} attraction={attraction} />
              ))}
            </div>
          </div>
        )}

        {/* Results Section - Resorts */}
        {selectedLocation && selectedType === 'resort' && resortsInLocation.length > 0 && (
          <div className="mt-12">
            {/* Results Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <Hotel className="text-secondary" size={28} />
                <h2 className="text-3xl font-bold text-gray-800">
                  Resorts & Stays in {selectedLocationData?.name}
                </h2>
              </div>
              <p className="text-gray-600 text-lg">
                Choose from {resortsInLocation.length} luxury resorts and wonderful accommodation options
              </p>
            </div>

            {/* Resorts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resortsInLocation.map((resort: Resort) => (
                <ResortCard key={resort.id} resort={resort} />
              ))}
            </div>
          </div>
        )}

        {/* No Selection Message */}
        {!selectedLocation && (
          <div className="mt-12 text-center py-16 bg-white rounded-lg border-2 border-dashed border-secondary">
            <Mountain size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-xl text-gray-700 font-semibold">
              Select a state and then choose a location
            </p>
            <p className="text-gray-500 mt-2">
              to discover amazing attractions, viewpoints, temples, resorts and more!
            </p>
          </div>
        )}

        {/* Empty Result Message for Places */}
        {selectedLocation && selectedLocationData && selectedType === 'location' && attractions.length === 0 && (
          <div className="mt-12 text-center py-16 bg-white rounded-lg border-2 border-dashed border-gray-300">
            <Mountain size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-xl text-gray-600 font-semibold">
              No attractions found for this location
            </p>
          </div>
        )}

        {/* Empty Result Message for Resorts */}
        {selectedLocation && selectedType === 'resort' && resortsInLocation.length === 0 && (
          <div className="mt-12 text-center py-16 bg-white rounded-lg border-2 border-dashed border-gray-300">
            <Hotel size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-xl text-gray-600 font-semibold">
              No resorts found in this state
            </p>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 text-center border-t pt-12 pb-12 bg-gradient-to-r from-primary/5 to-secondary/5">
          <p className="text-gray-700 font-light tracking-wide">
            Created by and Explore with Alagu - 
            <a 
              href="mailto:alagumalaiece@gmail.com" 
              className="text-primary font-semibold hover:text-secondary transition-all duration-300 ml-2 hover:underline"
            >
              Alagumalai Krishnan
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
