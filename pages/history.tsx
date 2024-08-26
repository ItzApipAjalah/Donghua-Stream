// pages/history.tsx

import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar'; // Adjust the import path as needed
import DonghuaCard from '../components/DonghuaCard'; // Adjust the import path as needed
import "../styles/globals.css";
import { AiOutlineDelete } from 'react-icons/ai'; // Import a delete icon

interface HistoryItem {
  episodeId?: string; // Marking as optional to handle cases where it's missing
  details: {
    mainImage: string;
    mainTitle: string;
    alternativeTitle: string;
    rating: string;
    status: string;
    network: string;
    studio: string;
    released: string;
    duration: string;
    season: string;
    country: string;
    type: string;
    episodesCount: string;
    fansub: string;
    genres: string[];
    description: string;
  };
  video_link: string;
}

const HistoryPage: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    // Retrieve history from local storage
    const historyData = JSON.parse(localStorage.getItem('episodeHistory') || '[]');
    // Filter out items without an episodeId
    const filteredHistory = historyData.filter((item: HistoryItem) => item.episodeId);
    setHistory(filteredHistory);
  }, []);

  const handleDelete = (episodeId: string) => {
    const updatedHistory = history.filter(item => item.episodeId !== episodeId);
    setHistory(updatedHistory);
    localStorage.setItem('episodeHistory', JSON.stringify(updatedHistory));
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto p-4 mt-16">
        <h1 className="text-2xl font-bold capitalize mb-4">Episode History</h1>
        {history.length === 0 ? (
          <p className="text-gray-400">No history found.</p>
        ) : (
          <div className="flex flex-wrap gap-6 justify-center">
            {history.map((item) => (
              <div key={item.episodeId} className="relative">
                <DonghuaCard
                  title={item.details.mainTitle}
                  seriesLink={`/episode/${item.episodeId}`}  // Link to the episode page
                  imageSrc={item.details.mainImage}
                  episodeCount="N/A"  // Adjust based on available data
                  releaseTime={item.details.released}  // Adjust based on available data
                />
                <button
                  onClick={() => handleDelete(item.episodeId!)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  aria-label="Delete history item"
                >
                  <AiOutlineDelete size={24} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
