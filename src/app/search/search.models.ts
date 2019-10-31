export interface Film {
  original_title: string;
  overview: string;
  poster_path: string;
  title: string;
  vote_average: number;
}

export interface APIReponse {
  page: number;
  total_result: number;
  total_pages: number;
  results: Film[];
}
