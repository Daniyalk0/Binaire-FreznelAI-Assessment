class SearchEngine {
  search(movies, query) {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return movies;
    }

    return movies.filter((movie) =>
      movie.title.toLowerCase().includes(normalizedQuery),
    );
  }
}

export default SearchEngine;