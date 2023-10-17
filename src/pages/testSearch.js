import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const searchMovies = async () => {
      setIsLoading(true);

      // Create a query that filters movies based on search criteria
      const q = query(
        collection(db, 'Movies'),
        where('MovieName', '>=', searchTerm),
        where('MovieName', '<=', searchTerm + '\uf8ff') // This handles case-insensitive search
      );

      try {
        const querySnapshot = await getDocs(q);
        const results = querySnapshot.docs.map((doc) => doc.data());
        setSearchResults(results);
        setIsLoading(false);
      } catch (error) {
        console.error('Error searching movies:', error);
        setIsLoading(false);
      }
    };

    if (searchTerm.length > 0) {
      searchMovies();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search for movies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {isLoading ? <p>Loading...</p> : null}
      <ul>
        {searchResults.map((movie) => (
          <li key={movie.id}>{movie.MovieName}</li>
        ))}
      </ul>
    </div>
  );
};

export default Search;