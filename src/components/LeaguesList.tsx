import { useState, useMemo } from 'react';
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
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading leagues...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-2">Error loading leagues</div>
        <div className="text-gray-500 text-sm">
          {error instanceof Error
            ? error.message
            : 'An unexpected error occurred'}
        </div>
      </div>
    );
  }

  if (!data?.leagues || data.leagues.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">No leagues found</div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <SportFilter
        leagues={data.leagues}
        selectedSport={selectedSport}
        onSportChange={setSelectedSport}
      />

      <div className="mb-4 text-sm text-gray-600">
        Showing {filteredLeagues.length} of {data.leagues.length} leagues
        {selectedSport && ` for ${selectedSport}`}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1 overflow-y-auto p-1">
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
