import { useMemo } from 'react';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faCheck } from '@fortawesome/free-solid-svg-icons';
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

  const displayValue = selectedSport || 'All Sports';

  return (
    <div className="mb-8">
      <label className="block text-sm font-semibold text-slate-300 mb-3">
        Filter by Sport
      </label>
      <Listbox value={selectedSport} onChange={onSportChange}>
        <ListboxButton className="relative w-full max-w-sm cursor-default rounded-xl bg-slate-800/70 backdrop-blur-sm py-3 pl-4 pr-10 text-left shadow-sm ring-1 ring-inset ring-slate-700/60 hover:bg-slate-700/90 hover:ring-slate-600/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50 transition-all duration-200 sm:text-sm">
          <span className="block truncate font-medium text-slate-200">{displayValue}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <FontAwesomeIcon icon={faChevronDown} className="h-4 w-4 text-slate-400" />
          </span>
        </ListboxButton>

        <ListboxOptions className="absolute z-20 mt-2 max-h-60 w-full max-w-sm overflow-auto rounded-xl bg-slate-800/95 backdrop-blur-md py-2 text-base shadow-xl ring-1 ring-slate-700/60 focus-visible:outline-none sm:text-sm border border-slate-700/60">
          <ListboxOption
            key="all"
            value=""
            className="group relative cursor-default select-none py-3 pl-4 pr-9 text-slate-200 data-[focus]:bg-gradient-to-r data-[focus]:from-emerald-500/20 data-[focus]:to-teal-500/20 data-[focus]:text-white transition-colors"
          >
            <span className="block truncate font-normal group-data-[selected]:font-semibold">
              All Sports
            </span>
            {selectedSport === '' && (
              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-emerald-400">
                <FontAwesomeIcon icon={faCheck} className="h-4 w-4" />
              </span>
            )}
          </ListboxOption>
          {sports.map((sport) => (
            <ListboxOption
              key={sport}
              value={sport}
              className="group relative cursor-default select-none py-3 pl-4 pr-9 text-slate-200 data-[focus]:bg-gradient-to-r data-[focus]:from-emerald-500/20 data-[focus]:to-teal-500/20 data-[focus]:text-white transition-colors"
            >
              <span className="block truncate font-normal group-data-[selected]:font-semibold">
                {sport}
              </span>
              {selectedSport === sport && (
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-emerald-400">
                  <FontAwesomeIcon icon={faCheck} className="h-4 w-4" />
                </span>
              )}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
};