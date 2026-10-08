import { useEffect, useState } from "react";
import TmdbApi from "../api/TmdbApi";
import Movie from "../models/Movie";
import MovieCard from "../models/MovieCard"
import SearchBar from "../search/SearchBar";
import FilterEngine from "../filters/FilterEngine";
import SortEngine from "../sorting/SortEngine";

const tmdbApi = new TmdbApi();
const filterEngine = new FilterEngine();
const sortEngine = new SortEngine();

function SearchPage() {
const [query, setQuery] = useState("");
const [submittedQuery, setSubmittedQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [minimumRating, setMinimumRating] = useState("");
  const [year, setYear] = useState("");
  const [sortBy, setSortBy] = useState("popularity");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadMovies() {
      try {
        setLoading(true);
        setError("");

 const data = submittedQuery.trim()
  ? await tmdbApi.searchMovies(submittedQuery, currentPage)
  : await tmdbApi.getPopular(currentPage);

        if (!active) return;

        setMovies(data.results.map((movie) => new Movie(movie)));
        setTotalPages(Math.min(data.total_pages || 1, 500));
      } catch {
        if (active) {
          setError("Unable to load movies.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadMovies();

    return () => {
      active = false;
    };
 }, [submittedQuery, currentPage]);

  function handleSearch() {
  setSubmittedQuery(query.trim());
  setCurrentPage(1);
}

  function handleFilterChange(setter, value) {
    setter(value);
    setCurrentPage(1);
  }

  const filteredMovies = filterEngine.filter(movies, {
    minimumRating,
    year,
  });

  const displayedMovies = sortEngine.sort(filteredMovies, sortBy);

  function goToPreviousPage() {
    if (currentPage > 1) {
      setCurrentPage((page) => page - 1);
    }
  }

  function goToNextPage() {
    if (currentPage < totalPages) {
      setCurrentPage((page) => page + 1);
    }
  }

  return (
    <main className="page-enter mx-auto max-w-[940px] px-4 py-8">
      <header className="mb-8">
        <p className="text-xs uppercase tracking-wider text-[#66c0f4]">Store</p>

        <h1 className="mt-1 text-2xl font-semibold text-white sm:text-3xl">
          Top Sellers
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-white/60">
          Browse popular titles, search the catalogue, and refine the results.
        </p>
      </header>

      <section
        aria-labelledby="search-heading"
        className="mb-8 rounded-sm bg-[#162536] p-4 sm:p-5"
      >
        <h2 id="search-heading" className="sr-only">
          Search and filter movies
        </h2>

        <SearchBar value={query} onChange={setQuery} onSubmit={handleSearch} />

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <label className="text-sm text-white/70">
            Minimum rating
            <select
              value={minimumRating}
              onChange={(event) =>
                handleFilterChange(setMinimumRating, event.target.value)
              }
              className="mt-1.5 min-h-11 w-full rounded-sm border border-[#2a475e] bg-[#101820] px-3 text-sm text-white outline-none focus:border-[#66c0f4] focus:ring-2 focus:ring-[#66c0f4]/30"
            >
              <option value="">Any rating</option>
              <option value="8">8+</option>
              <option value="7">7+</option>
              <option value="6">6+</option>
            </select>
          </label>

          <label className="text-sm text-white/70">
            Release year
            <input
              type="number"
              inputMode="numeric"
              min="1900"
              max="2100"
              value={year}
              onChange={(event) =>
                handleFilterChange(setYear, event.target.value)
              }
              placeholder="e.g. 2025"
              className="mt-1.5 min-h-11 w-full rounded-sm border border-[#2a475e] bg-[#101820] px-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#66c0f4] focus:ring-2 focus:ring-[#66c0f4]/30"
            />
          </label>

          <label className="text-sm text-white/70">
            Sort by
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="mt-1.5 min-h-11 w-full rounded-sm border border-[#2a475e] bg-[#101820] px-3 text-sm text-white outline-none focus:border-[#66c0f4] focus:ring-2 focus:ring-[#66c0f4]/30"
            >
              <option value="popularity">Popularity</option>
              <option value="rating">Rating</option>
              <option value="releaseDate">Release date</option>
              <option value="title">Title</option>
            </select>
          </label>
          <div className="flex justify-end sm:col-span-3">
            <button
              type="button"
              onClick={() => {
                setMinimumRating("");
                setYear("");
                setSortBy("popularity");
                setCurrentPage(1);
              }}
              className="min-h-11 rounded-sm px-3 text-sm text-white/60 transition hover:text-white active:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#66c0f4]"
            >
              Clear filters
            </button>
          </div>
        </div>
      </section>

      {loading && (
        <p className="py-12 text-center text-sm text-white/60" role="status">
          Loading movies...
        </p>
      )}

      {error && (
        <p className="py-12 text-center text-sm text-red-400" role="alert">
          {error}
        </p>
      )}

      {!loading && !error && (
        <>
          <section aria-labelledby="results-heading">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
              <h2
  id="results-heading"
  className="text-xl font-semibold text-white"
>
  {submittedQuery
    ? `Results for "${submittedQuery}"`
    : "Popular titles"}
</h2>
                <p className="mt-1 text-xs text-white/50">
                  {displayedMovies.length} titles on this page
                </p>
              </div>
            </div>

            {displayedMovies.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4">
                {displayedMovies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            ) : (
              <p className="py-12 text-center text-sm text-white/60">
                No movies match your filters.
              </p>
            )}
          </section>

          <nav
            className="mt-8 flex items-center justify-center gap-3 sm:gap-4"
            aria-label="Search results pagination"
          >
            <button
              type="button"
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="min-h-11 rounded-sm bg-[#1b2838] px-4 text-sm text-white transition hover:bg-[#2a475e] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#66c0f4] disabled:cursor-not-allowed disabled:opacity-40 sm:px-5"
            >
              Previous
            </button>

            <span
              className="min-w-16 text-center text-sm text-white/60"
              aria-live="polite"
            >
              {currentPage} / {totalPages}
            </span>

            <button
              type="button"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="min-h-11 rounded-sm bg-[#1b2838] px-4 text-sm text-white transition hover:bg-[#2a475e] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#66c0f4] disabled:cursor-not-allowed disabled:opacity-40 sm:px-5"
            >
              Next
            </button>
          </nav>
        </>
      )}
    </main>
  );
}

export default SearchPage;
