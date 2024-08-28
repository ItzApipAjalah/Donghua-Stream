import axios from 'axios';

const API_URL = 'http://donghua-api.amwp.website/ongoing';
const AUTH_TOKEN = process.env.AUTH_TOKEN; // Use the environment variable
const SERIES_API_URL = 'http://donghua-api.amwp.website/';
const EPISODE_API_URL = 'http://donghua-api.amwp.website/';
const BASE_URL = 'http://donghua-api.amwp.website';

export const fetchDonghua = async () => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: AUTH_TOKEN,
    },
  });
  return response.data;
};

export const fetchSeriesDetails = async (seriesId: string) => {
  try {
    const response = await axios.get(`${SERIES_API_URL}/seri/${seriesId}`, {
      headers: {
        Authorization: AUTH_TOKEN,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching series details:', error);
    throw error;
  }
};

export const fetchEpisodeDetails = async (episodeId: string) => {
  try {
    const response = await axios.get(`${EPISODE_API_URL}/episode/${episodeId}`, {
      headers: {
        Authorization: AUTH_TOKEN,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching episode details:', error);
    throw error;
  }
};

export const searchSeries = async (query: string) => {
  try {
    const response = await axios.get(`/api/search?query=${query}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching search results:', error);
    return [];
  }
};

export const fetchSeriesByGenre = async (genrename: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/genres/${genrename}`, {
      headers: {
        Authorization: AUTH_TOKEN,
      }
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch data", error);
    throw error;
  }
};

export const fetchCompletedSeries = async (page: number) => {
  try {
    const response = await axios.get(`http://donghua-api.amwp.website/completed/${page}`, {
      headers: {
        Authorization: AUTH_TOKEN,
      },
    });

    const data = response.data;
    const totalPages = Math.ceil(data.totalItems / 16); // Replace data.totalItems with the actual total count if available

    return {
      seriesList: data,
      totalPages,
    };
  } catch (error) {
    console.error('Error fetching completed series:', error);
    throw error;
  }
};
