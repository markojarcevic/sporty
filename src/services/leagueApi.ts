import type { LeaguesResponse, LeagueDetailResponse } from '../types/league';

const BASE_URL = 'https://www.thesportsdb.com/api/v1/json/3';

export const leagueApi = {
  async getAllLeagues(): Promise<LeaguesResponse> {
    const response = await fetch(`${BASE_URL}/all_leagues.php`);
    if (!response.ok) {
      throw new Error(`Failed to fetch leagues: ${response.statusText}`);
    }
    return response.json();
  },

  async getLeagueDetails(leagueId: string): Promise<LeagueDetailResponse> {
    const response = await fetch(`${BASE_URL}/lookupleague.php?id=${leagueId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch league details: ${response.statusText}`);
    }
    return response.json();
  },
};