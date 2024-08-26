import { GetServerSideProps } from 'next';
import { useEffect } from 'react';
import { fetchEpisodeDetails } from '../../services/api';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import Head from 'next/head'; // Import Head for dynamic meta tags
import "../../styles/globals.css";

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

  // Save episode data to local storage as history
  useEffect(() => {
    if (episode) {
      const history = JSON.parse(localStorage.getItem('episodeHistory') || '[]');
      
      // Remove any existing entry with the same episodeId
      const updatedHistory = history.filter((item: any) => item.episodeId !== episodeId);
      
      // Add the current episode to the beginning of the history
      updatedHistory.unshift({ ...episode, episodeId });
      
      // Save the updated history back to local storage
      localStorage.setItem('episodeHistory', JSON.stringify(updatedHistory));
    }
  }, [episode, episodeId]);

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
        {/* Add any other dynamic meta tags if needed */}
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
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4">Other Episodes</h2>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {episode.episodes.map((ep) => (
              <a 
                key={ep.title} 
                href={ep.href} 
                className="block rounded-lg overflow-hidden shadow-md transform transition duration-300 hover:scale-105 bg-gray-700"
              >
                <img 
                  src={ep.thumbnail} 
                  alt={ep.title} 
                  className="w-full h-40 object-cover" 
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold">{ep.title}</h3>
                  <p className="text-sm text-gray-300">{ep.details}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { episodeId } = context.query;

  if (typeof episodeId !== 'string') {
    return { notFound: true };
  }

  try {
    const data = await fetchEpisodeDetails(episodeId);

    if (!data || !data.details) {
      return { notFound: true };
    }

    return {
      props: {
        episode: data,
      },
    };
  } catch (error) {
    console.error('Error fetching episode details:', error);
    return { notFound: true };
  }
};

export default EpisodePage;
