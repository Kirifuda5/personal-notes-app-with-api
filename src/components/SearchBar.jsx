import React from "react";
import PropTypes from "prop-types";
import { FiSearch } from "react-icons/fi";
import { useLocale } from "../contexts/LocaleContext.jsx";

export default function SearchBar({ keyword, keywordChange }) {
  const { locale } = useLocale();
  const placeholder =
    locale === "id"
      ? "Cari catatan berdasarkan judul..."
      : "Search notes by title...";

  return (
    <div className="search">
      <FiSearch className="search__icon" aria-hidden />
      <input
        id="search-input"
        type="text"
        placeholder={placeholder}
        value={keyword}
        onChange={(e) => keywordChange(e.target.value)}
      />
    </div>
  );
}

SearchBar.propTypes = {
  keyword: PropTypes.string.isRequired,
  keywordChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};
