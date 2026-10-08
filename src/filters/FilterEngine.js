class FilterEngine {
  filterByRating(movies, minimumRating) {
    if (!minimumRating) {
      return movies;
    }

    return movies.filter(
      (movie) => movie.rating >= Number(minimumRating),
    );
  }

  filterByYear(movies, year) {
    if (!year) {
      return movies;
    }

    return movies.filter((movie) =>
      movie.releaseDate?.startsWith(String(year)),
    );
  }

  filter(movies, filters = {}) {
    let result = movies;

    result = this.filterByRating(
      result,
      filters.minimumRating,
    );

    result = this.filterByYear(
      result,
      filters.year,
    );

    return result;
  }
}

export default FilterEngine;