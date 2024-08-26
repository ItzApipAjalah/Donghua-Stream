import React, { useState } from 'react';

export interface DonghuaCardProps {
  title: string;
  seriesLink: string;
  imageSrc: string;
  episodeCount: string;
  releaseTime: string;
}

const DonghuaCard: React.FC<DonghuaCardProps> = ({ title, seriesLink, imageSrc, episodeCount, releaseTime }) => {
  const [imageStatus, setImageStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  const handleImageLoad = () => {
    setImageStatus('loaded');
  };

  const handleImageError = () => {
    setImageStatus('error');
  };

  return (
    <a 
      href={seriesLink} 
      className="block rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 w-64 flex-shrink-0 bg-gray-800 hover:bg-gray-700 relative group"
    >
      <div className="relative">
        {imageStatus === 'loading' && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <svg className="w-12 h-12 text-white animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 12a8 8 0 1116 0A8 8 0 014 12z"></path>
            </svg>
          </div>
        )}
        {imageStatus === 'error' && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <p className="text-white text-lg">Image not available</p>
          </div>
        )}
        <img
          src={imageSrc}
          alt={title}
          className={`w-full h-96 object-cover transition-opacity duration-300 ${imageStatus === 'loaded' ? 'opacity-100' : 'opacity-0'}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
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
