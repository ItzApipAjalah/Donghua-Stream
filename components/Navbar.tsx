import React, { useState } from 'react';
import { searchSeries } from '../services/api';
import Link from 'next/link';

const genres = [
  'Action', 'Drama', 'Adventure', 'Comedy', 'Crossdressing', 'Cultivation', 'Demons',
  'Ecchi', 'Fantasy', 'Friendship', 'Game', 'Gore', 'Gourmet', 'Harem', 'Historical',
  'Horror', 'Isekai', 'Life', 'Magic', 'Martial Arts', 'Mecha', 'Military', 'Music',
  'Mystery', 'Mythology', 'Psychological', 'Reincarnation', 'Romance', 'School', 
  'Sci-Fi', 'Shoujo', 'Shounen', 'Slice of Life', 'Space', 'Sports', 'Super Power', 
  'Supernatural', 'Suspense', 'Team Sports', 'Thriller'
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 2) { // Start searching after 3 characters
      const results = await searchSeries(query);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <>
      <nav className="bg-gray-800 p-4 shadow-lg fixed w-full z-10 top-0 left-0">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-white text-2xl font-bold">
            Donghua Stream
          </Link>
          <div className="hidden lg:flex items-center space-x-6">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search..."
                className="px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300"
                value={searchQuery}
                onChange={handleSearch}
              />
              {searchResults.length > 0 && (
                <div className="absolute top-full left-0 w-full bg-gray-800 rounded-lg shadow-lg mt-2 z-20">
                  {searchResults.map((result: any) => (
                    <Link key={result.href} href={result.href} className="block px-4 py-2 text-gray-300 hover:bg-gray-700 transition duration-300 flex items-center">
                      <img 
                        src={result.image} 
                        alt={result.title} 
                        className="w-10 h-10 mr-4 object-cover rounded-lg"
                      />
                      <div>
                        <p className="text-white font-bold">{result.title}</p>
                        <p className="text-gray-400 text-sm">{result.type}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <button 
              onClick={toggleSidebar} 
              className="text-gray-300 hover:text-white transition duration-300"
            >
              Genres
            </button>
          </div>
          <div className="block lg:hidden">
            <button 
              onClick={toggleMenu} 
              className="text-white focus:outline-none"
              aria-label="Toggle navigation"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
          <ul className={`lg:flex lg:space-x-6 absolute lg:relative top-full left-0 w-full lg:w-auto bg-gray-800 lg:bg-transparent lg:flex-row flex-col ${isOpen ? 'block' : 'hidden'}`}>
            <li>
              <Link href="/completed/1" className="block text-gray-300 hover:text-white transition duration-300 py-2 px-4 lg:py-0 lg:px-0">
                Completed
              </Link>
            </li>
            <li>
              <Link href="/bookmarks" className="block text-gray-300 hover:text-white transition duration-300 py-2 px-4 lg:py-0 lg:px-0">
                Bookmark
              </Link>
            </li>
            <li>
              <Link href="/history" className="block text-gray-300 hover:text-white transition duration-300 py-2 px-4 lg:py-0 lg:px-0">
                History
              </Link>
            </li>

            <li className="lg:hidden block text-gray-300 hover:text-white transition duration-300 py-2 px-4 lg:py-0 lg:px-0">
              <button 
                onClick={toggleSidebar} 
                className="text-gray-300 hover:text-white transition duration-300"
              >
                Genres
              </button>
            </li>
            <li className="lg:hidden w-full">
              <input 
                type="text" 
                placeholder="Search..."
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300"
                value={searchQuery}
                onChange={handleSearch}
              />
              {searchResults.length > 0 && (
                <div className="absolute left-0 right-0 w-full bg-gray-800 rounded-lg shadow-lg mt-2 z-20">
                  {searchResults.map((result: any) => (
                    <Link key={result.href} href={result.href} className="block px-4 py-2 text-gray-300 hover:bg-gray-700 transition duration-300 flex items-center">
                      <img 
                        src={result.image} 
                        alt={result.title} 
                        className="w-10 h-10 mr-4 object-cover rounded-lg"
                      />
                      <div>
                        <p className="text-white font-bold">{result.title}</p>
                        <p className="text-gray-400 text-sm">{result.type}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </li>
          </ul>
        </div>
      </nav>

      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30" onClick={toggleSidebar}></div>
      )}

      <div className={`fixed top-0 left-0 h-full bg-gray-800 z-40 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} overflow-y-auto`}>
        <div className="p-4">
          <h2 className="text-white text-2xl font-bold mb-4">Genres</h2>
          <ul>
            {genres.map((genre) => (
              <li key={genre} className="mb-2">
                <Link href={`/genres/${genre.toLowerCase()}`} className="text-gray-300 hover:bg-gray-700 block px-4 py-2 rounded-lg transition duration-300">
                  {genre}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <button onClick={toggleSidebar} className="absolute top-4 right-4 text-gray-300 hover:text-white transition duration-300">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </>
  );
};

export default Navbar;
