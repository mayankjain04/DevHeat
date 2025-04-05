import React, { useState, useEffect } from "react";
import JobCard from "./JobCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Brain, Search } from "lucide-react";

import config from "../../config";


function JobRecommendation() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

    const [sortBy, setSortBy] = useState("relevance");
    const [location, setLocation] = useState("");
    const [what, setWhat] = useState("");
    const [page, setPage] = useState(1);
    const [searchParams, setSearchParams] = useState({
        what: "",
        sortBy: "relevance",
        where: "",
    });

    if (!authToken) {
        return (
            <div className="bg-[#F7F7F7] text-[#1F2833] font-bold text-5xl px-20 py-28 w-full h-[100vh] flex justify-center items-center">
                Unauthorized. Log in first to access this page...
            </div>
        );
    }

    const fetchJobs = () => {
        setLoading(true);
        fetch(`${config.apiUrl}/api/jobs/`, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${authToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sort_by: searchParams.sortBy,
                what: searchParams.what || undefined,
                where: searchParams.where,
                page: page
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.jobs.length === 0) {
                    setError("No jobs found for the specified criteria.");
                    setJobs([]);
                } else {
                    setJobs(data.jobs);
                    setError(null);
                }
                setLoading(false);
            })
            .catch(err => {
                setError("Failed to fetch jobs");
                setLoading(false);
            });
    };

    // Fetch when either page or searchParams change
    useEffect(() => {
        fetchJobs();
    }, [page, searchParams]);

    const handleSearchClick = () => {
        setSearchParams({
            what: what.trim(),
            sortBy: sortBy,
            where: location
        });
        setPage(1);
    };

    const handleNextPage = () => {
        setPage(prevPage => prevPage + 1);
        window.scrollTo(0, 0);
    };

    const handlePrevPage = () => {
        setPage(prevPage => prevPage - 1);
        window.scrollTo(0, 0);
    };

    if (loading) {
        return (
            <div className="bg-[#F7F7F7] text-[#1F2833] font-bold text-5xl px-20 py-28 w-full h-[100vh] flex justify-center items-center">
                Loading jobs...
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-[#F7F7F7] text-red-500 font-bold text-5xl px-20 py-28 w-full h-[100vh] flex justify-center items-center">
                <span className="text-xl text-slate-900 w-max text-center">An error occured</span>
                <span className="text-sm text-slate-600 w-max text-center">{error}</span>
            </div>
        );
    }

    return (
        <div className="bg-[#F7F7F7] px-20 pt-28 pb-6 w-full h-min-[70%]">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-[#1F2833]">Job Matches</h2>
                <div className="text-[#1F2833] font-medium">
                    <p>
                        Page {page} - {searchParams.what ? `Showing search results for "${searchParams.what}"` : `Showing AI recommended jobs`}.
                    </p>
                </div>
            </div>

            <div className="mb-6 flex gap-4">
                <input
                    type="text"
                    placeholder="Job Title (e.g., Developer)"
                    value={what}
                    onChange={(e) => setWhat(e.target.value)}
                    className="p-2 border rounded text-[#1F2833]"
                />
                <input
                    type="text"
                    placeholder="Location (e.g., Remote)"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="p-2 border rounded text-[#1F2833]"
                />
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="p-2 border rounded text-[#1F2833]"
                >
                    <option value="relevance">Relevance</option>
                    <option value="date">Date</option>
                    <option value="salary">Salary</option>
                </select>
                <button onClick={handleSearchClick} className="py-2 pr-4 pl-3 font-semibold bg-[#18BED4] text-white hover:bg-[#15a8bc] hover:scale-[1.02] transition-all duration-200 rounded-lg flex">
                    <Search className="mr-2 w-7" />
                    Search
                </button>
            </div>

            <div className="grid grid-cols-2 gap-7 w-full">
                {jobs.map(job => (
                    <a href={job.redirect_url} target="_blank" rel="noopener noreferrer" key={job.id}>
                        <JobCard
                            title={job.title}
                            location={job.location?.area ? job.location.area.join(", ") : "N/A"}
                            salaryMin={job.salary_min}
                            salaryMax={job.salary_max}
                            company={job.company?.display_name || "Unknown"}
                            jobdesc={job.description.length > 200 ? `${job.description.substring(0, 197)}...` : job.description}
                        />
                    </a>
                ))}
            </div>

            <div className="flex items-center justify-center mt-7 gap-4">
                {page > 1 && (
                    <button onClick={handlePrevPage} className="text-[#1F2833] font-semibold text-lg">
                        <FontAwesomeIcon icon={faChevronLeft} className="mr-2" />
                        Previous Page
                    </button>
                )}
                <button onClick={handleNextPage} className="text-[#1F2833] font-semibold text-lg">
                    <span className="mr-2">Next Page</span>
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>
        </div>
    );
}

export default JobRecommendation;
