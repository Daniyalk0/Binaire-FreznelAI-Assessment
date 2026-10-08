import { useEffect, useState } from "react";
import TmdbApi from "../api/TmdbApi";
import Movie from "../models/Movie";
import MovieCard from "../Models/MovieCard";

const tmdbApi = new TmdbApi();

function CategoryPage() {
  const [movies, setMovies] = useState([]);
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

        const data = await tmdbApi.discoverMovies(currentPage);

        if (!active) return;

        setMovies(data.results.map((movie) => new Movie(movie)));
        setTotalPages(Math.min(data.total_pages || 1, 500));
      } catch {
        if (active) {
          setError("Unable to load category movies.");
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
  }, [currentPage]);

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
      <section
        id="exploration"
        className="mb-8 scroll-mt-6"
        aria-labelledby="category-title"
      >
        <p className="text-xs uppercase tracking-wider text-[#66c0f4]">
          Category
        </p>

        <h1
          id="category-title"
          className="mt-1 text-2xl font-semibold text-white sm:text-3xl"
        >
          Exploration & Open World
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-white/60">
          Explore adventure-focused movies selected from the TMDB catalogue.
        </p>
      </section>

      {!loading && !error && movies.length > 0 && (
        <section className="mb-8 overflow-hidden bg-[#162536]">
          <div className="relative min-h-[260px] sm:min-h-[320px]">
            {movies[0].backdropUrl && (
              <img
                src={movies[0].backdropUrl}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}

            <div className="absolute inset-0 bg-gradient-to-r from-[#162536] via-[#162536]/75 to-[#162536]/20" />

            <div className="relative flex min-h-[260px] items-end p-5 sm:min-h-[320px] sm:p-8">
              <div className="max-w-lg">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#66c0f4]">
                  Featured Adventure
                </p>

                <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                  {movies[0].title}
                </h2>

                <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/70">
                  {movies[0].description}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {loading && (
        <p className="py-12 text-center text-sm text-white/60" role="status">
          Loading category...
        </p>
      )}

      {error && (
        <p className="py-12 text-center text-sm text-red-400" role="alert">
          {error}
        </p>
      )}

      {!loading && !error && (
        <>
          <section aria-labelledby="category-results">
            <div className="mb-5 flex items-center justify-between gap-4">
              <h2
                id="category-results"
                className="text-xl font-semibold text-white"
              >
                Adventure Collection
              </h2>

              <span className="text-xs text-white/50">
                {movies.length} titles
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </section>

          <nav
            className="mt-8 flex items-center justify-center gap-3 sm:gap-4"
            aria-label="Category pagination"
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

export default CategoryPage;