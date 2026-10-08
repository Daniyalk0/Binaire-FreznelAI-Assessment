class Movie {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.overview;
    this.posterPath = data.poster_path;
    this.backdropPath = data.backdrop_path;
    this.rating = data.vote_average || 0;
    this.releaseDate = data.release_date;
    this.genreIds = data.genre_ids || [];
  }

  get posterUrl() {
    return this.posterPath
      ? `https://image.tmdb.org/t/p/w500${this.posterPath}`
      : null;
  }

  get backdropUrl() {
    return this.backdropPath
      ? `https://image.tmdb.org/t/p/w1280${this.backdropPath}`
      : null;
  }
}

export default Movie;