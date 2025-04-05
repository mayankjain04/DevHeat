import React from "react";

function PlaylistCard({ title, thumbnail, channelTitle, publishedAt, link }) {
    return (
        <div className="p-4 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white text-[#1F2833] flex flex-col h-full">
            <a href={link} target="_blank" rel="noopener noreferrer" className="flex flex-col h-full">
                <img src={thumbnail} alt={title} className="w-full h-40 object-cover rounded-md mb-4" />

                {/* Title clamped to 2 lines */}
                <h3 className="font-semibold text-lg mb-2 text-[#1F2833] line-clamp-2">
                    {title}
                </h3>

                <div className="mt-auto">
                    <p className="text-sm font-medium text-gray-700 mb-1">{channelTitle}</p>
                    <p className="text-xs text-gray-500">{new Date(publishedAt).toLocaleDateString()}</p>
                </div>
            </a>
        </div>
    );
}

export default PlaylistCard;
