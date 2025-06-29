import React from 'react';
import { useLeagueDetails } from '../hooks/useLeagues';
import type { League } from '../types/league';

interface LeagueModalProps {
  league: League;
  onClose: () => void;
}

export const LeagueModal = ({ league, onClose }: LeagueModalProps) => {
  const { data, isLoading, error } = useLeagueDetails(league.idLeague);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-900">{league.strLeague}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded text-2xl font-bold p-1"
              aria-label="Close modal"
            >
              ×
            </button>
          </div>

          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span className="ml-2 text-gray-600">Loading details...</span>
            </div>
          )}

          {error && (
            <div className="text-center py-8">
              <div className="text-red-600 mb-2">Error loading league details</div>
              <div className="text-gray-500 text-sm">
                {error instanceof Error ? error.message : 'An unexpected error occurred'}
              </div>
            </div>
          )}

          {data?.leagues?.[0] && (
            <div className="space-y-4">
              {data.leagues[0].strBadge && (
                <div className="text-center">
                  <img
                    src={data.leagues[0].strBadge}
                    alt={`${league.strLeague} badge`}
                    className="mx-auto max-w-32 max-h-32 object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}

              {data.leagues[0].strLogo && !data.leagues[0].strBadge && (
                <div className="text-center">
                  <img
                    src={data.leagues[0].strLogo}
                    alt={`${league.strLeague} logo`}
                    className="mx-auto max-w-32 max-h-32 object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-1">Sport</h3>
                  <p className="text-gray-600">{data.leagues[0].strSport}</p>
                </div>

                {data.leagues[0].strCountry && (
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-1">Country</h3>
                    <p className="text-gray-600">{data.leagues[0].strCountry}</p>
                  </div>
                )}

                {data.leagues[0].intFormedYear && (
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-1">Founded</h3>
                    <p className="text-gray-600">{data.leagues[0].intFormedYear}</p>
                  </div>
                )}

                {data.leagues[0].strLeagueAlternate && (
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-1">Also known as</h3>
                    <p className="text-gray-600">{data.leagues[0].strLeagueAlternate}</p>
                  </div>
                )}
              </div>

              {data.leagues[0].strDescription && (
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Description</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {data.leagues[0].strDescription}
                  </p>
                </div>
              )}

              {!data.leagues[0].strBadge && !data.leagues[0].strLogo && (
                <div className="text-center py-4 text-gray-500 text-sm">
                  No badge or logo available for this league
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};