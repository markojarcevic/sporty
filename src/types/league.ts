export interface League {
  idLeague: string;
  strLeague: string;
  strSport: string;
  strLeagueAlternate?: string;
}

export interface LeagueDetail {
  idLeague: string;
  strLeague: string;
  strSport: string;
  strLeagueAlternate?: string;
  strBadge?: string;
  strLogo?: string;
  strDescription?: string;
  intFormedYear?: string;
  strCountry?: string;
}

export interface LeaguesResponse {
  leagues: League[];
}

export interface LeagueDetailResponse {
  leagues: LeagueDetail[];
}