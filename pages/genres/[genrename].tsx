// pages/genres/[genrename].tsx

import { GetServerSideProps } from 'next';
import React from 'react';
import { useRouter } from 'next/router';
import { fetchSeriesByGenre } from '../../services/api';
import DonghuaCard from '../../components/DonghuaCard';
import Navbar from '../../components/Navbar'; // Assuming you have a Navbar component
import "../../styles/globals.css";

interface Series {
  title: string;
  href: string;
  image: string;
  type: string;
}

interface GenrePageProps {
  seriesList: Series[];
  genreName: string;
}

const GenrePage: React.FC<GenrePageProps> = ({ seriesList, genreName }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 mt-16"> {/* Added margin-top to adjust for fixed navbar */}
        <h1 className="text-2xl font-bold capitalize mb-4">{genreName} Series</h1>
        <div className="flex flex-wrap gap-6 justify-center">
          {seriesList.map((series) => (
            <DonghuaCard
              key={series.href}
              title={series.title}
              seriesLink={series.href}
              imageSrc={series.image}
              episodeCount="N/A"  // Replace with actual data if available
              releaseTime="N/A"  // Replace with actual data if available
            />
          ))}
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { genrename } = context.query;
  
  try {
    const seriesList = await fetchSeriesByGenre(genrename as string);

    return {
      props: {
        seriesList,
        genreName: genrename,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default GenrePage;
