import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  const [search, setSearch] = useState("");

  const updateSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div
      className={`text-black w-full space-y-2 rounded-xl border border-gray-400 lg:max-w-[350px]`}
    >
      <div className="flex items-center px-2">
        <input
          type="text"
          className="block w-full rounded-lg bg-transparent p-2 text-sm placeholder-gray-400 focus:outline-none"
          placeholder="Search assets"
          onChange={updateSearch}
          value={search}
        />
        <div className="">
          <motion.button
            // onClick={handleSetMaxBorrow}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-lg p-2"
          >
            <FaSearch />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
