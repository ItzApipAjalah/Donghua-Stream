import React from 'react';

export interface DonghuaCardProps {
  title: string;
  seriesLink: string;
  imageSrc: string;
  episodeCount: string;
  releaseTime: string;
}

const DonghuaCard: React.FC<DonghuaCardProps> = ({ title, seriesLink, imageSrc, episodeCount, releaseTime }) => {
  const fallbackImage = 'https://imgdb.net/storage/uploads/ef44d98449b7f932099705a933f6bf5d1cac568b88249028878157e5baffa7c5.png';

  return (
    <a 
      href={seriesLink} 
      className="block rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 w-64 flex-shrink-0 bg-gray-800 hover:bg-gray-700 relative group"
    >
      <div className="relative">
        <img 
          src={imageSrc} 
          alt={title} 
          className="w-full h-96 object-cover" 
          onError={(e) => (e.currentTarget.src = fallbackImage)}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 transition-opacity duration-300 group-hover:bg-opacity-75">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <p className="text-sm text-gray-300">Episodes: {episodeCount}</p>
          <p className="text-sm text-gray-300">Release Time: {releaseTime}</p>
        </div>
        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </a>
  );
};

export default DonghuaCard;
