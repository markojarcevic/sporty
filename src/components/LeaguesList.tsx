import { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useLeagues } from '../hooks/useLeagues';
import { LeagueCard } from './LeagueCard';
import { SportFilter } from './SportFilter';
import { LeagueModal } from './LeagueModal';
import type { League } from '../types/league';

export const LeaguesList = () => {
  const { data, isLoading, error } = useLeagues();
  const [selectedLeague, setSelectedLeague] = useState<League | null>(null);
  const [selectedSport, setSelectedSport] = useState('');

  const filteredLeagues = useMemo(() => {
    if (!data?.leagues) return [];

    return data.leagues.filter(
      (league) => selectedSport === '' || league.strSport === selectedSport
    );
  }, [data?.leagues, selectedSport]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <FontAwesomeIcon 
          icon={faSpinner} 
          className="animate-spin h-8 w-8 text-emerald-400" 
        />
        <span className="ml-3 text-slate-300 font-medium">Loading leagues...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <div className="text-red-400 mb-2 font-semibold">Error loading leagues</div>
        <div className="text-slate-400 text-sm">
          {error instanceof Error
            ? error.message
            : 'An unexpected error occurred'}
        </div>
      </div>
    );
  }

  if (!data?.leagues || data.leagues.length === 0) {
    return (
      <div className="text-center py-16 text-slate-300 font-medium">No leagues found</div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full">
      <SportFilter
        leagues={data.leagues}
        selectedSport={selectedSport}
        onSportChange={setSelectedSport}
      />

      <div className="mb-6 flex items-center justify-between">
        <div className="text-sm text-slate-400 font-medium">
          <span className="text-white font-semibold">{filteredLeagues.length}</span> of {data.leagues.length} leagues
          {selectedSport && <span className="text-emerald-400 ml-1">in {selectedSport}</span>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1 overflow-y-auto p-1 w-full">
        {filteredLeagues.map((league) => (
          <LeagueCard
            key={league.idLeague}
            league={league}
            onClick={() => setSelectedLeague(league)}
          />
        ))}
      </div>

      {selectedLeague && (
        <LeagueModal
          league={selectedLeague}
          onClose={() => setSelectedLeague(null)}
        />
      )}
    </div>
  );
};
