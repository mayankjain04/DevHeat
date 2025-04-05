import React, { useState, useEffect, useRef } from "react";
import PlaylistCard from "./PlaylistCard";
import config from "../../config";

function Playlist() {
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState('java');
    const [pageToken, setPageToken] = useState(null);
    const [nextPageToken, setNextPageToken] = useState(null);
    const [sortBy, setSortBy] = useState('relevance'); // Not used yet, for future
    const [language, setLanguage] = useState('en');
    const authToken = localStorage.getItem('authToken');
    const searchInputRef = useRef();

    if (!authToken) {
        return (
            <div className="bg-[#F7F7F7] text-[#1F2833] font-bold text-5xl px-20 py-28 w-full h-[100vh] flex justify-center items-center">
                Unauthorized. Log in first to access this page...
            </div>
        );
    }

    const fetchPlaylists = () => {
        setLoading(true);
        fetch(`${config.apiUrl}/api/learn/${query}/`, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${authToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                pageToken: pageToken,
                language: language,
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (!data || !data.results || data.results.length === 0) {
                    setError("No playlists found.");
                    setPlaylists([]);
                } else {
                    setPlaylists(data.results);
                    setNextPageToken(data.nextPageToken || null);
                    setError(null);
                }
                setLoading(false);
            })
            .catch(err => {
                setError("Failed to fetch learning resources.");
                console.error(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchPlaylists();
        }, 200); // Debounce to avoid double calls

        return () => clearTimeout(delayDebounce); // Clean up
    }, [query, pageToken, language]);

    const handleSearch = () => {
        const newQuery = searchInputRef.current.value.trim();
        if (newQuery && newQuery !== query) {
            setQuery(newQuery);
            setPageToken(null); // Reset pagination
        }
    };

    const handleNextPage = () => {
        if (nextPageToken) {
            setPageToken(nextPageToken);
        }
    };

    if (loading) {
        return (
            <div className="bg-[#F7F7F7] text-[#1F2833] font-bold text-5xl px-20 py-28 w-full h-[100vh] flex justify-center items-center">
                Loading resources...
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-[#F7F7F7] text-red-500 font-bold text-5xl px-20 py-28 w-full h-[100vh] flex justify-center items-center">
                <span className="text-3xl">{error}</span>
            </div>
        );
    }

    return (
        <div className="bg-[#F7F7F7] px-20 pt-28 pb-6 w-full min-h-screen">
            <h2 className="text-3xl font-bold text-[#1F2833] mb-4">Discover Free Playlists</h2>

            <div className="mb-6 flex items-center space-x-4">
                <input
                    type="text"
                    ref={searchInputRef}
                    placeholder="Search for playlists"
                    className="border border-gray-400 p-3 rounded-l-md w-full text-[#1F2833]"
                />
                <button
                    onClick={handleSearch}
                    className="bg-[#1F2833] hover:bg-[#4a5159] text-white px-5 py-3 rounded-md font-semibold"
                >
                    Search
                </button>

                <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="border border-gray-400 p-3 rounded-md text-[#1F2833] bg-white"
                >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                </select>
            </div>

            <p className="text-lg font-medium text-gray-600 mb-6">
                {query === 'java'
                    ? "Showing recommended playlists for 'java'."
                    : `Showing results for "${query}".`}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full">
                {playlists.map((playlist, index) => (
                    <PlaylistCard
                        key={index}
                        title={playlist.title}
                        thumbnail={playlist.thumbnail}
                        channelTitle={playlist.channelTitle}
                        publishedAt={playlist.publishedAt}
                        link={playlist.link}
                    />
                ))}
            </div>

            {nextPageToken && (
                <div className="flex justify-center mt-8">
                    <button
                        onClick={handleNextPage}
                        className="bg-[#1F2833] text-white px-6 py-3 rounded-md font-semibold"
                    >
                        Next Page
                    </button>
                </div>
            )}
        </div>
    );
}

export default Playlist;
