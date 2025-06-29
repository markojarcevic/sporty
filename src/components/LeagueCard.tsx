import React from 'react';
import type { League } from '../types/league';

interface LeagueCardProps {
  league: League;
  onClick: () => void;
}

export const LeagueCard = ({ league, onClick }: LeagueCardProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 border border-gray-200"
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${league.strLeague} in ${league.strSport}`}
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {league.strLeague}
      </h3>
      <p className="text-sm text-gray-600 mb-1">
        <span className="font-medium">Sport:</span> {league.strSport}
      </p>
      {league.strLeagueAlternate && (
        <p className="text-sm text-gray-500">
          <span className="font-medium">Also known as:</span> {league.strLeagueAlternate}
        </p>
      )}
    </div>
  );
};