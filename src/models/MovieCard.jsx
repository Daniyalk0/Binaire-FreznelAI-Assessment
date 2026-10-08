// import useLazyImage from "../../hooks/useLazyImage";

import useLazyImage from "../hooks/useLazyImage";

function MovieCard({ movie }) {
  const { imageRef, imageSrc } = useLazyImage(movie.posterUrl);

  return (
    <article 
    style={{ animationDelay: `${(movie.id % 8) * 40}ms` }}
    className="card-enter group overflow-hidden rounded-sm bg-[#1b2838] transition-transform duration-300 hover:-translate-y-1">
      <div
        ref={imageRef}
        className="aspect-[2/3] overflow-hidden bg-[#101820]"
      >
        {imageSrc && (
         <img
  src={imageSrc}
  alt={`${movie.title} poster`}
  loading="lazy"
  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
/>
        )}
      </div>

      <div className="p-3">
        <h2 className="truncate text-sm font-semibold text-white">
          {movie.title}
        </h2>

        <div className="mt-2 flex items-center justify-between text-xs text-white/60">
          <span>
            {movie.releaseDate?.slice(0, 4) || "Unknown"}
          </span>

          <span aria-label={`Rating ${movie.rating.toFixed(1)} out of 10`}>
            ★ {movie.rating.toFixed(1)}
          </span>
        </div>
      </div>
    </article>
  );
}

export default MovieCard;