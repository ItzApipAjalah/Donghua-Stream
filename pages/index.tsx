// pages/index.tsx
import { GetServerSideProps } from 'next';
import Navbar from '../components/Navbar';
import DonghuaCard, { DonghuaCardProps } from '../components/DonghuaCard';
import { fetchDonghua, fetchPopularDonghua } from '../services/api';
import Link from 'next/link';
import Slider from 'react-slick';
import "../styles/globals.css";
import React from 'react';

interface PopularDonghuaProps {
  backdropImage: string;
  seriesTitle: string;
  seriesLink: string;
  description: string;
}

interface HomePageProps {
  donghuaData: Record<string, DonghuaCardProps[]>;
  popularDonghua: PopularDonghuaProps[];
}

const Home: React.FC<HomePageProps> = ({ donghuaData, popularDonghua }) => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    customPaging: (i: number) => (
      <div className="w-4 h-4 rounded-full "></div>
    ),
    appendDots: (dots: React.ReactNode) => {
      // Type assertion to let TypeScript know we're dealing with an array of React elements
      const dotArray = React.Children.toArray(dots) as React.ReactElement[];

      return (
        <div className="relative">
          <ul className="flex justify-center space-x-2 mt-4">
            {dotArray.map((dot, index) =>
              React.cloneElement(dot, {
                className:
                  dot.props.className.includes('slick-active')
                    ? 'w-4 h-4 bg-blue-500 rounded-full'
                    : 'w-4 h-4 bg-gray-500 rounded-full'
              })
            )}
          </ul>
        </div>
      );
    },
  };

  return  (
    <div className="bg-gray-900 text-white min-h-screen">
      <Navbar />
      
      {/* Popular Donghua Section */}
      <div className="container mx-auto p-4 pt-20">
        <h1 className="text-3xl font-bold mb-6">Most Popular Donghua</h1>
        <Slider {...sliderSettings}>
          {popularDonghua.map((donghua, index) => (
            <div
              key={index}
              className="relative transform hover:scale-105 transition-transform duration-300"
            >
              <Link href={donghua.seriesLink} passHref>
                <div className="block">
                  <img
                    src={donghua.backdropImage}
                    alt={donghua.seriesTitle}
                    className="w-full h-80 object-cover rounded-lg"
                  />
                  {/* Text Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent rounded-b-lg">
                    <h2 className="text-lg font-semibold text-white text-center drop-shadow-md">
                      {donghua.seriesTitle}
                    </h2>
                    <p className="text-sm text-gray-300 text-center mt-2 px-4 drop-shadow-md">
                      {donghua.description}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>

      {/* Main Donghua List */}
      <div className="container mx-auto p-4 mt-8">
        {Object.entries(donghuaData).map(([day, donghuaList]) => (
          <div key={day} className="mb-8">
            <h1 className="text-2xl font-bold capitalize mb-4">{day}</h1>
            <div className="flex space-x-4 overflow-x-scroll scrollbar-hide">
              {donghuaList.map((donghua) => (
                <DonghuaCard key={donghua.title} {...donghua} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const donghuaData = await fetchDonghua();
  const popularDonghua = await fetchPopularDonghua();

  return {
    props: {
      donghuaData,
      popularDonghua,
    },
  };
};

export default Home;
