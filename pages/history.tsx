import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar'; // Adjust the import path as needed
import DonghuaCard from '../components/DonghuaCard'; // Adjust the import path as needed
import "../styles/globals.css";
import { AiOutlineDelete } from 'react-icons/ai'; // Import a delete icon

interface HistoryItem {
  episodeId?: string; // Marking as optional to handle cases where it's missing
  timeSpent?: number; // Time spent in hours
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
  const [totalWatchTime, setTotalWatchTime] = useState<number>(0);
  const [displayedWatchTime, setDisplayedWatchTime] = useState<number>(0);

  useEffect(() => {
    // Retrieve history from local storage
    const historyData: HistoryItem[] = JSON.parse(localStorage.getItem('episodeHistory') || '[]');
    
    // Filter out items without an episodeId and calculate total watch time
    const filteredHistory = historyData.filter(item => item.episodeId);
    const totalTime = filteredHistory.reduce((sum, item) => sum + (item.timeSpent || 0), 0);
    
    setHistory(filteredHistory);
    setTotalWatchTime(totalTime);

    // Animate the displayed watch time
    let startTime = 0;
    const incrementTime = () => {
      if (startTime < totalTime) {
        startTime += 0.01;
        setDisplayedWatchTime(startTime);
        requestAnimationFrame(incrementTime);
      } else {
        setDisplayedWatchTime(totalTime);
      }
    };

    incrementTime();
  }, []);

  const formatTime = (time: number) => {
    const days = Math.floor(time / 24);
    const hours = Math.floor(time % 24);
    const minutes = Math.floor((time * 60) % 60);
    
    return `${days}d ${hours}h ${minutes}m`;
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto p-4 mt-16">
        <h1 className="text-2xl font-bold capitalize mb-4">Episode History</h1>
        <p className="text-lg mb-4">
          Total Watch Time: 
          <span className="ml-2 text-yellow-400 text-3xl font-mono">
            {formatTime(displayedWatchTime)}
          </span>
        </p>
        {history.length === 0 ? (
          <p className="text-gray-400">No history found.</p>
        ) : (
          <div className="flex flex-wrap gap-6 justify-center">
            {history.map((item) => (
              <DonghuaCard
                key={item.episodeId}
                title={item.details.mainTitle}
                seriesLink={`/episode/${item.episodeId}`}
                imageSrc={item.details.mainImage}
                episodeCount="N/A"
                releaseTime={item.details.released}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
