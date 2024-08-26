// pages/completed/[page].tsx

import { GetServerSideProps } from 'next';
import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head'; // Import Head
import { fetchCompletedSeries } from '../../services/api';
import DonghuaCard from '../../components/DonghuaCard';
import Navbar from '../../components/Navbar';
import "../../styles/globals.css";

interface Series {
  title: string;
  href: string;
  image: string;
  type: string;
}

interface CompletedPageProps {
  seriesList: Series[];
  page: number;
  totalPages: number;
}

const CompletedPage: React.FC<CompletedPageProps> = ({ seriesList, page, totalPages }) => {
  const router = useRouter();
  const currentPage = page || 1;

  const handlePageChange = (pageNumber: number) => {
    router.push(`/completed/${pageNumber}`);
  };

  return (
    <>
      <Head>
        <title>Completed {currentPage}</title>
        <meta
          name="description"
          content={`Browse completed series - Page ${currentPage}. Discover the latest completed anime series and explore a diverse collection of genres.`}
        />
        <meta
          name="keywords"
          content="completed anime series, anime, streaming, completed series, anime genres"
        />
        <meta property="og:title" content={`Completed ${currentPage}`} />
        <meta
          property="og:description"
          content={`Browse completed series - Page ${currentPage}. Discover the latest completed anime series and explore a diverse collection of genres.`}
        />
      </Head>
      <Navbar />
      <div className="container mx-auto p-4 mt-16">
        <h1 className="text-2xl font-bold capitalize mb-4">Completed Series - Page {currentPage}</h1>
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
        <div className="flex justify-center mt-8">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 mx-1 rounded-lg ${
                index + 1 === currentPage ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-700'
              } hover:bg-gray-400 transition duration-300`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { page = 1 } = context.query;
  const currentPage = parseInt(page as string, 10);

  try {
    const { seriesList, totalPages } = await fetchCompletedSeries(currentPage);

    const totalPagesNumber = !isNaN(totalPages) ? totalPages : 16;

    return {
      props: {
        seriesList,
        page: currentPage,
        totalPages: totalPagesNumber,
      },
    };
  } catch (error) {
    console.error('Failed to fetch completed series:', error);
    return {
      notFound: true,
    };
  }
};

export default CompletedPage;
