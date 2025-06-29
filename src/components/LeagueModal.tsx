import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useLeagueDetails } from '../hooks/useLeagues';
import type { League } from '../types/league';

interface LeagueModalProps {
  league: League;
  onClose: () => void;
}

export const LeagueModal = ({ league, onClose }: LeagueModalProps) => {
  const { data, isLoading, error } = useLeagueDetails(league.idLeague);

  return (
    <Dialog open={true} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="bg-slate-800/95 backdrop-blur-md rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-700/60">
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <DialogTitle className="text-2xl font-semibold text-white tracking-tight">
                {league.strLeague}
              </DialogTitle>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-800 rounded-xl p-2 transition-all duration-200"
                aria-label="Close modal"
              >
                <FontAwesomeIcon icon={faTimes} className="h-5 w-5" />
              </button>
            </div>

          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <FontAwesomeIcon 
                icon={faSpinner} 
                className="animate-spin h-6 w-6 text-emerald-400" 
              />
              <span className="ml-3 text-slate-200 font-medium">Loading details...</span>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <div className="text-red-400 mb-2 font-semibold">Error loading league details</div>
              <div className="text-slate-400 text-sm">
                {error instanceof Error ? error.message : 'An unexpected error occurred'}
              </div>
            </div>
          )}

          {data?.leagues?.[0] && (
            <div className="space-y-6">
              {data.leagues[0].strBadge && (
                <div className="text-center bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-2xl p-6 border border-emerald-500/20">
                  <img
                    src={data.leagues[0].strBadge}
                    alt={`${league.strLeague} badge`}
                    className="mx-auto max-w-32 max-h-32 object-contain drop-shadow-lg"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}

              {data.leagues[0].strLogo && !data.leagues[0].strBadge && (
                <div className="text-center bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-2xl p-6 border border-emerald-500/20">
                  <img
                    src={data.leagues[0].strLogo}
                    alt={`${league.strLeague} logo`}
                    className="mx-auto max-w-32 max-h-32 object-contain drop-shadow-lg"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-700/50 rounded-xl p-4 border border-slate-600/30">
                  <h3 className="font-semibold text-slate-300 mb-2 text-sm uppercase tracking-wide">Sport</h3>
                  <p className="text-white font-medium">{data.leagues[0].strSport}</p>
                </div>

                {data.leagues[0].strCountry && (
                  <div className="bg-slate-700/50 rounded-xl p-4 border border-slate-600/30">
                    <h3 className="font-semibold text-slate-300 mb-2 text-sm uppercase tracking-wide">Country</h3>
                    <p className="text-white font-medium">{data.leagues[0].strCountry}</p>
                  </div>
                )}

                {data.leagues[0].intFormedYear && (
                  <div className="bg-slate-700/50 rounded-xl p-4 border border-slate-600/30">
                    <h3 className="font-semibold text-slate-300 mb-2 text-sm uppercase tracking-wide">Founded</h3>
                    <p className="text-white font-medium">{data.leagues[0].intFormedYear}</p>
                  </div>
                )}

                {data.leagues[0].strLeagueAlternate && (
                  <div className="bg-slate-700/50 rounded-xl p-4 border border-slate-600/30">
                    <h3 className="font-semibold text-slate-300 mb-2 text-sm uppercase tracking-wide">Also known as</h3>
                    <p className="text-white font-medium">{data.leagues[0].strLeagueAlternate}</p>
                  </div>
                )}
              </div>

              {data.leagues[0].strDescription && (
                <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-xl p-6 border border-emerald-500/20">
                  <h3 className="font-semibold text-slate-300 mb-3 text-sm uppercase tracking-wide">Description</h3>
                  <p className="text-slate-200 text-sm leading-relaxed">
                    {data.leagues[0].strDescription}
                  </p>
                </div>
              )}

              {!data.leagues[0].strBadge && !data.leagues[0].strLogo && (
                <div className="text-center py-8 text-slate-400 text-sm bg-slate-700/30 rounded-xl border border-slate-600/30">
                  No badge or logo available for this league
                </div>
              )}
            </div>
          )}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};