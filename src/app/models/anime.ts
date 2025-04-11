export interface AnimeResponse {
  data: Anime[];
  pagination: Pagination;
}

export interface Anime {
    mal_id: number;
    title: string;
    images: {
      jpg: {
        image_url: string;
        small_image_url: string;
        large_image_url: string;
      };
      webp: {
        image_url: string;
        small_image_url: string;
        large_image_url: string;
      };
    };
    synopsis: string;
    rating: string;
    genres: string[];
    popularity: number;
    members: number;
    pagination: {
        last_visible_page: number;
      }
  }
  
  export interface Pagination {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
    items: {
      count: number;
      total: number;
      per_page: number;
    };
  }