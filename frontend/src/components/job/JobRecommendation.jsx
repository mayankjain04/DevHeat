import React, { useState, useEffect } from "react";
import JobCard from "./JobCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Search } from "lucide-react";
import config from "../../config";

import { useContext } from 'react';
import { AuthContext } from '../../authcontext';

function JobRecommendation() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authToken } = useContext(AuthContext)

  const [sortBy, setSortBy] = useState("relevance");
  const [location, setLocation] = useState("");
  const [what, setWhat] = useState("");
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useState({
    what: "",
    sortBy: "relevance",
    where: "",
  });

  useEffect(() => {
    if (!authToken) return;

    const fetchJobs = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${config.apiUrl}/api/jobs/`, {
          method: "POST",
          headers: {
            Authorization: `Token ${authToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sort_by: searchParams.sortBy,
            what: searchParams.what || undefined,
            where: searchParams.where,
            page,
          }),
        });

        const data = await res.json();
        if (!data.jobs.length) {
          setError("No jobs found for the specified criteria.");
          setJobs([]);
        } else {
          setJobs(data.jobs);
          setError(null);
        }
      } catch (err) {
        setError("Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [page, searchParams, authToken]);

  const handleSearchClick = () => {
    setSearchParams({ what: what.trim(), sortBy, where: location });
    setPage(1);
  };

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
    window.scrollTo(0, 0);
  };

  const handlePrevPage = () => {
    setPage((prev) => prev - 1);
    window.scrollTo(0, 0);
  };

  if (!authToken) {
    return (
      <div className="bg-[#F7F7F7] text-[#1F2833] font-bold text-xl sm:text-3xl px-4 sm:px-6 py-28 w-full h-screen flex justify-center items-center text-center">
        Unauthorized. Log in first to access this page...
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-[#F7F7F7] text-[#1F2833] font-bold text-xl sm:text-3xl px-4 py-28 w-full h-screen flex justify-center items-center">
        Loading jobs...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#F7F7F7] text-red-500 px-4 py-28 w-full h-screen flex flex-col items-center justify-center text-center">
        <span className="text-xl font-bold text-slate-900">An error occurred</span>
        <span className="text-sm text-slate-600">{error}</span>
      </div>
    );
  }

  return (
    <div className="bg-[#F7F7F7] px-4 sm:px-6 lg:px-20 pt-28 pb-10 w-full min-h-screen">
      {/* Header & Status */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="text-xl sm:text-2xl font-bold text-[#1F2833]">Job Matches</h2>
        <p className="text-[#1F2833] font-medium text-sm sm:text-base">
          Page {page} -{" "}
          {searchParams.what
            ? `Showing search results for "${searchParams.what}"`
            : "Showing AI recommended jobs"}
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Job Title (e.g., Developer)"
          value={what}
          onChange={(e) => setWhat(e.target.value)}
          className="p-2 border rounded w-full md:w-auto text-[#1F2833]"
        />
        <input
          type="text"
          placeholder="Location (e.g., Remote)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="p-2 border rounded w-full md:w-auto text-[#1F2833]"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 border rounded w-full md:w-auto text-[#1F2833]"
        >
          <option value="relevance">Relevance</option>
          <option value="date">Date</option>
          <option value="salary">Salary</option>
        </select>
        <button
          onClick={handleSearchClick}
          className="py-2 px-4 font-semibold bg-[#18BED4] text-white hover:bg-[#15a8bc] transition-all duration-200 rounded-lg flex items-center justify-center"
        >
          <Search className="mr-2 w-5 h-5" />
          Search
        </button>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <a
            href={job.redirect_url}
            target="_blank"
            rel="noopener noreferrer"
            key={job.id}
          >
            <JobCard
              title={job.title}
              location={job.location?.area?.join(", ") || "N/A"}
              salaryMin={job.salary_min}
              salaryMax={job.salary_max}
              company={job.company?.display_name || "Unknown"}
              jobdesc={
                job.description.length > 200
                  ? `${job.description.substring(0, 197)}...`
                  : job.description
              }
            />
          </a>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center mt-10 gap-6 flex-wrap">
        {page > 1 && (
          <button
            onClick={handlePrevPage}
            className="text-[#1F2833] font-semibold text-base hover:underline"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="mr-2" />
            Previous Page
          </button>
        )}
        <button
          onClick={handleNextPage}
          className="text-[#1F2833] font-semibold text-base hover:underline"
        >
          Next Page
          <FontAwesomeIcon icon={faChevronRight} className="ml-2" />
        </button>
      </div>
    </div>
  );
}

export default JobRecommendation;
