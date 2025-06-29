import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
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
      className="group bg-slate-800/60 backdrop-blur-sm rounded-2xl p-5 cursor-pointer hover:bg-slate-700/80 hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 transition-all duration-300 border border-slate-700/50 relative overflow-hidden"
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${league.strLeague} in ${league.strSport}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-100 mb-1 group-hover:text-white transition-colors">
              {league.strLeague}
            </h3>
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {league.strSport}
              </span>
            </div>
          </div>
          <div className="ml-3 p-2 rounded-xl bg-slate-700/80 group-hover:bg-emerald-500/20 transition-colors duration-300">
            <FontAwesomeIcon
              icon={faExternalLinkAlt}
              className="text-slate-400 group-hover:text-emerald-400 h-3 w-3 transition-colors"
            />
          </div>
        </div>
        {league.strLeagueAlternate && (
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            {league.strLeagueAlternate}
          </p>
        )}
      </div>
    </div>
  );
};
