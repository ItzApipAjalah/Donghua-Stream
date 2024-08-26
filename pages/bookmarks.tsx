// pages/bookmarks.tsx

import { GetServerSideProps } from 'next';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar'; // Adjust the import path as needed
import DonghuaCard from '../components/DonghuaCard'; // Adjust the import path as needed
import "../styles/globals.css";

interface Bookmark {
  id: string;
  mainImage: string;
  mainTitle: string;
  alternativeTitle: string;
  shortDescription: string;
  rating: string;
  followed: string;
  status: string;
  network: string;
  studio: string;
  released: string;
  duration: string;
  season: string;
  country: string;
  type: string;
  episodes: string;
  fansub: string;
  releasedOn: string;
  updatedOn: string;
  genres: string[];
  description: string;
}

const BookmarksPage: React.FC = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    // Retrieve bookmarks from local storage
    const bookmarksData = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    setBookmarks(bookmarksData);
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto p-4 mt-16">
        <h1 className="text-2xl font-bold capitalize mb-4">Bookmarked Series</h1>
        {bookmarks.length === 0 ? (
          <p className="text-gray-400">No bookmarked series found.</p>
        ) : (
          <div className="flex flex-wrap gap-6 justify-center">
            {bookmarks.map((series) => (
              <DonghuaCard
                key={series.id}
                title={series.mainTitle}
                seriesLink={`/seri/${series.id}`}  // Adjust the link if necessary
                imageSrc={series.mainImage}
                episodeCount="N/A"  // Replace with actual data if available
                releaseTime="N/A"  // Replace with actual data if available
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookmarksPage;
