import React, { useEffect, useState } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

const API_URL = "https://www.omdbapi.com?apikey=ce141b91";

const App = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        searchMovies("Batman");
    }, [])

    useEffect(() => {
        searchMovies("Batman", currentPage);
    }, [currentPage]);

    const searchMovies = async (title, page) => {
        const response = await fetch(`${API_URL}&s=${title}&page=${page}`);
        const data = await response.json();

        setMovies(data.Search);
        setTotalPages(Math.ceil(data.totalResults / 10));
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div className="app">
            <h1>CineSearch</h1>

            <div className="search">
                <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for movies"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            searchMovies(searchTerm, currentPage);
                        }
                    }}
                />
                <img
                    src={SearchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm, currentPage)}
                />
            </div>

            {movies?.length > 0 ? (
                <>
                    <div className="container">
                        {movies.map((movie) => (
                            <MovieCard key={movie.imdbID} movie={movie} />
                        ))}
                    </div>
                    <div className="pagination">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => handlePageChange(index + 1)}
                                className={currentPage === index + 1 ? 'active' : ''}
                            >
                                {index + 1}
                            </button>
                        ))}
                        {movies.length > currentPage * 10 && (
                            <button onClick={() => handlePageChange(currentPage + 1)}>
                                More
                            </button>
                        )}
                    </div>
                </>
            ) : (
                <div className="empty">
                    <h2>No movies found</h2>
                </div>
            )}
        </div>
    );
};

export default App;