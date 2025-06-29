import { useQuery } from '@tanstack/react-query';
import { leagueApi } from '../services/leagueApi';

export const useLeagues = () => {
  return useQuery({
    queryKey: ['leagues'],
    queryFn: leagueApi.getAllLeagues,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useLeagueDetails = (leagueId: string | null) => {
  return useQuery({
    queryKey: ['league-details', leagueId],
    queryFn: () => leagueApi.getLeagueDetails(leagueId!),
    enabled: !!leagueId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};