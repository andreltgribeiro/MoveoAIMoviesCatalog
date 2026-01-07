import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

function Header({ setSearchInput }) {
  return (
    <header class="sticky top-0 z-50 bg-gray-950 shadow-m">
      <nav class="container mx-auto px-4 py-3 flex justify-end items-center">
        <form class="relative">
          <input
            type="text"
            placeholder="Search..."
            class="relative h-10 pl-10 pr-2 rounded-sm bg-gray-950 w-64 border border-zinc-400 text-zinc-50"
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <MagnifyingGlassIcon className="size-6 absolute inset-y-0 my-auto left-3 text-zinc-50 pointer-events-none " />
        </form>
      </nav>
    </header>
  );
}

export default Header;
