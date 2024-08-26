// pages/completed/[page].tsx

import { GetServerSideProps } from 'next';
import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
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

  // Helper to generate page range
  const generatePageRange = (totalPages: number, currentPage: number) => {
    const range = [];
    const pageCount = Math.min(totalPages, 5); // Show up to 5 page links
    const start = Math.max(1, currentPage - Math.floor(pageCount / 2));
    const end = Math.min(totalPages, start + pageCount - 1);

    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  };

  const pageRange = generatePageRange(totalPages, currentPage);

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
          <nav className="flex items-center space-x-1">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
            >
              &laquo;
            </button>

            {/* Page Numbers */}
            {pageRange.map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  pageNumber === currentPage ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                }`}
              >
                {pageNumber}
              </button>
            ))}

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
            >
              &raquo;
            </button>
          </nav>
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
