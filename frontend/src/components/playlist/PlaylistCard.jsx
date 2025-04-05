// PlaylistCard.js
import React from "react";

function PlaylistCard({ title, thumbnail, channelTitle, publishedAt, link }) {
    return (
        <div className="p-4 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white text-[#1F2833]">
            <a href={link} target="_blank" rel="noopener noreferrer">
                <img src={thumbnail} alt={title} className="w-full h-40 object-cover rounded-md mb-4" />
                <h3 className="font-semibold text-lg mb-2 text-[#1F2833]">{title}</h3>
                <p className="text-sm font-medium text-gray-700 mb-1">{channelTitle}</p>
                <p className="text-xs text-gray-500">{new Date(publishedAt).toLocaleDateString()}</p>
            </a>
        </div>
    );
}

export default PlaylistCard;
