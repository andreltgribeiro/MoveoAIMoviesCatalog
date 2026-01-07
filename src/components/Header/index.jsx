import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

function Header({ setSearchInput, canSearch, loadingNumbers }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchAnyway, setSearchAnyway] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) setIsScrolled(true);
      else setIsScrolled(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-gray-950/50 shadow-m transition duration-300 ${
        isScrolled && "backdrop-blur-lg"
      }`}
    >
      <nav className="container mx-auto px-4 py-3 flex justify-center items-center">
        {!canSearch && !searchAnyway && (
          <div className="flex gap-4 text-zinc-50">
            <h2>
              Search will be available once all the movies are loaded.{" "}
              {loadingNumbers}
            </h2>
            <button
              className="underline cursor-pointer"
              onClick={() => setSearchAnyway(true)}
            >
              Search anyway
            </button>
          </div>
        )}
        {(canSearch || searchAnyway) && (
          <form className="relative">
            <input
              disabled
              type="text"
              placeholder="Search..."
              className="relative h-10 pl-10 pr-2 rounded-sm bg-gray-950/50 lg:w-130 border border-zinc-400 text-zinc-50"
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <MagnifyingGlassIcon className="size-6 absolute inset-y-0 my-auto left-3 text-zinc-50 pointer-events-none " />
          </form>
        )}
      </nav>
    </header>
  );
}

export default Header;
