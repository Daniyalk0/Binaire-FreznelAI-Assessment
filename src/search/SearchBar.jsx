function SearchBar({ value, onChange, onSubmit }) {
  function handleSubmit(event) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-2 sm:flex-row"
      role="search"
    >
      <label htmlFor="movie-search" className="sr-only">
        Search movies
      </label>

      <input
        id="movie-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search movies..."
        className="min-h-11 flex-1 rounded-sm border border-[#2a475e] bg-[#101820] px-4 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-[#66c0f4] focus:ring-2 focus:ring-[#66c0f4]/30"
      />

      <button
        type="submit"
        className="min-h-11 rounded-sm bg-[#66c0f4] px-6 text-sm font-semibold text-[#101820] transition hover:bg-white active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#66c0f4]"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;