// pages/series/[seriesId].tsx

import { GetServerSideProps } from 'next';
import React, { useState, useEffect } from 'react';
import { fetchSeriesDetails } from '../../services/api';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import Link from 'next/link';
import Head from 'next/head';
import "../../styles/globals.css";

interface SeriesDetailsProps {
  series?: {
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
  };
  episodes?: {
    episodeNumber: string;
    episodeTitle: string;
    episodeLink: string;
    episodeDate: string;
    subtitleStatus: string;
  }[];
  notFound?: boolean;
}

const SeriesPage: React.FC<SeriesDetailsProps> = ({ series, episodes, notFound }) => {
  const router = useRouter();
  const { seriesId } = router.query;
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  // Check if series is already bookmarked on component mount
  useEffect(() => {
    if (typeof seriesId === 'string') {
      const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
      const isBookmarked = bookmarks.some((bookmark: { id: string }) => bookmark.id === seriesId);
      setIsBookmarked(isBookmarked);
    }
  }, [seriesId]);

  const handleBookmark = () => {
    if (typeof seriesId === 'string') {
      const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
      const isAlreadyBookmarked = bookmarks.some((bookmark: { id: string }) => bookmark.id === seriesId);

      if (isAlreadyBookmarked) {
        // Remove bookmark if it already exists
        const updatedBookmarks = bookmarks.filter((bookmark: { id: string }) => bookmark.id !== seriesId);
        localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
        setIsBookmarked(false);
      } else {
        // Add new bookmark
        const newBookmark = {
          id: seriesId,
          ...series,
        };
        localStorage.setItem('bookmarks', JSON.stringify([...bookmarks, newBookmark]));
        setIsBookmarked(true);
      }
    }
  };

  if (notFound) {
    return <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">Series not found</div>;
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Head>
        <title>{series?.mainTitle || 'Donghua Streaming'}</title>
        <meta
          name="description"
          content={series?.shortDescription || 'Watch the latest and greatest Donghua series online. Explore a vast collection of genres and stay updated with ongoing series.'}
        />
        <meta property="og:title" content={series?.mainTitle || 'Donghua Streaming'} />
        <meta property="og:description" content={series?.shortDescription || 'Watch the latest and greatest Donghua series online. Explore a vast collection of genres and stay updated with ongoing series.'} />
        <meta property="og:image" content={series?.mainImage || 'https://i.ibb.co/Ht9qGK0/logo.png'} />
        <meta property="og:url" content={`https://anime.amwp.website/series/${seriesId}`} />
        <meta property="og:type" content="website" />
        {/* Add any other dynamic meta tags if needed */}
      </Head>
      <Navbar />
      <div className="container mx-auto p-4 flex flex-col md:flex-row md:items-start mt-16">
        <img 
          src={series?.mainImage} 
          alt={series?.mainTitle} 
          className="w-full md:w-1/3 h-auto rounded-lg shadow-lg mb-4 md:mb-0"
        />
        <div className="md:ml-8 flex-1">
          <h1 className="text-4xl font-bold mb-2">{series?.mainTitle}</h1>
          <p className="text-lg text-gray-400 mb-4">Alternative Title: {series?.alternativeTitle}</p>
          <p className="mb-4 text-gray-300">{series?.shortDescription}</p>
          <div className="text-sm text-gray-300 mb-4">
            <p className="mb-1">Rating: <span className="font-medium">{series?.rating}</span></p>
            <p className="mb-1">Status: <span className="font-medium">{series?.status}</span></p>
            <p className="mb-1">Network: <span className="font-medium">{series?.network}</span></p>
            <p className="mb-1">Studio: <span className="font-medium">{series?.studio}</span></p>
            <p className="mb-1">Released: <span className="font-medium">{series?.released}</span></p>
            <p className="mb-1">Duration: <span className="font-medium">{series?.duration}</span></p>
            <p className="mb-1">Season: <span className="font-medium">{series?.season}</span></p>
            <p className="mb-1">Country: <span className="font-medium">{series?.country}</span></p>
            <p className="mb-1">Type: <span className="font-medium">{series?.type}</span></p>
            <p className="mb-1">Episodes: <span className="font-medium">{series?.episodes}</span></p>
            <p className="mb-1">Released On: <span className="font-medium">{series?.releasedOn}</span></p>
            <p className="mb-1">Updated On: <span className="font-medium">{series?.updatedOn}</span></p>
            <p className="mb-1">Genres: 
              <span className="font-medium">
                {series?.genres.map((genre, index) => (
                  <React.Fragment key={genre}>
                    <Link href={`/genres/${genre}`} className="text-blue-400 hover:underline">
                      {genre}
                    </Link>
                    {index < series.genres.length - 1 && ', '}
                  </React.Fragment>
                ))}
              </span>
            </p>
          </div>
          <p className="text-gray-300 mb-4">{series?.description}</p>
          <button
            onClick={handleBookmark}
            className={`px-4 py-2 rounded-lg transition duration-300 ${isBookmarked ? 'bg-red-700' : 'bg-gray-700'} hover:bg-gray-600 text-white`}
          >
            {isBookmarked ? 'Remove Bookmark' : 'Bookmark'}
          </button>
        </div>
      </div>
      <div className="container mx-auto p-4 mt-8">
        <h2 className="text-2xl font-bold mb-4">Episodes</h2>
        <ul className="list-disc list-inside space-y-4">
          {episodes?.map((episode) => (
      <li 
      key={episode.episodeNumber} 
      className="bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700 transition duration-300"
    >
      <Link 
        href={episode.episodeLink} 
        className="text-blue-400 hover:underline"
      >
        <span className="font-bold">Episode {episode.episodeNumber}:</span> {episode.episodeTitle} 
        <span className="text-gray-400"> (Released: {episode.episodeDate})</span>
      </Link>
    </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { seriesId } = context.query;

  if (typeof seriesId !== 'string') {
    return { notFound: true };
  }

  try {
    const data = await fetchSeriesDetails(seriesId);

    if (!data || !data.details || !data.details.length) {
      return { notFound: true };
    }

    return {
      props: {
        series: data.details[0],
        episodes: data.episode_list,
      },
    };
  } catch (error) {
    console.error('Error fetching series details:', error);
    return { notFound: true };
  }
};

export default SeriesPage;
