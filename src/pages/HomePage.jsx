import { useEffect, useState } from "react";
import TmdbApi from "../api/TmdbApi";
import Movie from "../models/Movie";
import MovieCard from "../models/MovieCard";

const tmdbApi = new TmdbApi();

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeSection, setActiveSection] = useState("popular");

  useEffect(() => {
    let active = true;

    async function loadMovies() {
      try {
        setLoading(true);
        setError("");

        let data;

        if (activeSection === "trending") {
          data = await tmdbApi.getTrending(currentPage);
        } else if (activeSection === "new-releases") {
          data = await tmdbApi.getNowPlaying(currentPage);
        } else {
          data = await tmdbApi.getPopular(currentPage);
        }

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
  }, [activeSection, currentPage]);

  const featuredMovie = movies[0];
  const featuredSecondary = movies.slice(1, 4);

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

  function changeSection(section) {
    setActiveSection(section);
    setCurrentPage(1);
  }

  return (
    <main className="page-enter mx-auto max-w-[940px] px-4 py-6 sm:py-8">
      <section className="mb-8">
        <div className="mb-3 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-white sm:text-xl">
            Featured & Recommended
          </h1>

          <span className="text-xs text-white/40">Popular now</span>
        </div>

        {!loading && !error && featuredMovie && (
          <div className="grid overflow-hidden bg-[#162536] md:grid-cols-[1.65fr_1fr]">
            <div className="relative min-h-[300px] sm:min-h-[360px]">
              {featuredMovie.backdropUrl && (
                <img
                  src={featuredMovie.backdropUrl}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-[#162536] via-[#162536]/45 to-transparent md:bg-gradient-to-r md:from-transparent md:via-[#162536]/20 md:to-[#162536]" />

              <div className="relative flex h-full items-end p-5 sm:p-7">
                <div className="max-w-lg">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#66c0f4]">
                    Featured
                  </p>

                  <h2 className="text-2xl font-bold text-white sm:text-3xl">
                    {featuredMovie.title}
                  </h2>

                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-white/75">
                    {featuredMovie.description}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      className="min-h-10 rounded-sm bg-[#66c0f4] px-5 text-sm font-semibold text-[#101820] transition hover:bg-white active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#66c0f4]"
                    >
                      View Details
                    </button>

                    <span className="text-sm text-white/60">
                      ★ {featuredMovie.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden bg-[#1b2838] p-3 md:block">
              <div className="grid gap-2">
                {featuredSecondary.map((movie) => (
                  <article
                    key={movie.id}
                    className="grid grid-cols-[72px_1fr] gap-3 bg-[#162536] p-2 transition-colors hover:bg-[#243b52]"
                  >
                    <img
                      src={movie.posterUrl}
                      alt={`${movie.title} poster`}
                      className="h-20 w-[72px] object-cover"
                      loading="lazy"
                    />

                    <div className="min-w-0 py-1">
                      <h3 className="truncate text-sm font-medium text-white">
                        {movie.title}
                      </h3>

                      <p className="mt-1 text-xs text-white/45">
                        {movie.releaseDate?.slice(0, 4) || "Unknown"}
                      </p>

                      <p className="mt-2 text-xs text-white/60">
                        ★ {movie.rating.toFixed(1)}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="mb-8">
        <div className="mb-4 border-b border-white/10">
          <div className="flex items-center gap-1 overflow-x-auto">
            <button
              type="button"
              onClick={() => changeSection("popular")}
              className={`min-h-11 shrink-0 border-b-2 px-3 text-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#66c0f4] ${
                activeSection === "popular"
                  ? "border-[#66c0f4] text-white"
                  : "border-transparent text-white/50 hover:text-white"
              }`}
              aria-pressed={activeSection === "popular"}
            >
              Popular
            </button>

            <button
              type="button"
              onClick={() => changeSection("trending")}
              className={`min-h-11 shrink-0 border-b-2 px-3 text-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#66c0f4] ${
                activeSection === "trending"
                  ? "border-[#66c0f4] text-white"
                  : "border-transparent text-white/50 hover:text-white"
              }`}
              aria-pressed={activeSection === "trending"}
            >
              Trending
            </button>

            <button
              type="button"
              onClick={() => changeSection("new-releases")}
              className={`min-h-11 shrink-0 border-b-2 px-3 text-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#66c0f4] ${
                activeSection === "new-releases"
                  ? "border-[#66c0f4] text-white"
                  : "border-transparent text-white/50 hover:text-white"
              }`}
              aria-pressed={activeSection === "new-releases"}
            >
              New Releases
            </button>
          </div>
        </div>

        <div id="popular" className="scroll-mt-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">
  {activeSection === "trending"
    ? "Trending Movies"
    : activeSection === "new-releases"
      ? "New Releases"
      : "Popular Movies"}
</h2>

            <span className="text-xs text-white/40">Page {currentPage}</span>
          </div>

          {loading && (
            <p
              className="py-12 text-center text-sm text-white/60"
              role="status"
            >
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
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4">
                {movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>

              <nav
                className="mt-8 flex items-center justify-center gap-3 sm:gap-4"
                aria-label="Popular movie pagination"
              >
                <button
                  type="button"
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className="min-h-11 rounded-sm bg-[#162536] px-4 text-sm text-white transition hover:bg-[#2a475e] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#66c0f4] disabled:cursor-not-allowed disabled:opacity-40 sm:px-5"
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
                  className="min-h-11 rounded-sm bg-[#162536] px-4 text-sm text-white transition hover:bg-[#2a475e] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#66c0f4] disabled:cursor-not-allowed disabled:opacity-40 sm:px-5"
                >
                  Next
                </button>
              </nav>
            </>
          )}
        </div>
      </section>
    </main>
  );
}

export default HomePage;
