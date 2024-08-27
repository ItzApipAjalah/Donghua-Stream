import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { fetchEpisodeDetails } from '../../services/api';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import Head from 'next/head';
import "../../styles/globals.css";
import Link from 'next/link';
import { FaShareAlt } from 'react-icons/fa'; // Import the share icon

interface EpisodeDetailsProps {
  episode?: {
    title: string;
    video_link: string;
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
    episodes: {
      href: string;
      thumbnail: string;
      title: string;
      details: string;
    }[];
  };
}

const EpisodePage: React.FC<EpisodeDetailsProps> = ({ episode }) => {
  const router = useRouter();
  const { episodeId } = router.query;
  const [startTime, setStartTime] = useState<number>(Date.now());

  useEffect(() => {
    if (episode) {
      const history = JSON.parse(localStorage.getItem('episodeHistory') || '[]');

      const handlePageLeave = () => {
        const endTime = Date.now();
        let timeSpent = (endTime - startTime) / 1000 / 60 / 60; // time in hours

        const [hours, minutes, seconds] = episode.details.duration.split(':').map(Number);
        const episodeDuration = hours + minutes / 60 + seconds / 3600;

        if (timeSpent > episodeDuration) {
          timeSpent = episodeDuration;
        }

        const updatedHistory = history.filter((item: any) => item.episodeId !== episodeId);
        updatedHistory.unshift({ ...episode, episodeId, timeSpent });
        localStorage.setItem('episodeHistory', JSON.stringify(updatedHistory));
      };

      window.addEventListener('beforeunload', handlePageLeave);
      return () => {
        handlePageLeave();
        window.removeEventListener('beforeunload', handlePageLeave);
      };
    }
  }, [episode, episodeId, startTime]);

  // Handle fullscreen change and orientation
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (document.fullscreenElement) {
        // Check if the user is on a mobile device
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) {
          // Lock the orientation to landscape if in fullscreen
          (screen.orientation as any).lock('landscape').catch((err: unknown) => {
            console.error('Failed to lock screen orientation:', err);
          });
        }
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const shareEpisode = () => {
    const episodeUrl = `https://anime.amwp.website/episode/${episodeId}`;
    if (navigator.share) {
      navigator.share({
        title: episode?.details.mainTitle,
        url: episodeUrl,
      }).catch((error) => console.error('Error sharing:', error));
    } else {
      // Fallback for older browsers
      navigator.clipboard.writeText(episodeUrl)
        .then(() => alert('Episode link copied to clipboard!'))
        .catch((error) => console.error('Error copying link:', error));
    }
  };

  if (!episode) {
    return <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">Episode not found</div>;
  }

  return (
    <>
      <Head>
        <title>{episode.details.mainTitle || 'Donghua Streaming'}</title>
        <meta
          name="description"
          content={episode.details.description || 'Watch the latest episode of your favorite Donghua series. Explore detailed information and enjoy streaming.'}
        />
        <meta
          property="og:title"
          content={episode.details.mainTitle || 'Donghua Streaming'}
        />
        <meta
          property="og:description"
          content={episode.details.description || 'Watch the latest episode of your favorite Donghua series. Explore detailed information and enjoy streaming.'}
        />
        <meta
          property="og:image"
          content={episode.details.mainImage || 'https://i.ibb.co/Ht9qGK0/logo.png'}
        />
        <meta
          property="og:url"
          content={`https://anime.amwp.website/episode/${episodeId}`}
        />
        <meta property="og:type" content="video.other" />
      </Head>
      <Navbar />
      <div className="container mx-auto p-6 bg-gray-900 text-white min-h-screen pt-16">
        <div className="flex flex-col md:flex-row items-start mb-8">
          <img
            src={episode.details.mainImage}
            alt={episode.details.mainTitle}
            className="w-full md:w-1/3 h-auto rounded-lg shadow-lg"
          />
          <div className="md:ml-8 mt-4 md:mt-0">
            <h1 className="text-4xl font-bold mb-2">{episode.details.mainTitle}</h1>
            <p className="text-lg mb-4">Alternative Title: {episode.details.alternativeTitle}</p>
            <p className="mb-4">{episode.details.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm font-semibold">Rating:</p>
                <p className="text-sm mb-2">{episode.details.rating}</p>
              </div>
              <div>
                <p className="text-sm font-semibold">Status:</p>
                <p className="text-sm mb-2">{episode.details.status}</p>
              </div>
              <div>
                <p className="text-sm font-semibold">Network:</p>
                <p className="text-sm mb-2">{episode.details.network}</p>
              </div>
              <div>
                <p className="text-sm font-semibold">Studio:</p>
                <p className="text-sm mb-2">{episode.details.studio}</p>
              </div>
              <div>
                <p className="text-sm font-semibold">Released:</p>
                <p className="text-sm mb-2">{episode.details.released}</p>
              </div>
              <div>
                <p className="text-sm font-semibold">Duration:</p>
                <p className="text-sm mb-2">{episode.details.duration}</p>
              </div>
              <div>
                <p className="text-sm font-semibold">Season:</p>
                <p className="text-sm mb-2">{episode.details.season}</p>
              </div>
              <div>
                <p className="text-sm font-semibold">Country:</p>
                <p className="text-sm mb-2">{episode.details.country}</p>
              </div>
              <div>
                <p className="text-sm font-semibold">Type:</p>
                <p className="text-sm mb-2">{episode.details.type}</p>
              </div>
              <div>
                <p className="text-sm font-semibold">Episodes Count:</p>
                <p className="text-sm mb-2">{episode.details.episodesCount}</p>
              </div>
              <div>
                <p className="text-sm font-semibold">Fansub:</p>
                <p className="text-sm mb-2">{episode.details.fansub}</p>
              </div>
              <div>
                <p className="text-sm font-semibold">Genres:</p>
                <p className="text-sm mb-2">{episode.details.genres ? episode.details.genres.join(', ') : 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Watch Episode</h2>
          <div className="relative w-full overflow-hidden rounded-lg shadow-lg" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src={episode.video_link}
              title={episode.title}
              className="absolute top-0 left-0 w-full h-full border-none"
              allowFullScreen
            ></iframe>
            {/* Add the card with share option */}
            <div className="absolute top-2 right-2 bg-gray-800 bg-opacity-70 p-2 rounded-lg shadow-md flex items-center">
              <button
                onClick={shareEpisode}
                className="flex items-center text-white hover:text-gray-400 transition"
              >
                <FaShareAlt className="mr-2" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4">Other Episodes</h2>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {episode.episodes.map((ep) => (
              <Link 
                key={ep.title} 
                href={ep.href} 
                className="block rounded-lg overflow-hidden shadow-md transform transition duration-300 hover:scale-105 bg-gray-700"
              >
                <div>
                  <img 
                    src={ep.thumbnail} 
                    alt={ep.title} 
                    className="w-full h-40 object-cover" 
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-bold">{ep.title}</h3>
                    <p className="text-sm text-gray-300">{ep.details}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const episodeId = params?.episodeId as string;

  try {
    const episode = await fetchEpisodeDetails(episodeId);
    return {
      props: {
        episode,
      },
    };
  } catch (error) {
    console.error('Error fetching episode details:', error);
    return {
      props: {},
    };
  }
};

export default EpisodePage;

