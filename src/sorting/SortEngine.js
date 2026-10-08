class SortEngine {
  sort(movies, sortBy = "popularity") {
    const result = [...movies];

    switch (sortBy) {
      case "rating":
        return result.sort((a, b) => b.rating - a.rating);

      case "releaseDate":
        return result.sort((a, b) =>
          (b.releaseDate || "").localeCompare(a.releaseDate || ""),
        );

      case "title":
        return result.sort((a, b) =>
          a.title.localeCompare(b.title),
        );

      case "popularity":
      default:
        return result;
    }
  }
}

export default SortEngine;