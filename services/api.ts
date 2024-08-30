import axios from 'axios';

const API_URL = 'https://anichin-api.amwp.website/ongoing';
const AUTH_TOKEN = process.env.AUTH_TOKEN;

const BASE_URL = 'https://anichin-api.amwp.website';

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
    const response = await axios.get(`${BASE_URL}/seri/${seriesId}`, {
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
    const response = await axios.get(`${BASE_URL}/episode/${episodeId}`, {
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
    const response = await axios.get(`${BASE_URL}/completed/${page}`, {
      headers: {
        Authorization: AUTH_TOKEN,
      },
    });

    const data = response.data;
    const totalPages = Math.ceil(data.totalItems / 16); 

    return {
      seriesList: data,
      totalPages,
    };
  } catch (error) {
    console.error('Error fetching completed series:', error);
    throw error;
  }
};

export const fetchPopularDonghua = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/popular`, {
      headers: {
        Authorization: AUTH_TOKEN,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching popular donghua:', error);
    throw error;
  }
};