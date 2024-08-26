import { GetServerSideProps } from 'next';
import Navbar from '../components/Navbar';
import DonghuaCard, { DonghuaCardProps } from '../components/DonghuaCard'; // Import the DonghuaCardProps
import { fetchDonghua } from '../services/api';
import "../styles/globals.css";

interface HomePageProps {
  donghuaData: Record<string, DonghuaCardProps[]>;
}

const Home: React.FC<HomePageProps> = ({ donghuaData }) => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Navbar />
      <div className="container mx-auto p-4 pt-20">
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
  return {
    props: {
      donghuaData,
    },
  };
};

export default Home;
