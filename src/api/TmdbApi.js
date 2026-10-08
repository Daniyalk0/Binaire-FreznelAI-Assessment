import CacheManager from "../offline/CacheManager";
import ApiClient from "./ApiClient";
// import CacheManager from "../offline/CacheManager";

class TmdbApi {
  constructor() {
    this.client = new ApiClient("https://api.themoviedb.org/3/");
    this.cache = new CacheManager("tmdb");
    this.apiKey = import.meta.env.VITE_TMDB_API_KEY;
  }

  async getPopular(page = 1) {
    const cacheKey = `popular:${page}`;

    try {
      const data = await this.client.get("movie/popular", {
        api_key: this.apiKey,
        language: "en-US",
        page,
      });

      this.cache.save(cacheKey, data);

      return data;
    } catch (error) {
      const cached = this.cache.get(cacheKey);

      if (cached) {
        return cached;
      }

      throw error;
    }
  }

  async getTrending(page = 1) {
    const cacheKey = `trending:${page}`;

    try {
      const data = await this.client.get("trending/movie/week", {
        api_key: this.apiKey,
        page,
      });

      this.cache.save(cacheKey, data);

      return data;
    } catch (error) {
      const cached = this.cache.get(cacheKey);

      if (cached) {
        return cached;
      }

      throw error;
    }
  }

  async getTopRated(page = 1) {
    const cacheKey = `top-rated:${page}`;

    try {
      const data = await this.client.get("movie/top_rated", {
        api_key: this.apiKey,
        language: "en-US",
        page,
      });

      this.cache.save(cacheKey, data);

      return data;
    } catch (error) {
      const cached = this.cache.get(cacheKey);

      if (cached) {
        return cached;
      }

      throw error;
    }
  }

  async searchMovies(query, page = 1) {
    const cacheKey = `search:${query}:${page}`;

    try {
      const data = await this.client.get("search/movie", {
        api_key: this.apiKey,
        language: "en-US",
        query,
        page,
      });

      this.cache.save(cacheKey, data);

      return data;
    } catch (error) {
      const cached = this.cache.get(cacheKey);

      if (cached) {
        return cached;
      }

      throw error;
    }
  }

  async discoverMovies(page = 1) {
    const cacheKey = `discover:${page}`;

    try {
      const data = await this.client.get("discover/movie", {
        api_key: this.apiKey,
        language: "en-US",
        sort_by: "popularity.desc",
        with_genres: 12,
        page,
      });

      this.cache.save(cacheKey, data);
      return data;
    } catch (error) {
      const cached = this.cache.get(cacheKey);

      if (cached) return cached;

      throw error;
    }
  }

  async getNowPlaying(page = 1) {
  const cacheKey = `now-playing:${page}`;

  try {
    const data = await this.client.get("movie/now_playing", {
      api_key: this.apiKey,
      language: "en-US",
      page,
    });

    this.cache.save(cacheKey, data);
    return data;
  } catch (error) {
    const cached = this.cache.get(cacheKey);

    if (cached) return cached;

    throw error;
  }
}
}

export default TmdbApi;
