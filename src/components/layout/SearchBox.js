import React from 'react';
import './SearchBox.css';

const SearchBox = ({ searchQuery, isLoading, setSearchQuery, handleSearch, handleKeyPress, mainInputRef }) => {
  return (
    <div className="bottom-search-container">
      <form onSubmit={handleSearch} className="bottom-search-form">
        <input
          type="text"
          ref={mainInputRef}
          placeholder="궁금한 사항을 물어보세요"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="bottom-search-input"
          disabled={isLoading}
        />
        <button 
          type="submit" 
          className="bottom-search-btn" 
          disabled={isLoading || !searchQuery.trim()}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        </button>
      </form>
    </div>
  );
};

export default SearchBox;