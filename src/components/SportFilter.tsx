import { useMemo } from 'react';
import type { League } from '../types/league';

interface SportFilterProps {
  leagues: League[];
  selectedSport: string;
  onSportChange: (sport: string) => void;
}

export const SportFilter = ({ leagues, selectedSport, onSportChange }: SportFilterProps) => {
  const sports = useMemo(() => {
    const uniqueSports = new Set(leagues.map(league => league.strSport));
    return Array.from(uniqueSports).sort();
  }, [leagues]);

  return (
    <div className="mb-6">
      <label htmlFor="sport-filter" className="block text-sm font-medium text-gray-700 mb-2">
        Filter by Sport
      </label>
      <select
        id="sport-filter"
        className="block w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
        value={selectedSport}
        onChange={(e) => onSportChange(e.target.value)}
        aria-describedby="sport-filter-description"
      >
        <option value="">All Sports</option>
        {sports.map(sport => (
          <option key={sport} value={sport}>
            {sport}
          </option>
        ))}
      </select>
      <div id="sport-filter-description" className="sr-only">
        Filter the list of leagues by selecting a specific sport
      </div>
    </div>
  );
};